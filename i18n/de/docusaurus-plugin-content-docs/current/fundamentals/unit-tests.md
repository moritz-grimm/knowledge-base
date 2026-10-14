---
title: "Unit-Tests"
description: "Unit-Tests und ihre Arten: Positiv- und Negativtests, Äquivalenzklassen und Grenzwerte, Exception-Tests, parametrisierte Tests, zustandsbasiertes und interaktionsbasiertes Testen mit Testdoubles, solitäre und soziable Tests, Arrange-Act-Assert und die FIRST-Eigenschaften, mit Beispielen in TypeScript und Vitest."
keywords:
    - Unit-Test
    - Komponententest
    - Vitest
    - Arrange-Act-Assert
    - FIRST
    - Positivtest
    - Negativtest
    - Äquivalenzklasse
    - Grenzwertanalyse
    - Exception-Test
    - Parametrisierter Test
    - Testdouble
    - Mock
    - Stub
    - Testabdeckung
tags:
    - ap2
---

# Unit-Tests

Ein **Unit-Test**, vom ISTQB **Komponententest** genannt und auch als **Modultest** bekannt, ist ein automatisierter Test, der eine kleine Code-Einheit isoliert vom Rest des Systems prüft. Er ruft die Einheit mit definierten Eingaben auf, vergleicht das Ergebnis mit einem erwarteten Wert und meldet Erfolg oder Fehlschlag ohne menschliche Prüfung. Unit-Tests werden von Entwicklern geschrieben, meist in derselben Sprache wie der Produktivcode, und laufen in Millisekunden.

## Was ist eine Unit

Die **Unit** (Einheit) ist der kleinste Teil des Codes, der sich für sich allein testen lässt. In prozeduralem Code ist das eine Funktion, in objektorientiertem Code meist eine Klasse mit ihren öffentlichen Methoden. Der Begriff ist nicht streng definiert: Eine Unit kann auch eine kleine Gruppe von Klassen sein, die gemeinsam ein Verhalten bereitstellen (siehe [Solitäre und soziable Unit-Tests](#solitäre-und-soziable-unit-tests)).

Ein Test ist kein Unit-Test mehr, wenn er auf eine Datenbank, das Netzwerk oder das Dateisystem zugreift oder eine spezielle Konfiguration der Umgebung voraussetzt. Solche Abhängigkeiten machen den Test langsam und sein Ergebnis abhängig von externem Zustand, deshalb werden sie durch [Testdoubles](#testdoubles) ersetzt.

Der Unit-Test ist die unterste der [Teststufen](./test-levels.md).

## Aufbau: Arrange-Act-Assert

1. **Arrange (Vorbereiten):** Das zu testende Objekt erzeugen und Eingabedaten sowie Abhängigkeiten vorbereiten.
2. **Act (Ausführen):** Die zu testende Methode aufrufen, normalerweise genau einmal.
3. **Assert (Prüfen):** Das Ergebnis mit dem erwarteten Wert vergleichen.

In der verhaltensgetriebenen Entwicklung (BDD) heißen dieselben drei Schritte **Given-When-Then**.

Die Beispiele in diesem Eintrag testen folgende Klasse:

```typescript
export class TicketPricer {
    priceFor(age: number): number {
        if (!Number.isInteger(age) || age < 0) {
            throw new RangeError("age must be a non-negative integer");
        }
        if (age < 6) {
            return 0;
        }
        if (age < 18) {
            return 6;
        }
        return 12;
    }
}
```

```typescript
import { expect, test } from "vitest";
import { TicketPricer } from "./ticket-pricer";

test("adult pays full price", () => {
    // Arrange
    const pricer = new TicketPricer();

    // Act
    const price = pricer.priceFor(30);

    // Assert
    expect(price).toBe(12);
});
```

## Eigenschaften guter Unit-Tests (FIRST)

Das Akronym FIRST wurde durch Robert C. Martins *Clean Code* (2008) bekannt.

| Buchstabe | Eigenschaft                     | Bedeutung                                                                                                                     |
| --------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| F         | Fast (schnell)                  | Ein Test läuft in Millisekunden, damit die gesamte Suite nach jeder Änderung laufen kann.                                     |
| I         | Independent (unabhängig)        | Kein Test hängt vom Ergebnis oder der Reihenfolge eines anderen Tests ab. Jeder Test erzeugt seine eigenen Daten.             |
| R         | Repeatable (wiederholbar)       | Ein Test liefert bei jedem Lauf und in jeder Umgebung dasselbe Ergebnis, ohne Abhängigkeit von Uhrzeit, Zufall oder Netzwerk. |
| S         | Self-validating (selbstprüfend) | Assertions entscheiden über Erfolg oder Fehlschlag. Niemand muss Konsolenausgaben lesen oder Dateien von Hand vergleichen.    |
| T         | Timely (rechtzeitig)            | Tests entstehen zusammen mit dem Produktivcode oder vor ihm statt Wochen später.                                              |

Den Test vor dem Code zu schreiben ist der Kern der **testgetriebenen Entwicklung** (TDD): ein fehlschlagender Test (Red), der minimale Code, der ihn bestehen lässt (Green), danach das Aufräumen des Codes (Refactor).

## Black-Box- und White-Box-Sicht

| Sicht     | Testfälle werden abgeleitet aus            | Verfahren                                         |
| --------- | ------------------------------------------ | ------------------------------------------------- |
| Black Box | Der Spezifikation, ohne Kenntnis des Codes | Äquivalenzklassen, Grenzwerte                     |
| White Box | Dem Quellcode und seinem Kontrollfluss     | Anweisungsüberdeckung (C0), Zweigüberdeckung (C1) |

Unit-Tests sind die Teststufe, auf der die White-Box-Sicht am häufigsten eingesetzt wird, weil der Entwickler den Code kennt. Coverage-Werkzeuge zeigen, welche Anweisungen und Zweige kein Test ausgeführt hat, aber nicht, ob die Assertions die richtigen Werte prüfen oder die entscheidenden Eingabewerte getestet wurden. Das [Grenzwertbeispiel](#grenzwerttests) zeigt, dass selbst 100 % Zweigüberdeckung keine Korrektheit beweist, da sein Fehler unentdeckt bleibt.

## Arten von Unit-Tests

| Art                                             | Prüft                                                                | Beispiel für `priceFor`                                 |
| ----------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------- |
| [Positivtest](#positivtests)                    | Korrektes Ergebnis bei gültiger Eingabe                              | `priceFor(30)` liefert `12`                             |
| [Negativtest](#negativtests)                    | Korrekter Umgang mit ungültiger Eingabe                              | `priceFor(-5)` wird abgewiesen                          |
| [Grenzwerttest](#grenzwerttests)                | Verhalten an den Grenzen der [Äquivalenzklassen](#äquivalenzklassen) | `priceFor(17)` liefert `6`, `priceFor(18)` liefert `12` |
| [Exception-Test](#exception-tests)              | Dass die erwartete Exception geworfen wird                           | `priceFor(-1)` wirft `RangeError`                       |
| [Parametrisierter Test](#parametrisierte-tests) | Eine Testlogik mit vielen Ein-/Ausgabepaaren (datengetrieben)        | Alle Grenzwerte in einem Test                           |
| [Regressionstest](#regressionstests)            | Dass ein behobener Fehler nicht zurückkehrt                          | `priceFor(6)` nach Behebung von `age <= 6`              |

Die Arten überschneiden sich: Ein Grenzwerttest ist ein Positiv- oder ein Negativtest, ein Exception-Test ist eine Form des Negativtests, und fast jede Art lässt sich als parametrisierter Test schreiben.

### Positivtests

Positivtests decken die vorgesehene Verwendung der Unit ab (*Happy Path*). Das Beispiel unter [Arrange-Act-Assert](#aufbau-arrange-act-assert) ist ein Positivtest. Positivtests allein zeigen nur, dass die Unit funktioniert, wenn alles glattläuft.

### Negativtests

Typische ungültige Eingaben wie Werte außerhalb des zulässigen Bereichs, `null`, leere Strings und falsche Formate muss die Unit auf die spezifizierte Weise abweisen, statt mit ihnen ein falsches Ergebnis zu liefern. Ein Negativtest prüft diese Reaktion, ob es eine Exception ist, ein Rückgabewert wie `false` oder eine Fehlermeldung. Eine Unit ohne spezifizierte Reaktion auf ungültige Eingaben lässt sich nicht negativ testen, deshalb deckt das Schreiben von Negativtests auch Lücken in der Spezifikation auf.

### Äquivalenzklassen

Eine **Äquivalenzklasse** fasst Eingabewerte zusammen, bei denen sich die Unit erwartungsgemäß gleich verhält, deshalb genügt ein Repräsentant pro Klasse. Bei Units mit mehreren Eingabeparametern enthält jeder Testfall höchstens einen ungültigen Wert, weil der erste ungültige Wert bereits die Abweisung auslöst und die übrigen verdeckt.

| Klasse | Bereich                        | Erwartetes Ergebnis | Repräsentant |
| ------ | ------------------------------ | ------------------- | ------------ |
| U1     | `age < 0`                      | `RangeError`        | `-5`         |
| U2     | Keine ganze Zahl, z.B. `NaN`   | `RangeError`        | `5.5`        |
| G1     | `0` bis `5`                    | `0`                 | `3`          |
| G2     | `6` bis `17`                   | `6`                 | `10`         |
| G3     | `age >= 18`                    | `12`                | `30`         |

### Grenzwerttests

Fehler wie ein `<` statt `<=` häufen sich an den Grenzen zwischen den Klassen. Die **Grenzwertanalyse** testet deshalb jede Grenze und ihren Nachbarn in der angrenzenden Klasse (Zwei-Werte-Grenzwertanalyse). Für `priceFor` sind das `-1 | 0`, `5 | 6` und `17 | 18`. Die Drei-Werte-Grenzwertanalyse testet jeden Grenzwert zusammen mit seinen beiden Nachbarn, z.B. `4`, `5`, `6` und `5`, `6`, `7`. Offene Grenzen wie das obere Ende von G3 werden mit dem größten Wert des Datentyps getestet, hier `Number.MAX_VALUE`, sofern die Spezifikation ihn zulässt.

Enthielte `priceFor` den Fehler `age <= 6` statt `age < 6`, würden die fünf Repräsentanten `-5`, `5.5`, `3`, `10` und `30` alle bestehen und 100 % Zweigüberdeckung erreichen. Erst der Grenzwert `6` deckt den Fehler auf: Er liefert `0` statt `6`.

### Exception-Tests

```typescript
test("negative age is rejected", () => {
    const pricer = new TicketPricer();

    expect(() => pricer.priceFor(-1)).toThrow(RangeError);
});
```

Der Test schlägt fehl, wenn keine Exception oder eine Exception eines anderen Typs geworfen wird. Steht Arrange-Code innerhalb der Funktion, lässt eine dort geworfene Exception des erwarteten Typs den Test fälschlich bestehen.

### Parametrisierte Tests

Jeder Datensatz eines parametrisierten Tests erscheint im Bericht als eigener Testfall.

```typescript
test.each([
    [0, 0],
    [5, 0],
    [6, 6],
    [17, 6],
    [18, 12],
])("age %s costs %s", (age, expectedPrice) => {
    expect(new TicketPricer().priceFor(age)).toBe(expectedPrice);
});

test.each([-1, -Number.MAX_VALUE, 5.5, NaN])("age %s is rejected", (age) => {
    expect(() => new TicketPricer().priceFor(age)).toThrow(RangeError);
});
```

Parametrisierte Tests eignen sich für Grenzwerte und Repräsentanten von Äquivalenzklassen, weil die Tabelle der Testdaten die Klassen zugleich dokumentiert.

### Regressionstests

Ein Regressionstest reproduziert einen gemeldeten Fehler. Er wird vor der Behebung geschrieben und schlägt fehl, solange der Fehler besteht. Nach der Behebung bleibt er in der Suite und meldet den Fehler, sobald er zurückkehrt. Jeder Unit-Test wirkt außerdem als Regressionstest für spätere Änderungen.

## Zustandsbasiertes und interaktionsbasiertes Testen

Ein **zustandsbasierter Test** prüft den Rückgabewert der Unit oder den Zustand eines Objekts nach dem Aufruf. Alle bisherigen Beispiele sind zustandsbasiert. Ein **interaktionsbasierter Test** (auch *Verhaltenstest*) prüft, welche Methoden ihrer Abhängigkeiten die Unit aufruft, mit welchen Argumenten und wie oft. Er ist nötig, wenn die Wirkung der Unit in einem Aufruf an ein anderes Objekt besteht, z.B. dem Versand einer E-Mail, und es keinen Rückgabewert zu prüfen gibt.

```typescript
test("sends confirmation after order", () => {
    const sender = { send: vi.fn() };
    const service = new OrderService(sender);

    service.placeOrder("anna@example.com");

    expect(sender.send).toHaveBeenCalledWith("anna@example.com", "Order confirmed");
});
```

`vi.fn()` erzeugt eine Funktion, die ihre Aufrufe aufzeichnet. Der Test kann den `MessageSender` ersetzen, weil `OrderService` ihn per [Dependency Injection](./oop/dependency-injection.md) über den Konstruktor erhält.

Interaktionsbasierte Tests sind an die Implementierung gebunden: Versendet `OrderService` dieselbe Mail über eine andere Methode, schlägt der Test fehl, obwohl das Verhalten korrekt ist. Zustandsbasierte Tests werden deshalb bevorzugt, wo sich ein Ergebnis beobachten lässt, interaktionsbasierte nur dort, wo die Interaktion selbst die beobachtbare Wirkung der Unit ist, was typischerweise an der Grenze zu externen Systemen der Fall ist.

### Testdoubles

Ein **Testdouble** ersetzt im Test eine echte Abhängigkeit. Die Begriffe gehen auf Gerard Meszaros zurück (*xUnit Test Patterns*, 2007).

| Double | Zweck                                                                                       | Beispiel                                                        |
| ------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Dummy  | Füllt einen Parameter, den der getestete Codepfad nie verwendet                             | `null` oder ein leeres Objekt für einen geforderten Logger      |
| Stub   | Liefert vordefinierte Antworten und versorgt die Unit mit Eingaben                          | Wechselkursanbieter, der immer `1.10` liefert                   |
| Spy    | Zeichnet die empfangenen Aufrufe auf, damit der Test sie anschließend prüfen kann           | Mail-Sender, der jede gesendete Nachricht in einer Liste ablegt |
| Mock   | Wird mit erwarteten Aufrufen konfiguriert und verifiziert, dass die Unit sie ausgeführt hat | Mail-Sender, der genau einen Aufruf von `send` erwartet         |
| Fake   | Funktionierende, aber vereinfachte Implementierung, ungeeignet für die Produktion           | In-Memory-Repository statt einer Datenbank                      |

Ein Mock prüft die **Ausgaben** der Unit an ihre Abhängigkeiten und wird in interaktionsbasierten Tests eingesetzt. Ein Stub liefert der Unit **Eingaben** und wird in zustandsbasierten Tests eingesetzt.

```typescript
const stub: ExchangeRateProvider = { rateFor: () => 1.10 };
const converter = new PriceConverter(stub);

expect(converter.toUsd(10)).toBeCloseTo(11);    // 10 * 1.10 is 11.000000000000002
```

## Solitäre und soziable Unit-Tests

Die Begriffe **solitärer** und **soziabler Unit-Test** gehen auf Jay Fields zurück (*Working Effectively with Unit Tests*, 2014) und beschreiben, ob ein Unit-Test die Unit von ihren Kollaborateuren isoliert. Beide Ansätze ersetzen Datenbank, Netzwerk, Dateisystem und Systemuhr und unterscheiden sich im Umgang mit Kollaborateuren im selben Prozess, etwa Wertobjekten oder Berechnungsklassen.

|                     | Solitärer Unit-Test                                            | Soziabler Unit-Test                                                                 |
| ------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Abhängigkeiten      | Alle Kollaborateure durch Testdoubles ersetzt                  | Echte Kollaborateure, nur langsame oder nichtdeterministische ersetzt               |
| Unit                | Eine Klasse                                                    | Ein Verhalten, ggf. über mehrere Klassen hinweg                                     |
| Schule              | Londoner Schule, *Mockist*                                     | Klassische, Detroit- oder Chicago-Schule                                            |
| Fehlerlokalisierung | Präzise: Ein fehlschlagender Test zeigt auf eine Klasse        | Weniger präzise: Ein Fehler in einem Kollaborateur lässt mehrere Tests fehlschlagen |
| Refactoring         | Tests brechen, wenn sich die Zusammenarbeit der Klassen ändert | Tests überstehen Umbauten, solange das Verhalten gleich bleibt                      |

Viele Teams kombinieren beide: soziable Tests als Standard, solitäre Tests dort, wo ein Kollaborateur aufwendig aufzusetzen ist.

## Häufige Fehler

1. **Nur den Happy Path testen:** Die meisten Fehler treten bei unerwarteten Eingaben und an den Grenzen von Wertebereichen auf. Eine Suite aus Positivtests besteht auch dann, wenn die Unit negative Alter akzeptiert oder an den Grenzen falsche Preise berechnet.
2. **Repräsentanten ohne Grenzwerte:** Ein Wert pro Äquivalenzklasse findet kein `<`, das `<=` sein müsste, weil der Fehler genau auf der Grenze liegt, die ein Repräsentant aus der Mitte der Klasse nie trifft.
3. **Mehrere Verhaltensweisen in einem Test:** Die erste fehlschlagende Assertion bricht den Test ab, sodass die übrigen Verhaltensweisen ungeprüft bleiben. Ein Fehlschlag zeigt außerdem nicht, welches Verhalten betroffen ist, weil der Testname mehrere abdeckt.
4. **Exception-Test mit try/catch ohne fail:** `try { pricer.priceFor(-1); } catch (e) { }` besteht auch dann, wenn keine Exception geworfen wird. `expect(...).toThrow()` schlägt in diesem Fall fehl.
5. **Test ohne Assertion:** Ein Test, der die Methode nur aufruft und das Ergebnis auf der Konsole ausgibt, besteht, solange keine Exception auftritt, obwohl er eigentlich nichts prüft.
6. **Abhängigkeiten zwischen Tests:** Ein Test, der sich auf Daten eines vorherigen Tests oder auf ein statisches Feld verlässt, schlägt fehl, wenn er allein oder in anderer Reihenfolge läuft. Testframeworks können Tests in beliebiger Reihenfolge oder parallel ausführen.
7. **Zugriff auf Datenbank, Netzwerk oder aktuelle Uhrzeit:** Der Test wird langsam, und sein Ergebnis hängt von der Umgebung ab, deshalb kann er fehlschlagen, ohne dass sich der Code geändert hat, z.B. auf einem Build-Server ohne Datenbankzugriff oder nach Mitternacht, wenn sich das aktuelle Datum ändert.
8. **Jede Interaktion verifizieren:** Ein Test, der jeden internen Aufruf prüft, prüft die Implementierung statt des Verhaltens und bricht deshalb bei jedem Refactoring, auch wenn das Verhalten unverändert ist.
9. **Überdeckung mit Korrektheit gleichsetzen:** 100 % Überdeckung zeigt, dass jede Zeile ausgeführt wurde, aber nicht, ob die Ergebnisse geprüft wurden. Tests ohne aussagekräftige Assertions erreichen ebenfalls volle Überdeckung.

## Tools

- Vitest und Jest (JavaScript/TypeScript)
- pytest (Python)
- JUnit, Mockito, AssertJ und JaCoCo (Java)
- NUnit, xUnit.net und MSTest (C#)

## Siehe auch

- [Teststufen](./test-levels.md): Integrations-, System- und Abnahmetest sowie die Testpyramide
- [Fehlhandlung, Fehlerzustand und Fehlerwirkung](./error-defect-failure.md): der Fehlerzustand `age <= 6` als Wirkungskette von der Fehlhandlung bis zur Fehlerwirkung
- [Dependency Injection](./oop/dependency-injection.md): Voraussetzung für Testdoubles
- [ISO/IEC 25010](../projectmanagement/iso-25010.md#maintainability-wartbarkeit): Testbarkeit als Untermerkmal der Wartbarkeit
- [Projektphasen](../projectmanagement/projectphases.mdx#4-testing--überwachung): die Testphase im Projekt
