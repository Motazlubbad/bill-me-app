"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getCurrentMonth, getPreviousMonth, formatMonth } from "@/lib/utils/format";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface MonthComparisonProps {
  currentMonthTotal: number;
  previousMonthTotal: number;
  currency?: string;
}

export function MonthComparison({
  currentMonthTotal,
  previousMonthTotal,
  currency = "TRY",
}: MonthComparisonProps) {
  const diff = currentMonthTotal - previousMonthTotal;
  const currentMonth = getCurrentMonth();
  const previousMonth = getPreviousMonth();

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Month Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{formatMonth(currentMonth)}</span>
            <span className="font-bold text-foreground">{formatCurrency(currentMonthTotal, currency)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{formatMonth(previousMonth)}</span>
            <span className="font-bold text-foreground">{formatCurrency(previousMonthTotal, currency)}</span>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Difference</span>
              <div className="flex items-center gap-1">
                {diff > 0 ? (
                  <ArrowUp className="h-4 w-4 text-[#ec221f]" />
                ) : diff < 0 ? (
                  <ArrowDown className="h-4 w-4 text-[#14ae5c]" />
                ) : (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                )}
                <span
                  className={`font-bold ${diff > 0 ? "text-[#ec221f]" : diff < 0 ? "text-[#14ae5c]" : "text-foreground"}`}
                >
                  {formatCurrency(Math.abs(diff), currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
