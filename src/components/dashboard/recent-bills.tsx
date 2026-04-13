"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/bills/status-badge";
import { type Bill } from "@/lib/types/bill";
import { formatCurrency } from "@/lib/utils/format";
import { isOverdue } from "@/lib/utils/bill-utils";

interface RecentBillsProps {
  bills: Bill[];
}

export function RecentBills({ bills }: RecentBillsProps) {
  if (bills.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No bills yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bills.map((bill) => {
            const overdue = isOverdue(bill);
            return (
              <Link
                key={bill.id}
                href={`/bills/${bill.id}`}
                className="flex items-center justify-between transition-colors"
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: 8,
                  padding: 12,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "";
                }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1e1e1e" }}>{bill.title}</p>
                  <p style={{ fontSize: 14, color: "#757575" }}>
                    {bill.category} &middot; {bill.billingMonth}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge
                    status={overdue && bill.status === "pending" ? "overdue" : bill.status}
                  />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1e1e1e" }}>
                    {formatCurrency(bill.amount, bill.currency)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
