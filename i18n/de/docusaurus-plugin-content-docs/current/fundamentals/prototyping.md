---
title: "Prototyping"
description: "Prototyping als Technik, um Anforderungen zu klären und Lösungen früh zu testen: exploratives, experimentelles und evolutionäres Prototyping, Wegwerfprototypen, horizontale und vertikale Prototypen, der Prototyping-Zyklus, Vor- und Nachteile."
keywords:
    - Prototyping
    - Prototyp
    - Exploratives Prototyping
    - Experimentelles Prototyping
    - Evolutionäres Prototyping
    - Wegwerfprototyp
    - Rapid Prototyping
    - Proof of Concept
    - Horizontaler Prototyp
    - Vertikaler Prototyp
    - Klickdummy
tags:
    - ap2
---

# Prototyping

**Prototyping** erstellt einen **Prototyp**, ein frühes, ausführbares Modell eines Systems oder eines Teils davon, um Anforderungen zu klären, die technische Machbarkeit zu prüfen oder eine Lösung mit Benutzern zu testen, bevor das System fertiggestellt ist.

Prototyping ist an kein bestimmtes Vorgehen gebunden und kann auch eigenständig eingesetzt werden. Regelmäßig kommt es in der agilen Entwicklung und in klassischen Modellen vor, z.B. im zweiten Quadranten des [Spiralmodells](../projectmanagement/classic-vs-agile.md#spiralmodell).

## Exploratives, experimentelles und evolutionäres Prototyping

Christiane Floyd (1984) unterscheidet drei Arten des Prototypings nach ihrem Ziel:

| Art           | Ziel                                                                                                           | Prototyp danach  |
| ------------- | -------------------------------------------------------------------------------------------------------------- | ---------------- |
| Explorativ    | Anforderungen gemeinsam mit den Benutzern klären                                                               | Meist verworfen  |
| Experimentell | Prüfen, ob eine technische Lösung funktioniert, z.B. eine Architektur, ein Algorithmus oder eine Schnittstelle | Meist verworfen  |
| Evolutionär   | Das System schrittweise aus einer ersten nutzbaren Version entwickeln                                          | Wird zum Produkt |

Ein Prototyp, der nach seiner Bewertung verworfen wird, heißt **Wegwerfprototyp** oder **Rapid Prototype**. Er wird schnell gebaut, ohne Tests, Fehlerbehandlung oder wartbare Struktur, weil nur die Antwort auf seine Frage benötigt wird. Ein experimenteller Prototyp, der klärt, ob eine Lösung machbar ist, heißt **Proof of Concept**. Er wird meist ebenfalls verworfen, aber nicht jeder Wegwerfprototyp ist ein Proof of Concept.

Weil jede spätere Version auf ihm aufbaut, wird ein **evolutionärer Prototyp** von Anfang an in Produktionsqualität gebaut, und evolutionäres Prototyping kommt damit der inkrementellen Entwicklung nahe.

## Horizontale und vertikale Prototypen

Unabhängig von seinem Ziel wird ein Prototyp danach unterschieden, welchen Teil des Systems er abdeckt.

| Art        | Deckt ab                                                                              | Geeignet für                                                       |
| ---------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Horizontal | Eine Schicht über viele Funktionen, z.B. die Benutzeroberfläche ohne Geschäftslogik   | Prüfen von Abläufen und Navigation mit Benutzern                   |
| Vertikal   | Eine Funktion durch alle Schichten, z.B. von der Benutzeroberfläche bis zur Datenbank | Prüfen von technischer Machbarkeit, Performance und Schnittstellen |

Das Ziel bestimmt meist die Abdeckung: Ein explorativer Prototyp ist horizontal, ein experimenteller vertikal. Ein klickbarer horizontaler Prototyp der Benutzeroberfläche ist ein [Klickdummy](./software-ergonomics/wireframe-mockup-prototype.md).

## Prototyping-Zyklus

1. **Frage festlegen:** Die Anforderung oder technische Frage, die der Prototyp beantworten soll, wird zusammen mit der Art des Prototyps festgelegt.
2. **Bauen:** Der Prototyp wird mit so wenig Aufwand gebaut, wie die Frage zulässt.
3. **Bewerten:** Benutzer oder Experten probieren den Prototyp aus, und ihr Feedback wird festgehalten.
4. **Entscheiden:** Der Prototyp wird verbessert und erneut bewertet, mit dokumentierter Antwort verworfen oder, bei einem evolutionären Prototyp, als nächste Version freigegeben.

## Vor- und Nachteile

**Vorteile:**

- Benutzer reagieren auf etwas, das sie sehen und bedienen können, sodass Anforderungen früher konkret werden als aus einem Dokument.
- Missverständnisse zwischen Kunde und Entwicklern werden vor der Umsetzung entdeckt.
- Technische Risiken werden getestet, bevor sich das Projekt auf eine Lösung festlegt.
- Die frühe Einbindung der Benutzer erhöht die Akzeptanz des fertigen Systems.

**Nachteile:**

- Prototypen, die verworfen werden, verursachen zusätzlichen Aufwand.
- Ein ausgefeilter Prototyp kann den Eindruck erwecken, das System sei fast fertig, sodass der Kunde den verbleibenden Aufwand unterschätzt.
- Ohne festgelegte Frage und festgelegtes Ende setzt sich der Zyklus aus Bauen und Bewerten endlos fort.
- Mit einem Prototyp geklärte Anforderungen werden oft nicht dokumentiert, weil der Prototyp sie scheinbar dokumentiert.

## Beispiel: Raumbuchung für eine Bibliothek

Eine Stadtbibliothek möchte, dass Besucher Gruppenarbeitsräume online buchen können. Die Buchungsdaten müssen aus dem vorhandenen Bibliotheksverwaltungssystem kommen.

| Frage                                                                       | Prototyp                                                                                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Verstehen Besucher, wie sie einen freien Raum finden und buchen?            | Explorativ, horizontal: klickbare Screens ohne Geschäftslogik, mit fünf Besuchern getestet, danach verworfen             |
| Kann das Bibliotheksverwaltungssystem die Raumbelegung in Echtzeit liefern? | Experimentell, vertikal: eine Buchung von der Benutzeroberfläche über die Schnittstelle bis ins System, danach verworfen |
| Wie wird das Buchungssystem eingeführt?                                     | Evolutionär: Eine erste Version nur mit Buchung geht live und wird um Stornierung und Erinnerungen erweitert             |

## Häufige Fehler

1. **Wegwerfprototyp als Produkt weitergeführt:** Seine fehlenden Tests, Fehlerbehandlung und Struktur gelangen in den Betrieb. Ob ein Prototyp verworfen oder weiterentwickelt wird, muss entschieden werden, bevor er gebaut wird.
2. **Prototyp für ein fast fertiges Produkt gehalten:** Ein High-Fidelity-Prototyp der Benutzeroberfläche sieht fertig aus, obwohl keine Geschäftslogik dahintersteht. Kunden, denen das nicht gesagt wird, können eine frühe Auslieferung erwarten und den verbleibenden Aufwand unterschätzen.
3. **Horizontaler und vertikaler Prototyp verwechselt:** Nur ein vertikaler Prototyp erreicht die unteren Schichten, sodass nur er zeigen kann, ob eine Lösung technisch machbar ist. Ein horizontaler Prototyp beantwortet nur Fragen zu Abläufen und Navigation.
4. **Prototyping nur als klassisches Vorgehensmodell:** Prototyping ist eine Technik, die auch agile Teams einsetzen, z.B. um eine Idee für die Benutzeroberfläche vor einem Sprint zu testen. Es ist nicht an plangetriebene Entwicklung gebunden.

## Siehe auch

- [Klassisches vs. agiles Projektmanagement](../projectmanagement/classic-vs-agile.md): die Vorgehensmodelle, in denen Prototyping eingesetzt wird
- [Wireframe, Mockup und Prototyp](./software-ergonomics/wireframe-mockup-prototype.md): Prototypen der Benutzeroberfläche und ihr Detailgrad
- [Gebrauchstauglichkeit und menschzentrierte Gestaltung](./software-ergonomics/usability.md): der Gestaltungsprozess, in dem Prototypen mit Benutzern bewertet werden
- [Lastenheft/Pflichtenheft](../projectmanagement/requirements-specification.md): die Dokumente, die die mit einem Prototyp geklärten Anforderungen festhalten
