---
title: "Weitere UML-Diagramme"
description: "Objekt-, Paket-, Kommunikations-, Zeitverlaufs-, Interaktionsübersichts-, Kompositionsstruktur- und Profildiagramm: Zweck, zentrale Notationselemente, typischer Einsatz und die Abgrenzung zum nächstverwandten UML-Diagramm."
keywords:
    - UML
    - Objektdiagramm
    - Paketdiagramm
    - Kommunikationsdiagramm
    - Zeitverlaufsdiagramm
    - Interaktionsübersichtsdiagramm
    - Kompositionsstrukturdiagramm
    - Profildiagramm
    - Stereotyp
    - Strukturdiagramm
    - Verhaltensdiagramm
tags:
    - ap2
---

# Weitere UML-Diagramme

## Überblick

Die UML 2.5 definiert vierzehn Diagrammarten. Die sieben, die keinen eigenen Eintrag haben, sind hier zusammengefasst.

| Diagramm                       | Kategorie | Kernfrage                                                                            |
| ------------------------------ | --------- | ------------------------------------------------------------------------------------ |
| Objektdiagramm                 | Struktur  | Welche konkreten Instanzen existieren zu einem Zeitpunkt und wie sind sie verbunden? |
| Paketdiagramm                  | Struktur  | Wie ist das Modell in Einheiten geschnitten und welche Einheit hängt von welcher ab? |
| Kommunikationsdiagramm         | Verhalten | Welche Objekte tauschen über welche Verbindungen Nachrichten aus?                    |
| Zeitverlaufsdiagramm           | Verhalten | In welchem Zustand befindet sich ein Element an welcher Stelle der Zeitachse?        |
| Interaktionsübersichtsdiagramm | Verhalten | In welcher Reihenfolge laufen ganze Interaktionen ab?                                |
| Kompositionsstrukturdiagramm   | Struktur  | Wie ist ein Klassifizierer innen aufgebaut und über welche Ports kommuniziert er?    |
| Profildiagramm                 | Struktur  | Wie wird die UML selbst für eine Domäne oder eine Plattform erweitert?               |

---

## Objektdiagramm

Eine Momentaufnahme des Systems zu einem bestimmten Zeitpunkt: die vorhandenen Instanzen und die Verbindungen zwischen ihnen. Die Notation ist die des [Klassendiagramms](./class-diagram.md), allerdings auf Instanzebene.

Zentrale Notationselemente:

- **Instanzspezifikation:** Rechteck mit unterstrichenem Namen in der Form `name : Class`; Name oder Klasse dürfen entfallen (`o7 : Order`, `: Order`, `o7`)
- **Attributwerte:** im unteren Abschnitt als `attribute = value`
- **Link:** einfache durchgezogene Linie zwischen zwei Instanzen, das Gegenstück zur Assoziation auf Instanzebene; ohne Multiplizitäten, da ein Link stets genau zwei Instanzen verbindet

Reiner Text kann keine Unterstreichung darstellen, in der echten Notation sind die Namen `m1 : Customer` und `o7 : Order` unterstrichen:

```text
 ┌────────────────────┐              ┌────────────────────┐
 │ m1 : Customer      │   places     │ o7 : Order         │
 ├────────────────────┤──────────────├────────────────────┤
 │ name = "Meier"     │              │ total = 249.90     │
 │ city = "Kiel"      │              │ status = "paid"    │
 └────────────────────┘              └────────────────────┘
```

Typischer Einsatz: Erläuterung eines komplizierten Klassendiagramms anhand eines ausgearbeiteten Beispiels, Besprechung einer konkreten Datenkonstellation, Dokumentation von Testdaten oder des Zustands, in dem ein Fehler auftritt.

---

## Paketdiagramm

Ein Paketdiagramm zeigt, wie ein Modell in Einheiten geschnitten ist und welche Einheit von welcher abhängt. Pakete tragen kein eigenes Verhalten.

Zentrale Notationselemente:

- **Paket:** Rechteck mit Reiter; Schachtelung grafisch oder als `shop::service` notiert
- **Abhängigkeit:** gestrichelter Pfeil vom nutzenden zum genutzten Paket
- **`«import»`:** macht die öffentlichen Elemente des Zielpakets ohne Qualifizierung nutzbar
- **`«access»`:** dieselbe Beziehung, jedoch ohne die importierten Namen weiterzureichen
- **`«merge»`:** kopiert den Inhalt des Zielpakets konzeptionell in das Quellpaket und verschmilzt ihn mit diesem
- **Schichtung:** Pakete übereinander angeordnet, alle Abhängigkeiten zeigen in eine Richtung

```text
┌──────┐
│ shop │
├──────┴──────────────────┐
│                         │
│   ┌─────────┐           │
│   │ ui      │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────┐           │
│   │ service │           │
│   ├─────────┴───────┐   │
│   │                 │   │
│   └────────┬────────┘   │
│            ┆ «import»   │
│            ▼            │
│   ┌─────────────┐       │
│   │ persistence │       │
│   ├─────────────┴───┐   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
└─────────────────────────┘
```

Typischer Einsatz: Schichtenarchitekturen, Schnitt eines Systems in Module, Sichtbarmachen zyklischer Abhängigkeiten, bevor sie im Code landen.

Abgrenzung: Ein [Komponentendiagramm](./component-diagram.md) beschreibt austauschbare Bausteine, die zur Laufzeit Schnittstellen anbieten und benötigen, ein Paketdiagramm ordnet lediglich Modell- und Quellelemente zur Entwurfszeit.

---

## Kommunikationsdiagramm

Ein Kommunikationsdiagramm zeigt, welche Objekte Nachrichten austauschen und über welche Verbindungen das geschieht. Die Objekte werden frei angeordnet, die Reihenfolge der Nachrichten ergibt sich aus ihrer Nummerierung.

Zentrale Notationselemente:

- **Objekt:** Rechteck mit unterstrichenem `name : Class` wie im Objektdiagramm
- **Link:** durchgezogene Linie zwischen zwei Objekten
- **Nachricht:** kleiner Pfeil neben dem Link, beschriftet mit `1: placeOrder()`
- **Hierarchische Sequenznummern:** `1`, `1.1`, `1.2`, wobei `1.1` und `1.2` nacheinander im Zuge der Verarbeitung von Nachricht `1` verschickt werden
- **Iterationsmarke und Guards:** `*` und `[condition]` als Teil der Nachrichtenbeschriftung

```text
  ┌──────────┐   1: placeOrder() ►  ┌─────────────┐
  │ : Client │──────────────────────│ : OrderCtrl │
  └──────────┘   ◄ 1.3: confirm()   └─────────────┘
                                           │
                                           │ ▼ 1.1: checkStock()
                                           │ ▼ 1.2: reserve()
                                           │
                                    ┌─────────────┐
                                    │ : Warehouse │
                                    └─────────────┘
```

Typischer Einsatz: Sichtbarmachen, welche Objekte miteinander kommunizieren, Beurteilung der Kopplung eines Entwurfs, kleine Interaktionen, bei denen die Struktur wichtiger ist als die genaue Reihenfolge.

Abgrenzung: Ein [Sequenzdiagramm](./sequence-diagram.md) zeigt dieselbe Interaktion entlang einer expliziten Zeitachse von oben nach unten und bietet kombinierte Fragmente wie `alt`, `opt` und `loop`. Objekte, Nachrichten und deren Reihenfolge lassen sich von einem Diagramm ins andere überführen, für die kombinierten Fragmente hat das Kommunikationsdiagramm kein Gegenstück. Alternativen und Schleifen sind im Sequenzdiagramm leichter zu lesen, das Netz der Verbindungen ist im Kommunikationsdiagramm besser erkennbar.

---

## Zeitverlaufsdiagramm

Ein Zeitverlaufsdiagramm (Timing Diagram) zeigt, wie sich der Zustand oder der Wert eines oder mehrerer Elemente entlang einer expliziten Zeitachse entwickelt.

Zentrale Notationselemente:

- **Zeitachse:** waagerecht, mit Skala, eine Bahn je Lebenslinie
- **Zustandslebenslinie:** Treppenlinie zwischen den senkrecht aufgelisteten Zuständen
- **Wertelebenslinie:** kompakte Bandform, bei der eine Kreuzung den Wertwechsel markiert
- **Zeitdauer- und Zeitpunktbedingung:** `{d..3*d}` und `{t = 0}`
- **Ereignisse und Nachrichten:** Pfeile zwischen den Bahnen
- **Teilstriche:** Einheiten der Zeitskala

```text
 : Motor
           │
   active  │         ┌──────────────┐
           │         │              │
   idle    ├─────────┘              └──────────
           │         ├── {20..40} ──┤
           └────┬────┬────┬────┬────┬────┬────┬───► t
           0    10   20   30   40   50   60   70  ms
```

Typischer Einsatz: Echtzeit- und eingebettete Systeme, Bus- und Netzprotokolle, hardwarenahe Steuerungen, Anforderungen an Latenz, Zeitüberschreitungen und Mindesthaltezeiten.

Abgrenzung: Ein [Zustandsdiagramm](./state-machine-diagram.md) legt fest, welche Zustände und Übergänge möglich sind, ohne Zeitachse. Ein Zeitverlaufsdiagramm zeigt, wann sich ein Element in welchem dieser Zustände befindet.

---

## Interaktionsübersichtsdiagramm

Ein Interaktionsübersichtsdiagramm ordnet mehrere Sequenz-, Kommunikations- oder Zeitverlaufsdiagramme zu einem Kontrollfluss an, jeder Knoten ist dabei eine vollständige Interaktion.

Zentrale Notationselemente:

- **Rahmen:** mit der Kopfzeile `sd <name>`
- **Interaktionsverwendung:** Rechteck mit dem Schlüsselwort `ref` und dem Namen eines vorhandenen Interaktionsdiagramms
- **Eingebettete Interaktion:** ein kleines Sequenzdiagramm direkt als Knoten
- **Kontrollelemente:** alle des Aktivitätsdiagramms, d.h. Startknoten, Entscheidung, Zusammenführung, Parallelisierung, Synchronisation, Endknoten

```text
 ┌ sd Checkout ─────────────────────────────┐
 │                  ●                       │
 │                  │                       │
 │                  ▼                       │
 │          ┌───────────────┐               │
 │          │ ref  Login    │               │
 │          └───────────────┘               │
 │                  │                       │
 │             ╱─────────╲                  │
 │            ╱  paid ?   ╲                 │
 │            ╲           ╱                 │
 │             ╲─────────╱                  │
 │       [yes]  │       │  [no]             │
 │     ┌────────┘       └────────┐          │
 │     ▼                         ▼          │
 │ ┌───────────────┐   ┌───────────────┐    │
 │ │ ref  Ship     │   │ ref  Cancel   │    │
 │ └───────────────┘   └───────────────┘    │
 │     │                         │          │
 │     └────────┐       ┌────────┘          │
 │              ▼       ▼                   │
 │                  ◉                       │
 └──────────────────────────────────────────┘
```

Typischer Einsatz: Gesamtsicht auf ein Protokoll oder auf einen lang laufenden Geschäftsvorfall, der aus vielen Einzelinteraktionen besteht.

Abgrenzung: Ein [Aktivitätsdiagramm](./activity-diagram.md) verwendet dieselben Kontrollelemente, seine Knoten sind jedoch einzelne Aktionen. Das Interaktionsübersichtsdiagramm ist zugleich eine Alternative zu einem überladenen Sequenzdiagramm mit vielen geschachtelten `alt`- und `loop`-Fragmenten.

---

## Kompositionsstrukturdiagramm

Ein Kompositionsstrukturdiagramm blickt in einen einzelnen Klassifizierer hinein: aus welchen Teilen er besteht, wie diese Teile verdrahtet sind und über welche Interaktionspunkte er mit seiner Umgebung verbunden ist.

Zentrale Notationselemente:

- **Part:** Rechteck innerhalb des Rahmens des Klassifizierers, notiert als `role : Type` mit optionaler Multiplizität, z.B. `wheels : Wheel [4]`
- **Port:** kleines Quadrat auf dem Rand des Klassifizierers, ein benannter und typisierter Interaktionspunkt
- **Schnittstellen:** angebotene Schnittstelle als Lollipop `─○`, benötigte Schnittstelle als Socket `─(`
- **Konnektoren:** Assemblierungskonnektor zwischen zwei Parts, Delegationskonnektor zwischen einem Part und einem Port
- **Kollaboration:** gestrichelte Ellipse mit benannten Rollen, beschreibt ein Zusammenspielmuster unabhängig von konkreten Klassen

```text
 ┌ Car ──────────────────────────────────────┐
 │                                           │
 │ ┌────────────┐        ┌──────────────┐    │
 │ │ e : Engine │────────│ g : Gearbox  │────┼──□───○ Drive
 │ └────────────┘        └──────────────┘    │
 │                                           │
 └───────────────────────────────────────────┘
```

Typischer Einsatz: komponenteninterne Architektur, Verdrahtung von Teilen im System- und Embedded-Entwurf, Beschreibung eines Entwurfsmusters als Zusammenspiel von Rollen.

Abgrenzung: Ein [Klassendiagramm](./class-diagram.md) sagt, welche Klassen allgemein in Beziehung stehen, ein Kompositionsstrukturdiagramm sagt, wie die Instanzen innerhalb eines Ganzen rollenbezogen verdrahtet sind. Ein [Komponentendiagramm](./component-diagram.md) nutzt dieselbe Lollipop- und Socket-Notation, jedoch auf der Ebene der auslieferbaren Bausteine des Gesamtsystems statt im Inneren eines einzelnen Klassifizierers.

---

## Profildiagramm

Ein Profildiagramm erweitert die UML selbst für eine Domäne oder eine Zielplattform.

Zentrale Notationselemente:

- **Profil:** Paket mit dem Schlüsselwort `«profile»`
- **Stereotyp:** Rechteck mit dem Schlüsselwort `«stereotype»`, erweitert eine vorhandene Metaklasse; jeder Name in Guillemets, der kein vordefiniertes UML-Schlüsselwort ist, ist ein in einem Profil definierter Stereotyp
- **Erweiterung:** durchgezogene Linie mit ausgefüllter Pfeilspitze vom Stereotyp zur Metaklasse, z.B. `«metaclass» Class`
- **Tagged Value:** Attribut des Stereotyps, z.B. `table : String`, das am tragenden Element ausgefüllt wird
- **Constraint:** Regel in geschweiften Klammern, in OCL oder in freiem Text formuliert
- **Anwendung:** `«apply»`-Abhängigkeit von einem Paket zum Profil; dessen Elemente dürfen anschließend `«entity»`, `«controller»` und Ähnliches tragen

```text
 ┌ «profile» Persistence ─────────────────────┐
 │                                            │
 │  ┌─────────────────┐     ┌───────────────┐ │
 │  │ «stereotype»    │────►│ «metaclass»   │ │
 │  │ Entity          │     │ Class         │ │
 │  ├─────────────────┤     └───────────────┘ │
 │  │ table : String  │                       │
 │  └─────────────────┘                       │
 └────────────────────────────────────────────┘
```

Bezug zum Metamodell: Die UML wird über eine Vier-Schichten-Architektur beschrieben. `M0` enthält die realen Objekte, `M1` das Modell, `M2` das UML-Metamodell, das festlegt, was eine Klasse oder eine Assoziation ist, und `M3` die MOF (Meta Object Facility), die Sprache, in der das Metamodell selbst geschrieben ist. Ein Profil ist der leichtgewichtige Erweiterungsmechanismus der UML: Es erweitert die Schicht `M2`, ohne sie zu verändern, weshalb profilierte Modelle weiterhin zwischen Werkzeugen ausgetauscht werden können. Eine schwergewichtige Erweiterung würde das Metamodell direkt ändern und damit eine neue Sprache schaffen.

Typischer Einsatz: domänenspezifische Modellierungssprachen wie SysML oder MARTE, Abbildung eines Modells auf eine Plattform wie JPA oder EJB, unternehmensweite Modellierungskonventionen.

---

## Siehe auch

- [UML-Überblick](./uml-overview.mdx): Einordnung aller Diagrammarten in Struktur und Verhalten
- [UML-Notationsgrundlagen](./uml-notation-basics.md): Elemente, die jedes UML-Diagramm gemeinsam nutzt, einschließlich Schlüsselwörtern, Stereotypen und Notizen
- [Klassendiagramm](./class-diagram.md): Grundlage von Objekt-, Paket- und Kompositionsstrukturdiagramm
- [Sequenzdiagramm](./sequence-diagram.md): das zeitorientierte Gegenstück zum Kommunikationsdiagramm
- [ER-Modell](../databases/er-model.md): modelliert die Daten, deren konkrete Instanzen ein Objektdiagramm zeigt
