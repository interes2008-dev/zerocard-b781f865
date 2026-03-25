import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import heroImage from "@/assets/pionex-card-hero.webp";
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── CTA Button ─── */
function CTAButton({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.a
      href={SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, boxShadow: "0 0 40px -5px hsl(28 100% 50% / 0.5)" }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-2 rounded-2xl gradient-bg px-8 py-4 text-lg font-semibold text-white transition-all ${className}`}
    >
      {text}
      <ArrowRight className="w-5 h-5" />
    </motion.a>
  );
}

/* ─── SECTION 1: HERO ─── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(30 30% 97%) 50%, hsl(28 40% 95%) 100%)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]" style={{background: "linear-gradient(135deg, hsl(28 100% 50%), hsl(340 80% 55%))"}} />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{background: "linear-gradient(135deg, hsl(270 70% 55%), hsl(28 100% 50%))"}} />

      <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm font-medium text-foreground/80">
                <Sparkles className="w-4 h-4 text-primary" />
                Финтех нового поколения
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
                Не проходит оплата за{" "}
                <span className="gradient-text">ChatGPT</span>?
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md">
                Используйте карту, которая работает без ограничений.
                <br />
                Подключение за 5 минут.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
                {[
                  "0₽ выпуск карты",
                  "0₽ обслуживание",
                  "Работает по всему миру",
                  "Для AI и подписок",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-10">
                <CTAButton text="Получить карту бесплатно" />
                <p className="mt-4 text-xs text-muted-foreground">
                  Безопасно • Быстро • Без блокировок
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right — Visual */}
          <FadeIn delay={0.3} className="relative flex justify-center lg:justify-end">
            <motion.div style={{ y }} className="relative">
              <img
                src={heroImage}
                alt="Zerocard — мобильное приложение с виртуальной картой"
                className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
              />
              {/* Floating card overlay */}
              <motion.div
                style={{ y: cardY }}
                className="absolute -bottom-4 -left-8 lg:-left-16 w-48 lg:w-56"
              >
                <img
                  src={cardImage}
                  alt="Zerocard Orange — виртуальная карта Mastercard"
                  className="w-full rounded-xl glow-orange soft-shadow"
                />
              </motion.div>
              {/* Floating coin accents */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-8 -right-4 w-10 h-10 rounded-full gradient-bg opacity-80 flex items-center justify-center"
              >
                <CircleDollarSign className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-24 -right-8 w-8 h-8 rounded-full bg-primary/60 backdrop-blur opacity-70"
              />
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 2: 3 STEPS ─── */
function StepsOverview() {
  const steps = [
    { icon: CreditCard, title: "Создаёте карту", desc: "Бесплатно за пару кликов" },
    { icon: Wallet, title: "Пополняете", desc: "USDT или другие способы" },
    { icon: ShoppingCart, title: "Платите", desc: "Где угодно в мире" },
  ];
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-16">
            Три простых шага
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                className="relative rounded-3xl bg-card p-8 text-center soft-shadow"
              >
                <div className="mb-1 text-xs font-semibold text-primary">0{i + 1}</div>
                <div className="mx-auto mb-5 w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-5 w-5 h-5 text-muted-foreground/40" />
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 3: PROBLEM ─── */
function ProblemSection() {
  const problems = [
    "Платежи отклоняются",
    "Банки блокируют транзакции",
    "Не проходят подписки",
    "Ограничения по странам",
  ];
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{background: "linear-gradient(180deg, hsl(0 0% 6%) 0%, hsl(0 0% 4%) 100%)"}}>
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: "radial-gradient(hsl(28 100% 50%) 1px, transparent 1px)", backgroundSize: "30px 30px"}} />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-white mb-4">
            Почему обычные карты{" "}
            <span className="gradient-text">не работают</span>
          </h2>
          <p className="text-center text-white/50 mb-16 max-w-md mx-auto">
            Знакомая ситуация?
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {problems.map((p, i) => (
            <FadeIn key={p} delay={i * 0.1}>
              <div className="flex items-center gap-4 rounded-2xl glass-dark p-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-white/80 font-medium">{p}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 4: SOLUTION ─── */
function SolutionSection() {
  const solutions = [
    { icon: Globe, text: "Работает везде" },
    { icon: Shield, text: "Обходит ограничения" },
    { icon: Zap, text: "Подходит для любых сервисов" },
  ];
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm font-semibold text-primary text-center mb-3 tracking-widest uppercase">
            Решение
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-foreground mb-16">
            Карта, которая просто работает
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {solutions.map((s, i) => (
            <FadeIn key={s.text} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 0 40px -10px hsl(28 100% 50% / 0.25)" }}
                className="rounded-3xl border border-border bg-card p-8 text-center transition-all"
              >
                <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{s.text}</h3>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 5: GUIDE ─── */
function GuideSection() {
  const steps = [
    { num: "01", title: "Регистрация", desc: "Создайте аккаунт на платформе", cta: true },
    { num: "02", title: "Верификация", desc: "Подтвердите личность за 2 минуты", cta: false },
    { num: "03", title: "Заказ карты", desc: "Выпуск виртуальной карты мгновенно", cta: false },
    { num: "04", title: "Пополнение", desc: "Переведите USDT на баланс карты", cta: false },
    { num: "05", title: "Оплата", desc: "Оплачивайте любые сервисы в мире", cta: false },
  ];
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm font-semibold text-primary text-center mb-3 tracking-widest uppercase">
            Пошаговый гайд
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-foreground mb-16">
            Настройте за 5 минут
          </h2>
        </FadeIn>
        <div className="max-w-2xl mx-auto space-y-6">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-center gap-6 rounded-2xl bg-card p-6 soft-shadow border border-border/50"
              >
                <div className="text-3xl font-bold gradient-text flex-shrink-0 w-12">
                  {s.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
                {s.cta && (
                  <a
                    href={SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 rounded-xl gradient-bg px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
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

/* ─── SECTION 6: BENEFITS ─── */
function BenefitsSection() {
  const benefits = [
    { icon: Bot, title: "Оплата ChatGPT и нейросетей", desc: "Без ограничений и блокировок" },
    { icon: Globe, title: "Глобальные платежи", desc: "Работает в любой стране мира" },
    { icon: CreditCard, title: "0₽ выпуск", desc: "Полностью бесплатный выпуск карты" },
    { icon: Coins, title: "0₽ обслуживание", desc: "Никаких ежемесячных платежей" },
    { icon: TrendingUp, title: "Кэшбэк до 1%", desc: "Возврат с каждой покупки" },
    { icon: CircleDollarSign, title: "До 5% на остаток", desc: "Ваши деньги работают на вас" },
  ];
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-foreground mb-16">
            Почему <span className="gradient-text">Zerocard</span>
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-border bg-card p-7 transition-all"
              >
                <div className="mb-4 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 7: COMPARISON ─── */
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
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{background: "linear-gradient(180deg, hsl(0 0% 6%) 0%, hsl(0 0% 4%) 100%)"}}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10 blur-[120px]" style={{background: "linear-gradient(135deg, hsl(28 100% 50%), hsl(270 70% 55%))"}} />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-white mb-16">
            Сравните сами
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden glass-dark">
            {/* Header */}
            <div className="grid grid-cols-3 px-6 py-5 border-b border-white/10">
              <span className="text-sm text-white/40"></span>
              <span className="text-sm font-semibold text-white/60 text-center">Обычная карта</span>
              <span className="text-sm font-semibold text-primary text-center">Zerocard</span>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className={`grid grid-cols-3 items-center px-6 py-4 ${i < rows.length - 1 ? "border-b border-white/5" : ""}`}
              >
                <span className="text-sm text-white/70">{r.label}</span>
                <div className="flex justify-center">
                  {r.oldText ? (
                    <span className="text-sm text-white/40">{r.oldText}</span>
                  ) : r.old === false ? (
                    <X className="w-5 h-5 text-red-400/70" />
                  ) : (
                    <Check className="w-5 h-5 text-green-400" />
                  )}
                </div>
                <div className="flex justify-center">
                  {r.zcText ? (
                    <span className="text-sm font-semibold text-primary">{r.zcText}</span>
                  ) : r.zc ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <X className="w-5 h-5 text-red-400/70" />
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

/* ─── SECTION 8: TRUST ─── */
function TrustSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <FadeIn>
          <BadgeCheck className="w-12 h-12 mx-auto mb-6 text-primary" />
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
            Надёжная инфраструктура
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Работает через инфраструктуру крупной платформы с 2019 года
          </p>
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3">
            <span className="text-lg font-bold gradient-text">Pionex</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── SECTION 9: FEAR ─── */
function FearSection() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12 text-center max-w-2xl">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Это сложно?
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            Нет. Интерфейс как у обычной карты.
          </p>
          <p className="text-muted-foreground">
            Настройка занимает несколько минут.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── SECTION 10: EXTRA ─── */
function ExtraSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <FadeIn>
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-border bg-card p-8"
            >
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">До 5% годовых</h3>
              <p className="text-muted-foreground">
                Получайте доход на остаток без каких-либо действий
              </p>
            </motion.div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-border bg-card p-8"
            >
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Партнёрская программа</h3>
              <p className="text-muted-foreground">
                Приглашайте друзей и получайте бонусы
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 11: FOMO ─── */
function FOMOSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{background: "linear-gradient(180deg, hsl(0 0% 6%) 0%, hsl(0 0% 3%) 100%)"}}>
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "radial-gradient(hsl(28 100% 50%) 1px, transparent 1px)", backgroundSize: "24px 24px"}} />
      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10 max-w-2xl">
        <FadeIn>
          <Clock className="w-10 h-10 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Большинство узнаёт об этом{" "}
            <span className="gradient-text">слишком поздно</span>
          </h2>
          <p className="text-lg text-white/50">
            Пока другие не могут оплатить — вы уже пользуетесь
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── SECTION 12: FINAL CTA ─── */
function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-10 blur-[100px]" style={{background: "radial-gradient(ellipse at center, hsl(28 100% 50%), transparent 70%)"}} />
      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Начните{" "}
            <span className="gradient-text">прямо сейчас</span>
          </h2>
          <CTAButton text="Получить карту бесплатно" className="text-xl px-10 py-5" />
          <p className="mt-6 text-sm text-muted-foreground">
            0₽ выпуск • 0₽ обслуживание • без ограничений
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zerocard. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <StepsOverview />
      <ProblemSection />
      <SolutionSection />
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
