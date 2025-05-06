from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.schemas.auth import UserCreate, UserLogin, Token, UserOut
from app.models.models import User, Seller
from app.db.database import SessionLocal
from app.core.security import hash_password, verify_password, create_access_token
from app.core.security import get_current_user_oauth2
from app.dependencies import check_role  # ✅ import the role-checker
from pydantic import BaseModel, EmailStr
from app.schemas.auth import SellerLogin

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

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}



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

    token = create_access_token({"sub": new_user.email})
    return {"access_token": token, "token_type": "bearer"}


# ✅ Login with form (for Swagger)
@router.post("/login", response_model=Token)
def login_form(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


# ✅ Login with JSON (for Postman, mobile apps)
@router.post("/login/json", response_model=Token)
def login_json(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


# ✅ Authenticated user
@router.get("/me", response_model=UserOut)
def get_me(user: User = Depends(get_current_user_oauth2)):
    return user


@router.get("/admin-panel")
def admin_only(user: User = Depends(check_role(["admin"], use_http=False))):
    return {"message": f"Welcome admin {user.name}!"}
