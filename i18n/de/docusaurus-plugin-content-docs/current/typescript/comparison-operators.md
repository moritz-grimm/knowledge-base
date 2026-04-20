---
title: "Vergleichsoperatoren"
description: "Überblick über JavaScript/TypeScript Vergleichsoperatoren einschließlich Gleichheit- und Relationaloperatoren, strikter vs. loser Vergleich und Operatorpriorität."
keywords:
  - "JavaScript"
  - "TypeScript"
  - "Vergleichsoperatoren"
  - "Strikte Gleichheit"
  - "Lose Gleichheit"
  - "Operatorpriorität"
---

# Vergleichsoperatoren

## Gleichheitsoperatoren

| Operator | Name                 | Beschreibung                                                                  |
| -------- | -------------------- | ----------------------------------------------------------------------------- |
| `===`    | Strikte Gleichheit   | Gibt `true` zurück wenn Wert **und** Typ gleich sind                          |
| `!==`    | Strikte Ungleichheit | Gibt `true` zurück wenn Wert **oder** Typ sich unterscheiden                  |
| `==`     | Lose Gleichheit      | Gibt `true` zurück wenn die Werte gleich sind nach einer Typumwandlung        |
| `!=`     | Lose Ungleichheit    | Gibt `true` zurück wenn die Werte sich unterscheiden nach einer Typumwandlung |

### Beispiele

```typescript
1 === 1      // true
1 === "1"    // false (unterschiedliche Typen)

1 == "1"     // true (Der String wird in eine Nummer umgewandelt)
0 == false   // true
null == undefined // true
```

**Wichtig:** Immer `===` & `!==` über `==` & `!=` bevorzugen, um unerwartete Typumwandlungen zu vermeiden.

## Relationale Operatoren

| Operator | Name                    | Beispiel           |
| -------- | ----------------------- | ------------------ |
| `>`      | Größer als              | `5 > 3` => `true`  |
| `<`      | Kleiner als             | `5 < 3` => `false` |
| `>=`     | Größer oder gleich als  | `5 >= 5` => `true` |
| `<=`     | Kleiner oder gleich als | `3 <= 5` => `true` |

## Nullwerte und spezielle Vergleiche

| Expression           | Ergebnis | Grund                                      |
| -------------------- | -------- | ------------------------------------------ |
| `NaN === NaN`        | `false`  | `NaN` ist nicht gleich zu etwas            |
| `null === undefined` | `false`  | Unterschiedliche Typen                     |
| `null == undefined`  | `true`   | Spezialregel in loser Gleichheit           |
| `null == 0`          | `false`  | `null` ist nur lose gleich mit `undefined` |

## Operatorprioritäten

Operatoren mit einer **höheren Priorität** werden als erstes ausgewertet. Operatoren mit der **gleichen Priorität** werden von links nach rechts ausgewertet.

| Priorität      | Operator                 | Beschreibung       |
| -------------- | ------------------------ | ------------------ |
| 1 (höchste)    | `()`                     | Gruppierung        |
| 2              | `!`                      | Logisches NOT      |
| 3              | `>`, `<`, `>=`, `<=`     | Relationale        |
| 4              | `===`, `!==`, `==`, `!=` | Gleichheit         |
| 5              | `&&`                     | Logisches AND      |
| 6              | `\|\|`                   | Logisches OR       |
| 7 (niedrigste) | `??`                     | Nullish-Coalescing |

### Beispiele

```typescript
const result = a > 0 && b === 1 || c !== 2;

// && hat eine höhere Priorität als ||, daher entspricht das:
const result = (a > 0 && b === 1) || c !== 2;

// NICHT:
const result = a > 0 && (b === 1 || c !== 2);

// Lösung:
const result = a > 0 && (b === 1 || c !== 2);
```

**Tipp:** Im Zweifelsfall immer `()` Klammern verwenden um die beabsichtigte Auswertungsreihenfolge klar zu machen
