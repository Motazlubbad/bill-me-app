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
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{bill.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {bill.category} &middot; {bill.billingMonth}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge
                    status={overdue && bill.status === "pending" ? "overdue" : bill.status}
                  />
                  <span className="font-semibold text-sm">
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
