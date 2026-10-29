---
title: "Observer (Beobachter)"
description: "Entwurfsmuster Observer: angemeldete Observer benachrichtigen, wenn sich ein Subject ändert, An- und Abmelden, Push- und Pull-Modell, Publish-Subscribe und das Lapsed-Listener-Problem."
keywords:
    - Observer
    - Beobachter
    - Subject
    - Event Listener
    - Push-Modell
    - Pull-Modell
    - Publish-Subscribe
    - Lapsed Listener
    - Entwurfsmuster
    - Verhaltensmuster
sidebar_position: 7
tags:
    - ap2
---

# Observer (Beobachter)

Observer ist ein Verhaltensmuster aus dem Katalog der Gang of Four.

## Problem

Mehrere Objekte müssen reagieren, wenn sich der Zustand eines anderen Objekts ändert. Das sich ändernde Objekt soll die konkreten Klassen der Interessenten nicht kennen.

## Lösung

Das beobachtete Objekt (Subject) führt eine Liste von Observern, die ein gemeinsames Interface implementieren. Observer melden sich zur Laufzeit an und ab. Bei jeder Änderung ruft das Subject `update()` an allen angemeldeten Observern auf.

```text
┌─────────────────────────┐  observers  ┌───────────────────┐
│         Subject         │ ──────────> │   <<interface>>   │
├─────────────────────────┤   0..*      │     Observer      │
│ + subscribe(o)          │             ├───────────────────┤
│ + unsubscribe(o)        │             │ + update(data)    │
│ # notify()              │             └─────────△─────────┘
└─────────────────────────┘                       ┆
                                                  ┆
                                        ┌─────────┴─────────┐
                                        │ ConcreteObserver  │
                                        ├───────────────────┤
                                        │ + update(data)    │
                                        └───────────────────┘
```

```typescript
interface Observer<T> {
    update(data: T): void;
}

class Subject<T> {
    private readonly observers: Observer<T>[] = [];

    subscribe(observer: Observer<T>): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer<T>): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    protected notify(data: T): void {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }
}

class StockTicker extends Subject<number> {
    setPrice(price: number): void {
        this.notify(price);
    }
}

class PriceDisplay implements Observer<number> {
    update(price: number): void {
        console.log(`New price: ${price}`);
    }
}

const ticker = new StockTicker();
ticker.subscribe(new PriceDisplay());
ticker.setPrice(101.5);                // "New price: 101.5"
```

### Push- und Pull-Modell

|                       | Push-Modell                                         | Pull-Modell                                                  |
|-----------------------|-----------------------------------------------------|--------------------------------------------------------------|
| `update()` erhält     | Die geänderten Daten                                | Das Subject                                                  |
| Datenauswahl          | Das Subject entscheidet, was jeder Observer bekommt | Jeder Observer liest nur, was er braucht                     |
| Observer hängt ab von | Dem Datentyp                                        | Der Schnittstelle des konkreten Subjects                     |
| Geeignet für          | Kleine Änderungsdaten, die jeder Observer braucht   | Großen Zustand, von dem Observer verschiedene Teile brauchen |

Das Beispiel oben verwendet das Push-Modell. Im Pull-Modell übergibt das Subject sich selbst:

```typescript
class StockTicker extends Subject<StockTicker> {
    private price = 0;

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        this.price = price;
        this.notify(this);
    }
}

class PriceDisplay implements Observer<StockTicker> {
    update(ticker: StockTicker): void {
        console.log(`New price: ${ticker.getPrice()}`);
    }
}
```

### Publish-Subscribe

Beim Observer-Muster hält das Subject Referenzen auf seine Observer und ruft sie direkt auf. Bei Publish-Subscribe sitzt ein Message Broker oder Event Bus dazwischen. Der Publisher sendet eine Nachricht an ein Topic, und der Broker leitet sie an alle Subscriber dieses Topics weiter. Publisher und Subscriber kennen sich nicht und können in verschiedenen Prozessen laufen.

## Typischer Einsatz

Event Listener in Benutzeroberflächen (`addEventListener`), Aktualisieren der Views bei Modelländerungen in MVC, reaktive Programmierung (RxJS), Benachrichtigungen zwischen lose gekoppelten Modulen.

## Nachteile

Die Reihenfolge, in der Observer benachrichtigt werden, ist nicht festgelegt. Ein Observer, der in `update()` das Subject ändert, startet ein neues `notify()`, während das aktuelle noch läuft, sodass alle Observer erneut benachrichtigt werden, bevor die erste Runde abgeschlossen ist. Im Push-Modell erhalten die Observer weiter hinten in der Liste zuerst den neuen und danach den veralteten Wert. Ein Observer, der das Subject in jedem `update()` ändert, verursacht eine endlose Rekursion bis zum Stack Overflow.

## Häufige Fehler

1. **Observer, die sich nie abmelden:** Das Subject hält eine Referenz auf jeden Observer. Ein nicht mehr benötigter Observer kann nicht vom Garbage Collector entfernt werden und empfängt weiter Updates (Lapsed-Listener-Problem). In Benutzeroberflächen führt das zu Speicherlecks und zu Updates an Elementen, die es nicht mehr gibt.

## Siehe auch

- [Polling vs. Push](../../polling-vs-push.md): Push über Systemgrenzen hinweg mit Webhooks, WebSockets und MQTT
