"""Export a user's bills from Firestore to CSV."""

import sys
import csv
from firebase_admin_config import get_db


def export_bills(user_id: str, output_file: str = "bills_export.csv"):
    """Export all bills for a user to a CSV file."""
    db = get_db()
    bills_ref = db.collection("users").document(user_id).collection("bills")
    docs = bills_ref.order_by("billingMonth").stream()

    rows = []
    for doc in docs:
        data = doc.to_dict()
        rows.append({
            "id": doc.id,
            "title": data.get("title", ""),
            "category": data.get("category", ""),
            "amount": data.get("amount", 0),
            "currency": data.get("currency", "TRY"),
            "billingMonth": data.get("billingMonth", ""),
            "dueDate": str(data.get("dueDate", "")),
            "status": data.get("status", ""),
            "notes": data.get("notes", ""),
        })

    if not rows:
        print("No bills found.")
        return

    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    print(f"Exported {len(rows)} bills to {output_file}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python export_bills.py <firebase-user-uid> [output.csv]")
        sys.exit(1)
    uid = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "bills_export.csv"
    export_bills(uid, out)
