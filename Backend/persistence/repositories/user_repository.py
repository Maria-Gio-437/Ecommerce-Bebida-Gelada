from config.database import supabase
from persistence.models.user import User

class UserRepository:
    def find_by_email(self, email: str):
        response = supabase.table('users').select("*").eq('email', email).execute()
        if response.data:
            return response.data[0]
        return None

    def save(self, user_data: dict):
        response = supabase.table('users').insert(user_data).execute()
        if response.data:
            user_info = response.data[0]
            return User(
                user_id=user_info.get('id'),
                name=user_info.get('name'),
                email=user_info.get('email'),
                cpf=user_info.get('cpf'),
                phone=user_info.get('phone'),
                address=user_info.get('address')
            )
        return None