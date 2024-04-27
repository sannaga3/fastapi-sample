from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    db_name: str
    db_user: str
    db_password: str
    db_port: str
    db_host: str
    algorithm: str
    jwt_secret_key: str
    
    class Config:
        env_file = ".env"
    
@lru_cache()
def get_settings():
    return Settings()

def get_db_url():
    settings = get_settings()
    print(f'postgresql://{settings.db_user}:{settings.db_password}@{settings.db_host}:{settings.db_port}/{settings.db_name}')
    return f'postgresql://{settings.db_user}:{settings.db_password}@{settings.db_host}:{settings.db_port}/{settings.db_name}'