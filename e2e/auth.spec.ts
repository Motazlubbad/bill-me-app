import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("login page loads", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("register page loads", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByText("Create account")).toBeVisible();
    await expect(page.getByLabel("Full name")).toBeVisible();
  });

  test("login page has Google sign-in button", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Google")).toBeVisible();
  });

  test("login page links to register", async ({ page }) => {
    await page.goto("/login");
    const signUpLink = page.getByRole("link", { name: "Sign up" });
    await expect(signUpLink).toBeVisible();
  });

  test("register page links to login", async ({ page }) => {
    await page.goto("/register");
    const signInLink = page.getByRole("link", { name: "Sign in" });
    await expect(signInLink).toBeVisible();
  });

  test("unauthenticated user is redirected from dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    // Should redirect to login (auth guard)
    await page.waitForURL(/\/(login|$)/);
  });
});
