#routes/accounts_routes.py
from flask import Blueprint, request, jsonify
from models.wallet import Wallet
from flask_cors import cross_origin

accounts_bp = Blueprint('accounts', __name__)

@accounts_bp.route("/verify", methods=["GET"])
@cross_origin(
    origins=["http://localhost:3000", "https://depayment.vercel.app"],
    supports_credentials=True
)
def verify_account():
    account_number = request.args.get("accountNumber")

    if not account_number:
        return jsonify({"success": False, "error": "Account number is required"}), 400

    account = Wallet.find_by_account_number(account_number)

    if account:
        return jsonify({
            "exists": True,
            "accountNumber": account_number,
            "first_name": account["first_name"],
            "last_name": account["last_name"],
            "full_name": account["full_name"]
        }), 200
    else:
        return jsonify({
            "exists": False,
            "error": "Account not found"
        }), 404