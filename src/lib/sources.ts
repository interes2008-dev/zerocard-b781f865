// Primary sources behind the articles. An article lists set names in its
// frontmatter ("sources: card-fees, mica"); the page renders them as a
// "Sources" block and as schema.org `citation`, which is what search engines
// and AI assistants use to judge where a claim comes from.

export interface Source { title: string; url: string }

export const SOURCE_SETS: Record<string, Source[]> = {
  "card-restrictions": [
    { title: "Pionex Help Center: Why is Pionex Card usage restricted in certain regions?", url: "https://support.pionex.com/hc/en-us/articles/53400153103385-Why-is-Pionex-Card-usage-restricted-in-certain-regions" },
    { title: "Pionex: Where Does Pionex Card Work?", url: "https://www.pionex.com/blog/where-does-pionex-card-work/" },
    { title: "Pionex: Pionex Card in Russia, availability and restrictions", url: "https://www.pionex.com/blog/pionex-card-russia/" },
  ],
  "kyc-countries": [
    { title: "Pionex Help Center: unsupported countries for phone numbers and KYC", url: "https://support.pionex.com/hc/en-us/articles/5929910517273-List-of-Unsupported-Countries-Regions-Phone-Numbers-KYC-Verification" },
  ],
  "card-fees": [
    { title: "Pionex: Pionex Card Review, fees, cashback, APR and eligibility", url: "https://www.pionex.com/blog/pionex-card-review/" },
    { title: "Pionex: Is Pionex Card cashback worth it?", url: "https://www.pionex.com/blog/pionex-card-cashback/" },
    { title: "Pionex: Best crypto cards for international spending in 2026 (verified September 2026)", url: "https://www.pionex.com/blog/best-crypto-cards-international-spending/" },
  ],
  redotpay: [
    { title: "Pionex: Pionex Card vs RedotPay (2026)", url: "https://www.pionex.com/blog/pionex-card-vs-redotpay/" },
    { title: "CryptoSlate: RedotPay card review 2026, fees and restricted countries", url: "https://cryptoslate.com/crypto-cards/redotpay-card-review/" },
  ],
  xstocks: [
    { title: "Pionex: xStocks introduction, tokenized stocks and bots", url: "https://www.pionex.com/blog/xstocks/" },
  ],
  "ru-law-282": [
    { title: "vc.ru: закон 282-ФЗ «О цифровых валютах и цифровых правах» вступил в силу 1 сентября 2026", url: "https://vc.ru/crypto/3116215-novyj-zakon-o-kriptovaljute-v-rossii" },
    { title: "Long-Short: закон 282-ФЗ, что меняется для инвестора", url: "https://long-short.ru/article/zakon-o-cifrovyh-valyutah-282-fz-chto-menyaetsya" },
    { title: "Хабр: что можно с криптовалютой в России с 1 сентября 2026", url: "https://habr.com/ru/articles/1077642/" },
  ],
  "grid-bot": [
    { title: "Pionex: Grid bot parameters explained", url: "https://www.pionex.com/blog/grid-bot-parameters/" },
    { title: "Pionex: Grid bot guide, features, setup and risks", url: "https://www.pionex.com/blog/grid-bot/" },
    { title: "Pionex: releasing grid profit and closing a bot", url: "https://www.pionex.com/blog/whats-the-correct-way-to-stop-a-grid-bot-do-you-release-profit-first-before-closing-bot/" },
  ],
  fees: [
    { title: "Coin Bureau: Pionex review, fees and trading bots", url: "https://coinbureau.com/review/pionex-review" },
    { title: "Pionex trading fee page", url: "https://www.pionex.com/en/fees" },
  ],
  affiliate: [
    { title: "Pionex: Affiliate program terms", url: "https://www.pionex.com/blog/pionex-affiliate-program-2/" },
  ],
  reviews: [
    { title: "Trustpilot: Pionex reviews", url: "https://www.trustpilot.com/review/pionex.com" },
    { title: "Finbold: Is Pionex safe?", url: "https://finbold.com/guide/is-pionex-safe/" },
  ],
  mica: [
    { title: "ESMA: Statement on the end of transitional periods under MiCA", url: "https://www.esma.europa.eu/sites/default/files/2026-04/ESMA75-113276571-1679_Statement_on_the_end_of_transitional_periods_under_MiCA.pdf" },
    { title: "Central Bank of Ireland register entry: Pionew Ireland Limited (Webot)", url: "https://vendors.ie/fintech/register/pionew-ireland-limited-c496936" },
    { title: "Webot EU", url: "https://www.webot.com/eu" },
  ],
  "de-tax": [
    { title: "Bitcoinbasis: Krypto-Steuer vor dem Umbruch, fällt die Jahresfrist?", url: "https://bitcoinbasis.de/deutschland-bitcoin-und-krypto-steuer-vor-dem-umbruch-faellt-die-jahresfrist" },
    { title: "Kleinstb: Krypto-Haltefrist und Freigrenze 2026", url: "https://kleinstb.de/blog/krypto-haltefrist-freibetrag/" },
    { title: "Norman Finance: Stablecoin-Steuern 2026", url: "https://norman.finance/de/blog/stablecoin-steuern" },
  ],
  "it-tax": [
    { title: "Waltio: Tassazione criptovalute 2026", url: "https://www.waltio.com/it/tassazione-criptovalute-2026-guida/" },
    { title: "Il Fatto Quotidiano: aliquota al 33%, 26% per stablecoin in euro", url: "https://www.ilfattoquotidiano.it/2025/10/21/criptovalute-aliquota-plusvalenze-stablecoin-euro-notizie/8167823/" },
  ],
  "br-bcb": [
    { title: "Evertec Trends: Central Bank regulates cryptocurrencies, what changes in 2026", url: "https://evertectrends.com/en/central-bank-regulates-cryptocurrencies-what-changes-in-2026/" },
    { title: "Blue Consult: IOF em stablecoin, a conta do USDT em 2026", url: "https://blueconsult.com.br/iof-stablecoin-usdt/" },
  ],
  "ai-services": [
    { title: "OpenAI Help Center: ChatGPT supported countries", url: "https://help.openai.com/en/articles/7947663-chatgpt-supported-countries" },
    { title: "Anthropic: supported countries and regions", url: "https://www.anthropic.com/supported-countries" },
    { title: "Pionex: AI subscription card campaign", url: "https://www.pionex.com/ru/activities/galaxy/paycard-ai-lottery" },
  ],
};

export function resolveSources(list: string | null | undefined): Source[] {
  if (!list) return [];
  const seen = new Set<string>();
  const out: Source[] = [];
  for (const name of list.split(",").map((s) => s.trim()).filter(Boolean)) {
    for (const src of SOURCE_SETS[name] ?? []) {
      if (!seen.has(src.url)) { seen.add(src.url); out.push(src); }
    }
  }
  return out;
}

export const SOURCES_HEADING: Record<string, string> = {
  ru: "Источники", en: "Sources", de: "Quellen", es: "Fuentes", pt: "Fontes", it: "Fonti", fr: "Sources",
};

export const UPDATED_LABEL: Record<string, string> = {
  ru: "Обновлено", en: "Updated", de: "Aktualisiert", es: "Actualizado", pt: "Atualizado", it: "Aggiornato", fr: "Mis à jour",
};
