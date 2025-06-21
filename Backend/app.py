from flask import Flask
from routes.user_routes import user_bp
from config.custom_json_encoder import CustomJSONEncoder

app = Flask(__name__)

app.json_encoder = CustomJSONEncoder

# Blueprint(módulos) de usuários
app.register_blueprint(user_bp, url_prefix='/users')

if __name__ == '__main__':
    app.run(debug=True)