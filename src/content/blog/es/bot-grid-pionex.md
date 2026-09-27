---
slug: bot-grid-pionex
title: "Bot grid de Pionex: cómo configurarlo y cuándo pierde dinero"
description: "Cómo gana un bot grid en Pionex, cómo elegir rango y número de grids, qué hace la comisión del 0,05% con los grids pequeños y cuándo pierde dinero."
date: 2026-09-27
order: 2
group: grid-bot
sources: grid-bot, fees
updated: 2026-09-27
category: bots
---

Un bot grid no adivina hacia dónde va el mercado. Pone una escalera de órdenes de compra por debajo del precio y de venta por encima, y cobra una pequeña ganancia cada vez que el precio va y viene entre dos peldaños. En un mercado lateral funciona bien. En una tendencia fuerte te puede dejar con monedas que siguen cayendo. Conviene entender las dos caras antes de ponerle dinero.

## Cómo gana

Eliges un rango, por ejemplo BTC entre 55.000 y 70.000 dólares, y un número de grids. El bot divide el rango en niveles. Si el precio baja un nivel, compra. Si vuelve a subir un nivel, vende. La diferencia, menos comisiones, es la ganancia de un grid.

Por ciclo: (precio de venta − precio de compra) × cantidad − comisiones de las dos operaciones.

## Los ajustes que importan

**Límite superior e inferior.** La decisión más importante. Pionex recomienda mirar soportes y resistencias en el gráfico y el tamaño de las oscilaciones normales. Un límite muy cerca del precio actual se rompe con cualquier movimiento y el bot se detiene.

**Número de grids.** Más grids significa más operaciones y menos ganancia por operación. Más operaciones pueden dejar menos dinero al final, porque cada una paga comisión.

**Aritmético o geométrico.** Aritmético reparte los niveles en montos iguales en dólares, geométrico en porcentajes iguales. Para rangos amplios suele tener más sentido el geométrico.

**Stop loss.** Cierra el bot si el precio cae por debajo de un nivel. Sin stop, el bot se queda con todo lo que compró en la bajada.

**Precio de activación.** El bot espera a que el precio llegue a un nivel antes de empezar. Útil si esperas un retroceso.

Los parámetros sugeridos por la IA de Pionex sirven para una primera prueba, pero revisa el rango con tus propios ojos.

## La comisión marca el tamaño mínimo del grid

En Pionex cada operación al contado cuesta 0,05%. Un ciclo son dos operaciones, así que se va 0,1% del volumen en comisiones por vuelta.

Ejemplo: bot de 1.000 USDT, separación de 0,5%, 200 ciclos de 50 USDT en un mes.

- ganancia bruta: 200 × 50 × 0,5% = 50 USDT;
- comisiones: 200 × 2 × 50 × 0,05% = 10 USDT;
- neto: 40 USDT.

Con una separación de 0,15%, cada ciclo gana 0,075 USDT brutos y paga 0,05 de comisión. El bot se ve muy activo y casi no deja nada. Mantén la separación varias veces por encima de 0,1%. La cantidad de ciclos es solo un ejemplo: depende por completo del mercado.

## Cuándo pierde dinero

**El precio rompe el rango hacia abajo.** El bot compró en cada nivel durante la caída y ya no tiene ventas que ejecutar. Te quedas con monedas que siguen perdiendo valor.

**El precio rompe el rango hacia arriba.** El bot vendió todo en la subida y queda en USDT. No pierdes, pero te perdiste el movimiento.

**Mercados poco líquidos.** En monedas con poco volumen las órdenes se ejecutan mal, y una noticia puede saltar varios niveles de golpe.

La trampa: la "ganancia del grid" puede estar en positivo mientras el bot en total está en rojo, porque el valor de las monedas retenidas se cuenta aparte. Mira el PnL total.

## Dónde encaja

Un par líquido que se mueve de lado dentro de un canal visible. BTC/USDT y ETH/USDT encajan mejor que una memecoin recién salida. Para mercados con tendencia Pionex tiene otros bots: DCA para ir armando posición, Infinity Grid sin límite superior, bot de rebalanceo para un portafolio.

## Para empezar

1. Abre cuenta en Pionex y completa la verificación.
2. Deposita solo USDT que puedas perder por completo.
3. Bots → Grid Trading → BTC/USDT.
4. Usa los parámetros de la IA o define el rango con las últimas semanas del gráfico.
5. Pon un stop loss.
6. Sigue el PnL total durante dos semanas.

Cuando el bot genere USDT, puedes gastarlos con la tarjeta Pionex sin pasar por el banco. Los costos reales están en [Tarjeta Pionex en Latinoamérica](/es/blog/tarjeta-pionex-latinoamerica).

[Abrir cuenta en Pionex](https://www.pionex.com/en/signUp?r=0uHzysLVYQh)

Operar con criptomonedas puede hacerte perder dinero. Este artículo explica cómo funciona una herramienta y no es una recomendación de inversión.
