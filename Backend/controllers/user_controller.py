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
            print(f"Dados recebidos: {data}")
            
            required_fields = ['nome', 'email', 'senha', 'cpf', 'telefone', 'data_nascimento', 'tipo_usuario']
            if not all(field in data for field in required_fields):
                missing_fields = [field for field in required_fields if field not in data]
                print(f"Campos ausentes: {missing_fields}")
                return jsonify({'error': 'Todos os campos são obrigatórios', 'missing_fields': missing_fields}), 400

            print("Criando DTO...")
            user_dto = CreateUserDTO(**data)
            print("DTO criado com sucesso")
            
            print("Chamando user_service.create_user...")
            new_user = self.user_service.create_user(user_dto)
            print(f"Usuário criado: {new_user}")
            
            if 'senha' in new_user:
                del new_user['senha']

            return jsonify({'message': 'Usuário criado com sucesso', 'user': new_user}), 201
        except Exception as e:
            print(f"Erro no registro: {str(e)}")
            import traceback
            traceback.print_exc()
            return jsonify({'error': str(e)}), 400

    def login(self):
        try:
            data = request.get_json()
            if not data or 'email' not in data or 'senha' not in data:
                return jsonify({'error': 'Email e senha são obrigatórios'}), 400

            login_dto = LoginDTO(email=data.get('email'), senha=data.get('senha'))
            
            session = self.user_service.login(login_dto)

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
            return jsonify({'error': str(e)}), 500
    
    def logout(self):
        try:
            # Em uma implementação real, você invalidaria o token aqui
            # Por enquanto, apenas retornamos sucesso
            return jsonify({'message': 'Logout realizado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    def forgot_password(self):
        data = request.get_json()
        if not data or not data.get('email'):
            return jsonify({'error': 'O campo email é obrigatorio'}), 400

        email = data.get('email')
        self.user_service.send_password_reset_email(email)
        
        return jsonify({
            'message': 'Se uma conta com este e-mail existir, um link para redefinicao de senha foi enviado.'
        }), 200
