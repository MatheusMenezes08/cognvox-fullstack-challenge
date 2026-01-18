import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    ENV = os.getenv("ENV", "dev")
    PORT = int(os.getenv("PORT", 5000))

    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_NAME = os.getenv("DB_NAME")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}" f"@{DB_HOST}/{DB_NAME}"
    )
