from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "sqlite+aiosqlite:///./app.db"
    secret_key: str = "PARTIALLY_AWARE_TEST_KEY"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
