import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
# Certifique-se de que seu arquivo .env está na pasta raiz 'Backend'
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# Inicializa a variável supabase como None
supabase: Client = None

# Verifica se a URL e a KEY foram carregadas do .env
if not url or not key:
    # Imprime uma mensagem de erro clara se as credenciais não forem encontradas
    print("❌ ERRO: As variáveis de ambiente SUPABASE_URL e SUPABASE_KEY não foram encontradas.")
    print("Verifique se o seu arquivo .env está na pasta 'Backend' e se contém as credenciais corretas.")
else:
    try:
        # Tenta criar a conexão real com o Supabase
        supabase = create_client(url, key)
        print("✅ Conexão com o Supabase estabelecida com sucesso!")
    except Exception as e:
        # Informa se houver qualquer outro erro durante a inicialização do cliente
        print(f"❌ ERRO: Falha ao conectar com o Supabase: {e}")