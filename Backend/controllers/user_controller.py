from flask import request, jsonify
from application.services.user_service import UserService
from application.dtos.create_user_dto import CreateUserDTO
from application.dtos.login_dto import LoginDTO

class UserController:
    def __init__(self):
        self.user_service = UserService()

    def register(self):
        try:
            data = request.get_json()
            required_fields = ['nome', 'email', 'senha', 'cpf', 'telefone', 'data_nascimento', 'tipo_usuario']
            if not all(field in data for field in required_fields):
                return jsonify({'error': 'Todos os campos são obrigatórios'}), 400

            user_dto = CreateUserDTO(**data)
            new_user = self.user_service.create_user(user_dto)
            
            if 'senha' in new_user:
                del new_user['senha']

            return jsonify({'message': 'Usuário criado com sucesso', 'user': new_user}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400

    def login(self):
        try:
            data = request.get_json()
            if not data or 'email' not in data or 'senha' not in data:
                return jsonify({'error': 'Email e senha são obrigatórios'}), 400

            login_dto = LoginDTO(email=data.get('email'), senha=data.get('senha'))
            
            # Esta linha retorna o objeto AuthResponse do Supabase
            session = self.user_service.login(login_dto)

            # Convertemos o objeto 'session' para um dicionário antes de passá-lo para jsonify
            return jsonify(session.model_dump())

        except Exception as e:
            return jsonify({'error': str(e)}), 401

    def get_all_users(self):
        try:
            users = self.user_service.get_all_users()
            for user in users:
                if 'senha' in user:
                    del user['senha']
            return jsonify(users), 200
        except Exception as e:
            return jsonify({'error': f'Ocorreu um erro: {str(e)}'}), 500
        
    def forgot_password(self):
        data = request.get_json()
        if not data or not data.get('email'):
            return jsonify({'error': 'O campo email é obrigatorio'}), 400

        email = data.get('email')
        self.user_service.send_password_reset_email(email)
        
        return jsonify({
            'message': 'Se uma conta com este e-mail existir, um link para redefinicao de senha foi enviado.'
        }), 200