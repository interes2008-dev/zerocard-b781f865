---
slug: grid-bot-einrichten
title: "Grid-Bot einrichten: Spanne, Gitter und wann er Geld verliert"
description: "So arbeitet ein Grid-Bot bei Pionex und Webot: Spanne und Gitteranzahl wählen, warum die Gebühr den Mindestabstand bestimmt, und die zwei Wege in den Verlust."
date: 2026-09-27
order: 3
group: grid-bot
sources: grid-bot, mica
updated: 2026-09-27
category: bots
audience: eu
cover: grid-bot
---

Ein Grid-Bot sagt den Markt nicht voraus. Er legt eine Leiter aus Kauforders unter den Kurs und Verkaufsorders darüber und kassiert jedes Mal einen kleinen Gewinn, wenn der Kurs zwischen zwei Stufen pendelt. Im Seitwärtsmarkt klappt das gut. Im starken Trend bleibst du auf fallenden Coins sitzen. Beides solltest du kennen, bevor du Geld hineinsteckst.

Die Bots gibt es auf pionex.com und bei Webot, der EU-Plattform der Pionex-Gruppe. Wer in Deutschland wohnt, nutzt seit Juli 2026 Webot EU, Hintergründe in [Pionex in Deutschland nach MiCA](/de/blog/pionex-deutschland-mica).

## Wie er verdient

Du legst eine Spanne fest, zum Beispiel BTC zwischen 55.000 und 70.000 Dollar, und eine Anzahl Gitter. Der Bot teilt die Spanne in Stufen. Fällt der Kurs um eine Stufe, kauft er. Steigt er wieder um eine Stufe, verkauft er. Die Differenz abzüglich Gebühren ist der Gewinn eines Gitters.

Pro Zyklus: (Verkaufskurs − Kaufkurs) × Menge − Gebühren für beide Trades.

## Die wichtigen Einstellungen

**Ober- und Untergrenze.** Die wichtigste Entscheidung. Orientiere dich an Unterstützungen und Widerständen im Chart und an der Größe der üblichen Schwankungen. Liegt eine Grenze zu nah am Kurs, wird sie schon durch normale Bewegung durchbrochen und der Bot steht still.

**Anzahl der Gitter.** Mehr Gitter bedeuten mehr Trades und weniger Gewinn pro Trade. Mehr Trades können am Ende weniger Geld bringen, weil jeder Trade Gebühren kostet.

**Arithmetisch oder geometrisch.** Arithmetisch heißt gleiche Abstände in Dollar, geometrisch gleiche Abstände in Prozent. Für breite Spannen ist geometrisch meist sinnvoller.

**Stop-Loss.** Schließt den Bot, wenn der Kurs unter eine Marke fällt. Ohne Stop hält der Bot alles, was er auf dem Weg nach unten gekauft hat.

## Die Gebühr bestimmt den Mindestabstand

Ein Gitterzyklus besteht aus zwei Trades. Auf pionex.com kostet ein Spot-Trade 0,05%. Bei Webot sind es laut eigener Website 0,1% für Maker-Orders, also die Limit-Orders, die ein Grid-Bot setzt (Taker-Orders kosten dort 0,5%). Pro Runde gehen also 0,1% beziehungsweise 0,2% des Volumens an Gebühren.

Beispiel: Bot mit 1.000 USDT, Abstand 0,5%, 200 Zyklen zu je 50 USDT im Monat.

| | pionex.com (0,05%) | Webot, Maker (0,1%) |
|---|---|---|
| Bruttogewinn der Gitter | 50 USDT | 50 USDT |
| Gebühren | 10 USDT | 20 USDT |
| Netto | 40 USDT | 30 USDT |

Bei Webot sollte der Gitterabstand deshalb noch deutlich größer sein. Mit 0,25% Abstand bliebe dort nach Gebühren fast nichts übrig. Die Zahl der Zyklen ist hier nur ein Beispiel, die echte hängt komplett vom Markt ab.

## Wann er Geld verliert

**Der Kurs fällt unter die Spanne.** Der Bot hat auf jeder Stufe nach unten gekauft und kann nichts mehr verkaufen. Du hältst Coins, die weiter an Wert verlieren.

**Der Kurs steigt über die Spanne.** Der Bot hat auf dem Weg nach oben alles verkauft und sitzt in USDT. Kein Verlust, aber den Anstieg hast du verpasst.

**Dünne Märkte.** Bei illiquiden Coins werden Orders schlecht ausgeführt, und eine Nachricht kann mehrere Stufen auf einmal überspringen.

Die Falle: Der angezeigte Gittergewinn kann positiv sein, während der Bot insgesamt im Minus steht, weil der Wert der gehaltenen Coins separat zählt. Achte auf den Gesamt-PnL.

## Und die Steuer?

Jeder Verkauf durch den Bot ist in Deutschland eine private Veräußerung. Ein Grid-Bot produziert viele davon innerhalb der Jahresfrist. Die Freigrenze von 1.000 Euro ist damit schnell erreicht. Was sich 2027 ändern könnte, steht in [Krypto-Steuer 2026](/de/blog/krypto-steuer-haltefrist-2026).

## Start in sechs Schritten

1. Konto auf der für dein Land passenden Plattform eröffnen und verifizieren.
2. Nur Geld einzahlen, dessen Totalverlust du verkraftest.
3. Bots → Grid Trading → BTC/USDT.
4. KI-Parameter nehmen oder Spanne aus den letzten Wochen im Chart ableiten.
5. Stop-Loss setzen.
6. Zwei Wochen lang den Gesamt-PnL beobachten.

Handel mit Kryptowerten kann zum Verlust des eingesetzten Geldes führen. Der Artikel erklärt ein Werkzeug und ist keine Anlageberatung.
