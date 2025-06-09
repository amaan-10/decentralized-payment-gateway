#routes/accounts_routes.py
from flask import Blueprint, request, jsonify
from models.wallet import Wallet

accounts_bp = Blueprint('accounts', __name__)

@accounts_bp.route("/verify", methods=["GET"])
def verify_account():
    account_number = request.args.get("accountNumber")

    if not account_number:
        return jsonify({"success": False, "error": "Account number is required"}), 400

    account = Wallet.find_by_account_number(account_number)

    if account:
        return jsonify({
            "exists": True,
            "accountNumber": account_number,
            "name": account["name"]
        }), 200
    else:
        return jsonify({
            "exists": False,
            "error": "Account not found"
        }), 404