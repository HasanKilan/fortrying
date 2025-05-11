from pydantic import BaseModel
from datetime import datetime

class SellerOrderOut(BaseModel):
    id: int
    order_id: int
    product_id: int
    quantity: int
    unit_price: float

    class Config:
        from_attributes = True
