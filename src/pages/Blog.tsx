import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useI18n, langHref } from "@/lib/i18n";
import { ArrowRight, Calendar, Loader2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getSeededPosts } from "@/lib/blogSeed";
import { mergeWithStatic } from "@/lib/staticPosts";
import { useHeadMeta } from "@/lib/headMeta";
import { LangSwitcher } from "@/components/LangSwitcher";

const SIGNUP_URL = "https://www.pionex.com/ru/signUp?r=0uHzysLVYQh";

export const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  crypto: { ru: "🌐 Криптаны", en: "🌐 Crypto Users", es: "🌐 Con cripto", pt: "🌐 Com cripto", de: "🌐 Krypto-Nutzer", it: "🌐 Utenti crypto", fr: "🌐 Utilisateurs crypto" },
  traders: { ru: "📈 Трейдеры", en: "📈 Traders", es: "📈 Traders", pt: "📈 Traders", de: "📈 Trader", it: "📈 Trader", fr: "📈 Traders" },
  pionex: { ru: "🤖 Pionex Боты", en: "🤖 Pionex Bots", es: "🤖 Bots de Pionex", pt: "🤖 Bots da Pionex", de: "🤖 Pionex Bots", it: "🤖 Bot Pionex", fr: "🤖 Bots Pionex" },
  "ai-users": { ru: "✨ ИИ-пользователи", en: "✨ AI Users", es: "✨ Usuarios de IA", pt: "✨ Usuários de IA", de: "✨ KI-Nutzer", it: "✨ Utenti IA", fr: "✨ Utilisateurs IA" },
  blocked: { ru: "🔒 Заблокированные карты", en: "🔒 Blocked Cards", es: "🔒 Tarjetas bloqueadas", pt: "🔒 Cartões bloqueados", de: "🔒 Gesperrte Karten", it: "🔒 Carte bloccate", fr: "🔒 Cartes bloquées" },
  nomads: { ru: "🌍 Digital Nomads", en: "🌍 Digital Nomads", es: "🌍 Nómadas digitales", pt: "🌍 Nômades digitais", de: "🌍 Digitale Nomaden", it: "🌍 Nomadi digitali", fr: "🌍 Nomades numériques" },
  freelancers: { ru: "💼 Фрилансеры", en: "💼 Freelancers", es: "💼 Freelancers", pt: "💼 Freelancers", de: "💼 Freelancer", it: "💼 Freelance", fr: "💼 Freelances" },
  investors: { ru: "💰 Инвесторы", en: "💰 Investors", es: "💰 Inversores", pt: "💰 Investidores", de: "💰 Investoren", it: "💰 Investitori", fr: "💰 Investisseurs" },
  creators: { ru: "🎨 Блогеры & Creatives", en: "🎨 Bloggers & Creatives", es: "🎨 Creadores", pt: "🎨 Criadores", de: "🎨 Blogger & Kreative", it: "🎨 Blogger e creativi", fr: "🎨 Blogueurs et créatifs" },
  gamers: { ru: "🎮 Геймеры", en: "🎮 Gamers", es: "🎮 Gamers", pt: "🎮 Gamers", de: "🎮 Gamer", it: "🎮 Gamer", fr: "🎮 Gamers" },
  ecommerce: { ru: "🛒 Интернет-торговля", en: "🛒 E-commerce", es: "🛒 E-commerce", pt: "🛒 E-commerce", de: "🛒 E-Commerce", it: "🛒 E-commerce", fr: "🛒 E-commerce" },
  emigrants: { ru: "🌏 Эмигранты", en: "🌏 Emigrants", es: "🌏 Emigrantes", pt: "🌏 Emigrantes", de: "🌏 Auswanderer", it: "🌏 Emigrati", fr: "🌏 Expatriés" },
  parents: { ru: "👨‍👩‍👧 Родители за рубежом", en: "👨‍👩‍👧 Parents Abroad", es: "👨‍👩‍👧 Padres en el extranjero", pt: "👨‍👩‍👧 Pais no exterior", de: "👨‍👩‍👧 Eltern im Ausland", it: "👨‍👩‍👧 Genitori all'estero", fr: "👨‍👩‍👧 Parents à l'étranger" },
  card: { ru: "💳 Карта Pionex", en: "💳 Pionex Card", es: "💳 Tarjeta Pionex", pt: "💳 Cartão Pionex", de: "💳 Pionex Card", it: "💳 Carta Pionex", fr: "💳 Carte Pionex" },
  arbitrage: { ru: "⚡ Арбитражники", en: "⚡ Arbitrage Traders", es: "⚡ Arbitrajistas", pt: "⚡ Arbitradores", de: "⚡ Arbitrage-Trader", it: "⚡ Arbitraggisti", fr: "⚡ Arbitragistes" },
};

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  lang: string;
  category: string;
  image_url: string | null;
  published_at: string;
}

const EMPTY_STATE: Record<string, string> = {
  ru: "Пока нет статей",
  en: "No articles yet",
  de: "Noch keine Artikel",
  es: "Todavía no hay artículos",
  pt: "Ainda não há artigos",
  it: "Ancora nessun articolo",
  fr: "Pas encore d'articles",
};

const BLOG_TITLES: Record<string, string> = {
  ru: "Блог ZeroCard: карта Pionex, торговые боты и USDT",
  en: "ZeroCard blog: Pionex Card, trading bots and USDT",
  de: "ZeroCard Blog: Pionex Card, Trading-Bots und USDT",
  es: "Blog de ZeroCard: tarjeta Pionex, bots de trading y USDT",
  pt: "Blog do ZeroCard: cartão Pionex, bots de trading e USDT",
  it: "Blog di ZeroCard: carta Pionex, bot di trading e USDT",
  fr: "Blog ZeroCard : carte Pionex, bots de trading et USDT",
};

const BLOG_DESCS: Record<string, string> = {
  ru: "Гайды по Pionex: криптокарта и где она работает, настройка грид-бота, комиссии, отзывы, трата USDT за границей.",
  en: "Guides on Pionex: the crypto card and where it works, grid bot setup, fees, reviews and spending USDT abroad.",
  de: "Ratgeber zu Pionex: die Krypto-Karte und wo sie funktioniert, Grid-Bot, Gebühren, Erfahrungen und USDT im Ausland ausgeben.",
  es: "Guías sobre Pionex: la tarjeta cripto y dónde funciona, bot grid, comisiones, opiniones y gastar USDT en el extranjero.",
  pt: "Guias sobre a Pionex: o cartão cripto e onde funciona, bot grid, taxas, avaliações e gastar USDT no exterior.",
  it: "Guide su Pionex: la carta crypto e dove funziona, grid bot, commissioni, recensioni e spendere USDT all'estero.",
  fr: "Guides sur Pionex : la carte crypto et où elle fonctionne, grid bot, frais, avis et dépenser des USDT à l'étranger.",
};

const BLOG_SUBTITLES: Record<string, string> = {
  ru: "Карта Pionex, торговые боты и USDT без рекламных обещаний",
  en: "The Pionex card, trading bots and USDT, without the hype",
  de: "Pionex Card, Trading-Bots und USDT, ohne Werbeversprechen",
  es: "La tarjeta Pionex, bots de trading y USDT, sin promesas vacías",
  pt: "O cartão Pionex, bots de trading e USDT, sem promessas vazias",
  it: "La carta Pionex, bot di trading e USDT, senza promesse vuote",
  fr: "La carte Pionex, les bots de trading et l'USDT, sans promesses creuses",
};

const BACK_HOME: Record<string, string> = {
  ru: "← На главную",
  en: "← Home",
  de: "← Zur Startseite",
  es: "← Al inicio",
  pt: "← Início",
  it: "← Alla home",
  fr: "← Accueil",
};

function BlogHeader() {
  const { lang } = useI18n();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-[20px] border-b border-border" style={{ background: "rgba(2,13,31,0.92)" }}>
      <div className="max-w-[1160px] mx-auto px-5 md:px-10 flex items-center justify-between h-16">
        <Link to={langHref(lang, "/")} className="flex items-center gap-2.5 no-underline text-foreground">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base bg-primary">💳</div>
          <span className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Zero<span className="text-primary">Card</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <Link
            to={langHref(lang, "/")}
            className="text-sm font-medium no-underline transition-colors hidden sm:block text-muted-foreground hover:text-foreground"
          >
            {BACK_HOME[lang] ?? BACK_HOME.en}
          </Link>
        </div>
      </div>
    </header>
  );
}

export { BlogHeader };

function estimateReadTime(description: string, lang: string): string {
  const words = description.split(/\s+/).length;
  const min = Math.max(3, Math.round(words / 40));
  return lang === "ru" ? `${min} мин` : lang === "es" ? `${min} min` : lang === "pt" ? `${min} min` : `${min} Min.`.replace("Min.", lang === "de" ? "Min." : "min");
}



function posts_empty(lang: string): boolean {
  const seeded = getSeededPosts() as BlogPost[] | null;
  return mergeWithStatic(seeded).every((p) => p.lang !== lang) && seeded === null;
}

export default function Blog() {
  const { lang } = useI18n();
  const [posts, setPosts] = useState<BlogPost[]>(() => mergeWithStatic(getSeededPosts() as BlogPost[] | null) as BlogPost[]);
  const [loading, setLoading] = useState(() => posts_empty(lang));

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, title, description, lang, category, image_url, published_at")
      .order("published_at", { ascending: false });
    setPosts(mergeWithStatic((data as BlogPost[] | null) ?? (getSeededPosts() as BlogPost[] | null)) as BlogPost[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    window.scrollTo(0, 0);
  }, [lang]);

  const filtered = posts.filter((p) => p.lang === lang);

  const pageTitle = BLOG_TITLES[lang] ?? BLOG_TITLES.en;
  const pageDesc = BLOG_DESCS[lang] ?? BLOG_DESCS.en;
  useHeadMeta({ title: pageTitle, description: pageDesc, canonical: `https://zerocard.pro${langHref(lang, "/blog")}`, ogType: "website" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: pageTitle,
          description: pageDesc,
          url: `https://zerocard.pro${langHref(lang, "/blog")}`,
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ZeroCard", item: "https://zerocard.pro/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: `https://zerocard.pro${langHref(lang, "/blog")}` },
          ],
        })}</script>
      </Helmet>
      <BlogHeader />

      <main className="max-w-[900px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {"Blog"}
          </h1>
          <p className="text-lg mb-3 text-muted-foreground">
            {BLOG_SUBTITLES[lang] ?? BLOG_SUBTITLES.en}
          </p>
          {/* Gradient separator */}
          <div className="h-px mb-10 rounded-full" style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.1))" }} />
        </div>


        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center py-20 text-muted-foreground">
            {EMPTY_STATE[lang] ?? EMPTY_STATE.en}
          </p>
        ) : (
          <div className="grid gap-5">
            {filtered.map((post, idx) => (
              <div key={post.id} className="blog-card-in" style={{ animationDelay: `${Math.min(idx, 8) * 60}ms` }}>
                <Link
                  to={langHref(lang, `/blog/${post.slug}`)}
                  className="group block rounded-2xl border overflow-hidden no-underline transition-all duration-300 border-border bg-card hover:border-primary/60"
                  style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px hsl(var(--primary) / 0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Top gradient line */}
                  <div className="h-[2px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.3))" }} />

                  <div className="md:flex">
                  {post.image_url && (
                    <img
                      src={post.image_url.replace(/\.webp$/, "-640.webp")}
                      srcSet={`${post.image_url.replace(/\.webp$/, "-640.webp")} 640w, ${post.image_url} 1200w`}
                      sizes="(min-width: 768px) 300px, 100vw"
                      width={640} height={360} loading={idx < 2 ? "eager" : "lazy"} decoding="async" alt=""
                      className="blog-cover"
                    />
                  )}
                  <div className="p-6 md:p-8 flex-1 min-w-0">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                        {CATEGORY_LABELS[post.category]?.[lang] || post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.published_at).toLocaleDateString(
                          ({ ru: "ru-RU", de: "de-DE", es: "es-ES", pt: "pt-BR", it: "it-IT", fr: "fr-FR" } as Record<string, string>)[lang] ?? "en-US",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {estimateReadTime(post.description, lang)}
                      </span>
                    </div>

                    <h2
                      className="text-lg md:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-200"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {post.title}
                    </h2>

                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2" style={{ lineHeight: 1.65 }}>
                      {post.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3 text-primary">
                      {({ ru: "Читать", de: "Lesen", es: "Leer", pt: "Ler", it: "Leggi", fr: "Lire" } as Record<string, string>)[lang] ?? "Read"} <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
