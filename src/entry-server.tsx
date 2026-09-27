import { Fragment, Suspense } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider, NON_DEFAULT_LANGS, type Lang, type Translations } from "@/lib/i18n";
import { __setBlogSeed } from "@/lib/blogSeed";
export { STATIC_POSTS } from "@/lib/staticPosts";
export { SOURCE_SETS } from "@/lib/sources";

// Eager imports for SSR (renderToString cannot await lazy/Suspense).
// The client build keeps these lazy (see routes.tsx), so code-splitting is intact.
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
export { ABOUT } from "./pages/About";

import ru from "@/lib/locales/ru";
import en from "@/lib/locales/en";
import de from "@/lib/locales/de";
import es from "@/lib/locales/es";
import pt from "@/lib/locales/pt";
import itLoc from "@/lib/locales/it";
import fr from "@/lib/locales/fr";

export const translations: Record<Lang, Translations> = {
  ru: ru as unknown as Translations,
  en: en as unknown as Translations,
  de: de as unknown as Translations,
  es: es as unknown as Translations,
  pt: pt as unknown as Translations,
  it: itLoc as unknown as Translations,
  fr: fr as unknown as Translations,
};

const SsrRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/about" element={<About />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    {NON_DEFAULT_LANGS.map((l) => (
      <Fragment key={l}>
        <Route path={`/${l}`} element={<Index />} />
        <Route path={`/${l}/blog`} element={<Blog />} />
        <Route path={`/${l}/about`} element={<About />} />
        <Route path={`/${l}/blog/:slug`} element={<BlogPost />} />
      </Fragment>
    ))}
  </Routes>
);

export function render(
  url: string,
  lang: Lang,
  seed?: { posts?: unknown[] | null; post?: unknown | null }
) {
  __setBlogSeed(seed?.posts ?? null, seed?.post ?? null);
  const queryClient = new QueryClient();
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <I18nProvider initialLang={lang} initialT={translations[lang]}>
          <TooltipProvider>
            <StaticRouter location={url}>
              {/* Same Suspense boundary as the client (routes.tsx), so the
                  boundary markers in the HTML line up during hydration. */}
              <Suspense fallback={null}>
                <SsrRoutes />
              </Suspense>
            </StaticRouter>
          </TooltipProvider>
        </I18nProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
  __setBlogSeed(null, null);
  // Structured data declared via Helmet (blog index, articles) so the
  // prerenderer can place it in the <head> of the static file.
  const helmetScripts = helmetContext.helmet?.script?.toString() ?? "";
  return { html, helmetScripts };
}
