import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import ru from "./locales/ru";

export type Lang = "en" | "ru" | "de" | "es" | "pt" | "it" | "fr";
export const NON_DEFAULT_LANGS: Exclude<Lang, "ru">[] = ["en", "de", "es", "pt", "it", "fr"];

export const LANGS: { id: Lang; flag: string; label: string }[] = [
  { id: "ru", flag: "🇷🇺", label: "Русский" },
  { id: "en", flag: "🇬🇧", label: "English" },
  { id: "de", flag: "🇩🇪", label: "Deutsch" },
  { id: "es", flag: "🇪🇸", label: "Español" },
  { id: "pt", flag: "🇧🇷", label: "Português" },
  { id: "it", flag: "🇮🇹", label: "Italiano" },
  { id: "fr", flag: "🇫🇷", label: "Français" },
];

export type Translations = { [K in keyof typeof ru]: string };

// ru is bundled as the baseline (default market, instant, and the type source).
// Other languages ship as separate chunks and load only when needed.
const loaders: Record<Lang, () => Promise<Translations>> = {
  ru: () => Promise.resolve(ru as unknown as Translations),
  en: () => import("./locales/en").then((m) => m.default as unknown as Translations),
  de: () => import("./locales/de").then((m) => m.default as unknown as Translations),
  es: () => import("./locales/es").then((m) => m.default as unknown as Translations),
  pt: () => import("./locales/pt").then((m) => m.default as unknown as Translations),
  it: () => import("./locales/it").then((m) => m.default as unknown as Translations),
  fr: () => import("./locales/fr").then((m) => m.default as unknown as Translations),
};

// Language lives in the URL path: /  -> ru, /en/... -> en, /de/... -> de, etc.
export function langFromPath(pathname: string): Lang {
  const seg = pathname.split("/")[1];
  if (seg === "en" || seg === "de" || seg === "es" || seg === "pt" || seg === "it" || seg === "fr") return seg;
  return "ru";
}

// Strip the language prefix from a path (for building cross-language links).
export function pathWithoutLang(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (seg === "en" || seg === "de" || seg === "es" || seg === "pt" || seg === "it" || seg === "fr") {
    const rest = pathname.slice(seg.length + 1);
    return rest || "/";
  }
  return pathname || "/";
}

// Build a URL for a given language + language-neutral path.
export function langHref(lang: Lang, neutralPath = "/"): string {
  const clean = neutralPath.startsWith("/") ? neutralPath : `/${neutralPath}`;
  if (lang === "ru") return clean === "/" ? "/" : clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

function detectLang(): Lang {
  if (typeof window !== "undefined") {
    const fromPath = langFromPath(window.location.pathname);
    if (fromPath !== "ru") return fromPath;
    // Honour legacy ?lang= links (a redirect to the path lives in .htaccess).
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "de" || q === "es" || q === "pt" || q === "it" || q === "fr") return q as Lang;
    return "ru";
  }
  return "ru";
}

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: "ru",
  setLang: () => {},
  t: ru as unknown as Translations,
});

export function I18nProvider({
  children,
  initialLang,
  initialT,
}: {
  children: ReactNode;
  initialLang?: Lang;
  initialT?: Translations;
}) {
  const [lang, setLangState] = useState<Lang>(() => initialLang ?? detectLang());

  const cache = useRef<Partial<Record<Lang, Translations>>>({ ru: ru as unknown as Translations });

  // Seed translations synchronously so the first render matches the prerendered HTML:
  // 1) an explicit SSR prop, 2) data inlined by the prerenderer, 3) ru baseline, else null.
  const [t, setT] = useState<Translations | null>(() => {
    if (initialT) return initialT;
    if (typeof window !== "undefined") {
      const w = window as unknown as { __ZC_LANG__?: string; __ZC_T__?: Translations };
      if (w.__ZC_T__ && w.__ZC_LANG__ === lang) return w.__ZC_T__;
    }
    return cache.current[lang] ?? null;
  });

  if (t && !cache.current[lang]) cache.current[lang] = t;

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (cache.current[lang]) {
      setT(cache.current[lang]!);
      return;
    }
    let alive = true;
    loaders[lang]().then((tr) => {
      cache.current[lang] = tr;
      if (alive) setT(tr);
    });
    return () => {
      alive = false;
    };
  }, [lang]);

  if (!t) {
    return <div style={{ minHeight: "100vh", background: "var(--bg, #020d1f)" }} aria-hidden />;
  }

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function nextLang(current: Lang): Lang {
  const i = LANGS.findIndex((l) => l.id === current);
  return LANGS[(i + 1) % LANGS.length].id;
}

export function useI18n() {
  return useContext(I18nContext);
}
