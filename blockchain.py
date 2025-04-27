# blockchain.py
import hashlib
import time
from wallet import Wallet
from db import save_block_to_db


class Transaction:
    def __init__(self, sender_account, receiver_account, amount, timestamp, description=""):
        self.sender_account = sender_account
        self.receiver_account = receiver_account
        self.amount = amount
        self.timestamp = timestamp
        self.description = description
        self.tx_hash = self.calculate_hash()

    def calculate_hash(self):
        tx_content = f"{self.sender_account}{self.receiver_account}{self.amount}{self.timestamp}{self.description}"
        return hashlib.sha256(tx_content.encode()).hexdigest()


class Block:
    def __init__(self, transactions, previous_hash, timestamp):
        self.transactions = transactions
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.nonce = 0
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_content = f"{[tx.tx_hash for tx in self.transactions]}{self.previous_hash}{self.timestamp}{self.nonce}"
        return hashlib.sha256(block_content.encode()).hexdigest()

    def mine_block(self, difficulty):
        while not self.hash.startswith('0' * difficulty):
            self.nonce += 1
            self.hash = self.calculate_hash()


class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]
        self.difficulty = 4
        self.pending_transactions = []
        self.account_balances = {}

    def create_genesis_block(self):
        genesis_transaction = Transaction("System", "Genesis", 0, time.time(), "Genesis Block")
        block = Block([genesis_transaction], "0", time.time())
        save_block_to_db(block)
        return block

    def get_latest_block(self):
        return self.chain[-1]

    def add_transaction(self, transaction):
        self.pending_transactions.append(transaction)

    def mine_pending_transactions(self, miner_account, reward=False):
        if not self.pending_transactions:
            print("No transactions to mine.")
            return

        block = Block(self.pending_transactions, self.get_latest_block().hash, time.time())
        block.mine_block(self.difficulty)
        print("Block mined successfully!")

        self.chain.append(block)
        save_block_to_db(block)
        self.pending_transactions = []

        if reward:
            reward_tx = Transaction("System", miner_account, 50, time.time(), "Mining Reward")
            self.add_transaction(reward_tx)

        self.update_balances()

    def update_balances(self):
        self.account_balances.clear()
        for block in self.chain:
            for tx in block.transactions:
                self.account_balances[tx.sender_account] = self.account_balances.get(tx.sender_account, 0) - tx.amount
                self.account_balances[tx.receiver_account] = self.account_balances.get(tx.receiver_account, 0) + tx.amount

    def get_balance(self, account_number):
        return self.account_balances.get(account_number, 0)

    def get_transaction_history(self, account_number):
        history = []
        for block in self.chain:
            for tx in block.transactions:
                if tx.sender_account == account_number or tx.receiver_account == account_number:
                    history.append(tx)
        return history

    def credit_account(self, account_number, amount):
        timestamp = time.time()
        tx = Transaction("System", account_number, amount, timestamp, "Credit")
        self.add_transaction(tx)
        self.mine_pending_transactions(account_number, reward=False)
        print(f"Credited {amount} to {account_number}")

    def debit_account(self, account_number, amount):
        if self.get_balance(account_number) >= amount:
            timestamp = time.time()
            tx = Transaction(account_number, "System", amount, timestamp, "Debit")
            self.add_transaction(tx)
            self.mine_pending_transactions(account_number, reward=False)
            print(f"Debited {amount} from {account_number}")
        else:
            print("Insufficient balance.")
