from pydantic import BaseModel

class AddressBase(BaseModel):
    title: str
    street: str
    city: str
    state: str | None = None
    postal_code: str | None = None
    country: str
    is_default: bool = False

class AddressCreate(AddressBase):
    pass

class AddressOut(AddressBase):
    id: int

    class Config:
        from_attributes = True
