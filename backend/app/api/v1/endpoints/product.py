from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.product import ProductCreate, ProductOut
from app.models.models import Product, Seller
from app.dependencies import get_db, check_role

router = APIRouter()

@router.post("/products", response_model=ProductOut)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    user = Depends(check_role(["seller"],  use_http=True))
):
    seller = db.query(Seller).filter(Seller.email == user.email).first()
    if not seller:
        raise HTTPException(status_code=400, detail="Seller profile not found.")
    new_product = Product(
        title=product.title,
        description=product.description,
        price=product.price,
        stock=product.stock,
        category_id=product.category_id,
        seller_id=seller.id
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.get("/products", response_model=list[ProductOut])
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()
