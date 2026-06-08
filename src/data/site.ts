// NISRA 站台層級的穩定常數（真實資料）。
// 來源：old-website/（Wix dump）解析 + 手動查證；視覺對齊另參考外部 Claude Design
// handoff（未 vendor 入庫、非 in-repo 來源）。

export const SITE = {
  shortName: "NISRA",
  fullName: "Network and Information Security Research Association",
  fullNameZh: "資訊安全研究會", // 中文全名；保留供 SEO / 結構化資料，未必每頁渲染
  since: 2007,
  email: "nisra@nisra.net",
  domain: "www.nisra.net",
  hackathonUrl: "https://nisrahackathon.github.io/",
} as const;

export const SLOGAN = "Never Stop Learning.";

// 導覽項目。label 在中英文設計皆為英文，故直接放這裡（CTA「加入我們」走 i18n 字典）。
export const NAV_ITEMS = [
  { id: "home", href: "/", label: "Home" },
  { id: "about", href: "/about", label: "About us" },
  { id: "lesson", href: "/lesson", label: "Lesson" },
  { id: "event", href: "/event", label: "Event" },
] as const;

export type SocialName = "facebook" | "instagram" | "discord" | "mail";

export const SOCIALS: ReadonlyArray<{
  name: SocialName;
  label: string;
  href: string;
}> = [
  { name: "facebook", label: "facebook.com/N15RA", href: "https://www.facebook.com/N15RA/" },
  { name: "instagram", label: "instagram.com/_n15ra", href: "https://www.instagram.com/_n15ra/" },
  { name: "discord", label: "discord.gg/RGqpdPBPNm", href: "https://discord.gg/RGqpdPBPNm" },
  { name: "mail", label: SITE.email, href: `mailto:${SITE.email}` },
];

// 入社資訊（每週二晚間，聖言樓 SF645）。WHEN/WHERE/HOW 為真實內容。
export const JOIN_INFO = {
  whenLines: ["每週二晚間 19:00–21:00", "第一週與考試週前後不開課"],
  whereLines: ["輔仁大學資訊工程學系", "聖言樓 SF645"],
  howLines: ["直接來教室，或在社群私訊我們"],
} as const;
