from flask import request, jsonify
from application.services.order_service import OrderService
from application.dtos.create_order_dto import CreateOrderDTO

class OrderController:
    def __init__(self):
        self.order_service = OrderService()

    def create(self, **kwargs):
        try:
            # O usuário autenticado é passado pelo decorator auth_required
            user = kwargs.get('user')
            if not user:
                return jsonify({'error': 'Usuário não autenticado.'}), 401
            
            cliente_id = user.id
            data = request.get_json()
            
            order_dto = CreateOrderDTO(**data)
            
            new_order = self.order_service.create_order(cliente_id, order_dto)
            
            return jsonify(new_order), 201

        except ValueError as e:
            return jsonify({'error': str(e)}), 400  # Erro de dados inválidos
        except Exception as e:
            return jsonify({'error': f"Ocorreu um erro: {e}"}), 500
        
    def get_one(self, order_id: str, **kwargs):
        try:
            user = kwargs.get('user')
            order = self.order_service.get_order_by_id(order_id)

            if not order:
                return jsonify({'error': 'Pedido não encontrado.'}), 404

            # Verifica se o usuário é o dono do pedido ou se é um admin/atendente
            user_role = user.user_metadata.get('tipo_usuario')
            if order['cliente_id'] != user.id and user_role not in ['administrador', 'atendente']:
                return jsonify({'error': 'Acesso negado.'}), 403

            return jsonify(order), 200
        except Exception as e:
            return jsonify({'error': f"Ocorreu um erro: {e}"}), 500

    def get_all(self, **kwargs):
        try:
            user = kwargs.get('user')
            user_role = user.user_metadata.get('tipo_usuario')

            # Admin e atendente veem todos os pedidos, clientes veem apenas os seus
            if user_role in ['administrador', 'atendente']:
                orders = self.order_service.get_all_orders()
            else:
                orders = self.order_service.get_orders_by_user(user.id)
            
            return jsonify(orders), 200
        except Exception as e:
            return jsonify({'error': f"Ocorreu um erro: {e}"}), 500