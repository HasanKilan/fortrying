from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.product import ProductCreate, ProductOut
from app.models.models import Product
from app.dependencies import get_db, check_role

router = APIRouter()

from app.models.models import Product, Seller  # make sure Seller is imported

@router.post("/products", response_model=ProductOut)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user = Depends(check_role(["seller"], use_http=False))
):
    # Match current_user.email to seller.email
    seller = db.query(Seller).filter(Seller.email == current_user.email).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller profile not found")

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

@router.get("/my-products", response_model=list[ProductOut])
def get_my_products(
    db: Session = Depends(get_db),
    current_user = Depends(check_role(["seller"], use_http=False))
):
    seller = db.query(Seller).filter(Seller.email == current_user.email).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")

    return db.query(Product).filter(Product.seller_id == seller.id).all()

