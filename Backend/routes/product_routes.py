from flask import Blueprint
from controllers.product_controller import ProductController
from config.auth_middleware import auth_required

product_routes = Blueprint('product_routes', __name__)
product_controller = ProductController()

@product_routes.route('/', methods=['POST'])
@auth_required(allowed_roles=['administrador', 'atendente'])
def create_product(**kwargs):
    # O decorator passa o usuário via kwargs, então repassamos para o controller
    return product_controller.create(**kwargs)

@product_routes.route('/', methods=['GET'])
def list_products():
    return product_controller.list_all()