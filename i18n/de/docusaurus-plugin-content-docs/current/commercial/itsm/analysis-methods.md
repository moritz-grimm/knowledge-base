---
title: Analysemethoden im Problem Management
description: "Wichtige Methoden zur IT-Problemanalyse: 5-Why-Methode, Ishikawa-Diagramm, DMAIC-Zyklus und die Ursachen-Wirkungs-Matrix"
keywords:
  - "5-Why-Methode"
  - "Ishikawa-Diagramm"
  - "Fischgrätendiagramm"
  - "DMAIC"
  - "Ursachenanalyse"
  - "Problemanalyse"
  - "Ursachen-Wirkungs-Matrix"
---

# Analysemethoden im Problem Management

## Überblick

Diese Methoden werden im [Problem Management](./problem-management.md) eingesetzt, um die Grundursache eines Problems systematisch zu finden.

## Methode der 5 Warum (5-Why-Methode, 5-W-Methode)

**Ziel:** Die Grundursache eines Problems finden, indem immer tiefer nachgefragt wird. Jede Antwort wird zur nächsten Frage. Fünf Iterationen sind in der Regel ausreichend.

**Beispiel (Druckerproblem):**

| Schritt | Frage                                          | Antwort                                                     |
| ------- | ---------------------------------------------- | ----------------------------------------------------------- |
| Problem | Der Drucker druckt nicht richtig               |                                                             |
| Warum?  | Warum druckt der Drucker nicht richtig?        | Er zeigt nicht alle Zeichen deutlich an / nicht klar lesbar |
| Warum?  | Warum zeigt er nicht alle Zeichen deutlich an? | Die Tinte ist nicht gut                                     |
| Warum?  | Warum ist die Tinte nicht gut?                 | Sie schmiert und druckt manchmal nicht                      |
| Warum?  | Warum schmiert sie und druckt manchmal nicht?  | Der Toner hat eine schlechte Qualität                       |
| Warum?  | Warum hat der Toner eine schlechte Qualität?   | **Ich habe den billigsten Toner gekauft** (Grundursache)    |

## Ishikawa-Diagramm (Fischgrätendiagramm)

Das **Ishikawa-Diagramm** (auch **Ursache-Wirkungs-Diagramm** oder **Fischgrätendiagramm**) wurde von dem japanischen Wissenschaftler Kaoru Ishikawa in den 1940er-Jahren entwickelt. Es visualisiert die Ursachen eines Problems.

**Aufbau:**

- Horizontaler Pfeil nach rechts => **Problembeschreibung an der Spitze** (die Wirkung)
- Schräge Pfeile auf dem horizontalen Pfeil => **Haupteinflussgrößen** (die „Gräten")
- Kleinere Pfeile an den schrägen Hauptpfeilen => **Nebenursachen**

**Bedeutung der Pfeile:** Jeder Pfeil „trägt dazu bei, dass..." die an der Spitze beschriebene Wirkung eintritt.

### Haupteinflussgrößen (8M)

- Mensch
- Maschine
- Material
- Methode
- Management
- Mitwelt
- Messung
- Money

Auch andere Einflusskategorien sind je nach Problem möglich.

### Vorgehen beim Erstellen

1. Problembeschreibung an die Spitze des horizontalen Pfeils schreiben (ganz rechts)
2. Haupteinflussgrößen festlegen (8M)
3. Hauptursachen per Brainstorming im Team ermitteln (als Pfeile parallel zum horizontalen Pfeil einzeichnen)
4. Nebenursachen für jede Hauptursache finden (als schräge Pfeile von der jeweiligen Hauptursache abzweigend)

## DMAIC-Zyklus

Der **DMAIC-Zyklus** wird für komplexe Probleme und Projekte eingesetzt. Das Akronym steht für die fünf Phasen:

| Phase                     | Leitfrage                            | Methoden / Werkzeuge                                                                                                            |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Definieren** (Define)   | Was ist das Problem?                 | Kundenrückmeldungen, Definition von Problem und Umfang, KPI-Analyse, RACI-Matrix                                                |
| **Messen** (Measure)      | Wie groß ist das Problem?            | Ermittlung der IST-Situation, [SLA](./sla.md)-Vereinbarungen prüfen, Eskalationsstufe klären                                    |
| **Analysieren** (Analyse) | Was sind die Hauptursachen?          | Methode der 5 Warum, Kundenbefragungen, [Fehlerdatenbank](./problem-management.md#known-error-database-kedb), Ishikawa-Diagramm |
| **Verbessern** (Improve)  | Kann man eine Lösung entwickeln?     | Simulationen, Testläufe, Lösungsmatrix, Ishikawa-Diagramm                                                                       |
| **Steuern** (Control)     | Kann man die Verbesserung absichern? | Monitoring, Service-Management-System                                                                                           |

## Problemlösungsmatrix / Ursachen-Wirkungs-Matrix

Die **Ursachen-Wirkungs-Matrix** (nach der Kepner-Tregoe-Methode) analysiert ein Problem entlang vier Dimensionen. Durch den Vergleich von „Ist" mit „Ist nicht" werden mögliche Ursachen systematisch eingegrenzt:

| Dimension                | Ist (das Problem)                        | Ist nicht (das Problem)         | Abweichung                                              | Mögliche Ursache              |
| ------------------------ | ---------------------------------------- | ------------------------------- | ------------------------------------------------------- | ----------------------------- |
| **Identifizieren (Was)** | Was ist das Problem?                     | Was ist nicht das Problem?      | Wie ist der Unterschied zwischen Ist- und Soll-Zustand? | Was ist die mögliche Ursache? |
| **Lokalisieren (Wo)**    | Wo tritt das Problem auf?                | Wo tritt es nicht auf?          | Was ist am Ort anders?                                  | Was ist die mögliche Ursache? |
| **Zeitpunkt (Wann)**     | Wann trat das Problem auf?               | Wann trat es nicht auf?         | Was war zu dem Zeitpunkt anders?                        | Was ist die mögliche Ursache? |
| **Bedeutung (Wie viel)** | Wie groß / weitreichend ist das Problem? | Wie klein oder begrenzt ist es? | Was ist der Unterschied im Umfang?                      | Was ist die mögliche Ursache? |
