# db.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

mongodb_uri = os.getenv("MONGODB_URI")
client = MongoClient(mongodb_uri)
db = client["blockchain_bank"]
wallets_collection = db["wallets"]
blocks_collection = db["blocks"]
transactions_collection = db["transactions"]