from functools import wraps
from flask import request, jsonify
from config.database import supabase

def auth_required(allowed_roles: list):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return jsonify({'error': 'Token de autorização ausente'}), 401

            parts = auth_header.split()
            if parts[0].lower() != 'bearer' or len(parts) != 2:
                return jsonify({'error': 'Formato do token inválido. Use "Bearer <token>"'}), 401

            jwt_token = parts[1]

            try:
                # Valida o token e busca o usuário no Supabase
                user_response = supabase.auth.get_user(jwt_token)
                user = user_response.user
                
                if not user:
                    return jsonify({'error': 'Token inválido ou expirado'}), 401

                # Verifica se o tipo de usuário está na lista de permissões
                user_role = user.user_metadata.get('tipo_usuario')
                if user_role not in allowed_roles:
                    return jsonify({'error': 'Acesso negado: permissão insuficiente'}), 403
                
                # Passa o usuário para a função da rota, se necessário
                kwargs['user'] = user

            except Exception as e:
                return jsonify({'error': 'Erro na validação do token', 'details': str(e)}), 401
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator