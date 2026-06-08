import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";

// 社團可編輯的清單資料，以 JSON 儲存、Zod 驗證、build 時自動產生型別。
// 社團幹部只需編輯 src/content/*.json，不必動 .astro 元件。
// `scaffold: true` 標記「示意資料，待社團補正」（課表、歷屆幹部）。

const course = z.object({
  title: z.string(),
  by: z.string().optional(),
  date: z.string().optional(),
  desc: z.string(), // 卡面精簡版
  detail: z.string().optional(), // 點卡片彈窗顯示的完整原文（逐字，取自舊站學期頁）
  tags: z.array(z.string()).default([]),
});

const semesters = defineCollection({
  loader: file("src/content/semesters.json"),
  schema: z.object({
    id: z.string(), // 例：111-2
    label: z.string(), // 例：111 學年度 · 第 2 學期
    order: z.number(), // 排序（大者在前）
    scaffold: z.boolean().default(false),
    courses: z.array(course).default([]),
  }),
});

const events = defineCollection({
  loader: file("src/content/events.json"),
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
  loader: file("src/content/history.json"),
  schema: z.object({
    id: z.string(),
    date: z.string(),
    text: z.string(),
    order: z.number(),
  }),
});

const members = defineCollection({
  loader: file("src/content/members.json"),
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
