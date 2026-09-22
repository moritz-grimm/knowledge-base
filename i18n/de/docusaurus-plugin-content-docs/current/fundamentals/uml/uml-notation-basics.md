---
title: "UML-Notationsgrundlagen"
description: "Diagrammübergreifende UML-Notation: Sichtbarkeiten, Multiplizitäten und ihre Lesart, Schlüsselwörter, Stereotypen, Notizen, Tagged Values, Constraints, Rollennamen, Namenskonventionen und Diagrammrahmen."
keywords:
    - UML
    - Notation
    - Sichtbarkeit
    - Multiplizität
    - Schlüsselwort
    - Stereotyp
    - Tagged Value
    - Constraint
    - Rollenname
    - Diagrammrahmen
tags:
    - ap2
---

# UML-Notationsgrundlagen

## Überblick

Eine Handvoll Notationselemente taucht in nahezu jedem UML-Diagramm auf, unabhängig vom Diagrammtyp. Sichtbarkeiten, Multiplizitäten, Schlüsselwörter und Stereotypen, Notizen, Constraints und Diagrammrahmen bedeuten im [Klassendiagramm](./class-diagram.md), im [Komponentendiagramm](./component-diagram.md) und im [Zustandsdiagramm](./state-machine-diagram.md) dasselbe.

---

## Sichtbarkeit

Die Sichtbarkeit gibt an, wer auf ein Merkmal (Attribut, Operation oder Element eines Pakets bzw. einer Komponente) zugreifen darf. Sie wird als einzelnes Zeichen unmittelbar vor den Namen des Merkmals geschrieben.

| Zeichen | Name      | Zugriff für                                                   | Typische Verwendung                   |
| ------- | --------- | ------------------------------------------------------------- | ------------------------------------- |
| `+`     | public    | Alle Elemente, die den Klassifizierer sehen                   | Schnittstelle einer Klasse            |
| `-`     | private   | Nur der Klassifizierer selbst                                 | Interner Zustand, Hilfsoperationen    |
| `#`     | protected | Der Klassifizierer und seine Spezialisierungen (Unterklassen) | Erweiterungspunkte für Unterklassen   |
| `~`     | package   | Alle Elemente desselben Pakets                                | Zusammenarbeit innerhalb eines Moduls |

Zwei weitere Zeichen werden häufig mit der Sichtbarkeit verwechselt, drücken aber etwas anderes aus:

- `/` vor einem Namen kennzeichnet ein **abgeleitetes** Merkmal, dessen Wert aus anderen Merkmalen berechnet wird (`/ age` aus `dateOfBirth`).
- Ein unterstrichener Name kennzeichnet ein **statisches** Merkmal, das zum Klassifizierer gehört und nicht zum einzelnen Objekt.

Die folgende Klasse verwendet alle diese Zeichen. Da reiner Text keine Unterstreichung darstellen kann, ist das statische Attribut `MAX_LIMIT` stattdessen mit `(static)` markiert:

```text
┌──────────────────────────────────────┐
│               Account                │
├──────────────────────────────────────┤
│ + accountNumber: String              │
│ - balance: Decimal                   │
│ # owner: Customer                    │
│ ~ auditLog: LogEntry [0..*]          │
│ / available: Decimal                 │
│ + MAX_LIMIT: Decimal = 5000 (static) │
├──────────────────────────────────────┤
│ + deposit(amount: Decimal)           │
│ + withdraw(amount: Decimal): Bool    │
│ - validate(amount: Decimal): Bool    │
└──────────────────────────────────────┘
```

Die Sichtbarkeit ist in der UML optional. Ein fehlendes Zeichen bedeutet *unbestimmt*, nicht *public*, auch wenn viele Werkzeuge public als Voreinstellung verwenden.

---

## Multiplizitäten

Eine Multiplizität gibt an, wie viele Objekte an einem Ende einer Assoziation beteiligt sein dürfen oder wie viele Werte ein Attribut aufnehmen kann. Sie wird neben das Assoziationsende oder in eckigen Klammern hinter den Attributtyp geschrieben.

| Notation | Bereich               | Lesart                                                 |
| -------- | --------------------- | ------------------------------------------------------ |
| `1`      | genau 1               | Pflicht, genau ein Objekt                              |
| `0..1`   | 0 oder 1              | Optional, höchstens ein Objekt                         |
| `*`      | 0 bis unbegrenzt      | Kurzform von `0..*`, keine implizite Untergrenze von 1 |
| `0..*`   | 0 bis unbegrenzt      | Optional, beliebig viele                               |
| `1..*`   | 1 bis unbegrenzt      | Pflicht, mindestens eines                              |
| `n..m`   | n bis m               | Expliziter Bereich, z.B. `2..4`                        |
| `5`      | genau 5               | Feste Anzahl                                           |
| `1..3,7` | 1 bis 3, oder genau 7 | Mehrere Bereiche                                       |

Regeln für das Lesen und Schreiben von Multiplizitäten:

- Die Multiplizität steht bei der Klasse, die sie beschreibt, und gibt an, wie viele Objekte dieser Klasse mit einem Objekt am anderen Ende verbunden sind.
- Die Untergrenze entscheidet darüber, ob die Beziehung optional (`0`) oder verpflichtend (`1` oder mehr) ist.
- Die Obergrenze entscheidet darüber, ob die Implementierung eine einzelne Referenz (`1`) oder eine Sammlung (`*`) hält.
- Eine weggelassene Multiplizität ist formal unbestimmt, die meisten Werkzeuge und Lehrbücher lesen sie als `1`.

### Lesart einer Assoziation

```text
┌──────────────┐ 1          0..* ┌──────────────┐
│   Customer   ├─────────────────┤    Order     │
└──────────────┘   places   ▶    └──────────────┘
```

Der Satz wird aus der Klasse am einen Ende, dem Assoziationsnamen und der Multiplizität am anderen Ende gebildet und anschließend in der Gegenrichtung wiederholt:

- Ein `Customer` gibt **null oder mehr** `Order`-Objekte auf.
- Ein `Order`-Objekt wird von **genau einem** `Customer` aufgegeben.

Das kleine ausgefüllte Dreieck `▶` hinter dem Assoziationsnamen ist die **Leserichtung**. Es gibt an, in welcher Richtung der Name einen Satz ergibt, und hat keine weitere Semantik. Das Dreieck ist optional, fehlt es, wird der Name von links nach rechts bzw. von oben nach unten gelesen.

---

## Schlüsselwörter und Stereotypen

Eine Beschriftung in Guillemets (`«…»`) ergänzt die Bedeutung eines vorhandenen Modellelements, ohne dafür eine neue Form einzuführen. Sie wird über oder vor den Namen des Elements geschrieben.

```text
┌──────────────────────┐
│     «interface»      │
│      Printable       │
├──────────────────────┤
│ + print(): void      │
└──────────────────────┘
```

Wo Guillemets nicht zur Verfügung stehen, gelten die doppelten spitzen Klammern `<<interface>>` als Ersatz, weshalb in der Praxis beide Schreibweisen auftreten.

Auf diese Weise werden zwei Arten von Beschriftungen notiert:

- Ein **Schlüsselwort** ist von der UML selbst vordefiniert. Es benennt eine Metaklasse oder eine feste Ausprägung davon, ist reserviert und darf ohne weitere Deklaration verwendet werden.
- Ein **Stereotyp** wird von den Modellierenden oder einem Werkzeug definiert und passt ein Element an eine Domäne, eine Technologie oder einen Unternehmensstandard an. Es trägt nur dort Bedeutung, wo es definiert ist.

Von der UML vordefinierte Schlüsselwörter:

| Schlüsselwort              | Gilt für                | Bedeutung                                           |
| -------------------------- | ----------------------- | --------------------------------------------------- |
| `<<interface>>`            | Klasse                  | Deklariert Operationen ohne Implementierung         |
| `<<enumeration>>`          | Klasse                  | Ein Typ mit einer festen Menge an Literalen         |
| `<<include>>`              | Anwendungsfallbeziehung | Ein Anwendungsfall nutzt einen anderen immer        |
| `<<extend>>`               | Anwendungsfallbeziehung | Ein Anwendungsfall erweitert einen anderen optional |
| `<<use>>`                  | Abhängigkeit            | Der Client benötigt den Lieferanten                 |
| `<<create>>`               | Nachricht               | Die Nachricht erzeugt das empfangende Objekt        |
| `<<destroy>>`              | Nachricht               | Die Nachricht zerstört das empfangende Objekt       |
| `<<device>>`               | Knoten                  | Ein physisches Gerät                                |
| `<<executionEnvironment>>` | Knoten                  | Laufzeitumgebung auf einem Gerät                    |
| `<<artifact>>`             | Artefakt                | Eine auslieferbare Datei                            |

Stereotypen ergänzen diese Schlüsselwörter und sind ebenso zulässig, solange sie irgendwo definiert sind, für ein kleines Projekt genügt eine kurze Legende mit den verwendeten Stereotypen. Klassische Beispiele aus der Analysemodellierung sind `<<entity>>` für ein dauerhaft gespeichertes Fachobjekt, `<<boundary>>` für ein Element an der Systemgrenze und `<<control>>` für ein koordinierendes Element.

---

## Notizen und Kommentare

Eine Notiz ist ein Rechteck mit geknickter Ecke, das über eine gestrichelte Linie mit dem kommentierten Element verbunden ist. Sie trägt keine Semantik, sondern freien Text für die Leserschaft.

```text
┌──────────────┐         ┌───────────────────────────┐
│   Invoice    │- - - - -│ Net amounts only, VAT is  └─┐
└──────────────┘         │ added by the tax service.   │
                         └─────────────────────────────┘
```

Hinweise zum Einsatz von Notizen:

- Eine Notiz erklärt das *Warum*, nicht das *Was*, die Wiederholung des Elementnamens in Prosa trägt nichts bei.
- Eine Notiz darf über mehrere gestrichelte Linien an mehreren Elementen hängen.
- Annahmen, offene Fragen und Entscheidungen samt ihrer Begründung sind typische Inhalte.
- Ein Modell, das erst durch seine Notizen verständlich wird, hat meist ein strukturelles Problem.

---

## Tagged Values

Ein Tagged Value hängt einem Modellelement eine benannte Eigenschaft an, geschrieben als `name = value` in geschweiften Klammern. Tagged Values werden üblicherweise von einem Stereotyp eingeführt, das festlegt, welche Tags es gibt und was sie bedeuten.

```text
┌───────────────────────────────────┐
│             «entity»              │
│             Customer              │
│ {table = "CUST", schema = "crm"}  │
└───────────────────────────────────┘
```

Typische Anwendungen:

- Technische Abbildungsinformationen, z.B. ein Tabellen- oder Spaltenname für die Persistenz
- Prozess-Metadaten wie `{author = "Team A", version = "1.2", status = "reviewed"}`
- Nichtfunktionale Anforderungen wie `{maxResponseTime = "200ms"}`
- Hinweise für die Codegenerierung, die eine modellgetriebene Werkzeugkette auswertet

Mehrere Tagged Values werden durch Kommas innerhalb eines Klammerpaares getrennt oder zeilenweise in einer Notiz am Element notiert.

---

## Constraints

Ein Constraint ist eine Bedingung, die erfüllt sein muss, damit das Modell gültig ist. Er wird in geschweiften Klammern notiert, entweder direkt am Element oder in einer angehängten Notiz.

| Constraint             | Gilt für              | Bedeutung                                                   |
| ---------------------- | --------------------- | ----------------------------------------------------------- |
| `{readOnly}`           | Attribut, Ende        | Der Wert wird einmal gesetzt und danach nicht mehr geändert |
| `{abstract}`           | Klasse, Operation     | Keine Implementierung, Alternative zur Kursivschrift        |
| `{xor}`                | Zwei Assoziationen    | Genau eine der beiden Assoziationen darf instanziiert sein  |
| `{complete, disjoint}` | Generalisierungsmenge | Jedes Objekt gehört zu genau einer Unterklasse              |

Ein Constraint in freiem Text ist ebenso zulässig und in der Praxis deutlich häufiger:

```text
┌──────────────┐         ┌─────────────────────────────┐
│   Account    │- - - - -│ {balance >= overdraftLimit} └─┐
└──────────────┘         └───────────────────────────────┘
```

### OCL

Für Bedingungen, die formal formuliert werden müssen, definiert die OMG die **Object Constraint Language** (OCL), eine eigene textuelle Sprache, die zusammen mit der UML eingesetzt wird. Die Bedingung aus der Notiz oben in OCL:

```text
context Account
  inv: balance >= overdraftLimit
```

`context` benennt die Klasse, für die die Bedingung gilt, `inv` kennzeichnet eine Invariante, also eine Bedingung, die jederzeit erfüllt sein muss. In der Praxis genügt meist eine informelle Bedingung in geschweiften Klammern, entscheidend ist, dass sie am richtigen Element hängt.

---

## Rollennamen und Navigierbarkeit

Ein Assoziationsende kann einen **Rollennamen** tragen, der angibt, welche Rolle die Klasse in dieser Beziehung spielt. Der Rollenname steht an dem Ende, das er beschreibt, wird kleingeschrieben und wird in der Implementierung zum Attributnamen.

```text
┌──────────────┐ employer        employee ┌──────────────┐
│   Company    ├──────────────────────────┤    Person    │
└──────────────┘ 1                    0..*└──────────────┘
```

Lesart: Eine `Person` hat genau eine `Company` in der Rolle `employer`, eine `Company` hat null oder mehr `Person`-Objekte in der Rolle `employee`. Die Implementierung trüge ein Feld `employer` in `Person` und eine Sammlung `employee` in `Company`.

Unverzichtbar werden Rollennamen, sobald zwei Klassen mehrfach verbunden sind oder eine Klasse mit sich selbst assoziiert ist:

```text
┌────────────────────┐
│      Employee      │
└──┬──────────────┬──┘
   │ 0..1         │ 0..*
   │ supervisor   │ subordinate
   └──────────────┘
```

Lesart: Ein `Employee` hat höchstens einen anderen `Employee` in der Rolle `supervisor` und null oder mehr in der Rolle `subordinate`.

Elemente, die einer Assoziation eine Richtung geben:

- **Leserichtung (`▶`):** neben dem Assoziationsnamen, reine Lesehilfe
- **Navigierbarkeit (offene Pfeilspitze):** an einem Ende, dieses Ende ist vom anderen aus erreichbar
- **Nicht-Navigierbarkeit (kleines Kreuz `x`):** an einem Ende, dieses Ende ist ausdrücklich nicht erreichbar
- **Keine Pfeilspitzen:** Navigierbarkeit unbestimmt, in der Praxis als *in beide Richtungen navigierbar* gelesen

---

## Namenskonventionen

Die folgenden Konventionen sind nicht Teil der UML-Spezifikation, in der Praxis jedoch nahezu durchgängig üblich.

| Element          | Konvention                              | Beispiel                      |
| ---------------- | --------------------------------------- | ----------------------------- |
| Klasse           | PascalCase, Substantiv im Singular      | `Invoice`, `CustomerAccount`  |
| Schnittstelle    | PascalCase, oft ein Adjektiv            | `Printable`, `Comparable`     |
| Attribut         | camelCase, Substantiv                   | `orderDate`, `totalAmount`    |
| Operation        | camelCase, Verb + Objekt                | `calculateTotal()`            |
| Rollenname       | camelCase, Substantiv der Rolle         | `employer`, `lineItems`       |
| Assoziationsname | Verb in der dritten Person Singular     | `places`, `contains`          |
| Paket            | Kleinschreibung, Singular               | `billing`, `reporting`        |
| Anwendungsfall   | Verb + Objekt im Infinitiv              | `Place order`                 |
| Akteur           | Rollenbezeichnung, nie ein Personenname | `Customer`, `Payment Service` |
| Aktion           | Verb + Objekt im Infinitiv              | `Validate order`              |
| Zustand          | Adjektiv oder Partizip                  | `Paid`, `Awaiting approval`   |
| Komponente       | Substantiv, das den Dienst benennt      | `OrderService`                |
| Knoten           | Substantiv für Gerät oder Host          | `Application Server`          |

Für alle gilt zusätzlich:

- Ein Name für einen Begriff im gesamten Modell, eine Klasse `Customer` im einen Diagramm heißt im nächsten nicht `Client`.
- Die Sprache des Modells wird einmal für das gesamte Modell festgelegt und nicht gemischt.

---

## Diagrammrahmen

Jedes UML-Diagramm darf in einen Rahmen gezeichnet werden: ein Rechteck, dessen linke obere Ecke eine fünfeckige Lasche mit Diagrammart und Diagrammnamen trägt.

```text
┌─────────────────────────────────────────────┐
│ sd Place Order ╱                            │
├───────────────┘                             │
│                                             │
│          (contents of the diagram)          │
│                                             │
└─────────────────────────────────────────────┘
```

Der Rahmenkopf folgt dem Muster `<kind> <name>`, optional mit Parametern. Gebräuchliche Schlüsselwörter für die Diagrammart, in der Kurzform und in der Langform, die Werkzeuge ebenfalls akzeptieren:

| Kurz  | Lang            | Diagramm                            |
| ----- | --------------- | ----------------------------------- |
| `sd`  | `interaction`   | Sequenz, Kommunikation, Zeitverlauf |
| `act` | `activity`      | Aktivität                           |
| `stm` | `state machine` | Zustandsautomat                     |
| `cmp` | `component`     | Komponente                          |
| `dep` | `deployment`    | Verteilung                          |
| `cls` | `class`         | Klasse                              |
| `uc`  | `use case`      | Anwendungsfall                      |
| `pkg` | `package`       | Paket                               |

Wann der Rahmen nicht optional, sondern erforderlich ist:

- Im [Sequenzdiagramm](./sequence-diagram.md), wo der Rahmen zum Standard gehört und verschachtelte kombinierte Fragmente (`alt`, `opt`, `loop`, `ref`) selbst als Rahmen gezeichnet werden
- Sobald ein Diagramm aus einem anderen heraus referenziert wird, denn der Verweis nutzt den Rahmennamen
- Sobald mehrere Diagramme auf einer Seite oder in einem Dokument stehen und unterschieden werden müssen

Bei einem einzelnen Diagramm auf einer eigenen Seite wird der Rahmen meist weggelassen und durch eine Überschrift ersetzt.

---

## Abbildung auf Code

| Notation             | Konstrukt im Programm                                   |
| -------------------- | ------------------------------------------------------- |
| `+`                  | `public`                                                |
| `-`                  | `private`                                               |
| `#`                  | `protected`                                             |
| `~`                  | Paketsichtbar in Java, `internal` in C#                 |
| Unterstrichener Name | `static`                                                |
| `/` vor einem Namen  | Getter, der den Wert berechnet, ohne gespeichertes Feld |
| `1`                  | Feld, das nicht `null` sein darf                        |
| `0..1`               | Nullable-Feld, `Optional<T>`, `T?`                      |
| `{readOnly}`         | `final`, `readonly`, `const`                            |
| `<<interface>>`      | `interface`                                             |
| `<<enumeration>>`    | `enum`                                                  |
| `{abstract}`         | `abstract class`                                        |
| Rollenname           | Name des Feldes, das die Referenz hält                  |
| `inv` in OCL         | Prüfung im Konstruktor und in jedem Setter              |

---

## Häufige Fehler

1. **`-` als Gedankenstrich missverstehen:** Ein führendes `-` ist das Sichtbarkeitszeichen *private* und keine Dekoration, ein privates Attribut ist aus einer anderen Klasse nicht zugreifbar.
2. **`*` als "viele, aber mindestens eines" lesen:** `*` bedeutet `0..*`, wird mindestens ein Objekt verlangt, lautet die Notation `1..*`.
3. **Multiplizität am falschen Ende:** Die Multiplizität neben einer Klasse gibt an, wie viele Objekte *dieser* Klasse beteiligt sind, gesehen vom gegenüberliegenden Ende.
4. **Geschweifte Klammern und Guillemets vertauscht:** `{...}` enthält einen Constraint oder einen Tagged Value, `«...»` ein Schlüsselwort oder ein Stereotyp, beides ist nicht austauschbar.
5. **Stereotypen ohne Definition:** Ein erfundenes Stereotyp, das nirgends erklärt wird, ist Dekoration und keine Information.
6. **Rollenname gleich dem Klassennamen:** Eine Rolle `customer` an einer Klasse `Customer` bringt nichts, ein Rollenname lohnt sich nur, wenn er mehr aussagt als der Typ.
7. **Notizen mit Modellsemantik:** Eine Bedingung, die das System durchsetzen muss, gehört in einen Constraint und nicht in eine Prosa-Notiz.
8. **Leserichtung mit Navigierbarkeit verwechseln:** Das ausgefüllte Dreieck `▶` betrifft den Satz, die offene Pfeilspitze den Zugriff.
9. **Gemischte Sprachen und uneinheitliche Namen:** Derselbe Begriff unter zwei Namen erzeugt zwei Begriffe im Kopf der Leserschaft.
10. **Sichtbarkeiten überall weglassen und dann alles public implementieren:** Eine unbestimmte Sichtbarkeit ist eine Lücke im Modell, keine Entscheidung.

---

## Werkzeuge

- draw.io / diagrams.net (kostenlos, browserbasiert, UML-Formenbibliothek enthalten)
- PlantUML (textbasiert, unterstützt Stereotypen, Tagged Values und Rahmen direkt im Quelltext)
- Mermaid (textbasiert, wird direkt in Markdown gerendert, unterstützt einen Teil der Notation)
- Visual Paradigm, StarUML, Enterprise Architect (kommerziell, mit Unterstützung für OCL)

## Siehe auch

- [UML-Übersicht](./uml-overview.mdx): die Diagrammarten der UML und ihr Verhältnis zueinander
- [Klassendiagramm](./class-diagram.md): dort werden Sichtbarkeit, Multiplizität und Rollennamen am intensivsten genutzt
- [Aktivitätsdiagramm](./activity-diagram.md): Notizen und Rahmen in einem Verhaltensdiagramm
- [Anwendungsfalldiagramm](./use-case-diagram.md): die Schlüsselwörter `<<include>>` und `<<extend>>` im Zusammenhang
- [Sequenzdiagramm](./sequence-diagram.md): Rahmen als kombinierte Fragmente
- [Zustandsdiagramm](./state-machine-diagram.md): Guards und Constraints an Transitionen
- [Komponentendiagramm](./component-diagram.md): Schlüsselwörter an Komponenten und Schnittstellen
- [Verteilungsdiagramm](./deployment-diagram.md): die Knoten-Schlüsselwörter `<<device>>` und `<<executionEnvironment>>`
- [Weitere UML-Diagramme](./further-uml-diagrams.md): die übrigen Diagrammarten und ihre Rahmen-Schlüsselwörter
- [ER-Modell](../databases/er-model.md): Kardinalitäten in der Datenmodellierung im Vergleich zu UML-Multiplizitäten
