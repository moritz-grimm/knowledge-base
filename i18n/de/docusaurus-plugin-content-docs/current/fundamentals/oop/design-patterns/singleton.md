---
title: "Singleton"
description: "Entwurfsmuster Singleton: eine Klasse mit genau einer global erreichbaren Instanz, privater Konstruktor, statisches getInstance(), Lazy und Eager Initialization, Nachteile und Threadsicherheit."
keywords:
    - Singleton
    - Entwurfsmuster
    - Erzeugungsmuster
    - getInstance
    - Lazy Initialization
    - Eager Initialization
    - Globaler Zustand
sidebar_position: 1
tags:
    - ap2
---

# Singleton

Singleton ist ein [Erzeugungsmuster](index.mdx#kategorien) aus dem Katalog der Gang of Four.

## Problem

Von einer Klasse darf genau eine Instanz existieren, und sie muss von überall erreichbar sein, z.B. die Anwendungskonfiguration.

## Lösung

Die Klasse verhindert die Instanziierung von außen und verwaltet ihre einzige Instanz selbst. Dazu sind drei Bestandteile nötig:

- Ein `private`-Konstruktor, damit `new` außerhalb der Klasse fehlschlägt
- Ein `static`-Attribut, das die Instanz hält
- Eine `static`-Methode `getInstance()`, die die Instanz beim ersten Aufruf erzeugt und zurückgibt

```typescript
class Configuration {
    private static instance: Configuration | null = null;

    private constructor() {
        // load settings
    }

    static getInstance(): Configuration {
        if (Configuration.instance === null) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }
}

const a = Configuration.getInstance();
const b = Configuration.getInstance();
console.log(a === b);                  // true
```

Die Instanz entsteht entweder erst bei der ersten Verwendung wie in der Variante oben (Lazy Initialization) oder bereits beim Programmstart (Eager Initialization). Bei nebenläufigem Zugriff braucht die Lazy-Variante Vorkehrungen, siehe [Häufige Fehler](#häufige-fehler).

## Typischer Einsatz

Konfiguration, Logging, Connection Pool, Cache.

## Abgrenzung zu ähnlichen Mustern

Eine [Registry](./registry.md) bietet ebenfalls globalen Zugriff auf gemeinsam genutzte Objekte. Anders als ein Singleton hält sie beliebig viele Objekte beliebiger Klassen und gibt sie über einen Schlüssel heraus.

## Nachteile

Ein Singleton ist globaler Zustand. Klassen, die `getInstance()` aufrufen, verbergen diese Abhängigkeit, und Tests können die Instanz nicht durch eine Attrappe ersetzen. Viele Projekte lassen deshalb stattdessen einen [Dependency-Injection](../dependency-injection.md)-Container eine einzelne Instanz verwalten.

## Häufige Fehler

1. **Singleton als bequeme globale Variable:** Jede Klasse kann `getInstance()` aufrufen, sodass die Abhängigkeit in keiner Konstruktor- oder Methodensignatur auftaucht. Tests können die Instanz nicht ersetzen, und Zustand, den ein Test hinterlässt, beeinflusst den nächsten. Dependency Injection mit einer einzigen gemeinsamen Instanz bietet dieselbe Garantie ohne diese Probleme.
2. **Lazy Singleton ohne Synchronisierung:** In einer Multithreading-Umgebung können zwei Threads, die gleichzeitig `getInstance()` aufrufen, beide die Prüfung auf eine vorhandene Instanz passieren und zwei Instanzen erzeugen. Ein synchronisierter Zugriff auf `getInstance()` oder Eager Initialization verhindert das.

## Siehe auch

- [Dependency Injection](../dependency-injection.md): eine einzige gemeinsame Instanz ohne versteckte Abhängigkeit
