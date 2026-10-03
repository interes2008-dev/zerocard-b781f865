import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n, type Lang } from "@/lib/i18n";

/* Interactive blocks of the homepage: country check, savings calculator,
   compact benefits and audience cards. Facts match the blog articles
   (Pionex notices, September 2026). */

const signupUrlFor = (lang: string) => `https://www.pionex.com/${lang === "ru" ? "ru" : "en"}/signUp?r=0uHzysLVYQh`;

/* ─────────────────────────── Country data ─────────────────────────── */

// Card payments are declined at merchants registered or operating here (June 2026).
const MERCHANT_BLOCKED = new Set(["RU", "BY", "UA", "IR", "VE", "MM", "AF", "KP"]);
// pionex.com does not verify residents of these countries.
const SIGNUP_BLOCKED = new Set([
  "CA", "GB", "JP", "SG", "CN", "HK", "IR", "KP", "CU", "LB", "LY", "SD", "SS", "SO", "YE", "VE", "AF", "CD", "ZW",
]);
// EU / EEA: after MiCA residents are served by Webot EU, not pionex.com.
const EU_EEA = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT",
  "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO",
]);

const ISO = (
  "AD AE AF AG AL AM AO AR AT AU AZ BA BB BD BE BF BG BH BI BJ BN BO BR BS BT BW BY BZ CA CD CF CG CH CI CL CM CN CO CR " +
  "CU CV CY CZ DE DJ DK DM DO DZ EC EE EG ER ES ET FI FJ FM FR GA GB GD GE GH GM GN GQ GR GT GW GY HK HN HR HT HU ID IE " +
  "IL IN IQ IR IS IT JM JO JP KE KG KH KI KM KN KP KR KW KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MH MK ML MM " +
  "MN MO MR MT MU MV MW MX MY MZ NA NE NG NI NL NO NP NR NZ OM PA PE PG PH PK PL PS PT PW PY QA RO RS RU RW SA SB SC SD " +
  "SE SG SI SK SL SM SN SO SR SS ST SV SY SZ TD TG TH TJ TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VN VU WS YE ZA ZM ZW"
).split(" ");

type Signup = "ok" | "eu" | "us" | "no";
function statusFor(code: string): { signup: Signup; spend: "ok" | "blocked" } {
  const signup: Signup = code === "US" ? "us" : EU_EEA.has(code) ? "eu" : SIGNUP_BLOCKED.has(code) ? "no" : "ok";
  return { signup, spend: MERCHANT_BLOCKED.has(code) ? "blocked" : "ok" };
}

const POPULAR: Record<Lang, string[]> = {
  ru: ["GE", "AM", "KZ", "TR", "AE", "TH", "RS", "RU"],
  en: ["US", "GB", "IN", "NG", "PH", "AE", "TR", "BR"],
  de: ["DE", "AT", "CH", "TR", "TH", "AE"],
  es: ["ES", "MX", "AR", "CO", "CL", "PE", "VE"],
  pt: ["BR", "PT", "AO", "AR", "US"],
  it: ["IT", "CH", "ES", "TR", "TH", "AE"],
  fr: ["FR", "BE", "CH", "CA", "SN", "CI", "MA"],
};

// Which article explains the details, per language.
function guideFor(lang: Lang, code: string, s: ReturnType<typeof statusFor>): string {
  const eu = s.signup === "eu";
  switch (lang) {
    case "ru": return code === "RU" ? "/blog/pionex-card-v-rossii" : "/blog/pionex-card-strany";
    case "en": return s.signup === "ok" && s.spend === "ok" ? "/en/blog/pionex-card-review" : "/en/blog/who-can-use-pionex-2026";
    case "de": return eu ? "/de/blog/pionex-deutschland-mica" : "/en/blog/who-can-use-pionex-2026";
    case "es": return eu ? "/es/blog/pionex-espana-mica" : "/es/blog/tarjeta-pionex-latinoamerica";
    case "pt": return "/pt/blog/cartao-pionex-brasil";
    case "it": return eu ? "/it/blog/pionex-italia-mica" : "/en/blog/who-can-use-pionex-2026";
    case "fr": return eu ? "/fr/blog/pionex-france-2026" : "/fr/blog/carte-pionex-afrique-suisse";
  }
}

/* ─────────────────────────── Copy ─────────────────────────── */

type ToolsCopy = {
  ccBadge: string; ccTitle: string; ccDesc: string; ccPick: string; ccPopular: string;
  ccSignup: string; ccSpend: string;
  sOk: string; sEu: string; sUs: string; sNo: string;
  pOk: string; pBlocked: string;
  noteUA: string; noteCN: string; noteRU: string;
  ccMore: string; ccCta: string; ccSource: string;

  calcBadge: string; calcTitle: string; calcDesc: string;
  spend: string; perMonth: string; currency: string; curUsd: string; curLocal: string; card: string;
  balance: string; perYear: string; rCash: string; rFx: string; rInt: string; total: string;
  calcNote: string; calcCta: string; visaWins: string; mcLoses: string;

  benBadge: string; benTitle: string;
  ben: { big?: string; title: string; text: string }[];

  audBadge: string; audTitle: string;
  aud: { icon: string; title: string; text: string; link?: string; linkLabel?: string }[];
};

const COPY: Record<Lang, ToolsCopy> = {
  ru: {
    ccBadge: "Проверка страны", ccTitle: "Работает ли карта в вашей стране",
    ccDesc: "У Pionex два разных списка ограничений: откуда нельзя зарегистрироваться и где не проходят покупки. Выберите страну, и вы увидите оба ответа.",
    ccPick: "Выберите страну", ccPopular: "Часто ищут",
    ccSignup: "Регистрация", ccSpend: "Покупки у местных продавцов",
    sOk: "Можно зарегистрироваться на pionex.com и оформить карту",
    sEu: "Для жителей ЕС pionex.com закрыт после MiCA, работает Webot EU. Есть ли там карта, мы подтвердить не смогли",
    sUs: "pionex.com жителей США не принимает, для них есть Webot (бывший Pionex.US)",
    sNo: "Pionex не верифицирует жителей этой страны, оформить карту не получится",
    pOk: "Карта принимается, Pionex эту страну не блокирует",
    pBlocked: "Pionex отклоняет оплату у продавцов из этой страны. Покупки за рубежом и в зарубежных онлайн-сервисах проходят",
    noteUA: "Отдельно закрыта регистрация из Крыма, Донецка и Луганска.",
    noteCN: "Туристам: в Китае Alipay и WeChat Pay работают только с Visa.",
    noteRU: "Зарегистрироваться из России можно, карта пригодится в поездках и для зарубежных сервисов.",
    ccMore: "Подробный разбор", ccCta: "Оформить карту", ccSource: "Списки Pionex на сентябрь 2026 года. Они меняются без объявления, перед поездкой сверьтесь с приложением.",

    calcBadge: "Калькулятор", calcTitle: "Сколько вы получите за год",
    calcDesc: "Двигайте ползунки: расчёт учитывает кэшбэк, комиссию с покупок и проценты на остаток.",
    spend: "Траты картой", perMonth: "в месяц", currency: "Валюта покупок", curUsd: "Доллары", curLocal: "Местная валюта",
    card: "Карта", balance: "Держите на карте", perYear: "за год",
    rCash: "Кэшбэк до 1%", rFx: "Комиссия с покупок", rInt: "Проценты на остаток, 5% годовых", total: "Итого за год",
    calcNote: "Расчёт по данным Pionex на сентябрь 2026. Часть категорий без кэшбэка. В материалах Pionex цифры по Mastercard расходятся, берём худший вариант: комиссия 3,5%, кэшбэк 0,1%. Pionex может менять условия, проверяйте в приложении.",
    calcCta: "Оформить карту", visaWins: "У Visa комиссия 1% с покупки, кэшбэк до 1% её примерно перекрывает.", mcLoses: "У Mastercard комиссия до 3,5%, и кэшбэк её не покрывает. Если есть выбор, Visa выгоднее.",

    benBadge: "Коротко о карте", benTitle: "Что вы получаете",
    ben: [
      { big: "1%", title: "Кэшбэк в USDT", text: "Приходит на карточный счёт в течение суток после покупки. Часть категорий Pionex из кэшбэка исключает, список есть в приложении." },
      { big: "5%", title: "Годовых на остаток", text: "Деньги на карте приносят проценты, начисление каждый час. Ставку устанавливает Pionex." },
      { title: "Apple Pay и Google Pay", text: "Visa добавляется в Apple Pay из приложения Pionex одним нажатием. Mastercard и Google Pay привязываются по реквизитам вручную." },
      { big: "$0", title: "За выпуск и обслуживание", text: "За саму карту платить не нужно. С каждой покупки Visa берёт 1%, кэшбэк до 1% это примерно перекрывает. У Mastercard комиссия до 3,5%." },
    ],

    audBadge: "Для кого", audTitle: "Кому карта реально пригодится",
    aud: [
      { icon: "✈️", title: "Живёте или ездите за границу", text: "Платите телефоном в кафе и магазинах, баланс хранится в USDT. В Китае Visa работает через Alipay и WeChat Pay.", link: "/blog/pionex-card-strany", linkLabel: "Где работает карта" },
      { icon: "🤖", title: "Платите за AI и зарубежные сервисы", text: "ChatGPT, Claude, Cursor и другие подписки оплачиваются картой как обычной Visa. Сейчас у Pionex идёт акция с возвратом подписки.", link: "/blog/oplata-ai-podpisok-kartoj-pionex", linkLabel: "Про оплату AI" },
      { icon: "💼", title: "Получаете оплату в USDT", text: "Фрилансеру не нужно продавать крипту через обменник, чтобы оплатить счёт: деньги тратятся прямо с баланса.", link: "/blog/pionex-card-visa-ili-mastercard", linkLabel: "Сколько стоят покупки" },
      { icon: "📈", title: "Торгуете ботами на Pionex", text: "Прибыль бота переводится на карточный счёт за минуту, без вывода через биржи и банки.", link: "/blog/kak-tratit-pribyl-s-bota-pionex", linkLabel: "Как тратить прибыль" },
    ],
  },
  en: {
    ccBadge: "Country check", ccTitle: "Does the card work in your country?",
    ccDesc: "Pionex keeps two separate lists: where you can't sign up and where card payments get declined. Pick a country to see both answers.",
    ccPick: "Choose a country", ccPopular: "Popular",
    ccSignup: "Sign-up", ccSpend: "Paying local merchants",
    sOk: "You can sign up on pionex.com and order the card",
    sEu: "EU residents can't use pionex.com since MiCA, the EU platform is Webot EU. We couldn't confirm whether it offers the card",
    sUs: "pionex.com doesn't accept US residents. Their platform is Webot (formerly Pionex.US)",
    sNo: "Pionex doesn't verify residents of this country, so you can't get the card",
    pOk: "The card is accepted, Pionex doesn't block this country",
    pBlocked: "Pionex declines payments at merchants from this country. Purchases abroad and with foreign online services still go through",
    noteUA: "Sign-up from Crimea, Donetsk and Luhansk is also closed.",
    noteCN: "For travellers: in China, Alipay and WeChat Pay only work with Visa.",
    noteRU: "Russian residents can still sign up and use the card abroad and for foreign online services.",
    ccMore: "Full breakdown", ccCta: "Get the card", ccSource: "Pionex lists as of September 2026. They change without notice, so check the app before you travel.",

    calcBadge: "Calculator", calcTitle: "What you'd get in a year",
    calcDesc: "Move the sliders. The estimate counts cashback, the fee on purchases and interest on your balance.",
    spend: "Card spending", perMonth: "a month", currency: "Purchase currency", curUsd: "US dollars", curLocal: "Local currency",
    card: "Card", balance: "Kept on the card", perYear: "a year",
    rCash: "Cashback up to 1%", rFx: "Fee on purchases", rInt: "Interest on balance, 5% APR", total: "Total for the year",
    calcNote: "Based on Pionex data as of September 2026. Some categories earn no cashback. Pionex materials disagree on Mastercard, so we use the worst case: 3.5% fee, 0.1% cashback. Pionex can change terms, check the app.",
    calcCta: "Get the card", visaWins: "Visa charges 1% per purchase, and cashback of up to 1% roughly offsets it.", mcLoses: "Mastercard charges up to 3.5% and the cashback doesn't cover it. If you can choose, Visa costs less.",

    benBadge: "The card in short", benTitle: "What you get",
    ben: [
      { big: "1%", title: "Cashback in USDT", text: "Lands on the card account within a day of the purchase. Pionex excludes some categories, the list is in the app." },
      { big: "5%", title: "APR on your balance", text: "Money on the card earns interest, paid every hour. Pionex sets the rate." },
      { title: "Apple Pay and Google Pay", text: "Visa goes into Apple Pay with one tap from the Pionex app. Mastercard and Google Pay are added manually with the card details." },
      { big: "$0", title: "To issue and keep", text: "The card itself is free. Visa takes 1% on each purchase and the cashback of up to 1% roughly offsets it. Mastercard charges up to 3.5%." },
    ],

    audBadge: "Who it's for", audTitle: "Who actually gets value from it",
    aud: [
      { icon: "✈️", title: "You live or travel abroad", text: "Tap your phone in cafés and shops while your balance stays in USDT. In China, Visa works through Alipay and WeChat Pay.", link: "/en/blog/who-can-use-pionex-2026", linkLabel: "Who can sign up" },
      { icon: "🤖", title: "You pay for AI tools", text: "ChatGPT, Claude, Cursor and other subscriptions take the card like any Visa. Pionex is running a subscription refund promo right now.", link: "/en/blog/pay-ai-subscriptions-pionex-card", linkLabel: "Paying for AI" },
      { icon: "💼", title: "You get paid in USDT", text: "Freelancers don't need an exchanger to pay a bill: the money is spent straight from the balance.", link: "/en/blog/pionex-card-review", linkLabel: "Real fees and limits" },
      { icon: "📈", title: "You trade with Pionex bots", text: "Bot profits move to the card account in a minute, with no withdrawal through banks or other exchanges.", link: "/en/blog/pionex-grid-bot-guide", linkLabel: "Grid bot guide" },
    ],
  },
  de: {
    ccBadge: "Länder-Check", ccTitle: "Funktioniert die Karte in deinem Land?",
    ccDesc: "Pionex führt zwei getrennte Listen: wo man sich nicht anmelden kann und wo Kartenzahlungen abgelehnt werden. Wähl ein Land und du siehst beides.",
    ccPick: "Land wählen", ccPopular: "Häufig gesucht",
    ccSignup: "Anmeldung", ccSpend: "Zahlen bei Händlern vor Ort",
    sOk: "Anmeldung bei pionex.com und Kartenbestellung sind möglich",
    sEu: "Für EU-Bürger ist pionex.com seit MiCA zu, zuständig ist Webot EU. Ob es dort die Karte gibt, konnten wir nicht bestätigen",
    sUs: "pionex.com nimmt keine US-Bürger an. Für sie gibt es Webot (früher Pionex.US)",
    sNo: "Pionex verifiziert Einwohner dieses Landes nicht, eine Karte ist nicht möglich",
    pOk: "Die Karte wird akzeptiert, Pionex sperrt dieses Land nicht",
    pBlocked: "Pionex lehnt Zahlungen bei Händlern aus diesem Land ab. Käufe im Ausland und bei ausländischen Online-Diensten gehen durch",
    noteUA: "Zusätzlich ist die Anmeldung aus der Krim, Donezk und Luhansk gesperrt.",
    noteCN: "Für Reisende: In China funktionieren Alipay und WeChat Pay nur mit Visa.",
    noteRU: "Eine Anmeldung aus Russland ist möglich, die Karte taugt für Reisen und ausländische Dienste.",
    ccMore: "Ausführlich", ccCta: "Karte holen", ccSource: "Listen von Pionex, Stand September 2026. Sie ändern sich ohne Ankündigung, prüf vor der Reise die App.",

    calcBadge: "Rechner", calcTitle: "Was im Jahr übrig bleibt",
    calcDesc: "Schieb die Regler. Gerechnet werden Cashback, Gebühr auf Käufe und Zinsen aufs Guthaben.",
    spend: "Kartenausgaben", perMonth: "pro Monat", currency: "Währung der Käufe", curUsd: "US-Dollar", curLocal: "Landeswährung",
    card: "Karte", balance: "Guthaben auf der Karte", perYear: "pro Jahr",
    rCash: "Cashback bis 1%", rFx: "Gebühr auf Käufe", rInt: "Zinsen aufs Guthaben, 5% p. a.", total: "Summe im Jahr",
    calcNote: "Stand der Pionex-Angaben: September 2026. Manche Kategorien bekommen kein Cashback. Zu Mastercard widersprechen sich die Pionex-Texte, wir rechnen mit dem schlechtesten Fall: 3,5% Gebühr, 0,1% Cashback. Pionex kann die Bedingungen ändern, prüf die App.",
    calcCta: "Karte holen", visaWins: "Visa nimmt 1% pro Kauf, das Cashback von bis zu 1% gleicht das ungefähr aus.", mcLoses: "Mastercard nimmt bis zu 3,5%, das Cashback deckt das nicht. Wenn du wählen kannst, ist Visa günstiger.",

    benBadge: "Die Karte kurz", benTitle: "Was du bekommst",
    ben: [
      { big: "1%", title: "Cashback in USDT", text: "Kommt innerhalb eines Tages aufs Kartenkonto. Einige Kategorien nimmt Pionex aus, die Liste steht in der App." },
      { big: "5%", title: "Zinsen aufs Guthaben", text: "Geld auf der Karte bringt Zinsen, gutgeschrieben jede Stunde. Den Satz legt Pionex fest." },
      { title: "Apple Pay und Google Pay", text: "Visa landet mit einem Tipp aus der Pionex-App in Apple Pay. Mastercard und Google Pay trägst du manuell ein." },
      { big: "$0", title: "Für Ausgabe und Führung", text: "Die Karte selbst kostet nichts. Visa nimmt 1% pro Kauf, das Cashback von bis zu 1% gleicht es ungefähr aus. Mastercard kostet bis zu 3,5%." },
    ],

    audBadge: "Für wen", audTitle: "Wem die Karte wirklich nützt",
    aud: [
      { icon: "✈️", title: "Du lebst oder reist im Ausland", text: "Mit dem Handy in Café und Laden zahlen, das Guthaben bleibt in USDT. In China läuft Visa über Alipay und WeChat Pay.", link: "/en/blog/who-can-use-pionex-2026", linkLabel: "Wer sich anmelden kann" },
      { icon: "🤖", title: "Du zahlst KI-Abos", text: "ChatGPT, Claude, Cursor und Co. nehmen die Karte wie jede Visa. Pionex erstattet gerade bei einer Aktion Abo-Zahlungen.", link: "/en/blog/pay-ai-subscriptions-pionex-card", linkLabel: "KI-Abos bezahlen" },
      { icon: "💼", title: "Du wirst in USDT bezahlt", text: "Als Freelancer brauchst du keinen Wechsler, um eine Rechnung zu zahlen: Das Geld geht direkt vom Guthaben.", link: "/de/blog/krypto-steuer-haltefrist-2026", linkLabel: "Steuern auf USDT" },
      { icon: "📈", title: "Du handelst mit Pionex-Bots", text: "Bot-Gewinne liegen in einer Minute auf dem Kartenkonto, ohne Umweg über Bank oder andere Börse.", link: "/de/blog/grid-bot-einrichten", linkLabel: "Grid-Bot einrichten" },
    ],
  },
  es: {
    ccBadge: "Consulta por país", ccTitle: "¿Funciona la tarjeta en tu país?",
    ccDesc: "Pionex tiene dos listas distintas: desde dónde no te puedes registrar y dónde se rechazan los pagos. Elige un país y verás las dos respuestas.",
    ccPick: "Elige un país", ccPopular: "Más buscados",
    ccSignup: "Registro", ccSpend: "Pagos en comercios locales",
    sOk: "Puedes registrarte en pionex.com y pedir la tarjeta",
    sEu: "Desde MiCA, pionex.com está cerrado para residentes en la UE y el servicio es Webot EU. No pudimos confirmar si allí hay tarjeta",
    sUs: "pionex.com no acepta residentes en EE.UU. Su plataforma es Webot (antes Pionex.US)",
    sNo: "Pionex no verifica a residentes de este país, así que no podrás tener la tarjeta",
    pOk: "La tarjeta se acepta, Pionex no bloquea este país",
    pBlocked: "Pionex rechaza pagos en comercios de este país. Las compras en el extranjero y en servicios online extranjeros sí pasan",
    noteUA: "El registro desde Crimea, Donetsk y Luhansk también está cerrado.",
    noteCN: "Si viajas: en China, Alipay y WeChat Pay solo funcionan con Visa.",
    noteRU: "Desde Rusia sí te puedes registrar y usar la tarjeta en viajes y servicios extranjeros.",
    ccMore: "Análisis completo", ccCta: "Pedir la tarjeta", ccSource: "Listas de Pionex a septiembre de 2026. Cambian sin aviso, revisa la app antes de viajar.",

    calcBadge: "Calculadora", calcTitle: "Cuánto sacas en un año",
    calcDesc: "Mueve los controles. El cálculo incluye el reembolso, la comisión por compra y los intereses del saldo.",
    spend: "Gasto con tarjeta", perMonth: "al mes", currency: "Moneda de las compras", curUsd: "Dólares", curLocal: "Moneda local",
    card: "Tarjeta", balance: "Saldo en la tarjeta", perYear: "al año",
    rCash: "Reembolso hasta 1%", rFx: "Comisión por compras", rInt: "Intereses del saldo, 5% anual", total: "Total del año",
    calcNote: "Datos de Pionex a septiembre de 2026. Algunas categorías no dan reembolso. Los textos de Pionex no coinciden sobre Mastercard, así que tomamos el peor caso: 3,5% de comisión y 0,1% de reembolso. Pionex puede cambiar las condiciones, revisa la app.",
    calcCta: "Pedir la tarjeta", visaWins: "Visa cobra un 1% por compra y el reembolso de hasta 1% lo compensa más o menos.", mcLoses: "Mastercard cobra hasta un 3,5% y el reembolso no lo cubre. Si puedes elegir, Visa sale más barata.",

    benBadge: "La tarjeta en breve", benTitle: "Qué obtienes",
    ben: [
      { big: "1%", title: "Reembolso en USDT", text: "Llega a la cuenta de la tarjeta en un día. Pionex excluye algunas categorías, la lista está en la app." },
      { big: "5%", title: "Anual sobre el saldo", text: "El dinero en la tarjeta genera intereses, que se abonan cada hora. La tasa la fija Pionex." },
      { title: "Apple Pay y Google Pay", text: "La Visa se añade a Apple Pay con un toque desde la app de Pionex. Mastercard y Google Pay se vinculan a mano con los datos de la tarjeta." },
      { big: "$0", title: "Por emisión y mantenimiento", text: "La tarjeta no cuesta nada. Visa cobra un 1% por compra y el reembolso de hasta 1% lo compensa más o menos. Mastercard cobra hasta un 3,5%." },
    ],

    audBadge: "Para quién", audTitle: "A quién le sirve de verdad",
    aud: [
      { icon: "✈️", title: "Vives o viajas fuera", text: "Pagas con el móvil en cafés y tiendas y el saldo sigue en USDT. En China la Visa funciona con Alipay y WeChat Pay.", link: "/es/blog/tarjeta-pionex-latinoamerica", linkLabel: "Cuánto cuesta pagar" },
      { icon: "🤖", title: "Pagas herramientas de IA", text: "ChatGPT, Claude, Cursor y otras suscripciones aceptan la tarjeta como cualquier Visa. Ahora Pionex tiene una promo que devuelve la suscripción.", link: "/en/blog/pay-ai-subscriptions-pionex-card", linkLabel: "Pagar la IA" },
      { icon: "💼", title: "Cobras en USDT", text: "Si eres freelancer no necesitas un exchanger para pagar una factura: el dinero sale directo del saldo.", link: "/es/blog/tarjeta-pionex-latinoamerica", linkLabel: "Comisiones reales" },
      { icon: "📈", title: "Operas con bots de Pionex", text: "Las ganancias del bot pasan a la cuenta de la tarjeta en un minuto, sin retirar por bancos ni otros exchanges.", link: "/es/blog/bot-grid-pionex", linkLabel: "Guía del bot grid" },
    ],
  },
  pt: {
    ccBadge: "Consulta por país", ccTitle: "O cartão funciona no seu país?",
    ccDesc: "A Pionex tem duas listas diferentes: de onde não dá para se cadastrar e onde os pagamentos são recusados. Escolha um país e veja as duas respostas.",
    ccPick: "Escolha um país", ccPopular: "Mais buscados",
    ccSignup: "Cadastro", ccSpend: "Compras em lojas locais",
    sOk: "Dá para se cadastrar na pionex.com e pedir o cartão",
    sEu: "Desde a MiCA a pionex.com está fechada para residentes na UE, que usam a Webot EU. Não conseguimos confirmar se lá existe o cartão",
    sUs: "A pionex.com não aceita residentes nos EUA. A plataforma deles é a Webot (antiga Pionex.US)",
    sNo: "A Pionex não verifica residentes deste país, então não dá para ter o cartão",
    pOk: "O cartão é aceito, a Pionex não bloqueia este país",
    pBlocked: "A Pionex recusa pagamentos em lojas deste país. Compras no exterior e em serviços online estrangeiros passam normalmente",
    noteUA: "O cadastro a partir da Crimeia, Donetsk e Luhansk também está fechado.",
    noteCN: "Para quem viaja: na China, Alipay e WeChat Pay só funcionam com Visa.",
    noteRU: "Da Rússia dá para se cadastrar e usar o cartão em viagens e serviços estrangeiros.",
    ccMore: "Análise completa", ccCta: "Pedir o cartão", ccSource: "Listas da Pionex em setembro de 2026. Mudam sem aviso, confira no app antes de viajar.",

    calcBadge: "Calculadora", calcTitle: "Quanto sobra em um ano",
    calcDesc: "Mexa nos controles. A conta inclui o cashback, a taxa sobre as compras e os juros sobre o saldo.",
    spend: "Gastos no cartão", perMonth: "por mês", currency: "Moeda das compras", curUsd: "Dólares", curLocal: "Moeda local",
    card: "Cartão", balance: "Saldo no cartão", perYear: "por ano",
    rCash: "Cashback até 1%", rFx: "Taxa sobre as compras", rInt: "Juros sobre o saldo, 5% ao ano", total: "Total no ano",
    calcNote: "Dados da Pionex de setembro de 2026. Algumas categorias não dão cashback. Os textos da Pionex não batem sobre o Mastercard, então usamos o pior caso: taxa de 3,5% e cashback de 0,1%. A Pionex pode mudar as condições, confira no app.",
    calcCta: "Pedir o cartão", visaWins: "O Visa cobra 1% por compra, e o cashback de até 1% compensa mais ou menos.", mcLoses: "O Mastercard cobra até 3,5% e o cashback não cobre. Se puder escolher, o Visa sai mais barato.",

    benBadge: "O cartão em resumo", benTitle: "O que você ganha",
    ben: [
      { big: "1%", title: "Cashback em USDT", text: "Cai na conta do cartão em até um dia. A Pionex exclui algumas categorias, a lista está no app." },
      { big: "5%", title: "Ao ano sobre o saldo", text: "O dinheiro no cartão rende juros, creditados a cada hora. A taxa é definida pela Pionex." },
      { title: "Apple Pay e Google Pay", text: "O Visa entra no Apple Pay com um toque pelo app da Pionex. Mastercard e Google Pay são cadastrados à mão com os dados do cartão." },
      { big: "$0", title: "De emissão e manutenção", text: "O cartão em si é grátis. O Visa cobra 1% por compra e o cashback de até 1% compensa mais ou menos. O Mastercard cobra até 3,5%." },
    ],

    audBadge: "Para quem", audTitle: "Para quem ele faz diferença",
    aud: [
      { icon: "✈️", title: "Você mora ou viaja para fora", text: "Paga com o celular em cafés e lojas e o saldo fica em USDT. Na China o Visa funciona pelo Alipay e WeChat Pay.", link: "/pt/blog/cartao-pionex-brasil", linkLabel: "Quanto custa pagar" },
      { icon: "🤖", title: "Você paga ferramentas de IA", text: "ChatGPT, Claude, Cursor e outras assinaturas aceitam o cartão como qualquer Visa. A Pionex está com uma promoção que devolve a assinatura.", link: "/en/blog/pay-ai-subscriptions-pionex-card", linkLabel: "Pagar a IA" },
      { icon: "💼", title: "Você recebe em USDT", text: "Freelancer não precisa de casa de câmbio para pagar uma conta: o dinheiro sai direto do saldo.", link: "/pt/blog/stablecoins-banco-central-2026", linkLabel: "Regras do Banco Central" },
      { icon: "📈", title: "Você opera com bots da Pionex", text: "O lucro do bot vai para a conta do cartão em um minuto, sem saque por banco ou outra corretora.", link: "/pt/blog/bot-grid-pionex", linkLabel: "Guia do bot grid" },
    ],
  },
  it: {
    ccBadge: "Verifica paese", ccTitle: "La carta funziona nel tuo paese?",
    ccDesc: "Pionex ha due liste separate: da dove non ci si può registrare e dove i pagamenti vengono rifiutati. Scegli un paese e vedi entrambe le risposte.",
    ccPick: "Scegli un paese", ccPopular: "Più cercati",
    ccSignup: "Registrazione", ccSpend: "Pagamenti nei negozi locali",
    sOk: "Puoi registrarti su pionex.com e richiedere la carta",
    sEu: "Dopo MiCA pionex.com è chiuso ai residenti UE, che usano Webot EU. Non abbiamo potuto confermare se lì c'è la carta",
    sUs: "pionex.com non accetta residenti negli USA. La loro piattaforma è Webot (ex Pionex.US)",
    sNo: "Pionex non verifica i residenti di questo paese, quindi la carta non è disponibile",
    pOk: "La carta è accettata, Pionex non blocca questo paese",
    pBlocked: "Pionex rifiuta i pagamenti presso esercenti di questo paese. Gli acquisti all'estero e sui servizi online stranieri passano",
    noteUA: "È chiusa anche la registrazione da Crimea, Donetsk e Luhansk.",
    noteCN: "Per chi viaggia: in Cina Alipay e WeChat Pay funzionano solo con Visa.",
    noteRU: "Dalla Russia ci si può registrare e usare la carta in viaggio e sui servizi stranieri.",
    ccMore: "Approfondimento", ccCta: "Richiedi la carta", ccSource: "Liste di Pionex a settembre 2026. Cambiano senza preavviso, controlla l'app prima di partire.",

    calcBadge: "Calcolatore", calcTitle: "Quanto ottieni in un anno",
    calcDesc: "Sposta i cursori. Il calcolo tiene conto di cashback, commissione sugli acquisti e interessi sul saldo.",
    spend: "Spesa con la carta", perMonth: "al mese", currency: "Valuta degli acquisti", curUsd: "Dollari", curLocal: "Valuta locale",
    card: "Carta", balance: "Saldo sulla carta", perYear: "all'anno",
    rCash: "Cashback fino all'1%", rFx: "Commissione sugli acquisti", rInt: "Interessi sul saldo, 5% annuo", total: "Totale dell'anno",
    calcNote: "Dati Pionex a settembre 2026. Alcune categorie non danno cashback. I testi di Pionex non concordano su Mastercard, quindi usiamo il caso peggiore: commissione 3,5% e cashback 0,1%. Pionex può cambiare le condizioni, controlla l'app.",
    calcCta: "Richiedi la carta", visaWins: "Visa prende l'1% su ogni acquisto e il cashback fino all'1% lo compensa più o meno.", mcLoses: "Mastercard prende fino al 3,5% e il cashback non lo copre. Se puoi scegliere, Visa costa meno.",

    benBadge: "La carta in breve", benTitle: "Cosa ottieni",
    ben: [
      { big: "1%", title: "Cashback in USDT", text: "Arriva sul conto della carta entro un giorno. Pionex esclude alcune categorie, la lista è nell'app." },
      { big: "5%", title: "Annuo sul saldo", text: "I soldi sulla carta maturano interessi, accreditati ogni ora. Il tasso lo stabilisce Pionex." },
      { title: "Apple Pay e Google Pay", text: "La Visa entra in Apple Pay con un tocco dall'app Pionex. Mastercard e Google Pay si aggiungono a mano con i dati della carta." },
      { big: "$0", title: "Per emissione e gestione", text: "La carta in sé è gratuita. Visa prende l'1% su ogni acquisto e il cashback fino all'1% lo compensa più o meno. Mastercard costa fino al 3,5%." },
    ],

    audBadge: "Per chi", audTitle: "A chi serve davvero",
    aud: [
      { icon: "✈️", title: "Vivi o viaggi all'estero", text: "Paghi col telefono in bar e negozi e il saldo resta in USDT. In Cina la Visa funziona con Alipay e WeChat Pay.", link: "/en/blog/who-can-use-pionex-2026", linkLabel: "Chi può registrarsi" },
      { icon: "🤖", title: "Paghi strumenti di IA", text: "ChatGPT, Claude, Cursor e altri abbonamenti accettano la carta come qualsiasi Visa. Ora Pionex ha una promo che rimborsa l'abbonamento.", link: "/en/blog/pay-ai-subscriptions-pionex-card", linkLabel: "Pagare l'IA" },
      { icon: "💼", title: "Vieni pagato in USDT", text: "Da freelance non ti serve un exchanger per pagare una bolletta: i soldi escono direttamente dal saldo.", link: "/it/blog/tasse-crypto-2026-carta", linkLabel: "Tasse crypto 2026" },
      { icon: "📈", title: "Fai trading con i bot Pionex", text: "I profitti del bot arrivano sul conto della carta in un minuto, senza passare da banche o altri exchange.", link: "/it/blog/bot-grid-pionex", linkLabel: "Guida al bot grid" },
    ],
  },
  fr: {
    ccBadge: "Vérifier un pays", ccTitle: "La carte fonctionne-t-elle dans votre pays ?",
    ccDesc: "Pionex tient deux listes distinctes : d'où l'on ne peut pas s'inscrire et où les paiements sont refusés. Choisissez un pays pour voir les deux réponses.",
    ccPick: "Choisir un pays", ccPopular: "Souvent cherchés",
    ccSignup: "Inscription", ccSpend: "Paiement chez les commerçants locaux",
    sOk: "Inscription possible sur pionex.com, la carte peut être commandée",
    sEu: "Depuis MiCA, pionex.com est fermé aux résidents de l'UE, qui passent par Webot EU. Nous n'avons pas pu confirmer si la carte y est proposée",
    sUs: "pionex.com n'accepte pas les résidents américains. Leur plateforme est Webot (ex Pionex.US)",
    sNo: "Pionex ne vérifie pas les résidents de ce pays, la carte n'est donc pas accessible",
    pOk: "La carte est acceptée, Pionex ne bloque pas ce pays",
    pBlocked: "Pionex refuse les paiements chez les commerçants de ce pays. Les achats à l'étranger et sur les services en ligne étrangers passent",
    noteUA: "L'inscription depuis la Crimée, Donetsk et Louhansk est aussi fermée.",
    noteCN: "En voyage : en Chine, Alipay et WeChat Pay ne fonctionnent qu'avec Visa.",
    noteRU: "Depuis la Russie, l'inscription reste possible et la carte sert en voyage et pour les services étrangers.",
    ccMore: "Analyse complète", ccCta: "Obtenir la carte", ccSource: "Listes Pionex à septembre 2026. Elles changent sans préavis, vérifiez dans l'app avant de partir.",

    calcBadge: "Calculateur", calcTitle: "Ce que vous gagnez sur un an",
    calcDesc: "Bougez les curseurs. Le calcul tient compte du cashback, des frais sur les achats et des intérêts sur le solde.",
    spend: "Dépenses par carte", perMonth: "par mois", currency: "Devise des achats", curUsd: "Dollars", curLocal: "Devise locale",
    card: "Carte", balance: "Solde gardé sur la carte", perYear: "par an",
    rCash: "Cashback jusqu'à 1 %", rFx: "Frais sur les achats", rInt: "Intérêts sur le solde, 5 % par an", total: "Total sur l'année",
    calcNote: "Données Pionex de septembre 2026. Certaines catégories ne donnent pas de cashback. Les textes de Pionex divergent sur Mastercard, nous prenons le pire cas : 3,5 % de frais et 0,1 % de cashback. Pionex peut changer les conditions, vérifiez dans l'app.",
    calcCta: "Obtenir la carte", visaWins: "Visa prend 1 % par achat, et le cashback jusqu'à 1 % compense à peu près.", mcLoses: "Mastercard prend jusqu'à 3,5 % et le cashback ne couvre pas. Si vous avez le choix, Visa coûte moins cher.",

    benBadge: "La carte en bref", benTitle: "Ce que vous obtenez",
    ben: [
      { big: "1%", title: "Cashback en USDT", text: "Versé sur le compte carte dans la journée. Pionex exclut certaines catégories, la liste est dans l'app." },
      { big: "5%", title: "Par an sur le solde", text: "L'argent sur la carte rapporte des intérêts, versés chaque heure. Le taux est fixé par Pionex." },
      { title: "Apple Pay et Google Pay", text: "La Visa s'ajoute à Apple Pay en un geste depuis l'app Pionex. Mastercard et Google Pay se configurent à la main avec les données de la carte." },
      { big: "$0", title: "D'émission et de gestion", text: "La carte elle-même est gratuite. Visa prend 1 % par achat et le cashback jusqu'à 1 % compense à peu près. Mastercard coûte jusqu'à 3,5 %." },
    ],

    audBadge: "Pour qui", audTitle: "À qui elle sert vraiment",
    aud: [
      { icon: "✈️", title: "Vous vivez ou voyagez à l'étranger", text: "Vous payez avec le téléphone au café et en boutique, le solde reste en USDT. En Chine, la Visa passe par Alipay et WeChat Pay.", link: "/fr/blog/carte-pionex-afrique-suisse", linkLabel: "Le vrai coût d'un paiement" },
      { icon: "🤖", title: "Vous payez des outils d'IA", text: "ChatGPT, Claude, Cursor et d'autres abonnements acceptent la carte comme n'importe quelle Visa. Pionex rembourse en ce moment des abonnements via une promo.", link: "/en/blog/pay-ai-subscriptions-pionex-card", linkLabel: "Payer l'IA" },
      { icon: "💼", title: "Vous êtes payé en USDT", text: "En freelance, pas besoin de passer par un échangeur pour régler une facture : l'argent part directement du solde.", link: "/fr/blog/pionex-france-2026", linkLabel: "Qui peut s'inscrire" },
      { icon: "📈", title: "Vous tradez avec les bots Pionex", text: "Les gains du bot passent sur le compte carte en une minute, sans retrait par une banque ou un autre exchange.", link: "/fr/blog/bot-grid-pionex", linkLabel: "Guide du bot grid" },
    ],
  },
};

export const toolsCopy = (lang: Lang) => COPY[lang] ?? COPY.en;

/* ─────────────────────────── Country check ─────────────────────────── */

const Mark = ({ ok, warn }: { ok: boolean; warn?: boolean }) => (
  <span className={`cc-mark ${ok ? "is-ok" : warn ? "is-warn" : "is-no"}`} aria-hidden>{ok ? "✓" : warn ? "!" : "✕"}</span>
);

export function CountryCheckSection() {
  const { lang } = useI18n();
  const c = toolsCopy(lang);
  const [code, setCode] = useState<string>("");
  // Country names come from the browser's own ICU data, so the list is built
  // after hydration (server and browser name tables can differ slightly).
  const [names, setNames] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    try {
      const dn = new Intl.DisplayNames([lang], { type: "region" });
      const out: Record<string, string> = {};
      for (const k of ISO) {
        const n = dn.of(k);
        if (n && n !== k) out[k] = n;
      }
      setNames(out);
    } catch {
      setNames({});
    }
  }, [lang]);

  const sorted = useMemo(
    () => (names ? Object.entries(names).sort((a, b) => a[1].localeCompare(b[1], lang)) : []),
    [names, lang]
  );
  const s = code ? statusFor(code) : null;
  const signupText = s ? { ok: c.sOk, eu: c.sEu, us: c.sUs, no: c.sNo }[s.signup] : "";
  const note = code === "UA" ? c.noteUA : code === "CN" ? c.noteCN : code === "RU" ? c.noteRU : "";

  return (
    <section id="country" className="tool py-20 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <div className="section-head mb-2">
          <div className="section-badge">{c.ccBadge}</div>
          <h2 className="section-title mb-4">{c.ccTitle}</h2>
          <p className="text-[17px] leading-[1.7]" style={{ color: "var(--text2)" }}>{c.ccDesc}</p>
        </div>

        <div className="cc-box glass-card mt-10">
          <div className="cc-controls">
            <label className="sr-only" htmlFor="cc-select">{c.ccPick}</label>
            <select id="cc-select" className="cc-select" value={code} onChange={(e) => setCode(e.target.value)}>
              <option value="">{c.ccPick}</option>
              {sorted.map(([k, n]) => (
                <option key={k} value={k}>{n}</option>
              ))}
            </select>
            <div className="cc-chips" aria-label={c.ccPopular}>
              <span className="cc-chips__label">{c.ccPopular}:</span>
              {POPULAR[lang].map((k) => (
                <button key={k} type="button" className={`cc-chip ${code === k ? "is-active" : ""}`} onClick={() => setCode(k)}>
                  {names?.[k] ?? k}
                </button>
              ))}
            </div>
          </div>

          {s && (
            <div className="cc-result" aria-live="polite">
              <div className="cc-row">
                <Mark ok={s.signup === "ok"} warn={s.signup === "eu" || s.signup === "us"} />
                <div>
                  <div className="cc-row__label">{c.ccSignup}</div>
                  <div className="cc-row__text">{signupText}</div>
                </div>
              </div>
              <div className="cc-row">
                <Mark ok={s.spend === "ok"} />
                <div>
                  <div className="cc-row__label">{c.ccSpend}</div>
                  <div className="cc-row__text">{s.spend === "ok" ? c.pOk : c.pBlocked}</div>
                </div>
              </div>
              {note && <p className="cc-note">{note}</p>}
              <div className="cc-actions">
                {s.signup === "ok" && (
                  <a href={signupUrlFor(lang)} target="_blank" rel="sponsored noopener" className="h-btn h-btn-primary">
                    <span>{c.ccCta}</span><span className="arr">→</span>
                  </a>
                )}
                <Link to={guideFor(lang, code, s)} className="h-btn h-btn-ghost">{c.ccMore}</Link>
              </div>
            </div>
          )}
          <p className="cc-source">{c.ccSource}</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Calculator ─────────────────────────── */

const fmt = (n: number) => {
  const r = Math.round(n);
  const sign = r > 0 ? "+" : r < 0 ? "−" : "";
  return `${sign}$${Math.abs(r).toLocaleString("en-US")}`;
};

export function CalculatorSection() {
  const { lang } = useI18n();
  const c = toolsCopy(lang);
  const [spend, setSpend] = useState(500);
  const [visa, setVisa] = useState(true);
  const [balance, setBalance] = useState(1000);

  // Pionex, September 2026: Visa 1% on every purchase with up to 1% cashback.
  // Mastercard: Pionex texts disagree, so the worst case (3.5% fee, 0.1% cashback).
  const cash = spend * 12 * (visa ? 0.01 : 0.001);
  const fx = spend * 12 * (visa ? 0.01 : 0.035);
  const interest = balance * 0.05;
  const total = cash - fx + interest;

  return (
    <section id="calc" className="tool py-20 px-5 md:px-10 border-t border-b" style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[1160px] mx-auto">
        <div className="section-head mb-2">
          <div className="section-badge">{c.calcBadge}</div>
          <h2 className="section-title mb-4">{c.calcTitle}</h2>
          <p className="text-[17px] leading-[1.7]" style={{ color: "var(--text2)" }}>{c.calcDesc}</p>
        </div>

        <div className="calc-grid mt-10">
          <div className="glass-card calc-inputs">
            <div className="calc-field">
              <div className="calc-field__head">
                <label htmlFor="calc-spend">{c.spend}</label>
                <b>${spend.toLocaleString("en-US")} <small>{c.perMonth}</small></b>
              </div>
              <input id="calc-spend" type="range" min={50} max={5000} step={50} value={spend} onChange={(e) => setSpend(+e.target.value)} />
            </div>

            <div className="calc-field">
              <div className="calc-field__head"><span>{c.card}</span></div>
              <div className="seg" role="group" aria-label={c.card}>
                <button type="button" className={visa ? "is-on" : ""} aria-pressed={visa} onClick={() => setVisa(true)}>Visa</button>
                <button type="button" className={!visa ? "is-on" : ""} aria-pressed={!visa} onClick={() => setVisa(false)}>Mastercard</button>
              </div>
            </div>

            <div className="calc-field">
              <div className="calc-field__head">
                <label htmlFor="calc-bal">{c.balance}</label>
                <b>${balance.toLocaleString("en-US")}</b>
              </div>
              <input id="calc-bal" type="range" min={0} max={10000} step={100} value={balance} onChange={(e) => setBalance(+e.target.value)} />
            </div>
          </div>

          <div className="glass-card calc-out" aria-live="polite">
            <div className="calc-total">
              <span>{c.total}</span>
              <b className={total >= 0 ? "pos" : "neg"}>{fmt(total)}</b>
            </div>
            <ul className="calc-rows">
              <li><span>{visa ? c.rCash : c.rCash.replace(/1(\s?)%/, (_m, sp) => `${lang === "en" ? "0.1" : "0,1"}${sp}%`)}</span><b className="pos">{fmt(cash)}</b></li>
              <li><span>{c.rFx}</span><b className={fx > 0 ? "neg" : ""}>{fx > 0 ? fmt(-fx) : "$0"}</b></li>
              <li><span>{c.rInt}</span><b className="pos">{fmt(interest)}</b></li>
            </ul>
            <p className="calc-hint">{visa ? c.visaWins : c.mcLoses}</p>
            <a href={signupUrlFor(lang)} target="_blank" rel="sponsored noopener" className="h-btn h-btn-primary calc-cta">
              <span>{c.calcCta}</span><span className="arr">→</span>
            </a>
            <p className="calc-note">{c.calcNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Compact benefits & audience ─────────────────────────── */

export function BenefitsCompact() {
  const { lang } = useI18n();
  const c = toolsCopy(lang);
  return (
    <section id="benefits" className="py-20 px-5 md:px-10 border-t border-b" style={{ background: "var(--bg2)", borderColor: "var(--border-custom)" }}>
      <div className="max-w-[1160px] mx-auto">
        <div className="section-head mb-2">
          <div className="section-badge">{c.benBadge}</div>
          <h2 className="section-title mb-4">{c.benTitle}</h2>
        </div>
        <div className="ben4 mt-10">
          {c.ben.map((b, i) => (
            <div key={i} className={`glass-card glass-card-hover p-7 ${i === 0 ? "benefit-featured" : ""}`}>
              {b.big && <div className="ben4__big">{b.big}</div>}
              <h3 className="text-base font-bold mb-2.5" style={{ letterSpacing: "-0.3px" }}>{b.title}</h3>
              <p className="text-[13.5px] leading-[1.7]" style={{ color: "var(--text2)" }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AudienceCompact() {
  const { lang } = useI18n();
  const c = toolsCopy(lang);
  return (
    <section id="audience" className="py-20 px-5 md:px-10">
      <div className="max-w-[1160px] mx-auto">
        <div className="section-head mb-2">
          <div className="section-badge">{c.audBadge}</div>
          <h2 className="section-title mb-4">{c.audTitle}</h2>
        </div>
        <div className="aud4 mt-10">
          {c.aud.map((a, i) => (
            <div key={i} className="glass-card glass-card-hover p-7 flex flex-col">
              <div className="aud4__icon" aria-hidden>{a.icon}</div>
              <h3 className="text-base font-bold mb-2.5" style={{ letterSpacing: "-0.3px" }}>{a.title}</h3>
              <p className="text-[13.5px] leading-[1.7] mb-4" style={{ color: "var(--text2)" }}>{a.text}</p>
              {a.link && (
                <Link to={a.link} className="aud4__link mt-auto">{a.linkLabel} →</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
