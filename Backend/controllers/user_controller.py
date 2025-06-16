from flask import request, jsonify
from application.services.user_service import UserService
from application.dtos.create_user_dto import CreateUserDTO
from pydantic import ValidationError

user_service = UserService()

def create_user_controller():
    try:
        # Validar dados de entrada com Pydantic
        user_dto = CreateUserDTO(**request.json)

        # Chamar o serviço de aplicação
        new_user = user_service.create_user(user_dto)

        if new_user:
            return jsonify(new_user.to_dict()), 201
        else:
            return jsonify({"error": "Falha ao criar usuário."}), 400

    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 422
    except ValueError as e:
        return jsonify({"error": str(e)}), 409
    except Exception as e:
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500