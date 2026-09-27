// Blog articles stored in the repository (src/content/blog/<lang>/<slug>.md).
//
// They ship inside the bundle, so they are always prerendered, always listed in
// the sitemap and always open client-side, even when Supabase is unreachable at
// build time. Supabase posts are merged on top; on a slug clash inside one
// language the repository version wins.

export interface StaticPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  lang: string;
  category: string;
  image_url: string | null;
  published_at: string;
  order: number;
  /** "eu" marks articles for EU readers, who are served by Webot EU rather than pionex.com. */
  audience: string | null;
  /** Articles sharing a group are translations/adaptations of each other (hreflang). */
  group: string | null;
  /** Comma-separated source set names (see sources.ts). */
  sources: string | null;
  updated_at: string;
}

const files = import.meta.glob("../content/blog/*/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1).replace(/\\"/g, '"');
    meta[kv[1]] = v;
  }
  return { meta, body: m[2].trim() };
}

// Frontmatter categories map onto the label keys the blog UI already knows.
const CATEGORY_MAP: Record<string, string> = { bots: "pionex", card: "card" };

export const STATIC_POSTS: StaticPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const lang = path.split("/").slice(-2, -1)[0];
    const { meta, body } = parseFrontmatter(raw);
    const slug = meta.slug || path.split("/").pop()!.replace(/\.md$/, "");
    const date = meta.date || "2026-01-01";
    return {
      id: `static-${lang}-${slug}`,
      slug,
      title: meta.title || slug,
      description: meta.description || "",
      content: body,
      lang,
      category: CATEGORY_MAP[meta.category] ?? meta.category ?? "crypto",
      image_url: null,
      published_at: `${date}T09:00:00.000Z`,
      order: meta.order !== undefined && meta.order !== "" && !Number.isNaN(Number(meta.order)) ? Number(meta.order) : 999,
      audience: meta.audience || null,
      group: meta.group || null,
      sources: meta.sources || null,
      updated_at: `${meta.updated || date}T09:00:00.000Z`,
    };
  })
  // Newest first; within one day, the editorial order from frontmatter.
  .sort((a, b) => b.published_at.localeCompare(a.published_at) || a.order - b.order);

/** Same slug may exist in several languages; prefer the one for the current language. */
export function getStaticPost(slug: string | undefined, lang?: string): StaticPost | undefined {
  if (!slug) return undefined;
  return (lang ? STATIC_POSTS.find((p) => p.slug === slug && p.lang === lang) : undefined)
    ?? STATIC_POSTS.find((p) => p.slug === slug);
}

/** Repository posts plus Supabase posts, newest first, no duplicate slug per language. */
export function mergeWithStatic<T extends { slug: string; lang: string; published_at: string }>(remote: T[] | null | undefined): (T | StaticPost)[] {
  const seen = new Set(STATIC_POSTS.map((p) => `${p.lang}:${p.slug}`));
  const extra = (remote ?? []).filter((p) => !seen.has(`${p.lang}:${p.slug}`));
  return [...STATIC_POSTS, ...extra].sort((a, b) => b.published_at.localeCompare(a.published_at));
}
