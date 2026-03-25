import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Lang = "en" | "ru";

const translations = {
  en: {
    // Navbar
    navHowItWorks: "How it works",
    navWhyZerocard: "Why Zerocard",
    navSafety: "Safety",
    navGetCard: "Get your card",

    // Hero
    heroBadge: "Next-generation payments",
    heroTitle1: "Virtual card",
    heroTitle2: " for",
    heroTitle3: "global payments",
    heroPowered: "Powered by",
    heroInfra: "infrastructure",
    heroDesc1: "Pay for ChatGPT, Claude, Spotify, Netflix, Midjourney",
    heroDesc2: "and any global service — setup in 5 minutes",
    heroFeat1: "0€ card issuance",
    heroFeat2: "0€ monthly fees",
    heroFeat3: "Works worldwide",
    heroFeat4: "AI tools & subscriptions",
    heroCTA: "Get your card for free",
    heroMicro: "No monthly fees • Free card • Cashback",
    heroStat1: "Countries",
    heroStat2: "Setup",
    heroStat3: "Fees",
    heroCashback: "Cashback 1%",
    heroCountries: "150+ countries",

    // Infrastructure
    infraTag: "Built for trust",
    infraTitle1: "Powered by real ",
    infraTitle2: "financial infrastructure",
    infraDesc: "Zerocard operates on the infrastructure of a global platform trusted by millions — ensuring stability, security, and instant transactions.",
    infraCard1Title: "Security",
    infraCard1Desc: "Enterprise-grade encryption and multi-layer fraud protection",
    infraCard2Title: "Reliability",
    infraCard2Desc: "99.9% uptime with globally distributed payment infrastructure",
    infraCard3Title: "24/7 Access",
    infraCard3Desc: "Manage your finances anytime, anywhere in the world",
    infraPoweredBy: "Powered by",
    infraSince: "since 2019",

    // Ticker
    tickerTitle: "Works with services where regular cards fail",
    tickerSub: "AI tools, subscriptions and global services",

    // Status bar
    statusGlobal: "Global payments",
    statusApple: "Apple Pay compatible",
    statusInstant: "Instant transactions",
    statusSecurity: "Bank-level security",

    // AI Use Cases
    aiTag: "No restrictions",
    aiTitle1: "Pay without ",
    aiTitle2: "restrictions",
    aiDesc: "Services that don't accept your regular card — work with Zerocard",
    aiChatGPT: "AI assistant",
    aiClaude: "AI by Anthropic",
    aiMidjourney: "AI image generation",

    // Steps Overview
    stepsTag: "How it works",
    stepsTitle: "Start in 5 minutes",
    stepsStep: "Step",
    step1Title: "Sign up",
    step1Desc: "Create an account in a couple of minutes",
    step2Title: "Verify your identity",
    step2Desc: "Standard check (like in banks), takes a few minutes. This is standard process.",
    step3Title: "Get your card",
    step3Desc: "Issue your virtual card for free",
    step4Title: "Fund your balance",
    step4Desc: "Transfer USDT easily",
    step5Title: "Pay anywhere",
    step5Desc: "Use it for subscriptions, services and travel",

    // Problem
    problemTag: "The problem",
    problemTitle1: "Why regular cards ",
    problemTitle2: "don't work",
    problemDesc: "Traditional banks apply restrictions and filters",
    problem1: "Payments declined without explanation",
    problem2: "Banks block international transactions",
    problem3: "AI service subscriptions fail",
    problem4: "Regional restrictions and filters",
    solutionTitle1: "ZeroCard ",
    solutionTitle2: "solves this",
    solutionDesc: "No restrictions. No blocks. Just payments that work.",

    // Why it works
    whyTag: "The explanation",
    whyTitle1: "Why this card ",
    whyTitle2: "works",
    whyDesc: "Regular banks block payments to many online services. Zerocard uses a separate financial infrastructure — so your payments go through without filters or restrictions.",
    whyCard1: "Works everywhere",
    whyCard1Desc: "No country restrictions",
    whyCard2: "No restrictions",
    whyCard2Desc: "Bypass banking filters",
    whyCard3: "Any service",
    whyCard3Desc: "AI tools, streaming, travel",

    // Comparison
    compTag: "Why not a regular card",
    compTitle1: "Why not a ",
    compTitle2: "regular bank card",
    compDesc: "See the difference for yourself",
    compRegular: "Regular card",
    compAI: "AI payments",
    compGlobal: "Global services",
    compFees: "Monthly fees",
    compFeesPaid: "Paid",
    compRestrictions: "Restrictions",
    compRestYes: "Yes",
    compRestNone: "None",
    compCashback: "Cashback",
    compCashbackRare: "Rare",
    compCashbackVal: "Up to 1%",
    compYield: "Yield on balance",

    // Better than banks
    bankTag: "Banks vs Zerocard",
    bankTitle1: "Why this is ",
    bankTitle2: "better than banks",
    bankDesc: "Traditional banks weren't built for the modern digital economy",
    bank1Title: "No borders",
    bank1Desc: "Pay for any service in any country — no geographic blocks",
    bank2Title: "No delays",
    bank2Desc: "Instant card issuance and real-time transactions",
    bank3Title: "No hidden fees",
    bank3Desc: "0€ issuance, 0€ monthly — banks charge for everything",
    bank4Title: "No censorship",
    bank4Desc: "Banks decide what you can pay for — Zerocard doesn't",

    // Guide
    guideTag: "Step-by-step guide",
    guideTitle1: "Setup takes ",
    guideTitle2: "5 minutes",
    guideSub: "Follow these simple steps and start paying globally",
    guide1Title: "Sign up",
    guide1Desc: "Create your account in a couple of minutes",
    guide2Title: "Verification",
    guide2Desc: "Simple identity check — like any bank",
    guide3Title: "Get your card",
    guide3Desc: "Virtual card is issued instantly",
    guide4Title: "Fund balance",
    guide4Desc: "Top up your card with USDT",
    guide5Title: "Pay normally",
    guide5Desc: "Use it like any regular payment card",
    guideStart: "Start",

    // Benefits
    benefitsTag: "Advantages",
    benefitsTitle1: "Why ",
    benefitsTitle2: "Zerocard",
    benAI: "Pay for AI tools",
    benAIDesc: "ChatGPT, Midjourney, Claude — no blocks",
    benGlobal: "Global payments",
    benGlobalDesc: "Works in any country worldwide",
    benFree: "0€ issuance",
    benFreeDesc: "Completely free card creation",
    benNoFees: "0€ monthly fees",
    benNoFeesDesc: "Unlike traditional bank cards",
    benCashback: "Cashback up to 1%",
    benCashbackDesc: "Earn back on every purchase",
    benYield: "Up to 5% annual yield",
    benYieldDesc: "Your balance works for you",

    // Standard Process
    stdTag: "Nothing unusual",
    stdTitle1: "This is a ",
    stdTitle2: "standard process",
    stdDesc: "Everything works exactly like traditional banking — just without the restrictions",
    std1Title: "Identity verification",
    std1Desc: "Same process used by every bank and financial institution",
    std2Title: "Regulated platform",
    std2Desc: "Operated by a licensed financial infrastructure provider",
    std3Title: "App-based management",
    std3Desc: "Control your card from your phone, just like mobile banking",

    // Safety
    safetyTag: "Security first",
    safetyTitle1: "Why it's ",
    safetyTitle2: "safe",
    safetyDesc: "Your money and data are protected at every level",
    safe1Title: "Account protection (2FA)",
    safe1Desc: "Multi-layer security with two-factor authentication and real-time monitoring",
    safe2Title: "Identity verification",
    safe2Desc: "Standard process — same as any regulated bank or financial institution",
    safe3Title: "Transaction control",
    safe3Desc: "Freeze, unfreeze, set limits — full control from your phone",
    safe4Title: "Real infrastructure",
    safe4Desc: "Built on a licensed financial platform used by millions worldwide",

    // Trust
    trustTitle1: "Financial infrastructure",
    trustTitle2: "you can ",
    trustTitle3: "rely on",
    trustDesc: "Zerocard is powered by a global financial infrastructure used by millions of users worldwide, ensuring stability, security, and fast transactions.",
    trustSec: "Bank-level security",
    trustKYC: "KYC verification",
    trustSince: "Operating since 2019",
    trustPowered: "Powered by",
    trustPlatform: "Global financial platform with world-class infrastructure",

    // Fear
    fearTitle1: "Is this ",
    fearTitle2: "complicated?",
    fearNo: "No.",
    fearDesc1: "Works like a normal card.",
    fearDesc2: "Setup takes minutes.",
    fearDesc3: "No financial or technical experience needed.",

    // Extra
    extraYield: "Up to 5% annual yield",
    extraYieldDesc: "Your USDT balance earns interest — unlike traditional bank accounts",
    extraRef: "Referral program",
    extraRefDesc: "Invite friends and earn bonuses for every referral",

    // FOMO
    fomoTitle1: "Most people discover this ",
    fomoTitle2: "too late",
    fomoDesc: "While others struggle with failed payments — you already pay without limits",

    // Final CTA
    finalTitle: "Start now",
    finalDesc: "Free global payment card with no restrictions",
    final1: "5 min signup",
    final2: "Simple verification",
    final3: "Free card",
    finalSub: "0€ issuance · 0€ monthly fees · global payments",

    // Footer
    footerCopy: "Next-generation global payments.",
  },
  ru: {
    // Navbar
    navHowItWorks: "Как это работает",
    navWhyZerocard: "Почему Zerocard",
    navSafety: "Безопасность",
    navGetCard: "Получить карту",

    // Hero
    heroBadge: "Платежи нового поколения",
    heroTitle1: "Виртуальная карта",
    heroTitle2: " для",
    heroTitle3: "глобальных платежей",
    heroPowered: "На базе",
    heroInfra: "инфраструктуры",
    heroDesc1: "Оплачивайте ChatGPT, Claude, Spotify, Netflix, Midjourney",
    heroDesc2: "и любые глобальные сервисы — старт за 5 минут",
    heroFeat1: "Выпуск карты 0€",
    heroFeat2: "Обслуживание 0€",
    heroFeat3: "Работает по всему миру",
    heroFeat4: "ИИ-сервисы и подписки",
    heroCTA: "Получить карту бесплатно",
    heroMicro: "Без абонплаты • Бесплатная карта • Кешбэк",
    heroStat1: "Стран",
    heroStat2: "Настройка",
    heroStat3: "Комиссии",
    heroCashback: "Кешбэк 1%",
    heroCountries: "150+ стран",

    // Infrastructure
    infraTag: "Надёжная основа",
    infraTitle1: "На базе реальной ",
    infraTitle2: "финансовой инфраструктуры",
    infraDesc: "Zerocard работает на инфраструктуре глобальной платформы, которой доверяют миллионы — стабильность, безопасность и мгновенные транзакции.",
    infraCard1Title: "Безопасность",
    infraCard1Desc: "Шифрование корпоративного уровня и многоуровневая защита",
    infraCard2Title: "Надёжность",
    infraCard2Desc: "99.9% аптайм с глобально распределённой инфраструктурой",
    infraCard3Title: "Доступ 24/7",
    infraCard3Desc: "Управляйте финансами в любое время из любой точки мира",
    infraPoweredBy: "На базе",
    infraSince: "с 2019 года",

    // Ticker
    tickerTitle: "Работает с сервисами, где обычные карты не проходят",
    tickerSub: "ИИ-инструменты, подписки и глобальные сервисы",

    // Status bar
    statusGlobal: "Глобальные платежи",
    statusApple: "Совместимо с Apple Pay",
    statusInstant: "Мгновенные транзакции",
    statusSecurity: "Банковская безопасность",

    // AI Use Cases
    aiTag: "Без ограничений",
    aiTitle1: "Платите без ",
    aiTitle2: "ограничений",
    aiDesc: "Сервисы, которые не принимают вашу карту — работают с Zerocard",
    aiChatGPT: "ИИ-ассистент",
    aiClaude: "ИИ от Anthropic",
    aiMidjourney: "Генерация изображений",

    // Steps Overview
    stepsTag: "Как это работает",
    stepsTitle: "Старт за 5 минут",
    stepsStep: "Шаг",
    step1Title: "Регистрация",
    step1Desc: "Создайте аккаунт за пару минут",
    step2Title: "Верификация",
    step2Desc: "Стандартная проверка (как в банке), занимает несколько минут",
    step3Title: "Получите карту",
    step3Desc: "Виртуальная карта выпускается бесплатно",
    step4Title: "Пополните баланс",
    step4Desc: "Переведите USDT легко и быстро",
    step5Title: "Оплачивайте",
    step5Desc: "Используйте для подписок, сервисов и путешествий",

    // Problem
    problemTag: "Проблема",
    problemTitle1: "Почему обычные карты ",
    problemTitle2: "не работают",
    problemDesc: "Традиционные банки применяют ограничения и фильтры",
    problem1: "Платежи отклоняются без объяснений",
    problem2: "Банки блокируют международные транзакции",
    problem3: "Подписки на ИИ-сервисы не проходят",
    problem4: "Региональные ограничения и фильтры",
    solutionTitle1: "ZeroCard ",
    solutionTitle2: "решает это",
    solutionDesc: "Без ограничений. Без блокировок. Просто платежи, которые работают.",

    // Why it works
    whyTag: "Объяснение",
    whyTitle1: "Почему эта карта ",
    whyTitle2: "работает",
    whyDesc: "Обычные банки блокируют платежи многим онлайн-сервисам. Zerocard использует отдельную финансовую инфраструктуру — ваши платежи проходят без фильтров и ограничений.",
    whyCard1: "Работает везде",
    whyCard1Desc: "Без страновых ограничений",
    whyCard2: "Без ограничений",
    whyCard2Desc: "Обход банковских фильтров",
    whyCard3: "Любой сервис",
    whyCard3Desc: "ИИ, стриминг, путешествия",

    // Comparison
    compTag: "Почему не обычная карта",
    compTitle1: "Почему не ",
    compTitle2: "обычная банковская карта",
    compDesc: "Убедитесь сами",
    compRegular: "Обычная карта",
    compAI: "ИИ-платежи",
    compGlobal: "Глобальные сервисы",
    compFees: "Абонплата",
    compFeesPaid: "Платная",
    compRestrictions: "Ограничения",
    compRestYes: "Да",
    compRestNone: "Нет",
    compCashback: "Кешбэк",
    compCashbackRare: "Редко",
    compCashbackVal: "До 1%",
    compYield: "Доход на баланс",

    // Better than banks
    bankTag: "Банки vs Zerocard",
    bankTitle1: "Почему это ",
    bankTitle2: "лучше банков",
    bankDesc: "Традиционные банки не созданы для современной цифровой экономики",
    bank1Title: "Без границ",
    bank1Desc: "Оплачивайте любой сервис в любой стране — без блокировок",
    bank2Title: "Без задержек",
    bank2Desc: "Мгновенный выпуск карты и транзакции в реальном времени",
    bank3Title: "Без скрытых комиссий",
    bank3Desc: "0€ выпуск, 0€ обслуживание — банки берут за всё",
    bank4Title: "Без цензуры",
    bank4Desc: "Банки решают, за что вам платить — Zerocard нет",

    // Guide
    guideTag: "Пошаговое руководство",
    guideTitle1: "Настройка за ",
    guideTitle2: "5 минут",
    guideSub: "Следуйте простым шагам и начните платить по всему миру",
    guide1Title: "Регистрация",
    guide1Desc: "Создайте аккаунт за пару минут",
    guide2Title: "Верификация",
    guide2Desc: "Простая проверка личности — как в любом банке",
    guide3Title: "Получите карту",
    guide3Desc: "Виртуальная карта выпускается мгновенно",
    guide4Title: "Пополните баланс",
    guide4Desc: "Пополните карту через USDT",
    guide5Title: "Оплачивайте",
    guide5Desc: "Используйте как обычную платёжную карту",
    guideStart: "Начать",

    // Benefits
    benefitsTag: "Преимущества",
    benefitsTitle1: "Почему ",
    benefitsTitle2: "Zerocard",
    benAI: "Оплата ИИ-сервисов",
    benAIDesc: "ChatGPT, Midjourney, Claude — без блокировок",
    benGlobal: "Глобальные платежи",
    benGlobalDesc: "Работает в любой стране мира",
    benFree: "Выпуск 0€",
    benFreeDesc: "Полностью бесплатный выпуск карты",
    benNoFees: "Обслуживание 0€",
    benNoFeesDesc: "В отличие от обычных банковских карт",
    benCashback: "Кешбэк до 1%",
    benCashbackDesc: "Возврат с каждой покупки",
    benYield: "До 5% годовых",
    benYieldDesc: "Ваш баланс работает на вас",

    // Standard Process
    stdTag: "Ничего необычного",
    stdTitle1: "Это ",
    stdTitle2: "стандартный процесс",
    stdDesc: "Всё работает точно как в банке — только без ограничений",
    std1Title: "Верификация личности",
    std1Desc: "Такой же процесс, как в любом банке и финансовой организации",
    std2Title: "Регулируемая платформа",
    std2Desc: "Управляется лицензированным провайдером финансовой инфраструктуры",
    std3Title: "Управление через приложение",
    std3Desc: "Контролируйте карту с телефона, как в мобильном банке",

    // Safety
    safetyTag: "Безопасность прежде всего",
    safetyTitle1: "Почему это ",
    safetyTitle2: "безопасно",
    safetyDesc: "Ваши деньги и данные защищены на каждом уровне",
    safe1Title: "Защита аккаунта (2FA)",
    safe1Desc: "Многоуровневая безопасность с двухфакторной аутентификацией",
    safe2Title: "Верификация личности",
    safe2Desc: "Стандартный процесс — как в любом регулируемом банке",
    safe3Title: "Контроль транзакций",
    safe3Desc: "Заморозка, разморозка, лимиты — полный контроль с телефона",
    safe4Title: "Реальная инфраструктура",
    safe4Desc: "Построена на лицензированной платформе, которую используют миллионы",

    // Trust
    trustTitle1: "Финансовая инфраструктура,",
    trustTitle2: "которой можно ",
    trustTitle3: "доверять",
    trustDesc: "Zerocard работает на глобальной финансовой инфраструктуре, которой пользуются миллионы — стабильность, безопасность и быстрые транзакции.",
    trustSec: "Банковская безопасность",
    trustKYC: "Верификация KYC",
    trustSince: "Работает с 2019",
    trustPowered: "На базе",
    trustPlatform: "Глобальная финансовая платформа мирового класса",

    // Fear
    fearTitle1: "Это ",
    fearTitle2: "сложно?",
    fearNo: "Нет.",
    fearDesc1: "Работает как обычная карта.",
    fearDesc2: "Настройка за минуты.",
    fearDesc3: "Не нужен финансовый или технический опыт.",

    // Extra
    extraYield: "До 5% годовых",
    extraYieldDesc: "Ваш баланс в USDT приносит доход — в отличие от банковских счетов",
    extraRef: "Реферальная программа",
    extraRefDesc: "Приглашайте друзей и получайте бонусы за каждого",

    // FOMO
    fomoTitle1: "Большинство узнаёт об этом ",
    fomoTitle2: "слишком поздно",
    fomoDesc: "Пока другие мучаются с отклонёнными платежами — вы уже платите без ограничений",

    // Final CTA
    finalTitle: "Начните сейчас",
    finalDesc: "Бесплатная глобальная платёжная карта без ограничений",
    final1: "Регистрация за 5 мин",
    final2: "Простая верификация",
    final3: "Бесплатная карта",
    finalSub: "Выпуск 0€ · Обслуживание 0€ · Глобальные платежи",

    // Footer
    footerCopy: "Платежи нового поколения.",
  },
} as const;

type Translations = { [K in keyof typeof translations.en]: string };

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("zc-lang");
    if (stored === "ru" || stored === "en") return stored;
    return navigator.language.startsWith("ru") ? "ru" : "en";
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("zc-lang", newLang);
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
