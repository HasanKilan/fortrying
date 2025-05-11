# cart.py (extended with preview and confirm order endpoint)
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, check_role
from app.models.models import CartItem, Product, User, Order, OrderItem
from app.schemas.cart import CartAdd, CartItemOut
from datetime import datetime

router = APIRouter()

@router.post("/cart/add", response_model=CartItemOut)
def add_to_cart(
    item: CartAdd,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    product = db.query(Product).filter(Product.id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart_item = db.query(CartItem).filter_by(user_id=current_user.id, product_id=item.product_id).first()

    if cart_item:
        cart_item.quantity += item.quantity
    else:
        cart_item = CartItem(user_id=current_user.id, product_id=item.product_id, quantity=item.quantity)
        db.add(cart_item)

    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.get("/cart", response_model=list[CartItemOut])
def get_cart_items(
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    return db.query(CartItem).filter(CartItem.user_id == current_user.id).all()

@router.post("/cart/checkout-preview")
def checkout_preview(
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    preview = []
    total = 0

    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            continue
        subtotal = product.price * item.quantity
        preview.append({
            "title": product.title,
            "quantity": item.quantity,
            "unit_price": product.price,
            "subtotal": subtotal
        })
        total += subtotal

    return {"items": preview, "total": round(total, 2)}

@router.post("/orders/confirm")
def confirm_order(
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    new_order = Order(user_id=current_user.id, created_at=datetime.utcnow())
    db.add(new_order)
    db.flush()

    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            continue
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            quantity=item.quantity,
            unit_price=product.price
        )
        db.add(order_item)
        db.delete(item)  # Clear cart item after adding to order

    db.commit()
    return {"message": "Order placed successfully", "order_id": new_order.id}

@router.get("/orders")
def list_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    orders = db.query(Order).filter(Order.user_id == current_user.id).all()
    result = []

    for order in orders:
        items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        formatted_items = []
        total = 0
        for item in items:
            subtotal = item.quantity * item.unit_price
            formatted_items.append({
                "product_id": item.product_id,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "subtotal": subtotal
            })
            total += subtotal

        result.append({
            "order_id": order.id,
            "created_at": order.created_at,
            "total": round(total, 2),
            "items": formatted_items
        })

    return result

@router.delete("/cart/{item_id}", status_code=200)
def decrease_quantity_or_warn(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    cart_item = db.query(CartItem).filter_by(id=item_id, user_id=current_user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        db.commit()
        return {"message": "Quantity decreased by 1"}
    else:
        return {"message": "Minimum quantity reached. Use force-delete to remove item."}

@router.delete("/cart/{item_id}/force", status_code=204)
def force_remove_from_cart(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    cart_item = db.query(CartItem).filter_by(id=item_id, user_id=current_user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(cart_item)
    db.commit()
