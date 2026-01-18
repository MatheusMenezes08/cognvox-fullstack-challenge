from flask import Flask, jsonify
from dotenv import load_dotenv
import os

from config import Config
from database.db import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from routes.user_routes import user_bp
from routes.auth_routes import auth_bp


load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

migrate = Migrate(app, db)
jwt = JWTManager(app)

app.register_blueprint(user_bp, url_prefix="/users")

app.register_blueprint(auth_bp, url_prefix="/auth")


@app.get("/health")
def health():
    return jsonify(status="ok")


@app.get("/")
def home():
    return jsonify(message="Backend Flask conectado ao MySQL", env=os.getenv("ENV"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
