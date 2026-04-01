import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, Plus, ArrowLeft } from "lucide-react";

const CATEGORIES = [
  { id: "crypto", label: "🌐 Криптаны / Crypto Users" },
  { id: "traders", label: "📈 Трейдеры / Traders" },
  { id: "pionex", label: "🤖 Pionex Боты / Pionex Bots" },
  { id: "ai-users", label: "✨ ИИ-пользователи / AI Users" },
  { id: "blocked", label: "🔒 Заблокированные карты / Blocked Cards" },
  { id: "nomads", label: "🌍 Digital Nomads" },
  { id: "freelancers", label: "💼 Фрилансеры / Freelancers" },
  { id: "investors", label: "💰 Инвесторы / Investors" },
  { id: "creators", label: "🎨 Блогеры & Creatives" },
  { id: "gamers", label: "🎮 Геймеры / Gamers" },
  { id: "ecommerce", label: "🛒 Интернет-торговля / E-commerce" },
  { id: "emigrants", label: "🌏 Эмигранты / Emigrants" },
  { id: "parents", label: "👨‍👩‍👧 Родители за рубежом / Parents Abroad" },
  { id: "arbitrage", label: "⚡ Арбитражники / Arbitrage Traders" },
];

interface Post {
  id: string;
  slug: string;
  title: string;
  lang: string;
  category: string;
  published_at: string;
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genLang, setGenLang] = useState<"ru" | "en">("ru");
  const [genCategory, setGenCategory] = useState("");
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, title, lang, category, published_at")
      .order("published_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    document.title = "Blog Admin | ZeroCard";
  }, []);

  const generate = async () => {
    setGenerating(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("generate-blog-post", {
        body: {
          lang: genLang,
          ...(genCategory ? { category: genCategory } : {}),
        },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      await fetchPosts();
    } catch (e: any) {
      setError(e.message || "Generation failed");
    }
    setGenerating(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // Determine next auto-publish info
  const today = new Date();
  const dayOfMonth = today.getDate();
  const nextLang = dayOfMonth % 2 === 0 ? "RU" : "EN";
  const todayPosts = posts.filter(
    (p) => p.published_at.slice(0, 10) === today.toISOString().slice(0, 10)
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-[1000px] mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground no-underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Blog Admin Panel
        </h1>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-8 mt-4">
          <div className="px-4 py-3 rounded-xl bg-card border border-border">
            <div className="text-2xl font-bold text-primary">{posts.length}</div>
            <div className="text-xs text-muted-foreground">Total Posts</div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-card border border-border">
            <div className="text-2xl font-bold text-primary">{todayPosts.length}</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-card border border-border">
            <div className="text-sm font-bold text-foreground">
              Next auto: {nextLang}
            </div>
            <div className="text-xs text-muted-foreground">
              {todayPosts.length === 0 ? "Will generate on next visit" : "Done for today"}
            </div>
          </div>
        </div>

        {/* Generate section */}
        <div className="p-6 rounded-2xl bg-card border border-border mb-8">
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Generate Article Manually
          </h2>
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Language</label>
              <select
                value={genLang}
                onChange={(e) => setGenLang(e.target.value as "ru" | "en")}
                className="px-3 py-2 rounded-lg bg-secondary text-foreground border border-border text-sm"
              >
                <option value="ru">🇷🇺 RU</option>
                <option value="en">🇬🇧 EN</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Category (optional)</label>
              <select
                value={genCategory}
                onChange={(e) => setGenCategory(e.target.value)}
                className="px-3 py-2 rounded-lg bg-secondary text-foreground border border-border text-sm"
              >
                <option value="">Auto (rotate)</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={generate}
              disabled={generating}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-white transition-all disabled:opacity-50 bg-primary hover:opacity-90"
            >
              {generating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {generating ? "Generating..." : "Generate Now"}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>

        {/* Posts list */}
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          All Posts ({posts.length})
        </h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    background: post.lang === "ru" ? "rgba(239,68,68,0.15)" : "rgba(59,130,246,0.15)",
                    color: post.lang === "ru" ? "#ef4444" : "#3b82f6",
                  }}
                >
                  {post.lang.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(post.published_at).toLocaleDateString("ru-RU")}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex-1 text-sm font-medium text-foreground no-underline hover:text-primary truncate"
                >
                  {post.title}
                </Link>
                <span className="text-xs text-muted-foreground hidden sm:block">{post.category}</span>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
