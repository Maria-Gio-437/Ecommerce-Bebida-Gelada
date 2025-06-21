from flask import request, jsonify
from application.services.product_service import ProductService
from application.dtos.create_product_dto import CreateProductDTO

class ProductController:
    def __init__(self):
        self.product_service = ProductService()

    def create(self, **kwargs): # Adicionado **kwargs para receber o usuário do decorator
        try:
            # O usuário autenticado pode ser acessado via kwargs['user'] se você precisar registrar quem criou o produto
            # authenticated_user = kwargs.get('user')
            # print(f"Produto sendo criado por: {authenticated_user.email}")
            
            data = request.get_json()
            if not data:
                return jsonify({'error': 'Requisição sem dados JSON'}), 400

            # Cria o DTO com os dados recebidos
            product_dto = CreateProductDTO(
                nome=data.get('nome'),
                descricao=data.get('descricao'),
                volume=data.get('volume'),
                preco=data.get('preco'),
                qtd_estoque=data.get('qtd_estoque'),
                categoria_id=data.get('categoria_id'),
                alcoolico=data.get('alcoolico', False)
            )

            new_product = self.product_service.create_product(product_dto)
            
            return jsonify({'message': 'Produto criado com sucesso', 'product': new_product}), 201

        except ValueError as ve:
            return jsonify({'error': str(ve)}), 400
        except Exception as e:
            return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
        
    def list_all(self):
        try:
            products = self.product_service.get_all_products()
            return jsonify(products), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500