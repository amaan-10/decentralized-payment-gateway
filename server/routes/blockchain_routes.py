#routes/blockchain_routes.py
from flask import Blueprint, request, jsonify
from models.blockchain import Blockchain
from models.transaction import Transaction
from models.wallet import Wallet
from utils.crypto_utils import decrypt_private_key
from utils.jwt_utils import decode_token
from db import transactions_collection
import base64
import random
import string
from datetime import datetime
import pytz

blockchain_bp = Blueprint('blockchain', __name__)
bank_chain = Blockchain()

@blockchain_bp.route("/transaction", methods=["POST"])
def create_transaction():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded = decode_token(token)

    data = request.get_json()
    sender = decoded["account_number"]
    receiver = data.get("receiver_account")
    amount = data.get("amount")
    note = data.get("note")
    pin = data.get("pin")

    print(
"sender_account: ",
    sender,
    "\nreceiver_account: ",
    receiver,
    "\namount: ",
    amount,
    "\nnote: ",
    note,
    "\npin: ",
    pin)

    if not pin:
        return jsonify({"error": "Pin is required"}), 400

    if not all([receiver, amount]):
        return jsonify({"error": "Missing receiver or amount"}), 400

    wallet_data = Wallet.find_by_account_number(sender)
    if not wallet_data:
        return jsonify({"error": "Sender wallet not found"}), 404

    encrypted_pem = base64.b64decode(wallet_data['encrypted_private_pin_key'])
    salt_pin = base64.b64decode(wallet_data['salt'])
    private_pin_key = decrypt_private_key(encrypted_pem, pin, salt_pin)

    sender_balance = wallet_data.get('balance', 0)

    if sender_balance < amount:
        return jsonify({"error": "Insufficient balance"}), 400

    receiver_wallet_data = Wallet.find_by_account_number(receiver)
    if not receiver_wallet_data:
        return jsonify({"error": "Receiver wallet not found"}), 404    

    tx = Transaction(sender, receiver, amount, note, private_pin_key)
    tx.save_to_db()
    print("Transaction created:", tx.txn_id)

    Wallet.update_balance(sender, -amount)
    Wallet.update_balance(receiver, amount)

    bank_chain.add_transaction(tx)
    bank_chain.mine_pending_transactions(sender)

    return jsonify({"message": "Transaction created, balances updated.", "txn_id": tx.txn_id, "time": tx.timestamp}), 201


@blockchain_bp.route("/credit", methods=["POST"])
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


@blockchain_bp.route("/debit", methods=["POST"])
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


@blockchain_bp.route("/balance", methods=["GET"])
def view_balance():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded = decode_token(token)

    account_number = decoded["account_number"]
    wallet_data = Wallet.find_by_account_number(account_number)

    if not wallet_data:
        return jsonify({"error": "Wallet not found"}), 404

    return jsonify({"balance": wallet_data.get("balance", 0)}), 200


@blockchain_bp.route("/history", methods=["GET"])
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
