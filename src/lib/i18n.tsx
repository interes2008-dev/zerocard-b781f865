import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Lang = "en" | "ru";

const translations = {
  en: {
    // Nav
    navBenefits: "Benefits",
    navHow: "How it works",
    navCompare: "Compare",
    navFAQ: "FAQ",
    navGetCard: "Get card →",

    // Hero
    heroBadge: "Pionex Card · Visa & Mastercard",
    heroTitle1: "Spend crypto",
    heroTitle2: "like real money",
    heroDesc: "ZeroCard turns USDT into an everyday payment tool — 1% cashback on everything, 5% APR on balance and zero fees for maintenance.",
    heroCTA: "Get card for free →",
    heroSecondary: "How it works",
    pill1: "200+ countries",
    pill2: "Apple Pay",
    pill3: "Google Pay",
    pill4: "$0 annual fee",
    pill5: "Instant top-up",

    // Ticker wallets
    tickerApple: "Apple Pay",
    tickerGoogle: "Google Pay",
    tickerPaypal: "PayPal",
    tickerVisa: "Visa",
    tickerMastercard: "Mastercard",
    tickerTrip: "Trip.com",
    tickerLine: "LINE Pay",
    tickerWechat: "WeChat Pay",
    tickerAlipay: "Alipay",
    tickerSamsung: "Samsung Pay",

    // Stats
    stat1Val: "1%",
    stat1Label: "Cashback on every purchase",
    stat2Val: "5%",
    stat2Label: "APR on balance (hourly)",
    stat3Val: "5M+",
    stat3Label: "Pionex users",
    stat4Val: "$0",
    stat4Label: "Annual & issuance fee",

    // Pain section
    painBadge: "⚡ Why you need a card",
    painTitle: "Your crypto should\nwork, not just sit there",
    painDesc: "Millions hold USDT on exchanges and can't spend it in daily life. ZeroCard changes that.",
    painBadLabel: "✕ Without ZeroCard",
    painGoodLabel: "✓ With ZeroCard",
    painBad1: "<strong>Crypto is frozen.</strong> USDT sits on the exchange — can't buy coffee, pay subscriptions or withdraw cash.",
    painBad2: "<strong>Withdrawal = losses.</strong> Conversion + bank transfer = 3–5% fees every time.",
    painBad3: "<strong>Days of waiting.</strong> Bank transfers take 1–3 days. Want money now — can't get it.",
    painBad4: "<strong>Balance doesn't grow.</strong> Money sits idle — no interest, no cashback.",
    painBad5: "<strong>Abroad — problems.</strong> Local card not accepted or charges huge FX fees.",
    painGood1: "<strong>Spend instantly.</strong> Top up from Pionex in seconds and pay USDT everywhere Visa/Mastercard is accepted.",
    painGood2: "<strong>Cashback covers the fee.</strong> 1% cashback = 1% transaction fee. Result: <strong>effectively zero commission</strong>.",
    painGood3: "<strong>Instantly available.</strong> Add to Apple Pay with one tap and pay by phone in a minute.",
    painGood4: "<strong>5% APR on balance.</strong> USDT on the card earns interest every hour — while you sleep or relax.",
    painGood5: "<strong>Worldwide.</strong> 200+ countries, 100M+ merchants. Visa with 0% FX. Mastercard — 0% in most regions.",

    // Benefits
    benefitsBadge: "💰 Benefits",
    benefitsTitle: "Everything you need\nfrom a crypto card",
    benefitsDesc: "Built for those who want crypto to work in real life every day.",
    ben1Icon: "💰", ben1Big: "1%", ben1Title: "Unlimited cashback in USDT", ben1Desc: "Every purchase returns 1% in USDT directly to your card account. No limits, no expiry, no exceptions.",
    ben2Icon: "📊", ben2Big: "5%", ben2Title: "APR on balance", ben2Desc: "USDT on the card earns 5% annually, compounded every hour. No traditional bank offers this on a current account.",
    ben3Icon: "🍎", ben3Title: "Apple Pay & Google Pay", ben3Desc: "Add the card to Apple Pay with one tap right in the Pionex app. Contactless NFC payments at any terminal worldwide.",
    ben4Icon: "✈️", ben4Big: "5%", ben4Title: "Trip.com cashback", ben4Desc: "Book flights and hotels via Trip.com and get 5% back in crypto. Travel more, spend less.",
    ben5Icon: "🛡️", ben5Title: "Bank-grade protection", ben5Desc: "Real-time transaction monitoring, instant card freeze right in the app, full KYC verification.",
    ben6Icon: "⚡", ben6Title: "Instant top-up", ben6Desc: "USDT transfer from main Pionex account to card takes seconds. Minimum — 1 USDT. No fees between accounts.",
    ben7Icon: "🆓", ben7Title: "Zero fees", ben7Desc: "No annual fee. No issuance fee. No hidden charges. Apply free and use free forever.",

    // How it works
    howBadge: "📋 How it works",
    howTitle: "Ready in a few\nsimple steps",
    howDesc: "No paperwork. No queues. Everything from the Pionex app.",
    howTab1: "Get card",
    howTab2: "Apple Pay",
    howTab3: "Google Pay",
    howTab4: "PayPal",
    // Steps
    step1Title: "Registration", step1Desc: "Create a Pionex account — via email or Google. Takes 2 minutes.",
    step2Title: "KYC Level 2", step2Desc: "Passport photo + selfie. Verification usually takes 10 minutes.",
    step3Title: "Apply", step3Desc: "App → Wallet → Card → Apply. Approval within 24 hours.",
    step4Title: "Fund account", step4Desc: "Transfer USDT from main account to card. Minimum 1 USDT. Instant.",
    step5Title: "Spend & Earn", step5Desc: "Add to Apple Pay or Google Pay. Cashback and interest start working immediately.",
    howCTA: "Start now — it's free →",
    // Apple Pay panel
    appleVisa: "Visa — One tap", appleVisaType: "iOS · In-App adding", appleVisaRecommended: "Recommended",
    appleStep1: "Update Pionex app to latest version",
    appleStep2: "Open card page and tap 'Add to Apple Wallet'",
    appleStep3: "Confirm details, agree to terms",
    appleStep4: "Authenticate via Face ID / Touch ID",
    appleStep5: "Done — card added!",
    appleMC: "Mastercard — Manual", appleMCType: "iOS · Via Wallet app", appleMCAlt: "Alternative",
    appleMCStep1: "Open Apple Wallet, tap '+' top right",
    appleMCStep2: "Select 'Debit or Credit Card'",
    appleMCStep3: "Enter Pionex card details manually",
    appleMCStep4: "Read and accept terms",
    appleMCStep5: "Confirm via SMS or email",
    appleDevices: "Compatible devices", appleDevicesType: "Requirements for Apple Pay",
    appleReq1: "iPhone 6 or newer", appleReq2: "Apple Watch (all versions)", appleReq3: "iPad with NFC", appleReq4: "Mac with Touch ID / Face ID", appleReq5: "NFC contactless terminals",
    // Google Pay panel
    gpTitle: "Google Pay", gpType: "Android · Manual adding", gpSupported: "Supported",
    gpStep1: "Open Google Pay app", gpStep2: "Tap 'Payment' → 'Add card'", gpStep3: "Enter Pionex card details manually", gpStep4: "Accept terms", gpStep5: "Confirm via SMS or email — done!",
    gpReqTitle: "Requirements", gpReqType: "What you need for Google Pay",
    gpReq1: "Android 7.0 (Nougat) or newer", gpReq2: "Device with NFC chip", gpReq3: "Google Pay app installed", gpReq4: "NFC enabled in settings",
    gpHowTitle: "How to pay", gpHowType: "Contactless payment",
    gpHow1: "Unlock your phone", gpHow2: "Hold near NFC terminal", gpHow3: "Wait for confirmation on screen", gpHow4: "Cashback is credited automatically",
    // PayPal panel
    ppTitle: "PayPal", ppType: "Online purchases", ppSupported: "Supported",
    ppStep1: "Open PayPal → 'Wallet' section", ppStep2: "Tap 'Link a card or account'", ppStep3: "Select 'Debit or Credit Card'", ppStep4: "Enter Pionex card details manually", ppStep5: "Confirm and start paying online",
    ppUsesTitle: "What it's for", ppUsesType: "Online stores and services",
    ppUse1: "Amazon, eBay, AliExpress", ppUse2: "Netflix, Spotify, Adobe", ppUse3: "Flights and hotels", ppUse4: "Freelance platforms", ppUse5: "100M+ online stores",
    ppOtherTitle: "Other wallets", ppOtherType: "LINE Pay, WeChat, Alipay",
    ppOther1: "Open the desired wallet app", ppOther2: "Go to 'Cards' or 'Wallet' section", ppOther3: "Select 'Add card'", ppOther4: "Enter Pionex card details", ppOther5: "Follow verification instructions",

    // Compare
    compareBadge: "📊 Compare",
    compareTitle: "ZeroCard vs. alternatives",
    compareDesc: "Why ZeroCard wins on all key parameters vs regular banks and other crypto cards.",
    compParam: "Parameter", compZero: "✦ ZeroCard (Pionex)", compBank: "Regular bank card", compOther: "Other crypto cards",
    comp1P: "Cashback", comp1Z: "1% on everything, no limit", comp1B: "0–1% (with conditions)", comp1O: "0–2% (limited)",
    comp2P: "Interest on balance", comp2Z: "5% APR (hourly)", comp2B: "✕ 0–0.5%", comp2O: "✕ No",
    comp3P: "Annual fee", comp3Z: "✓ $0", comp3B: "✕ $50–500/year", comp3O: "~ Usually $0",
    comp4P: "Issuance fee", comp4Z: "✓ $0", comp4B: "✕ $0–100", comp4O: "~ $0–10",
    comp5P: "Apple Pay", comp5Z: "✓", comp5B: "✓", comp5O: "~ Sometimes",
    comp6P: "Google Pay", comp6Z: "✓", comp6B: "✓", comp6O: "~ Sometimes",
    comp7P: "Instant crypto top-up", comp7Z: "✓", comp7B: "✕", comp7O: "~ Sometimes",
    comp8P: "Travel cashback (Trip.com)", comp8Z: "5%", comp8B: "~ Sometimes", comp8O: "✕ Rarely",
    comp9P: "PayPal, LINE Pay support", comp9Z: "✓", comp9B: "~ Partial", comp9O: "✕ Rarely",

    // Reviews
    reviewsBadge: "⭐ Reviews",
    reviewsTitle: "They already\nspend smarter",
    reviewsDesc: "Real users about life with ZeroCard in their pocket.",
    rev1Text: "\"Finally I can spend crypto in real life. Added Apple Pay in 30 seconds and already paying by tap at the supermarket. Cashback comes automatically.\"",
    rev1Name: "Alex M.", rev1Role: "Trader, Dubai",
    rev2Text: "\"5% annual on card balance — better than any bank account. Money earns even when I don't spend it. Plus cashback on top.\"",
    rev2Name: "Sergey K.", rev2Role: "DeFi investor, Thailand",
    rev3Text: "\"Zero issuance fee, zero annual. Essentially they pay me for using the card via cashback. Booked hotel on Trip.com — got 5% back.\"",
    rev3Name: "Nikita L.", rev3Role: "Digital nomad, Bali",
    rev4Text: "\"Passed KYC in 8 minutes, application approved overnight. Next day already paying via Google Pay. Card works everywhere without issues.\"",
    rev4Name: "Mark T.", rev4Role: "Developer, Singapore",
    rev5Text: "\"Added to PayPal and now paying USDT at all online stores. Amazon, AliExpress, Adobe — everywhere without conversion and no exchange losses.\"",
    rev5Name: "Pavel R.", rev5Role: "Entrepreneur, Cyprus",
    rev6Text: "\"It's just a regular card, only much more profitable. You forget it's crypto — just tap your phone and done.\"",
    rev6Name: "Nina B.", rev6Role: "Freelancer, Amsterdam",

    // FAQ
    faqBadge: "❓ FAQ",
    faqTitle: "Everything you\nwanted to ask",
    faq1Q: "Who can get ZeroCard?",
    faq1A: "Any Pionex user who passed KYC Level 2 and has at least 100 USDT in their account. The card is available in most supported countries. One card per user.",
    faq2Q: "How to fund the card account?",
    faq2A: "USDT transfer from main Pionex account to card account is instant right in the app. Minimum — 1 USDT. No fees between Pionex accounts.",
    faq3Q: "How does 1% cashback work?",
    faq3A: "Every purchase returns 1% of the transaction amount in USDT to the card account within 24 hours. No limits, no expiry, no exceptions.",
    faq4Q: "How is 5% APR calculated?",
    faq4A: "5% annual is accrued on USDT balance in the card account and compounds every hour. Your money earns interest continuously.",
    faq5Q: "Is the card physical or virtual?",
    faq5A: "Currently only a virtual card is available. It can be added to Apple Pay, Google Pay, PayPal and other wallets for contactless payments.",
    faq6Q: "Visa or Mastercard — which to choose?",
    faq6A: "Both cards offer the same bonuses: 1% cashback, 5% APR, zero annual fee. Main difference: Visa charges 0% for currency conversion, Mastercard — up to 2% in some regions.",
    faq7Q: "What if Apple Pay linking fails?",
    faq7A: "Make sure the card account has funds — some wallets do a test charge for verification. If linking shows 'contact issuer', fill out the form at support.pionex.com.",
    faq8Q: "How to freeze the card if phone is lost?",
    faq8A: "Log into Pionex from another device → Card section → Freeze card. Freeze is instant. You can unfreeze yourself in the app.",

    // CTA
    ctaBadge: "Free · Fast · Profitable",
    ctaTitle: "Start spending crypto\nright now",
    ctaDesc: "Join millions of Pionex users who already earn cashback, earn interest and spend USDT like a regular card.",
    ctaCTA: "Get ZeroCard for free →",
    ctaDocs: "Documentation",
    ctaDisclaimer: "KYC Level 2 required · Minimum 100 USDT · Virtual card · Visa & Mastercard",

    // Footer
    footerNote: "Independent partner site. Not an official Pionex resource. All links contain partner referral code. Terms and fees may change — check current info at pionex.com.",
    footerCopy: "© 2026 ZeroCard.",

    // SEO
    metaTitle: "ZeroCard — Spend Crypto Everywhere | Pionex Card",
    metaDesc: "ZeroCard turns USDT into an everyday payment tool — 1% cashback, 5% APR on balance and zero maintenance fees.",
  },
  ru: {
    // Nav
    navBenefits: "Преимущества",
    navHow: "Как работает",
    navCompare: "Сравнение",
    navFAQ: "FAQ",
    navGetCard: "Получить карту →",

    // Hero
    heroBadge: "Pionex Card · Visa & Mastercard",
    heroTitle1: "Трать крипту",
    heroTitle2: "как обычные деньги",
    heroDesc: "ZeroCard превращает USDT в ежедневный платёжный инструмент — 1% кэшбэк на всё, 5% годовых на остаток и ноль комиссий за обслуживание.",
    heroCTA: "Получить карту бесплатно →",
    heroSecondary: "Как это работает",
    pill1: "200+ стран",
    pill2: "Apple Pay",
    pill3: "Google Pay",
    pill4: "$0 годовой сбор",
    pill5: "Мгновенное пополнение",

    // Ticker
    tickerApple: "Apple Pay",
    tickerGoogle: "Google Pay",
    tickerPaypal: "PayPal",
    tickerVisa: "Visa",
    tickerMastercard: "Mastercard",
    tickerTrip: "Trip.com",
    tickerLine: "LINE Pay",
    tickerWechat: "WeChat Pay",
    tickerAlipay: "Alipay",
    tickerSamsung: "Samsung Pay",

    // Stats
    stat1Val: "1%",
    stat1Label: "Кэшбэк на каждую покупку",
    stat2Val: "5%",
    stat2Label: "APR на остаток (ежечасно)",
    stat3Val: "5M+",
    stat3Label: "Пользователей Pionex",
    stat4Val: "$0",
    stat4Label: "Годовой и выпускной сбор",

    // Pain
    painBadge: "⚡ Зачем нужна карта",
    painTitle: "Твоя крипта должна\nработать, а не лежать",
    painDesc: "Миллионы людей держат USDT на бирже и не могут потратить его в повседневной жизни. ZeroCard это меняет.",
    painBadLabel: "✕ Без ZeroCard",
    painGoodLabel: "✓ С ZeroCard",
    painBad1: "<strong>Крипта заморожена.</strong> USDT лежит на бирже — нельзя купить кофе, оплатить подписку или снять наличные.",
    painBad2: "<strong>Вывод = потери.</strong> Конвертация + перевод в банк = 3–5% комиссии от суммы каждый раз.",
    painBad3: "<strong>Дни ожидания.</strong> Банковские переводы занимают 1–3 дня. Хочешь деньги сейчас — не получишь.",
    painBad4: "<strong>Остаток не растёт.</strong> Деньги лежат без дела — никакого процента, никакого кэшбэка.",
    painBad5: "<strong>За рубежом — проблемы.</strong> Местная карта не принимается или берёт огромный FX-сбор при конвертации.",
    painGood1: "<strong>Трать сразу.</strong> Пополни карту из Pionex за секунды и плати USDT везде, где принимают Visa/Mastercard.",
    painGood2: "<strong>Кэшбэк перекрывает сбор.</strong> 1% кэшбэк = 1% сбор транзакции. Итог: <strong>эффективно нулевая комиссия</strong>.",
    painGood3: "<strong>Мгновенно доступно.</strong> Добавь в Apple Pay одним нажатием и плати касанием телефона уже через минуту.",
    painGood4: "<strong>5% APR на остаток.</strong> USDT на карте зарабатывает проценты каждый час — пока ты спишь или отдыхаешь.",
    painGood5: "<strong>Весь мир.</strong> 200+ стран, 100M+ магазинов. Visa без FX-сбора. Mastercard — 0% в большинстве регионов.",

    // Benefits
    benefitsBadge: "💰 Преимущества",
    benefitsTitle: "Всё что нужно\nот крипто-карты",
    benefitsDesc: "Создана для тех, кто хочет, чтобы крипта работала в реальной жизни каждый день.",
    ben1Icon: "💰", ben1Big: "1%", ben1Title: "Безлимитный кэшбэк в USDT", ben1Desc: "Каждая покупка возвращает 1% в USDT прямо на карточный счёт. Без лимитов, без срока действия, без исключений.",
    ben2Icon: "📊", ben2Big: "5%", ben2Title: "APR на остаток", ben2Desc: "USDT на карте зарабатывает 5% годовых, начисляемых каждый час. Ни один традиционный банк не даёт это на текущем счёте.",
    ben3Icon: "🍎", ben3Title: "Apple Pay & Google Pay", ben3Desc: "Добавь карту в Apple Pay одним нажатием прямо в приложении Pionex. Бесконтактные платежи через NFC в любом терминале мира.",
    ben4Icon: "✈️", ben4Big: "5%", ben4Title: "Кэшбэк на Trip.com", ben4Desc: "Бронируй авиабилеты и отели через Trip.com и возвращай 5% в крипте. Путешествуй больше, трать меньше.",
    ben5Icon: "🛡️", ben5Title: "Банковская защита", ben5Desc: "Мониторинг транзакций в реальном времени, мгновенная заморозка карты прямо в приложении, полная KYC-верификация.",
    ben6Icon: "⚡", ben6Title: "Мгновенное пополнение", ben6Desc: "Перевод USDT с основного счёта Pionex на карту занимает секунды. Минимум — 1 USDT. Без комиссий между счетами.",
    ben7Icon: "🆓", ben7Title: "Ноль сборов", ben7Desc: "Нет годового сбора. Нет сбора за выпуск. Нет скрытых платежей. Применяй бесплатно и пользуйся бесплатно навсегда.",

    // How it works
    howBadge: "📋 Как работает",
    howTitle: "Готово за несколько\nпростых шагов",
    howDesc: "Никакой бумажной волокиты. Никаких очередей. Всё из приложения Pionex.",
    howTab1: "Получить карту",
    howTab2: "Apple Pay",
    howTab3: "Google Pay",
    howTab4: "PayPal",
    step1Title: "Регистрация", step1Desc: "Создай аккаунт Pionex — через email или Google. Займёт 2 минуты.",
    step2Title: "KYC Level 2", step2Desc: "Фото паспорта + селфи. Верификация обычно занимает 10 минут.",
    step3Title: "Подать заявку", step3Desc: "Приложение → Кошелёк → Карта → Подать заявку. Одобрение за 24 часа.",
    step4Title: "Пополнить счёт", step4Desc: "Переведи USDT с основного счёта на карточный. Минимум 1 USDT. Мгновенно.",
    step5Title: "Трать & Зарабатывай", step5Desc: "Добавь в Apple Pay или Google Pay. Кэшбэк и проценты начнут работать сразу.",
    howCTA: "Начать сейчас — это бесплатно →",
    // Apple Pay
    appleVisa: "Visa — Одним нажатием", appleVisaType: "iOS · In-App добавление", appleVisaRecommended: "Рекомендуется",
    appleStep1: "Обнови приложение Pionex до последней версии",
    appleStep2: "Открой страницу карты и нажми «Добавить в Apple Wallet»",
    appleStep3: "Подтверди данные, согласись с условиями",
    appleStep4: "Аутентификация через Face ID / Touch ID",
    appleStep5: "Готово — карта добавлена!",
    appleMC: "Mastercard — Вручную", appleMCType: "iOS · Через Wallet приложение", appleMCAlt: "Альтернатива",
    appleMCStep1: "Открой Apple Wallet, нажми «+» вверху справа",
    appleMCStep2: "Выбери «Дебетовая или кредитная карта»",
    appleMCStep3: "Введи данные карты Pionex вручную",
    appleMCStep4: "Прочитай и прими условия",
    appleMCStep5: "Подтверди через SMS или email",
    appleDevices: "Совместимые устройства", appleDevicesType: "Требования для Apple Pay",
    appleReq1: "iPhone 6 или новее", appleReq2: "Apple Watch (все версии)", appleReq3: "iPad с NFC", appleReq4: "Mac с Touch ID / Face ID", appleReq5: "Бесконтактные терминалы NFC",
    // Google Pay
    gpTitle: "Google Pay", gpType: "Android · Ручное добавление", gpSupported: "Поддерживается",
    gpStep1: "Открой приложение Google Pay", gpStep2: "Нажми «Оплата» → «Добавить карту»", gpStep3: "Введи данные карты Pionex вручную", gpStep4: "Прими условия соглашения", gpStep5: "Подтверди через SMS или email — готово!",
    gpReqTitle: "Требования", gpReqType: "Что нужно для Google Pay",
    gpReq1: "Android 7.0 (Nougat) или новее", gpReq2: "Устройство с NFC-чипом", gpReq3: "Приложение Google Pay установлено", gpReq4: "NFC включён в настройках",
    gpHowTitle: "Как платить", gpHowType: "Бесконтактная оплата",
    gpHow1: "Разблокируй телефон", gpHow2: "Приднеси к NFC-терминалу", gpHow3: "Дождись подтверждения на экране", gpHow4: "Кэшбэк начисляется автоматически",
    // PayPal
    ppTitle: "PayPal", ppType: "Онлайн-покупки", ppSupported: "Поддерживается",
    ppStep1: "Открой PayPal → раздел «Кошелёк»", ppStep2: "Нажми «Привязать карту или счёт»", ppStep3: "Выбери «Дебетовая или кредитная карта»", ppStep4: "Введи данные карты Pionex вручную", ppStep5: "Подтверди и начни платить онлайн",
    ppUsesTitle: "Для чего подходит", ppUsesType: "Онлайн-магазины и сервисы",
    ppUse1: "Amazon, eBay, AliExpress", ppUse2: "Netflix, Spotify, Adobe", ppUse3: "Авиабилеты и отели", ppUse4: "Фриланс-платформы", ppUse5: "100M+ онлайн-магазинов",
    ppOtherTitle: "Другие кошельки", ppOtherType: "LINE Pay, WeChat, Alipay",
    ppOther1: "Открой нужное приложение кошелька", ppOther2: "Перейди в раздел «Карты» или «Кошелёк»", ppOther3: "Выбери «Добавить карту»", ppOther4: "Введи данные карты Pionex", ppOther5: "Следуй инструкциям для верификации",

    // Compare
    compareBadge: "📊 Сравнение",
    compareTitle: "ZeroCard vs. альтернативы",
    compareDesc: "Почему ZeroCard выигрывает по всем ключевым параметрам у обычных банков и других крипто-карт.",
    compParam: "Параметр", compZero: "✦ ZeroCard (Pionex)", compBank: "Обычная банк. карта", compOther: "Другие крипто-карты",
    comp1P: "Кэшбэк", comp1Z: "1% на всё, без лимита", comp1B: "0–1% (с условиями)", comp1O: "0–2% (ограничено)",
    comp2P: "Процент на остаток", comp2Z: "5% APR (ежечасно)", comp2B: "✕ 0–0.5%", comp2O: "✕ Нет",
    comp3P: "Годовой сбор", comp3Z: "✓ $0", comp3B: "✕ $50–500/год", comp3O: "~ Обычно $0",
    comp4P: "Сбор за выпуск", comp4Z: "✓ $0", comp4B: "✕ $0–100", comp4O: "~ $0–10",
    comp5P: "Apple Pay", comp5Z: "✓", comp5B: "✓", comp5O: "~ Иногда",
    comp6P: "Google Pay", comp6Z: "✓", comp6B: "✓", comp6O: "~ Иногда",
    comp7P: "Мгновенное пополнение из крипты", comp7Z: "✓", comp7B: "✕", comp7O: "~ Иногда",
    comp8P: "Трэвел-кэшбэк (Trip.com)", comp8Z: "5%", comp8B: "~ Иногда", comp8O: "✕ Редко",
    comp9P: "Подключение к PayPal, LINE Pay", comp9Z: "✓", comp9B: "~ Частично", comp9O: "✕ Редко",

    // Reviews
    reviewsBadge: "⭐ Отзывы",
    reviewsTitle: "Они уже\nтратят умнее",
    reviewsDesc: "Реальные пользователи о жизни с ZeroCard в кармане.",
    rev1Text: "«Наконец могу тратить крипту в реальной жизни. Apple Pay добавил за 30 секунд и уже платил касанием в супермаркете. Кэшбэк приходит автоматически.»",
    rev1Name: "Алексей М.", rev1Role: "Трейдер, Дубай",
    rev2Text: "«5% годовых на остаток карты — это лучше любого банковского счёта. Деньги зарабатывают даже когда я их не трачу. Плюс кэшбэк сверху.»",
    rev2Name: "Сергей К.", rev2Role: "DeFi-инвестор, Таиланд",
    rev3Text: "«Ноль сбора за выпуск, ноль годового. По сути мне платят за использование карты через кэшбэк. Забронировал отель через Trip.com — вернулось 5%.»",
    rev3Name: "Никита Л.", rev3Role: "Digital nomad, Бали",
    rev4Text: "«Прошёл KYC за 8 минут, заявку одобрили за ночь. На следующий день уже платил через Google Pay. Карта работает везде без проблем.»",
    rev4Name: "Марк Т.", rev4Role: "Разработчик, Сингапур",
    rev5Text: "«Добавил в PayPal и теперь плачу USDT во всех онлайн-магазинах. Amazon, AliExpress, Adobe — везде без конвертации и без потерь на курсе.»",
    rev5Name: "Павел Р.", rev5Role: "Предприниматель, Кипр",
    rev6Text: "«Это просто обычная карта, только гораздо выгоднее. Забываешь что это крипто — просто прикладываешь телефон и всё.»",
    rev6Name: "Нина Б.", rev6Role: "Фрилансер, Амстердам",

    // FAQ
    faqBadge: "❓ FAQ",
    faqTitle: "Всё что\nвы хотели спросить",
    faq1Q: "Кто может получить ZeroCard?",
    faq1A: "Любой пользователь Pionex, прошедший KYC Level 2 и имеющий на аккаунте минимум 100 USDT. Карта доступна в большинстве поддерживаемых стран. Одному пользователю выдаётся одна карта.",
    faq2Q: "Как пополнить карточный счёт?",
    faq2A: "Перевод USDT с основного счёта Pionex на карточный счёт осуществляется мгновенно прямо в приложении. Минимальная сумма — 1 USDT. Комиссии между счетами Pionex нет.",
    faq3Q: "Как работает 1% кэшбэк?",
    faq3A: "При каждой покупке 1% от суммы транзакции возвращается в USDT на карточный счёт в течение 24 часов. Нет лимитов, нет срока действия, нет исключений.",
    faq4Q: "Как начисляется 5% APR?",
    faq4A: "5% годовых начисляется на остаток USDT в карточном счёте и компаундируется каждый час. Это значит, что твои деньги зарабатывают проценты непрерывно.",
    faq5Q: "Карта физическая или виртуальная?",
    faq5A: "Сейчас доступна только виртуальная карта. Её можно добавить в Apple Pay, Google Pay, PayPal и другие кошельки для бесконтактных платежей.",
    faq6Q: "Visa или Mastercard — что выбрать?",
    faq6A: "Обе карты дают одинаковые бонусы: 1% кэшбэк, 5% APR, ноль годового сбора. Главное отличие: Visa берёт 0% за конвертацию валюты, Mastercard — до 2% в некоторых регионах.",
    faq7Q: "Что если привязка к Apple Pay не удаётся?",
    faq7A: "Убедись, что на карточном счёте есть средства — некоторые кошельки делают тестовое списание для верификации. Если привязка показывает «обратитесь к эмитенту», заполни форму на support.pionex.com.",
    faq8Q: "Как заморозить карту если потерял телефон?",
    faq8A: "Войди в Pionex с другого устройства → раздел Карта → Заморозить карту. Заморозка мгновенная. Разморозить можно самостоятельно в приложении.",

    // CTA
    ctaBadge: "Бесплатно · Быстро · Выгодно",
    ctaTitle: "Начни тратить крипту\nпрямо сейчас",
    ctaDesc: "Присоединись к миллионам пользователей Pionex, которые уже получают кэшбэк, зарабатывают проценты и тратят USDT как обычную карту.",
    ctaCTA: "Получить ZeroCard бесплатно →",
    ctaDocs: "Документация",
    ctaDisclaimer: "Требуется KYC Level 2 · Минимум 100 USDT · Виртуальная карта · Visa & Mastercard",

    // Footer
    footerNote: "Независимый партнёрский сайт. Не является официальным ресурсом Pionex. Все ссылки содержат реферальный код партнёра. Условия и сборы могут изменяться — проверяй актуальную информацию на pionex.com.",
    footerCopy: "© 2026 ZeroCard.",

    // SEO
    metaTitle: "ZeroCard — Трать крипту везде | Карта Pionex",
    metaDesc: "ZeroCard превращает USDT в ежедневный платёжный инструмент — 1% кэшбэк на всё, 5% годовых на остаток и ноль комиссий за обслуживание.",
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
