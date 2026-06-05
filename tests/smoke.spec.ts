import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = ["/", "/about", "/lesson", "/event", "/en/", "/en/about", "/en/lesson", "/en/event"];

test.describe("routes render with correct lang", () => {
  for (const route of ROUTES) {
    test(`200 + <html lang>: ${route}`, async ({ page }) => {
      const resp = await page.goto(route);
      expect(resp?.status(), `status for ${route}`).toBeLessThan(400);
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBe(route.startsWith("/en") ? "en" : "zh-Hant-TW");
    });
  }
});

test("language switcher round-trips zh ↔ en and shows the pending banner", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("link", { name: "切換語言" }).click();
  await expect(page).toHaveURL(/\/en\/about\/?$/);
  await expect(page.locator(".tp-bar")).toBeVisible();
  await page.getByRole("link", { name: "Switch language" }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(page.locator(".tp-bar")).toHaveCount(0);
});

test("mobile burger toggles the menu and aria-expanded", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  const burger = page.locator(".nav__burger");
  const links = page.locator("#nav-links");
  await expect(burger).toBeVisible();
  await expect(links).not.toHaveClass(/is-open/);
  expect(await burger.getAttribute("aria-expanded")).toBe("false");
  await burger.click();
  await expect(links).toHaveClass(/is-open/);
  expect(await burger.getAttribute("aria-expanded")).toBe("true");
});

test("about sub-tabs switch panels", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("#panel-summary")).toBeVisible();
  await expect(page.locator("#panel-history")).toBeHidden();
  await page.getByRole("tab", { name: /History/ }).click();
  await expect(page.locator("#panel-history")).toBeVisible();
  await expect(page.locator("#panel-summary")).toBeHidden();
});

test("lesson semester selector switches archives", async ({ page }) => {
  await page.goto("/lesson");
  await expect(page.locator("#sem-111-2")).toBeVisible();
  await expect(page.locator("#sem-110-1")).toBeHidden();
  await page.locator('[data-sem="110-1"]').click();
  await expect(page.locator("#sem-110-1")).toBeVisible();
  await expect(page.locator("#sem-111-2")).toBeHidden();
});

test("keyboard Tab reveals the skip-to-content link (focus-visible)", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
});

test.describe("accessibility — no serious/critical axe violations", () => {
  for (const route of ["/", "/about", "/lesson", "/event"]) {
    test(`axe: ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const blocking = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      );
      expect(
        blocking,
        JSON.stringify(
          blocking.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
          null,
          2,
        ),
      ).toEqual([]);
    });
  }
});
