#routes/blockchain_routes.py
from flask import Blueprint, request, jsonify
from models.blockchain import Blockchain
from models.transaction import Transaction
from models.wallet import Wallet
from utils.crypto_utils import decrypt_private_key
from utils.jwt_utils import decode_token
from db import transactions_collection
import base64
from flask_cors import cross_origin

blockchain_bp = Blueprint('blockchain', __name__)
bank_chain = Blockchain()

@blockchain_bp.route("/transaction", methods=["POST", "OPTIONS"])
@cross_origin(
    origins=["http://localhost:3000", "https://depayment.vercel.app"],
    supports_credentials=True
)
def create_transaction():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded = decode_token(token)

    sender_data = Wallet.find_by_account_number(decoded["account_number"])
    receiver_data = Wallet.find_by_account_number(request.json.get("receiver_account"))
    if not sender_data or not receiver_data:
        return jsonify({"error": "Invalid sender or receiver account"}), 404

    data = request.get_json()
    sender_account = decoded["account_number"]
    sender_name = f"{sender_data.get('first_name', 'Unknown')} {sender_data.get('last_name', '')}".strip()
    receiver_name = f"{receiver_data.get('first_name', 'Unknown')} {receiver_data.get('last_name', '')}".strip()
    receiver_account = data.get("receiver_account")
    amount = data.get("amount")
    note = data.get("note")
    pin = data.get("pin")

    if not pin:
        return jsonify({"error": "Pin is required"}), 400

    if not all([receiver_account, amount]):
        return jsonify({"error": "Missing receiver or amount"}), 400

    wallet_data = Wallet.find_by_account_number(sender_account)
    if not wallet_data:
        return jsonify({"error": "Sender wallet not found"}), 404

    encrypted_pem = base64.b64decode(wallet_data['encrypted_private_pin_key'])
    salt_pin = base64.b64decode(wallet_data['salt_pin'])
    private_pin_key = decrypt_private_key(encrypted_pem, pin, salt_pin)

    sender_balance = wallet_data.get('balance', 0)

    if sender_balance < amount:
        return jsonify({"error": "Insufficient balance"}), 400

    receiver_wallet_data = Wallet.find_by_account_number(receiver_account)
    if not receiver_wallet_data:
        return jsonify({"error": "Receiver wallet not found"}), 404    

    tx = Transaction(sender_account, receiver_account, sender_name, receiver_name, amount, note, private_pin_key)
    tx.save_to_db()

    Wallet.update_balance(sender_account, -amount)
    Wallet.update_balance(receiver_account, amount)

    bank_chain.add_transaction(tx)
    bank_chain.mine_pending_transactions(sender_account)

    return jsonify({"message": "Transaction created, balances updated.", "txn_id": tx.txn_id, "time": tx.timestamp}), 201


@blockchain_bp.route("/credit", methods=["POST", "OPTIONS"])
@cross_origin(
    origins=["http://localhost:3000", "https://depayment.vercel.app"],
    supports_credentials=True
)
def credit_account():
    data = request.get_json()
    account_number = data.get("account_number")
    amount = data.get("amount")
    note = data.get("note", "Credit Transaction")
    password = data.get("password")

    if not all([account_number, amount, password]):
        return jsonify({"error": "Account number, amount, and password are required"}), 400

    wallet_data = Wallet.find_by_account_number(account_number)
    if not wallet_data:
        return jsonify({"error": "Wallet not found"}), 404

    encrypted_pem = base64.b64decode(wallet_data['encrypted_private_key'])
    salt = base64.b64decode(wallet_data['salt'])
    private_key = decrypt_private_key(encrypted_pem, password, salt)

    # Create a transaction where system (admin) credits user
    tx = Transaction("system", account_number, amount, note, private_key)
    tx.save_to_db()

    # Update balance
    Wallet.update_balance(account_number, amount)

    # Add transaction to blockchain and mine
    bank_chain.add_transaction(tx)
    bank_chain.mine_pending_transactions("system")

    return jsonify({"message": "Amount credited successfully", "transaction_hash": tx.tx_hash}), 201


@blockchain_bp.route("/debit", methods=["POST", "OPTIONS"])
@cross_origin(
    origins=["http://localhost:3000", "https://depayment.vercel.app"],
    supports_credentials=True
)
def debit_account():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded = decode_token(token)
    data = request.get_json()
    account_number = decoded["account_number"]
    amount = data.get("amount")
    note = data.get("note", "Debit Transaction")
    password = data.get("password")

    if not all([amount, password]):
        return jsonify({"error": "Amount and password are required"}), 400

    wallet_data = Wallet.find_by_account_number(account_number)
    if not wallet_data:
        return jsonify({"error": "Wallet not found"}), 404

    current_balance = wallet_data.get("balance", 0)
    if current_balance < amount:
        return jsonify({"error": "Insufficient balance"}), 400

    encrypted_pem = base64.b64decode(wallet_data['encrypted_private_key'])
    salt = base64.b64decode(wallet_data['salt'])
    private_key = decrypt_private_key(encrypted_pem, password, salt)

    # Create transaction where user sends to system (admin)
    tx = Transaction(account_number, "system", amount, note, private_key)
    tx.save_to_db()

    # Update balance
    Wallet.update_balance(account_number, -amount)

    # Add transaction to blockchain and mine
    bank_chain.add_transaction(tx)
    bank_chain.mine_pending_transactions(account_number)

    return jsonify({"message": "Amount debited successfully", "transaction_hash": tx.tx_hash}), 201


@blockchain_bp.route("/balance", methods=["GET", "OPTIONS"])
@cross_origin(
    origins=["http://localhost:3000", "https://depayment.vercel.app"],
    supports_credentials=True
)
def view_balance():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded = decode_token(token)

    account_number = decoded["account_number"]
    wallet_data = Wallet.find_by_account_number(account_number)

    if not wallet_data:
        return jsonify({"error": "Wallet not found"}), 404

    return jsonify({"balance": wallet_data.get("balance", 0)}), 200


@blockchain_bp.route("/history", methods=["GET", "OPTIONS"])
@cross_origin(
    origins=["http://localhost:3000", "https://depayment.vercel.app"],
    supports_credentials=True
)
def get_transaction_history():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded = decode_token(token)
    account_number = decoded["account_number"]

    # Find all transactions where this user is sender or receiver
    txs = transactions_collection.find({
        "$or": [
            {"sender_account": account_number},
            {"receiver_account": account_number}
        ]
    }).sort("timestamp", -1)  # Newest first

    history = []
    for tx in txs:
        history.append({
            "sender": tx["sender_account"],
            "receiver": tx["receiver_account"],
            "amount": tx["amount"],
            "note": tx.get("note", ""),
            "timestamp": tx["timestamp"],
            "tx_hash": tx["tx_hash"]
        })

    return jsonify({"history": history}), 200