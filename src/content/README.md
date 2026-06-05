# 內容資料（社團可自行編輯）

這些 JSON 由 `src/content.config.ts` 以 Zod 驗證，build 時若格式錯誤會直接失敗。
幹部要更新內容，只需編輯下列檔案，不必動任何 `.astro` 元件。

| 檔案             | 內容                   | 真偽                                                                       |
| ---------------- | ---------------------- | -------------------------------------------------------------------------- |
| `history.json`   | 沿革年表               | **真實**（取自 old-website `history.html`）                                |
| `events.json`    | 活動 / 最新消息 / 合作 | **真實**（HITCON 2022 Village、AIS3 CLUB、Enlightened 等）                 |
| `semesters.json` | 各學期社課             | 111-2 為**真實**社課；其餘標 `"scaffold": true` 為**示意**，**待社團補正** |
| `members.json`   | 歷屆幹部               | 全部標 `"scaffold": true` 為**示意**，**待社團補正**                       |

> `scaffold: true` 代表「示意資料」，上線前請社團以真實資料替換並把該旗標移除。
