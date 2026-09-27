import { lazy, Suspense, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { NON_DEFAULT_LANGS } from "@/lib/i18n";
import Index from "./pages/Index";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));

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
