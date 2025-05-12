from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    secret_key: str
    algorithm: str = "HS256"
    database_url: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    ACCESS_TOKEN_SECRET: str
    REFRESH_TOKEN_SECRET: str

    class Config:
        env_file=".env",
        extra="allow"

settings = Settings()
