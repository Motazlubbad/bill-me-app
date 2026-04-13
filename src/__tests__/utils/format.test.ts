import { formatCurrency, formatMonth, formatMonthShort, getCurrentMonth, getPreviousMonth } from "@/lib/utils/format";

describe("formatCurrency", () => {
  it("formats TRY currency correctly", () => {
    const result = formatCurrency(320.5, "TRY");
    expect(result).toContain("320");
  });

  it("handles zero amount", () => {
    const result = formatCurrency(0, "TRY");
    expect(result).toContain("0");
  });

  it("handles large amounts", () => {
    const result = formatCurrency(15000.99, "TRY");
    expect(result).toContain("15");
  });
});

describe("formatMonth", () => {
  it("formats YYYY-MM to full month name", () => {
    const result = formatMonth("2026-04");
    expect(result).toBe("April 2026");
  });

  it("formats January correctly", () => {
    const result = formatMonth("2026-01");
    expect(result).toBe("January 2026");
  });
});

describe("formatMonthShort", () => {
  it("formats YYYY-MM to short month", () => {
    const result = formatMonthShort("2026-04");
    expect(result).toBe("Apr 2026");
  });
});

describe("getCurrentMonth", () => {
  it("returns YYYY-MM format", () => {
    const result = getCurrentMonth();
    expect(result).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
  });
});

describe("getPreviousMonth", () => {
  it("returns previous month in YYYY-MM format", () => {
    const result = getPreviousMonth("2026-04");
    expect(result).toBe("2026-03");
  });

  it("handles January wrap to December", () => {
    const result = getPreviousMonth("2026-01");
    expect(result).toBe("2025-12");
  });
});
