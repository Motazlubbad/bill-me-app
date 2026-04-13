"use client";

import { useMemo } from "react";
import { type Bill } from "@/lib/types/bill";
import {
  calculateMonthTotal,
  calculateCategoryTotals,
  getMonthlyTrend,
  getStatusCounts,
  isOverdue,
} from "@/lib/utils/bill-utils";
import { getCurrentMonth, getPreviousMonth } from "@/lib/utils/format";

export function useDashboard(bills: Bill[]) {
  return useMemo(() => {
    const currentMonth = getCurrentMonth();
    const previousMonth = getPreviousMonth();

    const currentMonthTotal = calculateMonthTotal(bills, currentMonth);
    const previousMonthTotal = calculateMonthTotal(bills, previousMonth);

    const percentChange =
      previousMonthTotal > 0
        ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
        : 0;

    const overdueCount = bills.filter(
      (b) => b.status !== "paid" && isOverdue(b)
    ).length;

    const pendingTotal = bills
      .filter((b) => b.status === "pending")
      .reduce((sum, b) => sum + b.amount, 0);

    const categoryTotals = calculateCategoryTotals(
      bills.filter((b) => b.billingMonth === currentMonth)
    );

    const monthlyTrend = getMonthlyTrend(bills, 12);
    const statusCounts = getStatusCounts(bills);

    const recentBills = [...bills]
      .sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      })
      .slice(0, 5);

    return {
      currentMonth,
      currentMonthTotal,
      previousMonthTotal,
      percentChange,
      overdueCount,
      pendingTotal,
      categoryTotals,
      monthlyTrend,
      statusCounts,
      recentBills,
    };
  }, [bills]);
}
