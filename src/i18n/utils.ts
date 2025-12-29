import { ui, defaultLang, languages } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getRelativeLocaleUrl(lang: keyof typeof ui, path: string) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  if (lang === defaultLang) {
    return `/${cleanPath}`;
  }

  return `/${lang}/${cleanPath}`;
}

export function getCurrentLocale(pathname: string): keyof typeof ui {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && firstSegment in languages) {
    return firstSegment as keyof typeof ui;
  }

  return defaultLang;
}

export function getAlternateLocale(
  currentLocale: keyof typeof ui,
): keyof typeof ui {
  return currentLocale === "zh-TW" ? "en" : "zh-TW";
}

export function getAlternateUrl(pathname: string): string {
  const currentLocale = getCurrentLocale(pathname);
  const alternateLocale = getAlternateLocale(currentLocale);

  // Remove current locale prefix if present
  let cleanPath = pathname;
  if (currentLocale !== defaultLang) {
    cleanPath = pathname.replace(`/${currentLocale}`, "") || "/";
  }

  // Add alternate locale prefix if not default
  if (alternateLocale === defaultLang) {
    return cleanPath;
  }

  return `/${alternateLocale}${cleanPath === "/" ? "" : cleanPath}`;
}

export { languages, defaultLang };
