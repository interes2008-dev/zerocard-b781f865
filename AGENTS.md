# Project rules

- Publish editorial comparison pages through the existing repository Markdown blog pipeline so routing, source citations, prerendering and sitemap discovery remain consistent.
- Sitemap lastmod values must come from page-specific editorial dates, never the build or generation date, to avoid signaling nonexistent content changes.
- Homepage metadata uses the shared in-place head updater and locale titles consumed by prerendering; keep localized WebPage URLs self-referencing to avoid duplicate tags or misattributed pages.