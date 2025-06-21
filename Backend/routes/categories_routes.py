from flask import Blueprint
from controllers.category_controller import CategoryController

category_routes = Blueprint('category_routes', __name__)
category_controller = CategoryController()

@category_routes.route('/categories', methods=['POST'])
def create_category():
    return category_controller.create()

@category_routes.route('/categories', methods=['GET'])
def list_categories():
    return category_controller.list_all()