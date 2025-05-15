#app.py
from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.blockchain_routes import blockchain_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://depayment.vercel.app"])

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(blockchain_bp, url_prefix="/api/blockchain")

if __name__ == "__main__":
    app.run(debug=True)
