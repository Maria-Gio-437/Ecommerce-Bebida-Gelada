from persistence.repositories.order_repository import OrderRepository
from application.dtos.create_order_dto import CreateOrderDTO

class OrderService:
    def __init__(self):
        self.order_repository = OrderRepository()

    def create_order(self, cliente_id: str, order_dto: CreateOrderDTO):
        try:
            return self.order_repository.create_order(
                cliente_id=cliente_id,
                endereco_entrega=order_dto.endereco_entrega,
                forma_pagamento=order_dto.forma_pagamento,
                itens=order_dto.itens
            )
        except Exception as e:
            raise e