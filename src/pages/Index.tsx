import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import cardImage from "@/assets/zerocard-orange.png";
import heroImage from "@/assets/pionex-card-hero.webp";
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
} from "lucide-react";

const SIGNUP_URL = "https://www.pionex.com/ru/signUp?r=0uHzysLVYQh";

/* ─── Animated Section Wrapper ─── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Premium CTA Button ─── */
function CTAButton({ text, className = "", size = "default" }: { text: string; className?: string; size?: "default" | "large" }) {
  return (
    <motion.a
      href={SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, boxShadow: "0 0 60px -8px hsl(28 100% 50% / 0.6)" }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex items-center gap-3 rounded-2xl gradient-bg font-semibold text-white transition-all ${
        size === "large" ? "px-10 py-5 text-lg" : "px-8 py-4 text-base"
      } ${className}`}
    >
      {text}
      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}

/* ─── Subtle Badge ─── */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-muted-foreground">
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 1: HERO — Premium product showcase
   ═══════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Premium background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(28 60% 96%) 0%, hsl(0 0% 100%) 60%, hsl(240 10% 98%) 100%)",
      }} />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 right-1/3 w-[800px] h-[800px] rounded-full opacity-[0.12] blur-[150px]"
        style={{ background: "radial-gradient(circle, hsl(28 100% 50%), hsl(340 80% 55%) 60%, transparent 80%)" }} />
      <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(270 70% 55%), transparent 70%)" }} />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 0%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 0%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container mx-auto px-6 lg:px-16 py-28 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <FadeIn>
              <Badge>
                <Sparkles className="w-4 h-4 text-primary" />
                Next-gen payment solution
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-10 text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight leading-[1.08] text-foreground">
                Не проходит
                <br />
                оплата за{" "}
                <span className="gradient-text">ChatGPT</span>?
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-7 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md">
                Глобальная платёжная карта без ограничений.
                <br />
                Подключение за 5 минут.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-md">
                {[
                  "0₽ выпуск карты",
                  "0₽ обслуживание",
                  "Работает по всему миру",
                  "Для AI и подписок",
                ].map((item) => (
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
                <CTAButton text="Получить карту бесплатно" />
                <p className="mt-5 text-xs text-muted-foreground tracking-wide">
                  Безопасно · Быстро · Без блокировок
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right — Premium Card Visual */}
          <FadeIn delay={0.3} className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone backdrop */}
              <motion.div style={{ y: phoneY }} className="relative z-0">
                <img
                  src={heroImage}
                  alt="Zerocard app interface"
                  className="w-full max-w-sm lg:max-w-md opacity-30 blur-[1px]"
                />
              </motion.div>

              {/* Main card — hero focus with 3D tilt */}
              <motion.div
                style={{ y: cardY }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 lg:w-80 z-10"
              >
                {/* Glow behind card */}
                <div className="absolute -inset-8 rounded-3xl opacity-40 blur-[60px]"
                  style={{ background: "radial-gradient(circle, hsl(28 100% 50%), hsl(340 80% 55%) 70%, transparent)" }} />

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
                      filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.25)) drop-shadow(0 10px 20px rgba(255,122,0,0.2))",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Floating accent orbs */}
              <motion.div
                animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-12 right-0 w-12 h-12 rounded-full gradient-bg opacity-70 flex items-center justify-center z-20"
              >
                <CircleDollarSign className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -left-4 w-8 h-8 rounded-full bg-primary/40 backdrop-blur-sm z-20"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 2: STATUS — Used worldwide
   ═══════════════════════════════════════════════════ */
function StatusBar() {
  const items = [
    { icon: Globe, label: "Глобальные платежи" },
    { icon: Smartphone, label: "Apple Pay совместимость" },
    { icon: Zap, label: "Мгновенные транзакции" },
    { icon: Shield, label: "Банковский уровень защиты" },
  ];
  return (
    <section className="py-6 border-y border-border/40 bg-card/50 backdrop-blur-sm">
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
   SECTION 3: THREE STEPS
   ═══════════════════════════════════════════════════ */
function StepsOverview() {
  const steps = [
    { icon: CreditCard, title: "Создаёте карту", desc: "Бесплатный выпуск за пару кликов" },
    { icon: Wallet, title: "Пополняете", desc: "Удобным для вас способом" },
    { icon: ShoppingCart, title: "Платите", desc: "Где угодно в мире без ограничений" },
  ];
  return (
    <section className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <FadeIn>
          <p className="text-sm font-semibold text-primary text-center mb-3 tracking-widest uppercase">
            Как это работает
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-foreground mb-20">
            Три простых шага
          </h2>
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
                {i < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-6 w-5 h-5 text-muted-foreground/30" />
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
   SECTION 4: PROBLEM — Dark contrast block
   ═══════════════════════════════════════════════════ */
function ProblemSection() {
  const problems = [
    "Платежи отклоняются без объяснения",
    "Банки блокируют международные транзакции",
    "Подписки на AI-сервисы не проходят",
    "Географические ограничения и фильтры",
  ];
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 5%) 0%, hsl(0 0% 3%) 100%)",
    }}>
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-white mb-5">
            Почему обычные карты{" "}
            <span className="gradient-text">не работают</span>
          </h2>
          <p className="text-center text-white/40 mb-16 max-w-lg mx-auto text-lg">
            Традиционные банки применяют ограничения и фильтры
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
   SECTION 5: WHY IT WORKS
   ═══════════════════════════════════════════════════ */
function WhyItWorks() {
  return (
    <section className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
        <FadeIn>
          <p className="text-sm font-semibold text-primary mb-3 tracking-widest uppercase">
            Решение
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-8">
            Почему это работает
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-12">
            Традиционные банки применяют ограничения и фильтры.
            Zerocard работает через другую финансовую инфраструктуру,
            позволяя проводить платежи без ограничений.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Globe, label: "Работает везде" },
            { icon: Layers, label: "Без ограничений" },
            { icon: Zap, label: "Любые сервисы" },
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
   SECTION 6: GUIDE — Step by step
   ═══════════════════════════════════════════════════ */
function GuideSection() {
  const steps = [
    { num: "01", title: "Регистрация", desc: "Создайте аккаунт на платформе", cta: true },
    { num: "02", title: "Верификация", desc: "Подтвердите личность — занимает 2 минуты" },
    { num: "03", title: "Выпуск карты", desc: "Виртуальная карта создаётся мгновенно" },
    { num: "04", title: "Пополнение", desc: "Переведите средства на баланс карты" },
    { num: "05", title: "Оплата", desc: "Оплачивайте любые сервисы по всему миру" },
  ];
  return (
    <section className="py-28 lg:py-36" style={{
      background: "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 100%) 100%)",
    }}>
      <div className="container mx-auto px-6 lg:px-16">
        <FadeIn>
          <p className="text-sm font-semibold text-primary text-center mb-3 tracking-widest uppercase">
            Пошаговый гайд
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-foreground mb-20">
            Настройте за 5 минут
          </h2>
        </FadeIn>
        <div className="max-w-2xl mx-auto space-y-5">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 8, boxShadow: "0 8px 40px -12px hsl(28 100% 50% / 0.12)" }}
                className="flex items-center gap-6 rounded-2xl bg-card border border-border/40 p-7 transition-all"
              >
                <div className="text-3xl font-bold gradient-text flex-shrink-0 w-12">
                  {s.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
                </div>
                {s.cta && (
                  <a
                    href={SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    Начать <ArrowRight className="w-4 h-4" />
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
   SECTION 7: BENEFITS — Premium cards grid
   ═══════════════════════════════════════════════════ */
function BenefitsSection() {
  const benefits = [
    { icon: Bot, title: "Оплата ChatGPT и нейросетей", desc: "Без ограничений и блокировок" },
    { icon: Globe, title: "Глобальные платежи", desc: "Работает в любой стране мира" },
    { icon: CreditCard, title: "0₽ выпуск карты", desc: "Полностью бесплатный выпуск" },
    { icon: Coins, title: "0₽ обслуживание", desc: "В отличие от обычных карт" },
    { icon: TrendingUp, title: "Кэшбэк до 1%", desc: "Возврат с каждой покупки" },
    { icon: CircleDollarSign, title: "До 5% на остаток", desc: "Ваши деньги работают на вас" },
  ];
  return (
    <section className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-foreground mb-20">
            Почему <span className="gradient-text">Zerocard</span>
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
   SECTION 8: COMPARISON TABLE — Dark
   ═══════════════════════════════════════════════════ */
function ComparisonSection() {
  const rows = [
    { label: "AI платежи", old: false, zc: true },
    { label: "Глобальные сервисы", old: false, zc: true },
    { label: "Обслуживание", oldText: "Платное", zcText: "0₽" },
    { label: "Ограничения", oldText: "Есть", zcText: "Нет" },
    { label: "Кэшбэк", oldText: "Редко", zcText: "До 1%" },
    { label: "Доход на остаток", old: false, zc: true },
  ];
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(0 0% 5%) 0%, hsl(0 0% 3%) 100%)",
    }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "linear-gradient(135deg, hsl(28 100% 50%), hsl(270 70% 55%))" }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-white mb-20">
            Сравните сами
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
            <div className="grid grid-cols-3 px-7 py-5 border-b border-white/[0.06]">
              <span />
              <span className="text-sm font-semibold text-white/40 text-center">Обычная карта</span>
              <span className="text-sm font-bold text-primary text-center">Zerocard</span>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className={`grid grid-cols-3 items-center px-7 py-5 ${i < rows.length - 1 ? "border-b border-white/[0.04]" : ""}`}
              >
                <span className="text-sm text-white/60">{r.label}</span>
                <div className="flex justify-center">
                  {r.oldText ? (
                    <span className="text-sm text-white/30">{r.oldText}</span>
                  ) : r.old === false ? (
                    <X className="w-5 h-5 text-red-400/60" />
                  ) : (
                    <Check className="w-5 h-5 text-green-400" />
                  )}
                </div>
                <div className="flex justify-center">
                  {r.zcText ? (
                    <span className="text-sm font-bold text-primary">{r.zcText}</span>
                  ) : r.zc ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <X className="w-5 h-5 text-red-400/60" />
                  )}
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
   SECTION 9: TRUST — Financial infrastructure
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
              Финансовая инфраструктура,
              <br />
              которой можно доверять
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
              Zerocard работает на базе глобальной финансовой инфраструктуры,
              которой пользуются миллионы пользователей по всему миру.
              Стабильность, безопасность и скорость транзакций.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid sm:grid-cols-3 gap-5 mb-12">
              {[
                { icon: Lock, label: "Банковская безопасность" },
                { icon: Fingerprint, label: "Верификация KYC" },
                { icon: BadgeCheck, label: "С 2019 года" },
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
              Глобальная криптоплатформа с инфраструктурой мирового уровня
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 10: FEAR REMOVAL
   ═══════════════════════════════════════════════════ */
function FearSection() {
  return (
    <section className="py-24 lg:py-32" style={{
      background: "linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 100%) 100%)",
    }}>
      <div className="container mx-auto px-6 lg:px-16 text-center max-w-2xl">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Это сложно?
          </h2>
          <p className="text-xl text-muted-foreground mb-3 leading-relaxed">
            Нет. Интерфейс как у обычной банковской карты.
          </p>
          <p className="text-muted-foreground">
            Настройка занимает несколько минут.
            <br />
            Не нужен опыт в финансах или технологиях.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 11: EXTRA BENEFITS
   ═══════════════════════════════════════════════════ */
function ExtraSection() {
  return (
    <section className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <FadeIn>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 20px 50px -15px hsl(28 100% 50% / 0.12)" }}
              className="rounded-3xl border border-border/40 bg-card p-10 transition-all"
            >
              <TrendingUp className="w-8 h-8 text-primary mb-5" />
              <h3 className="text-2xl font-bold text-foreground mb-3">До 5% годовых</h3>
              <p className="text-muted-foreground leading-relaxed">
                Получайте доход на остаток средств без каких-либо действий
              </p>
            </motion.div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 20px 50px -15px hsl(28 100% 50% / 0.12)" }}
              className="rounded-3xl border border-border/40 bg-card p-10 transition-all"
            >
              <Users className="w-8 h-8 text-primary mb-5" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Партнёрская программа</h3>
              <p className="text-muted-foreground leading-relaxed">
                Приглашайте друзей и получайте бонусы за каждого
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 12: FOMO — Dark urgency
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
            Большинство узнаёт об этом{" "}
            <span className="gradient-text">слишком поздно</span>
          </h2>
          <p className="text-lg text-white/40 leading-relaxed">
            Пока другие не могут оплатить — вы уже пользуетесь
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 13: FINAL CTA
   ═══════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.06] blur-[120px]"
        style={{ background: "radial-gradient(ellipse at center, hsl(28 100% 50%), transparent 70%)" }} />
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-tight">
            Начните{" "}
            <span className="gradient-text">прямо сейчас</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto">
            Бесплатная глобальная платёжная карта без ограничений
          </p>
          <CTAButton text="Получить карту бесплатно" size="large" />
          <p className="mt-8 text-sm text-muted-foreground">
            0₽ выпуск · 0₽ обслуживание · без ограничений
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
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zerocard. Next-generation global payments.
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <StatusBar />
      <StepsOverview />
      <ProblemSection />
      <WhyItWorks />
      <GuideSection />
      <BenefitsSection />
      <ComparisonSection />
      <TrustSection />
      <FearSection />
      <ExtraSection />
      <FOMOSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
