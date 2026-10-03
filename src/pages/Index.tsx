import { useRef, useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useI18n, langHref } from "@/lib/i18n";
import { ArrowRight, Menu, X, Sun, Moon } from "lucide-react";
import { IconDefs, StepIcon, WalletIcon, type WalletIconName } from "@/components/BenefitIcons";
import { LangSwitcher } from "@/components/LangSwitcher";
import { CountryCheckSection, CalculatorSection, BenefitsCompact, AudienceCompact, toolsCopy } from "@/components/HomeTools";
import { Link } from "react-router-dom";
import { STATIC_POSTS } from "@/lib/staticPosts";



// Pionex UI locale: Russian for /, English for every other language version.
const signupUrlFor = (lang: string) => `https://www.pionex.com/${lang === "ru" ? "ru" : "en"}/signUp?r=0uHzysLVYQh`;
function useSignupUrl() {
  const { lang } = useI18n();
  return signupUrlFor(lang);
}
const DOCS_URL = "https://support.pionex.com/hc/en-us/sections/47904768884633-Pionex-Card";

// Official Pionex channels (verified from Pionex's own Telegram bio, Google Play
// listing and blog). These are Pionex's channels, labelled as such in the footer.
const PIONEX_SOCIALS = {
  telegram: "https://t.me/pionexen",
  x: "https://x.com/pionex_com",
  youtube: "https://www.youtube.com/channel/UCyrwYO_v1sFnZnEYk-NWYMw",
  discord: "https://discord.gg/F5x4kD2XYB",
  reddit: "https://www.reddit.com/r/Pionex/",
  facebook: "https://www.facebook.com/pionexglobal",
  email: "mailto:service@pionex.com",
};

/* ─── Lightweight reveal-on-scroll (no animation library) ─── */
function useInViewOnce<T extends HTMLElement>(margin = "-60px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, inView };
}

/* ─── Reusable accessible-tab keyboard handler ─── */
function handleTabKey<T extends { id: string }>(
  e: React.KeyboardEvent<HTMLButtonElement>,
  tabs: T[],
  activeId: string,
  setActive: (id: string) => void
) {
  const idx = tabs.findIndex((tb) => tb.id === activeId);
  let next = idx;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % tabs.length;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + tabs.length) % tabs.length;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = tabs.length - 1;
  else return;
  e.preventDefault();
  const nextId = tabs[next].id;
  setActive(nextId);
  e.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`[data-tab-id="${nextId}"]`)?.focus();
}

/* ─── Animated wrapper ─── */
function FadeIn({ children, className = "", delay = 0, ...rest }: { children: React.ReactNode; className?: string; delay?: number } & React.HTMLAttributes<HTMLDivElement>) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─── Scroll progress bar ─── */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement;
        const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
        el.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}

/* ─── Count-up number (animates first number found in string) ─── */
function CountUp({ value }: { value: string }) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>("-30px");
  const [txt, setTxt] = useState(value);
  useEffect(() => {
    if (!inView) return;
    const m = value.match(/(\d+(?:[.,]\d+)?)/);
    if (!m || m.index === undefined || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTxt(value);
      return;
    }
    const target = parseFloat(m[1].replace(",", "."));
    const dec = /[.,]/.test(m[1]) ? 1 : 0;
    const pre = value.slice(0, m.index);
    const post = value.slice(m.index + m[1].length);
    const t0 = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setTxt(pre + (target * e).toFixed(dec) + post);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{txt}</span>;
}

/* ─── Cursor spotlight on cards (Linear/Vercel style) ─── */
function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    let raf = 0;
    let ev: PointerEvent | null = null;
    const onMove = (e: PointerEvent) => {
      ev = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!ev) return;
        const cards = document.querySelectorAll<HTMLElement>(".glass-card, .review-card, .aud-pain, .pain-row");
        cards.forEach(card => {
          const r = card.getBoundingClientRect();
          if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
          card.style.setProperty("--mx", `${ev!.clientX - r.left}px`);
          card.style.setProperty("--my", `${ev!.clientY - r.top}px`);
        });
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => { document.removeEventListener("pointermove", onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);
}

/* ─── Theme toggle hook ─── */
function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (document.documentElement.getAttribute("data-theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
}

/* ─── Language switcher (dropdown) ─── */

/* ═══════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════ */
function Navbar() {
  const SIGNUP_URL = useSignupUrl();
  const { t, lang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { label: t.navBenefits, href: "#benefits" },
    { label: t.navAudience, href: "#audience" },
    { label: t.navHow, href: "#how" },
    { label: toolsCopy(lang).calcBadge, href: "#calc" },
    { label: t.navFAQ, href: "#faq" },
    { label: lang === "ru" ? "Блог" : "Blog", href: langHref(lang, "/blog") },
  ];

  return (
    <nav className="sticky top-0 z-[100] backdrop-blur-[20px] border-b"
      style={{ background: theme === "dark" ? "rgba(2,13,31,0.92)" : "rgba(240,244,251,0.94)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[1160px] mx-auto px-5 md:px-10 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2.5 no-underline" style={{ color: "var(--text)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "var(--accent-color)" }}>💳</div>
          <span className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Zero<span style={{ color: "var(--accent-color)" }}>Card</span></span>
        </a>

        <div className="hidden md:flex gap-1 items-center">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium no-underline transition-all"
              style={{ color: "var(--text2)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "var(--bg3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.background = "transparent"; }}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          <LangSwitcher />
          <button onClick={toggle} className="theme-btn" aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener"
            className="btn-primary" style={{ padding: "8px 20px", fontSize: "14px", borderRadius: "10px" }}>
            {t.navGetCard}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LangSwitcher compact />
          <button onClick={toggle} className="theme-btn" style={{ width: 32, height: 32 }} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="w-9 h-9 flex items-center justify-center" style={{ color: "var(--text2)" }} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-5 pb-5 space-y-1">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 rounded-lg text-base font-medium no-underline"
              style={{ color: "var(--text2)" }}>
              {l.label}
            </a>
          ))}
          <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener"
            className="btn-primary block text-center mt-3" style={{ padding: "12px 20px" }}>
            {t.navGetCard}
          </a>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   HERO (with typewriter)
   ═══════════════════════════════════════════════════ */
// Set to true once public/img/hero-card.mp4 is in place.
const HERO_VIDEO = true;

function HeroSection() {
  const SIGNUP_URL = useSignupUrl();
  const { lang } = useI18n();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // The looping video only loads on wide screens with motion allowed and no data saver.
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const ok = window.matchMedia("(min-width: 1024px)").matches
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      && !nav.connection?.saveData;
    if (!ok || !HERO_VIDEO) return;
    const id = window.setTimeout(() => setShowVideo(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  const copies = {
    ru: {
    photoAlt: "Металлическая карта с оранжевой подсветкой",
    badge: "Pionex Card · Visa & Mastercard · кэшбэк до 1%",
    h1a: "USDT на балансе.", h1b: "Платите криптовалютой", h1accent: "за границей",
    sub: (<>Карта биржи <b>Pionex</b>, зарегистрированной в FinCEN (США). Пополняете её в USDT, добавляете в <b>Apple&nbsp;Pay</b> или <b>Google&nbsp;Pay</b> и платите за границей и в зарубежных онлайн-сервисах. В российских магазинах карта не работает: это ограничение Pionex, подробно <a href="/blog/pionex-card-v-rossii" className="underline underline-offset-2">в нашем разборе</a>.</>),
    cta1: "Выпустить карту бесплатно", cta2: "Как это работает",
    st1: "стран для оплаты", st2: "кэшбэк на каждую покупку", st3: "годовых на остаток USDT", st4: "выпуск и обслуживание",
    status: "Активирован", caption: "карта биржи pionex · регистрация msb в fincen (сша)",
    fc1a: "Apple Pay · Оплачено", fc1b: "Кофейня, Стамбул · $4.20",
    fc2a: "Кэшбэк начислен", fc2b: "+0.84 USDT за покупку",
    fc3a: "+5% годовых", fc3b: "на остаток, каждый час",
    trust: "Кошельки и сервисы, с которыми работает карта",
    },
    de: {
    photoAlt: "Metallkarte mit orangefarbener Kante",
    badge: "Pionex Card · Visa & Mastercard · bis zu 1% Cashback",
    h1a: "USDT im Wallet.", h1b: "Zahle mit Krypto", h1accent: "im Ausland und online",
    sub: (<>ZeroCard läuft über die Börse <b>Pionex</b>, bei FinCEN in den USA als MSB registriert. Du lädst die Karte mit USDT, hinterlegst sie in <b>Apple&nbsp;Pay</b> oder <b>Google&nbsp;Pay</b> und zahlst überall, wo Visa akzeptiert wird, außer bei Händlern aus den Ländern, die Pionex sperrt. Ohne Bankkonto und ohne Einkommensnachweis.</>),
    cta1: "Karte kostenlos holen", cta2: "So funktioniert's",
    st1: "Länder zum Bezahlen", st2: "Cashback bei jedem Einkauf", st3: "Zinsen aufs USDT-Guthaben", st4: "Ausgabe und Führung",
    status: "Aktiviert", caption: "über die börse pionex · msb-registrierung bei fincen (usa)",
    fc1a: "Apple Pay · Bezahlt", fc1b: "Café, Istanbul · $4.20",
    fc2a: "Cashback gutgeschrieben", fc2b: "+0.84 USDT für den Einkauf",
    fc3a: "+5% Zinsen", fc3b: "aufs Guthaben, stündlich",
    trust: "Die Karte läuft dort, wo du längst bezahlst",
    },
    en: {
    photoAlt: "Metal card with an orange glowing edge",
    badge: "Pionex Card · Visa & Mastercard · up to 1% cashback",
    h1a: "USDT in your wallet.", h1b: "Pay with crypto", h1accent: "abroad and online",
    sub: (<>ZeroCard runs on <b>Pionex</b>, an exchange registered with FinCEN in the US as an MSB. Top up with USDT, add the card to <b>Apple&nbsp;Pay</b> or <b>Google&nbsp;Pay</b> and spend wherever Visa works, except at merchants from the countries Pionex restricts. No bank account and no income checks.</>),
    cta1: "Get your free card", cta2: "How it works",
    st1: "countries to spend in", st2: "cashback on every purchase", st3: "APR on your USDT balance", st4: "issue and maintenance fees",
    status: "Activated", caption: "powered by pionex exchange · fincen msb registered (us)",
    fc1a: "Apple Pay · Paid", fc1b: "Coffee shop, Istanbul · $4.20",
    fc2a: "Cashback earned", fc2b: "+0.84 USDT on purchase",
    fc3a: "+5% APR", fc3b: "on balance, paid hourly",
    trust: "Works everywhere you already pay",
    },
    es: {
    photoAlt: "Tarjeta metálica con borde naranja",
    badge: "Pionex Card · Visa & Mastercard · hasta 1% de reembolso",
    h1a: "USDT en tu saldo.", h1b: "Paga con cripto", h1accent: "en el extranjero",
    sub: (<>ZeroCard funciona con el exchange <b>Pionex</b>, registrado como MSB ante FinCEN en EE.UU. Recargas la tarjeta en USDT, la añades a <b>Apple&nbsp;Pay</b> o <b>Google&nbsp;Pay</b> y pagas donde acepten Visa, salvo en comercios de los países que Pionex restringe. Sin banco y sin justificar ingresos.</>),
    cta1: "Consigue tu tarjeta gratis", cta2: "Cómo funciona",
    st1: "países donde pagar", st2: "de reembolso en cada compra", st3: "anual sobre el saldo en USDT", st4: "emisión y mantenimiento",
    status: "Activada", caption: "a través del exchange pionex · registro msb en fincen (ee.uu.)",
    fc1a: "Apple Pay · Pagado", fc1b: "Cafetería, Estambul · $4.20",
    fc2a: "Reembolso acreditado", fc2b: "+0.84 USDT por la compra",
    fc3a: "+5% anual", fc3b: "sobre el saldo, cada hora",
    trust: "La tarjeta funciona donde ya pagas",
    },
    pt: {
    photoAlt: "Cartão de metal com borda laranja",
    badge: "Pionex Card · Visa & Mastercard · até 1% de cashback",
    h1a: "USDT no saldo.", h1b: "Pague com cripto", h1accent: "no exterior",
    sub: (<>O ZeroCard funciona com a corretora <b>Pionex</b>, registrada como MSB na FinCEN dos EUA. Você recarrega o cartão em USDT, adiciona ao <b>Apple&nbsp;Pay</b> ou <b>Google&nbsp;Pay</b> e paga onde aceitam Visa, exceto em estabelecimentos dos países que a Pionex restringe. Sem banco e sem comprovar renda.</>),
    cta1: "Pegue seu cartão grátis", cta2: "Como funciona",
    st1: "países para pagar", st2: "de cashback em cada compra", st3: "ao ano sobre o saldo em USDT", st4: "emissão e manutenção",
    status: "Ativado", caption: "pela corretora pionex · registro msb na fincen (eua)",
    fc1a: "Apple Pay · Pago", fc1b: "Cafeteria, Istambul · $4.20",
    fc2a: "Cashback creditado", fc2b: "+0.84 USDT pela compra",
    fc3a: "+5% ao ano", fc3b: "sobre o saldo, a cada hora",
    trust: "O cartão funciona onde você já paga",
    },
    it: {
    photoAlt: "Carta in metallo con bordo arancione",
    badge: "Pionex Card · Visa & Mastercard · fino all'1% di cashback",
    h1a: "USDT sul saldo.", h1b: "Paga in crypto", h1accent: "all'estero",
    sub: (<>ZeroCard funziona con l'exchange <b>Pionex</b>, registrato come MSB presso FinCEN negli Stati Uniti. Ricarichi la carta in USDT, la aggiungi ad <b>Apple&nbsp;Pay</b> o <b>Google&nbsp;Pay</b> e paghi dove accettano Visa, tranne che presso esercenti dei paesi che Pionex limita. Senza banca e senza prove di reddito.</>),
    cta1: "Ottieni la carta gratis", cta2: "Come funziona",
    st1: "paesi dove pagare", st2: "di cashback su ogni acquisto", st3: "annuo sul saldo in USDT", st4: "emissione e gestione",
    status: "Attivata", caption: "tramite l'exchange pionex · registrazione msb fincen (usa)",
    fc1a: "Apple Pay · Pagato", fc1b: "Caffè, Istanbul · $4.20",
    fc2a: "Cashback accreditato", fc2b: "+0.84 USDT per l'acquisto",
    fc3a: "+5% annuo", fc3b: "sul saldo, ogni ora",
    trust: "La carta funziona dove paghi già",
    },
    fr: {
    photoAlt: "Carte en métal au bord orange",
    badge: "Pionex Card · Visa & Mastercard · jusqu'à 1 % de cashback",
    h1a: "USDT sur le solde.", h1b: "Payez en crypto", h1accent: "à l'étranger",
    sub: (<>ZeroCard fonctionne avec l'exchange <b>Pionex</b>, enregistré comme MSB auprès du FinCEN aux États-Unis. Vous rechargez la carte en USDT, vous l'ajoutez à <b>Apple&nbsp;Pay</b> ou <b>Google&nbsp;Pay</b> et vous payez là où Visa est acceptée, sauf chez les marchands des pays que Pionex restreint. Sans banque ni justificatif de revenus.</>),
    cta1: "Obtenez votre carte gratuite", cta2: "Comment ça marche",
    st1: "pays où payer", st2: "de cashback sur chaque achat", st3: "par an sur le solde en USDT", st4: "émission et gestion",
    status: "Activée", caption: "via l'exchange pionex · enregistrement msb fincen (états-unis)",
    fc1a: "Apple Pay · Payé", fc1b: "Café, Istanbul · $4.20",
    fc2a: "Cashback crédité", fc2b: "+0.84 USDT pour l'achat",
    fc3a: "+5% par an", fc3b: "sur le solde, chaque heure",
    trust: "La carte fonctionne là où vous payez déjà",
    },
  };
  const c = copies[lang] ?? copies.en;

  const pills = [
    { em: "🍎", label: "Apple Pay" }, { em: "🤖", label: "Google Pay" },
    { em: "🅿️", label: "PayPal" }, { em: "💳", label: "Visa" },
    { em: "🔴", label: "Mastercard" }, { em: "✈️", label: "Trip.com" },
    { em: "💬", label: "LINE Pay" }, { em: "💚", label: "WeChat Pay" },
    { em: "🛍️", label: "Alipay" }, { em: "📱", label: "Samsung Pay" },
  ];

  return (
    <section className="hero-v2">
      <div className="hero-v2-inner">
        {/* LEFT COLUMN */}
        <div>
          <FadeIn>
            <div className="h-badge"><span className="dot" /><span>{c.badge}</span></div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className={lang === "en" ? undefined : `h1-${lang}`}>
              <span className="thin">{c.h1a}</span><br />
              {c.h1b} <span className="accent">{c.h1accent}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="h-sub">{c.sub}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="h-cta-row">
              <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener" className="h-btn h-btn-primary">
                <span>{c.cta1}</span><span className="arr">→</span>
              </a>
              <a href="#how" className="h-btn h-btn-ghost">{c.cta2}</a>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="h-stats">
              <div className="h-stat"><div className="num"><CountUp value="200" /><em>+</em></div><div className="lbl">{c.st1}</div></div>
              <div className="h-stat"><div className="num"><em><CountUp value="1%" /></em></div><div className="lbl">{c.st2}</div></div>
              <div className="h-stat"><div className="num"><em><CountUp value="5%" /></em></div><div className="lbl">{c.st3}</div></div>
              <div className="h-stat"><div className="num">$0</div><div className="lbl">{c.st4}</div></div>
            </div>
          </FadeIn>
        </div>

        {/* RIGHT COLUMN: PIONEX-STYLE CARD */}
        <div className="card-stage" ref={stageRef}>
          <div className="hero-photo" ref={cardRef}>
            <picture>
              <source media="(max-width: 767px)" srcSet="/img/hero-card-720.webp" />
              <img src="/img/hero-card.webp" width={960} height={720} alt={c.photoAlt} fetchPriority="high" decoding="async" />
            </picture>
            {showVideo && (
              <video className="hero-photo__video" poster="/img/hero-card.webp"
                autoPlay muted loop playsInline preload="auto" aria-hidden="true"
                onPlaying={(e) => e.currentTarget.classList.add("is-on")}>
                <source src="/img/hero-card.webm" type="video/webm" />
                <source src="/img/hero-card.mp4" type="video/mp4" />
              </video>
            )}
          </div>

          <div className="float-chip fc-1">
            <div className="ic">✓</div>
            <div><span>{c.fc1a}</span><small>{c.fc1b}</small></div>
          </div>
          <div className="float-chip fc-2">
            <div className="ic">%</div>
            <div><span>{c.fc2a}</span><small>{c.fc2b}</small></div>
          </div>
          <div className="float-chip fc-3">
            <div className="ic">↗</div>
            <div><span>{c.fc3a}</span><small>{c.fc3b}</small></div>
          </div>

          <div className="card-caption">{c.caption}</div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="trust">
        <div className="trust-label">{c.trust}</div>
        <div className="marquee">
          <div className="marquee-track">
            {[...pills, ...pills].map((p, i) => (
              <div key={i} className="logo-pill"><span className="em">{p.em}</span>{p.label}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}








function WalletCard({ icon, name, type, badge, badgeColor, steps, featured, checkmarks }: {
  icon: WalletIconName; name: string; type: string; steps: string[];
  badge?: string; badgeColor?: string; featured?: boolean; checkmarks?: boolean;
}) {
  return (
    <div className="glass-card glass-card-hover p-6"
      style={featured ? { background: "var(--accent-bg)", borderColor: "var(--accent-border)" } : {}}>
      <div className="flex justify-between items-center mb-5">
        <WalletIcon name={icon} />
        {badge && (
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
            style={{
              background: badgeColor === "blue" ? "var(--blue-bg)" : "var(--green-bg)",
              color: badgeColor === "blue" ? "var(--blue)" : "var(--green)",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-[17px] font-bold mb-1" style={featured ? { color: "var(--accent-color)", fontFamily: "'Space Grotesk', sans-serif" } : { fontFamily: "'Space Grotesk', sans-serif" }}>{name}</h3>
      <div className="text-xs mb-4" style={{ color: "var(--text3)" }}>{type}</div>
      <div className="flex flex-col gap-1.5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2.5 text-[13px] leading-[1.5]" style={{ color: "var(--text2)" }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold"
              style={{ background: "var(--accent-bg)", color: "var(--accent-color)" }}>
              {checkmarks ? "✓" : i + 1}
            </div>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS (with tabs)
   ═══════════════════════════════════════════════════ */
function HowItWorks() {
  const SIGNUP_URL = useSignupUrl();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("apply");

  const tabs = [
    { id: "apply", label: t.howTab1 },
    { id: "apple", label: t.howTab2 },
    { id: "google", label: t.howTab3 },
    { id: "paypal", label: t.howTab4 },
  ];

  const steps = [
    { num: "01", icon: "register" as const, title: t.step1Title, desc: t.step1Desc },
    { num: "02", icon: "verify" as const, title: t.step2Title, desc: t.step2Desc },
    { num: "03", icon: "apply" as const, title: t.step3Title, desc: t.step3Desc },
    { num: "04", icon: "topup" as const, title: t.step4Title, desc: t.step4Desc },
    { num: "05", icon: "spend" as const, title: t.step5Title, desc: t.step5Desc },
  ];

  return (
    <section id="how" className="py-24 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-head mb-2">
            <div className="section-badge">{t.howBadge}</div>
            <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.howTitle}</h2>
            <p className="text-[17px] leading-[1.7]" style={{ color: "var(--text2)" }}>{t.howDesc}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex gap-2 flex-wrap mt-12 mb-8" role="tablist" aria-label={t.howTitle.replace(/\n/g, " ")}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                role="tab" id={`howtab-${tab.id}`} data-tab-id={tab.id}
                aria-selected={activeTab === tab.id} aria-controls={`howpanel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onKeyDown={(e) => handleTabKey(e, tabs, activeTab, setActiveTab)}
                className={`how-tab ${activeTab === tab.id ? "active" : ""}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {activeTab === "apply" && (
          <FadeIn role="tabpanel" id="howpanel-apply" aria-labelledby="howtab-apply">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 relative">
              <div className="hidden lg:block absolute top-[27px] left-[10%] right-[10%] h-px" style={{ background: "var(--border-custom)" }} />
              {steps.map((s, i) => (
                <div key={i} className="text-center px-3">
                  <div className="relative w-[54px] mx-auto mb-5 z-[1]">
                    <StepIcon name={s.icon} />
                    <span className="step-num">{s.num}</span>
                  </div>
                  <div className="text-sm font-bold mb-2">{s.title}</div>
                  <div className="text-[13px] leading-[1.6]" style={{ color: "var(--text2)" }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {activeTab === "apple" && (
          <FadeIn role="tabpanel" id="howpanel-apple" aria-labelledby="howtab-apple">
            <div className="grid md:grid-cols-3 gap-4">
              <WalletCard icon="phoneTap" name={t.appleVisa} type={t.appleVisaType} badge={t.appleVisaRecommended} badgeColor="green"
                steps={[t.appleStep1, t.appleStep2, t.appleStep3, t.appleStep4, t.appleStep5]} />
              <WalletCard icon="cardAdd" name={t.appleMC} type={t.appleMCType} badge={t.appleMCAlt} badgeColor="blue"
                steps={[t.appleMCStep1, t.appleMCStep2, t.appleMCStep3, t.appleMCStep4, t.appleMCStep5]} />
              <WalletCard icon="devices" name={t.appleDevices} type={t.appleDevicesType} featured
                steps={[t.appleReq1, t.appleReq2, t.appleReq3, t.appleReq4, t.appleReq5]} checkmarks />
            </div>
          </FadeIn>
        )}

        {activeTab === "google" && (
          <FadeIn role="tabpanel" id="howpanel-google" aria-labelledby="howtab-google">
            <div className="grid md:grid-cols-3 gap-4">
              <WalletCard icon="nfcCard" name={t.gpTitle} type={t.gpType} badge={t.gpSupported} badgeColor="green"
                steps={[t.gpStep1, t.gpStep2, t.gpStep3, t.gpStep4, t.gpStep5]} />
              <WalletCard icon="checklist" name={t.gpReqTitle} type={t.gpReqType} featured
                steps={[t.gpReq1, t.gpReq2, t.gpReq3, t.gpReq4]} checkmarks />
              <WalletCard icon="tapHand" name={t.gpHowTitle} type={t.gpHowType}
                steps={[t.gpHow1, t.gpHow2, t.gpHow3, t.gpHow4]} />
            </div>
          </FadeIn>
        )}

        {activeTab === "paypal" && (
          <FadeIn role="tabpanel" id="howpanel-paypal" aria-labelledby="howtab-paypal">
            <div className="grid md:grid-cols-3 gap-4">
              <WalletCard icon="online" name={t.ppTitle} type={t.ppType} badge={t.ppSupported} badgeColor="green"
                steps={[t.ppStep1, t.ppStep2, t.ppStep3, t.ppStep4, t.ppStep5]} />
              <WalletCard icon="shopping" name={t.ppUsesTitle} type={t.ppUsesType} featured
                steps={[t.ppUse1, t.ppUse2, t.ppUse3, t.ppUse4, t.ppUse5]} checkmarks />
              <WalletCard icon="wallets" name={t.ppOtherTitle} type={t.ppOtherType}
                steps={[t.ppOther1, t.ppOther2, t.ppOther3, t.ppOther4, t.ppOther5]} />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.2}>
          <div className="text-center mt-14">
            <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener" className="btn-primary">{t.howCTA}</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* Wallet Card component */

/* ═══════════════════════════════════════════════════
   COMPARE TABLE
   ═══════════════════════════════════════════════════ */
/* ─── Comparison: status parsing so every cell renders consistently ─── */
type CmpStatus = "good" | "partial" | "bad" | "none";




/* ═══════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════
   GUIDES (links into the blog; only languages that have articles)
   ═══════════════════════════════════════════════════ */
const GUIDES_COPY: Record<string, { badge: string; title: string; desc: string; all: string }> = {
  ru: { badge: "📚 Гайды", title: "Прежде чем оформлять", desc: "Где карта работает, во что обходятся покупки и как устроены боты Pionex. Без рекламных обещаний.", all: "Все статьи" },
  en: { badge: "📚 Guides", title: "Before you sign up", desc: "Where the card works, what purchases really cost and how Pionex bots behave.", all: "All articles" },
  de: { badge: "📚 Ratgeber", title: "Bevor du dich anmeldest", desc: "Was MiCA für Pionex in Deutschland bedeutet, was die Steuerpläne ändern und wie Grid-Bots wirklich rechnen.", all: "Alle Artikel" },
  es: { badge: "📚 Guías", title: "Antes de registrarte", desc: "Cuánto cuesta pagar en pesos con la tarjeta, cómo funcionan los bots de Pionex y qué cambió en Europa con MiCA.", all: "Todos los artículos" },
  pt: { badge: "📚 Guias", title: "Antes de se cadastrar", desc: "As novas regras do Banco Central para stablecoins, quanto custa pagar em reais e como funcionam os bots da Pionex.", all: "Todos os artigos" },
  it: { badge: "📚 Guide", title: "Prima di iscriverti", desc: "Le tasse crypto al 33%, cosa cambia con MiCA per chi vive in Italia e come ragiona davvero un bot grid.", all: "Tutti gli articoli" },
  fr: { badge: "📚 Guides", title: "Avant de vous inscrire", desc: "Pourquoi Pionex est fermé en France, ce que coûte la carte en Afrique francophone et en Suisse, et comment raisonne un bot grid.", all: "Tous les articles" },
};

function GuidesSection() {
  const { lang } = useI18n();
  const posts = STATIC_POSTS.filter((p) => p.lang === lang).slice(0, 6);
  if (posts.length === 0) return null;
  const c = GUIDES_COPY[lang] ?? GUIDES_COPY.en;
  return (
    <section id="guides" className="py-24 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <div className="section-head mb-2">
          <div className="section-badge">{c.badge}</div>
          <h2 className="section-title mb-4">{c.title}</h2>
          <p className="text-[17px] leading-[1.7]" style={{ color: "var(--text2)" }}>{c.desc}</p>
        </div>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 list-none p-0">
          {posts.map((p) => (
            <li key={p.id}>
              <Link to={langHref(lang, `/blog/${p.slug}`)} className="guide-card">
                {p.image_url && (
                  <img src={p.image_url.replace(/\.webp$/, "-640.webp")} width={640} height={360} loading="lazy" decoding="async" alt="" className="guide-card__img" />
                )}
                <span className="guide-card__title">{p.title}</span>
                <span className="guide-card__desc">{p.description}</span>
                <span className="guide-card__more">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center mt-10">
          <Link to={langHref(lang, "/blog")} className="btn-secondary-custom">{c.all}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PROMO: Pionex AI-subscription campaign (set PROMO_AI_ENABLED = false when it ends)
   ═══════════════════════════════════════════════════ */
const PROMO_AI_ENABLED = true;
const PROMO_AI_URL: Record<string, string> = {
  ru: "https://www.pionex.com/ru/activities/galaxy/paycard-ai-lottery",
  en: "https://www.pionex.com/en/activities/galaxy/paycard-ai-lottery",
};
const PROMO_AI_COPY: Record<string, { badge: string; title: string; desc: string; services: string; note: string; cta: string; guide: string; guideSlug: string; rules: string }> = {
  ru: {
    badge: "🎁 Акция Pionex",
    title: "Оплачивайте AI-подписки картой Pionex и выигрывайте полный кэшбэк",
    desc: "Pionex возвращает всю сумму последнего платежа за AI-подписку, до 50 USDT за платёж. Каждая оплата AI-сервиса картой даёт попытку.",
    services: "ChatGPT · Claude · Cursor · Grok · Suno · ElevenLabs и другие AI-сервисы",
    note: "Сроки и правила определяет Pionex. ChatGPT и Claude официально недоступны в России и Беларуси.",
    cta: "Зарегистрироваться и участвовать",
    guide: "Как оплатить AI-подписку картой",
    guideSlug: "oplata-ai-podpisok-kartoj-pionex",
    rules: "Правила акции",
  },
  en: {
    badge: "🎁 Pionex campaign",
    title: "Pay for AI subscriptions with the Pionex Card and win a full refund",
    desc: "Pionex refunds your latest AI subscription payment in full, up to 50 USDT per payment. Every AI service paid with the card earns an attempt.",
    services: "ChatGPT · Claude · Cursor · Grok · Suno · ElevenLabs and other AI services",
    note: "Terms and dates are set by Pionex. Use AI services only from countries their providers support.",
    cta: "Sign up and take part",
    guide: "How to pay for AI with the card",
    guideSlug: "pay-ai-subscriptions-pionex-card",
    rules: "Campaign rules",
  },
};

function PromoAiSection() {
  const { lang } = useI18n();
  const SIGNUP_URL = useSignupUrl();
  const c = PROMO_AI_COPY[lang];
  if (!PROMO_AI_ENABLED || !c) return null;
  return (
    <section id="promo-ai" className="py-16 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <div className="promo-ai">
          <div className="promo-ai__body">
            <div className="section-badge" style={{ marginBottom: 14 }}>{c.badge}</div>
            <h2 className="promo-ai__title">{c.title}</h2>
            <p className="promo-ai__desc">{c.desc}</p>
            <p className="promo-ai__services">{c.services}</p>
            <div className="promo-ai__actions">
              <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener" className="btn-primary">{c.cta}</a>
              <Link to={langHref(lang, `/blog/${c.guideSlug}`)} className="btn-secondary-custom">{c.guide}</Link>
            </div>
            <p className="promo-ai__note">
              {c.note} <a href={PROMO_AI_URL[lang]} target="_blank" rel="noopener noreferrer">{c.rules} →</a>
            </p>
          </div>
          <div className="promo-ai__prize" aria-hidden="true">
            <span className="promo-ai__amount">50</span>
            <span className="promo-ai__unit">USDT</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { t } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A }, { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A }, { q: t.faq6Q, a: t.faq6A },
    { q: t.faq7Q, a: t.faq7A }, { q: t.faq8Q, a: t.faq8A },
    { q: t.faq9Q, a: t.faq9A },
    { q: t.faq10Q, a: t.faq10A },
    { q: t.faq11Q, a: t.faq11A },
  ].filter(f => f.q && f.a);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section id="faq" className="py-24 px-5 md:px-10 border-t"
        style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="section-head mb-2">
              <div className="section-badge">{t.faqBadge}</div>
              <h2 className="section-title" style={{ whiteSpace: "pre-line" }}>{t.faqTitle}</h2>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <div className={`faq-item ${openIdx === i ? "open" : ""}`}>
                  <button className="w-full px-6 py-[18px] flex justify-between items-center gap-4 text-left font-semibold text-[15px] transition-colors"
                    style={{ color: openIdx === i ? "var(--accent-color)" : "var(--text)" }}
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                    {faq.q}
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all"
                      style={{
                        background: openIdx === i ? "var(--accent-bg)" : "var(--bg3)",
                        border: `1px solid ${openIdx === i ? "var(--accent-border)" : "var(--border-custom)"}`,
                        color: openIdx === i ? "var(--accent-color)" : "var(--text3)",
                        transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}>
                      +
                    </span>
                  </button>
                  <div className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: openIdx === i ? 600 : 0, padding: openIdx === i ? "0 24px 20px" : "0 24px" }}>
                    <div className="text-sm leading-[1.7]" style={{ color: "var(--text2)", whiteSpace: "pre-line" }}>{faq.a}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════ */
function CTASection() {
  const SIGNUP_URL = useSignupUrl();
  const { t } = useI18n();
  return (
    <section className="py-24 px-5 md:px-10 text-center border-t"
      style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[700px] mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold mb-6"
            style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", color: "var(--accent-color)" }}>
            <span className="w-[7px] h-[7px] rounded-full" style={{ background: "var(--accent-color)", animation: "blink 2s infinite" }} />
            {t.ctaBadge}
          </div>
          <h2 className="section-title mb-4 mx-auto" style={{ whiteSpace: "pre-line", background: "linear-gradient(180deg, var(--text) 0%, var(--text) 55%, color-mix(in srgb, var(--text) 72%, transparent) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", textWrap: "balance" }}>{t.ctaTitle}</h2>
          <p className="text-[17px] leading-[1.7] mb-9 mx-auto" style={{ color: "var(--text2)", maxWidth: 560, textWrap: "pretty" }}>{t.ctaDesc}</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener" className="btn-primary">{t.ctaCTA}</a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary-custom">{t.ctaDocs}</a>
          </div>
          <p className="mt-5 text-xs" style={{ color: "var(--text3)" }}>{t.ctaDisclaimer}</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */
function FooterCol({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <div className="ftr-h">{title}</div>
      <ul className="flex flex-col gap-2.5">
        {links.map((l, i) => (
          <li key={i}>
            <a
              href={l.href}
              {...(l.external ? { target: "_blank", rel: l.href.includes("r=0uHzysLVYQh") ? "sponsored noopener" : "noopener noreferrer" } : {})}
              className="ftr-link"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const SIGNUP_URL = useSignupUrl();
  const { t, lang } = useI18n();

  const product = [
    { label: t.navBenefits, href: "#benefits" },
    { label: t.navHow, href: "#how" },
    { label: toolsCopy(lang).calcBadge, href: "#calc" },
    { label: t.navAudience, href: "#audience" },
    { label: t.navFAQ, href: "#faq" },
  ];
  const resources = [
    { label: lang === "ru" ? "Блог" : "Blog", href: langHref(lang, "/blog") },
    { label: "Pionex", href: "https://www.pionex.com/", external: true },
    { label: t.footSupport, href: DOCS_URL, external: true },
  ];
  const company = [
    { label: t.footAbout, href: langHref(lang, "/about") },
    { label: t.navGetCard.replace(" →", ""), href: SIGNUP_URL, external: true },
  ];

  const socials = [
    {
      label: "Telegram",
      href: PIONEX_SOCIALS.telegram,
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
          <path d="M21.9 4.3 18.7 19.4c-.24 1.06-.87 1.32-1.76.82l-4.86-3.58-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.95L18.1 5.4c.39-.35-.08-.54-.6-.2L6.36 12.4l-4.8-1.5c-1.04-.33-1.06-1.04.22-1.54L20.55 2.8c.87-.32 1.63.2 1.35 1.5Z" />
        </svg>
      ),
    },
    {
      label: "X",
      href: PIONEX_SOCIALS.x,
      icon: (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
          <path d="M18.9 2.5h3.3l-7.2 8.2 8.5 11.3h-6.7l-5.2-6.9-6 6.9H1.6l7.7-8.8L1.1 2.5h6.8l4.7 6.3 5.5-6.3Zm-1.2 17.8h1.8L6.9 4.3H5l12.7 16Z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: PIONEX_SOCIALS.youtube,
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M23 12s0-3.3-.42-4.9a2.5 2.5 0 0 0-1.75-1.75C19.2 5 12 5 12 5s-7.2 0-8.83.35A2.5 2.5 0 0 0 1.42 7.1C1 8.7 1 12 1 12s0 3.3.42 4.9a2.5 2.5 0 0 0 1.75 1.75C4.8 19 12 19 12 19s7.2 0 8.83-.35a2.5 2.5 0 0 0 1.75-1.75C23 15.3 23 12 23 12Zm-13 3.2V8.8l5.6 3.2-5.6 3.2Z" />
        </svg>
      ),
    },
    {
      label: "Discord",
      href: PIONEX_SOCIALS.discord,
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
          <path d="M19.3 5.6A16 16 0 0 0 15 4.3l-.2.4a12 12 0 0 1 3.4 1.7 13 13 0 0 0-11.4 0A12 12 0 0 1 10.2 4.7L10 4.3A16 16 0 0 0 5.7 5.6C3 9.7 2.3 13.6 2.6 17.5a16 16 0 0 0 4.9 2.5l.6-.9c-.8-.3-1.6-.7-2.3-1.2l.6-.4a11 11 0 0 0 9.4 0l.6.4c-.7.5-1.5.9-2.3 1.2l.6.9a16 16 0 0 0 4.9-2.5c.4-4.5-.6-8.4-2.8-11.9ZM9.6 15.1c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9Zm4.8 0c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9Z" />
        </svg>
      ),
    },
    {
      label: "Reddit",
      href: PIONEX_SOCIALS.reddit,
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
          <path d="M22 12a2 2 0 0 0-3.4-1.4 9.8 9.8 0 0 0-5-1.5l.9-4 2.8.6a1.4 1.4 0 1 0 .2-1l-3.3-.7a.4.4 0 0 0-.5.3l-1 4.5a9.8 9.8 0 0 0-5.1 1.5A2 2 0 1 0 3.4 14a3.6 3.6 0 0 0 0 .5c0 2.8 3.4 5.1 7.6 5.1s7.6-2.3 7.6-5.1a3.6 3.6 0 0 0 0-.5A2 2 0 0 0 22 12ZM8 13.4a1.3 1.3 0 1 1 2.6 0 1.3 1.3 0 0 1-2.6 0Zm7.3 3.5c-1 1-3 1-3.3 1s-2.3 0-3.3-1a.4.4 0 0 1 .6-.6c.6.6 1.9.8 2.7.8s2.1-.2 2.7-.8a.4.4 0 1 1 .6.6ZM15 14.7a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: PIONEX_SOCIALS.facebook,
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
          <path d="M14 9.5h2.5l.4-3H14V4.9c0-.9.3-1.4 1.5-1.4H17V.9C16.6.85 15.6.8 14.5.8c-2.3 0-3.8 1.4-3.8 3.9v1.8H8v3h2.7V23h3.3V9.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="footer-v2">
      <div className="max-w-[1160px] mx-auto px-5 md:px-10">
        <div className="grid gap-10 md:gap-8 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr] pt-16 pb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-lg font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "var(--accent-color)" }}>💳</div>
              Zero<span style={{ color: "var(--accent-color)" }}>Card</span>
            </div>
            <p className="text-sm leading-[1.7] mb-6 max-w-[330px]" style={{ color: "var(--text2)" }}>{t.footTagline}</p>
            <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener" className="btn-primary" style={{ padding: "10px 22px", fontSize: "14px", borderRadius: "10px" }}>
              {t.navGetCard}
            </a>
            <div className="mt-7">
              <div className="ftr-h" style={{ marginBottom: 12 }}>{t.footOfficial}</div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="ftr-social">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <FooterCol title={t.footColProduct} links={product} />
          <FooterCol title={t.footColResources} links={resources} />
          <FooterCol title={t.footColCompany} links={company} />
        </div>

        {/* Bottom bar */}
        <div className="ftr-bottom flex flex-col md:flex-row md:items-start justify-between gap-4 py-6">
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-xs" style={{ color: "var(--text3)" }}>{t.footRights}</span>
          </div>
          <p className="text-[11px] leading-[1.7] md:text-right" style={{ color: "var(--text3)", maxWidth: 620 }}>
            {t.footerNote}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   DYNAMIC META
   ═══════════════════════════════════════════════════ */
const OG_LOCALE: Record<string, string> = { ru: "ru_RU", en: "en_US", de: "de_DE", es: "es_ES", pt: "pt_BR", it: "it_IT", fr: "fr_FR" };

// Localized 1200x630 preview images; bump the version in the file name to force X/Telegram to refetch.
const ogImageFor = (lang: string) => `https://zerocard.pro/og/zerocard-${OG_LOCALE[lang] ? lang : "en"}-v4.jpg`;

function DynamicMeta() {
  const { t, lang } = useI18n();
  useEffect(() => {
    document.title = t.metaTitle;
    // Update an existing meta tag, or create it if it's missing.
    const setMeta = (attr: "name" | "property", val: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("name", "description", t.metaDesc);
    setMeta("property", "og:title", t.metaTitle);
    setMeta("property", "og:description", t.metaDesc);
    setMeta("property", "og:locale", OG_LOCALE[lang] ?? "en_US");
    setMeta("property", "og:image", ogImageFor(lang));
    setMeta("property", "og:image:alt", t.metaTitle);
    setMeta("name", "twitter:title", t.metaTitle);
    setMeta("name", "twitter:description", t.metaDesc);
    setMeta("name", "twitter:image", ogImageFor(lang));
    setMeta("name", "twitter:image:alt", t.metaTitle);

    // og:locale:alternate for every other language (helps i18n discovery).
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((n) => n.remove());
    Object.entries(OG_LOCALE)
      .filter(([l]) => l !== lang)
      .forEach(([, loc]) => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:locale:alternate");
        m.content = loc;
        document.head.appendChild(m);
      });

    // Self-referencing canonical + og:url that match the hreflang target for this language.
    const url = "https://zerocard.pro" + langHref(lang, "/");
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.rel = "canonical";
      document.head.appendChild(canon);
    }
    canon.href = url;
    setMeta("property", "og:url", url);
  }, [t, lang]);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://zerocard.pro/#webpage",
        url: "https://zerocard.pro/",
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: lang,
        isPartOf: { "@id": "https://zerocard.pro/#website" },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [{ "@type": "ListItem", position: 1, name: "ZeroCard", item: "https://zerocard.pro/" }]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://zerocard.pro/#website",
        url: "https://zerocard.pro/",
        name: "ZeroCard",
        description: lang === "ru" ? "Независимый гид по карте Pionex и торговым ботам Pionex"
          : lang === "de" ? "Unabhängiger Ratgeber zur Pionex Card und zu den Pionex Trading-Bots"
          : lang === "es" ? "Guía independiente sobre la tarjeta Pionex y los bots de trading de Pionex"
          : lang === "pt" ? "Guia independente sobre o cartão Pionex e os bots de trading da Pionex"
          : "Independent guide to the Pionex card and Pionex trading bots",
        inLanguage: lang,
        publisher: { "@id": "https://zerocard.pro/#organization" }
      },
      {
        "@type": "Organization",
        "@id": "https://zerocard.pro/#organization",
        name: "ZeroCard",
        url: "https://zerocard.pro/",
        logo: "https://zerocard.pro/favicon.png",
        image: ogImageFor(lang),
        description: lang === "ru" ? "Партнёрский проект о карте Pionex: криптовалютная дебетовая Visa и Mastercard"
          : lang === "de" ? "Partnerprojekt der Pionex Card: Krypto-Debitkarte von Visa und Mastercard"
          : lang === "es" ? "Proyecto de afiliado de Pionex Card: tarjeta de débito cripto Visa/Mastercard"
          : lang === "pt" ? "Projeto de afiliado da Pionex Card: cartão de débito cripto Visa/Mastercard"
          : "Pionex Card affiliate guide: crypto debit card on Visa and Mastercard"
      },
      {
        "@type": "FinancialProduct",
        "@id": "https://zerocard.pro/#product",
        name: "ZeroCard by Pionex",
        image: ogImageFor(lang),
        brand: { "@type": "Brand", name: "Pionex" },
        category: "Crypto debit card",
        description: lang === "ru"
          ? "Виртуальная дебетовая карта Visa/Mastercard для трат в USDT. 1% кэшбэк, 5% APR на остаток, Apple Pay, Google Pay, 0 годовых сборов."
          : lang === "de"
          ? "Virtuelle Debitkarte von Visa und Mastercard für Zahlungen in USDT. 1% Cashback, 5% Zinsen aufs Guthaben, Apple Pay, Google Pay, keine Jahresgebühr."
          : lang === "es"
          ? "Tarjeta de débito virtual Visa/Mastercard para gastar en USDT. 1% de reembolso, 5% anual sobre el saldo, Apple Pay, Google Pay y cero cuota anual."
          : lang === "pt"
          ? "Cartão de débito virtual Visa/Mastercard para gastar em USDT. 1% de cashback, 5% ao ano sobre o saldo, Apple Pay, Google Pay e zero anuidade."
          : "Virtual Visa/Mastercard debit card for USDT spending. 1% cashback, 5% APR on balance, Apple Pay, Google Pay, 0 annual fees.",
        url: "https://zerocard.pro/",
        provider: {
          "@type": "FinancialService",
          name: "Pionex",
          url: "https://www.pionex.com"
        },
        feesAndCommissionsSpecification: "0 annual fee, 0 issuance fee, 1% transaction fee offset by 1% cashback",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: lang === "ru" ? "Бесплатный выпуск и обслуживание"
            : lang === "de" ? "Ausgabe und Führung kostenlos"
            : lang === "es" ? "Emisión y mantenimiento gratis"
            : lang === "pt" ? "Emissão e manutenção grátis"
            : "Free issuance and maintenance"
        }
      }
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ═══════════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════════ */
const Index = () => {
  useSpotlight();
  return (
  <div className="min-h-screen" style={{ overflowX: "clip" }}>
    <ScrollProgress />
    <DynamicMeta />
    <IconDefs />
    <Navbar />
    <main>
      <HeroSection />
      <CountryCheckSection />
      <BenefitsCompact />
      <CalculatorSection />
      <HowItWorks />
      <PromoAiSection />
      <AudienceCompact />
      <GuidesSection />
      <FAQSection />
      <CTASection />

    </main>
    <Footer />
  </div>
  );
};

export default Index;
