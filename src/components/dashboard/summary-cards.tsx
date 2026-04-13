"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format";
import { DollarSign, TrendingDown, TrendingUp, AlertTriangle, Clock } from "lucide-react";

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
  const cards = [
    {
      title: "This Month",
      value: formatCurrency(currentMonthTotal, currency),
      description: `vs ${formatCurrency(previousMonthTotal, currency)} last month`,
      icon: DollarSign,
      trend: percentChange,
    },
    {
      title: "Last Month",
      value: formatCurrency(previousMonthTotal, currency),
      description: "Previous month total",
      icon: percentChange > 0 ? TrendingUp : TrendingDown,
    },
    {
      title: "Pending",
      value: formatCurrency(pendingTotal, currency),
      description: "Awaiting payment",
      icon: Clock,
    },
    {
      title: "Overdue",
      value: overdueCount.toString(),
      description: overdueCount === 0 ? "All caught up!" : "Bills past due date",
      icon: AlertTriangle,
      alert: overdueCount > 0,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon
              className={`h-4 w-4 ${card.alert ? "text-red-500" : "text-muted-foreground"}`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {card.trend !== undefined && (
                <span
                  className={
                    card.trend > 0
                      ? "text-red-500"
                      : card.trend < 0
                        ? "text-green-500"
                        : ""
                  }
                >
                  {card.trend > 0 ? "+" : ""}
                  {card.trend.toFixed(1)}%{" "}
                </span>
              )}
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
