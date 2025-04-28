#utils/crypto_utils.py
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.fernet import Fernet
import base64
import os

def generate_keys():
    # Generate a unique private-public key pair every time
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    public_key = private_key.public_key()
    return private_key, public_key

def serialize_private_key(private_key, password: str):
    salt = os.urandom(16)  # Generate a new salt each time
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=480000)
    key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
    fernet = Fernet(key)
    pem = private_key.private_bytes(encoding=serialization.Encoding.PEM, 
                                    format=serialization.PrivateFormat.PKCS8,
                                    encryption_algorithm=serialization.NoEncryption())
    encrypted_pem = fernet.encrypt(pem)
    return encrypted_pem, salt

def decrypt_private_key(encrypted_pem, password: str, salt):
    if not password:
        raise ValueError("Password cannot be None")

    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=480000)
    key = base64.urlsafe_b64encode(kdf.derive(password.encode()))  # Encoding the password
    fernet = Fernet(key)
    decrypted_pem = fernet.decrypt(encrypted_pem)
    private_key = serialization.load_pem_private_key(decrypted_pem, password=None)
    return private_key

def sign_message(private_key, message: bytes):
    signature = private_key.sign(message, padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH),
                                 hashes.SHA256())
    return signature

def verify_signature(public_key, message: bytes, signature):
    public_key.verify(signature, message,
                      padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH),
                      hashes.SHA256())
