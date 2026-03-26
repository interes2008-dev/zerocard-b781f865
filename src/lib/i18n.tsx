import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Lang = "en" | "ru";

const translations = {
  en: {
    // Navbar
    navBenefits: "Benefits",
    navHowItWorks: "How it works",
    navSecurity: "Security",
    navGetCard: "Get your card",

    // Hero
    heroBadge: "Visa & Mastercard Accepted Worldwide",
    heroTitle1: "Your Global",
    heroTitle2: " Payment Card.",
    heroDesc: "ZeroCard turns your USDT into everyday spending power — with up to 1% cashback, and zero annual fees.",
    heroCTA: "Apply for Free",
    heroSecondary: "See How It Works",
    heroStat1Val: "1%",
    heroStat1Label: "Unlimited Cashback",
    heroStat2Val: "0",
    heroStat2Label: "Annual Fee",
    heroStat3Val: "5 min",
    heroStat3Label: "Fast Setup",

    // Wallets
    walletsTitle: "Works with your favourite wallets",
    walletApple: "Apple Pay",
    walletGoogle: "Google Pay",
    walletPaypal: "PayPal",
    walletVisa: "Visa",
    walletMastercard: "Mastercard",

    // Benefits
    benefitsTag: "Why ZeroCard",
    benefitsTitle1: "Everything that makes ",
    benefitsTitle2: "this card worth having",
    benefitsDesc: "Built for people who want their money to actually work — everywhere, every day.",
    ben1Title: "$0 Monthly Fees",
    ben1Desc: "No subscriptions, no hidden charges. Apply free and keep it free forever.",
    ben2Title: "Fast Setup",
    ben2Desc: "Get your card in about 5 minutes via Pionex. No paperwork, no delays.",
    ben3Title: "Global Payments",
    ben3Desc: "Pay anywhere Visa or Mastercard is accepted — 100+ million merchants worldwide.",
    ben4Title: "Instant Crypto Payments",
    ben4Desc: "Your USDT converts automatically at checkout. No manual conversion needed.",
    ben5Title: "Cashback up to 1%",
    ben5Desc: "Every purchase earns cashback in USDT. No caps, no expiry dates.",
    ben6Title: "Bank-Grade Security",
    ben6Desc: "Real-time monitoring, instant card freeze, and full KYC verification.",

    // How it works
    stepsTag: "The Smarter Way",
    stepsTitle1: "From crypto holder ",
    stepsTitle2: "to daily spender in 5 steps",
    stepsDesc: "No technical hurdles, no lengthy setup. Everything works seamlessly.",
    step1Num: "01",
    step1Tag: "Account Setup",
    step1Title: "Create & Verify Your Account",
    step1Desc: "Register on Pionex and complete identity verification. The process usually takes under 10 minutes.",
    step2Num: "02",
    step2Tag: "Card Application",
    step2Title: "Apply for Your Card",
    step2Desc: "Open the Pionex App → Wallet → Card section. Select your preferred card type and submit.",
    step3Num: "03",
    step3Tag: "Add Funds",
    step3Title: "Fund Your Card Account",
    step3Desc: "Transfer USDT from your Pionex account to your card. Funds are available instantly.",
    step4Num: "04",
    step4Tag: "Go Digital",
    step4Title: "Add to Digital Wallet",
    step4Desc: "Add to Apple Pay or Google Pay inside the Pionex Card page. Contactless NFC payments ready.",
    step5Num: "05",
    step5Tag: "Earn Rewards",
    step5Title: "Spend & Earn Rewards",
    step5Desc: "Use your card at millions of merchants. Every purchase earns cashback automatically.",

    // Payment Compatibility
    payTag: "Digital Wallet Setup",
    payTitle1: "One card. ",
    payTitle2: "Every wallet.",
    payDesc: "Add your ZeroCard to Apple Pay, Google Pay, or PayPal in under 2 minutes.",
    payApple: "Apple Pay",
    payAppleOS: "iOS",
    payGoogle: "Google Pay",
    payGoogleOS: "Android",
    payPaypal: "PayPal",
    payPaypalOS: "Online",
    paySupported: "Supported",
    payContactless: "Contactless payments are supported at any NFC-enabled terminal — convenience stores, cafés, transit, and more.",

    // Trust
    trustTag: "Built on Trust",
    trustTitle1: "Security you can ",
    trustTitle2: "rely on",
    trustDesc: "ZeroCard is powered by Pionex — a global financial platform operating since 2019, trusted by millions worldwide.",
    trust1Title: "Licensed Platform",
    trust1Desc: "Operated by a regulated financial infrastructure provider with global compliance.",
    trust2Title: "Identity Verification",
    trust2Desc: "Standard KYC process — same as any regulated bank or financial institution.",
    trust3Title: "Transaction Control",
    trust3Desc: "Freeze, unfreeze, set limits — full control from your phone anytime.",
    trust4Title: "Real Infrastructure",
    trust4Desc: "Built on a licensed platform used by millions of users worldwide.",
    trustPowered: "Powered by",
    trustPlatform: "Global financial platform · Operating since 2019",

    // FAQ
    faqTag: "Common Questions",
    faqTitle: "Got questions? We've got answers.",
    faq1Q: "Who is eligible for ZeroCard?",
    faq1A: "Anyone who has registered on Pionex, completed identity verification, and has account assets of at least 100 USDT. The card is available in most supported countries.",
    faq2Q: "How do I fund my card?",
    faq2A: "Transfer USDT from your Pionex main account to your card account directly inside the app. The transfer is instant with no fees.",
    faq3Q: "How does the cashback work?",
    faq3A: "Every purchase earns up to 1% back in USDT, deposited directly into your card account within 24 hours. No caps or expiry dates.",
    faq4Q: "Is the card virtual or physical?",
    faq4A: "Currently ZeroCard is a virtual card. You can add it to Apple Pay, Google Pay, or PayPal for contactless payments worldwide.",
    faq5Q: "Are there any fees?",
    faq5A: "No annual fee, no issuance fee, no monthly charges. Transaction fees are effectively offset by cashback rewards.",
    faq6Q: "Is my crypto safe?",
    faq6A: "Your card account holds USDT, not volatile crypto. Pionex employs KYC, real-time monitoring, and instant card freeze features for security.",

    // Final CTA
    finalTag: "Free to apply · Live in minutes",
    finalTitle1: "Start spending your ",
    finalTitle2: "crypto today.",
    finalDesc: "Join thousands of users who earn cashback and spend USDT as freely as any regular card.",
    finalCTA: "Get Your Card in ~5 Minutes",
    finalDocs: "Read Documentation",

    // Redirect
    redirectNote: "You will be redirected to the official Pionex platform to complete registration",

    // Footer
    footerCopy: "Next-generation global payments.",

    // SEO
    metaTitle: "ZeroCard — Virtual Card for Global Crypto Payments",
    metaDesc: "Pay for anything with USDT. Free virtual card with up to 1% cashback, zero annual fees. Setup in 5 minutes.",
    seoH1: "ZeroCard — Virtual Card for Global Payments",
  },
  ru: {
    // Navbar
    navBenefits: "Преимущества",
    navHowItWorks: "Как работает",
    navSecurity: "Безопасность",
    navGetCard: "Получить карту",

    // Hero
    heroBadge: "Visa и Mastercard по всему миру",
    heroTitle1: "Ваша глобальная",
    heroTitle2: " платёжная карта.",
    heroDesc: "ZeroCard превращает USDT в повседневные платежи — с кешбэком до 1% и нулевой абонплатой.",
    heroCTA: "Получить бесплатно",
    heroSecondary: "Как это работает",
    heroStat1Val: "1%",
    heroStat1Label: "Безлимитный кешбэк",
    heroStat2Val: "0",
    heroStat2Label: "Абонплата",
    heroStat3Val: "5 мин",
    heroStat3Label: "Быстрый старт",

    // Wallets
    walletsTitle: "Работает с вашими кошельками",
    walletApple: "Apple Pay",
    walletGoogle: "Google Pay",
    walletPaypal: "PayPal",
    walletVisa: "Visa",
    walletMastercard: "Mastercard",

    // Benefits
    benefitsTag: "Почему ZeroCard",
    benefitsTitle1: "Всё, что делает ",
    benefitsTitle2: "эту карту ценной",
    benefitsDesc: "Создана для тех, кто хочет, чтобы деньги работали — везде и каждый день.",
    ben1Title: "0€ абонплата",
    ben1Desc: "Без подписок и скрытых платежей. Бесплатный выпуск и обслуживание.",
    ben2Title: "Быстрый старт",
    ben2Desc: "Получите карту примерно за 5 минут через Pionex. Без бумаг и задержек.",
    ben3Title: "Глобальные платежи",
    ben3Desc: "Платите везде, где принимают Visa или Mastercard — 100+ млн точек по миру.",
    ben4Title: "Мгновенные крипто-платежи",
    ben4Desc: "USDT конвертируется автоматически при оплате. Без ручной конвертации.",
    ben5Title: "Кешбэк до 1%",
    ben5Desc: "Каждая покупка возвращает кешбэк в USDT. Без лимитов и сроков.",
    ben6Title: "Банковская защита",
    ben6Desc: "Мониторинг в реальном времени, мгновенная заморозка и KYC верификация.",

    // How it works
    stepsTag: "Простой путь",
    stepsTitle1: "От крипто-держателя ",
    stepsTitle2: "к ежедневным платежам за 5 шагов",
    stepsDesc: "Без технических сложностей и долгой настройки. Всё работает просто.",
    step1Num: "01",
    step1Tag: "Регистрация",
    step1Title: "Создайте и верифицируйте аккаунт",
    step1Desc: "Зарегистрируйтесь в Pionex и пройдите верификацию. Обычно занимает до 10 минут.",
    step2Num: "02",
    step2Tag: "Заявка на карту",
    step2Title: "Подайте заявку на карту",
    step2Desc: "Откройте приложение Pionex → Кошелёк → Карта. Выберите тип карты и отправьте заявку.",
    step3Num: "03",
    step3Tag: "Пополнение",
    step3Title: "Пополните счёт карты",
    step3Desc: "Переведите USDT с основного счёта Pionex на счёт карты. Средства доступны мгновенно.",
    step4Num: "04",
    step4Tag: "Цифровой кошелёк",
    step4Title: "Добавьте в кошелёк",
    step4Desc: "Добавьте карту в Apple Pay или Google Pay прямо из приложения Pionex.",
    step5Num: "05",
    step5Tag: "Награды",
    step5Title: "Тратьте и получайте кешбэк",
    step5Desc: "Используйте карту в миллионах точек. Кешбэк начисляется автоматически.",

    // Payment Compatibility
    payTag: "Цифровые кошельки",
    payTitle1: "Одна карта. ",
    payTitle2: "Все кошельки.",
    payDesc: "Добавьте ZeroCard в Apple Pay, Google Pay или PayPal за пару минут.",
    payApple: "Apple Pay",
    payAppleOS: "iOS",
    payGoogle: "Google Pay",
    payGoogleOS: "Android",
    payPaypal: "PayPal",
    payPaypalOS: "Онлайн",
    paySupported: "Поддерживается",
    payContactless: "Бесконтактные платежи работают на любом NFC-терминале — магазины, кафе, транспорт и другое.",

    // Trust
    trustTag: "Надёжная основа",
    trustTitle1: "Безопасность, которой ",
    trustTitle2: "можно доверять",
    trustDesc: "ZeroCard работает на базе Pionex — глобальной финансовой платформы с 2019 года, которой доверяют миллионы.",
    trust1Title: "Лицензированная платформа",
    trust1Desc: "Регулируемая инфраструктура с глобальным соответствием требованиям.",
    trust2Title: "Верификация личности",
    trust2Desc: "Стандартный KYC-процесс — как в любом банке или финансовом учреждении.",
    trust3Title: "Контроль транзакций",
    trust3Desc: "Заморозка, разморозка, лимиты — полный контроль с телефона.",
    trust4Title: "Реальная инфраструктура",
    trust4Desc: "На лицензированной платформе с миллионами пользователей.",
    trustPowered: "На базе",
    trustPlatform: "Глобальная платформа · Работает с 2019 года",

    // FAQ
    faqTag: "Частые вопросы",
    faqTitle: "Есть вопросы? У нас есть ответы.",
    faq1Q: "Кто может получить ZeroCard?",
    faq1A: "Любой, кто зарегистрирован в Pionex, прошёл верификацию и имеет на счёте не менее 100 USDT. Карта доступна в большинстве стран.",
    faq2Q: "Как пополнить карту?",
    faq2A: "Переведите USDT с основного счёта Pionex на счёт карты прямо в приложении. Перевод мгновенный и без комиссий.",
    faq3Q: "Как работает кешбэк?",
    faq3A: "Каждая покупка возвращает до 1% в USDT на счёт карты в течение 24 часов. Без лимитов и сроков действия.",
    faq4Q: "Карта виртуальная или физическая?",
    faq4A: "Сейчас ZeroCard — виртуальная карта. Её можно добавить в Apple Pay, Google Pay или PayPal для бесконтактных платежей.",
    faq5Q: "Есть ли комиссии?",
    faq5A: "Нет абонплаты, нет комиссии за выпуск. Комиссии за транзакции фактически компенсируются кешбэком.",
    faq6Q: "Мои деньги в безопасности?",
    faq6A: "На счёте карты хранится USDT, а не волатильная крипта. Pionex использует KYC, мониторинг в реальном времени и мгновенную заморозку.",

    // Final CTA
    finalTag: "Бесплатно · Готово за минуты",
    finalTitle1: "Начните тратить ",
    finalTitle2: "крипто сегодня.",
    finalDesc: "Присоединяйтесь к тысячам пользователей, которые получают кешбэк и тратят USDT так же свободно, как обычной картой.",
    finalCTA: "Получить карту за ~5 минут",
    finalDocs: "Документация",

    // Redirect
    redirectNote: "Вы будете перенаправлены на официальную платформу Pionex для регистрации",

    // Footer
    footerCopy: "Платежи нового поколения.",

    // SEO
    metaTitle: "ZeroCard — Виртуальная карта для глобальных крипто-платежей",
    metaDesc: "Платите за всё с помощью USDT. Бесплатная карта с кешбэком до 1% и нулевой абонплатой. Старт за 5 минут.",
    seoH1: "ZeroCard — Виртуальная карта для глобальных платежей",
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
    if (stored === "ru" || stored === "en") {
      document.documentElement.lang = stored;
      return stored;
    }
    const detected = navigator.language.startsWith("ru") ? "ru" : "en";
    document.documentElement.lang = detected;
    return detected;
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("zc-lang", newLang);
    document.documentElement.lang = newLang;
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
