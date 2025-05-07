from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from pydantic import BaseModel, EmailStr

# App imports
from app.core.security import (
    get_current_user_oauth2,
    hash_password,
    verify_password,
)
from app.utils.token import (
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)
from app.db.database import SessionLocal
from app.dependencies import check_role  # ✅ Role-checker
from app.models.models import Seller, User, RefreshToken
from app.schemas.auth import (
    SellerLogin,
    Token,
    UserCreate,
    UserLogin,
    UserOut,
)
from datetime import datetime, timedelta

router = APIRouter()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ Seller registration schema
class SellerRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    store_name: str


# ✅ Register Seller
@router.post("/register-seller", status_code=201)
def register_seller(data: SellerRegister, db: Session = Depends(get_db)):
    if db.query(User).filter_by(email=data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(data.password)

    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hashed_pw,
        role="seller"
    )
    db.add(user)
    db.flush()

    seller = Seller(
        store_name=data.store_name,
        email=data.email,
        hashed_password=hashed_pw
    )
    db.add(seller)
    db.commit()

    return {"message": "Seller registered successfully"}

# ✅ Seller Login (with role check)
@router.post("/login-seller", response_model=Token)
def login_seller(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if user.role != "seller":
        raise HTTPException(status_code=403, detail="Access restricted to sellers only")

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    db.add(RefreshToken(user_email=user.email, token=refresh_token))
    db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


# ✅ Register route
@router.post("/register", response_model=Token)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered.")

    hashed_pw = hash_password(user.password)
    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pw,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token({"sub": new_user.email})
    refresh_token = create_refresh_token({"sub": new_user.email})
    db.add(RefreshToken(user_email=new_user.email, token=refresh_token))
    db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


# ✅ Login with form (for Swagger)
@router.post("/login", response_model=Token)
def login_form(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    db.add(RefreshToken(user_email=user.email, token=refresh_token))
    db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


# ✅ Login with JSON (for Postman, mobile apps)
@router.post("/login/json", response_model=Token)
def login_json(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": db_user.email})
    refresh_token = create_refresh_token({"sub": db_user.email})
    db.add(RefreshToken(user_email=db_user.email, token=refresh_token))
    db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    db.add(RefreshToken(user_email=user.email, token=refresh_token))
    db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


# ✅ Authenticated user
@router.get("/me", response_model=UserOut)
def get_me(user: User = Depends(get_current_user_oauth2)):
    return user


@router.get("/admin-panel")
def admin_only(user: User = Depends(check_role(["admin"], use_http=False))):
    return {"message": f"Welcome admin {user.name}!"}


# ✅ Refresh token endpoint
@router.post("/refresh", response_model=Token)
def refresh_access_token(refresh_token: str = Body(...), db: Session = Depends(get_db)):
    email = decode_refresh_token(refresh_token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    db_token = db.query(RefreshToken).filter_by(token=refresh_token, is_active=True).first()
    if not db_token:
        raise HTTPException(status_code=401, detail="Token expired or revoked")

    db_token.is_active = False

    new_access_token = create_access_token({"sub": email})
    new_refresh_token = create_refresh_token({"sub": email})
    db.add(RefreshToken(user_email=email, token=new_refresh_token))
    db.commit()

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }


# ✅ Logout endpoint
@router.post("/logout")
def logout(refresh_token: str = Body(...), db: Session = Depends(get_db)):
    token = db.query(RefreshToken).filter_by(token=refresh_token, is_active=True).first()
    if not token:
        raise HTTPException(status_code=404, detail="Token not found or already revoked")

    token.is_active = False
    db.commit()
    return {"message": "Successfully logged out."}


# ✅ Logout from all devices
@router.post("/logout-all")
def logout_all(refresh_token: str = Body(...), db: Session = Depends(get_db)):
    email = decode_refresh_token(refresh_token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    tokens = db.query(RefreshToken).filter_by(user_email=email, is_active=True).all()
    for token in tokens:
        token.is_active = False

    db.commit()
    return {"message": "Logged out from all devices."}


# ✅ Cleanup expired tokens
@router.delete("/cleanup-expired-tokens")
def cleanup_expired_tokens(user: User = Depends(check_role(["admin"])), db: Session = Depends(get_db)):
    expiration_days = 7
    threshold_date = datetime.utcnow() - timedelta(days=expiration_days)

    expired_tokens = db.query(RefreshToken).filter(RefreshToken.created_at < threshold_date).all()
    count = len(expired_tokens)

    for token in expired_tokens:
        db.delete(token)

    db.commit()
    return {"message": f"{count} expired refresh tokens deleted."}