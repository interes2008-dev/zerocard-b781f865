---
slug: pionex-grid-bot-guide
title: "Pionex grid bot: how to set it up and when it loses money"
description: "How the Pionex grid bot makes money, how to pick the range and grid count, what the 0.05% fee does to small grids, and when a grid bot loses money."
date: 2026-09-27
order: 2
group: grid-bot
sources: grid-bot, fees
updated: 2026-09-27
category: bots
---

A grid bot doesn't predict the market. It places a ladder of buy orders below the price and sell orders above it, then collects a small profit every time the price swings between two rungs. In a sideways market that works well. In a strong trend it can leave you holding a falling coin. Both sides are worth understanding before you fund one.

## How it earns

You pick a price range, say BTC between $55,000 and $70,000, and a number of grids. The bot splits the range into levels. Price drops one level, it buys. Price climbs back one level, it sells. The difference, minus fees, is one grid's profit.

Per cycle: (sell price − buy price) × quantity − fees on both trades.

## The settings that matter

**Upper and lower limit.** The most important decision. Pionex suggests looking at support and resistance on the chart and at the size of normal swings. A boundary too close to the current price gets crossed by ordinary movement and the bot stalls.

**Number of grids.** More grids means more trades and less profit per trade. Pionex says it plainly: more completed trades can still leave you with less profit overall, because every trade pays a fee.

**Arithmetic or geometric.** Arithmetic spaces levels by equal dollar amounts, geometric by equal percentages. For wide ranges geometric usually makes more sense.

**Stop loss and take profit.** A stop closes the bot if price falls past a level you set. Without one, the bot keeps holding what it bought on the way down.

**Trigger price.** The bot waits until the price reaches a level before starting. Useful if you expect a pullback.

The AI-suggested parameters are a reasonable first run, but look at the range yourself anyway.

## The fee sets a floor on grid size

Spot trading on Pionex costs 0.05% per trade. One grid cycle is two trades, so 0.1% of the volume goes to fees each round.

Take a 1,000 USDT bot with 0.5% grid spacing that completes 200 cycles of 50 USDT in a month:

- gross grid profit: 200 × 50 × 0.5% = 50 USDT;
- fees: 200 × 2 × 50 × 0.05% = 10 USDT;
- net: 40 USDT.

Shrink the spacing to 0.15% and each cycle earns 0.075 USDT gross while paying 0.05 in fees. The bot looks busy and makes almost nothing. Keep spacing several times larger than 0.1%. (The cycle count here is an illustration; real numbers depend entirely on the market.)

## When it loses money

**Price breaks below the range.** The bot bought at every level on the way down and now has no sell orders above the price that can fill. You hold coins that keep losing value, and trading stops.

**Price breaks above the range.** The bot sold everything on the way up and sits in USDT. No loss, but you missed the move.

**Thin markets.** On illiquid coins orders fill badly, and a news gap can jump several levels at once.

The trap: the "grid profit" figure can be positive while the bot as a whole is in the red, because the value of the coins it holds is counted separately. Watch the total PnL, not just grid profit.

## Where it fits

A liquid pair moving sideways in a visible channel. BTC/USDT and ETH/USDT suit it better than a fresh meme coin. For trending markets Pionex has other bots: DCA to build a position gradually, Infinity Grid with no upper limit, a rebalancing bot for a portfolio.

## Getting started

1. Open a Pionex account and complete verification.
2. Deposit only USDT you can afford to lose completely.
3. Trading bots → Grid Trading → BTC/USDT.
4. Use the AI parameters or set a range from the last few weeks of the chart.
5. Set a stop loss.
6. Watch total PnL for the first two weeks.

Pionex itself warns not to treat a short profitable test as proof that a bigger position will do the same. Good advice.

Once the bot produces USDT, you can spend it straight from the Pionex Card without a bank withdrawal. See the [Pionex Card review](/en/blog/pionex-card-review) for what that costs.

[Open a Pionex account](https://www.pionex.com/en/signUp?r=0uHzysLVYQh)

Crypto trading can lose you money. This article explains how the tool works and is not investment advice.
