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
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(currentMonthTotal, currency)}</div>
          <p className="text-xs mt-1">
            <span className={percentChange >= 0 ? "text-green-600" : "text-red-500"}>
              {percentChange >= 0 ? "↗ +" : "↘ "}{percentChange.toFixed(1)}%
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Last Month */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Last Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(previousMonthTotal, currency)}</div>
        </CardContent>
      </Card>

      {/* Pending */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(pendingTotal, currency)}</div>
          <p className="text-xs mt-1 text-orange-500">
            ○ Awaiting payment
          </p>
        </CardContent>
      </Card>

      {/* Overdue */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Overdue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overdueCount}</div>
          <p className="text-xs mt-1 text-red-500">
            {overdueCount === 0 ? "✓ All caught up!" : "⊘ Requires attention"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
