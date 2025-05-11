from fastapi import APIRouter, Depends, HTTPException, Body, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from jose import jwt, JWTError
from app.core.limiter import limiter
from fastapi.responses import JSONResponse
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
from app.dependencies import check_role
from app.models.models import Seller, User, RefreshToken
from app.schemas.auth import (
    SellerLogin,
    Token,
    UserCreate,
    UserLogin,
    UserOut,
)
from app.core.config import settings

router = APIRouter()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class SellerRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    store_name: str

@router.post("/register-seller", status_code=201)
@limiter.limit("5/minute")
def register_seller(request: Request, data: SellerRegister, db: Session = Depends(get_db)):
    if db.query(User).filter_by(email=data.email).first() or db.query(Seller).filter_by(email=data.email).first():
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

@router.post("/login-seller")
@limiter.limit("5/minute")
def login_seller(request: Request,form_data: OAuth2PasswordRequestForm = Depends(), response: Response = None, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if user.role != "seller":
        raise HTTPException(status_code=403, detail="Access restricted to sellers only")

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    db.add(RefreshToken(user_email=user.email, token=refresh_token))
    db.commit()

    response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, secure=False, samesite="Lax")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="Lax")

    return {"message": "Login successful."}

@router.post("/register")
@limiter.limit("5/minute")
def register_user(request: Request, user: UserCreate, response: Response = None, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first() or db.query(Seller).filter(Seller.email == user.email).first():
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

    response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, secure=False, samesite="Lax")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="Lax")

    return {"message": "Registration successful."}

@router.post("/login")
@limiter.limit("5/minute")
def login_form(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), response: Response = None, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if user.role != "user":
        raise HTTPException(status_code=403, detail="Access restricted to users only")

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    db.add(RefreshToken(user_email=user.email, token=refresh_token))
    db.commit()

    response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, secure=False, samesite="Lax")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="Lax")

    return {"message": "Login successful."}

@router.post("/login/json", response_model=Token)
@limiter.limit("5/minute")
def login_json(request: Request, user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if db_user.role != "user":
        raise HTTPException(status_code=403, detail="Access restricted to users only")

    access_token = create_access_token({"sub": db_user.email})
    refresh_token = create_refresh_token({"sub": db_user.email})
    db.add(RefreshToken(user_email=db_user.email, token=refresh_token))
    db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

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


@router.post("/logout")
def logout(
    response: Response,
    refresh_token: str = Body(...),
    db: Session = Depends(get_db)
):
    token = db.query(RefreshToken).filter_by(token=refresh_token, is_active=True).first()
    if not token:
        raise HTTPException(status_code=404, detail="Token not found or already revoked")

    token.is_active = False
    db.commit()

    # Delete cookies
    response.delete_cookie("access_token", httponly=True, samesite="Lax")
    response.delete_cookie("refresh_token", httponly=True, samesite="Lax")

    # Explicitly return a proper JSON response
    return JSONResponse(
        content={"message": "Successfully logged out."},
        status_code=200,
        headers=response.headers  # carries the Set-Cookie deletions
    )


@router.post("/logout-all")
def logout_all(
    response: Response,
    refresh_token: str = Body(...),
    db: Session = Depends(get_db)
):
    
    email = decode_refresh_token(refresh_token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    
    
    tokens = (
        db.query(RefreshToken)
        .filter_by(user_email=email, is_active=True)
        .order_by(RefreshToken.created_at.asc())  # or .id.asc()
        .all()
    )

    if not tokens:
        raise HTTPException(status_code=404, detail="No active tokens found for user.")
    for token in tokens:
        token.is_active = False
    

    db.commit()

    response.delete_cookie(key="access_token", httponly=True, samesite="Lax")
    response.delete_cookie(key="refresh_token", httponly=True, samesite="Lax")

    return JSONResponse(
        content={"message": "Logged out from all devices."},
        status_code=200,
        headers=response.headers
    )


@router.post("/login-admin")
@limiter.limit("5/minute")
def login_admin(
    request: Request,
    response: Response,  # ✅ Make Response required, not default None
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Access restricted to admins only")

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    db.add(RefreshToken(user_email=user.email, token=refresh_token))
    db.commit()

    response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, secure=False, samesite="Lax")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="Lax")

    return {"message": "Login successful."}

def get_current_user_from_cookie(request: Request, db: Session = Depends(get_db)) -> User:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Missing access token")

    token = token.replace("Bearer ", "")  # if Bearer is prepended
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token is invalid")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/me", response_model=UserOut)
def get_me(user: User = Depends(get_current_user_from_cookie)):
    return user

@router.get("/admin-panel")
def admin_only(user: User = Depends(get_current_user_from_cookie)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admins only.")
    return {"message": f"Welcome admin {user.name}!"}
