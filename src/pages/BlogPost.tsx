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

/* ── Inline renderer (bold + links) ── */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/* ── Magazine-quality content renderer ── */
function RenderContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let inTable = false;
  let listBuffer: React.ReactNode[] = [];
  let orderedBuffer: React.ReactNode[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-5 space-y-2.5 pl-1">
          {listBuffer}
        </ul>
      );
      listBuffer = [];
    }
  };

  const flushOrdered = () => {
    if (orderedBuffer.length > 0) {
      elements.push(
        <ol key={`ol-${elements.length}`} className="my-5 space-y-2.5 pl-1">
          {orderedBuffer}
        </ol>
      );
      orderedBuffer = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const header = tableRows[0];
    const body = tableRows.slice(1);
    elements.push(
      <div key={`table-${elements.length}`} className="overflow-x-auto my-8 rounded-xl border border-border/60">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "hsl(var(--secondary) / 0.5)" }}>
              {header.map((cell, i) => (
                <th key={i} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider border-b border-border text-muted-foreground">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-b border-border/30 last:border-b-0 hover:bg-secondary/20 transition-colors">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-5 py-3.5 text-[0.9rem] text-muted-foreground" style={{ lineHeight: 1.7 }}>
                    {cell}
                  </td>
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

    // Table rows
    if (line.startsWith("|")) {
      flushList();
      flushOrdered();
      const cells = line.split("|").filter(Boolean).map(c => c.trim());
      if (cells.every(c => /^[-:]+$/.test(c))) continue;
      tableRows.push(cells);
      inTable = true;
      continue;
    }
    if (inTable) flushTable();

    /* H2 — section heading with generous whitespace */
    if (line.startsWith("## ")) {
      flushList();
      flushOrdered();
      elements.push(
        <h2
          key={i}
          className="flex items-center gap-3 text-foreground font-bold"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.35rem",
            lineHeight: 1.35,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            letterSpacing: "-0.01em",
          }}
        >
          <span
            className="inline-block w-1 rounded-full bg-primary flex-shrink-0"
            style={{ height: "1.4em" }}
          />
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    /* H3 — sub-heading */
    if (line.startsWith("### ")) {
      flushList();
      flushOrdered();
      elements.push(
        <h3
          key={i}
          className="text-foreground font-semibold"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.1rem",
            lineHeight: 1.4,
            marginTop: "1.75rem",
            marginBottom: "0.75rem",
          }}
        >
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    /* Blockquote */
    if (line.startsWith("> ")) {
      flushList();
      flushOrdered();
      elements.push(
        <blockquote
          key={i}
          className="my-6 rounded-lg border-l-[3px] border-primary/50 py-3 px-5"
          style={{ background: "hsl(var(--primary) / 0.05)" }}
        >
          <p className="text-[0.925rem] text-muted-foreground italic" style={{ lineHeight: 1.75 }}>
            {renderInline(line.slice(2))}
          </p>
        </blockquote>
      );
      continue;
    }

    /* Unordered list — buffer items */
    if (line.startsWith("- ")) {
      flushOrdered();
      listBuffer.push(
        <li key={i} className="flex gap-3 text-[0.925rem] text-muted-foreground list-none" style={{ lineHeight: 1.75 }}>
          <span className="text-primary mt-[0.55rem] text-[7px] flex-shrink-0">●</span>
          <span>{renderInline(line.slice(2))}</span>
        </li>
      );
      continue;
    }

    /* Ordered list — buffer items */
    const numMatch = line.match(/^(\d+)\.\s(.+)/);
    if (numMatch) {
      flushList();
      orderedBuffer.push(
        <li key={i} className="flex gap-3 text-[0.925rem] text-muted-foreground list-none" style={{ lineHeight: 1.75 }}>
          <span className="font-bold text-primary min-w-[1.5rem] text-right flex-shrink-0 tabular-nums">
            {numMatch[1]}.
          </span>
          <span>{renderInline(numMatch[2])}</span>
        </li>
      );
      continue;
    }

    flushList();
    flushOrdered();

    if (line.trim() === "") continue;

    /* Paragraph — optimized for reading */
    elements.push(
      <p
        key={i}
        className="text-muted-foreground"
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.85,
          marginBottom: "1.25rem",
          letterSpacing: "0.005em",
          wordSpacing: "0.03em",
          textWrap: "pretty" as any,
          hyphens: "auto",
        }}
      >
        {renderInline(line)}
      </p>
    );
  }

  flushList();
  flushOrdered();
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

      <article
        className="w-full mx-auto pt-8 pb-16"
        style={{
          maxWidth: "720px",
          paddingLeft: "clamp(1.25rem, 5vw, 2.5rem)",
          paddingRight: "clamp(1.25rem, 5vw, 2.5rem)",
        }}
      >

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {lang === "ru" ? "Все статьи" : "All articles"}
          </Link>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-wrap items-center gap-3 mb-5"
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
          className="text-foreground font-bold leading-tight mb-4"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
          }}
        >
          {post.title}
        </motion.h1>

        {/* Lead / description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-muted-foreground mb-8"
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {post.description}
        </motion.p>

        {/* Gradient separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px mb-10 origin-left rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.05))" }}
        />

        {/* Content — magazine reading column */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="blog-content"
        >
          <RenderContent content={post.content} />
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 rounded-2xl border border-primary/20 p-6 md:p-8 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02))" }}
        >
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
        <div className="mt-10">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {lang === "ru" ? "Все статьи" : "All articles"}
          </Link>
        </div>
      </article>
    </div>
  );
}
