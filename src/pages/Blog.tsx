import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useI18n, langHref } from "@/lib/i18n";
import { ArrowRight, Calendar, Loader2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { getSeededPosts } from "@/lib/blogSeed";
import { LangSwitcher } from "@/components/LangSwitcher";

const SIGNUP_URL = "https://www.pionex.com/ru/signUp?r=0uHzysLVYQh";

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
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
  ru: "Блог ZeroCard - плати по миру, крипта, USDT и Pionex",
  en: "ZeroCard Blog - pay worldwide, crypto, USDT & Pionex",
  de: "ZeroCard Blog - weltweit zahlen, Krypto, USDT und Pionex",
  es: "Blog de ZeroCard: paga por el mundo, cripto, USDT y Pionex",
  pt: "Blog do ZeroCard: pague pelo mundo, cripto, USDT e Pionex",
  it: "Blog di ZeroCard: paga in tutto il mondo, crypto, USDT e Pionex",
  fr: "Blog ZeroCard : payer en USDT partout, crypto et Pionex",
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

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

export default function Blog() {
  const { lang } = useI18n();
  const [posts, setPosts] = useState<BlogPost[]>(() => getSeededPosts() ?? []);
  const [loading, setLoading] = useState(() => getSeededPosts() === null);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, title, description, lang, category, image_url, published_at")
      .order("published_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

<<<<<<< HEAD
  const autoGenerate = async () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const { data: todayPosts } = await supabase
      .from("blog_posts")
      .select("id, lang")
      .gte("published_at", todayStr + "T00:00:00Z")
      .lte("published_at", todayStr + "T23:59:59Z");

    const SITE_LANGS = ["ru", "en", "de"] as const;
    const covered = new Set((todayPosts || []).map((p: any) => p.lang));
    const missing = SITE_LANGS.filter((l) => !covered.has(l));

    if (missing.length === 0) return;

    setAutoGenerating(true);
    try {
      // Generate one HOT article per missing language, sequentially to avoid rate limits
      for (const l of missing) {
        try {
          await supabase.functions.invoke("generate-blog-post", { body: { lang: l, hot: true } });
        } catch (e) {
          console.error(`Auto-generate failed for ${l}:`, e);
        }
      }
      await fetchPosts();
    } finally {
      setAutoGenerating(false);
    }
  };

  useEffect(() => {
    fetchPosts().then(() => autoGenerate());
    document.title = BLOG_TITLES[lang] ?? BLOG_TITLES.en;
=======
  useEffect(() => {
    fetchPosts();
    document.title =
      lang === "ru"
        ? "Блог ZeroCard - плати по миру, крипта, USDT и Pionex"
        : "ZeroCard Blog - pay worldwide, crypto, USDT & Pionex";
>>>>>>> ceeeee35cb7ed71e6e2b0522a118e5c0507655b0
    window.scrollTo(0, 0);
  }, [lang]);

  const filtered = posts.filter((p) => p.lang === lang);

  const pageTitle = lang === "ru"
    ? "Блог ZeroCard - плати по миру, крипта, USDT и Pionex"
    : lang === "es"
    ? "Blog de ZeroCard: paga por el mundo, cripto, USDT y Pionex"
    : lang === "pt"
    ? "Blog do ZeroCard: pague pelo mundo, cripto, USDT e Pionex"
    : "ZeroCard Blog - pay worldwide, crypto, USDT & Pionex";
  const pageDesc = lang === "ru"
    ? "Статьи о том, как платить по миру криптой: международные платежи, оплата за границей, глобальные переводы, USDT, Pionex и жизнь без банковских ограничений."
    : lang === "es"
    ? "Guías para pagar por el mundo con cripto: pagos internacionales, gastar en el extranjero, transferencias globales, USDT, Pionex y una vida sin límites bancarios."
    : lang === "pt"
    ? "Guias de como pagar pelo mundo com cripto: pagamentos internacionais, gastar no exterior, transferências globais, USDT, Pionex e uma vida sem limites bancários."
    : "Guides on how to pay worldwide with crypto: international payments, spending abroad, global transfers, USDT, Pionex and life without banking limits.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`https://zerocard.pro${langHref(lang, "/blog")}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={`https://zerocard.pro${langHref(lang, "/blog")}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: pageTitle,
          description: pageDesc,
          url: "https://zerocard.pro/blog",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ZeroCard", item: "https://zerocard.pro/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://zerocard.pro/blog" },
          ],
        })}</script>
      </Helmet>
      <BlogHeader />

      <main className="max-w-[900px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {"Blog"}
          </h1>
          <p className="text-lg mb-3 text-muted-foreground">
            {lang === "ru"
              ? "Статьи о криптокартах, USDT и финансах"
              : lang === "es"
              ? "Artículos sobre tarjetas cripto, USDT y finanzas"
              : lang === "pt"
              ? "Artigos sobre cartões cripto, USDT e finanças"
              : "Articles about crypto cards, USDT, and finance"}
          </p>
          {/* Gradient separator */}
          <div className="h-px mb-10 rounded-full" style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.1))" }} />
        </motion.div>

<<<<<<< HEAD
        {autoGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 mb-8 p-4 rounded-xl border border-primary/30 bg-primary/5"
          >
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              {lang === "ru" ? "Генерируем новую статью..." : lang === "de" ? "Neuer Artikel wird erstellt..." : lang === "es" ? "Generando un nuevo artículo..." : lang === "pt" ? "Gerando um novo artigo..." : "Generating new article..."}
            </span>
          </motion.div>
        )}
=======
>>>>>>> ceeeee35cb7ed71e6e2b0522a118e5c0507655b0

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
              <motion.div
                key={post.id}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
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

                  <div className="p-6 md:p-8">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                        {CATEGORY_LABELS[post.category]?.[lang] || post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.published_at).toLocaleDateString(
                          lang === "ru" ? "ru-RU" : lang === "de" ? "de-DE" : lang === "es" ? "es-ES" : lang === "pt" ? "pt-BR" : "en-US",
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
                      {lang === "ru" ? "Читать" : lang === "de" ? "Lesen" : lang === "es" ? "Leer" : lang === "pt" ? "Ler" : "Read"} <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
