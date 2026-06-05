import { DEFAULT_LOCALE, LOCALES, ui, type Locale, type UIKey } from "./ui";

export { DEFAULT_LOCALE, LOCALES, type Locale };

/** 將 Astro.currentLocale（可能為 undefined）正規化為支援的 Locale。 */
export function getLocale(currentLocale: string | undefined): Locale {
  if (currentLocale && (LOCALES as readonly string[]).includes(currentLocale)) {
    return currentLocale as Locale;
  }
  return DEFAULT_LOCALE;
}

/** 取得翻譯函式；缺 key 時退回預設語言（型別已保證不會缺）。 */
export function useTranslations(locale: Locale) {
  return (key: UIKey): string => ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
}

/**
 * 將「預設語言（繁中）的邏輯路徑」在地化到指定語言。
 * 預設語言不加前綴（/about），英文加 /en 前綴（/en/about）。
 * 傳入路徑可帶或不帶既有 /en 前綴，皆會先正規化。
 */
export function localizePath(path: string, locale: Locale): string {
  const logical = stripLocale(path);
  if (locale === DEFAULT_LOCALE) return logical;
  return logical === "/" ? "/en/" : `/en${logical}`;
}

/** 去除路徑上的 /en 前綴，得到與語言無關的邏輯路徑（恆以 / 開頭）。 */
export function stripLocale(path: string): string {
  const stripped = path.replace(/^\/en(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

/** 切換語言時的另一個語言（目前僅兩語）。 */
export function otherLocale(locale: Locale): Locale {
  return locale === DEFAULT_LOCALE ? "en" : DEFAULT_LOCALE;
}

/** 用於 <html lang>：BCP-47 標籤。 */
export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "zh-Hant-TW";
}
