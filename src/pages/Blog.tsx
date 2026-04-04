import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n, type Lang } from "@/lib/i18n";
import { ArrowRight, Calendar, Loader2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const SIGNUP_URL = "https://www.pionex.com/ru/signUp?r=0uHzysLVYQh";

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  crypto: { ru: "🌐 Криптаны", en: "🌐 Crypto Users" },
  traders: { ru: "📈 Трейдеры", en: "📈 Traders" },
  pionex: { ru: "🤖 Pionex Боты", en: "🤖 Pionex Bots" },
  "ai-users": { ru: "✨ ИИ-пользователи", en: "✨ AI Users" },
  blocked: { ru: "🔒 Заблокированные карты", en: "🔒 Blocked Cards" },
  nomads: { ru: "🌍 Digital Nomads", en: "🌍 Digital Nomads" },
  freelancers: { ru: "💼 Фрилансеры", en: "💼 Freelancers" },
  investors: { ru: "💰 Инвесторы", en: "💰 Investors" },
  creators: { ru: "🎨 Блогеры & Creatives", en: "🎨 Bloggers & Creatives" },
  gamers: { ru: "🎮 Геймеры", en: "🎮 Gamers" },
  ecommerce: { ru: "🛒 Интернет-торговля", en: "🛒 E-commerce" },
  emigrants: { ru: "🌏 Эмигранты", en: "🌏 Emigrants" },
  parents: { ru: "👨‍👩‍👧 Родители за рубежом", en: "👨‍👩‍👧 Parents Abroad" },
  arbitrage: { ru: "⚡ Арбитражники", en: "⚡ Arbitrage Traders" },
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

function BlogHeader() {
  const { lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-[20px] border-b border-border" style={{ background: "rgba(2,13,31,0.92)" }}>
      <div className="max-w-[1160px] mx-auto px-5 md:px-10 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 no-underline text-foreground">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base bg-primary">💳</div>
          <span className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Zero<span className="text-primary">Card</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "ru" ? "en" : "ru")}
            className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all hover:scale-105 border-border bg-secondary"
            title={lang === "ru" ? "Switch to English" : "Переключить на русский"}
          >
            <span className="text-lg leading-none">{lang === "ru" ? "🇷🇺" : "🇬🇧"}</span>
          </button>
          <Link
            to="/"
            className="text-sm font-medium no-underline transition-colors hidden sm:block text-muted-foreground hover:text-foreground"
          >
            {lang === "ru" ? "← На главную" : "← Home"}
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
  return lang === "ru" ? `${min} мин` : `${min} min`;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Blog() {
  const { lang } = useI18n();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoGenerating, setAutoGenerating] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, title, description, lang, category, image_url, published_at")
      .order("published_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const autoGenerate = async () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const { data: todayPosts } = await supabase
      .from("blog_posts")
      .select("id")
      .gte("published_at", todayStr + "T00:00:00Z")
      .lte("published_at", todayStr + "T23:59:59Z")
      .limit(1);

    if (!todayPosts || todayPosts.length === 0) {
      setAutoGenerating(true);
      try {
        await supabase.functions.invoke("generate-blog-post", { body: {} });
        await fetchPosts();
      } catch (e) {
        console.error("Auto-generate failed:", e);
      }
      setAutoGenerating(false);
    }
  };

  useEffect(() => {
    fetchPosts().then(() => autoGenerate());
    document.title =
      lang === "ru"
        ? "Блог | ZeroCard — криптокарта с кэшбэком"
        : "Blog | ZeroCard — Crypto Card with Cashback";
    window.scrollTo(0, 0);
  }, [lang]);

  const filtered = posts.filter((p) => p.lang === lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <main className="max-w-[900px] mx-auto px-5 md:px-10 py-16 md:py-24">
        {/* Header with gradient accent */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {lang === "ru" ? "Блог" : "Blog"}
          </h1>
          <p className="text-lg mb-3 text-muted-foreground">
            {lang === "ru"
              ? "Статьи о криптокартах, USDT и финансах"
              : "Articles about crypto cards, USDT, and finance"}
          </p>
          {/* Gradient separator */}
          <div className="h-px mb-10 rounded-full" style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.1))" }} />
        </motion.div>

        {autoGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 mb-8 p-4 rounded-xl border border-primary/30 bg-primary/5"
          >
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              {lang === "ru" ? "Генерируем новую статью..." : "Generating new article..."}
            </span>
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center py-20 text-muted-foreground">
            {lang === "ru" ? "Пока нет статей" : "No articles yet"}
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
                  to={`/blog/${post.slug}`}
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
                          lang === "ru" ? "ru-RU" : "en-US",
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
                      {lang === "ru" ? "Читать" : "Read"} <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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
