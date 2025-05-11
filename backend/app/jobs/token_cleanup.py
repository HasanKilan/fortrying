from datetime import datetime, timedelta
from app.db.database import SessionLocal
from app.models.models import RefreshToken

def cleanup_expired_tokens_job():
    db = SessionLocal()
    try:
        expiration_days = 7
        threshold_date = datetime.utcnow() - timedelta(days=expiration_days)
        expired_tokens = db.query(RefreshToken).filter(
            RefreshToken.created_at < threshold_date
        ).all()

        for token in expired_tokens:
            db.delete(token)
        db.commit()

        print(f"[Token Cleanup] Deleted {len(expired_tokens)} expired tokens.")
    finally:
        db.close()
