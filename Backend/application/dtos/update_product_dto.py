from typing import Optional

class UpdateProductDTO:
    def __init__(
        self,
        nome: Optional[str] = None,
        descricao: Optional[str] = None,
        volume: Optional[str] = None,
        preco: Optional[float] = None,
        qtd_estoque: Optional[int] = None,
        categoria_id: Optional[str] = None,
        alcoolico: Optional[bool] = None
    ):
        if preco is not None and (not isinstance(preco, (int, float)) or preco <= 0):
            raise ValueError("Preço deve ser um número positivo.")
        if qtd_estoque is not None and (not isinstance(qtd_estoque, int) or qtd_estoque < 0):
            raise ValueError("Quantidade em estoque deve ser um número inteiro não negativo.")

        self.nome = nome
        self.descricao = descricao
        self.volume = volume
        self.preco = preco
        self.qtd_estoque = qtd_estoque
        self.categoria_id = categoria_id
        self.alcoolico = alcoolico

    def to_dict(self):
        """Converte o DTO para um dicionário, excluindo os campos que não foram fornecidos (são None)."""
        return {k: v for k, v in self.__dict__.items() if v is not None}