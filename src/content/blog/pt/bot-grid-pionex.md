---
slug: bot-grid-pionex
title: "Bot grid da Pionex: como configurar e quando ele dá prejuízo"
description: "Como o bot grid da Pionex ganha, como escolher a faixa e o número de grids, o peso da taxa de 0,05% nos grids pequenos e quando ele dá prejuízo."
date: 2026-09-27
order: 3
group: grid-bot
sources: grid-bot, fees
updated: 2026-09-27
category: bots
---

Um bot grid não adivinha para onde o mercado vai. Ele monta uma escada de ordens de compra abaixo do preço e de venda acima, e embolsa um lucro pequeno toda vez que o preço vai e volta entre dois degraus. Em mercado lateral funciona bem. Numa tendência forte pode te deixar segurando uma moeda que só cai. Vale entender os dois lados antes de colocar dinheiro.

## Como ele ganha

Você escolhe uma faixa, por exemplo BTC entre 55.000 e 70.000 dólares, e um número de grids. O bot divide a faixa em níveis. Se o preço cai um nível, ele compra. Se volta a subir um nível, ele vende. A diferença, menos as taxas, é o lucro de um grid.

Por ciclo: (preço de venda − preço de compra) × quantidade − taxas das duas operações.

## As configurações que importam

**Limite superior e inferior.** A decisão mais importante. A Pionex sugere olhar suportes e resistências no gráfico e o tamanho das oscilações normais. Um limite muito perto do preço atual é rompido por qualquer movimento e o bot para.

**Número de grids.** Mais grids significa mais operações e menos lucro por operação. Mais operações podem render menos no total, porque cada uma paga taxa.

**Aritmético ou geométrico.** Aritmético divide a faixa em valores iguais em dólar, geométrico em percentuais iguais. Para faixas largas o geométrico costuma fazer mais sentido.

**Stop loss.** Fecha o bot se o preço cair abaixo de um nível. Sem stop, o bot fica com tudo o que comprou na descida.

**Preço de ativação.** O bot espera o preço chegar a um nível antes de começar. Útil se você espera uma correção.

Os parâmetros sugeridos pela IA da Pionex servem para um primeiro teste, mas confira a faixa você mesmo.

## A taxa define o tamanho mínimo do grid

Na Pionex cada operação à vista custa 0,05%. Um ciclo são duas operações, então 0,1% do volume vai em taxas a cada volta.

Exemplo: bot de 1.000 USDT, espaçamento de 0,5%, 200 ciclos de 50 USDT no mês.

- lucro bruto: 200 × 50 × 0,5% = 50 USDT;
- taxas: 200 × 2 × 50 × 0,05% = 10 USDT;
- líquido: 40 USDT.

Com espaçamento de 0,15%, cada ciclo rende 0,075 USDT bruto e paga 0,05 de taxa. O bot parece ocupado e quase não sobra nada. Mantenha o espaçamento várias vezes acima de 0,1%. O número de ciclos é só um exemplo: depende totalmente do mercado.

## Quando ele dá prejuízo

**O preço rompe a faixa para baixo.** O bot comprou em cada nível na queda e não tem mais vendas para executar. Você fica com moedas que continuam perdendo valor.

**O preço rompe a faixa para cima.** O bot vendeu tudo na subida e fica em USDT. Sem prejuízo, mas você perdeu a alta.

**Mercados pouco líquidos.** Em moedas com pouco volume as ordens executam mal, e uma notícia pode pular vários níveis de uma vez.

A armadilha: o "lucro do grid" pode estar positivo enquanto o bot no total está no vermelho, porque o valor das moedas retidas é contado à parte. Olhe o PnL total.

## Onde ele se encaixa

Um par líquido andando de lado num canal visível. BTC/USDT e ETH/USDT combinam mais do que uma memecoin recém-lançada. Para mercados em tendência a Pionex tem outros bots: DCA para montar posição aos poucos, Infinity Grid sem limite superior, bot de rebalanceamento para carteira.

## Para começar

1. Abra conta na Pionex e faça a verificação.
2. Deposite só USDT que você aceita perder por completo.
3. Bots → Grid Trading → BTC/USDT.
4. Use os parâmetros da IA ou defina a faixa pelas últimas semanas do gráfico.
5. Coloque um stop loss.
6. Acompanhe o PnL total por duas semanas.

Quando o bot gerar USDT, dá para gastar direto com o cartão Pionex, sem passar pelo banco. Quanto isso custa em reais está em [Cartão Pionex no Brasil](/pt/blog/cartao-pionex-brasil).

[Abrir conta na Pionex](https://www.pionex.com/en/signUp?r=0uHzysLVYQh)

Operar criptomoedas pode causar perdas. Este artigo explica como uma ferramenta funciona e não é recomendação de investimento.
