from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "yx_-q7Y02KQd1oOf_Tupm0B9dzykNuLJvaRNFtZOL7KNbecq5a0cXz8V_cCLD8gI0pAWLF2SptFv-CbCq7R78g"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"

settings = Settings()
