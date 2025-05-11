from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db, check_role
from app.models.models import Seller, OrderItem, Product, Order, User
from app.schemas.order import SellerOrderOut

router = APIRouter()

@router.get("/seller/orders", response_model=list[SellerOrderOut])
def get_seller_orders(
    db: Session = Depends(get_db),
    current_seller: Seller = Depends(check_role(["seller"], use_http=False))
):
    order_items = db.query(OrderItem).join(OrderItem.product).filter(
        Product.seller_id == current_seller.id
    ).all()

    return order_items

