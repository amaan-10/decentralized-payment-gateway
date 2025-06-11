#models/transaction.py
from datetime import datetime
import hashlib
from utils.crypto_utils import sign_message
from db import transactions_collection
import random
import string
import pytz

class Transaction:
    def __init__(self, sender_account, receiver_account, amount, note, private_pin_key):
        txn_id = "TXN" + ''.join(random.choices(string.ascii_lowercase + string.digits, k=8)).upper()
        ist = pytz.timezone('Asia/Kolkata')

        self.txn_id = txn_id
        self.sender_account = sender_account
        self.receiver_account = receiver_account
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
        content = f"{self.txn_id}{self.sender_account}{self.receiver_account}{self.amount}{self.timestamp}{self.note}"
        return hashlib.sha256(content.encode()).hexdigest()


    def sign(self, private_pin_key):
        return sign_message(private_pin_key, self.tx_hash.encode())

    def save_to_db(self):
        # Save the transaction details to MongoDB
        transaction_data = {
            "txn_id": self.txn_id,
            "sender_account": self.sender_account,
            "receiver_account": self.receiver_account,
            "amount": self.amount,
            "note": self.note,
            "timestamp": self.timestamp,
            "tx_hash": self.tx_hash,
            "signature": self.signature
        }
        transactions_collection.insert_one(transaction_data)
