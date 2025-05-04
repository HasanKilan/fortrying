from app.db.database import SessionLocal

from fastapi import Depends, HTTPException
from app.core.security import get_current_user_oauth2
from app.models.models import User

# ✅ Shared DB session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def check_role(allowed_roles: list[str]):
    def role_checker(user: User = Depends(get_current_user_oauth2)):
        if user.role not in allowed_roles:
            raise HTTPException(status_code=403, detail="You don't have permission to access this resource.")
        return user
    return role_checker
