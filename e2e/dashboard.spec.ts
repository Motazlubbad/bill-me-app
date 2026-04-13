import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test("dashboard redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL(/\/(login|$)/);
  });
});
