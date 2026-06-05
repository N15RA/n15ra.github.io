// NISRA 介面字串字典（chrome / UI strings）。
// 內文（hero/宗旨/社課敘述等長文）屬「內容」，放在 data 與 content collections；
// 此處只放導覽、按鈕、頁尾、語言切換、未譯提示等「外框」字串。
//
// 型別保證：`assertSameKeys` 強制 en 與 zh-TW 擁有完全相同的 key，
// 任一語言漏 key 會在 `astro check` 時報錯 —— 這是「避免單語遺漏」的核心機制。

export const DEFAULT_LOCALE = "zh-TW" as const;
export const LOCALES = ["zh-TW", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const ui = {
  "zh-TW": {
    "nav.join": "加入我們",
    "nav.menu": "選單",
    "nav.home": "Home",
    "nav.about": "About us",
    "nav.lesson": "Lesson",
    "nav.event": "Event",
    "lang.toggleToEn": "EN",
    "lang.toggleToZh": "中文",
    "lang.ariaSwitch": "切換語言",
    "footer.navLabel": "頁尾導覽",
    "footer.dept": "輔仁大學 資訊工程學系",
    "footer.room": "聖言樓 SF645",
    "footer.hackathon": "Hackathon",
    "skip.toContent": "跳到主要內容",
    "tp.label": "未譯內容",
    "tp.text": "這個頁面尚未提供英文版，以下顯示繁體中文內容。",
  },
  en: {
    "nav.join": "Join us",
    "nav.menu": "Menu",
    "nav.home": "Home",
    "nav.about": "About us",
    "nav.lesson": "Lesson",
    "nav.event": "Event",
    "lang.toggleToEn": "EN",
    "lang.toggleToZh": "中文",
    "lang.ariaSwitch": "Switch language",
    "footer.navLabel": "Footer navigation",
    "footer.dept":
      "Dept. of Computer Science & Information Engineering, Fu Jen Catholic University",
    "footer.room": "Room SF645, Shengyan Hall",
    "footer.hackathon": "Hackathon",
    "skip.toContent": "Skip to main content",
    "tp.label": "Untranslated",
    "tp.text":
      "This page is not available in English yet — the Traditional Chinese content is shown below.",
  },
} as const;

export type UIKey = keyof (typeof ui)["zh-TW"];

// 編譯期守門：強制兩個語言的 key 集合一致。
const _assertSameKeys: Record<Locale, Record<UIKey, string>> = ui;
void _assertSameKeys;
