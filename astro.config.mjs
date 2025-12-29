// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://n15ra.github.io",

  // Integrations
  integrations: [sitemap()],

  // Internationalization
  i18n: {
    locales: ["zh-TW", "en"],
    defaultLocale: "zh-TW",
    routing: {
      prefixDefaultLocale: false, // /about for zh-TW, /en/about for English
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
