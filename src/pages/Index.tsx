import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import cardImage from "@/assets/zerocard-orange.png";
import { useI18n, Lang } from "@/lib/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CreditCard, Globe, Shield, Zap, UserPlus, ShieldCheck,
  ArrowRight, Check, Coins, Clock, Sparkles,
  BadgeCheck, CircleDollarSign, Smartphone, Lock, Layers,
  Fingerprint, Menu, ExternalLink, X, Wallet, Apple,
} from "lucide-react";

const SIGNUP_URL = "https://www.pionex.com/ru/signUp?r=0uHzysLVYQh";

/* ─── Animated wrapper ─── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
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

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
function HeroSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 3%) 100%)",
    }}>
      {/* Ambient glows */}
      <div className="absolute top-[5%] right-[15%] w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(28 100% 50% / 0.1), transparent 55%)", filter: "blur(140px)" }} />
      <div className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(28 80% 45% / 0.06), transparent 60%)", filter: "blur(120px)" }} />
      <NoiseOverlay opacity={0.04} />

      <div className="container mx-auto px-6 lg:px-16 pt-28 pb-20 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Copy */}
          <div className="max-w-xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t.heroBadge}
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="hero-title text-foreground mb-6">
                {t.heroTitle1}
                <span className="gradient-text">{t.heroTitle2}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                {t.heroDesc}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
                <motion.a
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 rounded-full gradient-bg text-white font-semibold px-8 py-4 text-base"
                  style={{ boxShadow: "0 16px 60px -12px hsl(28 100% 50% / 0.5)" }}
                >
                  {t.heroCTA}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                  {t.heroSecondary}
                </a>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.28}>
              <div className="flex items-center gap-6 lg:gap-8">
                {[
                  { val: t.heroStat1Val, label: t.heroStat1Label },
                  { val: t.heroStat2Val, label: t.heroStat2Label },
                  { val: t.heroStat3Val, label: t.heroStat3Label },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="text-2xl lg:text-3xl font-bold gradient-text">{s.val}</span>
                    <span className="text-xs text-muted-foreground max-w-[80px] leading-tight">{s.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: Card visual */}
          <FadeIn delay={0.15} className="relative flex justify-center lg:justify-end">
            <motion.div style={{ y: cardY }} className="relative w-full max-w-[380px] lg:max-w-[440px]">
              <div className="absolute inset-0 scale-[1.5] blur-[120px] opacity-40"
                style={{ background: "radial-gradient(circle, hsl(28 100% 55%), transparent 65%)" }} />
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <motion.div
                  whileHover={{ rotateY: 6, rotateX: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1200 }}
                >
                  <img
                    src={cardImage}
                    alt="ZeroCard — global payment card"
                    className="w-full rounded-2xl relative z-10"
                    style={{ filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.5)) drop-shadow(0 20px 40px rgba(255,122,0,0.2))" }}
                  />
                  <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
                    style={{ background: "linear-gradient(125deg, hsl(0 0% 100% / 0.15) 0%, transparent 30%, transparent 70%, hsl(0 0% 100% / 0.03) 100%)" }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </FadeIn>
        </div>
      </div>

      {/* Wallets bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-border/10">
        <div className="container mx-auto px-6 lg:px-16 py-6">
          <FadeIn delay={0.4}>
            <p className="text-center text-xs font-semibold text-muted-foreground/40 mb-4 tracking-[0.2em] uppercase">{t.walletsTitle}</p>
            <div className="flex justify-center items-center gap-6 lg:gap-10 flex-wrap">
              {[t.walletApple, t.walletGoogle, t.walletPaypal, t.walletVisa, t.walletMastercard].map((w) => (
                <span key={w} className="text-sm font-semibold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors cursor-default tracking-wide">
                  {w}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   BENEFITS (Main Focus — 6 large cards)
   ═══════════════════════════════════════════════════ */
function BenefitsSection() {
  const { t } = useI18n();
  const benefits = [
    { icon: Coins, title: t.ben1Title, desc: t.ben1Desc },
    { icon: Zap, title: t.ben2Title, desc: t.ben2Desc },
    { icon: Globe, title: t.ben3Title, desc: t.ben3Desc },
    { icon: Sparkles, title: t.ben4Title, desc: t.ben4Desc },
    { icon: CircleDollarSign, title: t.ben5Title, desc: t.ben5Desc },
    { icon: Shield, title: t.ben6Title, desc: t.ben6Desc },
  ];

  return (
    <section id="benefits" className="py-28 lg:py-36 relative overflow-hidden scroll-mt-20" style={{
      background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 6%) 50%, hsl(0 0% 3%) 100%)",
    }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(28 100% 50% / 0.06), transparent 70%)", filter: "blur(100px)" }} />
      <NoiseOverlay opacity={0.04} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.benefitsTag}</p>
          <h2 className="section-title text-foreground text-center mb-4">
            {t.benefitsTitle1}<span className="gradient-text">{t.benefitsTitle2}</span>
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-lg mx-auto">{t.benefitsDesc}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="h-full"
              >
                <div className="glass-card glass-card-hover p-8 lg:p-9 h-full group transition-all duration-500">
                  <div className="mb-6 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center"
                    style={{ boxShadow: "0 0 30px -8px hsl(28 100% 50% / 0.2)" }}>
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
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
   HOW IT WORKS — 5 steps
   ═══════════════════════════════════════════════════ */
function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { num: t.step1Num, tag: t.step1Tag, title: t.step1Title, desc: t.step1Desc },
    { num: t.step2Num, tag: t.step2Tag, title: t.step2Title, desc: t.step2Desc },
    { num: t.step3Num, tag: t.step3Tag, title: t.step3Title, desc: t.step3Desc },
    { num: t.step4Num, tag: t.step4Tag, title: t.step4Title, desc: t.step4Desc },
    { num: t.step5Num, tag: t.step5Tag, title: t.step5Title, desc: t.step5Desc },
  ];

  return (
    <section id="how-it-works" className="py-28 lg:py-36 relative overflow-hidden scroll-mt-20" style={{
      background: "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 2%) 100%)",
    }}>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(28 100% 50% / 0.05), transparent 60%)", filter: "blur(120px)" }} />
      <NoiseOverlay opacity={0.04} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.stepsTag}</p>
          <h2 className="section-title text-foreground text-center mb-4">
            {t.stepsTitle1}<span className="gradient-text">{t.stepsTitle2}</span>
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-lg mx-auto">{t.stepsDesc}</p>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.01, x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="glass-card glass-card-hover p-7 lg:p-8 flex items-start gap-6 transition-all duration-500">
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-bold gradient-text w-12 text-center">{s.num}</div>
                  </div>
                  <div className="w-px h-14 bg-border/20 flex-shrink-0 self-center" />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-primary/60 tracking-[0.3em] uppercase mb-1 block">{s.tag}</span>
                    <h3 className="text-base lg:text-lg font-bold text-foreground mb-1.5">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
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
   PAYMENT COMPATIBILITY
   ═══════════════════════════════════════════════════ */
function PaymentSection() {
  const { t } = useI18n();
  const wallets = [
    { name: t.payApple, os: t.payAppleOS, emoji: "🍎" },
    { name: t.payGoogle, os: t.payGoogleOS, emoji: "🔵" },
    { name: t.payPaypal, os: t.payPaypalOS, emoji: "🅿" },
  ];

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 3%) 100%)",
    }}>
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(28 100% 50% / 0.05), transparent 60%)", filter: "blur(120px)" }} />
      <NoiseOverlay opacity={0.04} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.payTag}</p>
          <h2 className="section-title text-foreground text-center mb-4">
            {t.payTitle1}<span className="gradient-text">{t.payTitle2}</span>
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-lg mx-auto">{t.payDesc}</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-10">
          {wallets.map((w, i) => (
            <FadeIn key={w.name} delay={i * 0.12}>
              <motion.div whileHover={{ scale: 1.04, y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                <div className="glass-card glass-card-hover p-8 text-center h-full transition-all duration-500">
                  <div className="text-4xl mb-4">{w.emoji}</div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{w.name}</h3>
                  <span className="text-xs text-muted-foreground/50">{w.os}</span>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/15 px-3 py-1">
                    <Check className="w-3 h-3 text-primary" />
                    <span className="text-xs font-semibold text-primary">{t.paySupported}</span>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="max-w-2xl mx-auto glass-card p-6 flex items-start gap-4">
            <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">{t.payContactless}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TRUST BLOCK
   ═══════════════════════════════════════════════════ */
function TrustSection() {
  const { t } = useI18n();
  const points = [
    { icon: BadgeCheck, title: t.trust1Title, desc: t.trust1Desc },
    { icon: Fingerprint, title: t.trust2Title, desc: t.trust2Desc },
    { icon: Lock, title: t.trust3Title, desc: t.trust3Desc },
    { icon: Layers, title: t.trust4Title, desc: t.trust4Desc },
  ];

  return (
    <section id="security" className="py-28 lg:py-36 relative overflow-hidden scroll-mt-20" style={{
      background: "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 2%) 100%)",
    }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(28 100% 50% / 0.04), transparent 55%)", filter: "blur(140px)" }} />
      <NoiseOverlay opacity={0.04} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.trustTag}</p>
          <h2 className="section-title text-foreground text-center mb-4">
            {t.trustTitle1}<span className="gradient-text">{t.trustTitle2}</span>
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-xl mx-auto">{t.trustDesc}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-14">
          {points.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.04, y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                <div className="glass-card glass-card-hover p-7 text-center h-full transition-all duration-500">
                  <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center"
                    style={{ boxShadow: "0 0 30px -8px hsl(28 100% 50% / 0.15)" }}>
                    <p.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center">
            <p className="text-xs text-muted-foreground/40 mb-4 tracking-widest uppercase">{t.trustPowered}</p>
            <motion.div whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 glass-card px-10 py-5 cursor-default">
              <span className="text-2xl font-bold gradient-text tracking-tight">Pionex</span>
            </motion.div>
            <p className="mt-4 text-xs text-muted-foreground/40">{t.trustPlatform}</p>
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
    { q: t.faq5Q, a: t.faq5A },
    { q: t.faq6Q, a: t.faq6A },
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
      <section id="faq" className="py-28 lg:py-36 relative overflow-hidden scroll-mt-20" style={{
        background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 3%) 100%)",
      }}>
        <NoiseOverlay opacity={0.04} />
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl relative z-10">
          <FadeIn>
            <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.faqTag}</p>
            <h2 className="section-title text-foreground text-center mb-16">{t.faqTitle}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/10">
                  <AccordionTrigger className="text-left text-base lg:text-lg font-semibold text-foreground hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
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
  return (
    <section className="py-28 lg:py-40 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 2%) 100%)",
    }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(28 100% 50% / 0.08), transparent 60%)", filter: "blur(120px)" }} />
      <NoiseOverlay opacity={0.04} />

      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 max-w-2xl">
        <FadeIn>
          <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{t.finalTag}</p>
          <h2 className="section-title text-foreground mb-6">
            {t.finalTitle1}<span className="gradient-text">{t.finalTitle2}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">{t.finalDesc}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <motion.a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full gradient-bg text-white font-semibold px-10 py-4 text-base"
              style={{ boxShadow: "0 16px 60px -12px hsl(28 100% 50% / 0.5)" }}
            >
              {t.finalCTA}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>

          <p className="text-[11px] text-muted-foreground/30 flex items-center justify-center gap-1.5">
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
    <footer className="py-12 border-t border-border/10" style={{ background: "hsl(0 0% 3%)" }}>
      <div className="container mx-auto px-6 lg:px-16 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[9px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(28 100% 50%), hsl(28 90% 45%))" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="3" width="11" height="8" rx="2" stroke="white" strokeWidth="1.3" fill="none" opacity="0.6" />
              <rect x="4" y="5" width="11" height="8" rx="2" stroke="white" strokeWidth="1.3" fill="white" fillOpacity="0.15" />
              <circle cx="12" cy="9" r="1.2" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">Zero<span className="font-light">card</span></span>
        </div>
        <p className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} Zerocard. {t.footerCopy}</p>
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
    { label: t.navBenefits, href: "#benefits" },
    { label: t.navHowItWorks, href: "#how-it-works" },
    { label: t.navSecurity, href: "#security" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between h-16 lg:h-[72px]">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(28 100% 50%), hsl(28 90% 45%))", boxShadow: scrolled ? "0 0 24px -4px hsl(28 100% 50% / 0.35)" : "none" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="3" width="11" height="8" rx="2" stroke="white" strokeWidth="1.3" fill="none" opacity="0.6" />
                <rect x="4" y="5" width="11" height="8" rx="2" stroke="white" strokeWidth="1.3" fill="white" fillOpacity="0.15" />
                <circle cx="12" cy="9" r="1.2" fill="white" opacity="0.9" />
              </svg>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">Zero<span className="font-light">card</span></span>
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
              className="inline-flex items-center gap-2 rounded-full font-semibold text-sm text-white px-5 py-2.5 gradient-bg transition-all"
              style={{ boxShadow: "0 8px 30px -8px hsl(28 100% 50% / 0.4)" }}
            >
              {t.navGetCard}
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher />
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-foreground/80 hover:bg-foreground/5 transition-colors" aria-label="Menu">
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
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-xl text-base font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors">
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full font-semibold text-sm text-white px-5 py-3 gradient-bg"
                style={{ boxShadow: "0 8px 30px -8px hsl(28 100% 50% / 0.4)" }}>
                {t.navGetCard}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {mobileOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </>
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
      let el = document.querySelector(`meta[${attr}="${val}"]`) as HTMLMetaElement;
      if (el) el.content = content;
    };
    setMeta("name", "description", t.metaDesc);
    setMeta("property", "og:title", t.metaTitle);
    setMeta("property", "og:description", t.metaDesc);
    setMeta("name", "twitter:title", t.metaTitle);
    setMeta("name", "twitter:description", t.metaDesc);
  }, [t, lang]);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZeroCard",
    url: "https://zerocard.pro",
    description: t.metaDesc,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />;
}

/* ═══════════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════════ */
const Index = () => (
  <div className="min-h-screen overflow-x-hidden">
    <DynamicMeta />
    <Navbar />
    <HeroSection />
    <BenefitsSection />
    <HowItWorks />
    <PaymentSection />
    <TrustSection />
    <FAQSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
