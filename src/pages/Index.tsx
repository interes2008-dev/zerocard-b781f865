import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import cardImage from "@/assets/zerocard-orange.png";
import pionexCardImage from "@/assets/pionex-card.png";
import { row1Brands, row2Brands } from "@/components/BrandLogos";
import { useI18n, Lang } from "@/lib/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CreditCard, Wallet, ShoppingCart, Globe, Shield, TrendingUp, Zap, UserPlus, ShieldCheck,
  ArrowRight, Check, X, Coins, Users, Clock, ChevronRight, Sparkles,
  BadgeCheck, CircleDollarSign, Bot, Smartphone, Lock, Layers,
  Fingerprint, Brain, Plane, Menu, HelpCircle, ExternalLink,
} from "lucide-react";

const SIGNUP_URL = "https://www.pionex.com/ru/signUp?r=0uHzysLVYQh";

/* ─── Consistent section wrapper ─── */
const SECTION_WHITE = "bg-background";
const SECTION_GRAY = "bg-muted/40";
const SECTION_PADDING = "py-24 lg:py-32";
const INNER = "max-w-6xl mx-auto px-6 lg:px-20";

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
      <div className="text-center mb-14 lg:mb-20">
        <p className="text-xs font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{tag}</p>
        <h2 className="section-title text-foreground mb-5">{title}</h2>
        {subtitle && <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">{subtitle}</p>}
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
      className={`inline-flex items-center justify-center gap-3 rounded-full gradient-bg text-white font-semibold transition-all ${
        size === "large" ? "w-full sm:w-auto px-10 py-4 text-base" : "px-8 py-3.5 text-sm"
      }`}
      style={{ boxShadow: "0 16px 60px -12px hsl(28 100% 50% / 0.45), 0 8px 24px -8px hsl(340 80% 55% / 0.2)" }}
    >
      {text}
      <ArrowRight className={size === "large" ? "w-5 h-5" : "w-4 h-4"} />
    </motion.a>
  );
}

/* ─── Glass Card ─── */
function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`relative rounded-2xl border border-border/30 bg-card shadow-sm ${hover ? "hover:border-primary/15 hover:shadow-md transition-all duration-500" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Hero Ticker Row ─── */


/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
function HeroSection() {
  const { t, lang } = useI18n();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center overflow-hidden bg-background">
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Ambient light */}
      <div className="absolute top-[10%] right-[8%] w-[900px] h-[900px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(28 100% 50% / 0.06), transparent 55%)", filter: "blur(120px)" }} />
      <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(220 60% 60% / 0.03), transparent 60%)", filter: "blur(100px)" }} />

      <div className={`${INNER} py-28 lg:py-0 relative z-10 w-full`}>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Copy ── */}
          <motion.div style={{ y: textY }} className="max-w-xl">
            <FadeIn>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2.5 rounded-lg border border-primary/10 bg-primary/[0.04] px-4 py-1.5 text-[11px] font-semibold text-primary uppercase tracking-[0.18em]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t.heroBadge}
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="sr-only">{t.seoH1}</h1>
              <p className="mt-7 text-[2.25rem] sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-extrabold text-foreground leading-[1.08] tracking-[-0.03em]" aria-hidden="true">
                <span className="block whitespace-nowrap"><span className="gradient-text">{t.heroTitle1}</span>{t.heroTitle2}</span>
                <span className="block">{t.heroTitle3}</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p className="mt-5 text-[17px] text-muted-foreground leading-relaxed max-w-md">
                {t.heroDesc1}
              </p>
              <p className="mt-2.5 text-[13px] font-medium text-muted-foreground/60">
                {t.heroPowered} <span className="gradient-text font-bold">Pionex</span> {t.heroInfra}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <CTAButton text={t.heroCTA} size="large" />
              </div>
            </FadeIn>

            <FadeIn delay={0.26}>
              <div className="mt-8 flex items-center gap-3 flex-wrap">
                {[
                  { value: "0€", label: lang === "ru" ? "выпуск" : "fees" },
                  { value: "5 min", label: lang === "ru" ? "старт" : "setup" },
                  { value: "150+", label: lang === "ru" ? "стран" : "countries" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/50 px-3.5 py-2">
                    <span className="text-sm font-bold text-foreground">{stat.value}</span>
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.32}>
              <div className="mt-6 flex items-center gap-4 flex-wrap">
                {[t.heroFeat1, t.heroFeat2, t.heroFeat3].map((feat) => (
                  <span key={feat} className="flex items-center gap-1.5 text-[12px] text-muted-foreground font-medium">
                    <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-primary" />
                    </div>
                    {feat}
                  </span>
                ))}
              </div>
            </FadeIn>
          </motion.div>

          {/* ── RIGHT: Card visual ── */}
          <FadeIn delay={0.15} className="relative flex justify-center lg:justify-end">
            <motion.div style={{ y: cardY }} className="relative w-full max-w-[380px] lg:max-w-[480px]">
              <div className="absolute inset-0 scale-[1.4] blur-[120px] opacity-30"
                style={{ background: "radial-gradient(circle, hsl(28 100% 55%), transparent 65%)" }} />

              <motion.div animate={{ y: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
                <motion.div
                  whileHover={{ rotateY: 8, rotateX: -4, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1200 }}
                >
                  <img src={cardImage} alt="Zerocard — global payment card" className="w-full rounded-2xl relative z-10"
                    style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.2)) drop-shadow(0 16px 32px rgba(255,122,0,0.2))" }} />
                  <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
                    style={{ background: "linear-gradient(125deg, hsl(0 0% 100% / 0.15) 0%, transparent 30%, transparent 70%, hsl(0 0% 100% / 0.04) 100%)" }} />
                </motion.div>
              </motion.div>

              <motion.div animate={{ y: [0, -10, 0], x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 lg:-right-6 rounded-xl bg-foreground/90 backdrop-blur-xl px-4 py-2.5 z-30 flex items-center gap-2"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}>
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-white">{t.heroCashback}</span>
              </motion.div>

              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-2 -left-4 lg:-left-8 rounded-xl bg-card border border-border px-4 py-2.5 z-30 flex items-center gap-2"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">{t.heroCountries}</span>
              </motion.div>
            </motion.div>
          </FadeIn>
        </div>
      </div>



    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAYMENT WALLET
   ═══════════════════════════════════════════════════ */
function PaymentWalletSection() {
  const { t } = useI18n();
  return (
    <section className={`${SECTION_PADDING} ${SECTION_GRAY} relative overflow-hidden`}>
      <div className={`${INNER} relative z-10`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="max-w-lg">
              <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.walletTag}</p>
              <h2 className="text-3xl lg:text-4xl xl:text-[2.75rem] font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight">
                <span className="block whitespace-nowrap">{t.walletTitle1}</span>
                <span className="block text-foreground/80">{t.walletTitle2}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">{t.walletDesc}</p>
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-5 mb-6">
                <p className="text-sm text-muted-foreground flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {t.walletNote}
                </p>
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2.5 rounded-full bg-primary/8 border border-primary/15 px-6 py-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">{t.walletReady}</span>
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 scale-[1.3] blur-[80px] opacity-40" style={{
                background: "radial-gradient(circle, hsl(0 0% 100% / 0.3), transparent 70%)",
              }} />
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}>
                <img src={pionexCardImage} alt="Pionex Card" className="relative z-10 w-full max-w-[480px] rounded-3xl"
                  style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.3))" }} />
              </motion.div>
              <motion.div animate={{ y: [0, -8, 0], x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-3 -right-2 lg:right-4 z-20 rounded-2xl bg-white/95 backdrop-blur-xl px-4 py-2.5 flex items-center gap-2"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}>
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-foreground">150+ {t.heroStat1?.toLowerCase()}</span>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-2 -left-2 lg:left-4 z-20 rounded-2xl bg-white/95 backdrop-blur-xl px-4 py-2.5 flex items-center gap-2"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-foreground">Mastercard®</span>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   INFRASTRUCTURE
   ═══════════════════════════════════════════════════ */
function InfrastructureSection() {
  const { t } = useI18n();
  const cards = [
    { icon: Shield, title: t.infraCard1Title, desc: t.infraCard1Desc, gradient: "from-emerald-500 to-teal-400" },
    { icon: Zap, title: t.infraCard2Title, desc: t.infraCard2Desc, gradient: "from-orange-500 to-amber-400" },
    { icon: Clock, title: t.infraCard3Title, desc: t.infraCard3Desc, gradient: "from-violet-500 to-purple-400" },
  ];
  return (
    <section className={`${SECTION_PADDING} ${SECTION_GRAY} relative overflow-hidden`}>
      <div className={`${INNER} relative z-10`}>
        <SectionHeading
          tag={t.infraTag}
          title={<>{t.infraTitle1}<span className="gradient-text">{t.infraTitle2}</span></>}
          subtitle={t.infraDesc}
        />
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.12}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                <GlassCard className="text-center p-8 lg:p-10 h-full group" hover={false}>
                  <div className="relative mx-auto mb-6">
                    <div className={`absolute -inset-3 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-15 blur-xl group-hover:opacity-25 transition-opacity duration-500`} />
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mx-auto`}
                      style={{ boxShadow: "0 12px 40px -8px hsl(28 100% 50% / 0.2)" }}>
                      <c.icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </GlassCard>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div className="text-center">
            <p className="text-xs text-muted-foreground/50 mb-4 tracking-widest uppercase">{t.infraPoweredBy}</p>
            <motion.div whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-10 py-5 cursor-default shadow-sm">
              <span className="text-xl font-bold gradient-text tracking-tight">Pionex</span>
              <span className="text-xs text-muted-foreground font-medium">{t.infraSince}</span>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════ */
function StepsOverview() {
  const { t } = useI18n();
  const steps = [
    { icon: UserPlus, num: "01", title: t.step1Title, desc: t.step1Desc, gradient: "from-orange-500 to-amber-400" },
    { icon: ShieldCheck, num: "02", title: t.step2Title, desc: t.step2Desc, gradient: "from-amber-400 to-orange-500" },
    { icon: CreditCard, num: "03", title: t.step3Title, desc: t.step3Desc, gradient: "from-orange-500 to-rose-500" },
    { icon: Wallet, num: "04", title: t.step4Title, desc: t.step4Desc, gradient: "from-rose-500 to-orange-500" },
    { icon: Globe, num: "05", title: t.step5Title, desc: t.step5Desc, gradient: "from-orange-500 to-amber-400" },
  ];
  return (
    <section id="how-it-works" className={`${SECTION_PADDING} ${SECTION_WHITE} relative overflow-hidden scroll-mt-20`}>
      <div className={`${INNER} relative z-10`}>
        <SectionHeading tag={t.stepsTag} title={t.stepsTitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="h-full">
                <GlassCard className="text-center p-7 lg:p-8 relative h-full min-h-[220px] flex flex-col items-center justify-start group" hover={false}>
                  <div className="mb-3 text-[10px] font-bold text-primary/50 tracking-[0.35em] uppercase">{t.stepsStep} {s.num}</div>
                  <div className="relative mx-auto mb-5">
                    <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${s.gradient} opacity-15 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center`}
                      style={{ boxShadow: "0 12px 40px -8px hsl(28 100% 50% / 0.3)" }}>
                      <s.icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden xl:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/20 to-transparent" />
                  )}
                  <h3 className="text-base font-bold text-foreground mb-1.5">{s.title}</h3>
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
  const { t } = useI18n();
  const problems = [t.problem1, t.problem2, t.problem3, t.problem4];
  return (
    <section className={`${SECTION_PADDING} ${SECTION_GRAY} relative overflow-hidden`}>
      <div className={`${INNER} relative z-10`}>
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-destructive mb-4 tracking-[0.2em] uppercase">{t.problemTag}</p>
            <h2 className="section-title text-foreground mb-5">{t.problemTitle1}<span className="gradient-text">{t.problemTitle2}</span></h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">{t.problemDesc}</p>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-14">
          {problems.map((p, i) => (
            <FadeIn key={p} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <GlassCard className="flex items-center gap-4 p-6 h-full">
                  <div className="w-11 h-11 rounded-xl bg-destructive/8 border border-destructive/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-destructive/70" />
                  </div>
                  <span className="text-foreground/70 font-medium text-sm">{p}</span>
                </GlassCard>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <div className="max-w-md mx-auto text-center rounded-2xl border border-primary/20 bg-primary/5 p-7">
            <Check className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-xl font-bold text-foreground mb-2">{t.solutionTitle1}<span className="gradient-text">{t.solutionTitle2}</span></p>
            <p className="text-sm text-muted-foreground">{t.solutionDesc}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   COMPARISON
   ═══════════════════════════════════════════════════ */
function ComparisonSection() {
  const { t } = useI18n();
  const rows = [
    { label: t.compAI, old: false, zc: true },
    { label: t.compGlobal, old: false, zc: true },
    { label: t.compFees, oldText: t.compFeesPaid, zcText: "0€" },
    { label: t.compRestrictions, oldText: t.compRestYes, zcText: t.compRestNone },
    { label: t.compCashback, oldText: t.compCashbackRare, zcText: t.compCashbackVal },
    { label: t.compYield, old: false, zc: true },
  ];
  return (
    <section className={`${SECTION_PADDING} ${SECTION_WHITE} relative overflow-hidden`}>
      <div className={`${INNER} relative z-10`}>
        <SectionHeading
          tag={t.compTag}
          title={<>{t.compTitle1}<span className="gradient-text">{t.compTitle2}</span></>}
          subtitle={t.compDesc}
        />
        <FadeIn delay={0.15}>
          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 px-8 py-5 border-b border-border">
              <span />
              <span className="text-sm font-semibold text-muted-foreground text-center">{t.compRegular}</span>
              <span className="text-sm font-bold text-primary text-center">Zerocard</span>
            </div>
            {rows.map((r, i) => (
              <div key={r.label} className={`grid grid-cols-3 items-center px-8 py-5 ${i < rows.length - 1 ? "border-b border-border/50" : ""} hover:bg-muted/30 transition-colors`}>
                <span className="text-sm text-foreground/70 font-medium">{r.label}</span>
                <div className="flex justify-center">
                  {r.oldText ? <span className="text-sm text-muted-foreground">{r.oldText}</span> :
                   r.old === false ? <X className="w-5 h-5 text-destructive/50" /> :
                   <Check className="w-5 h-5 text-emerald-500" />}
                </div>
                <div className="flex justify-center">
                  {r.zcText ? <span className="text-sm font-bold text-primary">{r.zcText}</span> :
                   r.zc ? <Check className="w-5 h-5 text-emerald-500" /> :
                   <X className="w-5 h-5 text-destructive/50" />}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
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
    { icon: Bot, title: t.benAI, desc: t.benAIDesc },
    { icon: Globe, title: t.benGlobal, desc: t.benGlobalDesc },
    { icon: CreditCard, title: t.benFree, desc: t.benFreeDesc },
    { icon: Coins, title: t.benNoFees, desc: t.benNoFeesDesc },
    { icon: TrendingUp, title: t.benCashback, desc: t.benCashbackDesc },
    { icon: CircleDollarSign, title: t.benYield, desc: t.benYieldDesc },
  ];
  return (
    <section className={`${SECTION_PADDING} ${SECTION_GRAY} relative overflow-hidden`}>
      <div className={`${INNER} relative z-10`}>
        <SectionHeading
          tag={t.benefitsTag}
          title={<>{t.benefitsTitle1}<span className="gradient-text">{t.benefitsTitle2}</span></>}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
                <GlassCard className="p-8 h-full">
                  <div className="mb-5 w-14 h-14 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
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
   SAFETY
   ═══════════════════════════════════════════════════ */
function SafetySection() {
  const { t } = useI18n();
  const safetyPoints = [
    { icon: Shield, title: t.safe1Title, desc: t.safe1Desc, gradient: "from-emerald-500 to-teal-400" },
    { icon: Fingerprint, title: t.safe2Title, desc: t.safe2Desc, gradient: "from-orange-500 to-amber-400" },
    { icon: Lock, title: t.safe3Title, desc: t.safe3Desc, gradient: "from-violet-500 to-purple-400" },
    { icon: Layers, title: t.safe4Title, desc: t.safe4Desc, gradient: "from-blue-500 to-cyan-400" },
  ];
  return (
    <section id="safety" className={`${SECTION_PADDING} ${SECTION_WHITE} relative overflow-hidden scroll-mt-20`}>
      <div className={`${INNER} relative z-10`}>
        <SectionHeading
          tag={t.safetyTag}
          title={<>{t.safetyTitle1}<span className="gradient-text">{t.safetyTitle2}</span></>}
          subtitle={t.safetyDesc}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {safetyPoints.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.12}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                <GlassCard className="text-center p-8 h-full group" hover={false}>
                  <div className="relative mx-auto mb-5">
                    <div className={`absolute -inset-3 rounded-2xl bg-gradient-to-br ${s.gradient} opacity-15 blur-xl group-hover:opacity-25 transition-opacity duration-500`} />
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto`}>
                      <s.icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                    </div>
                  </div>
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
   SEO CONTENT BLOCKS
   ═══════════════════════════════════════════════════ */
function SEOBlocks() {
  const { t } = useI18n();
  return (
    <section className={`${SECTION_PADDING} ${SECTION_GRAY} relative`}>
      <div className={`${INNER} space-y-14`}>
        <FadeIn>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{t.seoBlock1Title}</h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">{t.seoBlock1Text}</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{t.seoBlock2Title}</h2>
            <p className="text-base lg:text-lg text-muted-foreground mb-4">{t.seoBlock2Text}</p>
            <ul className="grid grid-cols-2 gap-3">
              {[t.seoBlock2Item1, t.seoBlock2Item2, t.seoBlock2Item3, t.seoBlock2Item4].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{t.seoBlock3Title}</h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">{t.seoBlock3Text}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════ */
function FAQSection() {
  const { t } = useI18n();
  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section id="faq" className={`${SECTION_PADDING} ${SECTION_WHITE} relative`}>
        <div className={`${INNER} max-w-3xl`}>
          <SectionHeading tag={t.faqTag} title={t.faqTitle} />
          <FadeIn>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/40">
                  <AccordionTrigger className="text-left text-base lg:text-lg font-semibold text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════ */
function FinalCTA() {
  const { t } = useI18n();
  const quickSteps = [
    { icon: UserPlus, label: t.final1 },
    { icon: ShieldCheck, label: t.final2 },
    { icon: CreditCard, label: t.final3 },
  ];
  return (
    <section className={`py-28 lg:py-40 ${SECTION_GRAY} relative overflow-hidden`}>
      {/* Soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(28 100% 50% / 0.05), transparent 60%)", filter: "blur(120px)" }} />
      <div className={`${INNER} text-center relative z-10`}>
        <FadeIn>
          <h2 className="section-title text-foreground mb-5">{t.finalTitle}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">{t.finalDesc}</p>
          <div className="flex flex-wrap justify-center gap-5 mb-12">
            {quickSteps.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">{s.label}</span>
              </div>
            ))}
          </div>
          <CTAButton text={t.finalCTA} size="large" />
          <p className="mt-6 text-sm text-muted-foreground/60">{t.finalSub}</p>
          <p className="mt-3 text-[11px] text-muted-foreground/40 flex items-center justify-center gap-1.5">
            <ExternalLink className="w-3 h-3" />
            {t.redirectNote}
          </p>
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
    <footer className="py-12 border-t border-border bg-background">
      <div className={`${INNER} flex flex-col items-center gap-3`}>
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
    <div className="flex items-center rounded-full border border-border/30 bg-muted/50 backdrop-blur-xl p-0.5">
      {(["en", "ru"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`relative px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            lang === l ? "text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang === l && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full gradient-bg"
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
   NAVBAR
   ═══════════════════════════════════════════════════ */
function Navbar() {
  const { t } = useI18n();
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
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/30 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className={`${INNER} flex items-center justify-between h-16 lg:h-[72px]`}>
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{ background: "linear-gradient(135deg, hsl(28 100% 50%), hsl(340 80% 55%))" }}>
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
                  ? "gradient-bg shadow-lg"
                  : "bg-foreground/10 backdrop-blur-sm hover:bg-foreground/20"
              }`}
              style={scrolled ? { boxShadow: "0 8px 30px -8px hsl(28 100% 50% / 0.35)" } : {}}
            >
              {t.navGetCard}
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-foreground/80 hover:bg-muted transition-colors"
              aria-label="Menu"
            >
              <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-6 pb-6 pt-2 space-y-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors">
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full rounded-full font-semibold text-sm text-white px-5 py-3 gradient-bg shadow-lg">
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

/* ═══════════════════════════════════════════════════
   DYNAMIC META TAGS
   ═══════════════════════════════════════════════════ */
function DynamicMeta() {
  const { t, lang } = useI18n();
  useEffect(() => {
    document.title = t.metaTitle;
    const setMeta = (attr: string, val: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`) as HTMLMetaElement;
      if (el) el.content = content;
    };
    setMeta("name", "description", t.metaDesc);
    setMeta("property", "og:title", t.metaTitle);
    setMeta("property", "og:description", t.metaDesc);
    setMeta("name", "twitter:title", t.metaTitle);
    setMeta("name", "twitter:description", t.metaDesc);
    const ogImg = lang === "en" ? "https://zerocard.pro/og-image-en.jpg" : "https://zerocard.pro/og-image.jpg";
    setMeta("property", "og:image", ogImg);
    setMeta("name", "twitter:image", ogImg);

    document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
    [
      { rel: "alternate", hreflang: "ru", href: "https://zerocard.pro/?lang=ru" },
      { rel: "alternate", hreflang: "en", href: "https://zerocard.pro/?lang=en" },
      { rel: "alternate", hreflang: "x-default", href: "https://zerocard.pro/" },
    ].forEach(({ rel, hreflang, href }) => {
      const link = document.createElement("link");
      link.rel = rel;
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });
  }, [t, lang]);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZeroCard",
    url: "https://zerocard.pro",
    logo: "https://zerocard.pro/zerocard-orange.png",
    description: t.metaDesc,
    sameAs: [],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZeroCard",
    url: "https://zerocard.pro",
    description: t.metaDesc,
    inLanguage: lang === "ru" ? "ru-RU" : "en-US",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE LAYOUT
   ═══════════════════════════════════════════════════ */
const Index = () => (
  <div className="min-h-screen overflow-x-hidden">
    <DynamicMeta />
    <Navbar />
    <HeroSection />           {/* white */}
    <PaymentWalletSection />  {/* orange accent */}
    <InfrastructureSection /> {/* gray */}
    <StepsOverview />         {/* white */}
    <ProblemSection />        {/* gray */}
    <ComparisonSection />     {/* white */}
    <BenefitsSection />       {/* gray */}
    <SafetySection />         {/* white */}
    <SEOBlocks />             {/* gray */}
    <FAQSection />            {/* white */}
    <FinalCTA />              {/* gray */}
    <Footer />                {/* white */}
  </div>
);

export default Index;
