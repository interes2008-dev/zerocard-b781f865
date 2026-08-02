import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const serverEntry = pathToFileURL(path.join(root, "dist-server/entry-server.js")).href;
const { render, translations } = await import(serverEntry);

const template = fs.readFileSync(path.join(root, "dist/index.html"), "utf-8");

const BASE = "https://zerocard.pro";
const LANGS = ["ru", "en", "de", "es", "pt", "it", "fr"];
const OG_LOCALE = { ru: "ru_RU", en: "en_US", de: "de_DE", es: "es_ES", pt: "pt_BR", it: "it_IT", fr: "fr_FR" };

const lp = (lang, p) => (lang === "ru" ? p : p === "/" ? `/${lang}` : `/${lang}${p}`);

const BLOG_META = {
  ru: { title: "Блог ZeroCard - плати по миру, крипта, USDT и Pionex", desc: "Гайды и статьи ZeroCard: криптокарта Pionex, оплата USDT по миру, кэшбэк, Apple Pay и Google Pay, международные платежи." },
  en: { title: "ZeroCard Blog - pay worldwide, crypto, USDT & Pionex", desc: "ZeroCard guides and articles: Pionex crypto card, spending USDT worldwide, cashback, Apple Pay and Google Pay, international payments." },
  de: { title: "ZeroCard Blog - weltweit zahlen, Krypto, USDT und Pionex", desc: "ZeroCard Ratgeber und Artikel: Pionex Krypto-Karte, weltweit mit USDT zahlen, Cashback, Apple Pay und Google Pay, internationale Zahlungen." },
  es: { title: "Blog de ZeroCard: paga por el mundo, cripto, USDT y Pionex", desc: "Guías y artículos de ZeroCard: tarjeta cripto Pionex, pagar con USDT por el mundo, reembolso, Apple Pay y Google Pay, pagos internacionales." },
  pt: { title: "Blog do ZeroCard: pague pelo mundo, cripto, USDT e Pionex", desc: "Guias e artigos do ZeroCard: cartão cripto Pionex, pagar com USDT pelo mundo, cashback, Apple Pay e Google Pay, pagamentos internacionais." },
  it: { title: "Blog di ZeroCard: paga in tutto il mondo, crypto, USDT e Pionex", desc: "Guide e articoli di ZeroCard: carta crypto Pionex, pagare in USDT in tutto il mondo, cashback, Apple Pay e Google Pay, pagamenti internazionali." },
  fr: { title: "Blog ZeroCard : payer en USDT partout, crypto et Pionex", desc: "Guides et articles ZeroCard : carte crypto Pionex, payer en USDT partout dans le monde, cashback, Apple Pay et Google Pay, paiements internationaux." },
};

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inlineJson = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");
const setMeta = (doc, re, rep) => doc.replace(re, rep);

function buildDoc({ lang, html, title, description, canonical, ogType, inlineScripts, neutralPath, extraHead }) {
  let doc = template;
  doc = doc.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  doc = setMeta(doc, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  doc = setMeta(doc, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">`);
  doc = setMeta(doc, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`);
  doc = setMeta(doc, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`);
  doc = setMeta(doc, /<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${OG_LOCALE[lang]}">`);
  doc = setMeta(doc, /<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${ogType}">`);
  doc = setMeta(doc, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  doc = setMeta(doc, /<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(title)}">`);
  doc = setMeta(doc, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(description)}">`);
  doc = setMeta(doc, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(description)}">`);

  // Rewrite hreflang so every page points at its own equivalents
  // (blog pages must alternate to blog pages, not to the homepages).
  if (neutralPath) {
    const links = [
      ...LANGS.map((l) => `    <link rel="alternate" hreflang="${l}" href="${BASE}${lp(l, neutralPath)}">`),
      `    <link rel="alternate" hreflang="x-default" href="${BASE}${neutralPath}">`,
    ].join("\n");
    doc = doc.replace(
      /[ \t]*<link rel="alternate" hreflang="[\s\S]*?hreflang="x-default"[^>]*>/,
      links
    );
  }

  if (extraHead) {
    doc = doc.replace("</head>", `  ${extraHead}\n  </head>`);
  }

  doc = doc.replace('<div id="root"></div>', `<div id="root">${html}</div>\n    ${inlineScripts}`);
  return doc;
}

function writeFile(rel, doc) {
  const outPath = path.join(root, rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, doc);
}

const SUPABASE_URL = "https://shstklmyehdrepyttlhr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoc3RrbG15ZWhkcmVweXR0bGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTcxNzYsImV4cCI6MjA5MDU3MzE3Nn0.wjNiIUeeLwJOYk1boMEmcyqm2doCpU6WIV0MUAfWo-I";

async function fetchAllPosts() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=*&order=published_at.desc`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.warn("  ! blog fetch failed (posts will render client-side):", e.message);
    return [];
  }
}

const listFields = ["id", "slug", "title", "description", "lang", "category", "image_url", "published_at"];
const toListShape = (p) => Object.fromEntries(listFields.map((k) => [k, p[k] ?? null]));

// 1) Homepages
for (const lang of LANGS) {
  const { html, helmetScripts } = render(lp(lang, "/"), lang);
  const t = translations[lang];
  const inline = `<script>window.__ZC_LANG__=${JSON.stringify(lang)};window.__ZC_T__=${inlineJson(t)};</script>`;
  const doc = buildDoc({ lang, html, title: t.metaTitle, description: t.metaDesc, canonical: BASE + lp(lang, "/"), ogType: "website", inlineScripts: inline, neutralPath: "/", extraHead: helmetScripts });
  writeFile(lang === "ru" ? "dist/index.html" : `dist/${lang}/index.html`, doc);
  console.log(`homepage  ${lp(lang, "/")}`);
}

// 2) Blog index per language
const posts = await fetchAllPosts();
console.log(`fetched ${posts.length} blog post(s)`);

for (const lang of LANGS) {
  const langPosts = posts.filter((p) => (p.lang || "ru") === lang).map(toListShape);
  const url = lp(lang, "/blog");
  const { html, helmetScripts } = render(url, lang, { posts: langPosts });
  const t = translations[lang];
  const meta = BLOG_META[lang] || BLOG_META.en;
  const inline = `<script>window.__ZC_LANG__=${JSON.stringify(lang)};window.__ZC_T__=${inlineJson(t)};window.__ZC_BLOG_POSTS__=${inlineJson(langPosts)};</script>`;
  const doc = buildDoc({ lang, html, title: meta.title, description: meta.desc, canonical: BASE + url, ogType: "website", inlineScripts: inline, neutralPath: "/blog", extraHead: helmetScripts });
  writeFile(url === "/blog" ? "dist/blog/index.html" : `dist${url}/index.html`, doc);
  console.log(`blog idx  ${url}  (${langPosts.length} posts)`);
}

// 3) Individual posts
for (const post of posts) {
  const lang = LANGS.includes(post.lang) ? post.lang : "ru";
  const url = lp(lang, `/blog/${post.slug}`);
  const { html, helmetScripts } = render(url, lang, { post });
  const t = translations[lang];
  // Post titles already carry the keywords; a brand suffix would push them past
  // the ~65 char SERP limit, so use the title as written.
  const title = post.title;
  const inline = `<script>window.__ZC_LANG__=${JSON.stringify(lang)};window.__ZC_T__=${inlineJson(t)};window.__ZC_POST__=${inlineJson(post)};</script>`;
  const doc = buildDoc({ lang, html, title, description: post.description, canonical: BASE + url, ogType: "article", inlineScripts: inline, extraHead: helmetScripts });
  writeFile(`dist${url}/index.html`, doc);
}
if (posts.length) console.log(`prerendered ${posts.length} post page(s)`);

console.log("Prerender complete.");
