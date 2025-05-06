from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.core.config import settings
from app.db.database import SessionLocal
from app.models.models import User

# Password hashing config
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Auth schemes
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")  # for standard routes
http_bearer = HTTPBearer()  # for custom routes

# ✅ Get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Password utilities
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# ✅ JWT creation
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    now = datetime.utcnow()
    expire = now + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

    to_encode.update({
        "exp": expire,
        "iat": now,
        "nbf": now,
    })

    encoded_jwt = jwt.encode(
        to_encode,
        settings.secret_key,
        algorithm=settings.algorithm
    )
    return encoded_jwt

# ✅ Shared token decoding logic
def _decode_token_and_get_user(token: str, db: Session):
    credentials_exception = HTTPException(status_code=401, detail="Invalid credentials")

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception

    return user

# ✅ Standard OAuth2 token user
def get_current_user_oauth2(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    return _decode_token_and_get_user(token, db)

# ✅ HTTP Bearer token user
def get_current_user_http(
    credentials: HTTPAuthorizationCredentials = Depends(http_bearer),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    return _decode_token_and_get_user(token, db)

# ✅ Role-based access (OAuth2 or HTTPBearer)
def check_role(allowed_roles: list[str], use_http: bool = False):
    def role_checker(
        user: User = Depends(get_current_user_http if use_http else get_current_user_oauth2)
    ):
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail="You don't have permission to access this resource."
            )
        return user
    return role_checker
