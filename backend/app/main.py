from fastapi import FastAPI
from app.db.database import engine
from app.models import models
from app.api.v1.endpoints import auth, product

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])  # ✅ NEW
app.include_router(product.router, tags=["Products"])

@app.get("/")
async def root():
    return {"message": "Welcome to TrendYol Backend with FastAPI!"}

