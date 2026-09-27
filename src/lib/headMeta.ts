import { useEffect } from "react";

// The prerenderer already writes title, description, canonical, Open Graph and
// Twitter tags into every static page. Declaring them again through Helmet made
// the browser end up with two canonicals and two descriptions after hydration.
// This hook updates the existing tags in place (creating them only if missing),
// so client-side navigation stays correct and nothing is duplicated.

interface HeadMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: "website" | "article";
  locale?: string;
}

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
  // Drop accidental duplicates left by earlier renders.
  document.head.querySelectorAll(selector).forEach((node, i) => { if (i > 0) node.remove(); });
}

const metaNamed = (attr: "name" | "property", key: string) => () => {
  const m = document.createElement("meta");
  m.setAttribute(attr, key);
  return m;
};

export function useHeadMeta({ title, description, canonical, ogType = "website", locale }: HeadMeta) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = title;
    upsert('meta[name="description"]', metaNamed("name", "description"), "content", description);
    upsert('link[rel="canonical"]', () => { const l = document.createElement("link"); l.rel = "canonical"; return l; }, "href", canonical);
    upsert('meta[property="og:title"]', metaNamed("property", "og:title"), "content", title);
    upsert('meta[property="og:description"]', metaNamed("property", "og:description"), "content", description);
    upsert('meta[property="og:url"]', metaNamed("property", "og:url"), "content", canonical);
    upsert('meta[property="og:type"]', metaNamed("property", "og:type"), "content", ogType);
    upsert('meta[name="twitter:title"]', metaNamed("name", "twitter:title"), "content", title);
    upsert('meta[name="twitter:description"]', metaNamed("name", "twitter:description"), "content", description);
    if (locale) upsert('meta[property="og:locale"]', metaNamed("property", "og:locale"), "content", locale);
  }, [title, description, canonical, ogType, locale]);
}
