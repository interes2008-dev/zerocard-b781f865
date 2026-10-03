---
slug: pionex-xstocks-tokenized-stocks
title: "Pionex xStocks: buy Tesla and Nvidia with USDT, and the catch"
description: "What xStocks on Pionex are, which stocks you can trade with USDT, the fees, running grid bots on them and the risks: peg gaps, closed markets, limited rights."
date: 2026-10-03
order: 2
group: xstocks
sources: xstocks, fees
updated: 2026-10-03
category: bots
keywords: [pionex xstocks, tokenized stocks pionex, buy tesla with usdt, pionex stock trading, xstocks risks]
cover: bot-profit
---

Pionex now lists xStocks: tokens that follow the price of real shares like Tesla, Apple and Nvidia. You buy them with USDT, inside the same account where your bots run, with no brokerage account. It sounds like owning stocks. It isn't quite, and the difference matters.

## What an xStock is

An xStock is a token on a blockchain that tracks the price of a share or an ETF. When Tesla goes up, TSLAX should go up by the same amount. You get price exposure, not the share itself.

Examples Pionex lists:

- TSLAX for Tesla
- AAPLX for Apple
- NVDAX for Nvidia
- SPYX for the S&P 500
- QQQX for the Nasdaq-100

The selection rotates, and not every token is tradable in every account. Regional restrictions apply.

## Fees

| | Fee |
|---|---|
| Spot trade | 0.1% |
| Futures, maker | 0.02% |
| Futures, taker | 0.05%, plus funding |

Note the spot fee: 0.1% is double the 0.05% Pionex charges on regular crypto spot pairs. On a grid bot that trades often, that difference adds up.

## Can you run bots on them?

Yes, Pionex lets you run trading bots on tokenized stocks. There's one behaviour to know about. Most xStocks follow the real market's trading hours. When the market is closed, a bot holding a closed-session token can pause as a whole, and it can't adjust its other assets until trading reopens. Only a few pairs Pionex marks as 7×24 trade around the clock.

A grid bot on a stock token works best on a share that moves sideways in a range, same as with crypto. Our [grid bot guide](/en/blog/pionex-grid-bot-guide) covers range and grid settings.

## The risks Pionex itself lists

**Peg gaps.** The token price can drift away from the real share, especially in fast markets.

**Closed markets.** Weekends and holidays mean thin liquidity and possible jumps at the open.

**Issuer and custody risk.** The token is only as good as the company holding the underlying shares.

**Limited shareholder rights.** Pionex says so itself: holding the token isn't the same as holding the share at a broker.

**No transfers.** You can't deposit or withdraw xStocks. To leave, you sell to USDT first.

## Who it suits

xStocks make sense if you already keep money in USDT on Pionex and want some exposure to big US companies without opening a brokerage account. As a long-term replacement for real shares they fall short: the rights are limited and you pay double the usual spot fee.

If you try it, start small, pick a 7×24 pair if you plan to run a bot, and check the token price against the real share before you buy.

[Open a Pionex account](https://www.pionex.com/en/signUp?r=0uHzysLVYQh)

Based on Pionex's xStocks introduction as of October 2026. Token lists, fees and regional access change, so check the app. Trading tokenized stocks can lose you money; this is an explainer, not investment advice.
