from config.database import supabase

print("Conectando ao supabase\n")

try:
    response = supabase.table('usuarios').select('id', head=True).limit(1).execute()

    print("Conexão com o Supabase bem-sucedida!")

except Exception as e:
    print(f"Falha ao conectar ou consultar o Supabase: {e}")