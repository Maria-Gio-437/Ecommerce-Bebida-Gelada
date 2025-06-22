from persistence.repositories.report_repository import ReportRepository
from datetime import datetime
import pandas

class ReportService:
    def __init__(self):
        self.report_repository = ReportRepository()

    def generate_sales_by_period_report(self, start_date: datetime, end_date: datetime):
        try:
            sales_data = self.report_repository.get_sales_data_for_period(start_date, end_date)
            if not sales_data:
                return {"message": "Nenhuma venda encontrada no período."}

            df = pandas.DataFrame(sales_data)
            df['valor_total'] = pandas.to_numeric(df['valor_total'])
            
            total_sales = df['valor_total'].sum()
            total_orders = len(df)
            
            report = {
                "periodo_inicio": start_date.isoformat(),
                "periodo_fim": end_date.isoformat(),
                "total_vendas": float(total_sales),
                "numero_pedidos": int(total_orders),
                "pedidos": df.to_dict('records')
            }
            return report
        except Exception as e:
            raise e

    def generate_sales_by_product_report(self):
        try:
            sales_data = self.report_repository.get_sales_data_for_products()
            if not sales_data:
                return {"message": "Nenhuma venda encontrada."}
                
            df = pandas.DataFrame(sales_data)
            # Desaninhar a coluna de produtos
            df['produto_id'] = df['produtos'].apply(lambda x: x['id'])
            df['produto_nome'] = df['produtos'].apply(lambda x: x['nome'])
            
            df['faturamento_item'] = df['quantidade'] * df['preco_unitario']
            
            report_df = df.groupby(['produto_id', 'produto_nome']).agg(
                quantidade_total_vendida=('quantidade', 'sum'),
                faturamento_total=('faturamento_item', 'sum')
            ).reset_index()

            # Ordena por faturamento total
            report_df = report_df.sort_values(by='faturamento_total', ascending=False)
            
            return report_df.to_dict('records')
        except Exception as e:
            raise e

    def generate_sales_by_client_report(self):
        try:
            sales_data = self.report_repository.get_sales_data_for_clients()
            if not sales_data:
                return {"message": "Nenhum cliente com compras."}

            df = pandas.DataFrame(sales_data)
            df['cliente_nome'] = df['usuarios'].apply(lambda x: x['nome'] if x else 'N/A')
            
            df['valor_total'] = pandas.to_numeric(df['valor_total'])

            report_df = df.groupby(['cliente_id', 'cliente_nome']).agg(
                valor_total_gasto=('valor_total', 'sum'),
                numero_de_pedidos=('cliente_id', 'count')
            ).reset_index()

            report_df = report_df.sort_values(by='valor_total_gasto', ascending=False)

            return report_df.to_dict('records')
        except Exception as e:
            raise e