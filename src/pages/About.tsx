import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useI18n, langHref } from "@/lib/i18n";
import { useHeadMeta } from "@/lib/headMeta";
import { BlogHeader } from "./Blog";

// "About / editorial policy" page. It tells readers, search engines and AI
// assistants who runs the site, where the facts come from and how the
// affiliate link works: the trust signals AI answers look for before citing.

interface AboutCopy {
  title: string;
  desc: string;
  h1: string;
  intro: string;
  sections: { h: string; p: string[] }[];
  blog: string;
  support: string;
}

export const ABOUT: Record<string, AboutCopy> = {
  ru: {
    title: "О проекте ZeroCard: кто мы и как пишем",
    desc: "ZeroCard: независимый гид по карте Pionex и торговым ботам. Откуда берём факты, как работает партнёрская ссылка и чего мы не делаем.",
    h1: "О проекте ZeroCard",
    intro: "ZeroCard (zerocard.pro) это независимый гид по карте Pionex и торговым ботам Pionex. Мы не Pionex и не представляем биржу: мы разбираем её условия для читателей, которым нужно понять, подойдёт ли карта или бот именно им.",
    sections: [
      { h: "Откуда мы берём факты", p: [
        "Комиссии, лимиты, списки стран и условия карты мы берём из первоисточников: справочного центра и блога Pionex, документов регуляторов (ESMA, Центральный банк Ирландии, Банк Бразилии, налоговые органы) и официальных страниц сервисов. В конце каждой статьи есть список источников.",
        "У каждой статьи указаны дата публикации и дата обновления. Условия Pionex меняются, поэтому при изменениях мы обновляем тексты, а итоговые цифры всегда советуем сверять с приложением.",
      ]},
      { h: "Как работает партнёрская ссылка", p: [
        "Ссылки на регистрацию в Pionex на этом сайте содержат наш партнёрский код. Если вы зарегистрируетесь по ней и будете торговать, Pionex выплатит нам часть своей торговой комиссии. Для вас условия не меняются: комиссии и тарифы те же, что при обычной регистрации.",
        "Партнёрские ссылки помечены для поисковиков как рекламные (rel=\"sponsored\").",
      ]},
      { h: "Чего мы не делаем", p: [
        "Не публикуем выдуманные отзывы и личные истории. Не обещаем доход от ботов. Не советуем обходить ограничения стран через VPN. Не выдаём себя за Pionex и не используем его логотип.",
        "Материалы сайта объясняют, как работают инструменты, и не являются финансовой, налоговой или юридической консультацией.",
      ]},
      { h: "Вопросы по аккаунту и карте", p: [
        "Мы не имеем доступа к аккаунтам и не решаем вопросы по платежам. Этим занимается поддержка Pionex.",
      ]},
    ],
    blog: "Читать гайды",
    support: "Поддержка Pionex",
  },
  en: {
    title: "About ZeroCard: who we are and how we write",
    desc: "ZeroCard is an independent guide to the Pionex card and trading bots. Where our facts come from, how the affiliate link works and what we don't do.",
    h1: "About ZeroCard",
    intro: "ZeroCard (zerocard.pro) is an independent guide to the Pionex card and Pionex trading bots. We are not Pionex and don't represent the exchange: we break down its terms for readers who want to know whether the card or a bot fits them.",
    sections: [
      { h: "Where our facts come from", p: [
        "Fees, limits, country lists and card terms come from primary sources: the Pionex help center and blog, regulators' documents (ESMA, the Central Bank of Ireland, Brazil's central bank, tax authorities) and the services' official pages. Every article ends with its sources.",
        "Each article shows when it was published and last updated. Pionex terms change, so we update articles when they do, and we always suggest checking final figures in the app.",
      ]},
      { h: "How the affiliate link works", p: [
        "Pionex sign-up links on this site carry our affiliate code. If you register through one and trade, Pionex pays us part of its own trading fee. Nothing changes for you: fees and terms are the same as with a regular sign-up.",
        "Affiliate links are marked for search engines as sponsored (rel=\"sponsored\").",
      ]},
      { h: "What we don't do", p: [
        "We don't publish invented reviews or personal stories. We don't promise income from bots. We don't advise using a VPN to get around country restrictions. We don't pose as Pionex or use its logo.",
        "Our articles explain how tools work and are not financial, tax or legal advice.",
      ]},
      { h: "Account and card questions", p: [
        "We have no access to accounts and can't resolve payment issues. Pionex support handles those.",
      ]},
    ],
    blog: "Read the guides",
    support: "Pionex support",
  },
  de: {
    title: "Über ZeroCard: wer wir sind und wie wir schreiben",
    desc: "ZeroCard ist ein unabhängiger Ratgeber zur Pionex Card und zu Trading-Bots. Woher unsere Fakten kommen und wie der Partnerlink funktioniert.",
    h1: "Über ZeroCard",
    intro: "ZeroCard (zerocard.pro) ist ein unabhängiger Ratgeber zur Pionex Card und zu den Trading-Bots von Pionex. Wir sind nicht Pionex und vertreten die Börse nicht. Wir erklären ihre Bedingungen für alle, die wissen wollen, ob Karte oder Bot zu ihnen passen.",
    sections: [
      { h: "Woher unsere Fakten kommen", p: [
        "Gebühren, Limits, Länderlisten und Kartenbedingungen stammen aus Primärquellen: Help Center und Blog von Pionex, Dokumente der Aufsicht (ESMA, irische Zentralbank, Steuerbehörden) und offizielle Seiten der Dienste. Jeder Artikel endet mit seinen Quellen.",
        "Jeder Artikel zeigt, wann er veröffentlicht und zuletzt aktualisiert wurde. Die Bedingungen von Pionex ändern sich, deshalb aktualisieren wir die Texte und empfehlen, Endwerte in der App zu prüfen.",
      ]},
      { h: "So funktioniert der Partnerlink", p: [
        "Registrierungslinks zu Pionex auf dieser Seite enthalten unseren Partnercode. Meldest du dich darüber an und handelst, zahlt Pionex uns einen Teil seiner Handelsgebühr. Für dich ändert sich nichts: Gebühren und Bedingungen sind dieselben wie bei einer normalen Anmeldung.",
        "Für Leser in der EU verweisen wir auf Webot EU, die nach MiCA zugelassene Plattform der Pionex-Gruppe. Dieser Link enthält keinen Partnercode.",
      ]},
      { h: "Was wir nicht tun", p: [
        "Wir veröffentlichen keine erfundenen Bewertungen oder Erfahrungsberichte. Wir versprechen keine Bot-Gewinne. Wir raten nicht, Länderbeschränkungen per VPN zu umgehen. Wir geben uns nicht als Pionex aus.",
        "Unsere Artikel erklären Werkzeuge und sind keine Finanz-, Steuer- oder Rechtsberatung.",
      ]},
      { h: "Fragen zu Konto und Karte", p: [
        "Wir haben keinen Zugriff auf Konten und können Zahlungsprobleme nicht lösen. Dafür ist der Pionex-Support zuständig.",
      ]},
    ],
    blog: "Zu den Ratgebern",
    support: "Pionex-Support",
  },
  es: {
    title: "Sobre ZeroCard: quiénes somos y cómo escribimos",
    desc: "ZeroCard es una guía independiente sobre la tarjeta Pionex y sus bots. De dónde salen nuestros datos y cómo funciona el enlace de afiliado.",
    h1: "Sobre ZeroCard",
    intro: "ZeroCard (zerocard.pro) es una guía independiente sobre la tarjeta Pionex y los bots de trading de Pionex. No somos Pionex ni representamos al exchange: explicamos sus condiciones para quien quiere saber si la tarjeta o un bot le sirven.",
    sections: [
      { h: "De dónde salen nuestros datos", p: [
        "Comisiones, límites, listas de países y condiciones de la tarjeta salen de fuentes primarias: el centro de ayuda y el blog de Pionex, documentos de reguladores (ESMA, Banco Central de Irlanda) y páginas oficiales de los servicios. Cada artículo termina con sus fuentes.",
        "Cada artículo muestra cuándo se publicó y cuándo se actualizó. Las condiciones de Pionex cambian; actualizamos los textos y siempre recomendamos confirmar las cifras finales en la app.",
      ]},
      { h: "Cómo funciona el enlace de afiliado", p: [
        "Los enlaces de registro en Pionex de este sitio llevan nuestro código de afiliado. Si te registras con uno y operas, Pionex nos paga una parte de su propia comisión. Para ti no cambia nada: las comisiones y condiciones son las mismas.",
        "Los enlaces de afiliado están marcados para los buscadores como patrocinados (rel=\"sponsored\").",
      ]},
      { h: "Lo que no hacemos", p: [
        "No publicamos opiniones inventadas ni historias personales. No prometemos ganancias con bots. No recomendamos usar VPN para saltar restricciones de países. No nos hacemos pasar por Pionex.",
        "Nuestros artículos explican herramientas y no son asesoramiento financiero, fiscal ni legal.",
      ]},
      { h: "Preguntas sobre la cuenta y la tarjeta", p: [
        "No tenemos acceso a cuentas ni resolvemos problemas de pagos. De eso se ocupa el soporte de Pionex.",
      ]},
    ],
    blog: "Leer las guías",
    support: "Soporte de Pionex",
  },
  pt: {
    title: "Sobre o ZeroCard: quem somos e como escrevemos",
    desc: "O ZeroCard é um guia independente sobre o cartão Pionex e os bots de trading. De onde vêm nossos dados e como funciona o link de afiliado.",
    h1: "Sobre o ZeroCard",
    intro: "O ZeroCard (zerocard.pro) é um guia independente sobre o cartão Pionex e os bots de trading da Pionex. Não somos a Pionex nem representamos a corretora: explicamos as condições dela para quem quer saber se o cartão ou um bot serve para si.",
    sections: [
      { h: "De onde vêm nossos dados", p: [
        "Taxas, limites, listas de países e condições do cartão vêm de fontes primárias: central de ajuda e blog da Pionex, documentos de reguladores (Banco Central do Brasil, ESMA) e páginas oficiais dos serviços. Todo artigo termina com as suas fontes.",
        "Cada artigo mostra quando foi publicado e atualizado. As condições da Pionex mudam; atualizamos os textos e sempre recomendamos conferir os números finais no app.",
      ]},
      { h: "Como funciona o link de afiliado", p: [
        "Os links de cadastro na Pionex deste site levam nosso código de afiliado. Se você se cadastrar por um deles e operar, a Pionex nos paga parte da própria taxa de negociação. Para você nada muda: taxas e condições são as mesmas.",
        "Os links de afiliado são marcados para os buscadores como patrocinados (rel=\"sponsored\").",
      ]},
      { h: "O que não fazemos", p: [
        "Não publicamos avaliações inventadas nem histórias pessoais. Não prometemos lucro com bots. Não recomendamos VPN para contornar restrições de países. Não nos passamos pela Pionex.",
        "Nossos artigos explicam ferramentas e não são orientação financeira, tributária ou jurídica.",
      ]},
      { h: "Dúvidas sobre conta e cartão", p: [
        "Não temos acesso a contas nem resolvemos problemas de pagamento. Isso é com o suporte da Pionex.",
      ]},
    ],
    blog: "Ler os guias",
    support: "Suporte da Pionex",
  },
  it: {
    title: "Chi è ZeroCard: chi siamo e come scriviamo",
    desc: "ZeroCard è una guida indipendente alla carta Pionex e ai bot di trading. Da dove vengono i dati e come funziona il link di affiliazione.",
    h1: "Chi è ZeroCard",
    intro: "ZeroCard (zerocard.pro) è una guida indipendente alla carta Pionex e ai bot di trading di Pionex. Non siamo Pionex e non rappresentiamo l'exchange: spieghiamo le sue condizioni a chi vuole capire se la carta o un bot fanno al caso suo.",
    sections: [
      { h: "Da dove vengono i dati", p: [
        "Commissioni, limiti, elenchi dei paesi e condizioni della carta vengono da fonti primarie: centro assistenza e blog di Pionex, documenti delle autorità (ESMA, Banca Centrale d'Irlanda, fisco) e pagine ufficiali dei servizi. Ogni articolo termina con le sue fonti.",
        "Ogni articolo indica la data di pubblicazione e dell'ultimo aggiornamento. Le condizioni di Pionex cambiano: aggiorniamo i testi e consigliamo sempre di verificare le cifre finali nell'app.",
      ]},
      { h: "Come funziona il link di affiliazione", p: [
        "I link di registrazione a Pionex su questo sito contengono il nostro codice di affiliazione. Se ti registri tramite uno di essi e fai trading, Pionex ci paga una parte della propria commissione. Per te non cambia nulla.",
        "Ai lettori nell'UE indichiamo Webot EU, la piattaforma del gruppo Pionex autorizzata MiCA. Quel link non contiene codici di affiliazione.",
      ]},
      { h: "Cosa non facciamo", p: [
        "Non pubblichiamo recensioni inventate né storie personali. Non promettiamo guadagni dai bot. Non consigliamo VPN per aggirare i limiti dei paesi. Non ci spacciamo per Pionex.",
        "I nostri articoli spiegano strumenti e non sono consulenza finanziaria, fiscale o legale.",
      ]},
      { h: "Domande su conto e carta", p: [
        "Non abbiamo accesso ai conti e non risolviamo problemi di pagamento. Se ne occupa l'assistenza Pionex.",
      ]},
    ],
    blog: "Leggi le guide",
    support: "Assistenza Pionex",
  },
  fr: {
    title: "À propos de ZeroCard : qui nous sommes, comment nous écrivons",
    desc: "ZeroCard est un guide indépendant sur la carte Pionex et les bots de trading. D'où viennent nos données et comment fonctionne le lien affilié.",
    h1: "À propos de ZeroCard",
    intro: "ZeroCard (zerocard.pro) est un guide indépendant sur la carte Pionex et les bots de trading de Pionex. Nous ne sommes pas Pionex et ne représentons pas la plateforme : nous décortiquons ses conditions pour ceux qui veulent savoir si la carte ou un bot leur convient.",
    sections: [
      { h: "D'où viennent nos données", p: [
        "Frais, plafonds, listes de pays et conditions de la carte viennent de sources primaires : centre d'aide et blog de Pionex, documents des régulateurs (ESMA, AMF, Banque centrale d'Irlande) et pages officielles des services. Chaque article se termine par ses sources.",
        "Chaque article indique sa date de publication et de mise à jour. Les conditions de Pionex changent : nous mettons les textes à jour et conseillons toujours de vérifier les chiffres finaux dans l'application.",
      ]},
      { h: "Comment fonctionne le lien affilié", p: [
        "Les liens d'inscription à Pionex sur ce site contiennent notre code affilié. Si vous vous inscrivez par l'un d'eux et tradez, Pionex nous reverse une partie de ses propres frais. Pour vous, rien ne change.",
        "Pour les lecteurs de l'UE, nous renvoyons vers Webot EU, la plateforme du groupe Pionex agréée MiCA, sans code affilié.",
      ]},
      { h: "Ce que nous ne faisons pas", p: [
        "Nous ne publions pas d'avis inventés ni de témoignages. Nous ne promettons pas de gains avec les bots. Nous ne conseillons pas de VPN pour contourner les restrictions. Nous ne nous faisons pas passer pour Pionex.",
        "Nos articles expliquent des outils et ne constituent pas un conseil financier, fiscal ou juridique.",
      ]},
      { h: "Questions sur le compte et la carte", p: [
        "Nous n'avons pas accès aux comptes et ne réglons pas les problèmes de paiement. C'est le rôle du support Pionex.",
      ]},
    ],
    blog: "Lire les guides",
    support: "Support Pionex",
  },
};

export default function About() {
  const { lang } = useI18n();
  const c = ABOUT[lang] ?? ABOUT.en;
  const url = `https://zerocard.pro${langHref(lang, "/about")}`;
  useHeadMeta({ title: c.title, description: c.desc, canonical: url, ogType: "website" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: c.title,
          description: c.desc,
          url,
          inLanguage: lang,
          mainEntity: {
            "@type": "Organization",
            "@id": "https://zerocard.pro/#organization",
            name: "ZeroCard",
            url: "https://zerocard.pro",
            logo: "https://zerocard.pro/favicon.png",
            description: c.intro,
          },
        })}</script>
      </Helmet>
      <BlogHeader />
      <main className="w-full mx-auto pt-12 pb-20" style={{ maxWidth: 720, paddingLeft: "clamp(1.25rem, 5vw, 2.5rem)", paddingRight: "clamp(1.25rem, 5vw, 2.5rem)" }}>
        <h1 className="text-foreground font-bold mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", lineHeight: 1.2 }}>{c.h1}</h1>
        <p className="text-muted-foreground mb-10" style={{ fontSize: "1.05rem", lineHeight: 1.75 }}>{c.intro}</p>
        {c.sections.map((sec) => (
          <section key={sec.h} className="mb-9">
            <h2 className="text-foreground font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem" }}>{sec.h}</h2>
            {sec.p.map((para, i) => (
              <p key={i} className="text-muted-foreground mb-3" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>{para}</p>
            ))}
          </section>
        ))}
        <div className="flex gap-3 flex-wrap mt-10">
          <Link to={langHref(lang, "/blog")} className="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground bg-primary no-underline">{c.blog}</Link>
          <a href="https://support.pionex.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold border border-border text-foreground no-underline">{c.support}</a>
        </div>
      </main>
    </div>
  );
}
