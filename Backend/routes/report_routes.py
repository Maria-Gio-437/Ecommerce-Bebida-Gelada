from flask import Blueprint
from controllers.report_controller import ReportController
from config.auth_middleware import auth_required

report_routes = Blueprint('report_routes', __name__)
report_controller = ReportController()

@report_routes.route('/sales-by-period', methods=['GET'])
@auth_required(allowed_roles=['administrador'])
def get_sales_by_period(**kwargs):
    return report_controller.get_sales_by_period()

@report_routes.route('/sales-by-product', methods=['GET'])
@auth_required(allowed_roles=['administrador'])
def get_sales_by_product(**kwargs):
    return report_controller.get_sales_by_product()

@report_routes.route('/sales-by-client', methods=['GET'])
@auth_required(allowed_roles=['administrador'])
def get_sales_by_client(**kwargs):
    return report_controller.get_sales_by_client()