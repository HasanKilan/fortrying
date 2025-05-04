from app.db.database import SessionLocal

# ✅ Shared DB session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
