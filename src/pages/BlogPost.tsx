import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getPostBySlug } from "@/data/posts";
import { useI18n } from "@/lib/i18n";
import { BlogHeader } from "./Blog";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

const SIGNUP_URL = "https://www.pionex.com/ru/signUp?r=0uHzysLVYQh";

/* Simple markdown-ish renderer for our content */
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
      <div key={`table-${elements.length}`} className="overflow-x-auto my-6 rounded-xl border" style={{ borderColor: "var(--border-custom)" }}>
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--bg3)" }}>
              {header.map((cell, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold" style={{ borderBottom: "1px solid var(--border-custom)" }}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: "1px solid var(--border-custom)" }}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3">{cell}</td>
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

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl md:text-2xl font-bold mt-10 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-5 mb-1.5" style={{ color: "var(--text2)", lineHeight: 1.7 }}>
          {renderInline(line.slice(2))}
        </li>
      );
      continue;
    }

    const numMatch = line.match(/^(\d+)\.\s(.+)/);
    if (numMatch) {
      elements.push(
        <div key={i} className="flex gap-3 mb-2" style={{ color: "var(--text2)", lineHeight: 1.7 }}>
          <span className="font-bold" style={{ color: "var(--accent-color)" }}>{numMatch[1]}.</span>
          <span>{renderInline(numMatch[2])}</span>
        </div>
      );
      continue;
    }

    if (line.trim() === "") continue;

    elements.push(
      <p key={i} className="mb-4" style={{ color: "var(--text2)", lineHeight: 1.8 }}>
        {renderInline(line)}
      </p>
    );
  }

  if (inTable) flushTable();
  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color: "var(--text)" }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useI18n();
  const post = slug ? getPostBySlug(slug, lang) : undefined;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | ZeroCard`;
    window.scrollTo(0, 0);

    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta("name", "description", post.description);
    setMeta("property", "og:title", `${post.title} | ZeroCard`);
    setMeta("property", "og:description", post.description);
    setMeta("property", "og:type", "article");
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <BlogHeader />

      <article className="max-w-[720px] mx-auto px-5 md:px-10 py-12 md:py-20">
        <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: "var(--text3)" }}>
          <Calendar className="w-4 h-4" />
          {new Date(post.date).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
        </div>

        <h1 className="text-3xl md:text-[42px] font-bold leading-tight mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {post.title}
        </h1>

        <div className="blog-content">
          <RenderContent content={post.content} />
        </div>

        {/* CTA block */}
        <div className="mt-16 rounded-2xl border p-8 md:p-10 text-center" style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {lang === "ru" ? "Получить карту бесплатно" : "Get Your Card for Free"}
          </h3>
          <p className="mb-6" style={{ color: "var(--text2)" }}>
            {lang === "ru" ? "Криптокарта с 1% кэшбэком и 5% годовых на остаток" : "Crypto card with 1% cashback and 5% APR on balance"}
          </p>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
            style={{ padding: "14px 32px", fontSize: "16px", borderRadius: "12px" }}
          >
            {lang === "ru" ? "Оформить ZeroCard" : "Get ZeroCard"} <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium no-underline transition-colors" style={{ color: "var(--text2)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--accent-color)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; }}>
            <ArrowLeft className="w-4 h-4" /> {lang === "ru" ? "Все статьи" : "All articles"}
          </Link>
        </div>
      </article>
    </div>
  );
}
