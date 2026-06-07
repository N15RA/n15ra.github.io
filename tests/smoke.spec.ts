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

test("home hero shows the 時間/地點/參加 facts block", async ({ page }) => {
  await page.goto("/");
  const facts = page.locator(".hero__facts");
  await expect(facts).toBeVisible();
  await expect(facts).toContainText("每週二 19:00–21:00");
  await expect(facts).toContainText("聖言樓 SF645");
  await expect(facts).toContainText("免費・自由參加");
});

test("home pillars show the essence line in place of a number kicker", async ({ page }) => {
  await page.goto("/");
  const essences = page.locator(".pillar__essence");
  await expect(essences).toHaveCount(3);
  await expect(essences.first()).toHaveText("研究，從來不是一個人的事");
});

test("about sub-tabs switch panels", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("#panel-summary")).toBeVisible();
  await expect(page.locator("#panel-history")).toBeHidden();
  await page.getByRole("tab", { name: /History/ }).click();
  await expect(page.locator("#panel-history")).toBeVisible();
  await expect(page.locator("#panel-summary")).toBeHidden();
});

test("about History timeline is newest-first", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("tab", { name: /History/ }).click();
  const terms = page.locator("#panel-history .mtl__term");
  await expect(terms.first()).toHaveText("2014.12.17");
  await expect(terms.last()).toHaveText("2006.03.23");
});

test("about Members shows the officer roster with 會長 highlighted and 待確認 placeholder", async ({
  page,
}) => {
  await page.goto("/about");
  await page.getByRole("tab", { name: /Members/ }).click();
  const members = page.locator("#panel-members");
  // 職位—名稱清單（dl）取代上一版的照片佔位
  await expect(members.locator(".roster__list").first()).toBeVisible();
  await expect(members.locator(".mtl__photo")).toHaveCount(0);
  // 會長列高亮 + 第一屆首位為 Theo
  await expect(members.locator(".roster__row--lead .roster__role").first()).toHaveText("會長");
  await expect(members.locator(".roster__name").first()).toHaveText("Theo");
  // 年度未知 → 「待確認」佔位（不杜撰年份）
  await expect(members.locator(".roster__cohort--tbd").first()).toBeVisible();
});

test("about O.B. tab shows the founder-row and verbatim 7-line tribute", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("tab", { name: /O\.B\./ }).click();
  const ob = page.locator("#panel-ob");
  await expect(ob).toBeVisible();
  await expect(ob).toContainText("在此獻上最高的敬意");
  await expect(ob.locator(".founder-row")).toContainText("創辦人 FOUNDER");
  await expect(ob.locator(".founder-row .card__person-name")).toContainText("Allen Own");
});

test("about Charter tab shows the creed and the FULL 忠憲/忠民/忠政", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("tab", { name: /Charter/ }).click();
  const charter = page.locator("#panel-charter");
  await expect(charter).toBeVisible();
  await expect(page.locator("#panel-ob")).toBeHidden();
  await expect(charter).toContainText("最高信條是");
  // 完整三案（未精簡為設計樣本的單章）
  await expect(charter).toContainText("忠憲條案");
  await expect(charter).toContainText("忠民條案");
  await expect(charter).toContainText("忠政條案");
});

test("event page shows refreshed KKTIX events through 2025", async ({ page }) => {
  await page.goto("/event");
  await expect(page.locator("#panel-news")).toContainText("Enlightened 2025");
  await page.getByRole("tab", { name: /活動 Events/ }).click();
  await expect(page.locator("#panel-events")).toContainText("Hackathon");
});

test("course/event cards use the kind chip meta row, not the old dark thumbnail", async ({
  page,
}) => {
  await page.goto("/lesson");
  await expect(page.locator(".card__thumb")).toHaveCount(0);
  await expect(page.locator(".card__kind").first()).toContainText("社課");
  await page.goto("/event");
  await expect(page.locator("#panel-news .card__kind").first()).toContainText("最新消息");
});

test("lesson semester selector switches archives", async ({ page }) => {
  await page.goto("/lesson");
  await expect(page.locator("#sem-108-1")).toBeVisible();
  await expect(page.locator("#sem-106-1")).toBeHidden();
  await page.locator('[data-sem="106-1"]').click();
  await expect(page.locator("#sem-106-1")).toBeVisible();
  await expect(page.locator("#sem-108-1")).toBeHidden();
});

test("keyboard Tab reveals the skip-to-content link (focus-visible)", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
});

test("course card opens a detail modal with the full verbatim text; Esc closes", async ({
  page,
}) => {
  await page.goto("/lesson");
  await page.locator('[data-sem="106-2"]').click();
  await page.getByRole("button", { name: "不可不知的 Web Security" }).click();
  const dialog = page.locator("dialog.course-modal[open]");
  await expect(dialog).toBeVisible();
  // 完整原文（含 IoT 段落）只在彈窗，不在卡面精簡版
  await expect(dialog).toContainText("IoT 裝置的管理介面");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog.course-modal[open]")).toHaveCount(0);
});

test("Nav 加入我們 from a non-home page targets the home #join, not the current page", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(page.locator(".nav__cta a")).toHaveAttribute("href", "/#join");
});

test.describe("accessibility — no serious/critical axe violations", () => {
  for (const route of ["/", "/about", "/lesson", "/event", "/en/", "/en/about"]) {
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
