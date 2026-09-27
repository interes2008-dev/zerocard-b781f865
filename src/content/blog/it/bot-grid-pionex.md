---
slug: bot-grid-pionex
title: "Bot grid di Pionex: come impostarlo e quando fa perdere soldi"
description: "Come guadagna un bot grid su Pionex e Webot, come scegliere intervallo e numero di griglie, quanto pesano le commissioni e i due modi in cui finisce in perdita."
date: 2026-09-27
order: 3
group: grid-bot
sources: grid-bot, mica
updated: 2026-09-27
category: bots
audience: eu
---

Un bot grid non prevede il mercato. Mette una scala di ordini di acquisto sotto il prezzo e di vendita sopra, e incassa un piccolo guadagno ogni volta che il prezzo oscilla tra due gradini. In un mercato laterale funziona bene. In un trend forte ti lascia con monete che continuano a scendere. Conviene capire entrambi i lati prima di metterci soldi.

I bot ci sono su pionex.com e su Webot, la piattaforma europea del gruppo Pionex. Chi vive in Italia dal luglio 2026 usa Webot EU, i dettagli in [Pionex in Italia dopo MiCA](/it/blog/pionex-italia-mica).

## Come guadagna

Scegli un intervallo, per esempio BTC tra 55.000 e 70.000 dollari, e un numero di griglie. Il bot divide l'intervallo in livelli. Se il prezzo scende di un livello compra, se risale di un livello vende. La differenza, meno le commissioni, è il guadagno di una griglia.

Per ciclo: (prezzo di vendita − prezzo di acquisto) × quantità − commissioni delle due operazioni.

## Le impostazioni che contano

**Limite superiore e inferiore.** La scelta più importante. Guarda supporti e resistenze sul grafico e l'ampiezza delle oscillazioni normali. Un limite troppo vicino al prezzo attuale viene superato da un movimento qualsiasi e il bot si ferma.

**Numero di griglie.** Più griglie significano più operazioni e meno guadagno per operazione. Più operazioni possono dare meno soldi alla fine, perché ognuna paga una commissione.

**Aritmetica o geometrica.** Aritmetica divide l'intervallo in importi uguali in dollari, geometrica in percentuali uguali. Per intervalli ampi di solito ha più senso la geometrica.

**Stop loss.** Chiude il bot se il prezzo scende sotto un livello. Senza stop il bot si tiene tutto quello che ha comprato durante la discesa.

## La commissione decide la distanza minima

Un ciclo sono due operazioni. Su pionex.com un'operazione spot costa lo 0,05%. Su Webot, secondo il sito, lo 0,1% per gli ordini maker, cioè gli ordini limite che piazza un bot grid (i taker costano lo 0,5%). A ogni giro se ne va quindi lo 0,1% o lo 0,2% del volume.

Esempio: bot da 1.000 USDT, distanza dello 0,5%, 200 cicli da 50 USDT in un mese.

| | pionex.com (0,05%) | Webot, Maker (0,1%) |
|---|---|---|
| Guadagno lordo delle griglie | 50 USDT | 50 USDT |
| Commissioni | 10 USDT | 20 USDT |
| Netto | 40 USDT | 30 USDT |

Su Webot la distanza tra le griglie deve essere quindi ancora più ampia: con lo 0,25% dopo le commissioni resterebbe quasi niente. Il numero di cicli è solo un esempio, quello reale dipende del tutto dal mercato.

## Quando perde soldi

**Il prezzo esce dall'intervallo verso il basso.** Il bot ha comprato a ogni livello durante la discesa e non ha più vendite da eseguire. Ti restano monete che continuano a perdere valore.

**Il prezzo esce dall'intervallo verso l'alto.** Il bot ha venduto tutto durante la salita e resta in USDT. Nessuna perdita, ma ti sei perso il rialzo.

**Mercati poco liquidi.** Sulle monete con pochi scambi gli ordini vengono eseguiti male, e una notizia può saltare più livelli insieme.

La trappola: il "guadagno delle griglie" può essere positivo mentre il bot nel complesso è in rosso, perché il valore delle monete detenute si conta a parte. Guarda il PnL totale.

## E le tasse?

Ogni vendita del bot contro euro, o l'uso dei proventi per spendere, genera plusvalenze o minusvalenze da dichiarare. Dal 2026 sono tassate al 33% e la franchigia non esiste più. I dettagli in [Tasse crypto 2026](/it/blog/tasse-crypto-2026-carta).

## Per iniziare

1. Apri un conto sulla piattaforma giusta per il tuo paese e completa la verifica.
2. Deposita solo cifre che puoi perdere del tutto.
3. Bot → Grid Trading → BTC/USDT.
4. Usa i parametri dell'IA o ricava l'intervallo dalle ultime settimane del grafico.
5. Imposta uno stop loss.
6. Per due settimane segui il PnL totale.

Operare con le cripto-attività può far perdere il capitale investito. L'articolo spiega uno strumento e non è una consulenza finanziaria.
