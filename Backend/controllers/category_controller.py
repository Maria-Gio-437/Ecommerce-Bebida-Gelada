from flask import request, jsonify
from application.services.category_service import CategoryService
from application.dtos.create_category_dto import CreateCategoryDTO

class CategoryController:
    def __init__(self):
        self.category_service = CategoryService()

    def create(self):
        try:
            data = request.get_json()
            if not data or 'nome' not in data:
                return jsonify({'error': 'O campo "nome" é obrigatório'}), 400

            category_dto = CreateCategoryDTO(nome=data.get('nome'))

            new_category = self.category_service.create_category(category_dto)

            return jsonify({'message': 'Categoria criada com sucesso', 'category': new_category}), 201

        except ValueError as ve:
            return jsonify({'error': str(ve)}), 400
        except Exception as e:
            return jsonify({'error': f'Ocorreu um erro inesperado: {str(e)}'}), 500
        
    def list_all(self):
        try:
            categories = self.category_service.get_all_categories()
            return jsonify(categories), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500