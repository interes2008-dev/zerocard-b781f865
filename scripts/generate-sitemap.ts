// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://zerocard.pro";
const SUPABASE_URL = "https://shstklmyehdrepyttlhr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoc3RrbG15ZWhkcmVweXR0bGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTcxNzYsImV4cCI6MjA5MDU3MzE3Nn0.wjNiIUeeLwJOYk1boMEmcyqm2doCpU6WIV0MUAfWo-I";

interface Entry {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

async function fetchPosts(): Promise<{ slug: string; published_at: string }[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,published_at&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
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
        `    <loc>${BASE_URL}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const posts = await fetchPosts();

  const entries: Entry[] = [
    { path: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
    { path: "/blog", lastmod: today, changefreq: "daily", priority: "0.8" },
    ...posts.map((p) => ({
      path: `/blog/${encodeURIComponent(p.slug)}`,
      lastmod: p.published_at.slice(0, 10),
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  writeFileSync(resolve("public/sitemap.xml"), xml(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();
