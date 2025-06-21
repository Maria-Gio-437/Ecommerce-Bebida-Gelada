class CreateCategoryDTO:
    def __init__(self, nome: str):
        if not nome or not isinstance(nome, str):
            raise ValueError("O nome da categoria é obrigatório e deve ser um texto.")
        self.nome = nome