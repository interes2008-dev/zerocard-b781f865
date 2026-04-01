import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CATEGORIES = [
  { id: "crypto", ru: "Криптаны", en: "Crypto Users" },
  { id: "traders", ru: "Трейдеры", en: "Traders" },
  { id: "pionex", ru: "Pionex Боты", en: "Pionex Bots" },
  { id: "ai-users", ru: "ИИ-пользователи", en: "AI Users" },
  { id: "blocked", ru: "Заблокированные карты", en: "Blocked Cards" },
  { id: "nomads", ru: "Digital Nomads", en: "Digital Nomads" },
  { id: "freelancers", ru: "Фрилансеры", en: "Freelancers" },
  { id: "investors", ru: "Инвесторы", en: "Investors" },
  { id: "creators", ru: "Блогеры & Creatives", en: "Bloggers & Creatives" },
  { id: "gamers", ru: "Геймеры", en: "Gamers" },
  { id: "ecommerce", ru: "Интернет-торговля", en: "E-commerce" },
  { id: "emigrants", ru: "Эмигранты", en: "Emigrants" },
  { id: "parents", ru: "Родители за рубежом", en: "Parents Abroad" },
  { id: "arbitrage", ru: "Арбитражники", en: "Arbitrage Traders" },
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
      "Автоматический доход и криптокарта — как это работает",
    ],
    en: [
      "How to use Pionex bot profits in real life",
      "ZeroCard + Pionex: perfect combo for passive income",
      "Automated income and crypto card — how it works",
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
      "Получил оплату в USDT — как потратить без потерь",
    ],
    en: [
      "How freelancers can receive crypto payments and spend instantly",
      "Crypto card for remote work: complete guide",
      "Got paid in USDT — how to spend without losses",
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
      "Получаю донаты в крипте — как их тратить",
    ],
    en: [
      "How bloggers monetize crypto through a card",
      "Crypto card for creative professionals: designers, photo, video",
      "Receiving crypto donations — how to spend them",
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
      "Переехал за рубеж — как открыть карту без местного банка",
    ],
    en: [
      "Crypto card for emigrants: money without a local bank",
      "How to send money to family via USDT without fees",
      "Moved abroad — how to get a card without a local bank",
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

    const body = await req.json();
    const forceLang = body.lang as string | undefined;
    const forceCategory = body.category as string | undefined;

    // Determine language: forced or based on day parity
    const today = new Date();
    const dayOfMonth = today.getDate();
    const lang = forceLang || (dayOfMonth % 2 === 0 ? "ru" : "en");

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

    const hints = TOPIC_HINTS[category.id]?.[lang as "ru" | "en"] || [];
    const hintText = hints.map((h) => `- ${h}`).join("\n");

    const systemPrompt =
      lang === "ru"
        ? `Ты — профессиональный копирайтер для блога ZeroCard (zerocard.pro). ZeroCard — криптокарта Visa на базе Pionex с 1% кэшбэком и 5% APR на остаток USDT.
Пиши статьи для аудитории "${category.ru}". Стиль — живой, экспертный, не рекламный. Упоминай ZeroCard органично 2-3 раза.
В конце статьи ВСЕГДА добавь абзац-CTA: "Оформить ZeroCard бесплатно за 5 минут: zerocard.pro"

ФОРМАТ ОТВЕТА — строго JSON:
{
  "title": "Заголовок статьи",
  "description": "Краткое описание 1-2 предложения для превью",
  "content": "Полный текст статьи в формате markdown. Используй ## для H2 заголовков. Списки через - или 1. Таблицы через |. Длина 800-1200 слов. Структура: введение + 3-4 раздела с H2 + заключение с CTA."
}`
        : `You are a professional copywriter for ZeroCard blog (zerocard.pro). ZeroCard is a Visa crypto card powered by Pionex with 1% cashback and 5% APR on USDT balance.
Write articles for the "${category.en}" audience. Style — engaging, expert, not salesy. Mention ZeroCard organically 2-3 times.
At the end ALWAYS add a CTA paragraph: "Get your ZeroCard for free in 5 minutes: zerocard.pro"

RESPONSE FORMAT — strictly JSON:
{
  "title": "Article title",
  "description": "Brief 1-2 sentence description for preview",
  "content": "Full article text in markdown format. Use ## for H2 headings. Lists with - or 1. Tables with |. Length 800-1200 words. Structure: intro + 3-4 sections with H2 + conclusion with CTA."
}`;

    const userPrompt =
      lang === "ru"
        ? `Напиши новую статью для категории "${category.ru}".
Вот примеры тем (вдохновляйся, но придумай свою уникальную):
${hintText}

НЕ повторяй эти заголовки (уже опубликованы):
- ${existingTitles || "нет"}

Ответь ТОЛЬКО JSON без markdown-обёртки.`
        : `Write a new article for the "${category.en}" category.
Here are topic examples (use as inspiration, but create your own unique topic):
${hintText}

Do NOT repeat these titles (already published):
- ${existingTitles || "none"}

Reply with ONLY JSON without markdown wrapping.`;

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

    // Generate image URL using picsum with a seed based on slug
    const seed = Math.abs(
      finalSlug.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
    );
    const imageUrl = `https://picsum.photos/seed/${seed}/800/400`;

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
        image_url: imageUrl,
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
