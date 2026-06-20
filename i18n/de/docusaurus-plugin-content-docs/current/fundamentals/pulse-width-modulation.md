---
title: "Frequenz (Hz) und Pulsweitenmodulation (PWM)"
description: "Was Frequenz in Hertz bedeutet und wie die Pulsweitenmodulation über ein Tastverhältnis analoge Ausgangspegel mit einem rein digitalen Signal annähert – einschließlich der Formeln für Periode, Frequenz und Tastverhältnis."
keywords:
    - Frequenz
    - Hertz
    - Hz
    - Periode
    - Pulsweitenmodulation
    - PWM
    - Tastverhältnis
    - Puls-Pause-Verhältnis
    - GPIO
    - Dimmen
    - Motorsteuerung
---

# Frequenz (Hz) und Pulsweitenmodulation (PWM)

## Frequenz (Hz)

Die **Frequenz** beschreibt, wie oft sich ein periodisches Signal pro Sekunde wiederholt. Ihre Einheit ist das **Hertz (Hz)**: 1 Hz entspricht einer vollständigen Schwingung pro Sekunde.

Die Frequenz `f` und die Dauer einer Schwingung, die **Periode** `T`, sind Kehrwerte voneinander:

```text
f = 1 / T        (Frequenz = 1 / Periode)
T = 1 / f        (Periode  = 1 / Frequenz)
```

**Beispiel:** Ein Signal wiederholt sich alle 1 ms (0,001 s).

```text
f = 1 / 0,001 s = 1000 Hz = 1 kHz

T = 1 / 1000 Hz = 0,001 s
```

## Das Problem, das PWM löst

Ein digitaler GPIO-Ausgang kann immer nur zwei Zustände liefern: **HIGH** (z.B. 3,3 V) oder **LOW** (0 V). Einen Wert dazwischen gibt es nicht. Viele Aufgaben benötigen aber genau einen Zwischenwert, etwa das Dimmen einer LED, der Betrieb eines Motors mit halber Drehzahl oder die Ansteuerung eines passiven [Buzzers](./raspberry-pi.md#buzzer).

Die **Pulsweitenmodulation (PWM)** löst dies, indem der Ausgang sehr schnell zwischen HIGH und LOW umgeschaltet wird. Das Verhältnis von HIGH-Zeit zur gesamten Schwingung bestimmt die *durchschnittliche* abgegebene Leistung, die das angeschlossene Gerät als Wert zwischen vollständig aus und vollständig an wahrnimmt.

## Tastverhältnis

Das **Tastverhältnis** (Puls-Pause-Verhältnis) ist der Anteil einer Periode, während dem das Signal HIGH ist:

```text
Tastverhältnis = (t_an / T) x 100%

t_an = HIGH-Zeit innerhalb einer Periode
T    = t_an + t_aus (gesamte Periode)
```

| Tastverhältnis | Signal                         | Wirkung (bei 3,3 V)   |
| -------------- | ------------------------------ | --------------------- |
| 0 %            | immer LOW                      | vollständig aus       |
| 25 %           | 1/4 der Zeit HIGH              | geringe Leistung      |
| 50 %           | die halbe Zeit HIGH            | halbe Leistung        |
| 75 %           | 3/4 der Zeit HIGH              | hohe Leistung         |
| 100 %          | immer HIGH                     | vollständig an        |

**Beispiel:** Ein Signal ist innerhalb einer Periode von 1 ms für 0,25 ms HIGH.

```text
Tastverhältnis = (0,25 ms / 1 ms) x 100% = 25%
```

## Durchschnittlicher Ausgangspegel

Die durchschnittliche Spannung, die das Gerät sieht, skaliert linear mit dem Tastverhältnis:

```text
U_durchschnitt = Tastverhältnis x U_max
```

**Beispiel:** Ein Ausgang mit 3,3 V bei einem Tastverhältnis von 50 %.

```text
U_durchschnitt = 0,5 x 3,3 V = 1,65 V
```

:::note
PWM senkt die Spannung **nicht** wirklich, der Ausgang schaltet weiterhin zwischen 0 V und dem vollen Pegel um. Das Gerät *verhält sich* nur so, als hätte es den Durchschnitt erhalten, weil das Umschalten schneller erfolgt, als es reagieren kann.
:::

## Berechnung der HIGH-Zeit

Durch Kombination der obigen Formeln ergibt sich die HIGH-Zeit für eine gewählte Frequenz und ein Tastverhältnis:

```text
T = 1 / f
t_an = Tastverhältnis x T
```

**Beispiel:** Ein Signal mit 1 kHz bei einem Tastverhältnis von 25 %.

```text
T = 1 / 1000 Hz = 0,001 s = 1 ms
t_an = 0,25 x 1 ms = 0,25 ms
```

## Typische Anwendungen

- **Dimmen einer LED:** ein höheres Tastverhältnis bedeutet eine hellere LED.
- **Drehzahl von Motor und Lüfter:** bei relativ hoher Frequenz wird der Ausgang zwischen HIGH und LOW umgeschaltet; das Verhältnis legt die Leistung und damit die Drehzahl fest.
- **Töne auf einem passiven [Buzzer](./raspberry-pi.md):** die *Frequenz* des PWM-Signals bestimmt die Tonhöhe.

## Siehe auch

- [Raspberry Pi Überblick](./raspberry-pi.md): wie Sensoren und Aktoren (etwa ein passiver Buzzer) verdrahtet werden
- [Analog-Digital-Wandler (ADC)](./analog-digital-converter.mdx): die umgekehrte Richtung — ein analoges Signal in einen digitalen Wert umsetzen
- [Elektrische Einheiten](./electrical-units.md): Grundlagen zu Spannung und Leistung
