"""Seed Firestore with sample bill data for development/testing."""

import sys
from datetime import datetime, timedelta
from firebase_admin import firestore
from firebase_admin_config import get_db


SAMPLE_BILLS = [
    {"title": "Electricity Bill", "category": "Utilities", "amount": 320.50, "status": "paid"},
    {"title": "Water Bill", "category": "Utilities", "amount": 85.00, "status": "paid"},
    {"title": "Internet Service", "category": "Internet", "amount": 199.90, "status": "pending"},
    {"title": "Rent Payment", "category": "Housing", "amount": 5500.00, "status": "paid"},
    {"title": "Netflix Subscription", "category": "Subscriptions", "amount": 99.99, "status": "paid"},
    {"title": "Spotify Premium", "category": "Subscriptions", "amount": 59.99, "status": "pending"},
    {"title": "Car Insurance", "category": "Insurance", "amount": 450.00, "status": "pending"},
    {"title": "Gas Bill", "category": "Utilities", "amount": 210.30, "status": "overdue"},
    {"title": "Phone Bill", "category": "Subscriptions", "amount": 149.90, "status": "paid"},
    {"title": "Public Transit Pass", "category": "Transportation", "amount": 380.00, "status": "paid"},
]

DEFAULT_CATEGORIES = [
    {"name": "Utilities", "icon": "Zap", "color": "#f59e0b"},
    {"name": "Housing", "icon": "Home", "color": "#3b82f6"},
    {"name": "Internet", "icon": "Wifi", "color": "#8b5cf6"},
    {"name": "Subscriptions", "icon": "CreditCard", "color": "#ec4899"},
    {"name": "Transportation", "icon": "Car", "color": "#10b981"},
    {"name": "Insurance", "icon": "Shield", "color": "#6366f1"},
    {"name": "Other", "icon": "MoreHorizontal", "color": "#6b7280"},
]


def seed(user_id: str):
    """Seed categories and bills for a given user."""
    db = get_db()
    now = datetime.now()

    # Seed categories
    cats_ref = db.collection("users").document(user_id).collection("categories")
    for cat in DEFAULT_CATEGORIES:
        cats_ref.add({**cat, "createdAt": firestore.SERVER_TIMESTAMP})
    print(f"Seeded {len(DEFAULT_CATEGORIES)} categories.")

    # Seed bills across last 3 months
    bills_ref = db.collection("users").document(user_id).collection("bills")
    count = 0
    for month_offset in range(3):
        month_date = datetime(now.year, now.month - month_offset, 1)
        billing_month = month_date.strftime("%Y-%m")

        for bill in SAMPLE_BILLS:
            due_date = month_date + timedelta(days=25)
            bills_ref.add({
                **bill,
                "currency": "TRY",
                "billingMonth": billing_month,
                "dueDate": due_date,
                "notes": "",
                "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            })
            count += 1

    print(f"Seeded {count} bills across 3 months.")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python seed_data.py <firebase-user-uid>")
        sys.exit(1)
    seed(sys.argv[1])
