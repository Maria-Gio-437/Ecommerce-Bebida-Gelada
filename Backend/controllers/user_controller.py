from flask import request, jsonify
from application.services.user_service import UserService
from application.dtos.create_user_dto import CreateUserDTO
from application.dtos.login_dto import LoginDTO
from pydantic import ValidationError

def create_user_controller():
    try:
        user_data = CreateUserDTO(**request.json)
        user_service = UserService()
        new_user = user_service.create_user(user_data)
        return jsonify(new_user), 201
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
        return jsonify(user)
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500