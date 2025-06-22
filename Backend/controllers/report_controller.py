from flask import request, jsonify
from application.services.report_service import ReportService
from datetime import datetime

class ReportController:
    def __init__(self):
        self.report_service = ReportService()

    def get_sales_by_period(self):
        try:
            start_date_str = request.args.get('start_date')
            end_date_str = request.args.get('end_date')

            if not start_date_str or not end_date_str:
                return jsonify({'error': 'Os parâmetros "start_date" e "end_date" são obrigatórios (formato: YYYY-MM-DD).'}), 400
            
            start_date = datetime.fromisoformat(start_date_str)
            end_date = datetime.fromisoformat(end_date_str)

            report = self.report_service.generate_sales_by_period_report(start_date, end_date)
            return jsonify(report), 200
        except ValueError:
            return jsonify({'error': 'Formato de data inválido. Use YYYY-MM-DD.'}), 400
        except Exception as e:
            return jsonify({'error': f"Ocorreu um erro: {e}"}), 500

    def get_sales_by_product(self):
        try:
            report = self.report_service.generate_sales_by_product_report()
            return jsonify(report), 200
        except Exception as e:
            return jsonify({'error': f"Ocorreu um erro: {e}"}), 500

    def get_sales_by_client(self):
        try:
            report = self.report_service.generate_sales_by_client_report()
            return jsonify(report), 200
        except Exception as e:
            return jsonify({'error': f"Ocorreu um erro: {e}"}), 500