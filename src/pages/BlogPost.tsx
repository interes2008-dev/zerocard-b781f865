import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { BlogHeader } from "./Blog";
import { ArrowLeft, ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
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

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  lang: string;
  category: string;
  published_at: string;
}

function estimateReadTime(content: string, lang: string): string {
  const words = content.split(/\s+/).length;
  const min = Math.max(2, Math.round(words / 200));
  return lang === "ru" ? `${min} мин чтения` : `${min} min read`;
}

/* ── Inline renderer (bold) ── */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/* ── Markdown-ish content renderer ── */
function RenderContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let inTable = false;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const header = tableRows[0];
    const body = tableRows.slice(1);
    elements.push(
      <div key={`table-${elements.length}`} className="overflow-x-auto my-6 rounded-xl border border-border">
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="bg-secondary/60">
              {header.map((cell, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide border-b border-border text-muted-foreground">{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-b border-border/50 last:border-b-0 hover:bg-secondary/30 transition-colors">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-sm text-muted-foreground">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("|")) {
      const cells = line.split("|").filter(Boolean).map(c => c.trim());
      if (cells.every(c => /^[-:]+$/.test(c))) continue;
      tableRows.push(cells);
      inTable = true;
      continue;
    }
    if (inTable) flushTable();

    /* H2 */
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-lg font-bold mt-10 mb-3 text-foreground flex items-center gap-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", lineHeight: 1.4 }}
        >
          <span className="w-1 h-5 rounded-full bg-primary inline-block" />
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    /* Unordered list */
    if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-5 mb-1.5 text-sm text-muted-foreground list-none flex gap-2" style={{ lineHeight: 1.75 }}>
          <span className="text-primary mt-1.5 text-[8px]">●</span>
          <span>{renderInline(line.slice(2))}</span>
        </li>
      );
      continue;
    }

    /* Ordered list */
    const numMatch = line.match(/^(\d+)\.\s(.+)/);
    if (numMatch) {
      elements.push(
        <div key={i} className="flex gap-3 mb-2 text-sm text-muted-foreground" style={{ lineHeight: 1.75 }}>
          <span className="font-bold text-primary min-w-[1.5rem] text-right">{numMatch[1]}.</span>
          <span>{renderInline(numMatch[2])}</span>
        </div>
      );
      continue;
    }

    if (line.trim() === "") continue;

    /* Paragraph */
    elements.push(
      <p key={i} className="mb-4 text-sm text-muted-foreground" style={{ lineHeight: 1.8 }}>
        {renderInline(line)}
      </p>
    );
  }

  if (inTable) flushTable();
  return <>{elements}</>;
}

/* ── Blog Post Page ── */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useI18n();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }
    const fetchPost = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();
      if (data) setPost(data);
      else setNotFound(true);
      setLoading(false);
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | ZeroCard Blog`;
    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", value);
    };
    setMeta("name", "description", post.description);
    setMeta("property", "og:title", `${post.title} | ZeroCard Blog`);
    setMeta("property", "og:description", post.description);
    setMeta("property", "og:type", "article");
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <BlogHeader />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (notFound || !post) return <Navigate to="/blog" replace />;

  const postLang = post.lang as "ru" | "en";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <article className="w-full max-w-[900px] mx-auto px-5 md:px-8 pt-8 pb-16">

        {/* Back link — top */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {lang === "ru" ? "Все статьи" : "All articles"}
          </Link>
        </motion.div>

        {/* Meta row: category + date + read time */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-wrap items-center gap-3 mb-4"
        >
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {CATEGORY_LABELS[post.category]?.[lang] || post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.published_at).toLocaleDateString(
              postLang === "ru" ? "ru-RU" : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {estimateReadTime(post.content, postLang)}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-xl md:text-2xl font-bold leading-snug mb-3 text-foreground"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.35rem, 2vw, 1.75rem)" }}
        >
          {post.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm text-muted-foreground mb-6"
          style={{ lineHeight: 1.65 }}
        >
          {post.description}
        </motion.p>

        {/* Gradient separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px mb-8 origin-left rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.05))" }}
        />

        {/* Content sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="blog-content"
        >
          <RenderContent content={post.content} />
        </motion.div>

        {/* ── CTA block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-2xl border border-primary/20 p-6 md:p-8 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02))" }}
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)"
          }} />

          <div className="relative z-10">
            <h3
              className="text-lg md:text-xl font-bold mb-2 text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {postLang === "ru" ? "Получить карту бесплатно за 5 минут" : "Get Your Card for Free in 5 Minutes"}
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">
              {postLang === "ru" ? "Криптокарта с 1% кэшбэком и 5% годовых на остаток USDT" : "Crypto card with 1% cashback and 5% APR on USDT balance"}
            </p>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ boxShadow: "0 4px 16px hsl(var(--primary) / 0.3)" }}
            >
              {postLang === "ru" ? "Оформить ZeroCard" : "Get ZeroCard"} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Back link — bottom */}
        <div className="mt-8">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {lang === "ru" ? "Все статьи" : "All articles"}
          </Link>
        </div>
      </article>
    </div>
  );
}
