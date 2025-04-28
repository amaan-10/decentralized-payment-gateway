#models/blockchain.py
from datetime import datetime
import hashlib
from db import blocks_collection
from models.transaction import Transaction

class Block:
    def __init__(self, transactions, previous_hash):
        self.transactions = transactions
        self.previous_hash = previous_hash
        self.timestamp = datetime.now()
        self.nonce = 0
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = f"{[tx.tx_hash for tx in self.transactions]}{self.previous_hash}{self.timestamp}{self.nonce}"
        return hashlib.sha256(block_string.encode()).hexdigest()

    def mine_block(self, difficulty):
        while not self.hash.startswith('0' * difficulty):
            self.nonce += 1
            self.hash = self.calculate_hash()

    def save_to_db(self):
        blocks_collection.insert_one({
            "transactions": [vars(tx) for tx in self.transactions],
            "previous_hash": self.previous_hash,
            "timestamp": self.timestamp,
            "nonce": self.nonce,
            "hash": self.hash
        })

class Blockchain:
    def __init__(self):
        self.difficulty = 4
        self.chain = [self.create_genesis_block()]
        self.pending_transactions = []

    def create_genesis_block(self):
        genesis_tx = Transaction("system", "genesis", 0, "Genesis Block", None)
        block = Block([genesis_tx], "0")
        block.mine_block(self.difficulty)
        block.save_to_db()
        return block

    def get_latest_block(self):
        return self.chain[-1]

    def add_transaction(self, tx):
        self.pending_transactions.append(tx)

    def mine_pending_transactions(self, miner_account):
        if not self.pending_transactions:
            return "No transactions to mine."

        block = Block(self.pending_transactions, self.get_latest_block().hash)
        block.mine_block(self.difficulty)
        block.save_to_db()

        self.chain.append(block)
        self.pending_transactions = []
