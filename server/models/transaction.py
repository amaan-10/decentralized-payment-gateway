#models/transaction.py
from datetime import datetime
import hashlib
from utils.crypto_utils import sign_message
from db import transactions_collection
import random
import string
import pytz

class Transaction:
    def __init__(self, sender_account, receiver_account, sender_name, receiver_name, amount, note, private_pin_key):
        txn_id = "TXN" + ''.join(random.choices(string.ascii_lowercase + string.digits, k=8)).upper()
        ist = pytz.timezone('Asia/Kolkata')

        self.txn_id = txn_id
        self.sender = {
            "account": sender_account,
            "name": sender_name
        }
        self.receiver = {
            "account": receiver_account,
            "name": receiver_name
        }
        self.amount = amount
        self.note = note
        self.timestamp = datetime.now(ist)
        self.tx_hash = self.calculate_hash()
        self.signature = None

        if private_pin_key:
            self.signature = self.sign(private_pin_key)
        else:
            self.signature = None


    def calculate_hash(self):
        content = f"{self.txn_id}{self.sender['account']}{self.receiver['account']}{self.amount}{self.timestamp}{self.note}"
        return hashlib.sha256(content.encode()).hexdigest()


    def sign(self, private_pin_key):
        return sign_message(private_pin_key, self.tx_hash.encode())

    def save_to_db(self):
        # Save the transaction details to MongoDB
        transaction_data = {
            "txn_id": self.txn_id,
            "sender": self.sender,
            "receiver": self.receiver,
            "amount": self.amount,
            "note": self.note,
            "timestamp": self.timestamp,
            "tx_hash": self.tx_hash,
            "signature": self.signature
        }
        transactions_collection.insert_one(transaction_data)

    @staticmethod
    def find_by_account_number(account_number):
        transactions = transactions_collection.find({
            "$or": [
                {"sender.account": account_number},
                {"receiver.account": account_number}
            ]
        })

        allowed_keys = {
            "amount",
            "note",
            "receiver",
            "sender",
            "timestamp",
            "_id"
        }

        serialized_transactions = []
        for txn in transactions:
            txn["_id"] = str(txn["_id"])

            clean_txn = {}
            for key in allowed_keys:
                if key in txn:
                    value = txn[key]
                    if isinstance(value, bytes):
                        try:
                            value = value.decode("utf-8")
                        except Exception:
                            value = str(value)
                    clean_txn[key] = value

            if "sender" in txn and isinstance(txn["sender"], dict) and txn["sender"].get("account") == account_number:
                clean_txn["type"] = "send"
            elif "receiver" in txn and isinstance(txn["receiver"], dict) and txn["receiver"].get("account") == account_number:
                clean_txn["type"] = "received"

            serialized_transactions.append(clean_txn)

        return serialized_transactions
