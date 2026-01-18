# routes/ -> equivalente às ACTIONS no legado
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.user_service import (
    list_users,
    get_user,
    update_user,
    delete_user,
)

user_bp = Blueprint("user_bp", __name__)


# GET /users/me
@user_bp.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = get_user(int(user_id))
    return jsonify(user), 200


# GET /users
@user_bp.get("/")
@jwt_required()
def list_all():
    users = list_users()
    return jsonify(users), 200


# GET /users/<id>
@user_bp.get("/<int:user_id>")
@jwt_required()
def get_one(user_id):
    try:
        user = get_user(user_id)
        return jsonify(user), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404


# PUT /users/<id>
@user_bp.put("/<int:user_id>")
@jwt_required()
def update(user_id):
    try:
        from flask import request

        data = request.get_json()
        user = update_user(user_id, data)
        return jsonify(user), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404


# DELETE /users/<id>
@user_bp.delete("/<int:user_id>")
@jwt_required()
def remove(user_id):
    try:
        delete_user(user_id)
        return jsonify({"message": "deleted"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
