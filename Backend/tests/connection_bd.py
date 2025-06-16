import os
import sys
from dotenv import load_dotenv

# Encontrar os módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Carregar as variáveis de ambiente do env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from config.database import supabase

def check_database_connection():
    print("Teste de conexão com supabase\n")

    try:
        response = supabase.client.from_('usuarios').select('id').limit(1).execute()

        if response.data:
            print("Conexão com o Supabase bem-sucedida!")
            print("Dados recebidos:", response.data)
        else:
            print("Falha na conexão com o Supabase.")
            print("Detalhes do erro:", response)

    except Exception as errors:
        print(f"Ocorreu um erro inesperado ao tentar conectar ao Supabase: {errors}")

if __name__ == "__main__":
    check_database_connection()