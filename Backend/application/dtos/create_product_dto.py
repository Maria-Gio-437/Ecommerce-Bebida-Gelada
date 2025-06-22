class CreateProductDTO:
    def __init__(self, nome: str, descricao: str, volume: str, preco: float, qtd_estoque: int, categoria_id: str, alcoolico: bool = False):
        # Validações básicas
        if not all([nome, volume, preco, qtd_estoque, categoria_id]):
            raise ValueError("Campos nome, volume, preco, qtd_estoque e categoria_id são obrigatórios.")
        if not isinstance(preco, (int, float)) or preco <= 0:
            raise ValueError("Preço deve ser um número positivo.")
        if not isinstance(qtd_estoque, int) or qtd_estoque < 0:
            raise ValueError("Quantidade em estoque deve ser um número inteiro não negativo.")

        self.nome = nome
        self.descricao = descricao
        self.volume = volume
        self.preco = preco
        self.qtd_estoque = qtd_estoque
        self.categoria_id = categoria_id
        self.alcoolico = alcoolico