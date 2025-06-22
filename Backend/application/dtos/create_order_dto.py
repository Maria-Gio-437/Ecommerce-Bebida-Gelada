import json
from typing import List, Dict, Any

class CreateOrderItemDTO:
    def __init__(self, produto_id: str, quantidade: int):
        if not produto_id or not isinstance(produto_id, str):
            raise ValueError("O campo 'produto_id' é obrigatório e deve ser uma string.")
        if not quantidade or not isinstance(quantidade, int) or quantidade <= 0:
            raise ValueError("O campo 'quantidade' é obrigatório e deve ser um inteiro positivo.")

        self.produto_id = produto_id
        self.quantidade = quantidade

class CreateOrderDTO:
    def __init__(self, endereco_entrega: Dict[str, Any], forma_pagamento: str, itens: List[Dict[str, Any]]):
        # Validação do endereço
        if not endereco_entrega or not isinstance(endereco_entrega, dict):
            raise ValueError("O campo 'endereco_entrega' é obrigatório e deve ser um objeto JSON.")
        if not all(k in endereco_entrega for k in ['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep']):
            raise ValueError("O endereço de entrega deve conter: rua, numero, bairro, cidade, estado e cep.")

        # Validação da forma de pagamento
        formas_pagamento_validas = ['dinheiro', 'cartao_credito', 'cartao_debito', 'pix']
        if not forma_pagamento or forma_pagamento not in formas_pagamento_validas:
            raise ValueError(f"Forma de pagamento inválida. Use uma das seguintes: {formas_pagamento_validas}")

        # Validação dos itens
        if not itens or not isinstance(itens, list) or len(itens) == 0:
            raise ValueError("O pedido deve conter pelo menos um item.")

        self.endereco_entrega = endereco_entrega
        self.forma_pagamento = forma_pagamento
        self.itens = [CreateOrderItemDTO(**item) for item in itens]