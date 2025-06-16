import uuid
import bcrypt
import jwt
import os
from persistence.repositories.user_repository import UserRepository
from persistence.models.user import User
from application.dtos.create_user_dto import CreateUserDto
from werkzeug.security import check_password_hash
from datetime import datetime, timedelta

class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def create_user(self, create_user_dto: CreateUserDto) -> User:
        # Criptografa a senha antes de salvar
        hashed_password = bcrypt.hashpw(create_user_dto.senha.encode('utf-8'), bcrypt.gensalt())

        # Cria uma instância do modelo User com os dados do DTO
        new_user = User(
            id=uuid.uuid4(),
            nome=create_user_dto.nome,
            cpf=create_user_dto.cpf,
            email=create_user_dto.email,
            telefone=create_user_dto.telefone,
            endereco=create_user_dto.endereco,
            senha=hashed_password.decode('utf-8'), # Salva a senha criptografada
            data_nascimento=create_user_dto.data_nascimento,
            tipo_usuario=create_user_dto.tipo_usuario
        )
        
        return self.user_repository.save(new_user)
    
class AuthService:
    def __init__(self):
        self.user_repository = UserRepository()

    def login(self, email: str, senha: str):
        user = self.user_repository.find_by_email(email)
        if not user or not check_password_hash(user.senha, senha):
            raise Exception("Credenciais inválidas")

        payload = {
            "sub": user.id,
            "exp": datetime.utcnow() + timedelta(hours=2)
        }
        token = jwt.encode(payload, os.getenv("SECRET_KEY"), algorithm="HS256")
        return {"access_token": token}