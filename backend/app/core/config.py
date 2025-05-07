# app/core/config.py
from pydantic import BaseSettings  # Ensure pydantic is installed

class Settings(BaseSettings):
    DATABASE_URL: str               # e.g. postgresql://user:pass@host/db
    ACCESS_TOKEN_SECRET: str        # your JWT access-token secret
    REFRESH_TOKEN_SECRET: str       # your JWT refresh-token secret
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
