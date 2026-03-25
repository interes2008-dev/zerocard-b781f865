import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import cardImage from "@/assets/zerocard-orange.png";
import { row1Brands, row2Brands } from "@/components/BrandLogos";
import { useI18n, Lang } from "@/lib/i18n";
import {
  CreditCard, Wallet, ShoppingCart, Globe, Shield, TrendingUp, Zap, UserPlus, ShieldCheck,
  ArrowRight, Check, X, Coins, Users, Clock, ChevronRight, Sparkles,
  BadgeCheck, CircleDollarSign, Bot, Smartphone, Lock, Layers,
  Fingerprint, Brain, Plane, Menu,
} from "lucide-react";

const SIGNUP_URL = "https://www.pionex.com/ru/signUp?r=0uHzysLVYQh";

/* ─── Animated wrapper ─── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section heading ─── */
function SectionHeading({ tag, title, subtitle }: { tag: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <FadeIn>
      <div className="text-center mb-16 lg:mb-24">
        <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{tag}</p>
        <h2 className="section-title text-foreground mb-6">{title}</h2>
        {subtitle && <p className="text-lg text-muted-foreground max-w-lg mx-auto">{subtitle}</p>}
      </div>
    </FadeIn>
  );
}

/* ─── CTA Button ─── */
function CTAButton({ text, size = "default" }: { text: string; size?: "default" | "large" }) {
  return (
    <motion.a
      href={SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-3 rounded-full gradient-bg text-white font-semibold transition-all ${
        size === "large" ? "px-12 py-5 text-lg" : "px-8 py-3.5 text-sm"
      }`}
      style={{ boxShadow: "0 16px 60px -12px hsl(28 100% 50% / 0.5), 0 8px 24px -8px hsl(340 80% 55% / 0.3)" }}
    >
      {text}
      <ArrowRight className={size === "large" ? "w-5 h-5" : "w-4 h-4"} />
    </motion.a>
  );
}

/* ─── Glass Card ─── */
function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`relative rounded-3xl border border-border/15 bg-card/50 backdrop-blur-xl shadow-lg ${hover ? "hover:border-primary/20 hover:shadow-xl transition-all duration-500" : ""} ${className}`}
      style={{ boxShadow: "0 8px 40px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.03) inset" }}>
      {children}
    </div>
  );
}

/* ─── Noise overlay ─── */
function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }} />
  );
}

/* ─── Ambient glow orb ─── */
function GlowOrb({ color, size, position, blur = 120, opacity = 0.12 }: {
  color: string; size: number; position: string; blur?: number; opacity?: number;
}) {
  return (
    <div className={`absolute ${position} pointer-events-none`} style={{
      width: size, height: size,
      background: `radial-gradient(circle, ${color}, transparent 70%)`,
      filter: `blur(${blur}px)`,
      opacity,
    }} />
  );
}

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
function HeroSection() {
  const { t, lang } = useI18n();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 90% 70% at 50% 30%, hsl(28 40% 96%) 0%, hsl(0 0% 100%) 50%, hsl(240 10% 98%) 100%)",
        }} />
      </motion.div>

      <NoiseOverlay opacity={0.02} />

      <GlowOrb color="hsl(28 100% 50%)" size={1000} position="top-[10%] right-[15%]" blur={180} opacity={0.08} />
      <GlowOrb color="hsl(340 80% 55%)" size={600} position="top-[40%] right-[30%]" blur={150} opacity={0.05} />
      <GlowOrb color="hsl(270 70% 55%)" size={500} position="-bottom-20 -left-20" blur={140} opacity={0.04} />

      <div className="container mx-auto px-6 lg:px-16 py-32 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left */}
          <div className="max-w-xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-card/50 backdrop-blur-xl px-6 py-3 text-sm font-medium text-muted-foreground shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                {t.heroBadge}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className={`mt-10 font-bold tracking-tight leading-[1.06] text-foreground ${
                lang === "ru"
                  ? "text-[2.5rem] sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]"
                  : "text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
              }`}>
                <span className="gradient-text">{t.heroTitle1}</span>{t.heroTitle2}
                <br />
                {t.heroTitle3}
              </h1>
              <p className="mt-5 text-lg lg:text-xl font-semibold text-foreground/80 tracking-tight">
                {t.heroPowered} <span className="gradient-text font-bold">Pionex</span> {t.heroInfra}
              </p>
              <p className="mt-4 text-base lg:text-lg text-muted-foreground/90 max-w-lg leading-relaxed font-medium">
                {t.heroDesc1}
                <br />
                {t.heroDesc2}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-md">
                {[
                  { icon: CreditCard, text: t.heroFeat1 },
                  { icon: Coins, text: t.heroFeat2 },
                  { icon: Globe, text: t.heroFeat3 },
                  { icon: Bot, text: t.heroFeat4 },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8">
                <CTAButton text={t.heroCTA} size="large" />
                <p className="mt-4 text-xs text-muted-foreground/60 tracking-widest uppercase">
                  {t.heroMicro}
                </p>
              </div>
            </FadeIn>

            {/* Social proof stats */}
            <FadeIn delay={0.4}>
              <div className="mt-10 flex items-center gap-10 pt-8 border-t border-border/15">
                {[
                  { value: "150+", label: t.heroStat1 },
                  { value: "5 min", label: t.heroStat2 },
                  { value: "0€", label: t.heroStat3 },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-extrabold gradient-text tracking-tight">{stat.value}</p>
                    <p className="text-xs font-semibold text-muted-foreground/70 mt-1 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — Card */}
          <FadeIn delay={0.3} className="relative flex justify-center lg:justify-end">
            <div className="relative w-96 lg:w-[560px]">
              <div className="absolute inset-0 rounded-3xl scale-[1.4] blur-[120px] opacity-45"
                style={{ background: "radial-gradient(circle, hsl(28 100% 50%), transparent 70%)" }} />
              <div className="absolute inset-0 rounded-3xl scale-[1.6] blur-[160px] opacity-25"
                style={{ background: "radial-gradient(circle, hsl(340 80% 55%), transparent 60%)" }} />

              <motion.div
                style={{ y: cardY }}
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <motion.div
                  whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1200 }}
                >
                  <img
                    src={cardImage}
                    alt="Zerocard — global payment card"
                    className="w-full rounded-2xl relative z-10"
                    style={{
                      filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.4)) drop-shadow(0 25px 50px rgba(255,122,0,0.35))",
                    }}
                  />
                  <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, hsl(0 0% 100% / 0.15) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.05) 100%)",
                    }} />
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 rounded-2xl gradient-bg px-4 py-2.5 z-20 flex items-center gap-2"
                style={{ boxShadow: "0 12px 40px hsl(28 100% 50% / 0.4)" }}
              >
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">{t.heroCashback}</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-3 -left-6 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/30 px-4 py-2.5 z-20 flex items-center gap-2 shadow-lg"
              >
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">{t.heroCountries}</span>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   INFRASTRUCTURE TRUST
   ═══════════════════════════════════════════════════ */
function InfrastructureSection() {
  const { t, lang } = useI18n();
  const hSize = lang === "ru" ? "text-3xl lg:text-5xl xl:text-[3.5rem]" : "text-4xl lg:text-6xl xl:text-[4rem]";
  const cards = [
    { icon: Shield, title: t.infraCard1Title, desc: t.infraCard1Desc, gradient: "from-emerald-500 to-teal-400" },
    { icon: Zap, title: t.infraCard2Title, desc: t.infraCard2Desc, gradient: "from-orange-500 to-amber-400" },
    { icon: Clock, title: t.infraCard3Title, desc: t.infraCard3Desc, gradient: "from-violet-500 to-purple-400" },
  ];
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(220 15% 4%) 0%, hsl(240 12% 6%) 50%, hsl(220 15% 4%) 100%)",
    }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={800} position="top-0 left-1/2 -translate-x-1/2" blur={200} opacity={0.06} />
      <GlowOrb color="hsl(270 70% 55%)" size={500} position="bottom-0 right-1/4" blur={160} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.infraTag}</p>
          <h2 className={`${hSize} font-bold text-white mb-6 leading-tight text-center`}>
            {t.infraTitle1}<span className="gradient-text">{t.infraTitle2}</span>
          </h2>
          <p className="text-center text-lg text-white/35 mb-20 max-w-xl mx-auto leading-relaxed">{t.infraDesc}</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-7 max-w-5xl mx-auto mb-16">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.12}>
              <motion.div whileHover={{ scale: 1.05, y: -8 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                <div className="relative group rounded-3xl overflow-hidden h-full">
                  <div className="absolute inset-0 rounded-3xl p-[1px]" style={{
                    background: "linear-gradient(135deg, hsl(0 0% 100% / 0.1), hsl(28 100% 50% / 0.15), hsl(0 0% 100% / 0.05))",
                  }}>
                    <div className="w-full h-full rounded-3xl bg-white/[0.04] backdrop-blur-2xl" />
                  </div>
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: "0 25px 80px -20px hsl(28 100% 50% / 0.15), inset 0 0 60px -20px hsl(28 100% 50% / 0.06)" }} />
                  <div className="relative z-10 p-10 lg:p-12 text-center">
                    <div className="relative mx-auto mb-7">
                      <div className={`absolute -inset-3 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mx-auto`}
                        style={{ boxShadow: "0 12px 40px -8px hsl(28 100% 50% / 0.35)" }}>
                        <c.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div className="text-center">
            <p className="text-xs text-white/25 mb-4 tracking-widest uppercase">{t.infraPoweredBy}</p>
            <motion.div whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl px-10 py-5 cursor-default"
              style={{ boxShadow: "0 16px 50px -12px rgba(0,0,0,0.5), 0 0 40px -15px hsl(28 100% 50% / 0.1)" }}>
              <span className="text-xl font-bold gradient-text tracking-tight">Pionex</span>
              <span className="text-xs text-white/25 font-medium">{t.infraSince}</span>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SCROLLING TICKER
   ═══════════════════════════════════════════════════ */
function ScrollingTicker() {
  const { t, lang } = useI18n();
  const TickerRow = ({ items, reverse, speed }: { items: typeof row1Brands; reverse?: boolean; speed: number }) => {
    const repeated = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];
    return (
      <div className="relative overflow-hidden py-1">
        <div className="absolute left-0 top-0 bottom-0 w-56 lg:w-96 z-10" style={{ background: "linear-gradient(to right, hsl(220 15% 5%), hsl(220 15% 5% / 0.95) 20%, hsl(220 15% 5% / 0.6) 50%, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-56 lg:w-96 z-10" style={{ background: "linear-gradient(to left, hsl(220 15% 5%), hsl(220 15% 5% / 0.95) 20%, hsl(220 15% 5% / 0.6) 50%, transparent)" }} />
        <div className="flex shrink-0" style={{ animation: `${reverse ? "ticker-scroll-reverse" : "ticker-scroll"} ${speed}s linear infinite` }}>
          {repeated.map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="group relative flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-2 mx-px rounded-lg border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 cursor-default select-none hover:bg-white/[0.08] hover:border-white/[0.15]" style={{ boxShadow: `0 0 20px -10px ${brand.color}30` }}>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `0 0 40px -6px ${brand.color}60, inset 0 0 25px -8px ${brand.color}30` }} />
              <div className="absolute inset-0 rounded-xl opacity-[0.05]" style={{ boxShadow: `inset 0 0 20px -8px ${brand.color}` }} />
              <div className="w-5 h-5 lg:w-6 lg:h-6 transition-all duration-500 group-hover:scale-110 relative z-10" style={{ color: brand.color }}>
                <brand.Logo className="w-full h-full" />
              </div>
              <span className="text-xs lg:text-sm font-bold transition-all duration-500 whitespace-nowrap tracking-tight group-hover:brightness-125 relative z-10" style={{ color: brand.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-10 lg:py-14 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 15% 4%) 0%, hsl(230 12% 5%) 100%)" }}>
      <GlowOrb color="hsl(28 100% 50%)" size={800} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={220} opacity={0.08} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="bottom-0 right-1/4" blur={160} opacity={0.05} />
      <NoiseOverlay opacity={0.03} />
      <div className="relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-2 tracking-[0.2em] uppercase">{t.tickerTitle}</p>
          <p className="text-center text-xs text-white/25 mb-8">{t.tickerSub}</p>
        </FadeIn>
        <div className="flex flex-col gap-3">
          <TickerRow items={row1Brands} speed={35} />
          <TickerRow items={row2Brands} reverse speed={40} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STATUS BAR
   ═══════════════════════════════════════════════════ */
function StatusBar() {
  const { t, lang } = useI18n();
  const items = [
    { icon: Globe, label: t.statusGlobal },
    { icon: Smartphone, label: t.statusApple },
    { icon: Zap, label: t.statusInstant },
    { icon: Shield, label: t.statusSecurity },
  ];
  return (
    <section className="py-10 border-b border-border/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-card/40 backdrop-blur-xl" />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-wrap justify-center gap-10 lg:gap-20">
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 text-sm text-muted-foreground font-medium cursor-default">
                <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary/80" />
                </div>
                {item.label}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   AI USE CASES
   ═══════════════════════════════════════════════════ */
function AIUseCases() {
  const { t, lang } = useI18n();
  const services = [
    { icon: Bot, name: "ChatGPT", desc: t.aiChatGPT },
    { icon: Brain, name: "Claude", desc: t.aiClaude },
    { icon: Sparkles, name: "Midjourney", desc: t.aiMidjourney },
  ];
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(220 15% 6%) 50%, hsl(0 0% 4%) 100%)" }}>
      <GlowOrb color="hsl(28 100% 50%)" size={700} position="top-0 left-1/2 -translate-x-1/2" blur={180} opacity={0.06} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="bottom-1/4 right-0" blur={160} opacity={0.04} />
      <NoiseOverlay opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
        <FadeIn>
          <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.aiTag}</p>
          <h2 className="section-title text-white mb-6 leading-tight">
            {t.aiTitle1}<span className="gradient-text">{t.aiTitle2}</span>
          </h2>
          <p className="text-lg text-white/30 mb-16 max-w-lg mx-auto">{t.aiDesc}</p>
        </FadeIn>
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-5 sm:gap-8 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.12}>
              <motion.div whileHover={{ scale: 1.04, y: -4 }} className="flex items-center gap-5 px-8 sm:px-10 py-7 sm:py-8 rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl transition-all cursor-default w-full sm:w-auto" style={{ boxShadow: "0 20px 60px -15px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.05)" }}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0" style={{ boxShadow: "0 0 30px -8px hsl(28 100% 50% / 0.2)" }}>
                  <s.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <div className="text-left">
                  <span className="font-bold text-white text-lg block">{s.name}</span>
                  <span className="text-xs text-white/30">{s.desc}</span>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════ */
function StepsOverview() {
  const { t, lang } = useI18n();
  const steps = [
    { icon: UserPlus, num: "01", title: t.step1Title, desc: t.step1Desc, gradient: "from-orange-500 to-amber-400" },
    { icon: ShieldCheck, num: "02", title: t.step2Title, desc: t.step2Desc, gradient: "from-amber-400 to-orange-500" },
    { icon: CreditCard, num: "03", title: t.step3Title, desc: t.step3Desc, gradient: "from-orange-500 to-rose-500" },
    { icon: Wallet, num: "04", title: t.step4Title, desc: t.step4Desc, gradient: "from-rose-500 to-orange-500" },
    { icon: Globe, num: "05", title: t.step5Title, desc: t.step5Desc, gradient: "from-orange-500 to-amber-400" },
  ];
  return (
    <section id="how-it-works" className="py-28 lg:py-36 relative overflow-hidden bg-background scroll-mt-20">
      <NoiseOverlay opacity={0.02} />
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="top-0 right-1/4" blur={200} opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={400} position="bottom-0 left-1/4" blur={180} opacity={0.03} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading tag={t.stepsTag} title={t.stepsTitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6 max-w-7xl mx-auto">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.05, y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="h-full">
                <GlassCard className="text-center p-8 lg:p-10 relative h-full min-h-[240px] flex flex-col items-center justify-start group" hover={false}>
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 60px -20px hsl(28 100% 50% / 0.08), 0 0 80px -20px hsl(28 100% 50% / 0.1)" }} />
                  <div className="mb-4 text-[10px] font-bold text-primary/50 tracking-[0.35em] uppercase">{t.stepsStep} {s.num}</div>
                  <div className="relative mx-auto mb-7">
                    <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${s.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center`} style={{ boxShadow: "0 12px 40px -8px hsl(28 100% 50% / 0.4)" }}>
                      <s.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                    </div>
                    <motion.div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${s.gradient}`} animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }} style={{ boxShadow: "0 0 12px hsl(28 100% 50% / 0.5)" }} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden xl:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/20 to-transparent" />
                  )}
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </GlassCard>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PROBLEM
   ═══════════════════════════════════════════════════ */
function ProblemSection() {
  const { t, lang } = useI18n();
  const problems = [t.problem1, t.problem2, t.problem3, t.problem4];
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(350 20% 5%) 50%, hsl(0 0% 3%) 100%)" }}>
      <NoiseOverlay opacity={0.05} />
      <GlowOrb color="hsl(0 60% 35%)" size={600} position="top-1/4 left-1/3" blur={180} opacity={0.06} />
      <GlowOrb color="hsl(0 60% 40%)" size={300} position="bottom-1/4 right-1/4" blur={140} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-destructive/70 mb-4 tracking-[0.2em] uppercase">{t.problemTag}</p>
          <h2 className="text-center section-title text-white mb-8 leading-tight">
            {t.problemTitle1}<span className="gradient-text">{t.problemTitle2}</span>
          </h2>
          <p className="text-center text-lg text-white/25 mb-16 max-w-md mx-auto">{t.problemDesc}</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-16">
          {problems.map((p, i) => (
            <FadeIn key={p} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.03, borderColor: "rgba(255,100,100,0.15)" }} className="flex items-center gap-4 rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl p-7 transition-all cursor-default h-full" style={{ boxShadow: "0 20px 50px -15px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.03)" }}>
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/10 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-destructive/70" />
                </div>
                <span className="text-white/60 font-medium">{p}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <motion.div whileHover={{ scale: 1.02 }} className="max-w-md mx-auto text-center rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-2xl p-8" style={{ boxShadow: "0 0 60px -15px hsl(28 100% 50% / 0.2)" }}>
            <Check className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-xl font-bold text-white mb-2">{t.solutionTitle1}<span className="gradient-text">{t.solutionTitle2}</span></p>
            <p className="text-sm text-white/40">{t.solutionDesc}</p>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY THIS CARD WORKS
   ═══════════════════════════════════════════════════ */
function WhyItWorks() {
  const { t, lang } = useI18n();
  return (
    <section className="py-36 lg:py-44 bg-background relative overflow-hidden">
      <GlowOrb color="hsl(28 100% 50%)" size={800} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={220} opacity={0.05} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="top-0 right-0" blur={180} opacity={0.03} />
      <NoiseOverlay />
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center relative z-10">
        <FadeIn>
          <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.whyTag}</p>
          <h2 className="section-title text-foreground mb-8 leading-tight">
            {t.whyTitle1}<span className="gradient-text">{t.whyTitle2}</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-20 max-w-xl mx-auto">{t.whyDesc}</p>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { icon: Globe, label: t.whyCard1, desc: t.whyCard1Desc, gradient: "from-orange-500 to-amber-400" },
            { icon: Layers, label: t.whyCard2, desc: t.whyCard2Desc, gradient: "from-amber-400 to-orange-500" },
            { icon: Zap, label: t.whyCard3, desc: t.whyCard3Desc, gradient: "from-orange-500 to-rose-500" },
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.12}>
              <motion.div whileHover={{ scale: 1.05, y: -8 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                <GlassCard className="p-10 h-full flex flex-col items-center justify-start" hover={false}>
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 60px -20px hsl(28 100% 50% / 0.08), 0 0 80px -20px hsl(28 100% 50% / 0.1)" }} />
                  <div className="relative mx-auto mb-7">
                    <div className={`absolute -inset-3 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`} style={{ boxShadow: "0 12px 40px -8px hsl(28 100% 50% / 0.35)" }}>
                      <item.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </GlassCard>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   COMPARISON TABLE
   ═══════════════════════════════════════════════════ */
function ComparisonSection() {
  const { t, lang } = useI18n();
  const rows = [
    { label: t.compAI, old: false, zc: true },
    { label: t.compGlobal, old: false, zc: true },
    { label: t.compFees, oldText: t.compFeesPaid, zcText: "0€" },
    { label: t.compRestrictions, oldText: t.compRestYes, zcText: t.compRestNone },
    { label: t.compCashback, oldText: t.compCashbackRare, zcText: t.compCashbackVal },
    { label: t.compYield, old: false, zc: true },
  ];
  return (
    <section className="py-36 lg:py-44 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 15% 4%) 0%, hsl(260 15% 5%) 50%, hsl(220 15% 3%) 100%)" }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={800} position="top-0 left-1/2 -translate-x-1/2" blur={200} opacity={0.08} />
      <GlowOrb color="hsl(270 70% 55%)" size={500} position="bottom-0 right-1/4" blur={160} opacity={0.05} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.compTag}</p>
          <h2 className="section-title text-center text-white mb-8 leading-tight">
            {t.compTitle1}<span className="gradient-text">{t.compTitle2}</span>
          </h2>
          <p className="text-center text-lg text-white/30 mb-20 max-w-lg mx-auto">{t.compDesc}</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <motion.div whileHover={{ scale: 1.01 }} className="max-w-2xl mx-auto rounded-[2rem] overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl" style={{ boxShadow: "0 40px 100px -25px rgba(0,0,0,0.6), 0 0 80px -30px hsl(28 100% 50% / 0.12)" }}>
            <div className="grid grid-cols-3 px-8 py-7 border-b border-white/[0.06]">
              <span />
              <span className="text-sm font-semibold text-white/25 text-center">{t.compRegular}</span>
              <span className="text-sm font-bold text-primary text-center">Zerocard</span>
            </div>
            {rows.map((r, i) => (
              <motion.div key={r.label} whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }} className={`grid grid-cols-3 items-center px-8 py-7 transition-colors ${i < rows.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
                <span className="text-sm text-white/40 font-medium">{r.label}</span>
                <div className="flex justify-center">
                  {r.oldText ? <span className="text-sm text-white/20">{r.oldText}</span> :
                   r.old === false ? <X className="w-5 h-5 text-destructive/50" /> :
                   <Check className="w-5 h-5 text-green-400" />}
                </div>
                <div className="flex justify-center">
                  {r.zcText ? <span className="text-sm font-bold text-primary">{r.zcText}</span> :
                   r.zc ? <Check className="w-5 h-5 text-green-400" /> :
                   <X className="w-5 h-5 text-destructive/50" />}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   GUIDE
   ═══════════════════════════════════════════════════ */
function GuideSection() {
  const { t, lang } = useI18n();
  const steps = [
    { num: "01", title: t.guide1Title, desc: t.guide1Desc, cta: true },
    { num: "02", title: t.guide2Title, desc: t.guide2Desc },
    { num: "03", title: t.guide3Title, desc: t.guide3Desc },
    { num: "04", title: t.guide4Title, desc: t.guide4Desc },
    { num: "05", title: t.guide5Title, desc: t.guide5Desc },
  ];
  return (
    <section className="py-36 lg:py-44 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="-top-20 right-1/4" blur={200} opacity={0.04} />
      <GlowOrb color="hsl(340 80% 55%)" size={300} position="bottom-0 left-1/4" blur={160} opacity={0.03} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading tag={t.guideTag} title={<>{t.guideTitle1}<span className="gradient-text">{t.guideTitle2}</span></>} subtitle={t.guideSub} />
        <div className="max-w-2xl mx-auto space-y-6">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.08}>
              <motion.div whileHover={{ scale: 1.02, x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <GlassCard className="flex items-center gap-6 p-8 lg:p-9">
                  <div className="text-3xl font-bold gradient-text flex-shrink-0 w-14 text-center">{s.num}</div>
                  <div className="w-px h-12 bg-border/20 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                  {s.cta && (
                    <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 rounded-2xl gradient-bg px-7 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ boxShadow: "0 10px 30px -8px hsl(28 100% 50% / 0.4)" }}>
                      {t.guideStart} <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </GlassCard>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   BENEFITS
   ═══════════════════════════════════════════════════ */
function BenefitsSection() {
  const { t, lang } = useI18n();
  const benefits = [
    { icon: Bot, title: t.benAI, desc: t.benAIDesc },
    { icon: Globe, title: t.benGlobal, desc: t.benGlobalDesc },
    { icon: CreditCard, title: t.benFree, desc: t.benFreeDesc },
    { icon: Coins, title: t.benNoFees, desc: t.benNoFeesDesc },
    { icon: TrendingUp, title: t.benCashback, desc: t.benCashbackDesc },
    { icon: CircleDollarSign, title: t.benYield, desc: t.benYieldDesc },
  ];
  return (
    <section className="py-36 lg:py-44 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 10% 4%) 0%, hsl(220 15% 6%) 50%, hsl(220 10% 3%) 100%)" }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="top-1/4 left-1/4" blur={180} opacity={0.05} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="bottom-1/4 right-1/4" blur={160} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.benefitsTag}</p>
          <h2 className="text-center section-title text-white mb-20 leading-tight">
            {t.benefitsTitle1}<span className="gradient-text">{t.benefitsTitle2}</span>
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <motion.div whileHover={{ scale: 1.04, y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
                <div className="p-10 rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl transition-all h-full" style={{ boxShadow: "0 20px 60px -15px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.04)" }}>
                  <div className="mb-7 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center" style={{ boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.2)" }}>
                    <b.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{b.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY IT'S SAFE
   ═══════════════════════════════════════════════════ */
function SafetySection() {
  const { t, lang } = useI18n();
  const safetyPoints = [
    { icon: Shield, title: t.safe1Title, desc: t.safe1Desc, gradient: "from-emerald-500 to-teal-400" },
    { icon: Fingerprint, title: t.safe2Title, desc: t.safe2Desc, gradient: "from-orange-500 to-amber-400" },
    { icon: Lock, title: t.safe3Title, desc: t.safe3Desc, gradient: "from-violet-500 to-purple-400" },
    { icon: Layers, title: t.safe4Title, desc: t.safe4Desc, gradient: "from-blue-500 to-cyan-400" },
  ];
  return (
    <section id="safety" className="py-32 lg:py-40 relative overflow-hidden scroll-mt-20" style={{ background: "linear-gradient(180deg, hsl(220 12% 4%) 0%, hsl(200 15% 6%) 50%, hsl(220 12% 3%) 100%)" }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(160 60% 40%)" size={700} position="top-1/4 left-1/3" blur={200} opacity={0.06} />
      <GlowOrb color="hsl(28 100% 50%)" size={500} position="bottom-1/4 right-1/4" blur={180} opacity={0.05} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.safetyTag}</p>
          <h2 className="section-title text-white mb-8 leading-tight text-center">
            {t.safetyTitle1}<span className="gradient-text">{t.safetyTitle2}</span>
          </h2>
          <p className="text-center text-lg text-white/30 mb-16 max-w-lg mx-auto">{t.safetyDesc}</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {safetyPoints.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.12}>
              <motion.div whileHover={{ scale: 1.05, y: -8 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                <div className="relative group rounded-3xl overflow-hidden h-full">
                  <div className="absolute inset-0 rounded-3xl p-[1px]" style={{ background: "linear-gradient(135deg, hsl(0 0% 100% / 0.1), hsl(28 100% 50% / 0.15), hsl(0 0% 100% / 0.05))" }}>
                    <div className="w-full h-full rounded-3xl bg-white/[0.04] backdrop-blur-2xl" />
                  </div>
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "0 25px 80px -20px hsl(28 100% 50% / 0.15), inset 0 0 60px -20px hsl(28 100% 50% / 0.06)" }} />
                  <div className="relative z-10 p-10 lg:p-12 text-center">
                    <div className="relative mx-auto mb-7">
                      <div className={`absolute -inset-3 rounded-2xl bg-gradient-to-br ${s.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto`} style={{ boxShadow: "0 12px 40px -8px hsl(28 100% 50% / 0.35)" }}>
                        <s.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TRUST
   ═══════════════════════════════════════════════════ */
function TrustSection() {
  const { t, lang } = useI18n();
  return (
    <section className="py-36 lg:py-44 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={700} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={220} opacity={0.05} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="mx-auto mb-10 w-22 h-22 rounded-3xl bg-primary/8 border border-primary/10 flex items-center justify-center" style={{ width: 88, height: 88, boxShadow: "0 0 80px -10px hsl(28 100% 50% / 0.2)" }}>
              <Shield className="w-9 h-9 text-primary" />
            </div>
            <h2 className="section-title text-foreground mb-8 leading-tight">
              {t.trustTitle1}
              <br />
              {t.trustTitle2}<span className="gradient-text">{t.trustTitle3}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-16">{t.trustDesc}</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid sm:grid-cols-3 gap-7 mb-16">
              {[
                { icon: Lock, label: t.trustSec },
                { icon: Fingerprint, label: t.trustKYC },
                { icon: BadgeCheck, label: t.trustSince },
              ].map((item) => (
                <motion.div key={item.label} whileHover={{ scale: 1.04, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <GlassCard className="p-9 flex flex-col items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center" style={{ boxShadow: "0 0 30px -8px hsl(28 100% 50% / 0.12)" }}>
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-foreground">{item.label}</span>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-xs text-muted-foreground mb-5 tracking-widest uppercase">{t.trustPowered}</p>
            <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-3 rounded-2xl border border-border/20 bg-card/60 backdrop-blur-2xl px-10 py-5 cursor-default" style={{ boxShadow: "0 12px 40px -12px rgba(0,0,0,0.1)" }}>
              <span className="text-2xl font-bold gradient-text tracking-tight">Pionex</span>
            </motion.div>
            <p className="mt-5 text-xs text-muted-foreground/60">{t.trustPlatform}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY BETTER THAN BANKS
   ═══════════════════════════════════════════════════ */
function BetterThanBanks() {
  const { t, lang } = useI18n();
  const reasons = [
    { icon: Globe, title: t.bank1Title, desc: t.bank1Desc },
    { icon: Zap, title: t.bank2Title, desc: t.bank2Desc },
    { icon: Coins, title: t.bank3Title, desc: t.bank3Desc },
    { icon: Lock, title: t.bank4Title, desc: t.bank4Desc },
  ];
  return (
    <section id="why-better" className="py-32 lg:py-40 relative overflow-hidden scroll-mt-20" style={{ background: "linear-gradient(180deg, hsl(220 12% 4%) 0%, hsl(240 15% 6%) 50%, hsl(220 12% 3%) 100%)" }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={700} position="top-1/4 right-1/4" blur={200} opacity={0.06} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="bottom-1/4 left-1/4" blur={160} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.bankTag}</p>
          <h2 className="section-title text-white mb-8 leading-tight text-center">
            {t.bankTitle1}<span className="gradient-text">{t.bankTitle2}</span>
          </h2>
          <p className="text-center text-lg text-white/30 mb-16 max-w-lg mx-auto">{t.bankDesc}</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.04, y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                <div className="relative group rounded-3xl overflow-hidden h-full">
                  <div className="absolute inset-0 rounded-3xl p-[1px]" style={{ background: "linear-gradient(135deg, hsl(28 100% 50% / 0.2), hsl(0 0% 100% / 0.06), hsl(270 70% 55% / 0.1))" }}>
                    <div className="w-full h-full rounded-3xl bg-white/[0.04] backdrop-blur-2xl" />
                  </div>
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "0 25px 80px -20px hsl(28 100% 50% / 0.15), inset 0 0 40px -15px hsl(28 100% 50% / 0.05)" }} />
                  <div className="relative z-10 p-8 lg:p-10 flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0" style={{ boxShadow: "0 0 30px -8px hsl(28 100% 50% / 0.2)" }}>
                      <r.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{r.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STANDARD PROCESS
   ═══════════════════════════════════════════════════ */
function StandardProcess() {
  const { t, lang } = useI18n();
  const points = [
    { icon: Fingerprint, title: t.std1Title, desc: t.std1Desc },
    { icon: ShieldCheck, title: t.std2Title, desc: t.std2Desc },
    { icon: Smartphone, title: t.std3Title, desc: t.std3Desc },
  ];
  return (
    <section className="py-32 lg:py-40 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={200} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-4xl">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.stdTag}</p>
          <h2 className="section-title text-foreground mb-6 leading-tight text-center">
            {t.stdTitle1}<span className="gradient-text">{t.stdTitle2}</span>
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-lg mx-auto leading-relaxed">{t.stdDesc}</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-7">
          {points.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.12}>
              <motion.div whileHover={{ scale: 1.05, y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
                <GlassCard className="p-10 text-center h-full">
                  <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center" style={{ boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.15)" }}>
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </GlassCard>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FEAR / OBJECTION
   ═══════════════════════════════════════════════════ */
function FearSection() {
  const { t, lang } = useI18n();
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(220 10% 5%) 100%)" }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={500} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={180} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 text-center max-w-2xl relative z-10">
        <FadeIn>
          <h2 className="section-title text-white mb-10 leading-tight">
            {t.fearTitle1}<span className="gradient-text">{t.fearTitle2}</span>
          </h2>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl p-12" style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.4)" }}>
            <p className="text-2xl text-white/80 font-semibold mb-4">{t.fearNo}</p>
            <p className="text-lg text-white/40 leading-relaxed">
              {t.fearDesc1}
              <br />
              {t.fearDesc2}
              <br />
              <span className="text-white/25">{t.fearDesc3}</span>
            </p>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   EXTRA
   ═══════════════════════════════════════════════════ */
function ExtraSection() {
  const { t, lang } = useI18n();
  return (
    <section className="py-36 lg:py-44 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={500} position="top-1/3 left-1/3" blur={180} opacity={0.03} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <FadeIn>
            <motion.div whileHover={{ scale: 1.03, y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <GlassCard className="p-12 lg:p-14 h-full">
                <div className="mb-7 w-16 h-16 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center" style={{ boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.18)" }}>
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t.extraYield}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.extraYieldDesc}</p>
              </GlassCard>
            </motion.div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <motion.div whileHover={{ scale: 1.03, y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <GlassCard className="p-12 lg:p-14 h-full">
                <div className="mb-7 w-16 h-16 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center" style={{ boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.18)" }}>
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t.extraRef}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.extraRefDesc}</p>
              </GlassCard>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOMO
   ═══════════════════════════════════════════════════ */
function FOMOSection() {
  const { t, lang } = useI18n();
  return (
    <section className="py-36 lg:py-44 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(28 20% 5%) 50%, hsl(0 0% 2%) 100%)" }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={700} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={200} opacity={0.08} />
      <GlowOrb color="hsl(340 80% 55%)" size={400} position="bottom-0 left-1/4" blur={160} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 max-w-2xl">
        <FadeIn>
          <div className="mx-auto mb-10 w-20 h-20 rounded-3xl bg-primary/10 border border-primary/15 flex items-center justify-center" style={{ boxShadow: "0 0 60px -10px hsl(28 100% 50% / 0.25)" }}>
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="section-title text-white mb-8 leading-tight">
            {t.fomoTitle1}<span className="gradient-text">{t.fomoTitle2}</span>
          </h2>
          <p className="text-lg text-white/30 leading-relaxed mb-16">{t.fomoDesc}</p>
          <CTAButton text={t.heroCTA} size="large" />
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════ */
function FinalCTA() {
  const { t, lang } = useI18n();
  const quickSteps = [
    { icon: UserPlus, label: t.final1 },
    { icon: ShieldCheck, label: t.final2 },
    { icon: CreditCard, label: t.final3 },
  ];
  return (
    <section className="py-36 lg:py-48 relative overflow-hidden bg-background">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={900} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={250} opacity={0.07} />
      <GlowOrb color="hsl(340 80% 55%)" size={500} position="bottom-0 right-1/4" blur={180} opacity={0.04} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="top-0 left-1/4" blur={160} opacity={0.03} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight">{t.finalTitle}</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">{t.finalDesc}</p>
          <div className="flex flex-wrap justify-center gap-6 mb-14">
            {quickSteps.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center" style={{ boxShadow: "0 0 20px -6px hsl(28 100% 50% / 0.2)" }}>
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">{s.label}</span>
              </div>
            ))}
          </div>
          <CTAButton text={t.heroCTA} size="large" />
          <p className="mt-8 text-sm text-muted-foreground/60">{t.finalSub}</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */
function Footer() {
  const { t, lang } = useI18n();
  return (
    <footer className="py-14 border-t border-border/10 bg-background">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[9px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(28 100% 50%), hsl(340 80% 55%))" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="3" width="11" height="8" rx="2" stroke="white" strokeWidth="1.3" fill="none" opacity="0.6" />
              <rect x="4" y="5" width="11" height="8" rx="2" stroke="white" strokeWidth="1.3" fill="white" fillOpacity="0.15" />
              <circle cx="12" cy="9" r="1.2" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">Zero<span className="font-light">card</span></span>
        </div>
        <p className="text-xs text-muted-foreground/50">© {new Date().getFullYear()} Zerocard. {t.footerCopy}</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   LANGUAGE SWITCHER
   ═══════════════════════════════════════════════════ */
function LangSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center rounded-full border border-border/20 bg-foreground/5 backdrop-blur-xl p-0.5">
      {(["en", "ru"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`relative px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            lang === l
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang === l && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-destructive"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{l}</span>
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STICKY NAVBAR
   ═══════════════════════════════════════════════════ */
function Navbar() {
  const { t, lang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { label: t.navHowItWorks, href: "#how-it-works" },
    { label: t.navWhyZerocard, href: "#why-better" },
    { label: t.navSafety, href: "#safety" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/15 shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between h-16 lg:h-[72px]">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(28 100% 50%), hsl(340 80% 55%))",
                boxShadow: scrolled ? "0 0 24px -4px hsl(28 100% 50% / 0.35)" : "none",
              }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="3" width="11" height="8" rx="2" stroke="white" strokeWidth="1.3" fill="none" opacity="0.6" />
                <rect x="4" y="5" width="11" height="8" rx="2" stroke="white" strokeWidth="1.3" fill="white" fillOpacity="0.15" />
                <circle cx="12" cy="9" r="1.2" fill="white" opacity="0.9" />
              </svg>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              Zero<span className="font-light">card</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LangSwitcher />
            <motion.a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 rounded-full font-semibold text-sm text-white px-5 py-2.5 transition-all duration-300 ${
                scrolled
                  ? "bg-gradient-to-r from-primary via-primary to-destructive shadow-lg shadow-primary/25"
                  : "bg-foreground/10 backdrop-blur-sm hover:bg-foreground/20"
              }`}
            >
              {t.navGetCard}
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* Mobile: lang + burger */}
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-foreground/80 hover:bg-foreground/5 transition-colors"
              aria-label="Menu"
            >
              <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-6 pb-6 pt-2 space-y-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl text-base font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors">
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full rounded-full font-semibold text-sm text-white px-5 py-3 bg-gradient-to-r from-primary via-primary to-destructive shadow-lg shadow-primary/25">
                {t.navGetCard}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {mobileOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}

const Index = () => (
  <div className="min-h-screen overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <InfrastructureSection />
    <ScrollingTicker />
    <StatusBar />
    <AIUseCases />
    <StepsOverview />
    <ProblemSection />
    <WhyItWorks />
    <ComparisonSection />
    <BetterThanBanks />
    <GuideSection />
    <BenefitsSection />
    <StandardProcess />
    <SafetySection />
    <TrustSection />
    <FearSection />
    <ExtraSection />
    <FOMOSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
