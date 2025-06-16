from persistence.repositories.user_repository import UserRepository
from werkzeug.security import generate_password_hash

class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    def create_user(self, user_dto):
        # Verifica se o usuário já existe
        existing_user = self.user_repository.find_by_email(user_dto.email)
        if existing_user:
            raise ValueError("E-mail já cadastrado.")

        # Criptografa a senha antes de salvar
        hashed_password = generate_password_hash(user_dto.password)

        user_data = {
            "name": user_dto.name,
            "email": user_dto.email,
            "password_hash": hashed_password,
            "cpf": user_dto.cpf,
            "phone": user_dto.phone,
            "address": user_dto.address
        }

        new_user = self.user_repository.save(user_data)
        return new_user