from pydantic import BaseModel, EmailStr

class LoginDTO(BaseModel):
    email: EmailStr
    senha: str