#routes/auth_routes.py
from flask import Blueprint, request, jsonify
from models.wallet import Wallet
from utils.jwt_utils import generate_token
import base64

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    password = data.get("password")
    name = data.get("name")
    if not password:
        return jsonify({"error": "Password required"}), 400

    wallet = Wallet(password, name)
    wallet.save_to_db()
    token = generate_token(wallet.account_number)

    return jsonify({"account_number": wallet.account_number, "token": token}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    account_number = data.get("account_number")
    password = data.get("password")

    wallet_data = Wallet.find_by_account_number(account_number)
    if not wallet_data:
        return jsonify({"error": "Wallet not found."}), 404

    try:
        encrypted_pem = base64.b64decode(wallet_data['encrypted_private_key'])
        salt = base64.b64decode(wallet_data['salt'])
        # Decrypt to validate password
        from utils.crypto_utils import decrypt_private_key
        decrypt_private_key(encrypted_pem, password, salt)
    except Exception as e:
        return jsonify({"error": "Invalid password."}), 401

    token = generate_token(account_number)
    return jsonify({"token": token}), 200
