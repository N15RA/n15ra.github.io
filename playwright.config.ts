import { defineConfig } from "@playwright/test";

// 靜態站冒煙 / 無障礙測試。使用 Playwright 內建 chromium（非 chrome channel），
// 對 `astro preview` 服務的 production build 進行驗證。
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:5321",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium", viewport: { width: 1280, height: 800 } },
    },
  ],
  // 專用測試埠 5321（在 Astro 預設 4321 的自動遞增範圍外），避免本地誤接其他 Astro
  // 專案在 4321 上的 dev/preview server。reuseExistingServer:false 一律啟動自有的
  // production preview；埠被占用時大聲報錯，而非靜默對「錯誤的 server」跑測試。
  webServer: {
    command: "npm run preview -- --port 5321",
    url: "http://localhost:5321",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
