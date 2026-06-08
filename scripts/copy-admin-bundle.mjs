// 把自架的 Sveltia CMS bundle 從 node_modules 複製到 public/admin/。
// 用 Node fs（跨平台；取代 cp，讓 Windows 協作者也能跑）。
// 更新 Sveltia 版本後執行：npm i -D @sveltia/cms@latest && npm run admin:bundle
import { copyFileSync } from "node:fs";

const SRC = "node_modules/@sveltia/cms/dist/sveltia-cms.js";
const DEST = "public/admin/sveltia-cms.js";

copyFileSync(SRC, DEST);
console.log(`已複製 ${SRC} → ${DEST}`);
