---
title: "Magisches Dreieck"
description: "Das magische Dreieck des Projektmanagements mit Umfang, Zeit und Kosten als konkurrierenden Zielen, die Rolle der Qualität, das Teufelsquadrat, das umgekehrte Dreieck agiler Ansätze und die Möglichkeiten, wenn sich ein Ziel ändert."
keywords:
    - Magisches Dreieck
    - Projektmanagement-Dreieck
    - Iron Triangle
    - Triple Constraint
    - Umfang
    - Zeit
    - Kosten
    - Qualität
    - Teufelsquadrat
    - Umgekehrtes Dreieck
tags:
    - ap2
---

# Magisches Dreieck

Das **magische Dreieck** beschreibt die drei konkurrierenden Ziele eines Projekts: **Umfang**, **Zeit** und **Kosten**. Eine Änderung an einer Ecke wirkt sich auf mindestens eine der anderen aus: Mehr Umfang erfordert mehr Zeit oder höhere Kosten, und ein kürzerer Zeitplan erfordert höhere Kosten oder weniger Umfang. „Magisch“ bezieht sich darauf, dass sich nicht alle drei gleichzeitig optimieren lassen. Im Englischen heißt das Modell auch **Project Management Triangle**, **Iron Triangle** oder **Triple Constraint**.

| Ecke   | Frage                             | Typische Größe                                                   |
| ------ | --------------------------------- | ---------------------------------------------------------------- |
| Umfang | Was wird geliefert?               | Anforderungen, Funktionen, Lieferergebnisse, geforderte Qualität |
| Zeit   | Bis wann wird geliefert?          | Termin, Meilensteine, Dauer                                      |
| Kosten | Was darf das Projekt verbrauchen? | Budget, Personentage, Material                                   |

## Qualität

Das ursprüngliche Dreieck von Martin Barnes (1969) hatte **Zeit**, **Kosten** und **Qualität** als Ecken. Viele spätere Fassungen, vor allem in den USA, ersetzten die Qualität durch den Umfang und zählen sie entweder zum Umfang oder setzen sie als Ergebnis der drei Ecken in die Mitte des Dreiecks. Doch alle Varianten stimmen darin überein, dass die Qualität als Erstes leidet, wenn Umfang, Zeit und Kosten fest sind und das Projekt in Verzug gerät, weil Kürzungen bei Tests, Reviews und Dokumentation Zeit sparen, ohne eine sichtbare Ecke zu verändern.

## Teufelsquadrat

Das **Teufelsquadrat** von Harry Sneed (1987) erweitert das Dreieck auf vier Ecken: **Quantität** (Umfang), **Qualität**, **Zeit** und **Kosten**. Jede Ecke zeigt in die günstige Richtung: Nach außen bedeutet mehr Quantität, höhere Qualität, weniger Zeit und geringere Kosten. Die Fläche des Quadrats ist die Produktivität des Teams, und da sie sich kurzfristig nicht steigern lässt, wandert mindestens eine andere Ecke nach innen, sobald eine Ecke nach außen gezogen wird: Mehr Quantität mit demselben Team und Budget dauert entweder länger oder senkt die Qualität.

## Klassische und agile Ansätze

Klassische und agile Ansätze legen unterschiedliche Ecken fest.

| Ecke   | Klassisch                | Agil                                                          |
| ------ | ------------------------ | ------------------------------------------------------------- |
| Umfang | Im Lastenheft festgelegt | Variabel, bestimmt durch das priorisierte Backlog             |
| Zeit   | Aus dem Umfang geschätzt | Festgelegt durch Timeboxes und den Releasetermin              |
| Kosten | Aus dem Umfang geschätzt | Festgelegt durch die Teamgröße und die Anzahl der Iterationen |

Der agile Ansatz wird deshalb als **umgekehrtes Dreieck** bezeichnet, weil er vertauscht, was fest ist und was sich ergibt. Ein variabler Umfang ist vertretbar, weil die Anforderungen mit der höchsten Priorität zuerst geliefert werden, sodass das, was bei Ablauf der Zeit übrig bleibt, der unwichtigste Teil ist. Agile Teams legen die Qualität über eine [Definition of Done](./scrum.md#definition-of-done-dod) fest, sodass ein Sprint unter Zeitdruck weniger Umfang statt geringerer Qualität liefert.

## Beispiel: Zusätzliche Anforderung vor dem Termin

Ein Webshop soll am 1. März mit einem Budget von 60.000 EUR live gehen. Vier Wochen vor dem Termin wünscht der Kunde eine zusätzliche Zahlungsart.

| Möglichkeit                       | Feste Ecken    | Folge                                                                       |
| --------------------------------- | -------------- | --------------------------------------------------------------------------- |
| Go-live verschieben               | Umfang, Kosten | Die Zahlungsart wird geliefert und der Shop geht später live                |
| Entwickler hinzunehmen            | Umfang, Zeit   | Das Budget steigt, und neue Teammitglieder müssen erst eingearbeitet werden |
| In einem späteren Release liefern | Zeit, Kosten   | Der Shop geht ohne die neue Zahlungsart pünktlich live                      |
| Eine andere Funktion streichen    | Zeit, Kosten   | Der Umfang bleibt gleich groß, aber sein Inhalt ändert sich                 |

## Häufige Fehler

1. **Alle drei Ecken fest:** Sind Umfang, Zeit und Kosten fest und erweist sich die Schätzung als falsch, bleibt als einzige Stellgröße die Qualität. Die Lücke zeigt sich dann als fehlende Tests oder Fehler nach der Auslieferung statt als sichtbare Entscheidung.
2. **Ecken als unabhängig behandelt:** Eine Änderungsanforderung, die ohne Anpassung von Zeit oder Kosten angenommen wird, überlastet den Plan unbemerkt. Jede Änderung am Umfang muss auf ihre Wirkung auf die anderen Ecken geprüft werden, bevor sie angenommen wird.
3. **Mehr Personal für ein verspätetes Projekt:** Zusätzliche Teammitglieder müssen eingearbeitet werden und erhöhen den Abstimmungsaufwand, sodass sie ein verspätetes Projekt zunächst weiter verlangsamen. Dieser Effekt ist als Brooks'sches Gesetz bekannt.

## Siehe auch

- [Klassisches vs. agiles Projektmanagement](./classic-vs-agile.md): die Vorgehensmodelle, die unterschiedliche Ecken des Dreiecks festlegen
- [Scrum](./scrum.md): Timeboxes und die Definition of Done als feste Zeit und Qualität
- [Lastenheft/Pflichtenheft](./requirements-specification.md): die Dokumente, die in einem klassischen Projekt den Umfang festlegen
- [Netzplan](./network-plan.md): Berechnung der Zeit-Ecke aus den Vorgängen und ihren Abhängigkeiten
