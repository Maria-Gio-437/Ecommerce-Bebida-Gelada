from flask import Blueprint
from controllers.order_controller import OrderController
from config.auth_middleware import auth_required

order_routes = Blueprint('order_routes', __name__)
order_controller = OrderController()

@order_routes.route('/', methods=['POST'])
@auth_required(allowed_roles=['administrador', 'atendente', 'cliente'])
def create_order(**kwargs):
    return order_controller.create(**kwargs)

@order_routes.route('/', methods=['GET'])
@auth_required(allowed_roles=['administrador', 'atendente', 'cliente'])
def get_all_orders(**kwargs):
    return order_controller.get_all(**kwargs)

@order_routes.route('/<uuid:order_id>', methods=['GET'])
@auth_required(allowed_roles=['administrador', 'atendente', 'cliente'])
def get_order(order_id, **kwargs):
    return order_controller.get_one(str(order_id), **kwargs)