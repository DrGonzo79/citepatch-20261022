import { expect, test } from "@playwright/test";

test("validates, audits, and completes a repair", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Run free audit" }).click();
  await expect(page.locator("p.error")).toContainText("Enter a full URL");
  await page.getByLabel("Page to inspect").fill("https://example.com/pricing");
  await page.getByRole("button", { name: "Run free audit" }).click();
  await expect(page.getByRole("heading", { name: "Pricing page repair brief" })).toBeVisible();
  const repair = page.getByRole("button", { name: /Make pricing extractable/ });
  await repair.click();
  await expect(repair).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toContainText("1 of 3");
});

test("switches page analyses", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /API docs/ }).click();
  await expect(page.getByRole("heading", { name: "API docs repair brief" })).toBeVisible();
  await expect(page.getByText("2/4", { exact: true }).first()).toBeVisible();
});

test("mobile has no horizontal document overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await page.getByRole("button", { name: /Comparison page/ }).click();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBeFalsy();
  await page.screenshot({ path: "evidence/mobile.png", fullPage: true });
});

test("captures desktop evidence", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  await page.goto("/");
  await page.getByRole("button", { name: /Pricing page/ }).click();
  await page.screenshot({ path: "evidence/desktop.png", fullPage: true });
});
