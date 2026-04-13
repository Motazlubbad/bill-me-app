import { type Bill } from "@/lib/types/bill";
import { Timestamp } from "firebase/firestore";

export function isOverdue(bill: Bill): boolean {
  if (bill.status === "paid") return false;
  const now = new Date();
  const dueDate = bill.dueDate instanceof Timestamp ? bill.dueDate.toDate() : bill.dueDate;
  return now > dueDate;
}

export function groupByMonth(bills: Bill[]): Record<string, Bill[]> {
  return bills.reduce(
    (acc, bill) => {
      const month = bill.billingMonth;
      if (!acc[month]) acc[month] = [];
      acc[month].push(bill);
      return acc;
    },
    {} as Record<string, Bill[]>
  );
}

export function calculateMonthTotal(bills: Bill[], month: string): number {
  return bills
    .filter((b) => b.billingMonth === month)
    .reduce((sum, b) => sum + b.amount, 0);
}

export function calculateCategoryTotals(
  bills: Bill[]
): { category: string; total: number }[] {
  const totals: Record<string, number> = {};
  for (const bill of bills) {
    totals[bill.category] = (totals[bill.category] || 0) + bill.amount;
  }
  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

export function getMonthlyTrend(
  bills: Bill[],
  months: number = 12
): { month: string; total: number }[] {
  const now = new Date();
  const result: { month: string; total: number }[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    result.push({ month, total: calculateMonthTotal(bills, month) });
  }

  return result;
}

export function getStatusCounts(bills: Bill[]): Record<string, number> {
  return bills.reduce(
    (acc, bill) => {
      acc[bill.status] = (acc[bill.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}
