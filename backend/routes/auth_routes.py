# routes/ -> equivalente às ACTIONS no legado
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from services.user_service import authenticate_user, create_user

auth_bp = Blueprint("auth_bp", __name__)


# POST /auth/login
@auth_bp.post("/login")
def login():
    try:
        data = request.get_json()
        user_id = authenticate_user(data)
        token = create_access_token(identity=str(user_id))
        return jsonify(access_token=token), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401


# POST /auth/register
@auth_bp.post("/register")
def register():
    try:
        data = request.get_json()
        user = create_user(data)
        return jsonify(user), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.post("/forgot")
def forgot():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "email e obrigatorio"}), 400
    return jsonify({"message": "Se o email existir, enviaremos instrucoes."}), 200
