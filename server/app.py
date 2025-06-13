#app.py
from flask import Flask
from routes.auth_routes import auth_bp
from routes.blockchain_routes import blockchain_bp
from routes.accounts_routes import accounts_bp

app = Flask(__name__)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(blockchain_bp, url_prefix="/api/blockchain")
app.register_blueprint(accounts_bp, url_prefix="/api/accounts")

if __name__ == "__main__":
    app.run(debug=True)