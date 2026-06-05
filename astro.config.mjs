// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// NISRA 官方網站 — Astro 靜態站設定。
// - user/org pages repo `n15ra.github.io` 服務於網域根目錄，故 base 保持 "/"。
// - i18n：繁中為預設且不加前綴（在 /），英文在 /en/。英文頁面為「scaffold」——
//   每頁皆顯式建立（src/pages/en/*），頂部以 TranslationPending 提示尚未翻譯、
//   以下顯示繁中內文，確保不 404、不編造英文。故不需 Astro 的 fallback 自動路由。
// - 自訂網域 nisra.net cutover 時再把 site 改為 https://www.nisra.net 並加 public/CNAME。
export default defineConfig({
  site: "https://n15ra.github.io",
  base: "/",
  trailingSlash: "ignore",
  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "zh-TW",
        locales: {
          "zh-TW": "zh-Hant-TW",
          en: "en",
        },
      },
    }),
  ],
});
