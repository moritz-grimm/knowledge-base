---
title: "Observer"
description: "Observer design pattern: notifying registered observers when a subject changes, subscribe and unsubscribe, push and pull model, publish-subscribe, and the lapsed listener problem."
keywords:
    - Observer
    - Subject
    - Event Listener
    - Push Model
    - Pull Model
    - Publish-Subscribe
    - Lapsed Listener
    - Design Patterns
    - Behavioural Patterns
sidebar_position: 7
tags:
    - ap2
---

# Observer

Observer is a behavioural pattern from the Gang of Four catalogue.

## Problem

Several objects need to react when the state of another object changes. The changing object should not know the concrete classes of the interested ones.

## Solution

The observed object (subject) keeps a list of observers that implement a common interface. Observers subscribe and unsubscribe at runtime. On every change, the subject calls `update()` on all registered observers.

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

### Push and Pull Model

|                     | Push model                                   | Pull model                                          |
|---------------------|----------------------------------------------|-----------------------------------------------------|
| `update()` receives | The changed data                             | The subject                                         |
| Data selection      | The subject decides what every observer gets | Each observer reads only what it needs              |
| Observer depends on | The data type                                | The interface of the concrete subject               |
| Suited for          | Small change data that every observer needs  | Large state of which observers need different parts |

The example above uses the push model. In the pull model, the subject passes itself:

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

In the observer pattern, the subject holds references to its observers and calls them directly. In publish-subscribe, a message broker or event bus sits in between. The publisher sends a message to a topic, and the broker forwards it to all subscribers of that topic. Publisher and subscriber do not know each other and can run in different processes.

## Typical Use

Event listeners in user interfaces (`addEventListener`), updating views when a model changes in MVC, reactive programming (RxJS), notifications between loosely coupled modules.

## Drawbacks

The order in which observers are notified is not defined. An observer that changes the subject in `update()` starts a new `notify()` while the current one is still running, so all observers are notified again before the first round has finished. In the push model, the observers further down the list receive the new value first and the outdated one afterwards. An observer that changes the subject in every `update()` causes endless recursion up to a stack overflow.

## Common Mistakes

1. **Observers that never unsubscribe:** The subject keeps a reference to every observer. An observer that is no longer needed cannot be garbage-collected and keeps receiving updates (lapsed listener problem). In user interfaces this causes memory leaks and updates to elements that no longer exist.

## See Also

- [Polling vs. Push](../../polling-vs-push.md): push across system boundaries with webhooks, WebSockets and MQTT
