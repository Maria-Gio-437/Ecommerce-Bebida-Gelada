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