import bcrypt

def hash_pin(pin: str) -> str:
    """Hash a 4-digit PIN using bcrypt."""
    hashed = bcrypt.hashpw(pin.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')

def verify_pin(pin: str, hashed_pin: str) -> bool:
    """Verify a plain PIN against its hashed version."""
    return bcrypt.checkpw(pin.encode('utf-8'), hashed_pin.encode('utf-8'))
