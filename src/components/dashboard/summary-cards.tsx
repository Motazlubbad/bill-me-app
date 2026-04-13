"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format";

interface SummaryCardsProps {
  currentMonthTotal: number;
  previousMonthTotal: number;
  percentChange: number;
  overdueCount: number;
  pendingTotal: number;
  currency?: string;
}

export function SummaryCards({
  currentMonthTotal,
  previousMonthTotal,
  percentChange,
  overdueCount,
  pendingTotal,
  currency = "TRY",
}: SummaryCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* This Month */}
      <Card style={{ border: "1px solid #d9d9d9", borderRadius: 8, padding: 0 }}>
        <CardHeader className="pb-2">
          <CardTitle style={{ fontSize: 14, fontWeight: 600, color: "#757575" }}>
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#1e1e1e" }}>
            {formatCurrency(currentMonthTotal, currency)}
          </div>
          <p className="text-xs mt-1">
            <span style={{ color: percentChange >= 0 ? "#02542d" : "#900b09" }}>
              {percentChange >= 0 ? "↗ +" : "↘ "}{percentChange.toFixed(1)}%
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Last Month */}
      <Card style={{ border: "1px solid #d9d9d9", borderRadius: 8, padding: 0 }}>
        <CardHeader className="pb-2">
          <CardTitle style={{ fontSize: 14, fontWeight: 600, color: "#757575" }}>
            Last Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#1e1e1e" }}>
            {formatCurrency(previousMonthTotal, currency)}
          </div>
        </CardContent>
      </Card>

      {/* Pending */}
      <Card style={{ border: "1px solid #d9d9d9", borderRadius: 8, padding: 0 }}>
        <CardHeader className="pb-2">
          <CardTitle style={{ fontSize: 14, fontWeight: 600, color: "#757575" }}>
            Pending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#1e1e1e" }}>
            {formatCurrency(pendingTotal, currency)}
          </div>
          <p className="text-xs mt-1" style={{ color: "#e8b931" }}>
            ○ Awaiting payment
          </p>
        </CardContent>
      </Card>

      {/* Overdue */}
      <Card style={{ border: "1px solid #d9d9d9", borderRadius: 8, padding: 0 }}>
        <CardHeader className="pb-2">
          <CardTitle style={{ fontSize: 14, fontWeight: 600, color: "#757575" }}>
            Overdue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#1e1e1e" }}>
            {overdueCount}
          </div>
          <p
            className="text-xs mt-1"
            style={{ color: overdueCount === 0 ? "#02542d" : "#ec221f" }}
          >
            {overdueCount === 0 ? "✓ All caught up!" : "⊘ Requires attention"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
