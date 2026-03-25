import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import cardImage from "@/assets/zerocard-orange.png";
import {
  CreditCard,
  Wallet,
  ShoppingCart,
  Globe,
  Shield,
  TrendingUp,
  Zap,
  ArrowRight,
  Check,
  X,
  Coins,
  Users,
  Clock,
  ChevronRight,
  Sparkles,
  BadgeCheck,
  CircleDollarSign,
  Bot,
  Smartphone,
  Lock,
  Layers,
  Fingerprint,
  Brain,
  Plane,
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

/* ─── CTA Button ─── */
function CTAButton({ text, className = "", size = "default" }: { text: string; className?: string; size?: "default" | "large" }) {
  return (
    <motion.a
      href={SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, boxShadow: "0 0 80px -10px hsl(28 100% 50% / 0.5)" }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center gap-3 rounded-2xl gradient-bg font-semibold text-white transition-all shadow-lg ${
        size === "large" ? "px-12 py-5 text-lg" : "px-8 py-4 text-base"
      } ${className}`}
    >
      {text}
      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}

/* ─── Badge ─── */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-muted-foreground">
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(28 60% 96%) 0%, hsl(0 0% 100%) 60%, hsl(240 10% 98%) 100%)",
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[900px] h-[900px] rounded-full opacity-[0.1] blur-[160px]"
        style={{ background: "radial-gradient(circle, hsl(28 100% 50%), hsl(340 80% 55%) 60%, transparent 80%)" }} />
      <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(270 70% 55%), transparent 70%)" }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 0%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 0%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container mx-auto px-6 lg:px-16 py-28 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left */}
          <div className="max-w-xl">
            <FadeIn>
              <Badge>
                <Sparkles className="w-4 h-4 text-primary" />
                Next-generation payments
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-10 text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight leading-[1.08] text-foreground">
                Payment for
                <br />
                <span className="gradient-text">ChatGPT</span> not working?
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-7 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md">
                Use a card that works without restrictions.
                <br />
                Setup takes 5 minutes.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-md">
                {["0€ card issuance", "0€ monthly fees", "Works worldwide", "AI tools & subscriptions"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-foreground/75">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-12">
                <CTAButton text="Get card for free" />
                <p className="mt-5 text-xs text-muted-foreground tracking-wide">
                  Secure · Fast · No restrictions · 5 minutes setup
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right — Card visual */}
          <FadeIn delay={0.3} className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 lg:w-[420px]">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-50 blur-[80px] scale-110"
                style={{ background: "radial-gradient(circle, hsl(28 100% 50%), hsl(340 80% 55%) 70%, transparent)" }} />

              <motion.div
                style={{ y: cardY }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <motion.div
                  whileHover={{ rotateY: 8, rotateX: -4, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                >
                  <img
                    src={cardImage}
                    alt="Zerocard — global payment card"
                    className="w-full rounded-2xl relative z-10"
                    style={{
                      filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.3)) drop-shadow(0 15px 30px rgba(255,122,0,0.25))",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Floating accents */}
              <motion.div
                animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full gradient-bg opacity-70 flex items-center justify-center z-20"
              >
                <CircleDollarSign className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 -left-6 w-8 h-8 rounded-full bg-primary/30 backdrop-blur-sm z-20"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MICRO-BRIDGE — What happens next
   ═══════════════════════════════════════════════════ */
function MicroBridge() {
  const steps = [
    { icon: CreditCard, label: "Sign up (2 min)" },
    { icon: Fingerprint, label: "Verify identity" },
    { icon: Wallet, label: "Get your card" },
    { icon: ShoppingCart, label: "Start paying" },
  ];
  return (
    <section className="py-10 border-y border-border/30 bg-card/40 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-16">
        <p className="text-center text-sm text-muted-foreground mb-6 font-medium">What happens next</p>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2.5 text-sm text-foreground/70">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
              {s.label}
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground/30 ml-4 hidden sm:block" />}
            </div>
          ))}
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
    <section className="py-6 border-b border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <item.icon className="w-4 h-4 text-primary" />
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
    { icon: Brain, name: "Midjourney" },
    { icon: Sparkles, name: "Claude" },
    { icon: Layers, name: "Subscriptions" },
    { icon: Plane, name: "Travel bookings" },
  ];
  return (
    <section className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-16 text-center">
        <FadeIn>
          <p className="text-sm font-semibold text-primary mb-3 tracking-widest uppercase">Works everywhere</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Pay for everything that
            <br />
            <span className="gradient-text">didn't work before</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-16">
            AI tools, global subscriptions, travel — all unlocked with one card.
          </p>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-5 max-w-3xl mx-auto">
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 16px 50px -12px hsl(28 100% 50% / 0.15)" }}
                className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card px-7 py-5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">{s.name}</span>
              </motion.div>
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
    <section className="py-28 lg:py-36" style={{ background: "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 100%) 100%)" }}>
      <div className="container mx-auto px-6 lg:px-16">
        <FadeIn>
          <p className="text-sm font-semibold text-primary text-center mb-3 tracking-widest uppercase">How it works</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-foreground mb-20">Three simple steps</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 20px 60px -15px hsl(28 100% 50% / 0.15)" }}
                className="relative rounded-3xl border border-border/50 bg-card p-10 text-center transition-all"
              >
                <div className="mb-2 text-xs font-bold text-primary/60 tracking-widest">0{i + 1}</div>
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < 2 && <ChevronRight className="hidden md:block absolute top-1/2 -right-6 w-5 h-5 text-muted-foreground/30" />}
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
  const problems = [
    "Payments declined without explanation",
    "Banks block international transactions",
    "AI service subscriptions fail",
    "Regional restrictions and filters",
  ];
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 5%) 0%, hsl(0 0% 3%) 100%)",
    }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-white mb-5">
            Why regular cards <span className="gradient-text">don't work</span>
          </h2>
          <p className="text-center text-white/40 mb-16 max-w-lg mx-auto text-lg">
            Traditional banks apply restrictions and filters
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {problems.map((p, i) => (
            <FadeIn key={p} delay={i * 0.1}>
              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-400/80" />
                </div>
                <span className="text-white/70 font-medium text-[0.95rem]">{p}</span>
              </div>
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
    <section className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
        <FadeIn>
          <p className="text-sm font-semibold text-primary mb-3 tracking-widest uppercase">The solution</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-8">Why this works</h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-12">
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
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.2)" }}
                className="rounded-3xl border border-border/50 bg-card p-8 transition-all"
              >
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground">{item.label}</h3>
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
  const rows = [
    { label: "AI payments", old: false, zc: true },
    { label: "Global services", old: false, zc: true },
    { label: "Monthly fees", oldText: "Paid", zcText: "0€" },
    { label: "Restrictions", oldText: "Yes", zcText: "None" },
    { label: "Cashback", oldText: "Rare", zcText: "Up to 1%" },
    { label: "Yield on balance", old: false, zc: true },
  ];
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 5%) 0%, hsl(0 0% 3%) 100%)",
    }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "linear-gradient(135deg, hsl(28 100% 50%), hsl(270 70% 55%))" }} />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-white mb-20">Compare for yourself</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
            <div className="grid grid-cols-3 px-7 py-5 border-b border-white/[0.06]">
              <span />
              <span className="text-sm font-semibold text-white/40 text-center">Regular card</span>
              <span className="text-sm font-bold text-primary text-center">Zerocard</span>
            </div>
            {rows.map((r, i) => (
              <div key={r.label} className={`grid grid-cols-3 items-center px-7 py-5 ${i < rows.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
                <span className="text-sm text-white/60">{r.label}</span>
                <div className="flex justify-center">
                  {r.oldText ? <span className="text-sm text-white/30">{r.oldText}</span> :
                   r.old === false ? <X className="w-5 h-5 text-red-400/60" /> :
                   <Check className="w-5 h-5 text-green-400" />}
                </div>
                <div className="flex justify-center">
                  {r.zcText ? <span className="text-sm font-bold text-primary">{r.zcText}</span> :
                   r.zc ? <Check className="w-5 h-5 text-green-400" /> :
                   <X className="w-5 h-5 text-red-400/60" />}
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
   GUIDE — Step by step
   ═══════════════════════════════════════════════════ */
function GuideSection() {
  const steps = [
    { num: "01", title: "Register", desc: "Create your account — takes 2 minutes", cta: true },
    { num: "02", title: "Verification", desc: "Verify your identity — like any bank" },
    { num: "03", title: "Order card", desc: "Virtual card is issued instantly" },
    { num: "04", title: "Fund (USDT)", desc: "Top up your card balance" },
    { num: "05", title: "Pay normally", desc: "Use it like any regular payment card" },
  ];
  return (
    <section className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <FadeIn>
          <p className="text-sm font-semibold text-primary text-center mb-3 tracking-widest uppercase">Step-by-step guide</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-foreground mb-20">Setup takes 5 minutes</h2>
        </FadeIn>
        <div className="max-w-2xl mx-auto space-y-5">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 8, boxShadow: "0 8px 40px -12px hsl(28 100% 50% / 0.12)" }}
                className="flex items-center gap-6 rounded-2xl bg-card border border-border/40 p-7 transition-all"
              >
                <div className="text-3xl font-bold gradient-text flex-shrink-0 w-12">{s.num}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
                </div>
                {s.cta && (
                  <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                    Start <ArrowRight className="w-4 h-4" />
                  </a>
                )}
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
  const benefits = [
    { icon: Bot, title: "Pay for AI tools", desc: "ChatGPT, Midjourney, Claude — no blocks" },
    { icon: Globe, title: "Global payments", desc: "Works in any country worldwide" },
    { icon: CreditCard, title: "0€ issuance", desc: "Completely free card creation" },
    { icon: Coins, title: "0€ monthly fees", desc: "Unlike traditional bank cards" },
    { icon: TrendingUp, title: "Cashback up to 1%", desc: "Earn back on every purchase" },
    { icon: CircleDollarSign, title: "Up to 5% annual yield", desc: "Your balance works for you" },
  ];
  return (
    <section className="py-28 lg:py-36" style={{ background: "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 100%) 100%)" }}>
      <div className="container mx-auto px-6 lg:px-16">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-foreground mb-20">
            Why <span className="gradient-text">Zerocard</span>
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 50px -15px hsl(28 100% 50% / 0.12)" }}
                className="rounded-3xl border border-border/40 bg-card p-8 transition-all"
              >
                <div className="mb-5 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1.5">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TRUST — Financial infrastructure
   ═══════════════════════════════════════════════════ */
function TrustSection() {
  return (
    <section className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="mx-auto mb-8 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Financial infrastructure
              <br />
              you can rely on
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
              Zerocard is powered by a global financial infrastructure used by millions of users worldwide,
              ensuring stability, security, and fast transactions.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid sm:grid-cols-3 gap-5 mb-12">
              {[
                { icon: Lock, label: "Bank-level security" },
                { icon: Fingerprint, label: "KYC verification" },
                { icon: BadgeCheck, label: "Operating since 2019" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/40 bg-card p-6 flex flex-col items-center gap-3">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-xs text-muted-foreground mb-3">Powered by</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm px-6 py-3">
              <span className="text-lg font-bold gradient-text tracking-tight">Pionex</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Global financial platform with world-class infrastructure
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   OBJECTION — Is this complicated?
   ═══════════════════════════════════════════════════ */
function FearSection() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 100%) 100%)" }}>
      <div className="container mx-auto px-6 lg:px-16 text-center max-w-2xl">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Is this complicated?</h2>
          <p className="text-xl text-muted-foreground mb-3 leading-relaxed">
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
    <section className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <FadeIn>
            <motion.div whileHover={{ y: -6, boxShadow: "0 20px 50px -15px hsl(28 100% 50% / 0.12)" }}
              className="rounded-3xl border border-border/40 bg-card p-10 transition-all">
              <TrendingUp className="w-8 h-8 text-primary mb-5" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Up to 5% annual yield</h3>
              <p className="text-muted-foreground leading-relaxed">Earn passive income on your card balance with zero effort</p>
            </motion.div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <motion.div whileHover={{ y: -6, boxShadow: "0 20px 50px -15px hsl(28 100% 50% / 0.12)" }}
              className="rounded-3xl border border-border/40 bg-card p-10 transition-all">
              <Users className="w-8 h-8 text-primary mb-5" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Referral program</h3>
              <p className="text-muted-foreground leading-relaxed">Invite friends and earn bonuses for every referral</p>
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
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 5%) 0%, hsl(0 0% 2%) 100%)",
    }}>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(hsl(28 100% 50%) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 max-w-2xl">
        <FadeIn>
          <Clock className="w-10 h-10 mx-auto mb-8 text-primary" />
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Most people discover this{" "}
            <span className="gradient-text">too late</span>
          </h2>
          <p className="text-lg text-white/40 leading-relaxed">
            While others struggle with failed payments — you already pay without limits
          </p>
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
    <section className="py-28 lg:py-36 relative overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.06] blur-[120px]"
        style={{ background: "radial-gradient(ellipse at center, hsl(28 100% 50%), transparent 70%)" }} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-5 leading-tight">
            Start now —{" "}
            <span className="gradient-text">takes 5 minutes</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto">
            Free global payment card with no restrictions
          </p>
          <CTAButton text="Get card for free" size="large" />
          <p className="mt-8 text-sm text-muted-foreground">
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
    <footer className="py-10 border-t border-border/40 bg-background">
      <div className="container mx-auto px-6 lg:px-16 text-center">
        <p className="text-sm font-bold gradient-text mb-2">Zerocard</p>
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
    <MicroBridge />
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
