import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CATEGORIES = [
  { id: "crypto", ru: "Криптаны", en: "Crypto Users" , de: "Krypto-Holder" },
  { id: "traders", ru: "Трейдеры", en: "Traders" , de: "Trader" },
  { id: "pionex", ru: "Pionex Боты", en: "Pionex Bots" , de: "Pionex-Bots" },
  { id: "ai-users", ru: "ИИ-пользователи", en: "AI Users" , de: "KI-Nutzer" },
  { id: "blocked", ru: "Заблокированные карты", en: "Blocked Cards" , de: "Gesperrte Karten" },
  { id: "nomads", ru: "Digital Nomads", en: "Digital Nomads" , de: "Digital Nomads" },
  { id: "freelancers", ru: "Фрилансеры", en: "Freelancers" , de: "Freelancer" },
  { id: "investors", ru: "Инвесторы", en: "Investors" , de: "Anleger" },
  { id: "creators", ru: "Блогеры & Creatives", en: "Bloggers & Creatives" , de: "Blogger & Kreative" },
  { id: "gamers", ru: "Геймеры", en: "Gamers" , de: "Gamer" },
  { id: "ecommerce", ru: "Интернет-торговля", en: "E-commerce" , de: "E-Commerce" },
  { id: "emigrants", ru: "Эмигранты", en: "Emigrants" , de: "Auswanderer" },
  { id: "parents", ru: "Родители за рубежом", en: "Parents Abroad" , de: "Eltern im Ausland" },
  { id: "arbitrage", ru: "Арбитражники", en: "Arbitrage Traders" , de: "Arbitrageure" },
];

const TOPIC_HINTS: Record<string, { ru: string[]; en: string[] }> = {
  crypto: {
    ru: [
      "Как хранить и тратить USDT в 2026 году",
      "Лучшие криптокарты для опытных крипто-пользователей",
      "Как получать кэшбэк криптой на каждой покупке",
    ],
    en: [
      "How to store and spend USDT in 2026",
      "Best crypto cards for experienced crypto users",
      "How to earn crypto cashback on every purchase",
    ],
  },
  traders: {
    ru: [
      "Как трейдеру тратить прибыль без вывода на банк",
      "Криптокарта для трейдера: зачем и как использовать",
      "Управление ликвидностью: карта вместо банковского счёта",
    ],
    en: [
      "How traders can spend profits without bank withdrawal",
      "Crypto card for traders: why and how to use",
      "Liquidity management: card instead of bank account",
    ],
  },
  pionex: {
    ru: [
      "Как использовать прибыль с Pionex ботов в реальной жизни",
      "ZeroCard + Pionex: идеальная связка для пассивного дохода",
      "Автоматический доход и криптокарта: как это работает",
    ],
    en: [
      "How to use Pionex bot profits in real life",
      "ZeroCard + Pionex: perfect combo for passive income",
      "Automated income and crypto card: how it works",
    ],
  },
  "ai-users": {
    ru: [
      "Как оплачивать ChatGPT, Midjourney и другие AI сервисы криптой",
      "Криптокарта для подписок на AI инструменты",
      "Как фрилансер на AI-инструментах получает и тратит крипту",
    ],
    en: [
      "How to pay for ChatGPT, Midjourney and other AI services with crypto",
      "Crypto card for AI tool subscriptions",
      "How an AI freelancer earns and spends crypto",
    ],
  },
  blocked: {
    ru: [
      "Что делать если банк заблокировал карту: крипто-альтернатива",
      "Криптокарта как замена банковской карте в 2026 году",
      "Как жить без банка используя только USDT",
    ],
    en: [
      "What to do if the bank blocked your card: crypto alternative",
      "Crypto card as a bank card replacement in 2026",
      "How to live without a bank using only USDT",
    ],
  },
  nomads: {
    ru: [
      "Криптокарта для цифровых кочевников: платежи в 200+ странах",
      "Как Digital Nomad живёт на крипту в любой точке мира",
      "Лучшие карты для путешественников без привязки к банку",
    ],
    en: [
      "Crypto card for digital nomads: payments in 200+ countries",
      "How a digital nomad lives on crypto anywhere in the world",
      "Best cards for travelers without bank ties",
    ],
  },
  freelancers: {
    ru: [
      "Как фрилансеру получать оплату в крипте и сразу тратить",
      "Криптокарта для удалённой работы: полный гайд",
      "Получил оплату в USDT: как потратить без потерь",
    ],
    en: [
      "How freelancers can receive crypto payments and spend instantly",
      "Crypto card for remote work: complete guide",
      "Got paid in USDT: how to spend without losses",
    ],
  },
  investors: {
    ru: [
      "5% APR на USDT: пассивный доход без риска",
      "Как инвестор использует криптокарту для ежедневных трат",
      "Держи крипту и зарабатывай: стейблкоины на карте",
    ],
    en: [
      "5% APR on USDT: passive income without risk",
      "How investors use crypto cards for daily spending",
      "Hold crypto and earn: stablecoins on a card",
    ],
  },
  creators: {
    ru: [
      "Как блогер монетизирует крипту через карту",
      "Криптокарта для творческих профессий: дизайнеры, фото, видео",
      "Получаю донаты в крипте: как их тратить",
    ],
    en: [
      "How bloggers monetize crypto through a card",
      "Crypto card for creative professionals: designers, photo, video",
      "Receiving crypto donations: how to spend them",
    ],
  },
  gamers: {
    ru: [
      "Криптокарта для геймеров: покупки в Steam, PlayStation, Xbox",
      "Как тратить крипту на игры и внутриигровые покупки",
      "Play-to-earn и криптокарта: замкнутый цикл",
    ],
    en: [
      "Crypto card for gamers: purchases on Steam, PlayStation, Xbox",
      "How to spend crypto on games and in-game purchases",
      "Play-to-earn and crypto card: a closed loop",
    ],
  },
  ecommerce: {
    ru: [
      "Как принимать оплату криптой в интернет-магазине",
      "Криптокарта для дропшипперов и продавцов маркетплейсов",
      "USDT для бизнеса: платежи без банка",
    ],
    en: [
      "How to accept crypto payments in an online store",
      "Crypto card for dropshippers and marketplace sellers",
      "USDT for business: payments without a bank",
    ],
  },
  emigrants: {
    ru: [
      "Криптокарта для эмигранта: деньги без местного банка",
      "Как переводить деньги семье через USDT без комиссий",
      "Переехал за рубеж: как открыть карту без местного банка",
    ],
    en: [
      "Crypto card for emigrants: money without a local bank",
      "How to send money to family via USDT without fees",
      "Moved abroad: how to get a card without a local bank",
    ],
  },
  parents: {
    ru: [
      "Как отправить деньги детям за границу через крипту",
      "Криптокарта для международных переводов семье",
      "USDT вместо Swift: быстро, дёшево, надёжно",
    ],
    en: [
      "How to send money to children abroad via crypto",
      "Crypto card for international family transfers",
      "USDT instead of Swift: fast, cheap, reliable",
    ],
  },
  arbitrage: {
    ru: [
      "Криптокарта для арбитражной торговли: быстрый вывод",
      "Как арбитражник использует ZeroCard для моментальных трат",
      "Скорость и удобство: карта для высокочастотных операций",
    ],
    en: [
      "Crypto card for arbitrage trading: fast withdrawal",
      "How an arbitrage trader uses ZeroCard for instant spending",
      "Speed and convenience: card for high-frequency operations",
    ],
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json().catch(() => ({}));
    const forceLang = body.lang as string | undefined;
    const forceCategory = body.category as string | undefined;
    const hot = body.hot === true || body.hot === "true";
    // "all" mode: generate one HOT article for every supported language in one call
    const allLangs = body.all_langs === true || body.all_langs === "true";

    const LANGS = ["ru", "en", "de", "es", "pt", "it", "fr"] as const;

    if (allLangs) {
      const results: any[] = [];
      for (const l of LANGS) {
        try {
          const r = await fetch(`${supabaseUrl}/functions/v1/generate-blog-post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: req.headers.get("Authorization") || `Bearer ${supabaseKey}`,
              apikey: supabaseKey,
            },
            body: JSON.stringify({ lang: l, hot: true, category: forceCategory }),
          });
          results.push({ lang: l, status: r.status, body: await r.json().catch(() => ({})) });
        } catch (err) {
          results.push({ lang: l, error: String(err) });
        }
      }
      return new Response(JSON.stringify({ success: true, results }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine language: forced or based on day parity
    const today = new Date();
    const dayOfMonth = today.getDate();
    const lang = forceLang || LANGS[dayOfMonth % 3];

    // Pick category: forced or rotate
    let category: typeof CATEGORIES[0];
    if (forceCategory) {
      category = CATEGORIES.find((c) => c.id === forceCategory) || CATEGORIES[0];
    } else {
      // Pick based on day of year to rotate through categories
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
      );
      category = CATEGORIES[dayOfYear % CATEGORIES.length];
    }

    // Get existing titles to avoid repetition
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("title, slug")
      .order("published_at", { ascending: false })
      .limit(50);

    const existingTitles = (existing || []).map((p) => p.title).join("\n- ");
    const existingSlugs = (existing || []).map((p) => p.slug);

    const hintsByLang = TOPIC_HINTS[category.id] as Record<string, string[]> | undefined;
    const hints = hintsByLang?.[lang] || hintsByLang?.en || [];
    const hintText = hints.map((h) => `- ${h}`).join("\n");

    // HOT / trending topic booster - injected into system prompt when hot=true.
    // Trend anchors refreshed from 2026 market data (stablecoin card volumes, Visa/Mastercard
    // stablecoin programs, USDT dominance in card settlement, blocked cards, nomad payments).
    const HOT_ANGLES = [
      "stablecoin cards becoming a mainstream payment standard in 2026",
      "USDT settling the majority of crypto card spending",
      "crypto card volumes growing triple digits year over year",
      "Visa and Mastercard expanding stablecoin card programs across 50+ countries",
      "paying for AI subscriptions (ChatGPT, Claude, Midjourney) with crypto",
      "what to do when a bank card gets blocked abroad",
      "spending Pionex bot profits without touching a bank",
      "earning yield on an idle USDT balance while still spending it",
      "cheap cross-border money transfers with stablecoins instead of SWIFT",
      "travel and digital nomad payments in 200+ countries",
    ];
    const dayIdx = Math.floor(Date.now() / 86400000);
    const hotAngle = HOT_ANGLES[dayIdx % HOT_ANGLES.length];

    const hotBoost = hot
      ? `\n\nHOT TOPIC MODE (hot=true):
- Today is ${today.toISOString().slice(0, 10)}. The topic must feel current for ${today.getFullYear()}.
- Trend anchor for this article: "${hotAngle}". Build the topic around it, adapted to the target audience.
- The title must be catchy and clickable: a number, a sharp question or a concrete promise.
- Write like a top author of a trending crypto newsletter: lively, concrete, with real examples.
- Include 1-2 realistic, current facts or numbers. Never invent precise statistics you cannot support; prefer approximations ("about", "roughly").`
      : "";

    const typographyRules = `
TYPOGRAPHY & STRUCTURE RULES (magazine-quality reading experience):
- Start with a compelling 2-3 sentence introduction paragraph that hooks the reader.
- Use ## for H2 section headings (3-5 sections). Keep headings short and punchy (3-7 words).
- Write paragraphs of 2-4 sentences each. NEVER write walls of text.
- Add an empty line between every paragraph, heading, and list.
- Use bullet lists (-) for features, benefits, comparisons. Keep items to 1-2 lines.
- Use numbered lists (1.) for step-by-step instructions only.
- Use > for one powerful quote or key insight per article.
- Use **bold** sparingly - only for key terms and important numbers.
- Use tables (|) for comparisons when appropriate.
- Vary paragraph length to create visual rhythm: short punchy paragraph, then a medium one, then a list.
- End each section with a transition sentence to the next topic.
- Final paragraph before CTA should be a strong summary.

ANTI-AI-FINGERPRINT RULES (mandatory, applied to title/description/content):
- NEVER use em-dash or en-dash (— –). Use a regular hyphen "-" with spaces, or split into two sentences.
- NEVER use any emoji (no 👍 🚀 ✅ ❌ 🔥 etc.).
- Use straight quotes " " only. NEVER use chevron quotes « » or curly quotes " " " ".
- FORBIDDEN phrases (do not use, in any language): "В современном мире" / "In today's world", "Давайте разберёмся" / "Let's figure out", "Как уже упоминалось ранее" / "As mentioned earlier", "Таким образом, можно сделать вывод" / "Thus, we can conclude", "Итак, подведём итог" / "So, to summarize", "Кроме того" / "Moreover", "Более того" / "Furthermore", "Следовательно" / "Therefore / Consequently". Use casual connectors instead ("ну", "вот", "кстати", "а ещё", "значит", "так что" / "and", "plus", "so", "by the way").
- Avoid perfectly long grammatically polished sentences. Break them into 2-3 short ones. Mix sentence lengths.
- Sprinkle in informal particles occasionally (RU: "вот", "ну", "знаете", "представьте", "кстати"; EN: "honestly", "look", "you know", "imagine", "by the way") - 2-4 times per article, naturally placed.
- Sound like a human writer, not a neural network.

SEO RULES (keyword-agnostic, helpful-content first):
- Pick ONE natural primary topic phrase for the article in the target language (for example "crypto card", "USDT card", "stablecoin payments", "pay for subscriptions with crypto"). NEVER use the phrase "плати по миру" / "pay worldwide" - it is FORBIDDEN.
- Put that phrase in the title, in the description and in the first 100 words, naturally. No keyword stuffing.
- Use it in at least one H2 and 3-5 times total across the article, plus related terms spread naturally.
- Add at least one internal markdown link to /blog or the homepage / with descriptive anchor text.
- Keep it natural and genuinely useful (Google Helpful Content). Never sacrifice clarity for keywords.`;

    // Per-language meta: language name, audience label, CTA line and localized extras.
    const LANG_META: Record<string, { name: string; audience: string; cta: string; extra: string }> = {
      ru: {
        name: "Russian (русский)",
        audience: category.ru,
        cta: "Оформить ZeroCard бесплатно за 5 минут: zerocard.pro",
        extra: 'Обращайся к читателю на "ты". Никаких кавычек-ёлочек, только прямые.',
      },
      en: {
        name: "English",
        audience: category.en,
        cta: "Get your ZeroCard for free in 5 minutes: zerocard.pro",
        extra: "Use simple, direct American English. Avoid corporate filler.",
      },
      de: {
        name: "German (Deutsch)",
        audience: category.de,
        cta: "ZeroCard in 5 Minuten kostenlos holen: zerocard.pro",
        extra:
          'Schreib in der Du-Form. Verbotene Floskeln: "Darüber hinaus", "Des Weiteren", "Zusammenfassend lässt sich sagen", "In der heutigen Zeit". Nimm lockere Anschlüsse: "und", "dazu", "also", "übrigens".',
      },
      es: {
        name: "Spanish (español)",
        audience: category.en,
        cta: "Consigue tu ZeroCard gratis en 5 minutos: zerocard.pro",
        extra: 'Tutea al lector. Evita frases hechas como "En el mundo actual" o "En conclusión".',
      },
      pt: {
        name: "Brazilian Portuguese (português do Brasil)",
        audience: category.en,
        cta: "Peça seu ZeroCard de graça em 5 minutos: zerocard.pro",
        extra: 'Fale de "você". Evite clichês como "Nos dias de hoje" ou "Em conclusão".',
      },
      it: {
        name: "Italian (italiano)",
        audience: category.en,
        cta: "Attiva ZeroCard gratis in 5 minuti: zerocard.pro",
        extra: 'Dai del "tu" al lettore. Evita frasi fatte come "Al giorno d\'oggi" o "In conclusione".',
      },
      fr: {
        name: "French (français)",
        audience: category.en,
        cta: "Obtiens ta ZeroCard gratuitement en 5 minutes : zerocard.pro",
        extra: 'Tutoie le lecteur. Évite les clichés comme "De nos jours" ou "En conclusion".',
      },
    };

    const meta = LANG_META[lang] ?? LANG_META.en;

    const systemPrompt = `You are a professional copywriter for the ZeroCard blog (zerocard.pro). ZeroCard is a Visa crypto card powered by Pionex with 1% cashback and up to 5% APR on the USDT balance.

CRITICAL: write the ENTIRE output (title, description, content) in ${meta.name}. Do not mix languages. Do not translate literally from English - write natively.

Target audience: "${meta.audience}". Tone: lively, expert, never salesy. Mention ZeroCard organically 2-3 times.
At the very end ALWAYS add a CTA paragraph: "${meta.cta}"
Language note: ${meta.extra}
${typographyRules}

RESPONSE FORMAT: strictly JSON, no markdown wrapper:
{
  "title": "Article title in ${meta.name} (short, 5-9 words, catchy)",
  "description": "Brief 1-2 sentence preview description in ${meta.name}",
  "content": "Full article in markdown, written in ${meta.name}. Length 800-1200 words. Follow the typography rules above."
}` + hotBoost;

    const userPrompt = `Write a new article for the "${meta.audience}" category, entirely in ${meta.name}.

Topic examples for inspiration (create your own unique angle, do not copy):
${hintText}

Do NOT repeat these already published titles:
- ${existingTitles || "none"}

Reply with ONLY the JSON object.`;

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, try again later" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credits exhausted" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    let rawContent = aiData.choices?.[0]?.message?.content || "";

    // Strip markdown code fences if present
    rawContent = rawContent.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

    let article: { title: string; description: string; content: string };
    try {
      article = JSON.parse(rawContent);
    } catch {
      console.error("Failed to parse AI response:", rawContent);
      throw new Error("AI returned invalid JSON");
    }

    // Defensive anti-AI-fingerprint cleanup (must match the rules in the system prompt).
    const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F900}-\u{1F9FF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{2190}-\u{21FF}\u{2300}-\u{23FF}\u{2460}-\u{24FF}\u{25A0}-\u{25FF}\u{2B00}-\u{2BFF}]/gu;
    const PHRASE_SUBS: Array<[RegExp, string]> = [
      [/В\s+современном\s+мире,?\s*/gi, ""],
      [/Давайте\s+разбер[её]мся,?\s*/gi, ""],
      [/Как\s+уже\s+упоминалось\s+ранее,?\s*/gi, ""],
      [/Таким\s+образом,\s+можно\s+сделать\s+вывод,?\s*/gi, ""],
      [/Итак,\s+подвед[её]м\s+итог[аи]?,?\s*/gi, ""],
      [/\bКроме\s+того,?\s*/g, "А ещё "],
      [/\bкроме\s+того,?\s*/g, "а ещё "],
      [/\bБолее\s+того,?\s*/g, "И вот ещё: "],
      [/\bболее\s+того,?\s*/g, "и вот ещё: "],
      [/\bСледовательно,?\s*/g, "Значит, "],
      [/\bследовательно,?\s*/g, "значит, "],
      [/\bIn today'?s world,?\s*/gi, ""],
      [/\bLet'?s figure out,?\s*/gi, ""],
      [/\bAs mentioned earlier,?\s*/gi, ""],
      [/\bThus,\s+we\s+can\s+conclude,?\s*/gi, ""],
      [/\bMoreover,?\s*/g, "Plus, "],
      [/\bFurthermore,?\s*/g, "And, "],
      [/\b(Therefore|Consequently),?\s*/g, "So, "],
    ];
    const sanitize = (s: string) => {
      if (!s) return s;
      let t = s.replace(/\s*[—–]\s*/g, " - ");
      t = t.replace(EMOJI_RE, "");
      t = t.replace(/[«»„“”]/g, '"');
      for (const [re, repl] of PHRASE_SUBS) t = t.replace(re, repl);
      t = t.replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n");
      return t.trim();
    };
    article.title = sanitize(article.title);
    article.description = sanitize(article.description);
    article.content = sanitize(article.content);

    // Generate slug from title
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s-]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 80);

    // Make slug unique
    let finalSlug = slug;
    let counter = 1;
    while (existingSlugs.includes(finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // Insert into database
    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert({
        slug: finalSlug,
        title: article.title,
        description: article.description,
        content: article.content,
        lang,
        category: category.id,
        image_url: null,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("DB error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    return new Response(JSON.stringify({ success: true, post }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-blog-post error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
