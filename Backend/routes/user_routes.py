from flask import Blueprint
from controllers.user_controller import create_user_controller
from flask import request, jsonify
from application.services.user_service import AuthService
from application.dtos.login_dto import LoginDTO

user_bp = Blueprint('user_bp', __name__)
user_bp.route('/usuarios', methods=['POST'])(create_user_controller)

auth_service = AuthService()

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    dto = LoginDTO(**data)
    try:
        result = auth_service.login(dto.email, dto.senha)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401
