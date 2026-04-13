import { test, expect } from "@playwright/test";

test.describe("Bills Page", () => {
  test("bills page redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/bills");
    await page.waitForURL(/\/(login|$)/);
  });

  test("new bill page redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/bills/new");
    await page.waitForURL(/\/(login|$)/);
  });
});
