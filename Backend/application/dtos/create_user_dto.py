from pydantic import BaseModel
from datetime import date

class CreateUserDTO(BaseModel):
    nome: str
    cpf: str
    email: str
    telefone: str | None = None # Opcional
    endereco: str
    senha: str
    data_nascimento: date
    tipo_usuario: str