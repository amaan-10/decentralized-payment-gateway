#routes/auth_routes.py
from flask import Blueprint, request, jsonify
from models.wallet import Wallet
from utils.jwt_utils import generate_token
from utils.jwt_utils import decode_token
from db import wallets_collection
from utils.hashed import hash_pin
from utils.hashed import verify_pin
import base64
import jwt

auth_bp = Blueprint('auth', __name__)

import re

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    firstname = data.get("firstName")
    lastname = data.get("lastName")
    email = data.get("email")
    password = data.get("password")

    if not email or not firstname or not lastname or not password:
        return jsonify({"error": "firstname, lastname, email, and password are required"}), 400

    # Validate password strength
    password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$'
    if not re.match(password_regex, password):
        return jsonify({
            "error": "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number."
        }), 400

    # Check if email already exists
    if Wallet.find_by_email(email):
        return jsonify({"error": "An account with this email already exists"}), 409

    wallet = Wallet(password, firstname, lastname, email)
    wallet.save_to_db()
    token = generate_token(wallet.account_number)

    return jsonify({
        "account_number": wallet.account_number,
        "token": token
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    wallet_data = Wallet.find_by_email(email)
    account_number = wallet_data["account_number"]

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
    return jsonify({"token": token, "hasSetPin": wallet_data['has_set_pin']}), 200

@auth_bp.route("/validate-token", methods=["GET"])
def validate_token():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"message": "No token provided"}), 401

    token = auth_header.split(" ")[1]

    try:
        decoded = decode_token(token)
        return jsonify({"valid": True, "email": decoded["account_number"]})
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 403

@auth_bp.route("/set-pin", methods=["POST"])
def set_pin():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded = decode_token(token)

    data = request.get_json()
    account_number = decoded["account_number"]
    pin = data.get("pin")

    # Input validation
    if not account_number or not pin:
        return jsonify({"error": "Account Number, and 4-digit PIN are required"}), 400

    if not isinstance(pin, str) or not pin.isdigit() or len(pin) != 4:
        return jsonify({"error": "PIN must be a 4-digit number"}), 400

    # Find wallet by account_number
    wallet = wallets_collection.find_one({"account_number": account_number})
    if not wallet:
        return jsonify({"error": "Wallet not found for account number"}), 404
    
    # Update has_set_pin to True
    wallets_collection.update_one(
        {"_id": wallet["_id"]},
        {"$set": {"has_set_pin": True}}
    )
    
    hashed_pin = hash_pin(pin)

    wallets_collection.update_one(
        {"_id": wallet["_id"]},
        {"$set": {"pin": hashed_pin}}
    )

    return jsonify({
        "message": "PIN successfully set",
        "account_number": wallet["account_number"]
    }), 200

@auth_bp.route("/verify-pin", methods=["POST"])
def verify_wallet_pin():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded = decode_token(token)

    data = request.get_json()
    account_number = decoded["account_number"]
    pin = data.get("pin")

    if not account_number or not pin:
        return jsonify({"error": "Account number and PIN are required"}), 400

    wallet = wallets_collection.find_one({"account_number": account_number})
    if not wallet or "pin" not in wallet:
        return jsonify({"error": "Wallet not found or PIN not set"}), 404

    if verify_pin(pin, wallet["pin"]):
        return jsonify({"message": "PIN verified successfully"}), 200
    else:
        return jsonify({"error": "Invalid PIN"}), 401
