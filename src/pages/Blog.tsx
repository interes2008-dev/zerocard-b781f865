import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n, type Lang } from "@/lib/i18n";
import { ArrowRight, Calendar, Globe, Loader2 } from "lucide-react";
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
          <div className="flex items-center gap-1.5 rounded-lg overflow-hidden border border-border">
            <Globe className="w-4 h-4 ml-2.5 text-muted-foreground" />
            {(["en", "ru"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  background: lang === l ? "hsl(var(--primary))" : "transparent",
                  color: lang === l ? "#fff" : "hsl(var(--muted-foreground))",
                }}
              >
                {l}
              </button>
            ))}
          </div>
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

export default function Blog() {
  const { lang } = useI18n();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoGenerating, setAutoGenerating] = useState(false);

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, title, description, lang, category, image_url, published_at")
      .order("published_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  // Auto-generate if no post today
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
        await supabase.functions.invoke("generate-blog-post", {
          body: {},
        });
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
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {lang === "ru" ? "Блог" : "Blog"}
        </h1>
        <p className="text-lg mb-8 text-muted-foreground">
          {lang === "ru"
            ? "Статьи о криптокартах, USDT и финансах"
            : "Articles about crypto cards, USDT, and finance"}
        </p>


        {autoGenerating && (
          <div className="flex items-center gap-3 mb-8 p-4 rounded-xl border border-primary/30 bg-primary/5">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              {lang === "ru" ? "Генерируем новую статью..." : "Generating new article..."}
            </span>
          </div>
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
          <div className="grid gap-6">
            {filtered.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block rounded-2xl border overflow-hidden no-underline transition-all duration-300 border-border bg-card hover:border-primary hover:-translate-y-0.5"
                style={{ boxShadow: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="p-6 md:p-8">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: post.lang === "ru" ? "rgba(239,68,68,0.15)" : "rgba(59,130,246,0.15)",
                        color: post.lang === "ru" ? "#ef4444" : "#3b82f6",
                      }}
                    >
                      {post.lang === "ru" ? "🇷🇺 RU" : "🇬🇧 EN"}
                    </span>
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground"
                    >
                      {CATEGORY_LABELS[post.category]?.[lang] || post.category}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_at).toLocaleDateString(
                      lang === "ru" ? "ru-RU" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </div>

                  {/* Title */}
                  <h2
                    className="text-xl md:text-2xl font-bold mb-3 text-foreground"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-4 text-muted-foreground" style={{ lineHeight: 1.6 }}>
                    {post.description}
                  </p>

                  {/* Read button */}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3 text-primary">
                    {lang === "ru" ? "Читать" : "Read"} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
