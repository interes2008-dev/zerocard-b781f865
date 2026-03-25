import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import cardImage from "@/assets/zerocard-orange.png";
import {
  CreditCard, Wallet, ShoppingCart, Globe, Shield, TrendingUp, Zap,
  ArrowRight, Check, X, Coins, Users, Clock, ChevronRight, Sparkles,
  BadgeCheck, CircleDollarSign, Bot, Smartphone, Lock, Layers,
  Fingerprint, Brain, Plane,
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

/* ─── Premium Glass Card ─── */
function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative group rounded-3xl overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 rounded-3xl p-[1px]" style={{
        background: "linear-gradient(135deg, hsl(28 100% 50% / 0.3), hsl(270 70% 55% / 0.1), hsl(0 0% 100% / 0.08))",
      }}>
        <div className="w-full h-full rounded-3xl bg-card/80 backdrop-blur-2xl" />
      </div>
      {hover && (
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: "0 20px 80px -20px hsl(28 100% 50% / 0.2), 0 0 60px -30px hsl(28 100% 50% / 0.15)" }} />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ─── CTA Button ─── */
function CTAButton({ text, className = "", size = "default" }: { text: string; className?: string; size?: "default" | "large" }) {
  return (
    <motion.a
      href={SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-3 rounded-2xl font-semibold text-white overflow-hidden transition-all ${
        size === "large" ? "px-14 py-6 text-lg" : "px-10 py-4.5 text-base"
      } ${className}`}
    >
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: "inset 0 0 40px hsl(0 0% 100% / 0.15), 0 0 80px -10px hsl(28 100% 50% / 0.6), 0 0 120px -20px hsl(28 100% 50% / 0.3)" }} />
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span className="relative z-10">{text}</span>
      <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({ tag, title, subtitle, dark = false }: { tag?: string; title: React.ReactNode; subtitle?: string; dark?: boolean }) {
  return (
    <FadeIn>
      <div className="text-center mb-20">
        {tag && <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">{tag}</p>}
        <h2 className={`text-3xl lg:text-5xl xl:text-[3.5rem] font-bold leading-tight ${dark ? "text-white" : "text-foreground"}`}>{title}</h2>
        {subtitle && <p className={`mt-6 text-lg max-w-lg mx-auto leading-relaxed ${dark ? "text-white/40" : "text-muted-foreground"}`}>{subtitle}</p>}
      </div>
    </FadeIn>
  );
}

/* ─── Noise overlay ─── */
function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
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

      <div className="absolute inset-0 opacity-[0.012]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 0%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 0%) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="container mx-auto px-6 lg:px-16 py-32 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-16 items-center">
          {/* Left */}
          <div className="max-w-xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-card/50 backdrop-blur-xl px-6 py-3 text-sm font-medium text-muted-foreground shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                Next-generation payments
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-12 text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold tracking-tight leading-[1.06] text-foreground">
                Payment for
                <br />
                <span className="gradient-text">ChatGPT</span> not
                <br />
                working?
              </h1>
              <p className="mt-5 text-2xl lg:text-3xl font-bold text-foreground/80">
                Here is the solution
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md">
                A card without restrictions — works instantly
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
                {["0€ card issuance", "0€ monthly fees", "Works worldwide", "AI tools & subscriptions"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-14">
                <CTAButton text="Get card for free" size="large" />
                <p className="mt-6 text-xs text-muted-foreground tracking-wide">
                  Secure · Fast · No restrictions · 5 minutes setup
                </p>
              </div>
            </FadeIn>

            {/* What happens next — inline */}
            <FadeIn delay={0.5}>
              <div className="mt-12 border-t border-border/20 pt-8">
                <p className="text-xs font-semibold text-muted-foreground mb-5 tracking-[0.15em] uppercase">What happens next</p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: CreditCard, label: "Sign up (2 min)" },
                    { icon: Fingerprint, label: "Quick verification" },
                    { icon: Wallet, label: "Card ready" },
                    { icon: ShoppingCart, label: "Start paying" },
                  ].map((s, i) => (
                    <div key={s.label} className="flex items-center gap-2 text-xs text-foreground/60">
                      <div className="w-7 h-7 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center">
                        <s.icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="font-medium">{s.label}</span>
                      {i < 3 && <ChevronRight className="w-3 h-3 text-muted-foreground/30 ml-1" />}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — Card (25-30% larger) */}
          <FadeIn delay={0.3} className="relative flex justify-center lg:justify-end">
            <div className="relative w-96 lg:w-[560px]">
              {/* Multi-layer glow */}
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

              {/* Floating accents */}
              <motion.div
                animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-14 h-14 rounded-2xl gradient-bg opacity-80 flex items-center justify-center z-20"
                style={{ boxShadow: "0 8px 30px hsl(28 100% 50% / 0.4)" }}
              >
                <CircleDollarSign className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-8 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-xl z-20 border border-primary/20"
              />
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -left-12 w-6 h-6 rounded-full bg-accent/15 backdrop-blur-sm z-20"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SCROLLING TICKER
   ═══════════════════════════════════════════════════ */
function ScrollingTicker() {
  const services = [
    "ChatGPT", "Claude", "Midjourney", "Netflix", "Spotify",
    "Booking", "Airbnb", "Apple", "Google", "Stripe", "Lovable",
  ];
  // Double for seamless loop
  const doubled = [...services, ...services];

  return (
    <section className="py-10 border-y border-border/20 bg-card/20 backdrop-blur-sm relative overflow-hidden">
      <NoiseOverlay opacity={0.015} />
      <div className="relative z-10">
        <p className="text-center text-xs font-semibold text-muted-foreground mb-6 tracking-[0.2em] uppercase">
          Works with services where regular cards fail
        </p>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />
          <motion.div
            className="flex gap-12 items-center whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {doubled.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-sm font-semibold text-foreground/40 hover:text-foreground/80 transition-opacity duration-300 cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STATUS BAR
   ═══════════════════════════════════════════════════ */
function StatusBar() {
  const items = [
    { icon: Globe, label: "Global payments" },
    { icon: Smartphone, label: "Apple Pay compatible" },
    { icon: Zap, label: "Instant transactions" },
    { icon: Shield, label: "Bank-level security" },
  ];
  return (
    <section className="py-8 border-b border-border/20 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-wrap justify-center gap-10 lg:gap-20">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
              <item.icon className="w-4 h-4 text-primary/70" />
              {item.label}
            </div>
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
  const services = [
    { icon: Bot, name: "ChatGPT" },
    { icon: Brain, name: "Claude" },
    { icon: Sparkles, name: "Midjourney" },
  ];
  return (
    <section className="py-32 lg:py-40 bg-background relative overflow-hidden">
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="top-0 left-1/2 -translate-x-1/2" blur={160} opacity={0.04} />
      <NoiseOverlay />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
        <SectionHeading
          tag="No restrictions"
          title={<>Pay without <span className="gradient-text">restrictions</span></>}
        />
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.1}>
              <GlassCard className="flex items-center gap-5 px-10 py-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-bold text-foreground text-lg">{s.name}</span>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS — 3 STEPS
   ═══════════════════════════════════════════════════ */
function StepsOverview() {
  const steps = [
    { icon: CreditCard, title: "Create card", desc: "Free issuance in a few clicks" },
    { icon: Wallet, title: "Fund", desc: "Top up your balance easily" },
    { icon: ShoppingCart, title: "Pay", desc: "Anywhere in the world, no limits" },
  ];
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 100%) 100%)" }}>
      <NoiseOverlay opacity={0.02} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading tag="How it works" title="Three simple steps" />
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.15}>
              <GlassCard className="text-center p-10 lg:p-12">
                <div className="mb-3 text-xs font-bold text-primary/50 tracking-[0.25em]">0{i + 1}</div>
                <div className="mx-auto mb-7 w-18 h-18 rounded-2xl gradient-bg flex items-center justify-center relative"
                  style={{ width: 72, height: 72, boxShadow: "0 12px 40px -8px hsl(28 100% 50% / 0.35)" }}>
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < 2 && <ChevronRight className="hidden md:block absolute top-1/2 -right-5 w-5 h-5 text-muted-foreground/20" />}
              </GlassCard>
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
  const problems = [
    "Payments declined without explanation",
    "Banks block international transactions",
    "AI service subscriptions fail",
    "Regional restrictions and filters",
  ];
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 2%) 100%)",
    }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(0 60% 40%)" size={500} position="top-1/4 left-1/4" blur={160} opacity={0.06} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading
          dark
          title={<>Why regular cards <span className="gradient-text">don't work</span></>}
          subtitle="Traditional banks apply restrictions and filters"
        />
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {problems.map((p, i) => (
            <FadeIn key={p} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, borderColor: "hsl(0 60% 40% / 0.2)" }}
                className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-7 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/10 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-400/80" />
                </div>
                <span className="text-white/70 font-medium">{p}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY IT WORKS
   ═══════════════════════════════════════════════════ */
function WhyItWorks() {
  return (
    <section className="py-32 lg:py-40 bg-background relative overflow-hidden">
      <GlowOrb color="hsl(28 100% 50%)" size={700} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={200} opacity={0.04} />
      <NoiseOverlay />
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center relative z-10">
        <FadeIn>
          <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">The solution</p>
          <h2 className="text-3xl lg:text-5xl xl:text-[3.5rem] font-bold text-foreground mb-8">Why this works</h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-16">
            Traditional banks apply restrictions and filters.
            Zerocard uses a different financial infrastructure,
            allowing payments to go through without limitations.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Globe, label: "Works everywhere" },
            { icon: Layers, label: "No restrictions" },
            { icon: Zap, label: "Any service" },
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.12}>
              <GlassCard className="p-8">
                <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground">{item.label}</h3>
              </GlassCard>
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
  const rows = [
    { label: "AI payments", old: false, zc: true },
    { label: "Global services", old: false, zc: true },
    { label: "Monthly fees", oldText: "Paid", zcText: "0€" },
    { label: "Restrictions", oldText: "Yes", zcText: "None" },
    { label: "Cashback", oldText: "Rare", zcText: "Up to 1%" },
    { label: "Yield on balance", old: false, zc: true },
  ];
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 2%) 100%)",
    }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={700} position="top-0 left-1/2 -translate-x-1/2" blur={160} opacity={0.08} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="bottom-0 right-1/4" blur={140} opacity={0.05} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl xl:text-[3.5rem] font-bold text-center text-white mb-20">Compare for yourself</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl"
            style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5), 0 0 60px -30px hsl(28 100% 50% / 0.1)" }}>
            <div className="grid grid-cols-3 px-8 py-6 border-b border-white/[0.06]">
              <span />
              <span className="text-sm font-semibold text-white/30 text-center">Regular card</span>
              <span className="text-sm font-bold text-primary text-center">Zerocard</span>
            </div>
            {rows.map((r, i) => (
              <motion.div
                key={r.label}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                className={`grid grid-cols-3 items-center px-8 py-6 transition-colors ${i < rows.length - 1 ? "border-b border-white/[0.04]" : ""}`}
              >
                <span className="text-sm text-white/50 font-medium">{r.label}</span>
                <div className="flex justify-center">
                  {r.oldText ? <span className="text-sm text-white/25">{r.oldText}</span> :
                   r.old === false ? <X className="w-5 h-5 text-red-400/50" /> :
                   <Check className="w-5 h-5 text-green-400" />}
                </div>
                <div className="flex justify-center">
                  {r.zcText ? <span className="text-sm font-bold text-primary">{r.zcText}</span> :
                   r.zc ? <Check className="w-5 h-5 text-green-400" /> :
                   <X className="w-5 h-5 text-red-400/50" />}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   GUIDE
   ═══════════════════════════════════════════════════ */
function GuideSection() {
  const steps = [
    { num: "01", title: "Sign up", desc: "Create your account — takes just 2 minutes", cta: true },
    { num: "02", title: "Verification", desc: "Simple identity check — like any bank" },
    { num: "03", title: "Get your card", desc: "Virtual card is issued instantly" },
    { num: "04", title: "Fund balance", desc: "Top up your card with USDT" },
    { num: "05", title: "Pay normally", desc: "Use it like any regular payment card" },
  ];
  return (
    <section className="py-32 lg:py-40 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={500} position="-top-20 right-1/4" blur={160} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading tag="Step-by-step guide" title="Setup takes 5 minutes" subtitle="Follow these simple steps and start paying globally" />
        <div className="max-w-2xl mx-auto space-y-5">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.08}>
              <GlassCard className="flex items-center gap-6 p-7 lg:p-8">
                <div className="text-3xl font-bold gradient-text flex-shrink-0 w-14 text-center">{s.num}</div>
                <div className="w-px h-10 bg-border/30 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                </div>
                {s.cta && (
                  <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
                    style={{ boxShadow: "0 8px 24px -6px hsl(28 100% 50% / 0.35)" }}>
                    Start <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </GlassCard>
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
  const benefits = [
    { icon: Bot, title: "Pay for AI tools", desc: "ChatGPT, Midjourney, Claude — no blocks" },
    { icon: Globe, title: "Global payments", desc: "Works in any country worldwide" },
    { icon: CreditCard, title: "0€ issuance", desc: "Completely free card creation" },
    { icon: Coins, title: "0€ monthly fees", desc: "Unlike traditional bank cards" },
    { icon: TrendingUp, title: "Cashback up to 1%", desc: "Earn back on every purchase" },
    { icon: CircleDollarSign, title: "Up to 5% annual yield", desc: "Your balance works for you" },
  ];
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 100%) 100%)" }}>
      <NoiseOverlay opacity={0.02} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading title={<>Why <span className="gradient-text">Zerocard</span></>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <GlassCard className="p-9">
                <div className="mb-6 w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </GlassCard>
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
  return (
    <section className="py-32 lg:py-40 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={200} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="mx-auto mb-10 w-20 h-20 rounded-3xl bg-primary/8 border border-primary/10 flex items-center justify-center"
              style={{ boxShadow: "0 0 60px -10px hsl(28 100% 50% / 0.15)" }}>
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-5xl xl:text-[3.5rem] font-bold text-foreground mb-7">
              Financial infrastructure
              <br />
              you can rely on
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-14">
              Zerocard is powered by a global financial infrastructure used by millions of users worldwide,
              ensuring stability, security, and fast transactions.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid sm:grid-cols-3 gap-5 mb-14">
              {[
                { icon: Lock, label: "Bank-level security" },
                { icon: Fingerprint, label: "KYC verification" },
                { icon: BadgeCheck, label: "Operating since 2019" },
              ].map((item) => (
                <GlassCard key={item.label} className="p-7 flex flex-col items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                </GlassCard>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-xs text-muted-foreground mb-4 tracking-wide">Powered by</p>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-xl px-8 py-4"
              style={{ boxShadow: "0 8px 30px -10px rgba(0,0,0,0.08)" }}>
              <span className="text-xl font-bold gradient-text tracking-tight">Pionex</span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Global financial platform with world-class infrastructure
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   OBJECTION
   ═══════════════════════════════════════════════════ */
function FearSection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 100%) 100%)" }}>
      <NoiseOverlay opacity={0.02} />
      <div className="container mx-auto px-6 lg:px-16 text-center max-w-2xl relative z-10">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl xl:text-[3.5rem] font-bold text-foreground mb-8">Is this complicated?</h2>
          <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
            No. Works like a normal card.
          </p>
          <p className="text-muted-foreground">
            Setup takes minutes.
            <br />
            No financial or technical experience needed.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   EXTRA — Yield + Referral
   ═══════════════════════════════════════════════════ */
function ExtraSection() {
  return (
    <section className="py-32 lg:py-40 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <FadeIn>
            <GlassCard className="p-10 lg:p-12">
              <div className="mb-6 w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center"
                style={{ boxShadow: "0 0 30px -8px hsl(28 100% 50% / 0.15)" }}>
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Up to 5% annual yield</h3>
              <p className="text-muted-foreground leading-relaxed">Earn passive income on your card balance with zero effort</p>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.12}>
            <GlassCard className="p-10 lg:p-12">
              <div className="mb-6 w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center"
                style={{ boxShadow: "0 0 30px -8px hsl(28 100% 50% / 0.15)" }}>
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Referral program</h3>
              <p className="text-muted-foreground leading-relaxed">Invite friends and earn bonuses for every referral</p>
            </GlassCard>
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
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 2%) 100%)",
    }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={180} opacity={0.06} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 max-w-2xl">
        <FadeIn>
          <div className="mx-auto mb-10 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
            <Clock className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl lg:text-5xl xl:text-[3.5rem] font-bold text-white mb-7 leading-tight">
            Most people discover this{" "}
            <span className="gradient-text">too late</span>
          </h2>
          <p className="text-lg text-white/35 leading-relaxed mb-14">
            While others struggle with failed payments — you already pay without limits
          </p>
          <CTAButton text="Get card for free" size="large" />
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-32 lg:py-44 relative overflow-hidden bg-background">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={800} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={200} opacity={0.06} />
      <GlowOrb color="hsl(340 80% 55%)" size={400} position="bottom-0 right-1/4" blur={160} opacity={0.03} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-7 leading-tight">
            Start now —{" "}
            <span className="gradient-text">takes 5 minutes</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-14 max-w-md mx-auto">
            Free global payment card with no restrictions
          </p>
          <CTAButton text="Get card for free" size="large" />
          <p className="mt-10 text-sm text-muted-foreground">
            0€ issuance · 0€ monthly fees · global payments
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
  return (
    <footer className="py-12 border-t border-border/20 bg-background">
      <div className="container mx-auto px-6 lg:px-16 text-center">
        <p className="text-base font-bold gradient-text mb-3">Zerocard</p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Zerocard. Next-generation global payments.</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
const Index = () => (
  <div className="min-h-screen overflow-x-hidden">
    <HeroSection />
    <ScrollingTicker />
    <StatusBar />
    <AIUseCases />
    <StepsOverview />
    <ProblemSection />
    <WhyItWorks />
    <ComparisonSection />
    <GuideSection />
    <BenefitsSection />
    <TrustSection />
    <FearSection />
    <ExtraSection />
    <FOMOSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
