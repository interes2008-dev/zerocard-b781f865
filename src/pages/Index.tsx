import { useRef, useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useI18n, langHref } from "@/lib/i18n";
import { ArrowRight, Menu, X, Sun, Moon, Copy, Check } from "lucide-react";
import { BenefitIcon, IconDefs, StepIcon, PainIcon, WalletIcon, type WalletIconName, ReferralIcon } from "@/components/BenefitIcons";
import { LangSwitcher } from "@/components/LangSwitcher";
import { Link } from "react-router-dom";
import { STATIC_POSTS } from "@/lib/staticPosts";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";

const AVATAR_IMAGES = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

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
    { label: t.navCompare, href: "#compare" },
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
function HeroSection() {
  const SIGNUP_URL = useSignupUrl();
  const { lang } = useI18n();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    if (!stage || !card) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm || !window.matchMedia("(pointer:fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${8 - y * 10}deg) rotateY(${-14 + x * 14}deg)`;
    };
    const onLeave = () => { card.style.transform = "rotateX(8deg) rotateY(-14deg)"; };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const copies = {
    ru: {
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
    badge: "Pionex Card · Visa & Mastercard · bis zu 1% Cashback",
    h1a: "USDT im Wallet.", h1b: "Zahle mit Krypto", h1accent: "überall auf der Welt",
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
    badge: "Pionex Card · Visa & Mastercard · up to 1% cashback",
    h1a: "USDT in your wallet.", h1b: "Pay with crypto", h1accent: "everywhere you go",
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
    badge: "Pionex Card · Visa & Mastercard · hasta 1% de reembolso",
    h1a: "USDT en tu saldo.", h1b: "Paga con cripto", h1accent: "por todo el mundo",
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
    badge: "Pionex Card · Visa & Mastercard · até 1% de cashback",
    h1a: "USDT no saldo.", h1b: "Pague com cripto", h1accent: "pelo mundo todo",
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
    badge: "Pionex Card · Visa & Mastercard · fino all'1% di cashback",
    h1a: "USDT sul saldo.", h1b: "Paga in crypto", h1accent: "in tutto il mondo",
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
    badge: "Pionex Card · Visa & Mastercard · jusqu'à 1 % de cashback",
    h1a: "USDT sur le solde.", h1b: "Payez en crypto", h1accent: "partout dans le monde",
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
          <div className="pcard" ref={cardRef}>
            <div className="stripes"><span className="s1" /><span className="s2" /></div>
            <div className="card-top">
              <svg className="p-logo" viewBox="0 0 48 36" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="46" height="34" rx="7" fill="rgba(255,255,255,.28)" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" />
                <path d="M1 12h14M1 24h14M33 12h14M33 24h14M15 1v34M33 1v34M15 18h18" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
              </svg>
              <div className="status-pill">{c.status}</div>
            </div>
            <div className="card-mid"><div className="tier">virtual · usdt</div></div>
            <div className="card-bottom">
              <div className="card-num"><span className="dots">•&nbsp;•&nbsp;•&nbsp;•</span> 5157</div>
              <div className="mc"><i /><i /></div>
            </div>
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


/* ═══════════════════════════════════════════════════
   STATS BAR
   ═══════════════════════════════════════════════════ */
function StatsBar() {
  const { t } = useI18n();
  const stats = [
    { val: t.stat1Val, label: t.stat1Label },
    { val: t.stat2Val, label: t.stat2Label },
    { val: t.stat3Val, label: t.stat3Label },
    { val: t.stat4Val, label: t.stat4Label },
  ];

  return (
    <div className="border-t border-b py-8 px-5 md:px-10 backdrop-blur-sm"
      style={{ background: "color-mix(in srgb, var(--bg2) 82%, transparent)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[1160px] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.05}>
            <div className="text-center px-6" style={{ borderRight: i < stats.length - 1 ? "1px solid var(--border-custom)" : "none" }}>
              <div className="text-4xl font-bold tracking-tight" style={{ color: "var(--blue)", letterSpacing: "-1.5px", fontFamily: "'Space Grotesk', sans-serif" }}><CountUp value={s.val} /></div>
              <div className="text-[13px] font-medium mt-1" style={{ color: "var(--text2)" }}>{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAIN vs SOLUTION
   ═══════════════════════════════════════════════════ */
function PainSection() {
  const { t } = useI18n();
  const bads = [t.painBad1, t.painBad2, t.painBad3, t.painBad4, t.painBad5];
  const goods = [t.painGood1, t.painGood2, t.painGood3, t.painGood4, t.painGood5];
  const badIcons = ["locked", "drain", "wait", "declining", "geoblock"] as const;
  const goodIcons = ["instant", "offset", "ready", "yield", "global"] as const;

  return (
    <section className="py-24 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-head mb-2">
            <div className="section-badge">{t.painBadge}</div>
            <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.painTitle}</h2>
            <p className="text-[17px] leading-[1.7]" style={{ color: "var(--text2)" }}>{t.painDesc}</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          <div>
            <FadeIn>
              <div className="text-[13px] font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "var(--red)" }}>
                {t.painBadLabel}
              </div>
            </FadeIn>
            <div className="flex flex-col gap-2.5">
              {bads.map((text, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="pain-row bad">
                    <PainIcon name={badIcons[i]} variant="bad" />
                    <div className="text-sm leading-[1.6]" style={{ color: "var(--text2)" }} dangerouslySetInnerHTML={{ __html: text }} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <div>
            <FadeIn>
              <div className="text-[13px] font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "var(--green)" }}>
                {t.painGoodLabel}
              </div>
            </FadeIn>
            <div className="flex flex-col gap-2.5">
              {goods.map((text, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="pain-row good">
                    <PainIcon name={goodIcons[i]} variant="good" />
                    <div className="text-sm leading-[1.6]" style={{ color: "var(--text2)" }} dangerouslySetInnerHTML={{ __html: text }} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   BENEFITS
   ═══════════════════════════════════════════════════ */
function BenefitsSection() {
  const SIGNUP_URL = useSignupUrl();
  const { t } = useI18n();
  const benefits = [
    { key: "cashback" as const, big: t.ben1Big, title: t.ben1Title, desc: t.ben1Desc, featured: true, feats: [t.ben1Fa, t.ben1Fb, t.ben1Fc] },
    { key: "growth" as const, big: t.ben2Big, title: t.ben2Title, desc: t.ben2Desc, feats: [t.ben2Fa, t.ben2Fb, t.ben2Fc] },
    { key: "tap" as const, title: t.ben3Title, desc: t.ben3Desc, feats: [t.ben3Fa, t.ben3Fb, t.ben3Fc] },
    { key: "travel" as const, big: t.ben4Big, title: t.ben4Title, desc: t.ben4Desc, feats: [t.ben4Fa, t.ben4Fb, t.ben4Fc] },
    { key: "shield" as const, title: t.ben5Title, desc: t.ben5Desc, feats: [t.ben5Fa, t.ben5Fb, t.ben5Fc] },
    { key: "instant" as const, title: t.ben6Title, desc: t.ben6Desc, feats: [t.ben6Fa, t.ben6Fb, t.ben6Fc] },
    { key: "free" as const, title: t.ben7Title, desc: t.ben7Desc, feats: [t.ben7Fa, t.ben7Fb, t.ben7Fc] },
  ];

  return (
    <section id="benefits" className="py-24 px-5 md:px-10 border-t border-b"
      style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-head mb-2">
            <div className="section-badge">{t.benefitsBadge}</div>
            <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.benefitsTitle}</h2>
            <p className="text-[17px] leading-[1.7]" style={{ color: "var(--text2)" }}>{t.benefitsDesc}</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {benefits.map((b, i) => (
            <FadeIn key={i} delay={i * 0.05} className="flex">
              <div className={`glass-card glass-card-hover p-7 flex flex-col flex-1 ${b.featured ? "benefit-featured" : ""}`}>
                <BenefitIcon name={b.key} featured={!!b.featured} />
                {b.big && (
                  <div className="text-[44px] font-bold leading-none mb-2" style={{ color: "var(--accent-color)", letterSpacing: "-2px", fontFamily: "'Space Grotesk', sans-serif" }}>{b.big}</div>
                )}
                <h3 className="text-base font-bold mb-2.5" style={{ letterSpacing: "-0.3px" }}>{b.title}</h3>
                <div className="text-[13px] leading-[1.7]" style={{ color: "var(--text2)" }}>{b.desc}</div>
                {b.feats && (
                  <ul className="ben-feats mt-auto">
                    {b.feats.filter(Boolean).map((fx, k) => (
                      <li key={k} className="ben-feat"><span className="ben-dot" aria-hidden />{fx}</li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
          ))}

          {/* CTA card fills the remaining columns of the last row */}
          <FadeIn delay={benefits.length * 0.05} className="flex grid-span-2">
            <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener" className="ben-cta flex-1">
              <div className="ben-cta__glow" aria-hidden />
              <div className="relative z-[1] flex flex-col md:flex-row md:items-center gap-6 md:gap-8 h-full">
                <div className="flex-1">
                  <h3 className="text-[26px] font-extrabold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.6px" }}>{t.benCtaTitle}</h3>
                  <p className="text-[14px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.9)", maxWidth: 460 }}>{t.benCtaDesc}</p>
                </div>
                <span className="ben-cta__btn">{t.ctaCTA}</span>
              </div>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
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
   COMPARE TABLE
   ═══════════════════════════════════════════════════ */
/* ─── Comparison: status parsing so every cell renders consistently ─── */
type CmpStatus = "good" | "partial" | "bad" | "none";

function parseCell(raw: string): { status: CmpStatus; text: string } {
  const v = (raw ?? "").trim();
  if (v.startsWith("\u2713")) return { status: "good", text: v.slice(1).trim() };
  if (v.startsWith("\u2715") || v.startsWith("\u2716")) return { status: "bad", text: v.slice(1).trim() };
  if (v.startsWith("~")) return { status: "partial", text: v.slice(1).trim() };
  return { status: "none", text: v };
}

function CmpMark({ status }: { status: CmpStatus }) {
  if (status === "none") return null;
  const paths: Record<Exclude<CmpStatus, "none">, React.ReactNode> = {
    good: <path d="M4.5 10.5 8 14l7.5-8" />,
    partial: <path d="M5 10h10" />,
    bad: <path d="M6 6l8 8M14 6l-8 8" />,
  };
  return (
    <span className={`cmp-mark cmp-mark--${status}`} aria-hidden>
      <svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {paths[status]}
      </svg>
    </span>
  );
}

function CmpValue({ raw, featured }: { raw: string; featured?: boolean }) {
  const { status, text } = parseCell(raw);
  // The ZeroCard column always shows a check: every row there is a win.
  const st: CmpStatus = featured ? (status === "none" ? "good" : status) : status;
  return (
    <span className={`cmp-val cmp-val--${st}`}>
      <CmpMark status={st} />
      {text && <span className="cmp-txt">{text}</span>}
    </span>
  );
}

function CompareSection() {
  const SIGNUP_URL = useSignupUrl();
  const { t } = useI18n();
  const rows = [
    [t.comp1P, t.comp1Z, t.comp1B, t.comp1O],
    [t.comp2P, t.comp2Z, t.comp2B, t.comp2O],
    [t.comp3P, t.comp3Z, t.comp3B, t.comp3O],
    [t.comp4P, t.comp4Z, t.comp4B, t.comp4O],
    [t.comp5P, t.comp5Z, t.comp5B, t.comp5O],
    [t.comp6P, t.comp6Z, t.comp6B, t.comp6O],
    [t.comp7P, t.comp7Z, t.comp7B, t.comp7O],
    [t.comp8P, t.comp8Z, t.comp8B, t.comp8O],
    [t.comp9P, t.comp9Z, t.comp9B, t.comp9O],
  ];

  return (
    <section id="compare" className="py-24 px-5 md:px-10 border-t border-b"
      style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-head mb-2">
            <div className="section-badge">{t.compareBadge}</div>
            <h2 className="section-title mb-4">{t.compareTitle}</h2>
            <p className="text-[17px] leading-[1.7]" style={{ color: "var(--text2)" }}>{t.compareDesc}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="cmp-wrap mt-14">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>{t.compParam}</th>
                  <th className="col-zero">
                    <span className="cmp-th-zero">
                      <span className="cmp-th-name">{t.compZero}</span>
                      <span className="cmp-th-badge">{t.compBest}</span>
                    </span>
                  </th>
                  <th>{t.compBank}</th>
                  <th>{t.compOther}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="cmp-param">{row[0]}</td>
                    <td className="col-zero" data-label={t.compZero}><CmpValue raw={row[1]} featured /></td>
                    <td data-label={t.compBank}><CmpValue raw={row[2]} /></td>
                    <td data-label={t.compOther}><CmpValue raw={row[3]} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend: makes the marks unambiguous */}
          <div className="cmp-legend">
            <span className="cmp-legend__item"><CmpMark status="good" />{t.compLegendGood}</span>
            <span className="cmp-legend__item"><CmpMark status="partial" />{t.compLegendPartial}</span>
            <span className="cmp-legend__item"><CmpMark status="bad" />{t.compLegendBad}</span>
          </div>

          {/* Verdict strip */}
          <div className="cmp-verdict">
            <div className="cmp-verdict__text">
              <span>{t.compWins}</span>
            </div>
            <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener" className="btn-primary cmp-verdict__btn">
              {t.ctaCTA}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   AUDIENCE SECTION (8 tabs)
   ═══════════════════════════════════════════════════ */
function AudienceSection() {
  const SIGNUP_URL = useSignupUrl();
  const { t } = useI18n();
  const [activeAud, setActiveAud] = useState("1");

  const tabs = [
    { id: "1", label: t.audTab1 }, { id: "2", label: t.audTab2 },
    { id: "3", label: t.audTab3 }, { id: "4", label: t.audTab4 },
    { id: "5", label: t.audTab5 }, { id: "6", label: t.audTab6 },
    { id: "7", label: t.audTab7 }, { id: "8", label: t.audTab8 },
    { id: "9", label: t.audTab9 }, { id: "10", label: t.audTab10 },
    { id: "11", label: t.audTab11 }, { id: "12", label: t.audTab12 },
    { id: "13", label: t.audTab13 }, { id: "14", label: t.audTab14 },
  ];

  const panels: Record<string, {
    icon: string; tag: string; title: string; desc: string;
    stats: { val: string; label: string }[];
    pains: { icon: string; title: string; body: string; sol: string }[];
  }> = {
    "1": {
      icon: t.aud1Icon, tag: t.aud1Tag, title: t.aud1Title, desc: t.aud1Desc,
      stats: [{ val: t.aud1S1V, label: t.aud1S1L }, { val: t.aud1S2V, label: t.aud1S2L }, { val: t.aud1S3V, label: t.aud1S3L }],
      pains: [
        { icon: t.aud1P1Icon, title: t.aud1P1Title, body: t.aud1P1Body, sol: t.aud1P1Sol },
        { icon: t.aud1P2Icon, title: t.aud1P2Title, body: t.aud1P2Body, sol: t.aud1P2Sol },
        { icon: t.aud1P3Icon, title: t.aud1P3Title, body: t.aud1P3Body, sol: t.aud1P3Sol },
      ],
    },
    "2": {
      icon: t.aud2Icon, tag: t.aud2Tag, title: t.aud2Title, desc: t.aud2Desc,
      stats: [{ val: t.aud2S1V, label: t.aud2S1L }, { val: t.aud2S2V, label: t.aud2S2L }, { val: t.aud2S3V, label: t.aud2S3L }],
      pains: [
        { icon: t.aud2P1Icon, title: t.aud2P1Title, body: t.aud2P1Body, sol: t.aud2P1Sol },
        { icon: t.aud2P2Icon, title: t.aud2P2Title, body: t.aud2P2Body, sol: t.aud2P2Sol },
        { icon: t.aud2P3Icon, title: t.aud2P3Title, body: t.aud2P3Body, sol: t.aud2P3Sol },
      ],
    },
    "3": {
      icon: t.aud3Icon, tag: t.aud3Tag, title: t.aud3Title, desc: t.aud3Desc,
      stats: [{ val: t.aud3S1V, label: t.aud3S1L }, { val: t.aud3S2V, label: t.aud3S2L }, { val: t.aud3S3V, label: t.aud3S3L }],
      pains: [
        { icon: t.aud3P1Icon, title: t.aud3P1Title, body: t.aud3P1Body, sol: t.aud3P1Sol },
        { icon: t.aud3P2Icon, title: t.aud3P2Title, body: t.aud3P2Body, sol: t.aud3P2Sol },
        { icon: t.aud3P3Icon, title: t.aud3P3Title, body: t.aud3P3Body, sol: t.aud3P3Sol },
      ],
    },
    "4": {
      icon: t.aud4Icon, tag: t.aud4Tag, title: t.aud4Title, desc: t.aud4Desc,
      stats: [{ val: t.aud4S1V, label: t.aud4S1L }, { val: t.aud4S2V, label: t.aud4S2L }, { val: t.aud4S3V, label: t.aud4S3L }],
      pains: [
        { icon: t.aud4P1Icon, title: t.aud4P1Title, body: t.aud4P1Body, sol: t.aud4P1Sol },
        { icon: t.aud4P2Icon, title: t.aud4P2Title, body: t.aud4P2Body, sol: t.aud4P2Sol },
        { icon: t.aud4P3Icon, title: t.aud4P3Title, body: t.aud4P3Body, sol: t.aud4P3Sol },
      ],
    },
    "5": {
      icon: t.aud5Icon, tag: t.aud5Tag, title: t.aud5Title, desc: t.aud5Desc,
      stats: [{ val: t.aud5S1V, label: t.aud5S1L }, { val: t.aud5S2V, label: t.aud5S2L }, { val: t.aud5S3V, label: t.aud5S3L }],
      pains: [
        { icon: t.aud5P1Icon, title: t.aud5P1Title, body: t.aud5P1Body, sol: t.aud5P1Sol },
        { icon: t.aud5P2Icon, title: t.aud5P2Title, body: t.aud5P2Body, sol: t.aud5P2Sol },
        { icon: t.aud5P3Icon, title: t.aud5P3Title, body: t.aud5P3Body, sol: t.aud5P3Sol },
      ],
    },
    "6": {
      icon: t.aud6Icon, tag: t.aud6Tag, title: t.aud6Title, desc: t.aud6Desc,
      stats: [{ val: t.aud6S1V, label: t.aud6S1L }, { val: t.aud6S2V, label: t.aud6S2L }, { val: t.aud6S3V, label: t.aud6S3L }],
      pains: [
        { icon: t.aud6P1Icon, title: t.aud6P1Title, body: t.aud6P1Body, sol: t.aud6P1Sol },
        { icon: t.aud6P2Icon, title: t.aud6P2Title, body: t.aud6P2Body, sol: t.aud6P2Sol },
        { icon: t.aud6P3Icon, title: t.aud6P3Title, body: t.aud6P3Body, sol: t.aud6P3Sol },
      ],
    },
    "7": {
      icon: t.aud7Icon, tag: t.aud7Tag, title: t.aud7Title, desc: t.aud7Desc,
      stats: [{ val: t.aud7S1V, label: t.aud7S1L }, { val: t.aud7S2V, label: t.aud7S2L }, { val: t.aud7S3V, label: t.aud7S3L }],
      pains: [
        { icon: t.aud7P1Icon, title: t.aud7P1Title, body: t.aud7P1Body, sol: t.aud7P1Sol },
        { icon: t.aud7P2Icon, title: t.aud7P2Title, body: t.aud7P2Body, sol: t.aud7P2Sol },
        { icon: t.aud7P3Icon, title: t.aud7P3Title, body: t.aud7P3Body, sol: t.aud7P3Sol },
      ],
    },
    "8": {
      icon: t.aud8Icon, tag: t.aud8Tag, title: t.aud8Title, desc: t.aud8Desc,
      stats: [{ val: t.aud8S1V, label: t.aud8S1L }, { val: t.aud8S2V, label: t.aud8S2L }, { val: t.aud8S3V, label: t.aud8S3L }],
      pains: [
        { icon: t.aud8P1Icon, title: t.aud8P1Title, body: t.aud8P1Body, sol: t.aud8P1Sol },
        { icon: t.aud8P2Icon, title: t.aud8P2Title, body: t.aud8P2Body, sol: t.aud8P2Sol },
        { icon: t.aud8P3Icon, title: t.aud8P3Title, body: t.aud8P3Body, sol: t.aud8P3Sol },
      ],
    },
    "9": {
      icon: t.aud9Icon, tag: t.aud9Tag, title: t.aud9Title, desc: t.aud9Desc,
      stats: [{ val: t.aud9S1V, label: t.aud9S1L }, { val: t.aud9S2V, label: t.aud9S2L }, { val: t.aud9S3V, label: t.aud9S3L }],
      pains: [
        { icon: t.aud9P1Icon, title: t.aud9P1Title, body: t.aud9P1Body, sol: t.aud9P1Sol },
        { icon: t.aud9P2Icon, title: t.aud9P2Title, body: t.aud9P2Body, sol: t.aud9P2Sol },
        { icon: t.aud9P3Icon, title: t.aud9P3Title, body: t.aud9P3Body, sol: t.aud9P3Sol },
      ],
    },
    "10": {
      icon: t.aud10Icon, tag: t.aud10Tag, title: t.aud10Title, desc: t.aud10Desc,
      stats: [{ val: t.aud10S1V, label: t.aud10S1L }, { val: t.aud10S2V, label: t.aud10S2L }, { val: t.aud10S3V, label: t.aud10S3L }],
      pains: [
        { icon: t.aud10P1Icon, title: t.aud10P1Title, body: t.aud10P1Body, sol: t.aud10P1Sol },
        { icon: t.aud10P2Icon, title: t.aud10P2Title, body: t.aud10P2Body, sol: t.aud10P2Sol },
        { icon: t.aud10P3Icon, title: t.aud10P3Title, body: t.aud10P3Body, sol: t.aud10P3Sol },
      ],
    },
    "11": {
      icon: t.aud11Icon, tag: t.aud11Tag, title: t.aud11Title, desc: t.aud11Desc,
      stats: [{ val: t.aud11S1V, label: t.aud11S1L }, { val: t.aud11S2V, label: t.aud11S2L }, { val: t.aud11S3V, label: t.aud11S3L }],
      pains: [
        { icon: t.aud11P1Icon, title: t.aud11P1Title, body: t.aud11P1Body, sol: t.aud11P1Sol },
        { icon: t.aud11P2Icon, title: t.aud11P2Title, body: t.aud11P2Body, sol: t.aud11P2Sol },
        { icon: t.aud11P3Icon, title: t.aud11P3Title, body: t.aud11P3Body, sol: t.aud11P3Sol },
      ],
    },
    "12": {
      icon: t.aud12Icon, tag: t.aud12Tag, title: t.aud12Title, desc: t.aud12Desc,
      stats: [{ val: t.aud12S1V, label: t.aud12S1L }, { val: t.aud12S2V, label: t.aud12S2L }, { val: t.aud12S3V, label: t.aud12S3L }],
      pains: [
        { icon: t.aud12P1Icon, title: t.aud12P1Title, body: t.aud12P1Body, sol: t.aud12P1Sol },
        { icon: t.aud12P2Icon, title: t.aud12P2Title, body: t.aud12P2Body, sol: t.aud12P2Sol },
        { icon: t.aud12P3Icon, title: t.aud12P3Title, body: t.aud12P3Body, sol: t.aud12P3Sol },
      ],
    },
    "13": {
      icon: t.aud13Icon, tag: t.aud13Tag, title: t.aud13Title, desc: t.aud13Desc,
      stats: [{ val: t.aud13S1V, label: t.aud13S1L }, { val: t.aud13S2V, label: t.aud13S2L }, { val: t.aud13S3V, label: t.aud13S3L }],
      pains: [
        { icon: t.aud13P1Icon, title: t.aud13P1Title, body: t.aud13P1Body, sol: t.aud13P1Sol },
        { icon: t.aud13P2Icon, title: t.aud13P2Title, body: t.aud13P2Body, sol: t.aud13P2Sol },
        { icon: t.aud13P3Icon, title: t.aud13P3Title, body: t.aud13P3Body, sol: t.aud13P3Sol },
      ],
    },
    "14": {
      icon: t.aud14Icon, tag: t.aud14Tag, title: t.aud14Title, desc: t.aud14Desc,
      stats: [{ val: t.aud14S1V, label: t.aud14S1L }, { val: t.aud14S2V, label: t.aud14S2L }, { val: t.aud14S3V, label: t.aud14S3L }],
      pains: [
        { icon: t.aud14P1Icon, title: t.aud14P1Title, body: t.aud14P1Body, sol: t.aud14P1Sol },
        { icon: t.aud14P2Icon, title: t.aud14P2Title, body: t.aud14P2Body, sol: t.aud14P2Sol },
        { icon: t.aud14P3Icon, title: t.aud14P3Title, body: t.aud14P3Body, sol: t.aud14P3Sol },
      ],
    },
  };

  const p = panels[activeAud];

  return (
    <section id="audience" className="py-24 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-head mb-2">
            <div className="section-badge">{t.audBadge}</div>
            <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.audTitle}</h2>
            <p className="text-[17px] leading-[1.7]" style={{ color: "var(--text2)" }}>{t.audDesc}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="audience-tabs-grid mt-12 mb-10" role="tablist" aria-label={t.audTitle.replace(/\n/g, " ")}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveAud(tab.id)}
                role="tab" id={`audtab-${tab.id}`} data-tab-id={tab.id}
                aria-selected={activeAud === tab.id} aria-controls="audpanel"
                tabIndex={activeAud === tab.id ? 0 : -1}
                onKeyDown={(e) => handleTabKey(e, tabs, activeAud, setActiveAud)}
                className={`aud-tab ${activeAud === tab.id ? "active" : ""}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn key={activeAud} role="tabpanel" id="audpanel" aria-labelledby={`audtab-${activeAud}`}>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 items-start">
            {/* Left card */}
            <div className="glass-card p-8 md:sticky md:top-20">
              <span className="text-5xl mb-4 block">{p.icon}</span>
              <div className="aud-tag">{p.tag}</div>
              <h3 className="text-[22px] font-extrabold mb-2.5" style={{ letterSpacing: "-0.7px", fontFamily: "'Space Grotesk', sans-serif" }}>{p.title}</h3>
              <div className="text-sm leading-[1.7] mb-5" style={{ color: "var(--text2)" }}>{p.desc}</div>
              <div className="flex gap-3 flex-wrap mt-5">
                {p.stats.map((s, i) => (
                  <div key={i} className="aud-stat">
                    <div className="text-[22px] font-bold" style={{ color: "var(--accent-color)", letterSpacing: "-1px", fontFamily: "'Space Grotesk', sans-serif" }}>{s.val}</div>
                    <div className="text-[11px] font-medium mt-0.5" style={{ color: "var(--text3)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right pains */}
            <div className="flex flex-col gap-3.5">
              {p.pains.map((pain, i) => (
                <div key={i} className="aud-pain">
                  <div className="flex items-start gap-3.5 mb-2.5">
                    <span className="text-[22px] flex-shrink-0 mt-0.5">{pain.icon}</span>
                    <div>
                      <div className="text-[15px] font-bold mb-1">{pain.title}</div>
                      <div className="text-[13px] leading-[1.65]" style={{ color: "var(--text2)" }}>{pain.body}</div>
                    </div>
                  </div>
                  <div className="aud-solution">{pain.sol}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="text-center mt-12">
            <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener" className="btn-primary">{t.audCTA}</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   REVIEWS
   ═══════════════════════════════════════════════════ */
function ReviewsSection() {
  const { t } = useI18n();
  const reviews = [
    { text: t.rev1Text, name: t.rev1Name, role: t.rev1Role },
    { text: t.rev2Text, name: t.rev2Name, role: t.rev2Role },
    { text: t.rev3Text, name: t.rev3Name, role: t.rev3Role },
    { text: t.rev4Text, name: t.rev4Name, role: t.rev4Role },
    { text: t.rev5Text, name: t.rev5Name, role: t.rev5Role },
    { text: t.rev6Text, name: t.rev6Name, role: t.rev6Role },
  ];

  return (
    <section className="py-24 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-head mb-2">
            <div className="section-badge">{t.reviewsBadge}</div>
            <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.reviewsTitle}</h2>
            <p className="text-[17px] leading-[1.7]" style={{ color: "var(--text2)" }}>{t.reviewsDesc}</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mt-14" style={{ alignItems: "stretch" }}>
          {reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 0.05} className="flex">
              <div className="review-card flex flex-col flex-1">
                <div className="text-[13px] tracking-[2px] mb-3.5" style={{ color: "var(--accent-color)" }}>★★★★★</div>
                <div className="text-sm leading-[1.7] mb-5 italic flex-1" style={{ color: "var(--text2)" }}>{r.text}</div>
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={AVATAR_IMAGES[i]}
                    alt={r.name}
                    loading="lazy"
                    width={42}
                    height={42}
                    className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0 ring-2 ring-primary"
                  />
                  <div>
                    <div className="text-[13px] font-bold">{r.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text3)" }}>{r.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}



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
   REFERRAL (Pionex invite program)
   ═══════════════════════════════════════════════════ */
function ReferralSection() {
  const SIGNUP_URL = useSignupUrl();
  const { t } = useI18n();
  const steps = [
    { icon: "link" as const, title: t.refS1T, desc: t.refS1D },
    { icon: "friends" as const, title: t.refS2T, desc: t.refS2D },
    { icon: "percent" as const, title: t.refS3T, desc: t.refS3D },
  ];
  return (
    <section id="referral" className="py-20 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="referral-band p-8 md:p-12">
            <div className="relative z-[1] grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <div className="ref-badge mb-5">{t.refBadge}</div>
                <h2 className="font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 3.4vw, 42px)", lineHeight: 1.08, letterSpacing: "-0.5px", textWrap: "balance" }}>
                  {t.refTitle}
                </h2>
                <p className="text-[16px] leading-[1.7] mb-6" style={{ color: "rgba(255,255,255,0.92)", maxWidth: 520, textWrap: "pretty" }}>
                  {t.refDesc}
                </p>
                <div className="flex items-center gap-4 mb-7">
                  <span className="font-extrabold leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(48px, 6vw, 64px)", letterSpacing: "-2px" }}>
                    {t.refBig}
                  </span>
                  <span className="text-sm leading-[1.4]" style={{ color: "rgba(255,255,255,0.88)", maxWidth: 170 }}>
                    {t.refBigLabel}
                  </span>
                </div>
                <a href={SIGNUP_URL} target="_blank" rel="sponsored noopener" className="btn-on-accent">
                  {t.refCTA}
                </a>
                <p className="mt-5 text-xs leading-[1.6]" style={{ color: "rgba(255,255,255,0.72)", maxWidth: 480 }}>
                  {t.refNote}
                </p>
              </div>

              <div className="flex flex-col gap-3.5">
                {steps.map((s, i) => (
                  <div key={i} className="ref-step">
                    <div className="ref-chip"><ReferralIcon name={s.icon} /></div>
                    <div>
                      <div className="font-bold text-[15px] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</div>
                      <div className="text-[13px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.85)" }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

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
    { label: t.navCompare, href: "#compare" },
    { label: t.navAudience, href: "#audience" },
    { label: t.navFAQ, href: "#faq" },
  ];
  const resources = [
    { label: lang === "ru" ? "Блог" : "Blog", href: langHref(lang, "/blog") },
    { label: t.footReferral, href: "#referral" },
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
      <StatsBar />
      <PromoAiSection />
      <PainSection />
      <BenefitsSection />
      <HowItWorks />
      <CompareSection />
      <AudienceSection />
      <ReferralSection />
      <GuidesSection />
      <FAQSection />
      <CTASection />

    </main>
    <Footer />
  </div>
  );
};

export default Index;
