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

@product_routes.route('/<uuid:product_id>', methods=['PUT'])
@auth_required(allowed_roles=['administrador', 'atendente'])
def update_product(product_id, **kwargs):
    # A URL captura o product_id e o passa para o controller
    return product_controller.update(str(product_id), **kwargs)

@product_routes.route('/<uuid:product_id>', methods=['DELETE'])
@auth_required(allowed_roles=['administrador']) # Apenas administradores podem deletar
def delete_product(product_id, **kwargs):
    return product_controller.delete(str(product_id), **kwargs)