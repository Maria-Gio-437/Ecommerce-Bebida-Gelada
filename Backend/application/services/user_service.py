import bcrypt
from application.dtos.create_user_dto import CreateUserDTO
from application.dtos.login_dto import LoginDTO
from persistence.repositories.user_repository import UserRepository

class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    def create_user(self, user_data: CreateUserDTO):
        existing_user = self.user_repository.get_user_by_email(user_data.email)
        if existing_user:
            raise ValueError("Usuário com este e-mail já existe")

        hashed_senha = bcrypt.hashpw(user_data.senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        return self.user_repository.add_user(user_data, hashed_senha)

    def login_user(self, login_data: LoginDTO):
        user = self.user_repository.get_user_by_email(login_data.email)
        if not user:
            raise ValueError("Email ou senha inválido")

        if bcrypt.checkpw(login_data.senha.encode('utf-8'), user['senha'].encode('utf-8')):
            # Remove a senha do dicionário antes de retornar por segurança
            del user['senha']
            return user
        
        raise ValueError("Email ou senha invalido")