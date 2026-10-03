---
slug: xstocks-pionex-acoes-tokenizadas
title: "xStocks na Pionex: ações da Tesla e Nvidia com USDT, e os riscos"
description: "O que são os xStocks da Pionex, quais ações dá para negociar com USDT, taxas, bots e os riscos: descolamento do preço, mercado fechado e direitos limitados."
date: 2026-10-03
order: 1
group: xstocks
sources: xstocks, fees
updated: 2026-10-03
category: bots
keywords: [xstocks pionex, ações tokenizadas, comprar ações com usdt, pionex ações, tesla com usdt]
cover: bot-profit
---

A Pionex passou a listar os xStocks: tokens que acompanham o preço de ações reais como Tesla, Apple e Nvidia. Você compra com USDT, na mesma conta onde rodam seus bots, sem abrir conta em corretora americana. Parece ter ações. Não é bem isso, e a diferença importa.

## O que é um xStock

Um xStock é um token em blockchain que segue o preço de uma ação ou de um ETF. Se a Tesla sobe, o TSLAX deve subir junto. Você fica exposto ao preço, mas não é dono da ação.

Exemplos que a Pionex cita:

- TSLAX, da Tesla
- AAPLX, da Apple
- NVDAX, da Nvidia
- SPYX, do S&P 500
- QQQX, do Nasdaq-100

A lista muda com o tempo, e nem todo token pode ser negociado em toda conta. Há restrições por região.

## Taxas

| | Taxa |
|---|---|
| Spot | 0,1% |
| Futuros, maker | 0,02% |
| Futuros, taker | 0,05%, mais funding |

Repare no spot: 0,1% é o dobro dos 0,05% que a Pionex cobra nos pares de cripto comuns. Num bot grid que opera muito, essa diferença pesa.

## Dá para rodar bots?

Dá. A Pionex permite bots em ações tokenizadas, com um detalhe. A maioria dos xStocks segue o horário do mercado real. Com a bolsa fechada, um bot que tem um token fora do pregão pode pausar por inteiro e não consegue ajustar os outros ativos até a reabertura. Só alguns pares marcados como 7×24 negociam o tempo todo.

Um bot grid em ação tokenizada funciona melhor com papel que anda de lado numa faixa, igual na cripto. Nosso [guia do bot grid](/pt/blog/bot-grid-pionex) explica faixa e número de grades.

## Os riscos que a própria Pionex aponta

**Descolamento do preço.** O token pode se afastar do valor da ação real, principalmente em mercado agitado.

**Mercado fechado.** Fins de semana e feriados trazem pouca liquidez e possíveis saltos na abertura.

**Risco do emissor e da custódia.** O token vale o que vale a empresa que guarda as ações por trás dele.

**Direitos limitados.** A própria Pionex avisa: ter o token não é o mesmo que ter a ação numa corretora.

**Sem transferência.** Não dá para depositar nem sacar xStocks. Para sair, você vende para USDT antes.

## E o imposto?

No Brasil, ganho com ativo no exterior e com cripto entra na declaração. Como o xStock é um token negociado contra USDT, a forma de declarar pode gerar dúvida. Vale conversar com um contador antes de operar valores relevantes. Sobre as regras novas do Banco Central para stablecoins, temos [este texto](/pt/blog/stablecoins-banco-central-2026).

## Para quem faz sentido

Os xStocks servem para quem já guarda dinheiro em USDT na Pionex e quer um pouco de exposição a grandes empresas americanas sem abrir conta em corretora. Como substituto de ter ações de verdade no longo prazo, deixam a desejar: os direitos são limitados e a taxa de spot é o dobro da usual.

Se for testar, comece pequeno, escolha um par 7×24 se pretende usar bot e compare o preço do token com o da ação antes de comprar.

[Abrir conta na Pionex](https://www.pionex.com/en/signUp?r=0uHzysLVYQh)

Com base na apresentação dos xStocks pela Pionex em outubro de 2026. Lista de tokens, taxas e acesso por região mudam, confira no app. Negociar ações tokenizadas pode dar prejuízo; este texto explica o produto e não é recomendação de investimento.
