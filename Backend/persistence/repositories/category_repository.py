from config.database import supabase
from application.dtos.create_category_dto import CreateCategoryDTO

class CategoryRepository:
    def get_by_name(self, name: str):
        try:
            response = supabase.table('categorias').select('id').eq('nome', name).execute()
            return response.data
        except Exception as e:
            print(f"Erro ao buscar categoria por nome: {e}")
            return None

    def create(self, category_dto: CreateCategoryDTO):
        try:
            # Verifica se a categoria já existe
            if self.get_by_name(category_dto.nome):
                raise ValueError("Uma categoria com este nome já existe.")

            response = supabase.table('categorias').insert({
                'nome': category_dto.nome
            }).execute()

            if response.data:
                return response.data[0]
            else:
                raise Exception("Falha ao criar categoria: Nenhum dado retornado.")
        except Exception as e:
            # Repassa a exceção para ser tratada no service/controller
            raise e
        
    def get_all(self):
        try:
            response = supabase.table('categorias').select('*').order('nome').execute()
            return response.data
        except Exception as e:
            print(f"Erro ao buscar todas as categorias: {e}")
            raise Exception("Falha ao buscar categorias.")