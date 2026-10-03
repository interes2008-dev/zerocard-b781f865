---
slug: bot-grid-pionex
title: "Bot grid Pionex : réglages et cas où il fait perdre de l'argent"
description: "Comment gagne un bot grid Pionex, comment choisir la fourchette et le nombre de grilles, l'effet des frais de 0,05 % et quand il perd de l'argent."
date: 2026-09-27
order: 3
group: grid-bot
sources: grid-bot, fees
updated: 2026-09-27
category: bots
cover: grid-bot
---

Un bot grid ne prédit pas le marché. Il pose une échelle d'ordres d'achat sous le prix et d'ordres de vente au-dessus, puis encaisse un petit gain à chaque aller-retour du prix entre deux barreaux. Dans un marché sans tendance, ça marche bien. Dans une tendance forte, il peut vous laisser avec une crypto qui continue de baisser. Mieux vaut connaître les deux côtés avant d'y mettre de l'argent.

Ce guide vaut pour pionex.com, accessible notamment en Suisse et en Afrique francophone. Depuis la France, voir d'abord [Pionex en France en 2026](/fr/blog/pionex-france-2026).

## Comment il gagne

Vous choisissez une fourchette, par exemple BTC entre 55 000 et 70 000 dollars, et un nombre de grilles. Le bot découpe la fourchette en niveaux. Le prix baisse d'un niveau, il achète. Il remonte d'un niveau, il vend. L'écart, moins les frais, c'est le gain d'une grille.

Par cycle : (prix de vente − prix d'achat) × quantité − frais des deux ordres.

## Les réglages qui comptent

**Borne haute et borne basse.** La décision la plus importante. Pionex conseille de regarder les supports et résistances sur le graphique et l'amplitude des oscillations habituelles. Une borne trop proche du prix actuel est franchie au premier mouvement et le bot s'arrête.

**Nombre de grilles.** Plus de grilles, c'est plus d'ordres et moins de gain par ordre. Plus d'ordres peuvent rapporter moins au total, parce que chacun paie des frais.

**Arithmétique ou géométrique.** Arithmétique découpe la fourchette en montants égaux en dollars, géométrique en pourcentages égaux. Pour une fourchette large, le géométrique est souvent plus logique.

**Stop loss.** Ferme le bot si le prix passe sous un niveau. Sans stop, le bot garde tout ce qu'il a acheté pendant la baisse.

**Prix de déclenchement.** Le bot attend que le prix atteigne un niveau avant de démarrer. Utile si vous attendez un repli.

Les paramètres proposés par l'IA de Pionex conviennent pour un premier essai, mais vérifiez la fourchette vous-même.

## Les frais fixent l'écart minimum

Sur Pionex, chaque ordre au comptant coûte 0,05 %. Un cycle, c'est deux ordres : 0,1 % du volume part en frais à chaque tour.

Exemple : bot de 1 000 USDT, écart de 0,5 %, 200 cycles de 50 USDT sur un mois.

- gain brut : 200 × 50 × 0,5 % = 50 USDT ;
- frais : 200 × 2 × 50 × 0,05 % = 10 USDT ;
- net : 40 USDT.

Avec un écart de 0,15 %, chaque cycle rapporte 0,075 USDT brut et paie 0,05 de frais. Le bot a l'air très actif et ne laisse presque rien. Gardez un écart plusieurs fois supérieur à 0,1 %. Le nombre de cycles n'est qu'un exemple : il dépend entièrement du marché.

## Quand il fait perdre de l'argent

**Le prix sort de la fourchette par le bas.** Le bot a acheté à chaque niveau pendant la baisse et n'a plus de vente à exécuter. Vous gardez des cryptos qui continuent de perdre de la valeur.

**Le prix sort par le haut.** Le bot a tout vendu pendant la hausse et reste en USDT. Pas de perte, mais vous avez raté le mouvement.

**Marchés peu liquides.** Sur les cryptos peu échangées, les ordres s'exécutent mal, et une nouvelle peut sauter plusieurs niveaux d'un coup.

Le piège : le « gain des grilles » peut être positif alors que le bot est globalement dans le rouge, car la valeur des cryptos détenues est comptée à part. Regardez le PnL total.

## Pour démarrer

1. Ouvrez un compte Pionex et faites la vérification.
2. Déposez uniquement des USDT que vous pouvez perdre entièrement.
3. Bots → Grid Trading → BTC/USDT.
4. Prenez les paramètres de l'IA ou fixez la fourchette d'après les dernières semaines du graphique.
5. Mettez un stop loss.
6. Suivez le PnL total pendant deux semaines.

Quand le bot produit des USDT, vous pouvez les dépenser directement avec la carte Pionex. Le coût réel est détaillé dans [la carte Pionex en Afrique francophone et en Suisse](/fr/blog/carte-pionex-afrique-suisse).

[Ouvrir un compte Pionex](https://www.pionex.com/en/signUp?r=0uHzysLVYQh)

Le trading de crypto-actifs peut entraîner la perte du capital investi. Cet article explique un outil et ne constitue pas un conseil en investissement.
