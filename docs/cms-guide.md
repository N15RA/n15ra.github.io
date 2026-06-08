# NISRA 官網內容維護指南（Sveltia CMS）

幹部可在網頁後台用**表單**編輯網站內容，不需要懂 git 或 JSON。

## 後台網址

- 線上：`https://n15ra.github.io/admin/`
- 本機預覽：`http://localhost:4321/admin/`（先跑 `npm run dev`）

## 登入（目前用 Personal Access Token，PAT 測試階段）

1. 到 <https://github.com/settings/tokens> 產生一個 token：
   - 建議 **Fine-grained token**：Repository 選 `N15RA/n15ra.github.io`，權限 **Contents → Read and write**。
   - （或用 classic token 勾 `repo`。）
2. 開 `/admin/` → 點 **「Sign In Using Access Token」** → 貼上 token。
   - token 只存在你的瀏覽器（localStorage）；認證與內容讀寫**直接連 GitHub API**、不經 OAuth proxy 或我們的伺服器（後台 UI 另會載入 Google Fonts／unpkg 資產，與你的 token 無關）。

## 編輯內容

後台四個分類對應網站資料：

| 後台分類     | 對應頁面          | 說明                                         |
| ------------ | ----------------- | -------------------------------------------- |
| 社課（學期） | /lesson           | 每個學期一筆，內含多堂課（courses 巢狀清單） |
| 活動消息     | /event            | 最新消息／活動／合作（分類用下拉選單）       |
| 歷屆幹部     | /about → 歷屆夥伴 | 每屆一筆，內含多位幹部（officers 巢狀清單）  |
| 沿革         | /about → 沿革     | 年表，一事件一筆                             |

- **新增一筆**：點分類右上「+」，填欄位——**ID 必填**（會成為檔名，如 `108-1`、`enlightened-2025`）。
- **排序**：每筆有 `order`（數字），**數字大者顯示在前**（較新）。
- **日期格式**：`YYYY.MM.DD`（少數活動只有 `YYYY.MM`）。

## 發布與權限（重要）

- 存檔（**Save → Publish**）會**直接 commit 回 `main` 並自動部署**——沒有額外的審查／核可關卡（這是讓幹部「存檔即上線」的刻意設計），通常數分鐘後上線。
- 因此請用**最小權限**的 token：fine-grained PAT、只授權**本 repo** 的 **Contents: Read and write**（不要附帶 workflow／settings 等其他權限）。
- 安全網：若內容格式錯誤，build 會失敗 → **不會部署**，線上維持上一個正常版本。
- 日後若想「先審查再上線」：**Sveltia 目前尚未支援 editorial workflow**（其官方 Feature Compatibility 列為 planned；bundle 內也會顯示「Editorial workflow is not yet supported」）。屆時需先查證 Sveltia 新版是否已支援；在那之前要審查關卡，請改走 **branch protection／自訂 PR 流程**（會需要有人做合併，UX 較複雜）。

## 常見問題

- **新增的中文字會不會變成不同字體？** 不會——部署時 CI 會自動依最新內容重新產生中文字體子集。
- **存檔後多久上線？** 通常數分鐘（等 GitHub Actions 部署完成）。
- **可以多人用嗎？** PAT 模式每人各自產 token。日後要更方便（用 GitHub 帳號登入、免貼 token），再加 Cloudflare Workers OAuth（見下）。

## 維護（開發者）

- CMS 設定：`public/admin/config.yml`——欄位需與 `src/content.config.ts` 的 Zod schema 保持一致（兩邊同步）。
- CMS **核心 bundle 自架**（不靠 CDN 載入 CMS 本體）：`public/admin/sveltia-cms.js`。更新版本：
  `npm i -D @sveltia/cms@latest && npm run admin:bundle`，再 commit 更新後的 bundle。
  - 註：Sveltia 後台 runtime 仍會向 unpkg（版本檢查、prismjs 延遲載入）與 Google Fonts（後台 UI 字型）發出請求；此為 `/admin` 後台工具行為，**公開網站本身零第三方請求**。
- 升級為 **OAuth**（免 PAT、多人友善）：部署 [`sveltia/sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) 到 Cloudflare Worker、註冊 GitHub OAuth App，並在 `config.yml` 的 `backend` 加 `base_url` 指向該 Worker（其餘設定不變）。
