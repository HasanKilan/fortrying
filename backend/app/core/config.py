from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    algorithm: str
    secret_key: str  # ✅ ADD THIS LINE

    class Config:
        env_file = ".env"

settings = Settings()
