from pydantic import BaseModel

class CartAdd(BaseModel):
    product_id: int
    quantity: int

class CartItemOut(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int

    class Config:
        from_attributes = True  # for Pydantic v2
