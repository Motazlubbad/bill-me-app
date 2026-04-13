"""Firebase Admin SDK initialization for Python scripts."""

import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

load_dotenv()

_initialized = False


def get_db():
    """Get Firestore client, initializing Firebase Admin if needed."""
    global _initialized
    if not _initialized:
        cred_path = os.getenv(
            "FIREBASE_SERVICE_ACCOUNT_PATH", "./scripts/service-account.json"
        )
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        _initialized = True
    return firestore.client()
