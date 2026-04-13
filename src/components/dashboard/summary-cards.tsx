"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format";
import { TrendingUp, TrendingDown, Clock, AlertTriangle } from "lucide-react";

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
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            This Month
          </CardTitle>
          <div className="rounded-full bg-[#eff6ff] p-1.5">
            <TrendingUp className="h-4 w-4 text-[#2563eb]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(currentMonthTotal, currency)}
          </div>
          <p className="text-xs mt-1">
            <span className={percentChange >= 0 ? "text-[#14ae5c]" : "text-[#ec221f]"}>
              {percentChange >= 0 ? "↗ +" : "↘ "}{percentChange.toFixed(1)}%
            </span>
            <span className="text-muted-foreground ml-1">vs last month</span>
          </p>
        </CardContent>
      </Card>

      {/* Last Month */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Last Month
          </CardTitle>
          <div className="rounded-full bg-[#f5f5f5] p-1.5">
            <TrendingDown className="h-4 w-4 text-[#757575]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(previousMonthTotal, currency)}
          </div>
        </CardContent>
      </Card>

      {/* Pending */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pending
          </CardTitle>
          <div className="rounded-full bg-[#fff1c2] p-1.5">
            <Clock className="h-4 w-4 text-[#e8b931]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(pendingTotal, currency)}
          </div>
          <p className="text-xs mt-1 text-[#e8b931]">
            Awaiting payment
          </p>
        </CardContent>
      </Card>

      {/* Overdue */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Overdue
          </CardTitle>
          <div className={`rounded-full p-1.5 ${overdueCount > 0 ? "bg-[#fee9e7]" : "bg-[#ebffee]"}`}>
            <AlertTriangle className={`h-4 w-4 ${overdueCount > 0 ? "text-[#ec221f]" : "text-[#14ae5c]"}`} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {overdueCount}
          </div>
          <p className={`text-xs mt-1 ${overdueCount === 0 ? "text-[#14ae5c]" : "text-[#ec221f]"}`}>
            {overdueCount === 0 ? "All caught up!" : "Requires attention"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
