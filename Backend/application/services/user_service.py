from config.database import supabase
from application.dtos.create_user_dto import CreateUserDTO
from application.dtos.login_dto import LoginDTO
from persistence.repositories.user_repository import UserRepository
from werkzeug.security import generate_password_hash
from config.database import supabase

class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    def create_user(self, user_data: CreateUserDTO):
        if self.user_repository.get_user_by_email(user_data.email):
            raise ValueError('Um usuário com este e-mail já está cadastrado.')

        try:
            print("--- TENTANDO REGISTRAR NO SUPABASE AUTH ---")
            auth_response = supabase.auth.sign_up({
                "email": user_data.email,
                "password": user_data.senha,
                "options": {
                    "data": {
                        'nome': user_data.nome,
                        'tipo_usuario': user_data.tipo_usuario
                    }
                }
            })
            print("--- RESPOSTA DO SUPABASE (SIGN UP): ---")
            print(auth_response)

            if auth_response.user is None:
                raise Exception("Falha ao criar usuário no serviço de autenticação do Supabase.")

        except Exception as e:
            print(f"--- ERRO NO SIGN UP DO SUPABASE: {e} ---")
            raise Exception(f"Erro no serviço de autenticação: {e}")

        try:
            hashed_senha = generate_password_hash(user_data.senha)
            return self.user_repository.add_user(user_data, hashed_senha)
        except Exception as e:
            raise Exception(f"Erro ao salvar dados do usuário no banco de dados: {e}")

    def login(self, login_data: LoginDTO):
        try:
            print("--- TENTANDO FAZER LOGIN NO SUPABASE AUTH ---")
            session = supabase.auth.sign_in_with_password({
                "email": login_data.email,
                "password": login_data.senha
            })
            print("--- RESPOSTA DO SUPABASE (SIGN IN): ---")
            print(session)
            return session
        except Exception as e:
            print(f"--- ERRO NO SIGN IN DO SUPABASE: {e} ---")
            raise Exception("Credenciais inválidas")
            
    def get_all_users(self):
        return self.user_repository.get_all()
    
    def send_password_reset_email(self, email: str):
        try:
            # Esta função instrui o Supabase a enviar o e-mail de recuperação.
            supabase.auth.reset_password_for_email(email)
        except Exception as e:
            print(f"Tentativa de reset de senha para {email}. Erro (se houver): {e}")
        return