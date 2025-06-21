from flask import Blueprint
from controllers.user_controller import create_user_controller, login_user_controller

user_bp = Blueprint('user_bp', __name__)

user_bp.route('/register', methods=['POST'])(create_user_controller)

user_bp.route('/login', methods=['POST'])(login_user_controller)