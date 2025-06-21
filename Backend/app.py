from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_routes
from routes.categories_routes import category_routes
from routes.product_routes import product_routes
from datetime import date, datetime
from flask.json.provider import DefaultJSONProvider

class CustomJSONProvider(DefaultJSONProvider):
    def default(self, obj):
        if isinstance(obj, (date, datetime)):
            return obj.isoformat()
        return super().default(obj)

app = Flask(__name__)
CORS(app)

app.json = CustomJSONProvider(app)

app.register_blueprint(user_routes, url_prefix='/users')
app.register_blueprint(category_routes, url_prefix='/categories')
app.register_blueprint(product_routes, url_prefix='/products')

@app.route("/")
def hello_world():
    return "<p>API do E-commerce de Bebidas Geladas funcionando</p>"

if __name__ == '__main__':
    app.run(debug=True)