from config.database import supabase
import json

class OrderRepository:
    def create_order_transactional(self, cliente_id: str, endereco_entrega: dict, forma_pagamento: str, itens: list):
        """
        Chama a função PostgreSQL 'criar_pedido_transacional' para criar um pedido
        de forma atômica.
        """
        try:
            params = {
                'p_cliente_id': cliente_id,
                'p_endereco_entrega': endereco_entrega,
                'p_forma_pagamento': forma_pagamento,
                'p_itens': itens # A lista de dicts já é serializada corretamente pela biblioteca, ou seja, o dicionário pyhton será convertido em json
            }

            # Executa a Remote Procedure Call (RPC)
            response = supabase.rpc('criar_pedido_transacional', params).execute()
            
            if response.data:
                return response.data[0]
            else:
                # Se a função RPC não retornar dados, algo deu errado, mas não gerou exceção no DB
                # A exceção do DB (ex: estoque insuficiente) será capturada pelo bloco catch abaixo.
                raise Exception("Falha ao criar o pedido. A função RPC não retornou dados.")

        except Exception as e:
            # Propaga a exceção para ser tratada pela camada de serviço/controller
            # Isso incluirá erros de estoque insuficiente gerados pela função SQL.
            raise e

    def get_by_id(self, order_id: str):
        try:
            query = "*, pedido_itens(*, produtos(nome, descricao, volume))"
            response = supabase.table('pedidos').select(query).eq('id', order_id).single().execute()
            return response.data
        except Exception as e:
            raise e

    def get_all_by_user_id(self, cliente_id: str):
        try:
            query = "*, pedido_itens(*, produtos(nome))"
            response = supabase.table('pedidos').select(query).eq('cliente_id', cliente_id).order('data_pedido', desc=True).execute()
            return response.data
        except Exception as e:
            raise e

    def get_all(self):
        try:
            query = "*, cliente:cliente_id(nome, email), pedido_itens(*, produtos(nome))"
            response = supabase.table('pedidos').select(query).order('data_pedido', desc=True).execute()
            return response.data
        except Exception as e:
            raise e
            
    def update_status(self, order_id: str, new_status: str):
        try:
            if new_status == 'cancelado':
                itens_response = supabase.table('pedido_itens').select('produto_id, quantidade').eq('pedido_id', order_id).execute()
                
                if not itens_response.data:
                    raise Exception("Itens do pedido não encontrados para restauração de estoque.")
                
                for item in itens_response.data:
                    produto_response = supabase.table('produtos').select('qtd_estoque').eq('id', item['produto_id']).single().execute()
                    estoque_atual = produto_response.data['qtd_estoque']
                    
                    novo_estoque = estoque_atual + item['quantidade']
                    supabase.table('produtos').update({'qtd_estoque': novo_estoque}).eq('id', item['produto_id']).execute()

            response = supabase.table('pedidos').update({'status': new_status}).eq('id', order_id).execute()
            
            if not response.data:
                raise Exception("Falha ao atualizar o status do pedido.")
            
            return response.data[0]
        except Exception as e:
            raise e