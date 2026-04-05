import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Lang = "en" | "ru";

const translations = {
  en: {
    // Nav
    navBenefits: "Benefits",
    navAudience: "Who it's for",
    navHow: "How it works",
    navCompare: "Compare",
    navFAQ: "FAQ",
    navGetCard: "Get card →",

    // Hero
    heroBadge: "Pionex Card · Visa & Mastercard",
    heroTitle1: "Spend crypto like",
    heroDesc: "ZeroCard turns USDT into an everyday payment tool — 1% cashback on everything, 5% APR on balance and zero maintenance fees. Works with Apple Pay, Google Pay and PayPal in 200+ countries.",
    heroCTA: "Get card for free →",
    heroSecondary: "How it works",
    pill1: "200+ countries",
    pill2: "Apple Pay",
    pill3: "Google Pay",
    pill4: "$0 annual fee",
    pill5: "Instant top-up",

    // Typewriter phrases (13)
    tw1: "real money", tw2: "coffee & taxi", tw3: "Netflix & Spotify",
    tw4: "Steam & Xbox", tw5: "Adobe & Figma", tw6: "food & shopping",
    tw7: "ChatGPT & Claude", tw8: "hotels & flights", tw9: "subscriptions",
    tw10: "Meta ads", tw11: "supplier orders", tw12: "anything you want",
    tw13: "real life",

    // Ticker wallets
    tickerApple: "Apple Pay", tickerGoogle: "Google Pay", tickerPaypal: "PayPal",
    tickerVisa: "Visa", tickerMastercard: "Mastercard", tickerTrip: "Trip.com",
    tickerLine: "LINE Pay", tickerWechat: "WeChat Pay", tickerAlipay: "Alipay",
    tickerSamsung: "Samsung Pay",

    // Stats
    stat1Val: "1%", stat1Label: "Cashback on every purchase",
    stat2Val: "5%", stat2Label: "APR on balance (hourly)",
    stat3Val: "5M+", stat3Label: "Pionex users",
    stat4Val: "$0", stat4Label: "Annual & issuance fee",

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
    ben1Icon: "💰", ben1Big: "1%", ben1Title: "Unlimited cashback in USDT", ben1Desc: "Every purchase returns 1% in USDT directly to your card account. No limits, no expiry, no exceptions. Spend $1000 — get $10 back. Automatically, every time. Cashback credited within 24 hours.",
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
    howTab1: "Get card", howTab2: "Apple Pay", howTab3: "Google Pay", howTab4: "PayPal",
    step1Title: "Registration", step1Desc: "Create a Pionex account — via email or Google. Takes 2 minutes.",
    step2Title: "KYC Level 2", step2Desc: "Passport photo + selfie. Verification usually takes 10 minutes.",
    step3Title: "Apply", step3Desc: "App → Wallet → Card → Apply. Approval within 24 hours.",
    step4Title: "Fund account", step4Desc: "Transfer USDT from main account to card. Minimum 1 USDT. Instant.",
    step5Title: "Spend & Earn", step5Desc: "Add to Apple Pay or Google Pay. Cashback and interest start working immediately.",
    howCTA: "Start now — it's free →",
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
    gpTitle: "Google Pay", gpType: "Android · Manual adding", gpSupported: "Supported",
    gpStep1: "Open Google Pay app", gpStep2: "Tap 'Payment' → 'Add card'", gpStep3: "Enter Pionex card details manually", gpStep4: "Accept terms", gpStep5: "Confirm via SMS or email — done!",
    gpReqTitle: "Requirements", gpReqType: "What you need for Google Pay",
    gpReq1: "Android 7.0 (Nougat) or newer", gpReq2: "Device with NFC chip", gpReq3: "Google Pay app installed", gpReq4: "NFC enabled in settings",
    gpHowTitle: "How to pay", gpHowType: "Contactless payment",
    gpHow1: "Unlock your phone", gpHow2: "Hold near NFC terminal", gpHow3: "Wait for confirmation on screen", gpHow4: "Cashback is credited automatically",
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
    comp4P: "Issuance fee", comp4Z: "✓ $0", comp4B: "✕ Often paid", comp4O: "~ Sometimes",
    comp5P: "FX fee (Visa)", comp5Z: "✓ 0%", comp5B: "✕ 1.5–3%", comp5O: "~ 0–2%",
    comp6P: "Apple Pay / Google Pay", comp6Z: "✓", comp6B: "✓", comp6O: "~ Sometimes",
    comp7P: "Instant crypto top-up", comp7Z: "✓", comp7B: "✕", comp7O: "~ Sometimes",
    comp8P: "Travel cashback (Trip.com)", comp8Z: "5%", comp8B: "~ Sometimes", comp8O: "✕ Rarely",
    comp9P: "PayPal, LINE Pay support", comp9Z: "✓", comp9B: "~ Partial", comp9O: "✕ Rarely",

    // Audience
    audBadge: "👥 Who it's for",
    audTitle: "ZeroCard solves\nyour specific pain",
    audDesc: "No matter what you do — the card works for you. Choose your category.",
    audCTA: "Get ZeroCard for free →",

    audTab1: "🪙 Crypto holders", audTab2: "📈 Traders", audTab3: "🤖 Pionex users",
    audTab4: "✨ AI users", audTab5: "🔒 Blocked cards", audTab6: "🌍 Digital Nomads",
    audTab7: "💼 Freelancers", audTab8: "💰 Investors",
    audTab9: "🎬 Bloggers & Creatives", audTab10: "🎮 Gamers",
    audTab11: "🛍️ E-commerce", audTab12: "🛂 Expats",
    audTab13: "👨‍👩‍👧 Parents abroad", audTab14: "⚡ Arbitrageurs",

    // Audience: Crypto
    aud1Icon: "🪙", aud1Tag: "⚡ Primary audience", aud1Title: "Crypto holders",
    aud1Desc: "You hold USDT, BTC, ETH — but in real life they're useless. ZeroCard lets you spend crypto as easily as dollars — in any store worldwide.",
    aud1S1V: "1%", aud1S1L: "cashback in USDT", aud1S2V: "$0", aud1S2L: "annual fee", aud1S3V: "200+", aud1S3L: "countries",
    aud1P1Icon: "🔒", aud1P1Title: "Crypto frozen on exchange", aud1P1Body: "Millions hold USDT on Pionex, Binance, Bybit — but can't spend a cent without withdrawal. Every withdrawal = 1–3 days waiting and 1–3% fees.",
    aud1P1Sol: "✦ ZeroCard: top up in seconds and pay everywhere Visa is accepted",
    aud1P2Icon: "💸", aud1P2Title: "Conversion losses", aud1P2Body: "Want to spend $200 from crypto? Conversion + withdrawal + bank transfer = you lose $8–15. Every time. This adds up to thousands per year.",
    aud1P2Sol: "✦ ZeroCard: 1% cashback covers the transaction fee — effectively zero commission",
    aud1P3Icon: "📉", aud1P3Title: "Dead capital on exchange", aud1P3Body: "USDT sits on the exchange earning nothing. No interest, no yield — just waiting until you spend it.",
    aud1P3Sol: "✦ ZeroCard: 5% APR on balance — money works every hour, even when you're not trading",

    // Audience: Traders
    aud2Icon: "📈", aud2Tag: "🏆 All-market traders", aud2Title: "Crypto, stock & forex traders",
    aud2Desc: "Pionex — leading trading bot platform: 60B+ monthly volume, 5M+ users, 6 years. Trading profits should easily become real spending.",
    aud2S1V: "$60B", aud2S1L: "volume/month", aud2S2V: "5M+", aud2S2L: "traders", aud2S3V: "6 yrs", aud2S3L: "on market",
    aud2P1Icon: "🤑", aud2P1Title: "Profit exists, can't spend it", aud2P1Body: "Closed a good trade, locked profit in USDT — but to buy something in real life, you need days of withdrawal. Moment missed.",
    aud2P1Sol: "✦ ZeroCard: profit on card instantly — spend gains the same day",
    aud2P2Icon: "🏦", aud2P2Title: "Banks block transfers from exchanges", aud2P2Body: "Many banks flag transfers from crypto exchanges as suspicious. Accounts get blocked, transfers delayed — stress and lost time.",
    aud2P2Sol: "✦ ZeroCard: no bank transfers — USDT directly to Visa/Mastercard",
    aud2P3Icon: "💹", aud2P3Title: "Reserve USDT not working", aud2P3Body: "Traders often hold USDT reserves between trades. This capital just sits dead for weeks.",
    aud2P3Sol: "✦ ZeroCard: 5% APR hourly — reserves earn while waiting for the next trade",

    // Audience: Bots
    aud3Icon: "🤖", aud3Tag: "🥇 Pionex users", aud3Title: "Trading bot users",
    aud3Desc: "Already using Pionex Grid Bot, DCA Bot or other strategies? ZeroCard is the logical extension: bot profits turn into real spending without extra steps.",
    aud3S1V: "16+", aud3S1L: "bot types", aud3S2V: "24/7", aud3S2L: "operation", aud3S3V: "$0", aud3S3L: "for card",
    aud3P1Icon: "🔄", aud3P1Title: "Bot profit unavailable for spending", aud3P1Body: "Grid Bot works 24/7, accumulates USDT — but to actually use the profit, you need a multi-step withdrawal. This defeats the purpose of passive income.",
    aud3P1Sol: "✦ ZeroCard: top up card from Pionex main account with one tap — profit available instantly",
    aud3P2Icon: "💰", aud3P2Title: "Free USDT sitting idle", aud3P2Body: "Holding USDT in reserve between bot launches? It just sits there earning nothing — lost income every day.",
    aud3P2Sol: "✦ ZeroCard: move some to card — 5% APR starts working hourly while the bot prepares",
    aud3P3Icon: "🔗", aud3P3Title: "Everything's already in Pionex — why use another bank", aud3P3Body: "You already trust Pionex with your assets. Opening a bank account, passing another verification — extra steps and extra risks.",
    aud3P3Sol: "✦ ZeroCard: all in one app — trade, save, spend without switching between services",

    // Audience: AI
    aud4Icon: "✨", aud4Tag: "🚀 Fast-growing segment", aud4Title: "AI platform users",
    aud4Desc: "ChatGPT Plus, Claude Pro, Midjourney, Runway, ElevenLabs, Suno, Perplexity Pro — all cost $10–$200/month and only accept international cards.",
    aud4S1V: "$20", aud4S1L: "ChatGPT Plus/mo", aud4S2V: "$30", aud4S2L: "Claude Pro/mo", aud4S3V: "+1%", aud4S3L: "cashback back",
    aud4P1Icon: "🚫", aud4P1Title: "'Your card is not accepted'", aud4P1Body: "Trying to pay for ChatGPT Plus, Claude Pro or Midjourney — but your local card doesn't go through. You need the service, but can't pay.",
    aud4P1Sol: "✦ ZeroCard: international Visa — accepted everywhere foreign subscriptions work",
    aud4P2Icon: "🔄", aud4P2Title: "Multiple subscriptions — constant headache", aud4P2Body: "ChatGPT + Claude + Midjourney + Runway = $80–150/month by different methods. Every time you search for a payment method.",
    aud4P2Sol: "✦ ZeroCard: one card for all subscriptions — and 1% cashback returns every month",
    aud4P3Icon: "💳", aud4P3Title: "Virtual cards expire and get blocked", aud4P3Body: "Using disposable virtual cards for subscriptions? They regularly stop working, need re-linking — endless routine.",
    aud4P3Sol: "✦ ZeroCard: stable Visa/Mastercard with permanent details — subscriptions work without interruptions",

    // Audience: Blocked
    aud5Icon: "🔒", aud5Tag: "🆘 Critically important", aud5Title: "Blocked cards",
    aud5Desc: "Sanctions, relocation, country change, bank problems — for various reasons people are left without a working card. ZeroCard doesn't depend on any specific country's banking system.",
    aud5S1V: "200+", aud5S1L: "working countries", aud5S2V: "Visa", aud5S2L: "& Mastercard", aud5S3V: "0%", aud5S3L: "FX Visa",
    aud5P1Icon: "🌐", aud5P1Title: "Card blocked after relocation", aud5P1Body: "Moved to another country — local bank froze your card or it's simply not accepted in stores.",
    aud5P1Sol: "✦ ZeroCard: works in 200+ countries without being tied to any specific bank or country",
    aud5P2Icon: "🏦", aud5P2Title: "Bank froze account without warning", aud5P2Body: "Banks block accounts for opaque reasons — suspicious operations, technical issues, sanction lists. Unblocking takes weeks.",
    aud5P2Sol: "✦ ZeroCard: bank-independent infrastructure based on Pionex — works when the bank fails you",
    aud5P3Icon: "💱", aud5P3Title: "No access to foreign currency account", aud5P3Body: "In some countries opening a foreign currency account or simply buying dollars officially is nearly impossible.",
    aud5P3Sol: "✦ ZeroCard: USDT account — a stablecoin pegged to the dollar, accessible anywhere in the world",

    // Audience: Nomads
    aud6Icon: "🌍", aud6Tag: "✈️ Digital Nomads", aud6Title: "Travelers & nomads",
    aud6Desc: "You live between countries. Every time you solve the same problem: how to pay here and now without conversion losses. ZeroCard — one card for the whole world.",
    aud6S1V: "0%", aud6S1L: "FX Visa", aud6S2V: "5%", aud6S2L: "Trip.com cashback", aud6S3V: "NFC", aud6S3L: "everywhere",
    aud6P1Icon: "💱", aud6P1Title: "Conversion eats money every day", aud6P1Body: "In Thailand — baht, Vietnam — dong, Turkey — lira. Every time 2–3% conversion, and the bank charges FX too. In a month you lose $50–100.",
    aud6P1Sol: "✦ ZeroCard Visa: 0% FX fee — pay real exchange rate without bank markups",
    aud6P2Icon: "🏨", aud6P2Title: "Expensive flights and hotels", aud6P2Body: "Traveling constantly, you spend $5000–15000/year on flights and accommodation. Every percent discount is real money.",
    aud6P2Sol: "✦ ZeroCard: 5% cashback on Trip.com — on $5000 flights you get $250 back in USDT",
    aud6P3Icon: "📵", aud6P3Title: "Home card stopped working", aud6P3Body: "Bank sees transactions from 5 different countries in a month — blocks card as suspicious.",
    aud6P3Sol: "✦ ZeroCard: crypto infrastructure doesn't block for 'suspicious geography' — works everywhere",

    // Audience: Freelance
    aud7Icon: "💼", aud7Tag: "🖥️ Freelancers & remote workers", aud7Title: "Freelancers & remote employees",
    aud7Desc: "Getting paid in crypto or stablecoins? ZeroCard is the shortest path from incoming payment to real spending.",
    aud7S1V: "⚡", aud7S1L: "instant", aud7S2V: "1%", aud7S2L: "cashback", aud7S3V: "5%", aud7S3L: "APR",
    aud7P1Icon: "⏳", aud7P1Title: "Client paid in USDT — money unavailable", aud7P1Body: "International client transferred payment in USDT. To pay rent or groceries, you need withdrawal to bank — 2–5 business days and fees.",
    aud7P1Sol: "✦ ZeroCard: USDT received → on card in seconds → pay in store immediately",
    aud7P2Icon: "🛠️", aud7P2Title: "Work tools cost in dollars", aud7P2Body: "Figma, Notion, GitHub Pro, Adobe CC, AWS — all $10–50/month requiring an international card.",
    aud7P2Sol: "✦ ZeroCard: pay all subscriptions with one card and get 1% back on every payment",
    aud7P3Icon: "📊", aud7P3Title: "Savings sit in USDT without income", aud7P3Body: "Holding a USDT reserve for a rainy day. Smart, but money works idle — no interest, no growth.",
    aud7P3Sol: "✦ ZeroCard: 5% APR — $1000 on the card earns ~$50/year just sitting there",

    // Audience: Investors
    aud8Icon: "💰", aud8Tag: "📊 Passive income", aud8Title: "Investors & savers",
    aud8Desc: "Holding capital in stablecoins as a defensive asset or waiting for market entry? ZeroCard turns waiting into income — 5% APR every hour.",
    aud8S1V: "5%", aud8S1L: "APR/year", aud8S2V: "24/7", aud8S2L: "accrual", aud8S3V: "USDT", aud8S3L: "stablecoin",
    aud8P1Icon: "😴", aud8P1Title: "Capital 'in waiting' earns nothing", aud8P1Body: "Exited position to USDT and waiting for correction to re-enter. Capital sits dead — a week, a month, three months.",
    aud8P1Sol: "✦ ZeroCard: 5% APR on balance — $10,000 waiting earns ~$42/month",
    aud8P2Icon: "🏦", aud8P2Title: "Bank deposit yields less than inflation", aud8P2Body: "Traditional bank offers 1–3% on USD deposit — less than inflation. And you need to lock money for 6–12 months.",
    aud8P2Sol: "✦ ZeroCard: 5% APR without lockup — money stays accessible, spend anytime",
    aud8P3Icon: "💸", aud8P3Title: "Dividends and profit unavailable", aud8P3Body: "Investment income arrives in crypto — but to actually use profit, you need a long path through the bank.",
    aud8P3Sol: "✦ ZeroCard: investment income → card → spend immediately without banks and delays",

    // Audience: Youtubers/Creatives
    aud9Icon: "🎬", aud9Tag: "🔥 Content makers", aud9Title: "Bloggers, streamers, Creatives",
    aud9Desc: "YouTube, Twitch, TikTok, Patreon, Substack — platforms pay in USD, but withdrawing to a card without losses is impossible. ZeroCard does it in seconds.",
    aud9S1V: "0%", aud9S1L: "FX conversion", aud9S2V: "1%", aud9S2L: "cashback back", aud9S3V: "⚡", aud9S3L: "instant",
    aud9P1Icon: "💳", aud9P1Title: "Platforms don't accept local card", aud9P1Body: "Want to promote via YouTube Ads, Canva Pro or Adobe? Local card declined. Need workarounds, wasting time and money.",
    aud9P1Sol: "✦ ZeroCard: international Visa — accepted in all ad dashboards and creative tools",
    aud9P2Icon: "🎨", aud9P2Title: "Work tools cost in dollars", aud9P2Body: "Adobe CC, Figma, Final Cut, DaVinci Resolve — creator stack costs $100–300/month and requires an international card.",
    aud9P2Sol: "✦ ZeroCard: all subscriptions from one card + 1% cashback = ~$3 back on every $300 spent",
    aud9P3Icon: "📊", aud9P3Title: "Monetization comes in crypto — can't spend", aud9P3Body: "Some platforms pay in USDT or BTC. The money is real, but converting to everyday spending without losses is a whole story.",
    aud9P3Sol: "✦ ZeroCard: USDT from platform → card in seconds → pay production costs today",

    // Audience: Gamers
    aud10Icon: "🎮", aud10Tag: "👾 Gamers & Play-to-Earn", aud10Title: "Gamers and Play-to-Earn players",
    aud10Desc: "Steam, Epic, PlayStation, Xbox Game Pass — all require an international card. If you also earn from Play-to-Earn games, ZeroCard is the shortest path from gaming token to real purchases.",
    aud10S1V: "100M+", aud10S1L: "Visa merchants", aud10S2V: "$0", aud10S2L: "for card", aud10S3V: "1%", aud10S3L: "cashback",
    aud10P1Icon: "🕹️", aud10P1Title: "Steam, Epic and Xbox don't accept local card", aud10P1Body: "Want to buy a game, DLC or in-game currency — card declined. Forced to buy keys from resellers with 20–30% markup.",
    aud10P1Sol: "✦ ZeroCard: pay directly on Steam/Epic at real price, plus get cashback",
    aud10P2Icon: "🪙", aud10P2Title: "Play-to-Earn tokens can't be spent IRL", aud10P2Body: "Earned USDT in Axie, Gods Unchained or other P2E game — real money, but spending it at a café or store is impossible without complex withdrawal.",
    aud10P2Sol: "✦ ZeroCard: gaming earnings → card in seconds → spend in any store worldwide",
    aud10P3Icon: "💸", aud10P3Title: "Gaming subscriptions eat money", aud10P3Body: "Xbox Game Pass Ultimate, PlayStation Plus, EA Play — $50–150/year on subscriptions, each requiring a foreign card. Total 3–5% lost on conversion.",
    aud10P3Sol: "✦ ZeroCard: all gaming subscriptions from one card + 1% back — real savings long term",

    // Audience: E-commerce
    aud11Icon: "🛍️", aud11Tag: "📦 E-commerce & Dropshipping", aud11Title: "Online sellers & dropshippers",
    aud11Desc: "AliExpress, Amazon, Shopify, suppliers — everything requires an international card for purchases. If you accept crypto payments, ZeroCard closes the loop.",
    aud11S1V: "0%", aud11S1L: "FX Visa", aud11S2V: "1%", aud11S2L: "cashback", aud11S3V: "5%", aud11S3L: "APR",
    aud11P1Icon: "📦", aud11P1Title: "Supplier purchases require foreign card", aud11P1Body: "AliExpress, Amazon FBA, Alibaba — you buy product, but local card is declined or charges 2–3% FX. On $5000 purchases that's $100–150 extra every time.",
    aud11P1Sol: "✦ ZeroCard Visa: 0% FX — buy from any international supplier without overpaying",
    aud11P2Icon: "🔁", aud11P2Title: "Clients pay in crypto — money stuck", aud11P2Body: "Accepting USDT payments — convenient for client, but to reinvest in inventory or ads, you need a long path through exchange and bank.",
    aud11P2Sol: "✦ ZeroCard: USDT payment → straight to card → buy product or run ads the same day",
    aud11P3Icon: "📣", aud11P3Title: "Meta/Google ads require foreign card", aud11P3Body: "Facebook Ads, Google Ads, TikTok Ads — ad dashboards block local cards. Without a working card the business stops.",
    aud11P3Sol: "✦ ZeroCard: link to ad dashboards and get 1% cashback on every ad dollar spent",

    // Audience: Expats
    aud12Icon: "🛂", aud12Tag: "✈️ Expats & Relocated", aud12Title: "Expats and recently relocated",
    aud12Desc: "Moved to a new country? First months are a nightmare: local bank account hard to open, home cards blocked, cash running out. ZeroCard works from day one in any country.",
    aud12S1V: "200+", aud12S1L: "countries", aud12S2V: "5 min", aud12S2L: "get card", aud12S3V: "$0", aud12S3L: "fee",
    aud12P1Icon: "🏦", aud12P1Title: "Local bank won't open account right away", aud12P1Body: "In Germany, Portugal, UAE opening a bank account for new residents takes 2–6 weeks. Need to pay for housing, food, transport — but no card.",
    aud12P1Sol: "✦ ZeroCard: KYC in 10 minutes — card works the same day while you wait for the bank",
    aud12P2Icon: "🔄", aud12P2Title: "Transfers from family come in crypto", aud12P2Body: "Parents send money in USDT — cheaper and faster than SWIFT. But how to get it in a form you can pay with at a store?",
    aud12P2Sol: "✦ ZeroCard: USDT from family → card instantly → pay at any supermarket in the new city",
    aud12P3Icon: "💱", aud12P3Title: "Two accounts in two countries — constant headache", aud12P3Body: "Money in the old country's account, expenses in the new one. Every transfer — fees, exchange rate, time.",
    aud12P3Sol: "✦ ZeroCard: one USDT account works everywhere without being tied to any country or bank",

    // Audience: Parents
    aud13Icon: "👨‍👩‍👧", aud13Tag: "❤️ Families apart", aud13Title: "Parents supporting kids abroad",
    aud13Desc: "Child studying or working abroad. Sending money through bank — fees, exchange rate, 3–5 days. Crypto is faster, but the child needs a working card. ZeroCard solves this once and for all.",
    aud13S1V: "⚡", aud13S1L: "instant", aud13S2V: "$0", aud13S2L: "issuance", aud13S3V: "5%", aud13S3L: "APR on balance",
    aud13P1Icon: "🏫", aud13P1Title: "Transfer to student takes days and costs a lot", aud13P1Body: "SWIFT transfer to son in Germany or daughter in USA: $25–50 fee + conversion + 3–5 business days. Expensive, slow and stressful for both sides.",
    aud13P1Sol: "✦ ZeroCard: send USDT → child tops up card → money available in a minute, not days",
    aud13P2Icon: "😟", aud13P2Title: "Child stuck without money in emergency", aud13P2Body: "Phone broke, wallet stolen, bank blocked account — need money right now, not in three days after SWIFT.",
    aud13P2Sol: "✦ ZeroCard: emergency USDT transfer → card in minutes → problem solved anywhere in the world",
    aud13P3Icon: "📈", aud13P3Title: "Saved money for child doesn't grow", aud13P3Body: "Holding a USDT reserve 'just in case' for child abroad. Money just sits — no income on the wait.",
    aud13P3Sol: "✦ ZeroCard: 5% APR accrues on card balance every hour — money grows while waiting for need",

    // Audience: Arbitrage
    aud14Icon: "⚡", aud14Tag: "🔁 P2P & Crypto arbitrage", aud14Title: "Arbitrageurs and P2P traders",
    aud14Desc: "Making money on price differences between exchanges or working P2P? Speed of money movement is your profit. ZeroCard gives instant USDT access without delays and bank restrictions.",
    aud14S1V: "⚡", aud14S1L: "instant", aud14S2V: "5%", aud14S2L: "APR on pause", aud14S3V: "1%", aud14S3L: "cashback everywhere",
    aud14P1Icon: "⏱️", aud14P1Title: "Every second of delay — lost profit", aud14P1Body: "Arbitrage window lives minutes. While money goes through bank transfer 1–3 days, the window closes. Speed of USDT movement decides everything.",
    aud14P1Sol: "✦ ZeroCard: card top-up from Pionex in seconds — money where it's needed, when it's needed",
    aud14P2Icon: "🏦", aud14P2Title: "Banks block frequent P2P operations", aud14P2Body: "Regular transfers between accounts raise bank suspicion. Account blocked, transactions delayed — business stops.",
    aud14P2Sol: "✦ ZeroCard: USDT movement within Pionex doesn't go through bank — no blocks, no questions",
    aud14P3Icon: "💤", aud14P3Title: "USDT 'on pause' between deals doesn't work", aud14P3Body: "Between arbitrage windows you hold USDT in reserve. Necessary for speed, but money just sits without income — sometimes hours, sometimes days.",
    aud14P3Sol: "✦ ZeroCard: 5% APR accrues every hour — reserves earn even while waiting for next deal",

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
    faq1Q: "What is ZeroCard?",
    faq1A: "ZeroCard is a virtual payment card powered by Pionex that lets you pay for international services, subscriptions and online purchases worldwide.\n\nIn simple terms, ZeroCard is the same card you get through Pionex — just presented in a simpler and more user-friendly way. The card works like a regular online payment card, but without typical banking limitations.\n\nKey features:\n• Works with international services\n• Payments go through without declines\n• Setup takes about 5 minutes\n• No monthly fees\n• Up to 1% cashback\n\nAfter clicking the button, you will be redirected to the official Pionex platform to complete registration and get your card.",
    faq2Q: "How to fund the card account?",
    faq2A: "USDT transfer from main Pionex account to card account is instant right in the app. Minimum — 1 USDT. No fees between Pionex accounts.",
    faq3Q: "How does 1% cashback work?",
    faq3A: "Every purchase returns 1% of the transaction amount in USDT to the card account within 24 hours. No limits, no expiry, no exceptions. Spent $500 — got $5 back.",
    faq4Q: "How is 5% APR calculated?",
    faq4A: "5% annual is accrued on USDT balance in the card account and compounds every hour. Your money earns interest continuously — even while you sleep.",
    faq5Q: "Is the card physical or virtual?",
    faq5A: "Currently only a virtual card is available. It can be added to Apple Pay, Google Pay, PayPal and other wallets for contactless payments. Physical card is planned for the future.",
    faq6Q: "Visa or Mastercard — which to choose?",
    faq6A: "Both cards offer the same bonuses: 1% cashback, 5% APR, zero annual fee. Main difference: Visa charges 0% for currency conversion, Mastercard — up to 2% in some regions. For international spending, Visa is better.",
    faq7Q: "What if Apple Pay linking fails?",
    faq7A: "Make sure the card account has funds — some wallets do a test charge for verification. If linking shows 'contact issuer', fill out the form at support.pionex.com — team will help within 3 business days.",
    faq8Q: "How to freeze the card if phone is lost?",
    faq8A: "Log into Pionex from another device → Card section → Freeze card. Freeze is instant. You can unfreeze yourself in the app — no need to contact support.",

    // CTA
    ctaBadge: "Free · Fast · Profitable",
    ctaTitle: "Start spending crypto\nright now",
    ctaDesc: "Join millions of Pionex users who already earn cashback, earn interest and spend USDT like a regular card.",
    ctaCTA: "Get ZeroCard for free →",
    ctaDocs: "Documentation",
    ctaDisclaimer: "KYC Level 2 required · Minimum 100 USDT · Virtual card · Visa & Mastercard",

    // Footer
    footerNote: "Independent partner site. Not an official Pionex resource. All links contain partner referral code. Terms and fees may change — check current info at pionex.com. © 2026 ZeroCard.",

    // SEO
    metaTitle: "ZeroCard — Crypto Card Pionex | 1% Cashback, 5% APR, Apple Pay | Spend USDT Everywhere",
    metaDesc: "ZeroCard by Pionex — virtual Visa/Mastercard for USDT. 1% cashback on every purchase, 5% APR on balance, Apple Pay and Google Pay, 0 annual fees. Works in 200+ countries.",
  },
  ru: {
    // Nav
    navBenefits: "Преимущества",
    navAudience: "Для кого",
    navHow: "Как работает",
    navCompare: "Сравнение",
    navFAQ: "FAQ",
    navGetCard: "Получить карту →",

    // Hero
    heroBadge: "Pionex Card · Visa & Mastercard",
    heroTitle1: "Трать крипту как",
    heroDesc: "ZeroCard превращает USDT в ежедневный платёжный инструмент — 1% кэшбэк на всё, 5% годовых на остаток и ноль комиссий за обслуживание. Работает с Apple Pay, Google Pay и PayPal в 200+ странах.",
    heroCTA: "Получить карту бесплатно →",
    heroSecondary: "Как это работает",
    pill1: "200+ стран",
    pill2: "Apple Pay",
    pill3: "Google Pay",
    pill4: "$0 годовой сбор",
    pill5: "Мгновенное пополнение",

    // Typewriter phrases (13)
    tw1: "обычные деньги", tw2: "кофе и такси", tw3: "Netflix и Spotify",
    tw4: "Steam и Xbox", tw5: "Adobe и Figma", tw6: "еду и покупки",
    tw7: "ChatGPT и Claude", tw8: "отели и билеты", tw9: "подписки и сервисы",
    tw10: "рекламу в Meta", tw11: "закупки у поставщиков", tw12: "всё что угодно",
    tw13: "реальную жизнь",

    // Ticker
    tickerApple: "Apple Pay", tickerGoogle: "Google Pay", tickerPaypal: "PayPal",
    tickerVisa: "Visa", tickerMastercard: "Mastercard", tickerTrip: "Trip.com",
    tickerLine: "LINE Pay", tickerWechat: "WeChat Pay", tickerAlipay: "Alipay",
    tickerSamsung: "Samsung Pay",

    // Stats
    stat1Val: "1%", stat1Label: "Кэшбэк на каждую покупку",
    stat2Val: "5%", stat2Label: "APR на остаток (ежечасно)",
    stat3Val: "5M+", stat3Label: "Пользователей Pionex",
    stat4Val: "$0", stat4Label: "Годовой и выпускной сбор",

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
    ben1Icon: "💰", ben1Big: "1%", ben1Title: "Безлимитный кэшбэк в USDT", ben1Desc: "Каждая покупка возвращает 1% в USDT прямо на карточный счёт. Без лимитов, без срока действия, без исключений. Потрать $1000 — получи $10 назад. Автоматически, каждый раз. Кэшбэк начисляется в течение 24 часов после транзакции.",
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
    howTab1: "Получить карту", howTab2: "Apple Pay", howTab3: "Google Pay", howTab4: "PayPal",
    step1Title: "Регистрация", step1Desc: "Создай аккаунт Pionex — через email или Google. Займёт 2 минуты.",
    step2Title: "KYC Level 2", step2Desc: "Фото паспорта + селфи. Верификация обычно занимает 10 минут.",
    step3Title: "Подать заявку", step3Desc: "Приложение → Кошелёк → Карта → Подать заявку. Одобрение за 24 часа.",
    step4Title: "Пополнить счёт", step4Desc: "Переведи USDT с основного счёта на карточный. Минимум 1 USDT. Мгновенно.",
    step5Title: "Трать & Зарабатывай", step5Desc: "Добавь в Apple Pay или Google Pay. Кэшбэк и проценты начнут работать сразу.",
    howCTA: "Начать сейчас — это бесплатно →",
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
    gpTitle: "Google Pay", gpType: "Android · Ручное добавление", gpSupported: "Поддерживается",
    gpStep1: "Открой приложение Google Pay", gpStep2: "Нажми «Оплата» → «Добавить карту»", gpStep3: "Введи данные карты Pionex вручную", gpStep4: "Прими условия соглашения", gpStep5: "Подтверди через SMS или email — готово!",
    gpReqTitle: "Требования", gpReqType: "Что нужно для Google Pay",
    gpReq1: "Android 7.0 (Nougat) или новее", gpReq2: "Устройство с NFC-чипом", gpReq3: "Приложение Google Pay установлено", gpReq4: "NFC включён в настройках",
    gpHowTitle: "Как платить", gpHowType: "Бесконтактная оплата",
    gpHow1: "Разблокируй телефон", gpHow2: "Приднеси к NFC-терминалу", gpHow3: "Дождись подтверждения на экране", gpHow4: "Кэшбэк начисляется автоматически",
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
    comp4P: "Сбор за выпуск", comp4Z: "✓ $0", comp4B: "✕ Часто платный", comp4O: "~ Иногда",
    comp5P: "FX-сбор (Visa)", comp5Z: "✓ 0%", comp5B: "✕ 1.5–3%", comp5O: "~ 0–2%",
    comp6P: "Apple Pay / Google Pay", comp6Z: "✓", comp6B: "✓", comp6O: "~ Не всегда",
    comp7P: "Мгновенное пополнение из крипты", comp7Z: "✓", comp7B: "✕", comp7O: "~ Иногда",
    comp8P: "Трэвел-кэшбэк (Trip.com)", comp8Z: "5%", comp8B: "~ Иногда", comp8O: "✕ Редко",
    comp9P: "Подключение к PayPal, LINE Pay", comp9Z: "✓", comp9B: "~ Частично", comp9O: "✕ Редко",

    // Audience
    audBadge: "👥 Для кого",
    audTitle: "ZeroCard решает\nтвою конкретную боль",
    audDesc: "Неважно чем ты занимаешься — карта работает для тебя. Выбери свою категорию.",
    audCTA: "Получить ZeroCard бесплатно →",

    audTab1: "🪙 Криптаны", audTab2: "📈 Трейдеры", audTab3: "🤖 Pionex боты",
    audTab4: "✨ ИИ-пользователи", audTab5: "🔒 Заблокированные карты", audTab6: "🌍 Digital Nomads",
    audTab7: "💼 Фрилансеры", audTab8: "💰 Инвесторы",
    audTab9: "🎬 Блогеры & Creatives", audTab10: "🎮 Геймеры",
    audTab11: "🛍️ Интернет-торговля", audTab12: "🛂 Эмигранты",
    audTab13: "👨‍👩‍👧 Родители за рубежом", audTab14: "⚡ Арбитражники",

    // Audience: Crypto
    aud1Icon: "🪙", aud1Tag: "⚡ Основная аудитория", aud1Title: "Держатели крипты",
    aud1Desc: "Ты держишь USDT, BTC, ETH — но в реальной жизни они бесполезны. ZeroCard позволяет тратить крипту так же легко, как рубли или доллары — в любом магазине мира.",
    aud1S1V: "1%", aud1S1L: "кэшбэк в USDT", aud1S2V: "0₽", aud1S2L: "годовой сбор", aud1S3V: "200+", aud1S3L: "стран",
    aud1P1Icon: "🔒", aud1P1Title: "Крипта заморожена на бирже", aud1P1Body: "Миллионы держат USDT на Pionex, Binance, Bybit — но не могут потратить ни цента без вывода. Каждый вывод — это 1–3 дня ожидания и 1–3% комиссии.",
    aud1P1Sol: "✦ ZeroCard: пополни счёт за секунды и плати везде, где принимают Visa",
    aud1P2Icon: "💸", aud1P2Title: "Потери на конвертации", aud1P2Body: "Хочешь потратить $200 из крипты? Конвертация + вывод + банковский перевод = теряешь $8–15. Каждый раз. Это накапливается в тысячи долларов в год.",
    aud1P2Sol: "✦ ZeroCard: 1% кэшбэк перекрывает транзакционный сбор — эффективно нулевая комиссия",
    aud1P3Icon: "📉", aud1P3Title: "Мёртвый капитал на обменнике", aud1P3Body: "USDT лежит на бирже и ничего не зарабатывает. Никакого процента, никакой доходности — просто ждёт, пока ты его потратишь.",
    aud1P3Sol: "✦ ZeroCard: 5% APR на остаток — деньги работают каждый час, даже когда ты не торгуешь",

    // Audience: Traders
    aud2Icon: "📈", aud2Tag: "🏆 Трейдеры всех рынков", aud2Title: "Трейдеры крипты, акций, форекс",
    aud2Desc: "Pionex — ведущая платформа торговых ботов: 60 млрд+ ежемесячный объём торгов, 5M+ пользователей, 6 лет на рынке. Прибыль от торговли должна легко превращаться в реальные расходы.",
    aud2S1V: "60B$", aud2S1L: "объём/месяц", aud2S2V: "5M+", aud2S2L: "трейдеров", aud2S3V: "6 лет", aud2S3L: "на рынке",
    aud2P1Icon: "🤑", aud2P1Title: "Прибыль есть, потратить нельзя", aud2P1Body: "Закрыл хорошую сделку, зафиксировал прибыль в USDT — но чтобы купить что-то в реальном мире, нужно ждать дни вывода. Момент упущен.",
    aud2P1Sol: "✦ ZeroCard: профит на карте моментально — трать прибыль в тот же день",
    aud2P2Icon: "🏦", aud2P2Title: "Банки блокируют переводы с биржи", aud2P2Body: "Многие банки маркируют переводы с крипто-бирж как подозрительные. Счета блокируются, переводы задерживаются — это нервы и потерянное время.",
    aud2P2Sol: "✦ ZeroCard: никаких банковских переводов — USDT сразу на карту Visa/Mastercard",
    aud2P3Icon: "💹", aud2P3Title: "Резервный USDT не работает", aud2P3Body: "Трейдеры часто держат резервы в USDT между сделками. Этот капитал просто лежит мёртвым грузом неделями.",
    aud2P3Sol: "✦ ZeroCard: 5% APR ежечасно — резерв зарабатывает, пока ждёт следующей сделки",

    // Audience: Bots
    aud3Icon: "🤖", aud3Tag: "🥇 Пользователи Pionex", aud3Title: "Пользователи торговых ботов",
    aud3Desc: "Уже используешь Pionex Grid Bot, DCA Bot или другие стратегии? ZeroCard — логичное расширение: прибыль от ботов превращается в реальные расходы без промежуточных шагов.",
    aud3S1V: "16+", aud3S1L: "типов ботов", aud3S2V: "24/7", aud3S2L: "работа", aud3S3V: "0₽", aud3S3L: "за карту",
    aud3P1Icon: "🔄", aud3P1Title: "Прибыль бота недоступна для трат", aud3P1Body: "Grid Bot работает 24/7, накапливает USDT — но чтобы реально воспользоваться прибылью, нужен многошаговый вывод. Это тормозит весь смысл пассивного дохода.",
    aud3P1Sol: "✦ ZeroCard: пополни карту с основного счёта Pionex за одно нажатие — прибыль доступна сразу",
    aud3P2Icon: "💰", aud3P2Title: "Свободный USDT лежит без работы", aud3P2Body: "Между запусками ботов держишь USDT в резерве? Он просто лежит и ничего не приносит — это упущенный доход каждый день.",
    aud3P2Sol: "✦ ZeroCard: перекинь часть на карту — 5% APR начнёт работать ежечасно, пока бот готовится",
    aud3P3Icon: "🔗", aud3P3Title: "Всё уже в Pionex — зачем идти в другой банк", aud3P3Body: "Ты уже доверяешь Pionex свои активы. Открывать банковский счёт, проходить ещё одну верификацию — лишние шаги и лишние риски.",
    aud3P3Sol: "✦ ZeroCard: всё в одном приложении — торгуй, копи, трать без переходов между сервисами",

    // Audience: AI
    aud4Icon: "✨", aud4Tag: "🚀 Быстрорастущий сегмент", aud4Title: "Пользователи ИИ-платформ",
    aud4Desc: "ChatGPT Plus, Claude Pro, Midjourney, Runway, ElevenLabs, Suno, Perplexity Pro — все они стоят $10–$200/мес и принимают только зарубежные карты. Если ты в России, СНГ или любой «ограниченной» стране — ZeroCard решает это раз и навсегда.",
    aud4S1V: "$20", aud4S1L: "ChatGPT Plus/мес", aud4S2V: "$30", aud4S2L: "Claude Pro/мес", aud4S3V: "+1%", aud4S3L: "кэшбэк назад",
    aud4P1Icon: "🚫", aud4P1Title: "«Ваша карта не принимается»", aud4P1Body: "Пытаешься оплатить ChatGPT Plus, Claude Pro или Midjourney — а российская или украинская карта не проходит. Сервис нужен, а оплатить невозможно.",
    aud4P1Sol: "✦ ZeroCard: Visa международная — принимается везде, где работают зарубежные подписки",
    aud4P2Icon: "🔄", aud4P2Title: "Несколько подписок — постоянная головная боль", aud4P2Body: "ChatGPT + Claude + Midjourney + Runway = $80–150 в месяц разными способами. Каждый раз ищешь способ оплаты, тратишь время и нервы.",
    aud4P2Sol: "✦ ZeroCard: одна карта для всех подписок — и ещё 1% возвращается кэшбэком каждый месяц",
    aud4P3Icon: "💳", aud4P3Title: "Виртуальные карты сгорают и блокируются", aud4P3Body: "Используешь одноразовые виртуальные карты для подписок? Они регулярно перестают работать, нужно перепривязывать — это бесконечная рутина.",
    aud4P3Sol: "✦ ZeroCard: стабильная Visa/Mastercard с постоянными реквизитами — подписки работают без перебоев",

    // Audience: Blocked
    aud5Icon: "🔒", aud5Tag: "🆘 Критически важно", aud5Title: "Заблокированные карты",
    aud5Desc: "Санкции, переезд, смена страны, проблемы с банком — по самым разным причинам люди остаются без работающей карты. ZeroCard не зависит от банковской системы ни одной конкретной страны.",
    aud5S1V: "200+", aud5S1L: "стран работы", aud5S2V: "Visa", aud5S2L: "и Mastercard", aud5S3V: "0%", aud5S3L: "FX Visa",
    aud5P1Icon: "🌐", aud5P1Title: "Карта заблокирована после переезда", aud5P1Body: "Уехал в другую страну — местный банк заморозил карту или она просто не принимается в магазинах. Новый банковский счёт открывать долго, дорого и не всегда возможно.",
    aud5P1Sol: "✦ ZeroCard: работает в 200+ странах без привязки к конкретному банку или стране",
    aud5P2Icon: "🏦", aud5P2Title: "Банк заморозил счёт без предупреждения", aud5P2Body: "Банки блокируют счета по непрозрачным причинам — подозрительные операции, технические проблемы, санкционные списки. Разблокировка занимает недели.",
    aud5P2Sol: "✦ ZeroCard: независимая от банков инфраструктура на базе Pionex — работает когда банк подводит",
    aud5P3Icon: "💱", aud5P3Title: "Нет доступа к валютному счёту", aud5P3Body: "В некоторых странах открыть валютный счёт или просто купить доллары официально почти невозможно. Нужны деньги в USD — нет возможности.",
    aud5P3Sol: "✦ ZeroCard: счёт в USDT — стейблкоин с привязкой к доллару, доступный в любой точке мира",

    // Audience: Nomads
    aud6Icon: "🌍", aud6Tag: "✈️ Digital Nomads", aud6Title: "Путешественники и номады",
    aud6Desc: "Ты живёшь между странами. Каждый раз решаешь одну и ту же задачу: как платить здесь и сейчас без потерь на конвертации и без заблокированных карт. ZeroCard — одна карта для всего мира.",
    aud6S1V: "0%", aud6S1L: "FX Visa", aud6S2V: "5%", aud6S2L: "Trip.com кэшбэк", aud6S3V: "NFC", aud6S3L: "везде",
    aud6P1Icon: "💱", aud6P1Title: "Конвертация съедает деньги каждый день", aud6P1Body: "В Таиланде — бат, во Вьетнаме — донг, в Турции — лира. Каждый раз конвертация 2–3%, а банк ещё берёт FX-сбор. За месяц теряешь $50–100.",
    aud6P1Sol: "✦ ZeroCard Visa: 0% FX-сбор — платишь реальный курс без надбавок банка",
    aud6P2Icon: "🏨", aud6P2Title: "Дорогие авиабилеты и отели", aud6P2Body: "Путешествуя постоянно, тратишь $5000–15000 в год на перелёты и жильё. Каждый процент скидки — это реальные деньги.",
    aud6P2Sol: "✦ ZeroCard: 5% кэшбэк на Trip.com — на $5000 перелётов возвращается $250 в USDT",
    aud6P3Icon: "📵", aud6P3Title: "Домашняя карта перестала работать", aud6P3Body: "Банк видит транзакции из 5 разных стран за месяц — блокирует карту как подозрительную. Ты в Бали, деньги заморожены, поддержка не отвечает.",
    aud6P3Sol: "✦ ZeroCard: крипто-инфраструктура не блокирует за «подозрительную географию» — работает везде",

    // Audience: Freelance
    aud7Icon: "💼", aud7Tag: "🖥️ Фрилансеры и удалёнщики", aud7Title: "Фрилансеры и удалённые сотрудники",
    aud7Desc: "Получаешь оплату в крипте или стейблкоинах? ZeroCard — самый короткий путь от входящего платежа до реальных трат. Без банков, без задержек, без лишних комиссий.",
    aud7S1V: "⚡", aud7S1L: "мгновенно", aud7S2V: "1%", aud7S2L: "кэшбэк", aud7S3V: "5%", aud7S3L: "APR",
    aud7P1Icon: "⏳", aud7P1Title: "Заказчик заплатил в USDT — деньги недоступны", aud7P1Body: "Международный клиент перевёл оплату в USDT. Чтобы оплатить аренду или продукты, нужен вывод на банковский счёт — 2–5 рабочих дней и комиссия.",
    aud7P1Sol: "✦ ZeroCard: USDT пришёл → на карту за секунды → плати в магазине сразу",
    aud7P2Icon: "🛠️", aud7P2Title: "Рабочие инструменты стоят в долларах", aud7P2Body: "Figma, Notion, GitHub Pro, Adobe CC, AWS — всё это стоит $10–50/мес и требует международную карту. Суммарно набегает $100–300 в месяц.",
    aud7P2Sol: "✦ ZeroCard: оплачивай все подписки одной картой и возвращай 1% с каждого платежа",
    aud7P3Icon: "📊", aud7P3Title: "Накопления лежат в USDT без дохода", aud7P3Body: "Держишь резерв в USDT на «чёрный день». Это правильно, но деньги работают вхолостую — нет процентов, нет роста.",
    aud7P3Sol: "✦ ZeroCard: 5% APR — $1000 на карте приносит ~$50 в год просто лёжа на счёте",

    // Audience: Investors
    aud8Icon: "💰", aud8Tag: "📊 Пассивный доход", aud8Title: "Инвесторы и накопители",
    aud8Desc: "Держишь капитал в стейблкоинах как защитный актив или ждёшь момента для входа в рынок? ZeroCard превращает ожидание в доход — 5% APR каждый час пока ты держишь позицию.",
    aud8S1V: "5%", aud8S1L: "APR/год", aud8S2V: "24/7", aud8S2L: "начисление", aud8S3V: "USDT", aud8S3L: "стейблкоин",
    aud8P1Icon: "😴", aud8P1Title: "Капитал «в ожидании» ничего не зарабатывает", aud8P1Body: "Вышел из позиции в USDT и ждёшь коррекции чтобы зайти снова. Капитал лежит мёртвым грузом — неделю, месяц, три месяца.",
    aud8P1Sol: "✦ ZeroCard: 5% APR на остаток — $10 000 в ожидании приносят ~$42 за месяц",
    aud8P2Icon: "🏦", aud8P2Title: "Банковский депозит даёт меньше инфляции", aud8P2Body: "Традиционный банк предлагает 1–3% по депозиту в USD — меньше инфляции. Для этого ещё нужно заморозить деньги на 6–12 месяцев.",
    aud8P2Sol: "✦ ZeroCard: 5% APR без заморозки — деньги остаются доступны, можно потратить в любой момент",
    aud8P3Icon: "💸", aud8P3Title: "Дивиденды и прибыль недоступны для трат", aud8P3Body: "Инвестиционный доход приходит в крипте или конвертируется в USDT — но чтобы реально воспользоваться прибылью, нужен долгий путь через банк.",
    aud8P3Sol: "✦ ZeroCard: инвестиционный доход → карта → трать сразу без банков и задержек",

    // Audience: Youtubers/Creatives
    aud9Icon: "🎬", aud9Tag: "🔥 Контент-мейкеры", aud9Title: "Блогеры, стримеры, Creatives",
    aud9Desc: "YouTube, Twitch, TikTok, Patreon, Substack, OnlyFans — платформы платят в USD, но вывести деньги в удобную карту без потерь невозможно. ZeroCard делает это за секунды.",
    aud9S1V: "0%", aud9S1L: "FX конвертация", aud9S2V: "1%", aud9S2L: "кэшбэк назад", aud9S3V: "⚡", aud9S3L: "мгновенно",
    aud9P1Icon: "💳", aud9P1Title: "Платформы не принимают местную карту", aud9P1Body: "Хочешь продвигать видео через YouTube Ads, Canva Pro или Adobe? Местная карта отклонена. Приходится искать обходные пути, тратить время и деньги.",
    aud9P1Sol: "✦ ZeroCard: международная Visa — принимается во всех рекламных кабинетах и творческих инструментах",
    aud9P2Icon: "🎨", aud9P2Title: "Рабочие инструменты стоят в долларах", aud9P2Body: "Adobe CC, Figma, Final Cut, DaVinci Resolve — профессиональный стек контент-мейкера стоит $100–300/мес и требует зарубежную карту каждый месяц.",
    aud9P2Sol: "✦ ZeroCard: все подписки с одной карты + 1% кэшбэк = ~$3 возврата на каждые $300 расходов",
    aud9P3Icon: "📊", aud9P3Title: "Монетизация приходит в крипте — не потратить", aud9P3Body: "Некоторые платформы платят в USDT или BTC. Деньги есть, но конвертировать их в живые расходы без потерь — целая история.",
    aud9P3Sol: "✦ ZeroCard: USDT от платформы → карта за секунды → оплачивай продакшн-расходы прямо сегодня",

    // Audience: Gamers
    aud10Icon: "🎮", aud10Tag: "👾 Геймеры & Play-to-Earn", aud10Title: "Геймеры и Play-to-Earn игроки",
    aud10Desc: "Steam, Epic, PlayStation, Xbox Game Pass — всё это требует зарубежную карту. А если ты ещё и зарабатываешь в Play-to-Earn играх, ZeroCard — самый короткий путь от игрового токена до реальных покупок.",
    aud10S1V: "100M+", aud10S1L: "магазинов Visa", aud10S2V: "$0", aud10S2L: "за карту", aud10S3V: "1%", aud10S3L: "кэшбэк",
    aud10P1Icon: "🕹️", aud10P1Title: "Steam, Epic и Xbox не принимают местную карту", aud10P1Body: "Хочешь купить игру, DLC или внутриигровую валюту — карта отклонена. Остаётся покупать ключи у перекупов с наценкой 20–30%.",
    aud10P1Sol: "✦ ZeroCard: платишь напрямую в Steam/Epic по курсу без наценок, ещё и кэшбэк получаешь",
    aud10P2Icon: "🪙", aud10P2Title: "Play-to-Earn токены нельзя потратить в реальности", aud10P2Body: "Заработал USDT в Axie, Gods Unchained или другой P2E игре — деньги реальные, но потратить их в кафе или магазине невозможно без сложного вывода.",
    aud10P2Sol: "✦ ZeroCard: игровой заработок → карта за секунды → трать в любом магазине мира",
    aud10P3Icon: "💸", aud10P3Title: "Подписки на гейминг-сервисы съедают деньги", aud10P3Body: "Xbox Game Pass Ultimate, PlayStation Plus, EA Play — $50–150/год на подписки, каждая из которых требует валютную карту. Суммарно теряешь 3–5% на конвертации.",
    aud10P3Sol: "✦ ZeroCard: все гейминг-подписки с одной карты + 1% возвращается — реальная экономия на длинной дистанции",

    // Audience: E-commerce
    aud11Icon: "🛍️", aud11Tag: "📦 E-commerce & Дропшиппинг", aud11Title: "Онлайн-продавцы и дропшипперы",
    aud11Desc: "AliExpress, Amazon, Shopify, поставщики — всё требует международную карту для закупок. Если принимаешь оплату в крипте, ZeroCard замыкает цикл: получил USDT → купил товар → отправил клиенту.",
    aud11S1V: "0%", aud11S1L: "FX Visa", aud11S2V: "1%", aud11S2L: "кэшбэк", aud11S3V: "5%", aud11S3L: "APR",
    aud11P1Icon: "📦", aud11P1Title: "Закупка у поставщиков требует валютную карту", aud11P1Body: "AliExpress, Amazon FBA, Alibaba — закупаешь товар, но местная карта отклонена или берёт 2–3% FX. На $5000 закупок это $100–150 лишних расходов каждый раз.",
    aud11P1Sol: "✦ ZeroCard Visa: 0% FX — закупай у любых международных поставщиков без переплат",
    aud11P2Icon: "🔁", aud11P2Title: "Клиенты платят в крипте — деньги застряли", aud11P2Body: "Принимаешь оплату в USDT — удобно для клиента, но чтобы реинвестировать в закупки или рекламу, нужен долгий путь через биржу и банк.",
    aud11P2Sol: "✦ ZeroCard: оплата в USDT → сразу на карту → закупай товар или крути рекламу в тот же день",
    aud11P3Icon: "📣", aud11P3Title: "Реклама в Meta/Google требует зарубежную карту", aud11P3Body: "Facebook Ads, Google Ads, TikTok Ads — рекламные кабинеты блокируют местные карты. Без работающей карты бизнес стоит.",
    aud11P3Sol: "✦ ZeroCard: привязывай к рекламным кабинетам и получай 1% кэшбэк от каждого потраченного рекламного бюджета",

    // Audience: Expats
    aud12Icon: "🛂", aud12Tag: "✈️ Эмигранты & Переехавшие", aud12Title: "Эмигранты и недавно переехавшие",
    aud12Desc: "Переехал в новую страну? Первые месяцы — nightmare: местный банковский счёт открыть сложно, домашние карты заблокированы, наличные на исходе. ZeroCard работает с первого дня в любой стране.",
    aud12S1V: "200+", aud12S1L: "стран", aud12S2V: "5 мин", aud12S2L: "получить карту", aud12S3V: "0₽", aud12S3L: "сбор",
    aud12P1Icon: "🏦", aud12P1Title: "Местный банк не открывает счёт сразу", aud12P1Body: "В Германии, Португалии, ОАЭ открытие банковского счёта для новых резидентов занимает 2–6 недель. Нужно платить за жильё, еду, транспорт — а карты нет.",
    aud12P1Sol: "✦ ZeroCard: KYC за 10 минут — карта работает в тот же день, пока ждёшь банк",
    aud12P2Icon: "🔄", aud12P2Title: "Переводы от родных приходят в крипте", aud12P2Body: "Родители переводят деньги в USDT — так дешевле и быстрее, чем SWIFT. Но как получить их в виде, которым можно платить в магазине?",
    aud12P2Sol: "✦ ZeroCard: USDT от родных → карта моментально → плати в любом супермаркете нового города",
    aud12P3Icon: "💱", aud12P3Title: "Два счёта в двух странах — постоянная головная боль", aud12P3Body: "Деньги на счёте в старой стране, расходы в новой. Каждый перевод — комиссия, курс, время. Разрываешься между двумя банками.",
    aud12P3Sol: "✦ ZeroCard: один USDT-счёт работает везде без привязки к конкретной стране или банку",

    // Audience: Parents
    aud13Icon: "👨‍👩‍👧", aud13Tag: "❤️ Семьи на расстоянии", aud13Title: "Родители, поддерживающие детей за рубежом",
    aud13Desc: "Ребёнок учится или работает за границей. Переводить деньги через банк — комиссии, курс, 3–5 дней. Крипта быстрее, но ребёнку нужна работающая карта. ZeroCard решает это раз и навсегда.",
    aud13S1V: "⚡", aud13S1L: "мгновенно", aud13S2V: "$0", aud13S2L: "за выпуск", aud13S3V: "5%", aud13S3L: "APR на остаток",
    aud13P1Icon: "🏫", aud13P1Title: "Перевод студенту занимает дни и стоит дорого", aud13P1Body: "SWIFT-перевод сыну в Германию или дочери в США: комиссия $25–50 + конвертация + 3–5 рабочих дней. Это дорого, медленно и нервно для обеих сторон.",
    aud13P1Sol: "✦ ZeroCard: отправь USDT → ребёнок пополняет карту → деньги доступны через минуту, а не дни",
    aud13P2Icon: "😟", aud13P2Title: "Ребёнок застрял без денег в экстренной ситуации", aud13P2Body: "Телефон сломался, кошелёк украли, банк заблокировал счёт — нужны деньги прямо сейчас, а не через три дня после SWIFT-перевода.",
    aud13P2Sol: "✦ ZeroCard: экстренный перевод USDT → карта за минуты → проблема решена в любой точке мира",
    aud13P3Icon: "📈", aud13P3Title: "Отложенные деньги для ребёнка не растут", aud13P3Body: "Держишь запас USDT «на всякий случай» для ребёнка за рубежом. Деньги просто лежат — никакого дохода на ожидании.",
    aud13P3Sol: "✦ ZeroCard: 5% APR начисляется на карточный остаток каждый час — деньги растут, пока ждут нужды",

    // Audience: Arbitrage
    aud14Icon: "⚡", aud14Tag: "🔁 P2P & Крипто-арбитраж", aud14Title: "Арбитражники и P2P-трейдеры",
    aud14Desc: "Зарабатываешь на разнице курсов между биржами или работаешь в P2P? Скорость движения денег — это твоя прибыль. ZeroCard даёт мгновенный доступ к USDT без задержек и банковских ограничений.",
    aud14S1V: "⚡", aud14S1L: "мгновенно", aud14S2V: "5%", aud14S2L: "APR на паузе", aud14S3V: "1%", aud14S3L: "кэшбэк везде",
    aud14P1Icon: "⏱️", aud14P1Title: "Каждая секунда промедления — потерянная прибыль", aud14P1Body: "Арбитражное окно живёт минуты. Пока деньги идут через банковский перевод 1–3 дня, окно закрывается. Скорость движения USDT решает всё.",
    aud14P1Sol: "✦ ZeroCard: пополнение карты из Pionex за секунды — деньги там, где нужны, когда нужны",
    aud14P2Icon: "🏦", aud14P2Title: "Банки блокируют частые P2P-операции", aud14P2Body: "Регулярные переводы между счетами вызывают подозрение у банков. Счёт блокируют, транзакции задерживают — бизнес встаёт.",
    aud14P2Sol: "✦ ZeroCard: движение USDT внутри Pionex не проходит через банк — никаких блокировок, никаких вопросов",
    aud14P3Icon: "💤", aud14P3Title: "USDT «на паузе» между сделками не работает", aud14P3Body: "Между арбитражными окнами держишь USDT в резерве. Это необходимо для скорости, но деньги просто лежат без дохода — иногда часами, иногда днями.",
    aud14P3Sol: "✦ ZeroCard: 5% APR начисляется каждый час — резерв зарабатывает даже в ожидании следующей сделки",

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
    faq1Q: "Что такое ZeroCard?",
    faq1A: "ZeroCard — это виртуальная платёжная карта на базе Pionex, которая позволяет оплачивать международные сервисы, подписки и онлайн-покупки по всему миру.\n\nПроще говоря, ZeroCard — это та же карта, которую вы получаете через Pionex, только в более простом и понятном виде. Карта работает как обычная онлайн-карта, но без типичных банковских ограничений.\n\nОсновные преимущества:\n• Работает с международными сервисами\n• Платежи проходят без отклонений\n• Оформление за ~5 минут\n• Без ежемесячных комиссий\n• До 1% кэшбэка\n\nПосле нажатия кнопки вы будете перенаправлены на официальную платформу Pionex для завершения регистрации и получения карты.",
    faq2Q: "Как пополнить карточный счёт?",
    faq2A: "Перевод USDT с основного счёта Pionex на карточный счёт осуществляется мгновенно прямо в приложении. Минимальная сумма — 1 USDT. Комиссии между счетами Pionex нет.",
    faq3Q: "Как работает 1% кэшбэк?",
    faq3A: "При каждой покупке 1% от суммы транзакции возвращается в USDT на карточный счёт в течение 24 часов. Нет лимитов, нет срока действия, нет исключений. Потратил $500 — получил $5 назад.",
    faq4Q: "Как начисляется 5% APR?",
    faq4A: "5% годовых начисляется на остаток USDT в карточном счёте и компаундируется каждый час. Это значит, что твои деньги зарабатывают проценты непрерывно — даже пока ты спишь.",
    faq5Q: "Карта физическая или виртуальная?",
    faq5A: "Сейчас доступна только виртуальная карта. Её можно добавить в Apple Pay, Google Pay, PayPal и другие кошельки для бесконтактных платежей. Физическую карту Pionex планирует выпустить в будущем — следи за обновлениями.",
    faq6Q: "Visa или Mastercard — что выбрать?",
    faq6A: "Обе карты дают одинаковые бонусы: 1% кэшбэк, 5% APR, ноль годового сбора. Главное отличие: Visa берёт 0% за конвертацию валюты, Mastercard — до 2% в некоторых регионах. Для международных трат лучше Visa.",
    faq7Q: "Что если привязка к Apple Pay не удаётся?",
    faq7A: "Убедись, что на карточном счёте есть средства — некоторые кошельки делают тестовое списание для верификации. Если привязка показывает «обратитесь к эмитенту», заполни форму на support.pionex.com — команда поможет в течение 3 рабочих дней.",
    faq8Q: "Как заморозить карту если потерял телефон?",
    faq8A: "Войди в Pionex с другого устройства → раздел Карта → Заморозить карту. Заморозка мгновенная. Разморозить можно самостоятельно в приложении — нет необходимости обращаться в поддержку.",

    // CTA
    ctaBadge: "Бесплатно · Быстро · Выгодно",
    ctaTitle: "Начни тратить крипту\nпрямо сейчас",
    ctaDesc: "Присоединись к миллионам пользователей Pionex, которые уже получают кэшбэк, зарабатывают проценты и тратят USDT как обычную карту.",
    ctaCTA: "Получить ZeroCard бесплатно →",
    ctaDocs: "Документация",
    ctaDisclaimer: "Требуется KYC Level 2 · Минимум 100 USDT · Виртуальная карта · Visa & Mastercard",

    // Footer
    footerNote: "Независимый партнёрский сайт. Не является официальным ресурсом Pionex. Все ссылки содержат реферальный код партнёра. Условия и сборы могут изменяться — проверяй актуальную информацию на pionex.com. © 2026 ZeroCard.",

    // SEO
    metaTitle: "ZeroCard — Криптокарта Pionex | 1% кэшбэк, 5% APR, Apple Pay | Трать USDT везде",
    metaDesc: "ZeroCard на базе Pionex — виртуальная Visa/Mastercard для USDT. 1% кэшбэк на каждую покупку, 5% годовых на остаток, Apple Pay и Google Pay, 0 годовых сборов. Работает в 200+ странах.",
  },
} as const;

type Translations = { [K in keyof typeof translations.en]: string };

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: "ru",
  setLang: () => {},
  t: translations.ru as unknown as Translations,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("zerocard-lang") as Lang;
      if (saved && (saved === "en" || saved === "ru")) return saved;
      const browserLang = navigator.language.startsWith("ru") ? "ru" : "en";
      return browserLang as Lang;
    }
    return "ru";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("zerocard-lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = translations[lang] as unknown as Translations;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
