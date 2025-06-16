from pydantic import BaseModel, EmailStr

class CreateUserDTO(BaseModel):
    name: str
    email: EmailStr
    password: str
    cpf: str
    phone: str
    address: str