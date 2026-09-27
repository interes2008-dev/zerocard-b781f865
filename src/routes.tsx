import { lazy, Suspense, Fragment, type ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import { NON_DEFAULT_LANGS } from "@/lib/i18n";
import Index from "./pages/Index";

// React.lazy suspends on first render even when the chunk is already loaded,
// so preloaded pages render their component directly.
function lazyWithPreload(load: () => Promise<{ default: ComponentType }>) {
  let Loaded: ComponentType | null = null;
  const Lazy = lazy(load);
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  Page.preload = () => load().then((m) => { Loaded = m.default; });
  return Page;
}
const Blog = lazyWithPreload(() => import("./pages/Blog"));
const BlogPost = lazyWithPreload(() => import("./pages/BlogPost"));
const About = lazyWithPreload(() => import("./pages/About"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Load the lazy page chunk for a prerendered URL before hydration, so React
 * hydrates the server markup in one pass instead of suspending (error #421).
 */
export function preloadRoute(pathname: string): Promise<unknown> {
  const p = pathname.replace(/^\/(en|de|es|pt|it|fr)(?=\/|$)/, "") || "/";
  if (p === "/about") return About.preload();
  if (p === "/blog") return Blog.preload();
  if (p.startsWith("/blog/") && p !== "/blog/admin") return BlogPost.preload();
  return Promise.resolve();
}

const RouteFallback = () => (
  <div style={{ minHeight: "100vh", background: "var(--bg, #020d1f)" }} aria-hidden />
);

export const AppRoutes = () => (
  <Suspense fallback={<RouteFallback />}>
    <Routes>
      {/* Russian (default, no prefix) */}
      <Route path="/" element={<Index />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog/admin" element={<BlogAdmin />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      {/* Other languages live under /en, /de, /es, /pt */}
      {NON_DEFAULT_LANGS.map((l) => (
        <Fragment key={l}>
          <Route path={`/${l}`} element={<Index />} />
          <Route path={`/${l}/blog`} element={<Blog />} />
          <Route path={`/${l}/about`} element={<About />} />
          <Route path={`/${l}/blog/:slug`} element={<BlogPost />} />
        </Fragment>
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);
