---
title: "Verteilungsdiagramm"
description: "UML-Verteilungsdiagramme: Knoten, Geräte und Ausführungsumgebungen, Artefakte und ihr Deployment, Kommunikationspfade mit Protokoll-Stereotypen, Multiplizitäten und Verschachtelung."
keywords:
    - UML
    - Verteilungsdiagramm
    - Knoten
    - Gerät
    - Ausführungsumgebung
    - Artefakt
    - Kommunikationspfad
    - Deployment
    - Systemlandschaft
    - Strukturdiagramm
tags:
    - ap2
---

# Verteilungsdiagramm

## Überblick

Ein Verteilungsdiagramm ist ein **Strukturdiagramm** der UML. Es zeigt, wie ein fertiges System physisch verteilt ist: welche Hardware und welche Laufzeitumgebungen vorhanden sind, welche Dateien darauf installiert sind und über welche Kommunikationspfade diese Teile Daten austauschen.

Typische Anwendungsfälle:

- Dokumentation der Systemlandschaft einer Anwendung für Betrieb und Übergabe
- Darstellung einer Client-Server- oder Drei-Schichten-Architektur einschließlich ihrer Netzgrenzen
- Planung einer Installation: Welches Artefakt wird auf welche Maschine kopiert
- Beschreibung eines Container- oder Cloud-Deployments mit seinen Protokollen und Instanzzahlen
- Grundlage für Diskussionen über Verfügbarkeit, Skalierung und Sicherheitszonen

---

## Notation

| Element             | Notation                                                                          | Bedeutung                                                                                             |
| ------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Knoten              | Quader (dreidimensionaler Kasten)                                                 | Ausführungsressource, auf der etwas läuft oder abgelegt ist                                           |
| Gerät               | Quader mit dem Schlüsselwort `<<device>>`                                         | Physische Hardware: Server, Arbeitsplatzrechner, Smartphone, Router, Drucker                          |
| Ausführungsumgebung | Quader mit `<<executionEnvironment>>`, meist in einem Gerät verschachtelt         | Software, die Artefakte beherbergt: Betriebssystem, JVM, Applikationsserver, Container-Laufzeit, DBMS |
| Artefakt            | Rechteck mit dem Schlüsselwort `<<artifact>>` oder einem Dokumentsymbol           | Physische Datei, die im Entwicklungsprozess entsteht                                                  |
| Deployment          | Artefakt innerhalb eines Knotens gezeichnet oder gestrichelter Pfeil `<<deploy>>` | Das Artefakt ist auf diesem Knoten installiert                                                        |
| Manifestation       | Gestrichelter Pfeil `<<manifest>>` vom Artefakt zu einer Komponente oder Klasse   | Das Artefakt ist die physische Realisierung eines logischen Elements                                  |
| Kommunikationspfad  | Durchgezogene Linie zwischen zwei Knoten                                          | Verbindung, über die die Knoten Daten austauschen, ohne Richtung                                      |
| Protokoll           | Stereotyp am Pfad, z.B. `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`                     | Protokoll, das auf dieser Verbindung verwendet wird                                                   |
| Multiplizität       | Zahl am Ende eines Kommunikationspfads, z.B. `2` oder `1..*`                      | Wie viele Knoten an diesem Ende mit einem Knoten am anderen Ende verbunden sind                       |
| Verschachtelung     | Knoten oder Artefakt innerhalb eines Knotens gezeichnet                           | Enthaltensein: Hardware enthält Laufzeitumgebung enthält Datei                                        |
| Instanz             | Unterstrichener Name mit vorangestelltem Doppelpunkt, z.B. `:AppServer`           | Eine konkrete Instanz statt eines Typs                                                                |
| Notiz               | Rechteck mit geknickter Ecke an gestrichelter Linie                               | Kommentar ohne Semantik                                                                               |

Benennungsregeln, die ein Diagramm lesbar halten:

- Ein Knoten wird als Typ benannt, `ApplicationServer`, oder als konkrete Maschine, `appsrv01:ApplicationServer`. Ein Instanzname wird im Werkzeug unterstrichen.
- Artefakte tragen den echten Dateinamen einschließlich Endung: `shop.war`, nicht `Shop-Anwendung`.
- Jeder Kommunikationspfad trägt ein Protokoll-Stereotyp, eine unbeschriftete Linie sagt nur *irgendwie verbunden* aus.
- Schlüsselwörter und Stereotypen werden in französische Anführungszeichen gesetzt, `«device»`. Die Schreibweise `<<device>>` ist die ASCII-Form textbasierter Werkzeuge und wird im Folgenden verwendet.

---

## Bausteine

### Knoten

Über Schlüsselwörter werden zwei Arten von Knoten unterschieden:

- **`<<device>>`:** Physische Hardware wie ein Server, ein Arbeitsplatzrechner, ein Mobiltelefon oder eine eingebettete Steuerung
- **`<<executionEnvironment>>`:** Eine Softwareumgebung, die Artefakte beherbergt und ihnen Dienste wie Speicherverwaltung, Transaktionen oder die Verteilung eingehender Anfragen bereitstellt

Eine Ausführungsumgebung ist üblicherweise in einem Gerät verschachtelt. Ein Knoten ohne Schlüsselwort ist schlicht *irgendeine* Ausführungsressource.

```text
        ┌────────────────────────────────────────┐
       ╱                                        ╱│
      ┌────────────────────────────────────────┐ │
      │  <<device>>                            │ │
      │  ApplicationServer                     │ │
      │                                        │ │
      │  ┌──────────────────────────────────┐  │ │
      │  │  <<executionEnvironment>>        │  │ │
      │  │  Tomcat 10                       │  │ │
      │  │                                  │  │ │
      │  │  ┌────────────────────────────┐  │  │ │
      │  │  │  <<artifact>>              │  │  │ │
      │  │  │  shop.war                  │  │  │ │
      │  │  └────────────────────────────┘  │  │ │
      │  └──────────────────────────────────┘  │ ╱
      └────────────────────────────────────────┘╱
```

Im Zeichenwerkzeug ist jeder Knoten ein Quader, auch die verschachtelten. Die Diagramme hier stellen innere Knoten als einfache Rechtecke dar, damit die Verschachtelung im reinen Text lesbar bleibt.

### Artefakt und Deployment

In der Praxis ist ein Artefakt eine Datei. Typische Beispiele sind `shop.war`, `payment-service.jar`, `setup.exe`, `schema.sql`, `nginx.conf` sowie ein Container-Image wie `shop-app:2.4.0`.

Zwei Notationen drücken aus, dass ein Artefakt auf einem Knoten installiert ist:

- **Verschachtelung:** Das Artefakt-Rechteck wird in den Knoten gezeichnet. Diese Form ist kompakter und mit Abstand die häufigere.
- **Abhängigkeit:** Ein gestrichelter Pfeil mit dem Schlüsselwort `<<deploy>>` führt vom Artefakt zum Knoten. Diese Form eignet sich, wenn dasselbe Artefakt auf mehreren Knoten installiert wird.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈┈ <<deploy>> ┈┈┈┈┈┈▶ │  <<device>>            │
 │  shop.war              │                          │  ApplicationServer     │
 └────────────────────────┘                          └────────────────────────┘
```

Eine Manifestation ist das Gegenstück in Richtung Entwurf. Ein gestrichelter Pfeil mit dem Schlüsselwort `<<manifest>>` führt vom Artefakt zu der Komponente oder Klasse, die es physisch realisiert, und zeigt damit, welcher Teil des Modells in dieser Datei landet.

```text
 ┌────────────────────────┐                          ┌────────────────────────┐
 │  <<artifact>>          │ ┈┈┈┈ <<manifest>> ┈┈┈┈┈▶ │  <<component>>         │
 │  payment-service.jar   │                          │  PaymentService        │
 └────────────────────────┘                          └────────────────────────┘
```

### Kommunikationspfad

Ein Kommunikationspfad ist eine durchgezogene Linie ohne Pfeilspitze, weil die Verbindung selbst keine Richtung hat, und wird mit dem Protokoll als Stereotyp beschriftet.

```text
    ┌──────────────────────┐                  ┌──────────────────────┐
   ╱                      ╱│                 ╱                      ╱│
  ┌──────────────────────┐ │                ┌──────────────────────┐ │
  │  <<device>>          │ │ 2            1 │  <<device>>          │ │
  │  AppServer           │ ├──── <<JDBC>> ──┤  DatabaseServer      │ │
  │                      │ ╱                │                      │ ╱
  └──────────────────────┘╱                 └──────────────────────┘╱
```

Gängige Protokoll-Stereotypen sind `<<HTTP>>`, `<<HTTPS>>`, `<<TCP/IP>>`, `<<JDBC>>`, `<<REST>>`, `<<AMQP>>`, `<<SSH>>` und `<<SMTP>>`. Welches davon gewählt wird, ist eine Frage des angestrebten Detailgrads: `<<TCP/IP>>` benennt den Transport, `<<HTTPS>>` sagt zusätzlich aus, dass die Verbindung verschlüsselt ist, was meist die nützlichere Information darstellt.

### Multiplizität und Verschachtelung

Eine Multiplizität steht am Ende eines Kommunikationspfads und setzt Typnamen voraus: Eine Instanz wie `appsrv01:ApplicationServer` ist immer genau eine Maschine.

Eine Verschachtelung kann über mehrere Ebenen gehen, jede Ebene läuft auf der umgebenden:

```text
<<device>>                  ServerHardware
  <<executionEnvironment>>    Linux
    <<executionEnvironment>>    Docker Engine
      <<artifact>>                shop-app:2.4.0
```

Ebenen, die für den Zweck des Diagramms keine Rolle spielen, werden weggelassen, z.B. die Container-Laufzeit in einer Kapazitätsplanung. In einem Release-Plan ist dagegen gerade der Versions-Tag des Images die entscheidende Information.

---

## Beispiel: Drei-Schichten-Webshop

Der Shop besteht aus einem Browser-Frontend, einer Anwendung in einem Container und einer relationalen Datenbank. Jede Schicht läuft auf einer eigenen Maschine, der Applikationsserver ist doppelt vorhanden, und die Datenbank ist ausschließlich vom Applikationsserver aus erreichbar.

```text
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ClientPC                                  │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Browser                             │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 0..*
               <<HTTPS>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  ApplicationServer                         │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  Docker Engine                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-app:2.4.0                │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
                          │ 2
                <<JDBC>>  │
                          │ 1
      ┌────────────────────────────────────────────┐
     ╱                                            ╱│
    ┌────────────────────────────────────────────┐ │
    │  <<device>>                                │ │
    │  DatabaseServer                            │ │
    │                                            │ │
    │  ┌──────────────────────────────────────┐  │ │
    │  │  <<executionEnvironment>>            │  │ │
    │  │  PostgreSQL 16                       │  │ │
    │  │                                      │  │ │
    │  │  ┌────────────────────────────────┐  │  │ │
    │  │  │  <<artifact>>                  │  │  │ │
    │  │  │  shop-schema.sql               │  │  │ │
    │  │  └────────────────────────────────┘  │  │ │
    │  └──────────────────────────────────────┘  │ ╱
    └────────────────────────────────────────────┘╱
```

Was sich aus diesem Beispiel ablesen lässt:

- Die Multiplizität `2` am Applikationsserver-Ende des `<<JDBC>>`-Pfads sagt aus, dass zwei Applikationsserver auf die Datenbank zugreifen, `0..*` am Client-Ende, dass beliebig viele Clients verbunden sein können, auch keiner.
- Es wird nichts darüber ausgesagt, *wann* welcher Aufruf erfolgt. Die Reihenfolge der Aufrufe gehört in ein [Sequenzdiagramm](./sequence-diagram.md).

---

## Häufige Fehler

1. **Klassen oder Komponenten innerhalb eines Knotens:** Ein Knoten enthält Artefakte. Das logische Element gehört in ein [Klassendiagramm](./class-diagram.md) oder ein Komponentendiagramm und wird mit `<<manifest>>` an das Artefakt gebunden.
2. **Kommunikationspfad ohne Protokoll:** Ohne `<<HTTPS>>` oder `<<JDBC>>` an der Linie zeigt das Diagramm nicht mehr, welche Verbindungen verschlüsselt sind oder welche Ports eine Firewall freigeben muss.
3. **Gerät und Ausführungsumgebung verwechselt:** `<<device>>` ist Hardware, `<<executionEnvironment>>` ist Software, die darauf läuft. Ein Container ist kein Gerät.
4. **Pfeilspitzen am Kommunikationspfad:** Der Pfad ist ungerichtet. Eine Richtung gehört zu einer Abhängigkeit wie `<<deploy>>` oder `<<manifest>>`.
5. **Jede Datei gezeichnet:** In das Diagramm gehört nur, was für Installation und Betrieb zählt, nicht jede Bibliothek und jede Konfigurationsdatei.
6. **Fehlende Multiplizitäten:** Ein Verbund aus vier Maschinen, der ohne `4` als einzelner Knoten gezeichnet wird, verbirgt seine Größe.
7. **Logische Schichten mit Knoten gleichgesetzt:** Präsentations-, Logik- und Datenschicht sind eine logische Aufteilung, Knoten eine physische. Drei Schichten können durchaus auf einer Maschine laufen.

---

## Werkzeuge

- draw.io / diagrams.net (kostenlos, browserbasiert, UML-Formenbibliothek enthalten)
- PlantUML (textbasiert, das Diagramm wird aus Quelltext erzeugt und lässt sich versionieren)
- Mermaid (textbasiert, wird auf vielen Plattformen direkt in Markdown gerendert)
- Visual Paradigm, StarUML, Lucidchart (kommerziell, mit kostenlosen Tarifen)

## Siehe auch

- [Komponentendiagramm](./component-diagram.md): die logischen Bausteine, deren Artefakte hier installiert werden
- [Klassendiagramm](./class-diagram.md): die feingranulare Struktur der Software, die in den Artefakten landet
- [Sequenzdiagramm](./sequence-diagram.md): das Zusammenspiel über die hier gezeigten Kommunikationspfade
- [UML-Überblick](./uml-overview.mdx): Einordnung der Diagrammarten
- [UML-Notationsgrundlagen](./uml-notation-basics.md): Schlüsselwörter, Stereotypen, Instanznamen und die diagrammübergreifenden Elemente
