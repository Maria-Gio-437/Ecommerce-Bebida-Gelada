import sys
import os

# Adiciona o diretório raiz do projeto ao path para encontrar os módulos
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config.database import supabase

def test_connection():
    """Tenta se conectar ao Supabase e realizar uma query simples."""
    print("Iniciando teste de conexão com o Supabase...")
    try:
        response = supabase.table('usuarios').select('id').limit(1).execute()

        # A API do Supabase retorna um objeto com 'data' e 'error'.
        # Se 'error' não for None, algo deu errado.
        if response.error:
            print(f"Falha na conexão com o Supabase. Erro: {response.error.message}")
            return False
        
        print("\n✅ Conexão com o Supabase bem-sucedida!")
        print("✅ Query de teste executada com sucesso.")
        return True

    except Exception as e:
        # Captura outras exceções (ex: URL/Chave incorretas, problema de rede)
        print(f"\n❌ Falha na conexão com o Supabase. Exceção: {e}")
        return False

if __name__ == "__main__":
    test_connection()