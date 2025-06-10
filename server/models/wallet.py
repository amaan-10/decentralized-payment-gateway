#models/wallet.py
import random
import base64
from datetime import datetime
from db import wallets_collection
from utils.crypto_utils import generate_keys, serialize_private_key
from cryptography.hazmat.primitives import serialization

class Wallet:
    def __init__(self, password, firstname, lastname, fullname, email):
        # Generate a 12-digit unique account number
        self.account_number = self.generate_unique_account_number()
        self.private_key, self.public_key = generate_keys() 
        self.password = password
        self.firstname = firstname
        self.lastname = lastname
        self.fullname = fullname
        self.email = email
        self.balance = 0
        self.created_at = datetime.now()  

    def generate_unique_account_number(self):
        while True:
            account_number = str(random.randint(100000000000, 999999999999))  
            if wallets_collection.find_one({"account_number": account_number}) is None:
                return account_number  

    def save_to_db(self):
        encrypted_private_key, salt = serialize_private_key(self.private_key, self.password)
        
        wallet_data = {
            "account_number": self.account_number,
            "first_name": self.firstname,  
            "last_name": self.lastname,
            "full_name": self.fullname,
            "email": self.email,
            "balance": self.balance,
            "created_at": self.created_at, 
            "encrypted_private_key": base64.b64encode(encrypted_private_key).decode(),
            "salt": base64.b64encode(salt).decode(),
            "public_key": self.public_key.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo
            ).decode().strip().replace('-----BEGIN PUBLIC KEY-----\n', '').replace('\n-----END PUBLIC KEY-----', ''),
            "has_set_pin": False,
        }
        
        wallets_collection.insert_one(wallet_data)

    @staticmethod
    def find_by_account_number(account_number):
        return wallets_collection.find_one({"account_number": account_number})
    
    @staticmethod
    def find_by_email(email):
        return wallets_collection.find_one({"email": email})

    @staticmethod
    def update_balance(account_number, amount_change):
        wallets_collection.update_one(
            {"account_number": account_number},
            {"$inc": {"balance": amount_change}}
        )