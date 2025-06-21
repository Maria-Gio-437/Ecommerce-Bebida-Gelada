from flask import request, jsonify
from application.services.user_service import UserService
from application.dtos.create_user_dto import CreateUserDTO
from application.dtos.login_dto import LoginDTO
from pydantic import ValidationError
from datetime import date, datetime

user_service = UserService()

def serialize_dates(data):
    return {
        k: (v.isoformat() if isinstance(v, (date, datetime)) else v)
        for k, v in data.items()
    }

def create_user_controller():
    try:
        user_data = CreateUserDTO(**request.json)
        user_service = UserService()
        new_user = user_service.create_user(user_data)
        return jsonify(serialize_dates(new_user)), 201
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 409
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

def login_user_controller():
    try:
        login_data = LoginDTO(**request.json)
        user_service = UserService()
        user = user_service.login_user(login_data)
        return jsonify(serialize_dates(user))
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

def get_all_users():
    """Controlador para lidar com a requisição de listar todos os usuários."""
    try:
        users = user_service.get_all_users()
        if users is not None:
            serialized = [serialize_dates(user) for user in users]
            return jsonify(serialized), 200
        else:
            return jsonify({"message": "Nenhum usuário encontrado ou erro no servidor"}), 404
    except Exception as e:
        return jsonify({"message": "Erro interno no servidor", "error": str(e)}), 500
