// Runs before `vite dev`/`vite build`; writes public/sitemap.xml with
// language subdirectory URLs (/, /en, /de, /es, /pt) and path-based hreflang.
import { writeFileSync, readdirSync, readFileSync, existsSync } from "fs";
import { resolve, join } from "path";

// Articles stored in the repo (src/content/blog/<lang>/<slug>.md)
function repoPosts(): { slug: string; published_at: string; lang: string; group?: string }[] {
  const dir = resolve("src/content/blog");
  if (!existsSync(dir)) return [];
  const out: { slug: string; published_at: string; lang: string; group?: string }[] = [];
  for (const lang of readdirSync(dir)) {
    const ld = join(dir, lang);
    for (const f of readdirSync(ld).filter((x) => x.endsWith(".md"))) {
      const raw = readFileSync(join(ld, f), "utf-8");
      const slug = raw.match(/^slug:\s*(.+)$/m)?.[1].trim() ?? f.replace(/\.md$/, "");
      const date = raw.match(/^date:\s*(.+)$/m)?.[1].trim() ?? new Date().toISOString().slice(0, 10);
      const group = raw.match(/^group:\s*(.+)$/m)?.[1].trim();
      out.push({ slug, published_at: date, lang, group });
    }
  }
  return out;
}

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
  alternates?: { lang: string; href: string }[]; // explicit alternates (translated articles)
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
        ...(e.alternates ?? []).map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${BASE_URL}${a.href}"/>`),
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
  const remote = await fetchPosts();
  const local = repoPosts();
  const localKeys = new Set(local.map((p) => `${p.lang}:${p.slug}`));
  const posts = [...local, ...remote.filter((p) => !localKeys.has(`${p.lang ?? "ru"}:${p.slug}`))];

  const entries: Entry[] = [];

  // Homepage + blog index in every language
  const neutral = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/blog", changefreq: "daily", priority: "0.8" },
    { path: "/about", changefreq: "monthly", priority: "0.5" },
  ];
  for (const n of neutral) {
    for (const lang of LANGS) {
      entries.push({ loc: lp(lang, n.path), lastmod: today, changefreq: n.changefreq, priority: n.priority, alternatesFor: n.path });
    }
  }

  // Blog posts under their own language prefix
  for (const p of posts) {
    const lang = (LANGS as readonly string[]).includes(p.lang ?? "") ? (p.lang as Lang) : "ru";
    const group = (p as { group?: string }).group;
    const sibs = group ? local.filter((x) => x.group === group) : [];
    const alternates = sibs.length > 1
      ? [
          ...sibs.map((x) => ({ lang: x.lang, href: lp(x.lang as Lang, `/blog/${encodeURIComponent(x.slug)}`) })),
          ...(sibs.find((x) => x.lang === "en") ? [{ lang: "x-default", href: lp("en", `/blog/${sibs.find((x) => x.lang === "en")!.slug}`) }] : []),
        ]
      : undefined;
    entries.push({
      loc: lp(lang, `/blog/${encodeURIComponent(p.slug)}`),
      lastmod: p.published_at?.slice(0, 10),
      changefreq: "monthly",
      priority: "0.7",
      alternates,
    });
  }

  writeFileSync(resolve("public/sitemap.xml"), xml(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();
