import { useEffect } from "react";
import { Link } from "react-router-dom";
import { posts } from "@/data/posts";
import { ArrowRight, Calendar } from "lucide-react";

export default function Blog() {
  useEffect(() => {
    document.title = "Блог | ZeroCard — криптокарта с кэшбэком";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Статьи о криптокартах, USDT и финансах. Полезные гайды от ZeroCard.");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-[20px] border-b" style={{ background: "rgba(2,13,31,0.92)", borderColor: "var(--border-custom)" }}>
        <div className="max-w-[1160px] mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 no-underline" style={{ color: "var(--text)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "var(--accent-color)" }}>💳</div>
            <span className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Zero<span style={{ color: "var(--accent-color)" }}>Card</span></span>
          </Link>
          <Link to="/" className="text-sm font-medium no-underline transition-colors" style={{ color: "var(--text2)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; }}>
            ← На главную
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[900px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Блог
        </h1>
        <p className="text-lg mb-12" style={{ color: "var(--text2)" }}>
          Статьи о криптокартах, USDT и финансах
        </p>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block rounded-2xl border p-6 md:p-8 no-underline transition-all duration-300"
              style={{
                background: "var(--bg2)",
                borderColor: "var(--border-custom)",
                color: "var(--text)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--accent-color)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border-custom)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-center gap-2 mb-3 text-sm" style={{ color: "var(--text3)" }}>
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {post.title}
              </h2>
              <p className="mb-4" style={{ color: "var(--text2)", lineHeight: 1.6 }}>
                {post.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3" style={{ color: "var(--accent-color)" }}>
                Читать <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
