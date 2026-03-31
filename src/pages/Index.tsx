import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n, Lang } from "@/lib/i18n";
import { ArrowRight, Menu, X, Sun, Moon, Globe } from "lucide-react";

const SIGNUP_URL = "https://www.pionex.com/ru/signUp?r=0uHzysLVYQh";
const DOCS_URL = "https://support.pionex.com/hc/en-us/sections/47904768884633-Pionex-Card";

/* ─── Animated wrapper ─── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
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

/* ═══════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════ */
function Navbar() {
  const { t, lang, setLang } = useI18n();
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
    { label: lang === "ru" ? "Блог" : "Blog", href: "/blog" },
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
          <div className="flex items-center gap-1.5 rounded-lg overflow-hidden border" style={{ borderColor: "var(--border-custom)" }}>
            <Globe className="w-4 h-4 ml-2.5" style={{ color: "var(--text2)" }} />
              <button key={l} onClick={() => setLang(l)}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  background: lang === l ? "var(--accent-color)" : "var(--bg3)",
                  color: lang === l ? "#fff" : "var(--text2)",
                }}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={toggle} className="theme-btn">
            {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary" style={{ padding: "8px 20px", fontSize: "14px", borderRadius: "10px" }}>
            {t.navGetCard}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "var(--border-custom)" }}>
            {(["en", "ru"] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all"
                style={{
                  background: lang === l ? "var(--accent-color)" : "var(--bg3)",
                  color: lang === l ? "#fff" : "var(--text2)",
                }}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={toggle} className="theme-btn" style={{ width: 32, height: 32 }}>
            {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="w-9 h-9 flex items-center justify-center" style={{ color: "var(--text2)" }}>
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
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
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
  const { t } = useI18n();
  const phrases = [t.tw1, t.tw2, t.tw3, t.tw4, t.tw5, t.tw6, t.tw7, t.tw8, t.tw9, t.tw10, t.tw11, t.tw12, t.tw13];
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[wordIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      // Typing
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70 + Math.random() * 40);
    } else if (!isDeleting && displayed.length === current.length) {
      // Pause then start deleting — first word gets a longer accent pause
      const pause = wordIdx === 0 ? 4500 : 2200;
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      // Move to next word
      setIsDeleting(false);
      setWordIdx(prev => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, wordIdx, phrases]);

  const pills = [
    { icon: "🌍", label: t.pill1 }, { icon: "🍎", label: t.pill2 },
    { icon: "📱", label: t.pill3 }, { icon: "🆓", label: t.pill4 },
    { icon: "⚡", label: t.pill5 },
  ];

  const tickerItems = [
    { icon: "🍎", label: t.tickerApple }, { icon: "📱", label: t.tickerGoogle },
    { icon: "🅿️", label: t.tickerPaypal }, { icon: "💳", label: t.tickerVisa },
    { icon: "🔴", label: t.tickerMastercard }, { icon: "✈️", label: t.tickerTrip },
    { icon: "📲", label: t.tickerLine }, { icon: "💹", label: t.tickerWechat },
    { icon: "🛍️", label: t.tickerAlipay }, { icon: "📲", label: t.tickerSamsung },
  ];

  return (
    <section className="text-center relative" style={{ maxWidth: 1160, margin: "0 auto", padding: "96px 40px 80px" }}>
      {/* Centred spotlight */}
      <div className="absolute pointer-events-none z-0" style={{
        top: 40, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 420,
        background: "radial-gradient(ellipse at center, rgba(255,90,42,0.08) 0%, rgba(60,120,240,0.07) 50%, transparent 75%)",
      }} />
      <div className="relative z-[1]">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold mb-7"
            style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", color: "var(--accent-color)", fontFamily: "'JetBrains Mono', monospace" }}>
            <span className="w-[7px] h-[7px] rounded-full" style={{ background: "var(--accent-color)", animation: "blink 2s infinite" }} />
            <span style={{ opacity: 0.6 }}>$</span> {t.heroBadge}
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="hero-title mb-6">
            {t.heroTitle1}<br />
            <span className="typewriter-wrap">
              <span className="typewriter-word">{displayed}</span>
              <span className="typewriter-cursor" />
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-lg leading-[1.7] font-normal mb-10 mx-auto" style={{ color: "var(--text2)", maxWidth: 660 }}>
            {t.heroDesc}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex justify-center gap-3 flex-wrap mb-14">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{t.heroCTA}</a>
            <a href="#how" className="btn-secondary-custom">{t.heroSecondary}</a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex justify-center items-center gap-2 flex-wrap text-[13px] font-medium" style={{ color: "var(--text2)" }}>
            {pills.map(p => (
              <div key={p.label} className="pill">
                <span className="text-[15px]">{p.icon}</span>{p.label}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Wallet ticker */}
        <div className="mt-14 overflow-hidden relative py-1">
          <div className="absolute top-0 bottom-0 left-0 w-[120px] z-[2]" style={{ background: `linear-gradient(90deg, var(--bg), transparent)` }} />
          <div className="absolute top-0 bottom-0 right-0 w-[120px] z-[2]" style={{ background: `linear-gradient(-90deg, var(--bg), transparent)` }} />
          <div className="flex gap-3 w-max" style={{ animation: "ticker-scroll 22s linear infinite" }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="wallet-chip">
                <span className="text-[17px]">{item.icon}</span>{item.label}
              </div>
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
      style={{ background: "rgba(4,28,62,0.7)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[1160px] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.05}>
            <div className="text-center px-6" style={{ borderRight: i < stats.length - 1 ? "1px solid var(--border-custom)" : "none" }}>
              <div className="text-4xl font-bold tracking-tight" style={{ color: "var(--blue)", letterSpacing: "-1.5px", fontFamily: "'Space Grotesk', sans-serif" }}>{s.val}</div>
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
  const badIcons = ["🔒", "💸", "⏳", "📉", "🌍"];
  const goodIcons = ["⚡", "🔄", "✅", "📈", "🌐"];

  return (
    <section className="py-24 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-badge">{t.painBadge}</div>
          <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.painTitle}</h2>
          <p className="text-[17px] leading-[1.7] max-w-[560px]" style={{ color: "var(--text2)" }}>{t.painDesc}</p>
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
                    <span className="text-xl flex-shrink-0 mt-0.5">{badIcons[i]}</span>
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
                    <span className="text-xl flex-shrink-0 mt-0.5">{goodIcons[i]}</span>
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
  const { t } = useI18n();
  const benefits = [
    { icon: t.ben1Icon, big: t.ben1Big, title: t.ben1Title, desc: t.ben1Desc, wide: true, featured: true },
    { icon: t.ben2Icon, big: t.ben2Big, title: t.ben2Title, desc: t.ben2Desc },
    { icon: t.ben3Icon, title: t.ben3Title, desc: t.ben3Desc },
    { icon: t.ben4Icon, big: t.ben4Big, title: t.ben4Title, desc: t.ben4Desc },
    { icon: t.ben5Icon, title: t.ben5Title, desc: t.ben5Desc },
    { icon: t.ben6Icon, title: t.ben6Title, desc: t.ben6Desc },
    { icon: t.ben7Icon, title: t.ben7Title, desc: t.ben7Desc },
  ];

  return (
    <section id="benefits" className="py-24 px-5 md:px-10 border-t border-b"
      style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-badge">{t.benefitsBadge}</div>
          <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.benefitsTitle}</h2>
          <p className="text-[17px] leading-[1.7] max-w-[560px]" style={{ color: "var(--text2)" }}>{t.benefitsDesc}</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {benefits.map((b, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className={`glass-card glass-card-hover p-7 ${b.featured ? "benefit-featured" : ""}`}
                style={b.wide ? { gridColumn: "span 2" } : {}}>
                <span className="text-[28px] mb-4 block">{b.icon}</span>
                {b.big && (
                  <div className="text-[44px] font-bold leading-none mb-2" style={{ color: "var(--accent-color)", letterSpacing: "-2px", fontFamily: "'Space Grotesk', sans-serif" }}>{b.big}</div>
                )}
                <div className="text-base font-bold mb-2.5" style={{ letterSpacing: "-0.3px" }}>{b.title}</div>
                <div className="text-[13px] leading-[1.7]" style={{ color: "var(--text2)" }}>{b.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS (with tabs)
   ═══════════════════════════════════════════════════ */
function HowItWorks() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("apply");

  const tabs = [
    { id: "apply", label: t.howTab1 },
    { id: "apple", label: t.howTab2 },
    { id: "google", label: t.howTab3 },
    { id: "paypal", label: t.howTab4 },
  ];

  const steps = [
    { num: "01", title: t.step1Title, desc: t.step1Desc },
    { num: "02", title: t.step2Title, desc: t.step2Desc },
    { num: "03", title: t.step3Title, desc: t.step3Desc },
    { num: "04", title: t.step4Title, desc: t.step4Desc },
    { num: "05", title: t.step5Title, desc: t.step5Desc },
  ];

  return (
    <section id="how" className="py-24 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-badge">{t.howBadge}</div>
          <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.howTitle}</h2>
          <p className="text-[17px] leading-[1.7] max-w-[560px]" style={{ color: "var(--text2)" }}>{t.howDesc}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex gap-2 flex-wrap mt-12 mb-8">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`how-tab ${activeTab === tab.id ? "active" : ""}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {activeTab === "apply" && (
          <FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 relative">
              <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px" style={{ background: "var(--border-custom)" }} />
              {steps.map((s, i) => (
                <div key={i} className="text-center px-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 relative z-[1] text-xl font-extrabold transition-all group"
                    style={{ background: "var(--bg2)", border: "2px solid var(--border-custom)", color: "var(--accent-color)", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-color)"; e.currentTarget.style.background = "var(--accent-bg)"; e.currentTarget.style.boxShadow = "0 0 0 4px var(--accent-bg)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-custom)"; e.currentTarget.style.background = "var(--bg2)"; e.currentTarget.style.boxShadow = "none"; }}>
                    {s.num}
                  </div>
                  <div className="text-sm font-bold mb-2">{s.title}</div>
                  <div className="text-[13px] leading-[1.6]" style={{ color: "var(--text2)" }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {activeTab === "apple" && (
          <FadeIn>
            <div className="grid md:grid-cols-3 gap-4">
              <WalletCard icon="🍎" name={t.appleVisa} type={t.appleVisaType} badge={t.appleVisaRecommended} badgeColor="green"
                steps={[t.appleStep1, t.appleStep2, t.appleStep3, t.appleStep4, t.appleStep5]} />
              <WalletCard icon="🍎" name={t.appleMC} type={t.appleMCType} badge={t.appleMCAlt} badgeColor="blue"
                steps={[t.appleMCStep1, t.appleMCStep2, t.appleMCStep3, t.appleMCStep4, t.appleMCStep5]} />
              <WalletCard icon="ℹ️" name={t.appleDevices} type={t.appleDevicesType} featured
                steps={[t.appleReq1, t.appleReq2, t.appleReq3, t.appleReq4, t.appleReq5]} checkmarks />
            </div>
          </FadeIn>
        )}

        {activeTab === "google" && (
          <FadeIn>
            <div className="grid md:grid-cols-3 gap-4">
              <WalletCard icon="📱" name={t.gpTitle} type={t.gpType} badge={t.gpSupported} badgeColor="green"
                steps={[t.gpStep1, t.gpStep2, t.gpStep3, t.gpStep4, t.gpStep5]} />
              <WalletCard icon="📋" name={t.gpReqTitle} type={t.gpReqType} featured
                steps={[t.gpReq1, t.gpReq2, t.gpReq3, t.gpReq4]} checkmarks />
              <WalletCard icon="💡" name={t.gpHowTitle} type={t.gpHowType}
                steps={[t.gpHow1, t.gpHow2, t.gpHow3, t.gpHow4]} />
            </div>
          </FadeIn>
        )}

        {activeTab === "paypal" && (
          <FadeIn>
            <div className="grid md:grid-cols-3 gap-4">
              <WalletCard icon="🅿️" name={t.ppTitle} type={t.ppType} badge={t.ppSupported} badgeColor="green"
                steps={[t.ppStep1, t.ppStep2, t.ppStep3, t.ppStep4, t.ppStep5]} />
              <WalletCard icon="🌐" name={t.ppUsesTitle} type={t.ppUsesType} featured
                steps={[t.ppUse1, t.ppUse2, t.ppUse3, t.ppUse4, t.ppUse5]} checkmarks />
              <WalletCard icon="📲" name={t.ppOtherTitle} type={t.ppOtherType}
                steps={[t.ppOther1, t.ppOther2, t.ppOther3, t.ppOther4, t.ppOther5]} />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.2}>
          <div className="text-center mt-14">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{t.howCTA}</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* Wallet Card component */
function WalletCard({ icon, name, type, badge, badgeColor, steps, featured, checkmarks }: {
  icon: string; name: string; type: string; steps: string[];
  badge?: string; badgeColor?: string; featured?: boolean; checkmarks?: boolean;
}) {
  return (
    <div className="glass-card glass-card-hover p-6"
      style={featured ? { background: "var(--accent-bg)", borderColor: "var(--accent-border)" } : {}}>
      <div className="flex justify-between items-center mb-5">
        <span className="text-[30px]">{icon}</span>
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
      <div className="text-[17px] font-bold mb-1" style={featured ? { color: "var(--accent-color)", fontFamily: "'Space Grotesk', sans-serif" } : { fontFamily: "'Space Grotesk', sans-serif" }}>{name}</div>
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
function CompareSection() {
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

  const cellStyle = (val: string) => {
    if (val.startsWith("✓")) return { color: "var(--green)" };
    if (val.startsWith("✕")) return { color: "var(--red)", opacity: 0.7 };
    if (val.startsWith("~")) return { color: "var(--accent-color)" };
    return {};
  };

  return (
    <section id="compare" className="py-24 px-5 md:px-10 border-t border-b"
      style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-badge">{t.compareBadge}</div>
          <h2 className="section-title mb-4">{t.compareTitle}</h2>
          <p className="text-[17px] leading-[1.7] max-w-[560px]" style={{ color: "var(--text2)" }}>{t.compareDesc}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border-custom)" }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>{t.compParam}</th>
                  <th className="col-zero">{t.compZero}</th>
                  <th>{t.compBank}</th>
                  <th>{t.compOther}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td>{row[0]}</td>
                    <td className="col-zero"><strong>{row[1]}</strong></td>
                    <td style={cellStyle(row[2])}>{row[2]}</td>
                    <td style={cellStyle(row[3])}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <div className="section-badge">{t.audBadge}</div>
          <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.audTitle}</h2>
          <p className="text-[17px] leading-[1.7] max-w-[560px]" style={{ color: "var(--text2)" }}>{t.audDesc}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="audience-tabs-grid mt-12 mb-10">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveAud(tab.id)}
                className={`aud-tab ${activeAud === tab.id ? "active" : ""}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn key={activeAud}>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 items-start">
            {/* Left card */}
            <div className="glass-card p-8 md:sticky md:top-20">
              <span className="text-5xl mb-4 block">{p.icon}</span>
              <div className="aud-tag">{p.tag}</div>
              <div className="text-[22px] font-extrabold mb-2.5" style={{ letterSpacing: "-0.7px", fontFamily: "'Space Grotesk', sans-serif" }}>{p.title}</div>
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
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{t.audCTA}</a>
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
    { text: t.rev1Text, name: t.rev1Name, role: t.rev1Role, ava: t.rev1Name.split(" ").map(w => w[0]).join("") },
    { text: t.rev2Text, name: t.rev2Name, role: t.rev2Role, ava: t.rev2Name.split(" ").map(w => w[0]).join("") },
    { text: t.rev3Text, name: t.rev3Name, role: t.rev3Role, ava: t.rev3Name.split(" ").map(w => w[0]).join("") },
    { text: t.rev4Text, name: t.rev4Name, role: t.rev4Role, ava: t.rev4Name.split(" ").map(w => w[0]).join("") },
    { text: t.rev5Text, name: t.rev5Name, role: t.rev5Role, ava: t.rev5Name.split(" ").map(w => w[0]).join("") },
    { text: t.rev6Text, name: t.rev6Name, role: t.rev6Role, ava: t.rev6Name.split(" ").map(w => w[0]).join("") },
  ];

  return (
    <section className="py-24 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <div className="section-badge">{t.reviewsBadge}</div>
          <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.reviewsTitle}</h2>
          <p className="text-[17px] leading-[1.7] max-w-[560px]" style={{ color: "var(--text2)" }}>{t.reviewsDesc}</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="review-card">
                <div className="text-[13px] tracking-[2px] mb-3.5" style={{ color: "var(--accent-color)" }}>★★★★★</div>
                <div className="text-sm leading-[1.7] mb-5 italic" style={{ color: "var(--text2)" }}>{r.text}</div>
                <div className="flex items-center gap-2.5">
                  <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0"
                    style={{ background: "var(--accent-color)", color: "#000" }}>
                    {r.ava}
                  </div>
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
function FAQSection() {
  const { t } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A }, { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A }, { q: t.faq6Q, a: t.faq6A },
    { q: t.faq7Q, a: t.faq7A }, { q: t.faq8Q, a: t.faq8A },
  ];

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
      <section id="faq" className="py-24 px-5 md:px-10 border-t border-b"
        style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="section-badge">{t.faqBadge}</div>
            <h2 className="section-title mb-12" style={{ whiteSpace: "pre-line" }}>{t.faqTitle}</h2>
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
                    style={{ maxHeight: openIdx === i ? 300 : 0, padding: openIdx === i ? "0 24px 20px" : "0 24px" }}>
                    <div className="text-sm leading-[1.7]" style={{ color: "var(--text2)" }}>{faq.a}</div>
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
function CTASection() {
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
          <h2 className="section-title mb-4" style={{ whiteSpace: "pre-line" }}>{t.ctaTitle}</h2>
          <p className="text-[17px] leading-[1.7] mb-9" style={{ color: "var(--text2)" }}>{t.ctaDesc}</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{t.ctaCTA}</a>
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
function Footer() {
  const { t } = useI18n();
  return (
    <footer className="py-8 px-5 md:px-10 border-t flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap"
      style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
      <div className="flex items-center gap-2 text-base font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="w-[26px] h-[26px] rounded-md flex items-center justify-center text-[13px]" style={{ background: "var(--accent-color)" }}>💳</div>
        Zero<span style={{ color: "var(--accent-color)" }}>Card</span>
      </div>
      {/* Color palette credits */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-custom)" }}>
          <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ background: "#020d1f", border: "1px solid rgba(255,255,255,0.2)" }} />
          <span className="text-[11px]" style={{ color: "var(--text3)", fontFamily: "'JetBrains Mono', monospace" }}>#020D1F</span>
        </div>
        <span className="text-[11px]" style={{ color: "var(--text3)" }}>+</span>
        <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-custom)" }}>
          <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ background: "#FF4D1C", border: "1px solid rgba(255,255,255,0.15)" }} />
          <span className="text-[11px]" style={{ color: "var(--text3)", fontFamily: "'JetBrains Mono', monospace" }}>#FF4D1C</span>
        </div>
      </div>
      <div className="text-xs leading-[1.6] max-w-[480px] text-center md:text-right" style={{ color: "var(--text3)" }}>
        {t.footerNote}
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   DYNAMIC META
   ═══════════════════════════════════════════════════ */
function DynamicMeta() {
  const { t, lang } = useI18n();
  useEffect(() => {
    document.title = t.metaTitle;
    const setMeta = (attr: string, val: string, content: string) => {
      const el = document.querySelector(`meta[${attr}="${val}"]`) as HTMLMetaElement;
      if (el) el.content = content;
    };
    setMeta("name", "description", t.metaDesc);
    setMeta("property", "og:title", t.metaTitle);
    setMeta("property", "og:description", t.metaDesc);
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
        description: lang === "ru" ? "Криптокарта Pionex — трать USDT везде" : "Pionex crypto card — spend USDT everywhere",
        inLanguage: lang,
        publisher: { "@id": "https://zerocard.pro/#organization" }
      },
      {
        "@type": "Organization",
        "@id": "https://zerocard.pro/#organization",
        name: "ZeroCard",
        url: "https://zerocard.pro/",
        description: lang === "ru" ? "Партнёрский проект Pionex Card — криптовалютная дебетовая карта Visa/Mastercard" : "Pionex Card partner — crypto debit card Visa/Mastercard",
        sameAs: ["https://www.pionex.com/ru/signUp?r=0uHzysLVYQh"]
      },
      {
        "@type": "FinancialProduct",
        name: "ZeroCard by Pionex",
        description: lang === "ru"
          ? "Виртуальная дебетовая карта Visa/Mastercard для трат в USDT. 1% кэшбэк, 5% APR на остаток, Apple Pay, Google Pay, 0 годовых сборов."
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
          description: lang === "ru" ? "Бесплатный выпуск и обслуживание" : "Free issuance and maintenance"
        }
      }
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/* ═══════════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════════ */
const Index = () => (
  <div className="min-h-screen" style={{ overflowX: "clip" }}>
    <DynamicMeta />
    <Navbar />
    <HeroSection />
    <StatsBar />
    <PainSection />
    <BenefitsSection />
    <HowItWorks />
    <CompareSection />
    <AudienceSection />
    <ReviewsSection />
    <FAQSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
