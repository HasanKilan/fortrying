from app.db.database import engine
from app.models import models

models.Base.metadata.create_all(bind=engine)
print("✅ All tables created!")
