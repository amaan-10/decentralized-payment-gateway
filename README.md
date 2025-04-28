# 🏦 Blockchain-Based Banking System

This project implements a **banking application** where all **transactions (credits, debits, transfers)** are securely stored on a **private blockchain**.  
It ensures transparency, immutability, and trust without relying on third-party verifications.

---

## 📚 Features

- Create secure transactions (credit, debit, transfer)
- Blockchain-backed ledger for storing transactions
- Mining new blocks with adjustable difficulty
- Wallet creation with encrypted private keys
- Authentication with JWT tokens
- Real-time balance updates
- Transaction history retrieval

---

## 🏗️ Project Architecture

```plaintext
/project-root
│
├── models/
├── blockchain.py     # Blockchain & Block classes
├── transaction.py    # Transaction model
├── wallet.py         # Wallet model (account, balance, keys)
├── routes/
│   ├── auth_routes.py  # APIs for login, signup
│   ├── blockchain_routes.py  # APIs for credit, debit, transaction
├── utils/
│   ├── crypto_utils.py     # Encrypt/Decrypt private keys
│   ├── jwt_utils.py       # JWT authentication functions
│
├── db.py                 # MongoDB connection (blocks_collection, wallets_collection)
├── app.py                     # Flask server runner
├── requirements.txt           # Python dependencies
└── README.md                  # Project documentation
```

## 📈 System Architecture Flow
```
┌──────────────────────┐
│      Client App      │
│ (Postman / Frontend) │
└──────────┬───────────┘
           │  (API Request)
           ▼
┌───────────────────────────────┐
│        Flask Server           │
│ (blockchain_bp - Blueprint)   │
└──────────┬────────────────────┘
           │
           ▼
┌───────────────────────────────┐
│      API Endpoints            │
│ - /transaction                │
│ - /credit                     │
│ - /debit                      │
│ - /balance                    │
│ - /transactions/history       │
└──────────┬────────────────────┘
           │
           ▼
┌───────────────────────────────┐
│        Core Logic             │
│ - Wallet Management           │
│ - Transaction Signing         │
│ - Blockchain Mining           │
│ - Balance Calculation         │
└──────────┬────────────────────┘
           │
           ▼
┌───────────────────────────────┐
│           Models              │
│ - Blockchain / Block          │
│ - Transaction                 │
│ - Wallet                      │
└──────────┬────────────────────┘
           │
           ▼
┌───────────────────────────────┐
│         Database (MongoDB)    │
│ - wallets_collection          │
│ - blocks_collection           │
│ - transactions_collection     │
└───────────────────────────────┘
```

## 🛠️ Installation
### 1. Clone the Repository
```
git clone https://github.com/your-username/blockchain-banking-system.git
cd blockchain-banking-system
```
### 2. Set up a Virtual Environment
```
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
```
### 3. Install Dependencies
```
pip install -r requirements.txt
```
### 4. Set up MongoDB
- Install and start MongoDB locally or connect to MongoDB Atlas.
- Update the MongoDB URI in db.py if needed.

### 5. Run the Flask Application
```
python app.py
```

## 📡 Available API Endpoints

| Endpoint | Method | Description |
| --- | --- | --- |
| `/transaction` | `POST` | Create a transaction (transfer) |
| `/credit` | `POST` | Credit amount to user account |
| `/debit` | `POST` | Debit amount from user account |
| `/balance` | `GET` | View user's wallet balance |
| `/transactions/history` | `GET` | View user's transaction history |

## 🔥 Future Scope
- ### Smart Contracts:
    Integrate smart contracts for conditional transactions (loan repayment, recurring payments, etc.).

- ### Multi-Signature Wallets:
    Add support for joint accounts requiring multiple signatures to approve large transactions.

- ### Analytics Dashboard:
    Show visual charts for user spending patterns, saving goals, financial health tracking.

- ### Rewards for Mining:
    Implement reward system for miners who mine blocks (similar to Bitcoin mining rewards).

- ### Blockchain Explorer:
    Build a UI frontend to explore all blocks, transactions, mining details.

- ### Zero Knowledge Proofs (ZKP):
    Improve transaction privacy with ZKP so amounts can stay hidden while being verified.

- ### Cross-Chain Transfers:
    Future integration with external blockchain networks (Ethereum, Solana).

## 🛡️ Security Highlights
- Transactions are digitally signed using user's private key.
- Wallet private keys are encrypted with user-defined password.
- Passwords and sensitive data are never stored in plaintext.
- Blocks are mined with Proof-of-Work (adjustable difficulty).
