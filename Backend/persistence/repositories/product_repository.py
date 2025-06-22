from config.database import supabase
from application.dtos.create_product_dto import CreateProductDTO
from application.dtos.update_product_dto import UpdateProductDTO

class ProductRepository:
    def check_category_exists(self, category_id: str):
        try:
            response = supabase.table('categorias').select('id').eq('id', category_id).execute()
            return bool(response.data)
        except Exception as e:
            print(f"Erro ao verificar categoria: {e}")
            return False

    def create(self, product_dto: CreateProductDTO):
        try:
            if not self.check_category_exists(product_dto.categoria_id):
                raise ValueError(f"A categoria com ID {product_dto.categoria_id} não existe.")

            product_data = {
                "nome": product_dto.nome,
                "descricao": product_dto.descricao,
                "volume": product_dto.volume,
                "preco": product_dto.preco,
                "qtd_estoque": product_dto.qtd_estoque,
                "categoria_id": product_dto.categoria_id,
                "alcoolico": product_dto.alcoolico
            }
            response = supabase.table('produtos').insert(product_data).execute()

            if response.data:
                return response.data[0]
            else:
                error_message = "Falha ao criar produto."
                if hasattr(response, 'error') and response.error:
                    error_message += f" Detalhes: {response.error.message}"
                raise Exception(error_message)
        except Exception as e:
            raise e

    def get_all(self):
        try:
            response = supabase.table('produtos').select('*, categorias(nome)').execute()
            return response.data
        except Exception as e:
            print(f"Erro ao buscar todos os produtos: {e}")
            raise Exception("Falha ao buscar produtos.")

    def update(self, product_id: str, product_dto: UpdateProductDTO):
        try:
            update_data = product_dto.to_dict()

            if not update_data:
                raise ValueError("Nenhum dado fornecido para atualização.")

            if 'categoria_id' in update_data and not self.check_category_exists(update_data['categoria_id']):
                raise ValueError(f"A categoria com ID {update_data['categoria_id']} não existe.")

            response = supabase.table('produtos').update(update_data).eq('id', product_id).execute()

            if response.data:
                return response.data[0]
            else:
                error_message = f"Falha ao atualizar o produto com ID {product_id}."
                if hasattr(response, 'error') and response.error:
                    error_message += f" Detalhes: {response.error.message}"
                raise Exception(error_message)
        except Exception as e:
            raise e