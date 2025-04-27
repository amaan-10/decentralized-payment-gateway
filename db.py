# db.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import os

load_dotenv()

mongodb_uri = os.getenv("MONGODB_URI")

client = MongoClient(mongodb_uri)

db = client["blockchain_db"]
wallets_collection = db["wallets"]
blocks_collection = db["blocks"]

def save_wallet_to_db(wallet):
    wallets_collection.insert_one({
        "account_number": wallet.account_number,
        "private_key": wallet.get_private_key(),
        "public_key": wallet.get_public_key()
    })

def save_block_to_db(block):
    block_data = {
        "transactions": [{
            "sender_account": tx.sender_account,
            "receiver_account": tx.receiver_account,
            "amount": tx.amount,
            "timestamp": tx.timestamp,
            "description": tx.description,
            "tx_hash": tx.tx_hash
        } for tx in block.transactions],
        "previous_hash": block.previous_hash,
        "timestamp": block.timestamp,
        "nonce": block.nonce,
        "hash": block.hash
    }
    blocks_collection.insert_one(block_data)
