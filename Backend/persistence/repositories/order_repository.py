from config.database import supabase
import json

class OrderRepository:
    def create_order(self, cliente_id: str, endereco_entrega: dict, forma_pagamento: str, itens: list):
        try:
            # Obter detalhes e verificar estoque dos produtos
            produto_ids = [item.produto_id for item in itens]
            produtos_db_response = supabase.table('produtos').select('id, preco, qtd_estoque').in_('id', produto_ids).execute()

            if len(produtos_db_response.data) != len(produto_ids):
                raise ValueError("Um ou mais produtos não foram encontrados.")

            produtos_db = {p['id']: p for p in produtos_db_response.data}
            valor_total = 0
            itens_pedido_data = []

            for item in itens:
                produto = produtos_db.get(item.produto_id)
                if not produto:
                    raise ValueError(f"Produto com ID {item.produto_id} não encontrado.")
                
                if produto['qtd_estoque'] < item.quantidade:
                    raise ValueError(f"Estoque insuficiente para o produto ID {item.produto_id}.")

                preco_unitario = float(produto['preco'])
                valor_total += preco_unitario * item.quantidade
                itens_pedido_data.append({
                    'produto_id': item.produto_id,
                    'quantidade': item.quantidade,
                    'preco_unitario': preco_unitario
                })

            # Criar o registro na tabela 'pedidos'
            pedido_data = {
                'cliente_id': cliente_id,
                'endereco_entrega': json.dumps(endereco_entrega),
                'status': 'pendente',  # Status inicial padrão
                'forma_pagamento': forma_pagamento,
                'valor_total': float(valor_total)
            }
            pedido_response = supabase.table('pedidos').insert(pedido_data).execute()

            if not pedido_response.data:
                raise Exception("Falha ao criar o pedido.")

            novo_pedido = pedido_response.data[0]
            novo_pedido_id = novo_pedido['id']

            # Vincular os itens ao pedido recém-criado
            for item_data in itens_pedido_data:
                item_data['pedido_id'] = novo_pedido_id

            itens_response = supabase.table('pedido_itens').insert(itens_pedido_data).execute()

            if not itens_response.data:
                raise Exception("Falha ao registrar os itens do pedido.")

            # Atualizar o estoque dos produtos
            for item in itens:
                produto = produtos_db.get(item.produto_id)
                novo_estoque = produto['qtd_estoque'] - item.quantidade
                supabase.table('produtos').update({'qtd_estoque': novo_estoque}).eq('id', item.produto_id).execute()
            
            # Retornar o pedido completo para o cliente
            novo_pedido['itens'] = itens_response.data
            return novo_pedido

        except Exception as e:
            raise e

    def get_by_id(self, order_id: str):
        try:
            # Busca o pedido e faz o join com itens e produtos
            query = "*, pedido_itens(*, produtos(nome, descricao, volume))"
            response = supabase.table('pedidos').select(query).eq('id', order_id).single().execute()
            return response.data
        except Exception as e:
            raise e

    def get_all_by_user_id(self, cliente_id: str):
        try:
            # Busca todos os pedidos de um usuário específico
            query = "*, pedido_itens(*, produtos(nome))"
            response = supabase.table('pedidos').select(query).eq('cliente_id', cliente_id).order('data_pedido', desc=True).execute()
            return response.data
        except Exception as e:
            raise e

    def get_all(self):
        try:
            # Busca todos os pedidos (para administradores) e anexa os dados do cliente
            query = "*, cliente:cliente_id(nome, email), pedido_itens(*, produtos(nome))"
            response = supabase.table('pedidos').select(query).order('data_pedido', desc=True).execute()
            return response.data
        except Exception as e:
            raise e
            
    def update_status(self, order_id: str, new_status: str):
        try:
            # Se o pedido for cancelado, restaura o estoque
            if new_status == 'cancelado':
                # 1. Busca os itens do pedido
                itens_response = supabase.table('pedido_itens').select('produto_id, quantidade').eq('pedido_id', order_id).execute()
                
                if not itens_response.data:
                    raise Exception("Itens do pedido não encontrados para restauração de estoque.")
                
                # 2. Para cada item, devolve a quantidade ao estoque do produto
                for item in itens_response.data:
                    # Pega o estoque atual do produto
                    produto_response = supabase.table('produtos').select('qtd_estoque').eq('id', item['produto_id']).single().execute()
                    estoque_atual = produto_response.data['qtd_estoque']
                    
                    # Calcula o novo estoque e atualiza
                    novo_estoque = estoque_atual + item['quantidade']
                    supabase.table('produtos').update({'qtd_estoque': novo_estoque}).eq('id', item['produto_id']).execute()

            # 3. Atualiza o status do pedido
            response = supabase.table('pedidos').update({'status': new_status}).eq('id', order_id).execute()
            
            if not response.data:
                raise Exception("Falha ao atualizar o status do pedido.")
            
            return response.data[0]
        except Exception as e:
            raise e