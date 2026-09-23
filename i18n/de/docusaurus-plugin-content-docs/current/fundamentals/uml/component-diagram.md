---
title: "Komponentendiagramm"
description: "UML-Komponentendiagramme: Komponenten, angebotene und benötigte Schnittstellen, Assembly- und Delegation-Konnektoren, Ports, Artefakte und Manifestation, Schachtelung, Abhängigkeiten sowie die Abgrenzung zum Klassen- und zum Verteilungsdiagramm."
keywords:
    - UML
    - Komponentendiagramm
    - Komponente
    - Angebotene Schnittstelle
    - Benötigte Schnittstelle
    - Assembly-Konnektor
    - Delegation-Konnektor
    - Port
    - Artefakt
    - Softwarearchitektur
    - Strukturdiagramm
tags:
    - ap2
---

# Komponentendiagramm

## Überblick

Ein Komponentendiagramm ist ein **Strukturdiagramm** der UML. Es zeigt, wie ein System in austauschbare Bausteine zerlegt ist und welche Schnittstellen diese Bausteine einander anbieten und voneinander benötigen.

Eine Komponente im Sinne der UML ist ein modularer Teil eines Systems, dessen Innenleben verborgen ist und dessen Verhalten vollständig durch seine Schnittstellen festgelegt wird. Aus dieser Definition folgen zwei Dinge:

- Eine Komponente kann durch jede andere Komponente ersetzt werden, die dieselben Schnittstellen anbietet.
- Nichts außerhalb der Komponente darf davon abhängen, wie die Komponente intern arbeitet.

Typische Anwendungsfälle:

- Dokumentation der Architektur eines Systems als grobgranularer Überblick
- Festlegung des Schnittstellenvertrags zwischen Teams, bevor die Implementierung beginnt
- Sichtbarmachen von Abhängigkeiten, sodass zyklische oder übermäßige Kopplung auffällt
- Planung, welche Teile unabhängig voneinander gebaut, getestet, ausgeliefert oder ersetzt werden können

---

## Notation

| Element                                                                      | Notation                                                           | Bedeutung                                                                                             |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| [Komponente](#komponente)                                                    | Rechteck mit dem Schlüsselwort `<<component>>`                     | Ein austauschbarer, in sich geschlossener Teil des Systems                                            |
| [Komponentensymbol](#komponente)                                             | Kleines Rechteck mit zwei hervorstehenden Laschen, oben rechts     | Alternative Kennzeichnung einer Komponente, statt des Schlüsselworts oder zusammen mit ihm verwendbar |
| [Angebotene Schnittstelle](#angebotene-und-benötigte-schnittstellen)         | Linie, die in einem ausgefüllten Kreis endet (*Ball*, *Lollipop*)  | Leistung, die die Komponente ihrer Umgebung anbietet                                                  |
| [Benötigte Schnittstelle](#angebotene-und-benötigte-schnittstellen)          | Linie, die in einem Halbkreis endet (*Socket*)                     | Leistung, die die Komponente von ihrer Umgebung benötigt                                              |
| [Assembly-Konnektor](#assembly-konnektor)                                    | Socket, der über einen Ball gelegt wird                            | Die Anforderung der einen Komponente wird vom Angebot der anderen erfüllt                             |
| [Port](#ports-und-delegation-konnektoren)                                    | Kleines Quadrat auf dem Rand der Komponente                        | Benannter Interaktionspunkt, über den Schnittstellen nach außen geführt werden                        |
| [Delegation-Konnektor](#ports-und-delegation-konnektoren)                    | Pfeil von einem Port zu einer inneren Komponente                   | Leitet weiter, was am Port ankommt, an den Teil, der es bearbeitet                                    |
| [Schnittstelle](#angebotene-und-benötigte-schnittstellen) (Rechtecknotation) | Rechteck mit dem Schlüsselwort `<<interface>>`                     | Ausformulierter Vertrag mit seinen Operationen, ergänzt den Ball, der nur den Namen trägt             |
| [Abhängigkeit](#abhängigkeiten)                                              | Gestrichelter Pfeil mit offener Pfeilspitze                        | Die Quelle benötigt das Ziel, ohne benannte Schnittstelle                                             |
| [Artefakt](#artefakte-und-manifestation)                                     | Rechteck mit dem Schlüsselwort `<<artifact>>`                      | Eine physische Datei: `.jar`, `.dll`, `.war`, Skript, Konfigurationsdatei                             |
| [Manifestation](#artefakte-und-manifestation)                                | Gestrichelter Pfeil mit `<<manifest>>` vom Artefakt zur Komponente | Das Artefakt ist die physische Realisierung dieser Komponente                                         |
| [Geschachtelte Komponente](#geschachtelte-komponenten)                       | Komponente, die innerhalb einer anderen Komponente gezeichnet wird | Innere Struktur, die *Teile*, aus denen die äußere Komponente besteht                                 |
| Notiz                                                                        | Rechteck mit geknickter Ecke an gestrichelter Linie                | Kommentar ohne Semantik                                                                               |

Benennungsregeln, die ein Diagramm lesbar halten:

- Komponenten werden nach ihrer Verantwortlichkeit als Substantiv benannt: `PaymentService`, nicht `DoPayment` und nicht `Payments2`.
- Schnittstellen werden nach der Leistung benannt, üblicherweise mit führendem `I`: `IPayment`, `IInventory`.
- Derselbe Schnittstellenname bezeichnet immer denselben Vertrag. Ein Diagramm darf nicht einen Namen für zwei verschiedene Dinge verwenden.

---

## Bausteine

### Komponente

Eine Komponente hat keine feste Größe. Typisch sind ein eigenständig auslieferbarer Dienst, eine Bibliothek, eine Schicht der Architektur oder ein abgegrenzter fachlicher Bereich.

```text
 ╭──────────────────────╮
 │ <<component>>     ⊞  │
 │ PaymentService       │
 ╰──────────────────────╯
```

### Angebotene und benötigte Schnittstellen

Abhängigkeiten zwischen Komponenten werden, wo immer möglich, über Schnittstellen ausgedrückt, niemals über direkten Zugriff auf Interna. Zur Ausnahme siehe [Abhängigkeiten](#abhängigkeiten).

- Eine **angebotene Schnittstelle** wird als Linie mit einem ausgefüllten Kreis am Ende gezeichnet. Sie ist die Zusage *das wird angeboten und darf genutzt werden*.
- Eine **benötigte Schnittstelle** wird als Linie mit einem Halbkreis am Ende gezeichnet. Sie ist die Forderung *das wird gebraucht, jemand muss es liefern*.

```text
   angebotene Schnittstelle            benötigte Schnittstelle
   (Ball, Lollipop)                    (Socket)

 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │            │ <<component>>     ⊞  │
 │ PaymentService       │───○        │ OrderService         │───C
 ╰──────────────────────╯            ╰──────────────────────╯
```

Der Ball trägt lediglich den Namen der Schnittstelle. Sobald die Operationen selbst von Bedeutung sind, wird die Schnittstelle zusätzlich als Rechteck mit dem Schlüsselwort `<<interface>>` und ihrer Operationsliste gezeichnet und mit dem Ball verbunden.

### Assembly-Konnektor

Ein Assembly-Konnektor verbindet eine benötigte Schnittstelle mit einer angebotenen. Grafisch wird der Socket über den Ball gelegt, weshalb die Notation auch *Ball and Socket* genannt wird.

```text
 ╭──────────────────────╮            ╭──────────────────────╮
 │ <<component>>     ⊞  │ IPayment   │ <<component>>     ⊞  │
 │ OrderService         │───C○───────│ PaymentService       │
 ╰──────────────────────╯            ╰──────────────────────╯
```

Der Konnektor sagt aus, dass `OrderService` den `PaymentService` **ausschließlich** über `IPayment` nutzt. Jede Komponente, die `IPayment` anbietet, kann an die Stelle von `PaymentService` treten.

### Ports und Delegation-Konnektoren

Ein Port ist ein ausdrücklich benannter Interaktionspunkt auf dem Rand einer Komponente. Er wird als kleines Quadrat auf dem Rand gezeichnet und bündelt die Schnittstellen, die an dieser Stelle erreichbar sind. Ports werden nützlich, sobald eine Komponente dieselbe Schnittstelle an mehreren Stellen anbietet, etwa einen internen und einen externen Zugang mit unterschiedlichen Zugriffsregeln.

Innerhalb der Komponente führt ein Delegation-Konnektor vom Port zu dem Teil, der die Anfrage tatsächlich bearbeitet.

```text
               IOrdering
                   ○
                   │
 ╭─────────────────■─────────────────────────────────────────────╮
 │ <<component>>   │                                          ⊞  │
 │ OrderManagement │  Delegation                                 │
 │                 │                                             │
 │    ╭────────────┴─────────╮            ╭──────────────────╮   │
 │    │ <<component>>     ⊞  │  IPricing  │ <<component>> ⊞  │   │
 │    │ OrderIntake          │───C○───────│ PricingEngine    │   │
 │    ╰──────────────────────╯            ╰──────────────────╯   │
 │                                                               │
 ╰───────────────────────────────────────────────────────────────╯
```

Die Außenwelt sieht am Port nur `IOrdering`. Dass dahinter `OrderIntake` und `PricingEngine` liegen und wie sie verdrahtet sind, darf jederzeit geändert werden.

### Geschachtelte Komponenten

Komponenten dürfen weitere Komponenten enthalten. Die inneren sind die *Teile*, aus denen die äußere zusammengesetzt ist. Erst die Schachtelung macht das Komponentendiagramm zu einem Werkzeug für mehrere Abstraktionsebenen: Die oberste Ebene zeigt eine Handvoll Teilsysteme, und jedes davon darf in einem eigenen Diagramm verfeinert werden.

Zwei Regeln halten die Verfeinerung widerspruchsfrei:

- Jede Schnittstelle der äußeren Komponente wird entweder an einen inneren Teil delegiert oder von der äußeren Komponente selbst realisiert.
- Ein innerer Teil wird nie direkt nach außen verbunden. Die Verbindung läuft immer über einen Port der umschließenden Komponente.

### Artefakte und Manifestation

Eine Komponente ist eine logische Einheit, ein Artefakt ist eine physische Datei. Die Beziehung zwischen beiden heißt *Manifestation* und wird als gestrichelter Pfeil mit dem Schlüsselwort `<<manifest>>` vom Artefakt zur Komponente gezeichnet.

```text
 ╭──────────────────────────────╮
 │ <<artifact>>                 │
 │ payment-service.jar          │
 ╰───────────────┬──────────────╯
                 ╎
                 ╎ <<manifest>>
                 ▼
 ╭───────────────────────────────╮
 │ <<component>>              ⊞  │
 │ PaymentService                │
 ╰───────────────────────────────╯
```

Die Zuordnung muss nicht eins zu eins sein. Ein Artefakt kann mehrere Komponenten manifestieren, und eine Komponente kann sich über mehrere Artefakte verteilen, z.B. über eine Implementierung und eine separate Konfigurationsdatei.

### Abhängigkeiten

Neben Schnittstellen kann eine einfache Abhängigkeit als gestrichelter Pfeil mit offener Pfeilspitze gezeichnet werden. Sie bedeutet *die Quelle benötigt das Ziel*, ohne einen Vertrag zu benennen, und ist die schwächere, unschärfere Aussage.

Eine Abhängigkeit ist für Beziehungen angemessen, die tatsächlich keine eigene Schnittstelle besitzen, etwa die Nutzung eines gemeinsamen Datenmodells oder eines Fremdsystems, das nicht weiter modelliert wird. Überall dort, wo eine Schnittstelle existiert, ist die Ball-and-Socket-Notation vorzuziehen, denn nur sie sagt aus, *worüber* die Abhängigkeit läuft.

---

## Abbildung auf die Implementierung

| Komponentendiagramm      | Typische Implementierung                                                           |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Komponente               | Auslieferbarer Dienst, Maven-/Gradle-Modul, npm-Paket, .NET-Assembly               |
| Angebotene Schnittstelle | Öffentliche API eines Moduls, REST-Ressource, Nachrichten-Topic                    |
| Benötigte Schnittstelle  | Injizierte Abhängigkeit, Client-Stub                                               |
| Assembly-Konnektor       | Verdrahtung im Dependency-Injection-Container oder im Composition Root             |
| Port                     | Veröffentlichter Endpunkt, z.B. eine Basis-URL oder ein Queue-Name                 |
| Delegation-Konnektor     | Weiterleitung vom Eintrittspunkt an die interne Klasse, die die Anfrage bearbeitet |
| Artefakt                 | Build-Ergebnis: `.jar`, `.dll`, `.war`, Container-Image, Bundle                    |
| Manifestation            | Der Build-Schritt, der den Code einer Komponente in diese Datei verpackt           |
| Abhängigkeit             | Import oder `require` ohne vereinbarten Vertrag                                    |

---

## Abgrenzung zu anderen Diagrammen

### Komponentendiagramm und Klassendiagramm

| Aspekt               | Komponentendiagramm                             | Klassendiagramm                            |
| -------------------- | ----------------------------------------------- | ------------------------------------------ |
| Dargestellte Einheit | Teilsystem, Dienst, Modul                       | Klasse, Attribut, Operation                |
| Granularität         | Grob, eine Handvoll Kästen je Diagramm          | Fein, oft Dutzende von Klassen             |
| Art der Beziehung    | Angebotene/benötigte Schnittstelle, Assembly    | Assoziation, Vererbung, Aggregation        |
| Beantwortete Frage   | Welche Teile gibt es und wie sind sie gekoppelt | Wie ist ein Teil intern aufgebaut          |
| Typische Leserschaft | Architektur, Teamgrenzen, Planung               | Implementierung einer einzelnen Komponente |

### Komponentendiagramm und Verteilungsdiagramm

Ein Komponentendiagramm ist *logisch*, ein [Verteilungsdiagramm](./deployment-diagram.md) ist *physisch*.

| Aspekt             | Komponentendiagramm                           | Verteilungsdiagramm                             |
| ------------------ | --------------------------------------------- | ----------------------------------------------- |
| Hauptelement       | Komponente                                    | Knoten: Hardware, virtuelle Maschine, Container |
| Beantwortete Frage | Wie ist die Software strukturiert             | Wo läuft die Software                           |
| Beziehungen        | Schnittstellen und Konnektoren                | Kommunikationspfade, Protokolle                 |
| Artefakte          | Erscheinen als Manifestation einer Komponente | Erscheinen als Verteilung auf einen Knoten      |

---

## Beispiel: Online-Shop

Der Shop besteht aus einer Benutzeroberfläche, einem Bestelldienst, einem Zahlungsdienst und einem Bestandsdienst. Die Benutzeroberfläche weiß nichts darüber, wie Bestellungen verarbeitet werden, sie benötigt lediglich `IOrdering`. Der Bestelldienst wiederum benötigt `IPayment` und `IStock` und weiß nicht, welche Komponenten diese liefern.

```text
 ╭────────────────────╮          ╭────────────────────╮          ╭────────────────────╮
 │ <<component>>   ⊞  │IOrdering │ <<component>>   ⊞  │IPayment  │ <<component>>   ⊞  │
 │ ShopUI             │───C○─────│ OrderService       │───C○─────│ PaymentService     │
 ╰────────────────────╯          ╰──────────┬─────────╯          ╰────────────────────╯
                                            ∩
                                            ○  IStock
                                            │
                                 ╭──────────┴─────────╮
                                 │ <<component>>   ⊞  │
                                 │ StockService       │
                                 ╰────────────────────╯
```

Was sich aus diesem Beispiel ablesen lässt:

- `ShopUI` hat genau einen Socket und ist damit an einen einzigen Vertrag gekoppelt. Eine zweite Oberfläche, etwa eine mobile App, lässt sich ergänzen, ohne hinter `IOrdering` etwas zu ändern.
- `OrderService` trägt zwei Sockets. Ein Test von `OrderService` muss beide belegen, mit `PaymentService` und `StockService` oder mit Testdoubles. Jeder weitere Socket ist eine weitere Abhängigkeit, die bereitgestellt werden muss, deshalb ist eine Komponente mit vielen Sockets schwer isoliert zu testen.

Eine realitätsnahe Erweiterung würde `OrderService`, `PaymentService` und `StockService` in einer Komponente `Backend` zusammenfassen, die einen einzigen Port besitzt, an dem `IOrdering` angeboten und an `OrderService` delegiert wird. `ShopUI` wäre dann mit diesem Port verbunden, und die innere Struktur des Backends würde austauschbar.

---

## Häufige Fehler

1. **Komponenten ohne Schnittstelle verbunden:** Eine einfache Linie zeigt, dass zwei Komponenten gekoppelt sind, aber nicht über welchen Vertrag. Wo eine Schnittstelle existiert, wird sie als Ball und Socket gezeichnet.
2. **Ball und Socket vertauscht:** Der ausgefüllte Kreis gehört zu der Komponente, die die Leistung *anbietet*, der Halbkreis zu derjenigen, die sie *benötigt*.
3. **Benötigte Schnittstelle ohne Anbieter:** Ein offener Socket bedeutet, dass das System nicht lauffähig ist. Entweder fehlt eine Komponente oder die Anforderung ist überholt.
4. **Klassen als Komponenten gezeichnet:** Attribute, Operationen und Assoziationen gehören in das Klassendiagramm.
5. **Innere Teile über die Grenze hinweg verbunden:** Ein Konnektor von einer inneren Komponente direkt nach außen umgeht den Port der umschließenden Komponente.
6. **Zyklische Abhängigkeiten:** Zwei Komponenten, die jeweils die Schnittstelle der anderen benötigen, lassen sich nicht mehr getrennt bauen, ausliefern oder ersetzen.
7. **Ein Schnittstellenname für verschiedene Verträge:** Zwei Bälle mit demselben Namen müssen dieselben Operationen anbieten.
8. **Komponente und Artefakt verwechselt:** `PaymentService` ist die Komponente, `payment-service.jar` das Artefakt, das sie manifestiert.
9. **Zu viele Komponenten in einem Diagramm:** Zu viele Kästen machen ein Diagramm unlesbar. Details gehören in ein eigenes Diagramm, das eine einzelne Komponente verfeinert.

---

## Werkzeuge

- draw.io / diagrams.net (kostenlos, browserbasiert, UML-Formenbibliothek enthalten)
- PlantUML (textbasiert, das Diagramm wird aus Quelltext erzeugt und lässt sich versionieren)
- Mermaid (textbasiert, wird auf vielen Plattformen direkt in Markdown gerendert)
- Visual Paradigm, StarUML, Lucidchart (kommerziell, mit kostenlosen Tarifen)

## Siehe auch

- [Klassendiagramm](./class-diagram.md): die feingranulare Struktur innerhalb einer einzelnen Komponente
- [Verteilungsdiagramm](./deployment-diagram.md): das physische Gegenstück, das zeigt, wo die Artefakte der Komponenten laufen
- [Sequenzdiagramm](./sequence-diagram.md): zeigt, wie die Komponenten im zeitlichen Verlauf über ihre Schnittstellen zusammenwirken
- [Aktivitätsdiagramm](./activity-diagram.md): die Abläufe, die quer über die Komponenten laufen
- [UML-Überblick](./uml-overview.mdx): Einordnung der Diagrammarten
- [Grundlagen der UML-Notation](./uml-notation-basics.md): Schlüsselwörter, Stereotypen, Notizen und die Elemente, die alle Diagrammarten gemeinsam haben
