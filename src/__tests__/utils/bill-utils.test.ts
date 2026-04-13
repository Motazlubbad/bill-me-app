import { calculateMonthTotal, calculateCategoryTotals, getMonthlyTrend, getStatusCounts } from "@/lib/utils/bill-utils";
import { type Bill } from "@/lib/types/bill";
import { Timestamp } from "firebase/firestore";

const makeBill = (overrides: Partial<Bill> = {}): Bill => ({
  id: "1",
  title: "Test Bill",
  category: "Utilities",
  amount: 100,
  currency: "TRY",
  billingMonth: "2026-04",
  dueDate: Timestamp.fromDate(new Date("2026-04-25")),
  status: "pending",
  createdAt: Timestamp.fromDate(new Date()),
  updatedAt: Timestamp.fromDate(new Date()),
  ...overrides,
});

describe("calculateMonthTotal", () => {
  it("sums bills for a given month", () => {
    const bills = [
      makeBill({ amount: 100, billingMonth: "2026-04" }),
      makeBill({ amount: 200, billingMonth: "2026-04" }),
      makeBill({ amount: 50, billingMonth: "2026-03" }),
    ];
    expect(calculateMonthTotal(bills, "2026-04")).toBe(300);
  });

  it("returns 0 for empty month", () => {
    expect(calculateMonthTotal([], "2026-04")).toBe(0);
  });
});

describe("calculateCategoryTotals", () => {
  it("groups bills by category", () => {
    const bills = [
      makeBill({ category: "Utilities", amount: 100 }),
      makeBill({ category: "Utilities", amount: 200 }),
      makeBill({ category: "Internet", amount: 150 }),
    ];
    const result = calculateCategoryTotals(bills);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ category: "Utilities", total: 300 });
    expect(result[1]).toEqual({ category: "Internet", total: 150 });
  });
});

describe("getMonthlyTrend", () => {
  it("returns 12 months of data", () => {
    const result = getMonthlyTrend([], 12);
    expect(result).toHaveLength(12);
  });

  it("includes totals for months with bills", () => {
    const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
    const bills = [makeBill({ billingMonth: currentMonth, amount: 500 })];
    const result = getMonthlyTrend(bills, 12);
    const current = result.find((m) => m.month === currentMonth);
    expect(current?.total).toBe(500);
  });
});

describe("getStatusCounts", () => {
  it("counts bills by status", () => {
    const bills = [
      makeBill({ status: "pending" }),
      makeBill({ status: "paid" }),
      makeBill({ status: "paid" }),
      makeBill({ status: "overdue" }),
    ];
    const result = getStatusCounts(bills);
    expect(result).toEqual({ pending: 1, paid: 2, overdue: 1 });
  });
});
