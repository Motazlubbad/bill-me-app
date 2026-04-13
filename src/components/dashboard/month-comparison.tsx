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
            <span className="text-sm" style={{ color: "#757575" }}>{formatMonth(currentMonth)}</span>
            <span style={{ fontWeight: 700, color: "#1e1e1e" }}>{formatCurrency(currentMonthTotal, currency)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "#757575" }}>{formatMonth(previousMonth)}</span>
            <span style={{ fontWeight: 700, color: "#1e1e1e" }}>{formatCurrency(previousMonthTotal, currency)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: "#1e1e1e" }}>Difference</span>
              <div className="flex items-center gap-1">
                {diff > 0 ? (
                  <ArrowUp className="h-4 w-4" style={{ color: "#900b09" }} />
                ) : diff < 0 ? (
                  <ArrowDown className="h-4 w-4" style={{ color: "#02542d" }} />
                ) : (
                  <Minus className="h-4 w-4" style={{ color: "#757575" }} />
                )}
                <span
                  style={{
                    fontWeight: 700,
                    color: diff > 0 ? "#900b09" : diff < 0 ? "#02542d" : "#1e1e1e",
                  }}
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
