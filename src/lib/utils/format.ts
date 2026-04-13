import { format, parseISO } from "date-fns";
import { Timestamp } from "firebase/firestore";

export function formatCurrency(amount: number, currency = "TRY"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | Timestamp): string {
  const d = date instanceof Timestamp ? date.toDate() : date;
  return format(d, "dd MMM yyyy");
}

export function formatMonth(billingMonth: string): string {
  const date = parseISO(`${billingMonth}-01`);
  return format(date, "MMMM yyyy");
}

export function formatMonthShort(billingMonth: string): string {
  const date = parseISO(`${billingMonth}-01`);
  return format(date, "MMM yyyy");
}

export function getCurrentMonth(): string {
  return format(new Date(), "yyyy-MM");
}

export function getPreviousMonth(billingMonth?: string): string {
  const date = billingMonth ? parseISO(`${billingMonth}-01`) : new Date();
  const prev = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  return format(prev, "yyyy-MM");
}
