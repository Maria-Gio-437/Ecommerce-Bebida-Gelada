from flask import Blueprint
from controllers.user_controller import UserController

user_routes = Blueprint('user_routes', __name__)

user_controller_instance = UserController()

@user_routes.route('/register', methods=['POST'])
def register():
    return user_controller_instance.register()

@user_routes.route('/login', methods=['POST'])
def login():
    return user_controller_instance.login()

@user_routes.route('/', methods=['GET'])
def get_all_users():
    return user_controller_instance.get_all_users()