import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// 社團可編輯的清單資料：每筆一個 JSON 檔，置於 src/content/<collection>/，
// 以 Zod 驗證、build 時自動產生型別。採一筆一檔（folder collection）是架構選擇——
// 讓 Sveltia CMS 以「每筆獨立頁面」編輯（semesters/members 的巢狀 courses/officers
// 尤其清楚）、git diff 以單筆為單位、且為 Decap/Sveltia 通用結構（不依賴 Sveltia 專屬的
// root:true list field）。entry id 以 generateId 鎖定為各檔的 `id` 欄位（與舊 file()
// loader 行為一致，如 LessonBody 的 s.id）。
// `scaffold: true` 標記「示意資料，待社團補正」（課表、歷屆幹部）。
const byId = ({ data }: { data: Record<string, unknown> }) => data.id as string;

const course = z.object({
  title: z.string(),
  by: z.string().optional(),
  date: z.string().optional(),
  desc: z.string(), // 卡面精簡版
  detail: z.string().optional(), // 點卡片彈窗顯示的完整原文（逐字，取自舊站學期頁）
  tags: z.array(z.string()).default([]),
});

const semesters = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/semesters", generateId: byId }),
  schema: z.object({
    id: z.string(), // 例：111-2
    label: z.string(), // 例：111 學年度 · 第 2 學期
    order: z.number(), // 排序（大者在前）
    scaffold: z.boolean().default(false),
    courses: z.array(course).default([]),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/events", generateId: byId }),
  schema: z.object({
    id: z.string(),
    category: z.enum(["最新消息", "活動 Events", "合作 Partnerships"]),
    title: z.string(),
    date: z.string(),
    desc: z.string(),
    href: z.url(),
    order: z.number(),
  }),
});

const history = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/history", generateId: byId }),
  schema: z.object({
    id: z.string(),
    date: z.string(),
    text: z.string(),
    order: z.number(),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/members", generateId: byId }),
  schema: z.object({
    id: z.string(),
    cohort: z.string().nullable(), // 學年度／屆數；未知為 null → UI 顯示「待確認」佔位
    officers: z
      .array(
        z.object({
          role: z.string(), // 職位（會長／會記／紀錄…）
          name: z.string(), // 綽號／姓名（多名以「、」相連）
        }),
      )
      .default([]),
    order: z.number(), // 排序（大者在前）
    scaffold: z.boolean().default(false),
  }),
});

export const collections = { semesters, events, history, members };
