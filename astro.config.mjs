// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// NISRA 官方網站 — Astro 靜態站設定。
// - user/org pages repo `n15ra.github.io` 服務於網域根目錄，故 base 保持 "/"。
// - 單一語言（繁體中文 zh-TW）；不使用 Astro i18n 路由。
// - 自訂網域 nisra.net cutover 時再把 site 改為 https://www.nisra.net 並加 public/CNAME。
export default defineConfig({
  site: "https://n15ra.github.io",
  base: "/",
  trailingSlash: "ignore",
  integrations: [sitemap()],
});
