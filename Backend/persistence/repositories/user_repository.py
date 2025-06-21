from config.database import supabase
from application.dtos.create_user_dto import CreateUserDTO
from datetime import date, datetime

class UserRepository:
    def get_user_by_email(self, email: str) -> dict | None:
        """
        Busca um usuário pelo email no banco de dados.
        Retorna um dicionário se o usuário for encontrado, ou None caso contrário.
        """
        response = supabase.table('usuarios').select('*').eq('email', email).execute()
        if response.data:
            return response.data[0]
        return None

    def add_user(self, user_data: CreateUserDTO, hashed_senha: str) -> dict:
        """
        Adiciona um novo usuário ao banco de dados.
        Retorna um dicionário com os dados do usuário criado.
        """
        user_dict = user_data.dict()
        user_dict['senha'] = hashed_senha
        
        for key, value in user_dict.items():
            if isinstance(value, (date, datetime)):
                user_dict[key] = value.isoformat()

        response = supabase.table('usuarios').insert(user_dict).execute()
        
        if response.data:
            return response.data[0]
        return None
    
    def get_all(self):
        """ Busca todos os usuários da tabela 'usuarios'."""
        try:
            response = supabase.table('usuarios').select('id', 'nome', 'email', 'senha', 'telefone', 'cpf', 'data_nascimento','tipo_usuario','criado_em').execute()
            return response.data
        except Exception as e:
            print(f"Erro ao buscar usuários: {e}")
            return None