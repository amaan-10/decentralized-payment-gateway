#models/transaction.py
from datetime import datetime
import hashlib
from utils.crypto_utils import sign_message
from db import transactions_collection

class Transaction:
    def __init__(self, sender_account, receiver_account, amount, description, private_key):
        self.sender_account = sender_account
        self.receiver_account = receiver_account
        self.amount = amount
        self.description = description
        self.timestamp = datetime.now()
        self.tx_hash = self.calculate_hash()
        self.signature = None

        if private_key:
            self.signature = self.sign(private_key)
        else:
            self.signature = None


    def calculate_hash(self):
        content = f"{self.sender_account}{self.receiver_account}{self.amount}{self.timestamp}{self.description}"
        return hashlib.sha256(content.encode()).hexdigest()


    def sign(self, private_key):
        return sign_message(private_key, self.tx_hash.encode())

    def save_to_db(self):
        # Save the transaction details to MongoDB
        transaction_data = {
            "sender_account": self.sender_account,
            "receiver_account": self.receiver_account,
            "amount": self.amount,
            "description": self.description,
            "timestamp": self.timestamp,
            "tx_hash": self.tx_hash,
            "signature": self.signature
        }
        transactions_collection.insert_one(transaction_data)
