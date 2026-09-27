import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useI18n, langHref, type Lang } from "@/lib/i18n";
import { BlogHeader, CATEGORY_LABELS } from "./Blog";
import { ArrowLeft, ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getSeededPost } from "@/lib/blogSeed";
import { useHeadMeta } from "@/lib/headMeta";
import { resolveSources, SOURCES_HEADING, UPDATED_LABEL } from "@/lib/sources";
import { getStaticPost, STATIC_POSTS } from "@/lib/staticPosts";

const signupUrl = (lang: string) => `https://www.pionex.com/${lang === "ru" ? "ru" : "en"}/signUp?r=0uHzysLVYQh`;



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
  const m: Record<string, string> = { ru: `${min} мин чтения`, de: `${min} Min. Lesezeit`, es: `${min} min de lectura`, pt: `${min} min de leitura`, it: `${min} min di lettura`, fr: `${min} min de lecture` };
  return m[lang] ?? `${min} min read`;
}

/* ── Inline renderer (bold + links) ── */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const cls = "text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary";
      if (href.startsWith("/")) return <Link key={i} to={href} className={cls}>{label}</Link>;
      const sponsored = href.includes("pionex.com") && href.includes("r=");
      return (
        <a key={i} href={href} target="_blank" rel={sponsored ? "sponsored noopener" : "noopener noreferrer"} className={cls}>
          {label}
        </a>
      );
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
                  {renderInline(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-b border-border/30 last:border-b-0 hover:bg-secondary/20 transition-colors">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-5 py-3.5 text-[0.9rem] text-muted-foreground" style={{ lineHeight: 1.7 }}>
                    {renderInline(cell)}
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
      const cells = line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim());
      if (cells.every(c => /^[-:]+$/.test(c))) continue;
      tableRows.push(cells);
      inTable = true;
      continue;
    }
    if (inTable) flushTable();

    /* H4 - minor sub-heading */
    if (line.startsWith("#### ")) {
      flushList();
      flushOrdered();
      elements.push(
        <h4
          key={i}
          className="text-foreground font-semibold"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.4,
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          {renderInline(line.slice(5))}
        </h4>
      );
      continue;
    }

    /* H3 - sub-heading */
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
          {renderInline(line.slice(4))}
        </h3>
      );
      continue;
    }

    /* H2 - section heading with generous whitespace */
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
          {renderInline(line.slice(3))}
        </h2>
      );
      continue;
    }

    /* H3 - sub-heading */
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
          {renderInline(line.slice(4))}
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

    /* Unordered list - buffer items */
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

    /* Ordered list - buffer items */
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

    /* Paragraph - optimized for reading */
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

/* ── CTA for EU readers: MiCA means the regulated route is Webot EU, not pionex.com ── */
const EU_CTA: Record<string, { title: string; text: string; btn: string }> = {
  de: { title: "Du wohnst in der EU?", text: "Seit Juli 2026 ist der regulierte Weg zu den Pionex-Bots Webot EU, zugelassen nach MiCA durch die irische Zentralbank. In der Schweiz bleibt pionex.com verfügbar.", btn: "Webot EU ansehen" },
  es: { title: "¿Vives en la UE?", text: "Desde julio de 2026 la vía regulada hacia los bots de Pionex es Webot EU, autorizada bajo MiCA por el Banco Central de Irlanda. En Latinoamérica pionex.com sigue disponible.", btn: "Ver Webot EU" },
  it: { title: "Vivi nell'UE?", text: "Da luglio 2026 la strada regolamentata verso i bot di Pionex è Webot EU, autorizzata MiCA dalla Banca Centrale d'Irlanda. In Svizzera pionex.com resta disponibile.", btn: "Vai a Webot EU" },
  fr: { title: "Vous résidez dans l'UE ?", text: "Depuis juillet 2026, la voie régulée vers les bots Pionex est Webot EU, agréée MiCA par la Banque centrale d'Irlande. En Suisse et en Afrique francophone, pionex.com reste accessible.", btn: "Voir Webot EU" },
  pt: { title: "Mora na UE?", text: "Desde julho de 2026 o caminho regulado para os bots da Pionex é a Webot EU, autorizada sob o MiCA pelo Banco Central da Irlanda.", btn: "Ver Webot EU" },
  en: { title: "Living in the EU?", text: "Since July 2026 the regulated route to Pionex's bots is Webot EU, authorised under MiCA by the Central Bank of Ireland.", btn: "See Webot EU" },
};

/* ── Related articles: same language, same category first ── */
function RelatedPosts({ current }: { current: BlogPostData }) {
  const pool = STATIC_POSTS.filter((p) => p.lang === current.lang && p.slug !== current.slug);
  if (pool.length === 0) return null;
  const picks = [
    ...pool.filter((p) => p.category === current.category),
    ...pool.filter((p) => p.category !== current.category),
  ].slice(0, 3);
  const heading = ({ ru: "Читайте также", de: "Weiterlesen", es: "Sigue leyendo", pt: "Leia também", it: "Continua a leggere", fr: "À lire aussi" } as Record<string, string>)[current.lang] ?? "Keep reading";
  return (
    <nav className="mt-12" aria-label={heading}>
      <h2 className="text-foreground font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.15rem" }}>{heading}</h2>
      <ul className="grid gap-3 list-none p-0">
        {picks.map((p) => (
          <li key={p.id}>
            <Link
              to={langHref(p.lang as Lang, `/blog/${p.slug}`)}
              className="block rounded-xl border border-border bg-card px-5 py-4 no-underline hover:border-primary/60 transition-colors"
            >
              <span className="block text-foreground font-semibold text-[0.95rem] mb-1">{p.title}</span>
              <span className="block text-muted-foreground text-sm line-clamp-2">{p.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── Blog Post Page ── */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useI18n();
  const seeded = getSeededPost(slug) ?? getStaticPost(slug, lang) ?? null;
  const [post, setPost] = useState<BlogPostData | null>(seeded ?? null);
  const [loading, setLoading] = useState(!seeded);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }
    const local = getStaticPost(slug, lang);
    if (local) { setPost(local); setNotFound(false); setLoading(false); window.scrollTo(0, 0); return; }
    const fetchPost = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (data) setPost(data);
      else setNotFound(true);
      setLoading(false);
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug, lang]);


  const OG_LOCALES: Record<string, string> = { ru: "ru_RU", de: "de_DE", es: "es_ES", pt: "pt_BR", it: "it_IT", fr: "fr_FR", en: "en_US" };
  useHeadMeta({
    title: post?.title ?? "ZeroCard",
    description: post?.description ?? "",
    canonical: `https://zerocard.pro${langHref(lang, post ? `/blog/${post.slug}` : "/blog")}`,
    ogType: "article",
    locale: OG_LOCALES[post?.lang ?? lang] ?? "en_US",
  });

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

  if (notFound || !post) return <Navigate to={langHref(lang, "/blog")} replace />;

  // An article always belongs to one language. If it is opened under a different
  // language prefix (deep link, fallback route, old URL), send the reader to the
  // correct address instead of showing foreign-language text in this shell.
  if (post.lang && post.lang !== lang) {
    return <Navigate to={langHref(post.lang as Lang, `/blog/${post.slug}`)} replace />;
  }

  const postLang = post.lang as Lang;
  const isEu = (post as { audience?: string | null }).audience === "eu";
  const sources = resolveSources((post as { sources?: string | null }).sources);
  const updatedAt = (post as { updated_at?: string }).updated_at ?? post.published_at;
  const dateLocale = ({ ru: "ru-RU", de: "de-DE", es: "es-ES", pt: "pt-BR", it: "it-IT", fr: "fr-FR" } as Record<string, string>)[postLang] ?? "en-US";
  const euCta = EU_CTA[postLang] ?? EU_CTA.en;

  const canonical = langHref(lang, `/blog/${post.slug}`);
  const fullUrl = `https://zerocard.pro${canonical}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          image: "https://zerocard.pro/og-image.png",
          url: fullUrl,
          datePublished: post.published_at,
          dateModified: updatedAt,
          ...(sources.length ? { citation: sources.map((x) => ({ "@type": "CreativeWork", name: x.title, url: x.url })) } : {}),
          isAccessibleForFree: true,
          inLanguage: postLang,
          mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
          author: { "@type": "Organization", "@id": "https://zerocard.pro/#organization", name: "ZeroCard", url: "https://zerocard.pro" },
          isPartOf: { "@type": "WebSite", "@id": "https://zerocard.pro/#website", name: "ZeroCard", url: "https://zerocard.pro" },
          publisher: {
            "@type": "Organization",
            name: "ZeroCard",
            url: "https://zerocard.pro",
            logo: { "@type": "ImageObject", url: "https://zerocard.pro/favicon.png" },
          },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ZeroCard", item: "https://zerocard.pro/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: `https://zerocard.pro${langHref(lang, "/blog")}` },
            { "@type": "ListItem", position: 3, name: post.title, item: fullUrl },
          ],
        })}</script>
      </Helmet>
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
        <div className="mb-8"
        >
          <Link to={langHref(lang, "/blog")} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {({ ru: "Все статьи", de: "Alle Artikel", es: "Todos los artículos", pt: "Todos os artigos", it: "Tutti gli articoli", fr: "Tous les articles" } as Record<string, string>)[lang] ?? "All articles"}
          </Link>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-5"
        >
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {CATEGORY_LABELS[post.category]?.[lang] || post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.published_at).toLocaleDateString(
              ({ ru: "ru-RU", de: "de-DE", es: "es-ES", pt: "pt-BR", it: "it-IT", fr: "fr-FR" } as Record<string, string>)[postLang] ?? "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {estimateReadTime(post.content, postLang)}
          </span>
          <span className="text-xs text-muted-foreground">
              {UPDATED_LABEL[postLang] ?? UPDATED_LABEL.en}:{" "}
              <time dateTime={updatedAt.slice(0, 10)}>
                {new Date(updatedAt).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
              </time>
            </span>
        </div>

        {/* Title */}
        <h1 className="text-foreground font-bold leading-tight mb-4"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
          }}
        >
          {post.title}
        </h1>

        {/* Lead / description */}
        <p className="text-muted-foreground mb-8"
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {post.description}
        </p>

        {/* Gradient separator */}
        <div className="h-px mb-10 origin-left rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.05))" }}
        />

        {/* Content - magazine reading column */}
        <div className="blog-content"
        >
          <RenderContent content={post.content} />
        </div>

        {sources.length > 0 && (
          <section className="mt-10 rounded-xl border border-border/60 px-5 py-4" aria-label={SOURCES_HEADING[postLang] ?? "Sources"}>
            <h2 className="text-foreground font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem" }}>
              {SOURCES_HEADING[postLang] ?? "Sources"}
            </h2>
            <ol className="list-decimal pl-5 space-y-1.5">
              {sources.map((x) => (
                <li key={x.url} className="text-sm text-muted-foreground">
                  <a href={x.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary underline underline-offset-2 decoration-border">{x.title}</a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* CTA block */}
        {isEu ? (
          <div className="mt-14 rounded-2xl border border-primary/20 p-6 md:p-8 text-center" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02))" }}>
            <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{euCta.title}</h3>
            <p className="mb-5 text-sm text-muted-foreground" style={{ maxWidth: 560, margin: "0 auto 1.25rem" }}>{euCta.text}</p>
            <a href="https://www.webot.com/eu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-all">
              {euCta.btn} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
        <div className="mt-14 rounded-2xl border border-primary/20 p-6 md:p-8 text-center relative overflow-hidden"
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
              {postLang === "ru" ? "Откройте счёт на Pionex" : postLang === "es" ? "Abre tu cuenta en Pionex" : postLang === "pt" ? "Abra sua conta na Pionex" : postLang === "de" ? "Konto bei Pionex eröffnen" : postLang === "it" ? "Apri il tuo conto su Pionex" : postLang === "fr" ? "Ouvrez votre compte Pionex" : "Open your Pionex account"}
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">
              {postLang === "ru" ? "Торговые боты без подписки, комиссия 0,05%, карта с кэшбэком до 1% и 5% годовых на остаток USDT" : postLang === "es" ? "Bots de trading sin suscripción, comisión del 0,05%, tarjeta con hasta 1% de reembolso y 5% anual sobre el saldo en USDT" : postLang === "pt" ? "Bots de trading sem assinatura, taxa de 0,05%, cartão com até 1% de cashback e 5% ao ano sobre o saldo em USDT" : postLang === "de" ? "Trading-Bots ohne Abo, 0,05% Gebühr, Karte mit bis zu 1% Cashback und 5% Zinsen auf USDT-Guthaben" : postLang === "it" ? "Bot di trading senza abbonamento, commissione dello 0,05%, carta con fino all'1% di cashback e 5% annuo sul saldo in USDT" : postLang === "fr" ? "Bots de trading sans abonnement, frais de 0,05 %, carte avec jusqu'à 1 % de cashback et 5 % par an sur le solde en USDT" : "Trading bots with no subscription, 0.05% fees, a card with up to 1% cashback and 5% APR on your USDT balance"}
            </p>
            <a
              href={signupUrl(postLang)}
              target="_blank"
              rel="sponsored noopener"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ boxShadow: "0 4px 16px hsl(var(--primary) / 0.3)" }}
            >
              {postLang === "ru" ? "Зарегистрироваться" : postLang === "es" ? "Registrarse" : postLang === "pt" ? "Cadastrar" : postLang === "de" ? "Registrieren" : postLang === "it" ? "Registrati" : postLang === "fr" ? "S'inscrire" : "Sign up"} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        )}

        <RelatedPosts current={post} />

        {/* Back link - bottom */}
        <div className="mt-10">
          <Link to={langHref(lang, "/blog")} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> {({ ru: "Все статьи", de: "Alle Artikel", es: "Todos los artículos", pt: "Todos os artigos", it: "Tutti gli articoli", fr: "Tous les articles" } as Record<string, string>)[lang] ?? "All articles"}
          </Link>
        </div>
      </article>
    </div>
  );
}
