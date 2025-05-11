from fastapi import APIRouter, Depends, HTTPException, Body, Query
from sqlalchemy.orm import Session
from app.schemas.product import ProductCreate, ProductOut
from app.models.models import Product, Seller, Category
from app.dependencies import get_db, check_role

router = APIRouter()

# ✅ Create product (seller only)
@router.post("/products", response_model=ProductOut)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user = Depends(check_role(["seller"], use_http=False))
):
    seller = db.query(Seller).filter(Seller.email == current_user.email).first()
    if not seller:
        raise HTTPException(status_code=400, detail="Seller profile not found")

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

# ✅ Public: List products
@router.get("/products", response_model=list[ProductOut])
def get_products(
    category_id: int = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if category_id:
        query = query.filter(Product.category_id == category_id)

    offset = (page - 1) * limit
    return query.offset(offset).limit(limit).all()

# ✅ Public: Product details
@router.get("/products/{product_id}", response_model=ProductOut)
def get_product_detail(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# ✅ Seller: My products
@router.get("/my-products", response_model=list[ProductOut])
def get_my_products(
    db: Session = Depends(get_db),
    current_user = Depends(check_role(["seller"], use_http=False))
):
    seller = db.query(Seller).filter(Seller.email == current_user.email).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")

    return db.query(Product).filter(Product.seller_id == seller.id).all()

# ✅ Public: Categories
@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@router.get("/categories/{category_id}")
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category
