"""Generate a monthly spending report for a user."""

import sys
from collections import defaultdict
from firebase_admin_config import get_db


def generate_report(user_id: str, month: str = None):
    """Generate spending report grouped by category."""
    db = get_db()
    bills_ref = db.collection("users").document(user_id).collection("bills")

    if month:
        docs = bills_ref.where("billingMonth", "==", month).stream()
    else:
        docs = bills_ref.stream()

    by_category = defaultdict(float)
    by_status = defaultdict(int)
    total = 0.0
    count = 0

    for doc in docs:
        data = doc.to_dict()
        amount = data.get("amount", 0)
        category = data.get("category", "Other")
        status = data.get("status", "unknown")

        by_category[category] += amount
        by_status[status] += 1
        total += amount
        count += 1

    # Print report
    header = f"Monthly Report{f' - {month}' if month else ' - All Time'}"
    print(f"\n{'=' * 50}")
    print(f"  {header}")
    print(f"{'=' * 50}")
    print(f"\n  Total Bills: {count}")
    print(f"  Total Amount: {total:,.2f} TRY\n")

    print("  By Category:")
    for cat, amt in sorted(by_category.items(), key=lambda x: -x[1]):
        pct = (amt / total * 100) if total > 0 else 0
        print(f"    {cat:20s}  {amt:>10,.2f} TRY  ({pct:.1f}%)")

    print(f"\n  By Status:")
    for status, cnt in sorted(by_status.items()):
        print(f"    {status:20s}  {cnt} bills")

    print(f"\n{'=' * 50}\n")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python monthly_report.py <firebase-user-uid> [YYYY-MM]")
        sys.exit(1)
    uid = sys.argv[1]
    m = sys.argv[2] if len(sys.argv) > 2 else None
    generate_report(uid, m)
