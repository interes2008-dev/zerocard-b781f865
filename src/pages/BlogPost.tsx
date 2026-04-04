import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { BlogHeader } from "./Blog";
import { ArrowLeft, ArrowRight, Calendar, Loader2 } from "lucide-react";
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

/* ── Inline renderer (bold) ── */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-foreground">{part.slice(2, -2)}</strong>;
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
      <div key={`table-${elements.length}`} className="overflow-x-auto my-5 rounded-lg border border-border">
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="bg-secondary">
              {header.map((cell, i) => (
                <th key={i} className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide border-b border-border text-muted-foreground">{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-b border-border last:border-b-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5 text-sm text-muted-foreground">{cell}</td>
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

    /* Table rows */
    if (line.startsWith("|")) {
      const cells = line.split("|").filter(Boolean).map(c => c.trim());
      if (cells.every(c => /^[-:]+$/.test(c))) continue;
      tableRows.push(cells);
      inTable = true;
      continue;
    }
    if (inTable) flushTable();

    /* H2 — fixed size, no hero scaling */
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-lg font-bold mt-8 mb-3 text-foreground"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", lineHeight: 1.4 }}
        >
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    /* Unordered list */
    if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-5 mb-1 text-sm text-muted-foreground" style={{ lineHeight: 1.7 }}>
          {renderInline(line.slice(2))}
        </li>
      );
      continue;
    }

    /* Ordered list */
    const numMatch = line.match(/^(\d+)\.\s(.+)/);
    if (numMatch) {
      elements.push(
        <div key={i} className="flex gap-2.5 mb-1.5 text-sm text-muted-foreground" style={{ lineHeight: 1.7 }}>
          <span className="font-bold text-primary min-w-[1.25rem]">{numMatch[1]}.</span>
          <span>{renderInline(numMatch[2])}</span>
        </div>
      );
      continue;
    }

    /* Empty line */
    if (line.trim() === "") continue;

    /* Paragraph — fixed size */
    elements.push(
      <p key={i} className="mb-3.5 text-sm text-muted-foreground" style={{ lineHeight: 1.75 }}>
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

  /* Loading */
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

      {/* ── Unified article template ── */}
      <article className="w-full max-w-[900px] mx-auto px-5 md:px-8 pt-8 pb-16">

        {/* Meta row: category + date */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
            {CATEGORY_LABELS[post.category]?.[lang] || post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.published_at).toLocaleDateString(
              postLang === "ru" ? "ru-RU" : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </span>
        </div>

        {/* Title — compact, fixed size, no hero */}
        <h1
          className="text-xl md:text-2xl font-bold leading-snug mb-2 text-foreground"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.35rem, 2vw, 1.75rem)" }}
        >
          {post.title}
        </h1>

        {/* Intro / description */}
        <p className="text-sm text-muted-foreground mb-6" style={{ lineHeight: 1.6 }}>
          {post.description}
        </p>

        {/* Separator */}
        <div className="border-t border-border mb-6" />

        {/* Content sections */}
        <div className="blog-content">
          <RenderContent content={post.content} />
        </div>

        {/* ── CTA block ── */}
        <div className="mt-10 rounded-xl border border-primary/20 p-6 md:p-8 text-center bg-primary/5">
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
            className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
          >
            {postLang === "ru" ? "Оформить ZeroCard" : "Get ZeroCard"} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {lang === "ru" ? "Все статьи" : "All articles"}
          </Link>
        </div>
      </article>
    </div>
  );
}
