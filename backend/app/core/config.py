from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str  # 👈 this must match lowercase

    class Config:
        env_file = ".env"

settings = Settings()
