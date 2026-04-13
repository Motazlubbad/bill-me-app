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
    <Card>
      <CardHeader>
        <CardTitle>Month Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{formatMonth(currentMonth)}</span>
            <span className="font-bold">{formatCurrency(currentMonthTotal, currency)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{formatMonth(previousMonth)}</span>
            <span className="font-bold">{formatCurrency(previousMonthTotal, currency)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Difference</span>
              <div className="flex items-center gap-1">
                {diff > 0 ? (
                  <ArrowUp className="h-4 w-4 text-red-500" />
                ) : diff < 0 ? (
                  <ArrowDown className="h-4 w-4 text-green-500" />
                ) : (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                )}
                <span
                  className={`font-bold ${
                    diff > 0 ? "text-red-500" : diff < 0 ? "text-green-500" : ""
                  }`}
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
