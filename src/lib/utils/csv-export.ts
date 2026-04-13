import { type Bill } from "@/lib/types/bill";
import { formatDate } from "./format";

export function exportBillsToCSV(bills: Bill[]): void {
  const headers = ["Title", "Category", "Amount", "Currency", "Billing Month", "Due Date", "Status", "Notes"];
  const rows = bills.map((bill) => [
    bill.title,
    bill.category,
    bill.amount.toString(),
    bill.currency,
    bill.billingMonth,
    formatDate(bill.dueDate),
    bill.status,
    bill.notes || "",
  ]);

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `bills-export-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
