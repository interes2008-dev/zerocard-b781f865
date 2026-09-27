import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const serverEntry = pathToFileURL(path.join(root, "dist-server/entry-server.js")).href;
const { render, translations, STATIC_POSTS, ABOUT } = await import(serverEntry);

const template = fs.readFileSync(path.join(root, "dist/index.html"), "utf-8");

const BASE = "https://zerocard.pro";
const LANGS = ["ru", "en", "de", "es", "pt", "it", "fr"];
const LANG_NAME = { ru: "Russian", en: "English", de: "German", es: "Spanish", pt: "Portuguese", it: "Italian", fr: "French" };
const OG_LOCALE = { ru: "ru_RU", en: "en_US", de: "de_DE", es: "es_ES", pt: "pt_BR", it: "it_IT", fr: "fr_FR" };

const lp = (lang, p) => (lang === "ru" ? p : p === "/" ? `/${lang}` : `/${lang}${p}`);

const BLOG_META = {
  ru: { title: "Блог ZeroCard: карта Pionex, торговые боты и USDT", desc: "Гайды по Pionex: криптокарта и где она работает, настройка грид-бота, комиссии, отзывы, трата USDT за границей." },
  en: { title: "ZeroCard blog: Pionex Card, trading bots and USDT", desc: "Guides on Pionex: the crypto card and where it works, grid bot setup, fees, reviews and spending USDT abroad." },
  de: { title: "ZeroCard Blog: Pionex Card, Trading-Bots und USDT", desc: "Ratgeber zu Pionex: die Krypto-Karte und wo sie funktioniert, Grid-Bot, Gebühren, Erfahrungen und USDT im Ausland ausgeben." },
  es: { title: "Blog de ZeroCard: tarjeta Pionex, bots de trading y USDT", desc: "Guías sobre Pionex: la tarjeta cripto y dónde funciona, bot grid, comisiones, opiniones y gastar USDT en el extranjero." },
  pt: { title: "Blog do ZeroCard: cartão Pionex, bots de trading e USDT", desc: "Guias sobre a Pionex: o cartão cripto e onde funciona, bot grid, taxas, avaliações e gastar USDT no exterior." },
  it: { title: "Blog di ZeroCard: carta Pionex, bot di trading e USDT", desc: "Guide su Pionex: la carta crypto e dove funziona, grid bot, commissioni, recensioni e spendere USDT all'estero." },
  fr: { title: "Blog ZeroCard : carte Pionex, bots de trading et USDT", desc: "Guides sur Pionex : la carte crypto et où elle fonctionne, grid bot, frais, avis et dépenser des USDT à l'étranger." },
};

const ogImage = (lang) => `${BASE}/og/zerocard-${LANGS.includes(lang) ? lang : "en"}-v4.jpg`;
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
  // Per-language housekeeping: the template head is Russian.
  doc = setMeta(doc, /<meta name="language" content="[^"]*">/, `<meta name="language" content="${LANG_NAME[lang] ?? "English"}">`);
  doc = setMeta(doc, /<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${esc(title)}">`);
  doc = setMeta(doc, /<meta name="twitter:image:alt" content="[^"]*">/, `<meta name="twitter:image:alt" content="${esc(title)}">`);
  // Localized preview image (1200x630 JPEG). The versioned file name makes X/Telegram fetch it fresh.
  const img = ogImage(lang);
  doc = setMeta(doc, /<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${img}">`);
  doc = setMeta(doc, /<meta property="og:image:secure_url" content="[^"]*">/, `<meta property="og:image:secure_url" content="${img}">`);
  doc = setMeta(doc, /<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${img}">`);

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

// 1b) About / editorial policy page per language
for (const lang of LANGS) {
  const url = lp(lang, "/about");
  const { html, helmetScripts } = render(url, lang);
  const t = translations[lang];
  const a = ABOUT[lang] || ABOUT.en;
  const inline = `<script>window.__ZC_LANG__=${JSON.stringify(lang)};window.__ZC_T__=${inlineJson(t)};</script>`;
  const doc = buildDoc({ lang, html, title: a.title, description: a.desc, canonical: BASE + url, ogType: "website", inlineScripts: inline, neutralPath: "/about", extraHead: helmetScripts });
  writeFile(`dist${url}/index.html`, doc);
  console.log(`about     ${url}`);
}

// 2) Blog index per language
const remotePosts = await fetchAllPosts();
const staticKeys = new Set(STATIC_POSTS.map((p) => `${p.lang}:${p.slug}`));
const posts = [...STATIC_POSTS, ...remotePosts.filter((p) => !staticKeys.has(`${p.lang || "ru"}:${p.slug}`))]
  .sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)));
console.log(`blog posts: ${STATIC_POSTS.length} from repo + ${posts.length - STATIC_POSTS.length} from Supabase`);

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
  const mdLink = post.content ? `<link rel="alternate" type="text/markdown" href="${BASE}${url}.md" title="Markdown">` : "";
  let doc = buildDoc({ lang, html, title, description: post.description, canonical: BASE + url, ogType: "article", inlineScripts: inline, extraHead: `${helmetScripts}\n    ${mdLink}` });
  // Articles in the same translation group point at each other; others only at themselves.
  const siblings = post.group ? posts.filter((p) => p.group === post.group) : [post];
  const alt = siblings
    .map((p) => { const l = LANGS.includes(p.lang) ? p.lang : "ru"; return `    <link rel="alternate" hreflang="${l}" href="${BASE}${lp(l, `/blog/${p.slug}`)}">`; })
    .join("\n");
  const xdef = siblings.find((p) => p.lang === "en");
  const altAll = xdef && siblings.length > 1 ? `${alt}\n    <link rel="alternate" hreflang="x-default" href="${BASE}${lp("en", `/blog/${xdef.slug}`)}">` : alt;
  doc = doc.replace(
    /[ \t]*<link rel="alternate" hreflang="[\s\S]*?hreflang="x-default"[^>]*>/,
    altAll
  );
  writeFile(`dist${url}/index.html`, doc);
}
if (posts.length) console.log(`prerendered ${posts.length} post page(s)`);

// 4) AI-readable layer: per-article markdown, llms.txt and llms-full.txt
const LANG_LABEL = { ru: "Русский", en: "English", de: "Deutsch", es: "Español", pt: "Português", it: "Italiano", fr: "Français" };
const abs = (md) => md.replace(/\]\((\/[^)\s]*)\)/g, (_, p) => `](${BASE}${p})`);
const SOURCE_SETS = (await import(serverEntry)).SOURCE_SETS || {};
const srcList = (names) => (names || "").split(",").map((x) => x.trim()).filter(Boolean)
  .flatMap((n) => SOURCE_SETS[n] || []).filter((v, i, arr) => arr.findIndex((y) => y.url === v.url) === i);

function postMarkdown(post) {
  const lang = LANGS.includes(post.lang) ? post.lang : "ru";
  const url = BASE + lp(lang, `/blog/${post.slug}`);
  const upd = String(post.updated_at || post.published_at).slice(0, 10);
  const srcs = srcList(post.sources);
  return [
    `# ${post.title}`,
    "",
    `> ${post.description}`,
    "",
    `- URL: ${url}`,
    `- Language: ${lang}`,
    `- Published: ${String(post.published_at).slice(0, 10)}`,
    `- Updated: ${upd}`,
    `- Publisher: ZeroCard (independent affiliate guide, not Pionex)`,
    "",
    abs(post.content || ""),
    ...(srcs.length ? ["", "## Sources", "", ...srcs.map((x) => `- [${x.title}](${x.url})`)] : []),
    "",
  ].join("\n");
}

let mdCount = 0;
for (const post of posts) {
  if (!post.content) continue;
  const lang = LANGS.includes(post.lang) ? post.lang : "ru";
  writeFile(`dist${lp(lang, `/blog/${post.slug}`)}.md`, postMarkdown(post));
  mdCount++;
}

const FACTS = [
  "The Pionex Card is a virtual Visa or Mastercard funded with USDT; Pionex values USDT 1:1 with the US dollar.",
  "Cashback: up to 1% on eligible purchases, with exclusions (for example eToro, TikTok, Wise). Refunds reverse the cashback.",
  "5% APR on the USDT card balance, credited hourly; a current product term that can change.",
  "Fees: USD purchases have no conversion fee. Non-USD purchases: Visa 1% (offset by the 1% cashback), Mastercard 2% to 3.5% per Pionex materials.",
  "Limits: Visa 10,000 USDT per purchase and per day, 50,000 per month; Mastercard 20,000 / 20,000 / 100,000.",
  "Pionex declines card payments at merchants registered or operating in Russia, Belarus, Ukraine, Iran, Venezuela, Myanmar, Afghanistan and North Korea (notice of June 2026). Foreign cards do not work at Russian terminals.",
  "Pionex does not accept registration/KYC from the US, Canada, the UK, France, the Netherlands, Austria, Japan, Singapore, China, Hong Kong, among others.",
  "EU residents: since the end of the MiCA transitional period (1 July 2026) the regulated route is Webot EU (Pionew Ireland Limited, MiCA-authorised by the Central Bank of Ireland).",
  "Pionex spot trading fee: 0.05% per trade. Grid bots are free to use but pay the trading fee on every order.",
];

const byLang = (l) => posts.filter((p) => (LANGS.includes(p.lang) ? p.lang : "ru") === l);
const llms = [
  "# ZeroCard",
  "",
  "> Independent, multilingual guide to the Pionex crypto card and Pionex trading bots. Not an official Pionex site: sign-up links carry an affiliate code (marked rel=sponsored). Facts are taken from Pionex help pages and regulators, with sources listed on each article.",
  "",
  `Last generated: ${new Date().toISOString().slice(0, 10)}. Full text of every article: ${BASE}/llms-full.txt. Each article is also available as Markdown by adding .md to its URL.`,
  "",
  "## Key facts (September 2026)",
  "",
  ...FACTS.map((f) => `- ${f}`),
  "",
  "## Site pages",
  "",
  ...LANGS.map((l) => `- [${LANG_LABEL[l]} home](${BASE}${lp(l, "/")}), [blog](${BASE}${lp(l, "/blog")}), [about and editorial policy](${BASE}${lp(l, "/about")})`),
  "",
  ...LANGS.flatMap((l) => {
    const ps = byLang(l);
    if (!ps.length) return [];
    return [`## Articles: ${LANG_LABEL[l]}`, "", ...ps.map((p) => `- [${p.title}](${BASE}${lp(l, `/blog/${p.slug}`)}): ${p.description}`), ""];
  }),
].join("\n");
fs.writeFileSync(path.join(root, "dist/llms.txt"), llms);

const full = [
  "# ZeroCard: full text of all articles",
  "",
  `> Generated ${new Date().toISOString().slice(0, 10)}. Independent affiliate guide to the Pionex card and trading bots, not Pionex. Index: ${BASE}/llms.txt`,
  "",
  ...posts.filter((p) => p.content).map((p) => postMarkdown(p).replace(/^# /, "## ").replace(/\n## Sources/, "\n### Sources") + "\n---\n"),
].join("\n");
fs.writeFileSync(path.join(root, "dist/llms-full.txt"), full);
console.log(`AI layer: ${mdCount} markdown articles, llms.txt, llms-full.txt`);

console.log("Prerender complete.");
