# main.py
from blockchain import Blockchain, Transaction
from wallet import Wallet
import time

bank_blockchain = Blockchain()


def create_transaction():
    sender = input("Enter your account number: ")
    receiver = input("Enter receiver's account number: ")
    amount = float(input("Enter amount to send: "))
    description = input("Enter description for transaction: ")

    timestamp = time.time()
    tx = Transaction(sender, receiver, amount, timestamp, description)
    bank_blockchain.add_transaction(tx)
    bank_blockchain.mine_pending_transactions(sender, reward=False)

    print("\n📄 Transaction Receipt:")
    print(f"From: {sender}")
    print(f"To: {receiver}")
    print(f"Amount: {amount}")
    print(f"Description: {description}")
    print(f"Date: {time.ctime(timestamp)}")
    print(f"New Balance: {bank_blockchain.get_balance(sender)}\n")


def create_wallet():
    account_number = input("Enter a new account number: ")
    Wallet(account_number)
    print(f"Wallet created successfully for {account_number}.")


def credit_account():
    account_number = input("Enter account number to credit: ")
    amount = float(input("Enter amount to credit: "))
    bank_blockchain.credit_account(account_number, amount)


def debit_account():
    account_number = input("Enter account number to debit: ")
    amount = float(input("Enter amount to debit: "))
    bank_blockchain.debit_account(account_number, amount)


def view_balance_and_history():
    account_number = input("Enter your account number: ")
    balance = bank_blockchain.get_balance(account_number)
    print(f"\nBalance: {balance}")
    print("Transaction History:")
    for tx in bank_blockchain.get_transaction_history(account_number):
        print(f"From {tx.sender_account} -> {tx.receiver_account}, Amount: {tx.amount}, Description: {tx.description}")


def main():
    while True:
        print("\n--- Blockchain Banking System ---")
        print("1. Create Wallet")
        print("2. Create Transaction")
        print("3. Credit Account")
        print("4. Debit Account")
        print("5. View Balance & Transaction History")
        print("6. Exit")

        choice = input("Enter choice: ")

        if choice == "1":
            create_wallet()
        elif choice == "2":
            create_transaction()
        elif choice == "3":
            credit_account()
        elif choice == "4":
            debit_account()
        elif choice == "5":
            view_balance_and_history()
        elif choice == "6":
            print("Goodbye!")
            break
        else:
            print("Invalid choice, try again.")


if __name__ == "__main__":
    main()
