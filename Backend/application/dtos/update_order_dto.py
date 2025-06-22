from typing import Optional

class UpdateOrderDTO:
    def __init__(self, status: Optional[str] = None):
        if not status:
            raise ValueError("O campo 'status' é obrigatório.")

        allowed_statuses = ['pendente', 'em_preparacao', 'enviado', 'entregue', 'cancelado']
        if status not in allowed_statuses:
            raise ValueError(f"Status inválido. Use um dos seguintes: {allowed_statuses}")

        self.status = status