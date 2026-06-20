---
title: "Raspberry Pi Überblick"
description: "Ein praktischer Überblick über den Raspberry Pi: seine GPIO-Pins, der Unterschied zwischen Sensoren und Aktoren, wie ein Breadboard funktioniert und was die Anschlüsse gängiger Bauteile wie LED, Temperatursensor und Buzzer bedeuten."
keywords:
    - Raspberry Pi
    - GPIO
    - Sensor
    - Aktor
    - Breadboard
    - LED
    - Temperatursensor
    - Buzzer
    - Verdrahtung
    - VCC
    - VDD
    - GND
    - SDA
    - SCL
    - I2C
---

# Raspberry Pi Überblick

## Was ist ein Raspberry Pi

Der Raspberry Pi ist ein kleiner Einplatinencomputer. Neben den üblichen Anschlüssen (USB, HDMI, Netzwerk) besitzt er eine Reihe von **GPIO-Pins**, über die elektronische Bauteile direkt angeschlossen werden können — das macht ihn zu einer beliebten Plattform für Hardware-Projekte.

## GPIO-Pins

**GPIO** steht für *General-Purpose Input/Output* (Allzweck-Ein-/Ausgabe). Die Pin-Leiste vereint mehrere Arten von Pins:

- **Stromversorgungs-Pins:** feste **3,3 V**- und **5 V**-Ausgänge zur Versorgung von Bauteilen.
- **Masse-Pins (GND):** der gemeinsame Bezugspunkt bzw. Rückleiter für den Strom.
- **I/O-Pins:** frei programmierbare Pins, die ausgelesen (**Input**) oder gesetzt (**Output**) werden können.

Ein GPIO-I/O-Pin ist rein **digital**: Er kennt nur **HIGH** (3,3 V) und **LOW** (0 V). Eine analoge Spannung kann er nicht direkt messen, daher benötigt ein analoger Sensor einen [Analog-Digital-Wandler (ADC)](./analog-digital-converter.mdx) dazwischen. Umgekehrt wird ein analogähnlicher Ausgang mit [Pulsweitenmodulation (PWM)](./pulse-width-modulation.md) angenähert.

## Sensoren vs. Aktoren

Bauteile lassen sich in zwei gegensätzliche Rollen einteilen:

- Ein **Sensor** ist ein Bauteil, das eine physikalische Größe aus der Umwelt (Temperatur, Feuchtigkeit, Druck, Beschleunigung usw.) in ein **elektrisches Signal** umformt.
- Ein **Aktor** ist der Gegenspieler des Sensors und macht genau das Gegenteil: Er setzt ein **elektrisches Signal** in eine physikalische Größe wie Bewegung, Druck, Schall oder Licht um.

| Rolle  | Richtung                      | Beispiele                              |
| ------ | ----------------------------- | -------------------------------------- |
| Sensor | Umwelt => elektrisches Signal | Temperatursensor, Lichtsensor          |
| Aktor  | elektrisches Signal => Umwelt | Motor, Lampe/LED, Lautsprecher, Buzzer |

## Das Breadboard

Ein **Breadboard** (Steckbrett) ermöglicht das Verbinden von Bauteilen ohne Löten, Kabel und Bauteilbeine werden einfach in die Löcher gesteckt. Löcher, die zum selben internen Streifen gehören, sind elektrisch miteinander verbunden:

- Die beiden langen **Stromschienen** an den Rändern (mit `+` und `-` markiert) verlaufen über die gesamte Länge der Platine. Sie werden meist einmal von einem 3,3 V- / 5 V-Pin und einem GND-Pin gespeist, sodass Strom und Masse überall verfügbar sind.
- Die inneren **Kontaktstreifen** verbinden die Löcher jeder kurzen Spalte miteinander, getrennt durch eine Lücke in der Mitte der Platine.

Bauteile, die im selben verbundenen Streifen stecken, teilen sich eine elektrische Verbindung — so wird eine Schaltung aufgebaut.

## Bauteile anschließen

Die meisten Bauteile besitzen einige klar definierte Anschlüsse. Die drei häufigsten sind **Stromversorgung (VCC / `+`)**, **Masse (GND / `-`)** und eine **Signalleitung**.

| Bauteil          | Rolle  | Anschlüsse                   | Weitere Erklärung                                   |
| ---------------- | ------ | ---------------------------- | --------------------------------------------------- |
| LED / Lampe      | Aktor  | Anode (`+`), Kathode (`-`)   | längeres Bein ist `+`, kürzeres Bein ist `-`        |
| Temperatursensor | Sensor | VCC (`+`), GND (`-`), Signal | das Signal überträgt den Messwert an einen GPIO-Pin |
| Buzzer           | Aktor  | `+` (Signal), `-` (GND)      | das Signal schaltet bzw. steuert den Ton            |

### Gängige Anschlussbezeichnungen

Sensormodule und Breakout-Boards schreiben ihre Anschlüsse selten aus, stattdessen drucken sie kurze, standardisierte Abkürzungen neben jeden Pin:

- **VDD / VDC / VCC (`+`):** die positive Versorgungsspannung (Stromzufuhr). `VDD` und `VCC` stammen aus dem Chip-Design, `VDC` bedeutet schlicht „Volt DC"; in der Praxis kennzeichnen alle drei den Versorgungs-Pin (z.B. 3,3 V oder 5 V).
- **GND / VSS (`-`):** Masse, der gemeinsame Bezugspunkt und Rückleiter für den Strom.
- **SDA:** die **Datenleitung** des **I2C**-Busses, über die ein Sensor Werte mit dem Pi austauscht.
- **SCL:** die **Taktleitung** des **I2C**-Busses, die beide Seiten synchron hält.

**I2C** ist ein Zwei-Draht-Bus (SDA + SCL), über den sich mehrere digitale Sensoren dieselben zwei GPIO-Pins teilen können, jeder einzeln adressiert. Ein I2C-Sensor benötigt keinen [ADC](./analog-digital-converter.mdx), die Umwandlung in digitale Werte geschieht bereits im Modul.

### LED / Lampe

Eine LED hat zwei Beine mit fester Polung:

- **Anode (`+`):** das **längere** Bein, zur GPIO-/Plus-Seite hin angeschlossen.
- **Kathode (`-`):** das **kürzere** Bein (auch durch die abgeflachte Kante am Rand markiert), an GND angeschlossen.

Eine LED muss immer über einen **Vorwiderstand** betrieben werden, um den Strom zu begrenzen — ohne ihn zieht die LED zu viel Strom und brennt durch.

### Temperatursensor

Ein typisches Sensormodul besitzt drei Pins:

- **VCC (`+`):** Stromversorgung, z.B. 3,3 V.
- **GND (`-`):** Masse.
- **Signal:** der Ausgang, der den Messwert überträgt.

Ist das Signal **analog** (eine zur Temperatur proportionale Spannung), kann es nicht direkt an einen GPIO-Pin — zuvor wird ein [ADC](./analog-digital-converter.mdx) benötigt.

### Buzzer

Ein Buzzer hat nur zwei Anschlüsse, `+` (Signal) und `-` (GND), und kommt in zwei Varianten vor:

- **Aktiver Buzzer:** enthält einen eigenen Oszillator und benötigt nur ein HIGH-/LOW-Signal, um den Ton ein- und auszuschalten. Er gibt einen einzigen, fest eingestellten Ton wieder.
- **Passiver Buzzer:** hat keinen Oszillator und kann unterschiedliche Töne wiedergeben, benötigt dafür aber ein wechselndes Signal. Die Tonhöhe wird über die Frequenz eines [PWM](./pulse-width-modulation.md)-Signals festgelegt.

## Siehe auch

- [Analog-Digital-Wandler (ADC)](./analog-digital-converter.mdx): einen analogen Sensor an einem rein digitalen Pi auslesen
- [Frequenz (Hz) und Pulsweitenmodulation (PWM)](./pulse-width-modulation.md): analogen Ausgang annähern und einen passiven Buzzer ansteuern
- [Elektrische Einheiten](./electrical-units.md): Spannung, Stromstärke und Widerstand hinter jedem Anschluss
