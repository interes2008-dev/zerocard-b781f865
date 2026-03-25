import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import cardImage from "@/assets/zerocard-orange.png";
import { row1Brands, row2Brands } from "@/components/BrandLogos";
import {
  CreditCard, Wallet, ShoppingCart, Globe, Shield, TrendingUp, Zap, UserPlus, ShieldCheck,
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
   SCROLLING TICKER — Premium branded logos
   ═══════════════════════════════════════════════════ */
function ScrollingTicker() {
  const TickerRow = ({ items, reverse, speed }: { items: typeof row1Brands; reverse?: boolean; speed: number }) => (
    <div className="relative overflow-hidden py-2">
      <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-48 z-10" style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-48 z-10" style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />
      <div
        className="flex shrink-0"
        style={{ animation: `${reverse ? "ticker-scroll-reverse" : "ticker-scroll"} ${speed}s linear infinite` }}
      >
        {[...items, ...items, ...items].map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="group flex items-center gap-3.5 px-8 lg:px-10 py-4 mx-3 rounded-2xl border border-border/5 bg-card/30 backdrop-blur-sm transition-all duration-500 cursor-default select-none hover:bg-card/60 hover:border-white/10"
            style={{ ["--brand-color" as string]: brand.color }}
          >
            <div
              className="w-6 h-6 lg:w-7 lg:h-7 transition-all duration-500 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
              style={{ color: brand.color }}
            >
              <brand.Logo className="w-full h-full" />
            </div>
            <span
              className="text-sm lg:text-base font-bold text-foreground/30 transition-all duration-500 whitespace-nowrap tracking-tight group-hover:text-foreground/90"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {brand.name}
            </span>
            {/* Colored line accent on hover */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 rounded-full transition-all duration-500"
              style={{ background: brand.color, boxShadow: `0 0 12px ${brand.color}60` }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-16 lg:py-20 border-y border-border/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-card/30 backdrop-blur-xl" />
      <GlowOrb color="hsl(28 100% 50%)" size={500} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={180} opacity={0.04} />
      <NoiseOverlay opacity={0.02} />
      <div className="relative z-10">
        <p className="text-center text-xs font-semibold text-muted-foreground mb-2 tracking-[0.2em] uppercase">
          Works with services where regular cards fail
        </p>
        <p className="text-center text-sm text-muted-foreground/60 mb-10">
          AI tools, subscriptions and global services
        </p>
        <div className="flex flex-col gap-4">
          <TickerRow items={row1Brands} speed={25} />
          <TickerRow items={row2Brands} reverse speed={30} />
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
    <section className="py-10 border-b border-border/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-card/40 backdrop-blur-xl" />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-wrap justify-center gap-10 lg:gap-20">
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 text-sm text-muted-foreground font-medium cursor-default"
              >
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
   AI USE CASES — Dark gradient section
   ═══════════════════════════════════════════════════ */
function AIUseCases() {
  const services = [
    { icon: Bot, name: "ChatGPT", desc: "AI assistant" },
    { icon: Brain, name: "Claude", desc: "AI by Anthropic" },
    { icon: Sparkles, name: "Midjourney", desc: "AI image generation" },
  ];
  return (
    <section className="py-36 lg:py-44 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(220 15% 6%) 50%, hsl(0 0% 4%) 100%)",
    }}>
      <GlowOrb color="hsl(28 100% 50%)" size={700} position="top-0 left-1/2 -translate-x-1/2" blur={180} opacity={0.06} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="bottom-1/4 right-0" blur={160} opacity={0.04} />
      <NoiseOverlay opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
        <FadeIn>
          <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">No restrictions</p>
          <h2 className="text-4xl lg:text-6xl xl:text-[4rem] font-bold text-white mb-6 leading-tight">
            Pay without <span className="gradient-text">restrictions</span>
          </h2>
          <p className="text-lg text-white/30 mb-16 max-w-lg mx-auto">Services that don't accept your regular card — work with Zerocard</p>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex items-center gap-5 px-10 py-8 rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl transition-all cursor-default"
                style={{ boxShadow: "0 20px 60px -15px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.05)" }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center"
                  style={{ boxShadow: "0 0 30px -8px hsl(28 100% 50% / 0.2)" }}>
                  <s.icon className="w-7 h-7 text-primary" />
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
   HOW IT WORKS — Light clean section
   ═══════════════════════════════════════════════════ */
function StepsOverview() {
  const steps = [
    { icon: UserPlus, num: "01", title: "Sign up", desc: "Create an account in a couple of minutes", gradient: "from-orange-500 to-amber-400" },
    { icon: ShieldCheck, num: "02", title: "Verify your identity", desc: "Standard check (like in banks), takes a few minutes", gradient: "from-amber-400 to-orange-500" },
    { icon: CreditCard, num: "03", title: "Get your card", desc: "Issue your virtual card for free", gradient: "from-orange-500 to-rose-500" },
    { icon: Wallet, num: "04", title: "Fund your balance", desc: "Transfer USDT easily", gradient: "from-rose-500 to-orange-500" },
    { icon: Globe, num: "05", title: "Pay anywhere", desc: "Use it for subscriptions, services and travel", gradient: "from-orange-500 to-amber-400" },
  ];
  return (
    <section className="py-36 lg:py-44 relative overflow-hidden bg-background">
      <NoiseOverlay opacity={0.02} />
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="top-0 right-1/4" blur={200} opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={400} position="bottom-0 left-1/4" blur={180} opacity={0.03} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading tag="How it works" title="Start in 5 minutes" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6 max-w-7xl mx-auto">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="h-full"
              >
                <GlassCard className="text-center p-8 lg:p-10 relative h-full flex flex-col items-center justify-start group" hover={false}>
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 60px -20px hsl(28 100% 50% / 0.08), 0 0 80px -20px hsl(28 100% 50% / 0.1)" }} />

                  {/* Step label */}
                  <div className="mb-4 text-[10px] font-bold text-primary/50 tracking-[0.35em] uppercase">Step {s.num}</div>

                  {/* Icon container with layered effects */}
                  <div className="relative mx-auto mb-7">
                    {/* Outer ring glow */}
                    <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${s.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                    {/* Icon box */}
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center`}
                      style={{ boxShadow: "0 12px 40px -8px hsl(28 100% 50% / 0.4)" }}>
                      <s.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                    </div>
                    {/* Floating dot accent */}
                    <motion.div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${s.gradient}`}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      style={{ boxShadow: "0 0 12px hsl(28 100% 50% / 0.5)" }}
                    />
                  </div>

                  {/* Connector line (not on last) */}
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
   PROBLEM — Dark dramatic section
   ═══════════════════════════════════════════════════ */
function ProblemSection() {
  const problems = [
    "Payments declined without explanation",
    "Banks block international transactions",
    "AI service subscriptions fail",
    "Regional restrictions and filters",
  ];
  return (
    <section className="py-36 lg:py-44 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(350 20% 5%) 50%, hsl(0 0% 3%) 100%)",
    }}>
      <NoiseOverlay opacity={0.05} />
      <GlowOrb color="hsl(0 60% 35%)" size={600} position="top-1/4 left-1/3" blur={180} opacity={0.06} />
      <GlowOrb color="hsl(0 60% 40%)" size={300} position="bottom-1/4 right-1/4" blur={140} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-destructive/70 mb-4 tracking-[0.2em] uppercase">The problem</p>
          <h2 className="text-center text-4xl lg:text-6xl xl:text-[4rem] font-bold text-white mb-8 leading-tight">
            Why regular cards <span className="gradient-text">don't work</span>
          </h2>
          <p className="text-center text-lg text-white/25 mb-16 max-w-md mx-auto">Traditional banks apply restrictions and filters</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {problems.map((p, i) => (
            <FadeIn key={p} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.03, borderColor: "rgba(255,100,100,0.15)" }}
                className="flex items-center gap-4 rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl p-8 transition-all cursor-default"
                style={{ boxShadow: "0 20px 50px -15px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.03)" }}
              >
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/10 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-destructive/70" />
                </div>
                <span className="text-white/60 font-medium">{p}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY IT WORKS — Glass section
   ═══════════════════════════════════════════════════ */
function WhyItWorks() {
  return (
    <section className="py-36 lg:py-44 bg-background relative overflow-hidden">
      <GlowOrb color="hsl(28 100% 50%)" size={800} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={220} opacity={0.05} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="top-0 right-0" blur={180} opacity={0.03} />
      <NoiseOverlay />
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center relative z-10">
        <FadeIn>
          <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">The solution</p>
          <h2 className="text-4xl lg:text-6xl xl:text-[4rem] font-bold text-foreground mb-8 leading-tight">
            Why this <span className="gradient-text">works</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-20 max-w-xl mx-auto">
            Traditional banks apply restrictions and filters.
            Zerocard uses a different financial infrastructure,
            allowing payments to go through without limitations.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { icon: Globe, label: "Works everywhere", desc: "No country restrictions" },
            { icon: Layers, label: "No restrictions", desc: "Bypass banking filters" },
            { icon: Zap, label: "Any service", desc: "AI tools, streaming, travel" },
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.12}>
              <motion.div whileHover={{ scale: 1.05, y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                <GlassCard className="p-10">
                  <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center"
                    style={{ boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.15)" }}>
                    <item.icon className="w-7 h-7 text-primary" />
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
   COMPARISON TABLE — Dark dramatic section
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
    <section className="py-36 lg:py-44 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(220 15% 4%) 0%, hsl(260 15% 5%) 50%, hsl(220 15% 3%) 100%)",
    }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={800} position="top-0 left-1/2 -translate-x-1/2" blur={200} opacity={0.08} />
      <GlowOrb color="hsl(270 70% 55%)" size={500} position="bottom-0 right-1/4" blur={160} opacity={0.05} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">Side by side</p>
          <h2 className="text-4xl lg:text-6xl xl:text-[4rem] font-bold text-center text-white mb-20 leading-tight">
            Compare for <span className="gradient-text">yourself</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="max-w-2xl mx-auto rounded-[2rem] overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl"
            style={{ boxShadow: "0 40px 100px -25px rgba(0,0,0,0.6), 0 0 80px -30px hsl(28 100% 50% / 0.12)" }}
          >
            <div className="grid grid-cols-3 px-8 py-7 border-b border-white/[0.06]">
              <span />
              <span className="text-sm font-semibold text-white/25 text-center">Regular card</span>
              <span className="text-sm font-bold text-primary text-center">Zerocard</span>
            </div>
            {rows.map((r, i) => (
              <motion.div
                key={r.label}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                className={`grid grid-cols-3 items-center px-8 py-7 transition-colors ${i < rows.length - 1 ? "border-b border-white/[0.04]" : ""}`}
              >
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
   GUIDE — Light premium section
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
    <section className="py-36 lg:py-44 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="-top-20 right-1/4" blur={200} opacity={0.04} />
      <GlowOrb color="hsl(340 80% 55%)" size={300} position="bottom-0 left-1/4" blur={160} opacity={0.03} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading tag="Step-by-step guide" title={<>Setup takes <span className="gradient-text">5 minutes</span></>} subtitle="Follow these simple steps and start paying globally" />
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
                    <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-2 rounded-2xl gradient-bg px-7 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-all"
                      style={{ boxShadow: "0 10px 30px -8px hsl(28 100% 50% / 0.4)" }}>
                      Start <ArrowRight className="w-4 h-4" />
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
   BENEFITS — Dark glass section
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
    <section className="py-36 lg:py-44 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(220 10% 4%) 0%, hsl(220 15% 6%) 50%, hsl(220 10% 3%) 100%)",
    }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={600} position="top-1/4 left-1/4" blur={180} opacity={0.05} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="bottom-1/4 right-1/4" blur={160} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase">Advantages</p>
          <h2 className="text-center text-4xl lg:text-6xl xl:text-[4rem] font-bold text-white mb-20 leading-tight">
            Why <span className="gradient-text">Zerocard</span>
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <motion.div whileHover={{ scale: 1.04, y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="p-10 rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl transition-all h-full"
                  style={{ boxShadow: "0 20px 60px -15px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.04)" }}>
                  <div className="mb-7 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center"
                    style={{ boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.2)" }}>
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
   TRUST — Light premium section
   ═══════════════════════════════════════════════════ */
function TrustSection() {
  return (
    <section className="py-36 lg:py-44 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={700} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={220} opacity={0.05} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="mx-auto mb-10 w-22 h-22 rounded-3xl bg-primary/8 border border-primary/10 flex items-center justify-center"
              style={{ width: 88, height: 88, boxShadow: "0 0 80px -10px hsl(28 100% 50% / 0.2)" }}>
              <Shield className="w-9 h-9 text-primary" />
            </div>
            <h2 className="text-4xl lg:text-6xl xl:text-[4rem] font-bold text-foreground mb-8 leading-tight">
              Financial infrastructure
              <br />
              you can <span className="gradient-text">rely on</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-16">
              Zerocard is powered by a global financial infrastructure used by millions of users worldwide,
              ensuring stability, security, and fast transactions.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid sm:grid-cols-3 gap-7 mb-16">
              {[
                { icon: Lock, label: "Bank-level security" },
                { icon: Fingerprint, label: "KYC verification" },
                { icon: BadgeCheck, label: "Operating since 2019" },
              ].map((item, i) => (
                <motion.div key={item.label} whileHover={{ scale: 1.04, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <GlassCard className="p-9 flex flex-col items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center"
                      style={{ boxShadow: "0 0 30px -8px hsl(28 100% 50% / 0.12)" }}>
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-foreground">{item.label}</span>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-xs text-muted-foreground mb-5 tracking-widest uppercase">Powered by</p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 rounded-2xl border border-border/20 bg-card/60 backdrop-blur-2xl px-10 py-5 cursor-default"
              style={{ boxShadow: "0 12px 40px -12px rgba(0,0,0,0.1)" }}
            >
              <span className="text-2xl font-bold gradient-text tracking-tight">Pionex</span>
            </motion.div>
            <p className="mt-5 text-xs text-muted-foreground/60">
              Global financial platform with world-class infrastructure
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   OBJECTION — Dark glass section
   ═══════════════════════════════════════════════════ */
function FearSection() {
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(220 10% 5%) 100%)",
    }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={500} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={180} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 text-center max-w-2xl relative z-10">
        <FadeIn>
          <h2 className="text-4xl lg:text-6xl xl:text-[4rem] font-bold text-white mb-10 leading-tight">
            Is this <span className="gradient-text">complicated?</span>
          </h2>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl p-12"
            style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.4)" }}
          >
            <p className="text-2xl text-white/80 font-semibold mb-4">
              No.
            </p>
            <p className="text-lg text-white/40 leading-relaxed">
              Works like a normal card.
              <br />
              Setup takes minutes.
              <br />
              <span className="text-white/25">No financial or technical experience needed.</span>
            </p>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   EXTRA — Light section with Yield + Referral
   ═══════════════════════════════════════════════════ */
function ExtraSection() {
  return (
    <section className="py-36 lg:py-44 bg-background relative overflow-hidden">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={500} position="top-1/3 left-1/3" blur={180} opacity={0.03} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <FadeIn>
            <motion.div whileHover={{ scale: 1.03, y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <GlassCard className="p-12 lg:p-14 h-full">
                <div className="mb-7 w-16 h-16 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center"
                  style={{ boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.18)" }}>
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Up to 5% annual yield</h3>
                <p className="text-muted-foreground leading-relaxed">Earn passive income on your card balance with zero effort</p>
              </GlassCard>
            </motion.div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <motion.div whileHover={{ scale: 1.03, y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <GlassCard className="p-12 lg:p-14 h-full">
                <div className="mb-7 w-16 h-16 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center"
                  style={{ boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.18)" }}>
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Referral program</h3>
                <p className="text-muted-foreground leading-relaxed">Invite friends and earn bonuses for every referral</p>
              </GlassCard>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOMO — Dark dramatic section
   ═══════════════════════════════════════════════════ */
function FOMOSection() {
  return (
    <section className="py-36 lg:py-44 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(28 20% 5%) 50%, hsl(0 0% 2%) 100%)",
    }}>
      <NoiseOverlay opacity={0.04} />
      <GlowOrb color="hsl(28 100% 50%)" size={700} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={200} opacity={0.08} />
      <GlowOrb color="hsl(340 80% 55%)" size={400} position="bottom-0 left-1/4" blur={160} opacity={0.04} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 max-w-2xl">
        <FadeIn>
          <div className="mx-auto mb-10 w-20 h-20 rounded-3xl bg-primary/10 border border-primary/15 flex items-center justify-center"
            style={{ boxShadow: "0 0 60px -10px hsl(28 100% 50% / 0.25)" }}>
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl lg:text-6xl xl:text-[4rem] font-bold text-white mb-8 leading-tight">
            Most people discover this{" "}
            <span className="gradient-text">too late</span>
          </h2>
          <p className="text-lg text-white/30 leading-relaxed mb-16">
            While others struggle with failed payments — you already pay without limits
          </p>
          <CTAButton text="Get card for free" size="large" />
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FINAL CTA — Light premium section
   ═══════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-36 lg:py-48 relative overflow-hidden bg-background">
      <NoiseOverlay />
      <GlowOrb color="hsl(28 100% 50%)" size={900} position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={250} opacity={0.07} />
      <GlowOrb color="hsl(340 80% 55%)" size={500} position="bottom-0 right-1/4" blur={180} opacity={0.04} />
      <GlowOrb color="hsl(270 70% 55%)" size={400} position="top-0 left-1/4" blur={160} opacity={0.03} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-tight">
            Start now —{" "}
            <span className="gradient-text">takes 5 minutes</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-16 max-w-md mx-auto">
            Free global payment card with no restrictions
          </p>
          <CTAButton text="Get card for free" size="large" />
          <p className="mt-12 text-sm text-muted-foreground/60">
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
    <footer className="py-14 border-t border-border/10 bg-background">
      <div className="container mx-auto px-6 lg:px-16 text-center">
        <p className="text-lg font-bold gradient-text mb-3">Zerocard</p>
        <p className="text-xs text-muted-foreground/50">© {new Date().getFullYear()} Zerocard. Next-generation global payments.</p>
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
