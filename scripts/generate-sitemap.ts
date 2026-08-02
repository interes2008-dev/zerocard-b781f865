// Runs before `vite dev`/`vite build`; writes public/sitemap.xml with
// language subdirectory URLs (/, /en, /de, /es, /pt) and path-based hreflang.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://zerocard.pro";
const SUPABASE_URL = "https://shstklmyehdrepyttlhr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoc3RrbG15ZWhkcmVweXR0bGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTcxNzYsImV4cCI6MjA5MDU3MzE3Nn0.wjNiIUeeLwJOYk1boMEmcyqm2doCpU6WIV0MUAfWo-I";

const LANGS = ["ru", "en", "de", "es", "pt", "it", "fr"] as const;
type Lang = (typeof LANGS)[number];

// language-prefixed path: ru owns the bare path, others get /<lang> prefix
function lp(lang: Lang, p: string): string {
  if (lang === "ru") return p;
  return p === "/" ? `/${lang}` : `/${lang}${p}`;
}

interface Entry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  alternatesFor?: string; // neutral path if this URL has language alternates
}

async function fetchPosts(): Promise<{ slug: string; published_at: string; lang?: string }[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,published_at,lang&order=published_at.desc`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function xml(entries: Entry[]) {
  const urls = entries
    .map((e) =>
      [
        "  <url>",
        `    <loc>${BASE_URL}${e.loc}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        ...(e.alternatesFor
          ? [
              ...LANGS.map(
                (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}${lp(l, e.alternatesFor!)}"/>`
              ),
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${e.alternatesFor}"/>`,
            ]
          : []),
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const posts = await fetchPosts();

  const entries: Entry[] = [];

  // Homepage + blog index in every language
  const neutral = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/blog", changefreq: "daily", priority: "0.8" },
  ];
  for (const n of neutral) {
    for (const lang of LANGS) {
      entries.push({ loc: lp(lang, n.path), lastmod: today, changefreq: n.changefreq, priority: n.priority, alternatesFor: n.path });
    }
  }

  // Blog posts under their own language prefix
  for (const p of posts) {
    const lang = (LANGS as readonly string[]).includes(p.lang ?? "") ? (p.lang as Lang) : "ru";
    entries.push({
      loc: lp(lang, `/blog/${encodeURIComponent(p.slug)}`),
      lastmod: p.published_at?.slice(0, 10),
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  writeFileSync(resolve("public/sitemap.xml"), xml(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();
