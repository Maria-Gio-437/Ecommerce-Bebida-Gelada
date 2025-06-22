from config.database import supabase
from datetime import datetime

class ReportRepository:
    def get_sales_data_for_period(self, start_date: datetime, end_date: datetime):
        """
        Busca todos os pedidos (não cancelados) dentro de um período específico.
        """
        try:
            response = supabase.table('pedidos') \
                .select('data_pedido, valor_total, status') \
                .neq('status', 'cancelado') \
                .gte('data_pedido', start_date.isoformat()) \
                .lte('data_pedido', end_date.isoformat()) \
                .execute()
            return response.data
        except Exception as e:
            raise e

    def get_sales_data_for_products(self):
        """
        Busca todos os itens de pedidos (não cancelados) para gerar o relatório por produto.
        """
        try:
            # `pedidos!inner` é para garantir que só peguemos itens de pedidos que existem
            # e filtramos para excluir os cancelados.
            response = supabase.table('pedido_itens') \
                .select('quantidade, preco_unitario, produtos(id, nome), pedidos!inner(status)') \
                .neq('pedidos.status', 'cancelado') \
                .execute()
            return response.data
        except Exception as e:
            raise e

    def get_sales_data_for_clients(self):
        """
        Busca todos os pedidos (não cancelados) para gerar o relatório por cliente.
        """
        try:
            response = supabase.table('pedidos') \
                .select('valor_total, cliente_id, usuarios(nome, email)') \
                .neq('status', 'cancelado') \
                .execute()
            return response.data
        except Exception as e:
            raise e