#utils/jwt_utils.py
import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")

def generate_token(account_number):
    payload = {
        "account_number": account_number,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    return token

def decode_token(token):
    return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
