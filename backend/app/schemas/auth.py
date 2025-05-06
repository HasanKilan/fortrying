from pydantic import BaseModel, EmailStr



class SellerLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class SellerRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    store_name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    name: str
    email: EmailStr

    class Config:
        orm_mode = True
