from persistence.repositories.order_repository import OrderRepository
from application.dtos.create_order_dto import CreateOrderDTO
from application.dtos.update_order_dto import UpdateOrderDTO

class OrderService:
    def __init__(self):
        self.order_repository = OrderRepository()

    def create_order(self, cliente_id: str, order_dto: CreateOrderDTO):
        """
        Prepara os dados do DTO e chama o repositório para criar o pedido de forma transacional.
        """
        try:
            # Converte a lista de DTOs de itens para uma lista de dicionários simples
            itens_list = [
                {"produto_id": item.produto_id, "quantidade": item.quantidade}
                for item in order_dto.itens
            ]

            return self.order_repository.create_order_transactional(
                cliente_id=cliente_id,
                endereco_entrega=order_dto.endereco_entrega,
                forma_pagamento=order_dto.forma_pagamento,
                itens=itens_list
            )
        except Exception as e:
            raise e

    # ... (o restante dos métodos do serviço continuam iguais)
    def get_order_by_id(self, order_id: str):
        try:
            return self.order_repository.get_by_id(order_id)
        except Exception as e:
            raise e

    def get_orders_by_user(self, cliente_id: str):
        try:
            return self.order_repository.get_all_by_user_id(cliente_id)
        except Exception as e:
            raise e

    def get_all_orders(self):
        try:
            return self.order_repository.get_all()
        except Exception as e:
            raise e

    def update_order_status(self, order_id: str, update_dto: UpdateOrderDTO, user):
        try:
            order = self.order_repository.get_by_id(order_id)
            if not order:
                raise ValueError("Pedido não encontrado.")

            user_role = user.user_metadata.get('tipo_usuario')
            new_status = update_dto.status
            
            if user_role == 'cliente':
                if order['cliente_id'] != user.id:
                    raise PermissionError("Você não tem permissão para alterar este pedido.")
                if new_status != 'cancelado':
                    raise PermissionError("Clientes só podem cancelar pedidos.")
                if order['status'] != 'pendente':
                    raise ValueError("Só é possível cancelar pedidos com status 'pendente'.")
            
            elif user_role in ['administrador', 'atendente']:
                if new_status == 'cancelado' and order['status'] != 'pendente':
                    raise ValueError("Não é possível cancelar um pedido que já foi processado.")
            
            else:
                raise PermissionError("Perfil de usuário desconhecido.")

            return self.order_repository.update_status(order_id, new_status)
        
        except Exception as e:
            raise e