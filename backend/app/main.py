from fastapi import FastAPI
from app.db.database import engine
from app.models import models

app = FastAPI()

# Create DB tables
models.Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "TrendYol Backend with FastAPI & PostgreSQL is ready!"}
