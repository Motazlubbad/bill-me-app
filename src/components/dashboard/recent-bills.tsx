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
      <Card className="border border-border">
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
    <Card className="border border-border">
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
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-[#eff6ff] hover:border-[#bfdbfe]"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{bill.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {bill.category} &middot; {bill.billingMonth}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge
                    status={overdue && bill.status === "pending" ? "overdue" : bill.status}
                  />
                  <span className="text-sm font-semibold text-foreground">
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
