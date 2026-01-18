# services/ -> equivalente aos CONTROLADORES no legado
import bcrypt

from models.user import User
from database.db import db


# CREATE
def create_user(data):
    # validações básicas
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    if not password:
        raise ValueError("password é obrigatório")
    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode(
        "utf-8"
    )

    if not name or not email:
        raise ValueError("name e email são obrigatórios")

    user = User(name=name, email=email, password_hash=password_hash)
    db.session.add(user)
    db.session.commit()
    return user.to_dict()


# READ (list)
def list_users():
    users = User.query.all()
    return [u.to_dict() for u in users]


# READ (single)
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        raise ValueError("usuário não encontrado")
    return user.to_dict()


# UPDATE
def update_user(user_id, data):
    user = User.query.get(user_id)
    if not user:
        raise ValueError("usuário não encontrado")

    name = data.get("name")
    email = data.get("email")

    if name:
        user.name = name
    if email:
        user.email = email

    db.session.commit()
    return user.to_dict()


# DELETE
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        raise ValueError("usuário não encontrado")

    db.session.delete(user)
    db.session.commit()
    return True


# AUTH (login)
def authenticate_user(data):
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user:
        raise ValueError("credenciais inválidas")
    if not password:
        raise ValueError("password é obrigatório")

    if not bcrypt.checkpw(password.encode("utf-8"), user.password_hash.encode("utf-8")):
        raise ValueError("credenciais inválidas")

    # retorno simples para o JWT
    return user.id
