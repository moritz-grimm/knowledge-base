---
title: "Codeabdeckung"
description: "Maße der Codeabdeckung und ihre Berechnung am Kontrollflussgraphen: Funktions-, Zeilen-, Anweisungs- (C0), Zweig- (C1), Bedingungs-, MC/DC-, Mehrfachbedingungs- und Pfadüberdeckung, die Subsumptionshierarchie, Coverage-Reports und die Grenzen der Abdeckung als Kennzahl."
keywords:
    - Codeabdeckung
    - Testabdeckung
    - Code Coverage
    - Kontrollflussgraph
    - Funktionsüberdeckung
    - Zeilenüberdeckung
    - Anweisungsüberdeckung
    - Zweigüberdeckung
    - Entscheidungsüberdeckung
    - Bedingungsüberdeckung
    - Mehrfachbedingungsüberdeckung
    - MC/DC
    - Pfadüberdeckung
    - C0
    - C1
    - White-Box-Test
    - Istanbul
tags:
    - ap2
---

# Codeabdeckung

Die **Codeabdeckung** (*Code Coverage*, auch **Testabdeckung**) misst, welchen Anteil des Codes eine Menge von Tests ausführt. Sie ist eine White-Box-Kennzahl, weil sie an der inneren Struktur des Codes gemessen wird.

```text
coverage = executed elements / all elements x 100 %
```

Was als Element zählt, hängt vom [Überdeckungsmaß](#überdeckungsmaße) ab.

## Kontrollflussgraph

Der **Kontrollflussgraph** (*Control Flow Graph*, CFG) ist die Grundlage für Anweisungs-, Zweig- und Pfadüberdeckung. Jeder **Knoten** steht für eine Anweisung oder eine Folge von Anweisungen ohne Verzweigung. Jede **Kante** steht für einen möglichen Übergang der Steuerung von einem Knoten zum nächsten. Ein Knoten mit zwei ausgehenden Kanten ist eine **Entscheidung**. Eine Schleife erscheint als Kante, die zu einem früheren Knoten zurückführt.

Die Beispiele in diesem Eintrag verwenden die folgende Funktion:

```typescript
export function shippingCost(total: number, isMember: boolean, express: boolean): number {
    let cost = 5;
    if (isMember || total >= 50) {
        cost = 0;
    }
    if (express) {
        cost += 10;
    }
    return cost;
}
```

```text
┌──────────────────────────────┐
│ 1  let cost = 5              │
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 2  isMember || total >= 50   │
└──────────────────────────────┘
    true │            │ false
         ▼            │
┌───────────────┐     │
│ 3  cost = 0   │     │
└───────────────┘     │
         │            │
         ▼            ▼
┌──────────────────────────────┐
│ 4  express                   │
└──────────────────────────────┘
    true │            │ false
         ▼            │
┌───────────────┐     │
│ 5  cost += 10 │     │
└───────────────┘     │
         │            │
         ▼            ▼
┌──────────────────────────────┐
│ 6  return cost               │
└──────────────────────────────┘
```

## Überdeckungsmaße

Die Beispiele verwenden diese Testfälle für `shippingCost`:

| Testfall | `total` | `isMember` | `express` | Erwartetes Ergebnis | Pfad        |
| -------- | ------- | ---------- | --------- | ------------------- | ----------- |
| T1       | `20`    | `true`     | `true`    | `10`                | 1-2-3-4-5-6 |
| T2       | `20`    | `false`    | `false`   | `5`                 | 1-2-4-6     |
| T3       | `60`    | `false`    | `true`    | `10`                | 1-2-3-4-5-6 |
| T4       | `20`    | `true`     | `false`   | `0`                 | 1-2-3-4-6   |
| T5       | `60`    | `true`     | `false`   | `0`                 | 1-2-3-4-6   |
| T6       | `20`    | `false`    | `true`    | `15`                | 1-2-4-5-6   |

| Maß                                                      | Fordert                                                                                    | Testfälle für 100 % |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------- |
| [Funktionsüberdeckung](#funktionsüberdeckung)            | Jede Funktion mindestens einmal aufgerufen                                                 | T1                  |
| [Anweisungsüberdeckung (C0)](#anweisungsüberdeckung-c0)  | Jede Anweisung (jeder Knoten) mindestens einmal ausgeführt                                 | T1                  |
| [Zeilenüberdeckung](#zeilenüberdeckung)                  | Jede ausführbare Zeile mindestens einmal ausgeführt                                        | T1                  |
| [Zweigüberdeckung (C1)](#zweigüberdeckung-c1)            | Jede Kante mindestens einmal durchlaufen                                                   | T1, T2              |
| [Einfache Bedingungsüberdeckung](#bedingungsüberdeckung) | Jede atomare Bedingung mindestens einmal `true` und einmal `false`                         | T1, T3              |
| [MC/DC](#bedingungsüberdeckung)                          | Für jede atomare Bedingung gezeigt, dass sie allein das Ergebnis ihrer Entscheidung ändert | T1, T2, T3          |
| [Mehrfachbedingungsüberdeckung](#bedingungsüberdeckung)  | Jede Wertekombination der atomaren Bedingungen jeder Entscheidung                          | T1, T2, T3, T5      |
| [Pfadüberdeckung](#pfadüberdeckung)                      | Jeder Pfad vom Eingang zum Ausgang des Graphen                                             | T1, T2, T4, T6      |

### Funktionsüberdeckung

Die Funktionsüberdeckung ist das schwächste Maß. Sie findet Funktionen, die kein Test aufruft, z.B. toten Code oder vergessene Fehlerbehandlungen, sagt aber nichts über ihren Inhalt aus.

### Anweisungsüberdeckung (C0)

T1 führt alle sechs Knoten aus und erreicht 100 % Anweisungsüberdeckung. T2 allein führt die Knoten 1, 2, 4 und 6 aus, also 4 von 6 Anweisungen, das sind 66,7 %.

Die Anweisungsüberdeckung prüft keine Kanten ohne eigene Anweisung, z.B. den fehlenden `else`-Zweig eines `if`, dessen Bedingung in den Tests immer `true` ist. T1 durchläuft nie die Kante 2 => 4, sodass ein Fehler, der nur auftritt, wenn die Versandkosten bei `5` bleiben, unentdeckt bleibt.

### Zeilenüberdeckung

Die Zeilenüberdeckung zählt ausführbare Quelltextzeilen statt Anweisungen. Eine Zeile gilt als abgedeckt, sobald irgendein Teil von ihr ausgeführt wird. Die Zeilenüberdeckung hängt deshalb von der Formatierung ab:

```typescript
if (express) cost += 10;
```

T2 führt die Bedingung dieser Zeile aus, aber nicht `cost += 10`, sodass die Zeile als abgedeckt gilt, obwohl eine ihrer Anweisungen es nicht ist. Istanbul meldet mit T2 allein 100 % Zeilenüberdeckung und 66,7 % Anweisungsüberdeckung für eine Variante von `shippingCost`, in der beide `if`-Anweisungen jeweils in einer Zeile stehen.

### Zweigüberdeckung (C1)

T1 und T2 durchlaufen zusammen alle 7 Kanten und erreichen 100 % Zweigüberdeckung. T2 allein durchläuft 1 => 2, 2 => 4 und 4 => 6, also 3 von 7 Kanten, das sind 42,9 %.

Die **Entscheidungsüberdeckung** zählt statt der Kanten die Ergebnisse `true` und `false` jeder Entscheidung. T2 allein deckt 2 von 4 Entscheidungsergebnissen ab, das sind 50 %. In Code ohne Sprunganweisungen wie `goto` erreichen beide Maße mit denselben Testfällen 100 %.

Die Zweigüberdeckung betrachtet die Entscheidung `isMember || total >= 50` als Ganzes. T1 und T2 decken ihre beiden Ergebnisse ab, obwohl `total >= 50` in beiden Testfällen `false` ist, sodass ein Fehler in dieser Bedingung, z.B. `total > 50`, unentdeckt bleibt.

### Bedingungsüberdeckung

Die Bedingungsüberdeckung betrachtet die **atomaren Bedingungen** innerhalb einer Entscheidung, d.h. ihre Teile ohne logischen Operator, wie `isMember` und `total >= 50` in Entscheidung 2. Es gibt sie in drei Stärken:

- **Einfache Bedingungsüberdeckung:** Jede atomare Bedingung nimmt mindestens einmal den Wert `true` und einmal `false` an. T1 (`isMember` true, `total >= 50` false) und T3 (`isMember` false, `total >= 50` true) erreichen sie, aber die Entscheidung ist in beiden Testfällen `true`, sodass die Kante 2 => 4 nie durchlaufen wird. Die einfache Bedingungsüberdeckung schließt die Zweigüberdeckung deshalb nicht ein.
- **Mehrfachbedingungsüberdeckung:** Jede Wertekombination der atomaren Bedingungen einer Entscheidung wird getestet. Bei `n` Bedingungen sind das `2^n` Kombinationen, hier die vier Kombinationen in T1, T2, T3 und T5. Eine Entscheidung mit 10 Bedingungen benötigt bereits 1024 Testfälle.
- **Modifizierte Bedingungs-/Entscheidungsüberdeckung (MC/DC):** Für jede atomare Bedingung gibt es ein Paar von Testfällen, in dem sich nur diese Bedingung der Entscheidung ändert und mit ihr das Ergebnis der Entscheidung, was zeigt, dass die Bedingung das Ergebnis allein beeinflusst. In Entscheidung 2 unterscheiden sich T2 und T1 nur in `isMember` (`false` => `true`) und ändern das Ergebnis. T2 und T3 tun dasselbe für `total >= 50`. MC/DC benötigt `n + 1` statt `2^n` Testfälle und wird von Sicherheitsnormen für Luftfahrt- erfordert und für Fahrzeugsoftware empfohlen.

Diese Definitionen setzen voraus, dass jede Bedingung ausgewertet wird. TypeScript, Java und C# werten `||` und `&&` mit **Kurzschlussauswertung** aus, sodass `total >= 50` nicht ausgewertet wird, wenn `isMember` `true` ist. T1 liefert deshalb keinen Wert für `total >= 50`. T1 und T5 werten Entscheidung 2 identisch aus. Istanbul zählt jeden Operanden von `||` und `&&` als eigenen Zweig, sodass seine Zweigkennzahl für `shippingCost` 6 Zweige umfasst: die beiden Ergebnisse jedes `if` und die beiden Operanden von `||`.

### Pfadüberdeckung

Ein **Pfad** ist eine Folge von Kanten vom Eingang zum Ausgang des Kontrollflussgraphen. `shippingCost` hat vier Pfade, weil seine beiden Entscheidungen voneinander unabhängig sind und jede Kombination ihrer Ergebnisse durch einen anderen Pfad führt. Bei `n` hintereinanderliegenden Entscheidungen wächst die Anzahl der Pfade auf `2^n`, während die Zweigüberdeckung weiterhin nur zwei Testfälle benötigt.

Eine Schleife vervielfacht die Pfade mit jeder möglichen Anzahl von Durchläufen, sodass vollständige Pfadüberdeckung für die meisten Funktionen mit Schleifen nicht erreichbar ist. Der **Boundary-Interior-Pfadtest** beschränkt die Anzahl der Durchläufe auf null, eins und zwei. Pfade können außerdem **unausführbar** sein: Zwei Entscheidungen über dieselbe Bedingung haben immer dasselbe Ergebnis, sodass die Pfade, in denen sie sich unterscheiden, nie ausgeführt werden können.

## Subsumptionshierarchie

Ein Maß **subsumiert** ein anderes, wenn jede Menge von Testfällen, die 100 % des ersten Maßes erreicht, auch 100 % des zweiten erreicht. Ein Pfeil zeigt vom stärkeren auf das schwächere Maß:

```text
 Pfadüberdeckung      Mehrfachbedingungsüberdeckung
       │                          │
       │                          ▼
       │                        MC/DC
       │                     ┌────┴────┐
       ▼                     │         ▼
Zweigüberdeckung (C1) ◄──────┘  Einfache Bedingungsüberdeckung
       │
       ▼
Anweisungsüberdeckung (C0)
       │
       ▼
Zeilenüberdeckung
       │
       ▼
Funktionsüberdeckung
```

Pfadüberdeckung und Bedingungsüberdeckung sind nicht vergleichbar: T1, T2, T4 und T6 erreichen Pfadüberdeckung, werten `total >= 50` aber nie als `true` aus, während T1, T2, T3 und T5 Mehrfachbedingungsüberdeckung erreichen, aber den Pfad 1-2-4-5-6 auslassen.

Nur C0 und C1 werden einheitlich als Kürzel verwendet. Über C1 hinaus unterscheidet sich die Nummerierung zwischen den Quellen: Manche verwenden C2 für die Pfadüberdeckung und C3 für die Bedingungsüberdeckung, andere C2 für die einfache Bedingungsüberdeckung und C4 für die Pfadüberdeckung.

## Coverage-Reports

Coverage-Werkzeuge schreiben nach dem Testlauf einen Report. Vitest mit dem Istanbul-Provider (`vitest run --coverage --coverage.provider=istanbul`) gibt für `shippingCost` mit T1 allein folgenden Report aus:

```text
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |       50 |     100 |     100 |
 shipping-cost.ts |     100 |       50 |     100 |     100 | 3-6
------------------|---------|----------|---------|---------|-------------------
```

T1 deckt 3 der 6 Istanbul-Zweige ab: das Ergebnis `true` beider `if`-Anweisungen und den Operanden `isMember`. Die Spalte `Uncovered Line #s` verweist auf die Zeilen mit fehlenden Zweigen.

Jedes Werkzeug hat eigene Zählregeln. Der Standard-Provider `v8` von Vitest meldet für dieselbe Funktion nur 2 Zweige und dieselben 50 %, sodass Prozentwerte verschiedener Werkzeuge nicht vergleichbar sind.

## Aussagekraft und Grenzen

Die Codeabdeckung zeigt, welchen Code kein Test ausführt, aber ein hoher Wert zeigt nicht, dass der ausgeführte Code gut getestet ist:

- **Fehlender Code:** Die Abdeckung bezieht sich auf vorhandenen Code, sodass eine nie umgesetzte Anforderung keinen Code hat, der unabgedeckt sein könnte.
- **Fehlende Assertions:** Code, den ein Test ausführt, ohne sein Ergebnis zu prüfen, gilt trotzdem als abgedeckt (siehe [Unit-Tests](./unit-tests.md#häufige-fehler)).
- **Fehlende Eingabewerte:** 100 % Zweigüberdeckung stellt nicht sicher, dass die Grenzwerte einer Bedingung getestet wurden, wie das [Grenzwertbeispiel](./unit-tests.md#grenzwerttests) zeigt.

Build-Pipelines erzwingen oft einen Mindestwert, z.B. mit `coverage.thresholds` in Vitest. Werte zwischen 70 % und 80 % für Zeilen oder Zweige sind ein übliches Ziel. Ein Zielwert macht die Abdeckung zum Selbstzweck (Goodharts Gesetz): Tests werden geschrieben, um die Zahl zu erhöhen, statt um Fehler zu finden, sodass der Wert seine Aussagekraft verliert.

## Häufige Fehler

1. **Abdeckungswert ohne Maß genannt:** „80 % Abdeckung“ kann Anweisungs-, Zeilen- oder Zweigüberdeckung bedeuten. Istanbul meldet für `shippingCost` mit T1 allein 100 % Anweisungsüberdeckung und 50 % Zweigüberdeckung.
2. **Anweisungsüberdeckung als Zweigüberdeckung behandelt:** Ein `if` ohne `else` ist auf Anweisungsebene mit einem einzigen Test mit der Bedingung `true` vollständig abgedeckt. Der leere `false`-Zweig wird nie ausgeführt, sodass C1 nicht erreicht wird.
3. **Einfache Bedingungsüberdeckung als stärker als die Zweigüberdeckung angesehen:** Jede Bedingung kann beide Werte annehmen, während die Entscheidung immer dasselbe Ergebnis hat. Im Beispiel erreichen T1 und T3 die einfache Bedingungsüberdeckung, durchlaufen aber nie die Kante 2 => 4.
4. **Entscheidungen gezählt, aber nicht die Bedingungen:** Die Zweigüberdeckung von `isMember || total >= 50` wird mit Testfällen erreicht, in denen nur `isMember` variiert. Ob `total >= 50` korrekt ist, wird nie geprüft, was erst MC/DC oder die Mehrfachbedingungsüberdeckung erzwingen.
5. **Prozentwerte verschiedener Werkzeuge verglichen:** Istanbul zählt jeden Operanden von `||` als Zweig und `v8` nicht. Ein Wechsel des Coverage-Providers ändert die gemeldeten Werte, ohne dass sich die Tests ändern.
6. **Vollständige Pfadüberdeckung für Code mit Schleifen geplant:** Jede mögliche Anzahl von Durchläufen erzeugt einen eigenen Pfad, sodass die Anzahl der möglichen Pfade unbegrenzt ist. Verfahren wie der Boundary-Interior-Pfadtest beschränken die Durchläufe auf eine handhabbare Anzahl.

## Tools

- Istanbul (nyc) und V8-Coverage über Vitest oder Jest (JavaScript/TypeScript)
- coverage.py und pytest-cov (Python)
- JaCoCo (Java)
- Coverlet und dotCover (C#)
- gcov und llvm-cov (C/C++)

## Siehe auch

- [Unit-Tests](./unit-tests.md): Äquivalenzklassen und Grenzwerte als Black-Box-Gegenstück zur Abdeckung
- [Teststufen](./test-levels.md#komponententest): der Komponententest als Teststufe mit gemessener Codeabdeckung
- [Aktivitätsdiagramm](./uml/activity-diagram.md): Entscheidungen und Schleifen in einer verwandten Notation für den Kontrollfluss
