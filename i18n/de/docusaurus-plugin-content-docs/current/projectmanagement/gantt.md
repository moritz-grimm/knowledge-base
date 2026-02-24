---
title: Gantt-Diagramm
description: Ein Gantt-Diagramm ist ein Balkendiagramm, das zur Visualisierung eines Projektplans verwendet wird und Aufgaben, sowie deren Zeitdauer anzeigt
keywords:
    - Gantt-Diagramm
    - Projektplanung
    - Projektmanagement
---

# Gantt-Diagramm

## Überblick

Ein Gantt-Diagramm ist ein Balkendiagramm, das einen Projektzeitplan über die Zeit visualisiert. Es ist eines der am meisten verbreiteten Hilfsmittel für die Kommunikation von Projektzeitplänen an Teams und Stakeholder.

## Struktur

- **Zeilen**: Individuelle Aufgaben oder Arbeitspakete
- **Spalten**: Zeitskala (Tage, Wochen, Monate)
- **Blöcke**: Dauer der einzelnen Aufgaben anhand ihres Start- und Enddatums
- **Abhängigkeiten**: Pfeile oder Überlagerungen zeigen Abhängigkeiten unter den Aufgaben

## Merkmale

- Leicht zu verstehen und zu erstellen, selbst für nicht-technische Stakeholder
- Gut geeignet für kurzfristige Projekte mit einer überschaubaren Anzahl an Aufgaben
- Fokussiert sich eher auf die zeitliche Planung anstatt auf die von Ressourcen
- Normalerweise für Wasserfall- oder phasenbasierte Projekte
- Statische Darstellung: spiegelt eine geplante Momentaufnahme wider, nicht den Fortschritt in Echtzeit

## Vorteile

- Leicht zu lesen und an Stakeholder zu vermitteln
- Bietet einen klaren Überblick über den gesamten Zeitplan des Projekts
- Zeigt welche Aufgaben parallel laufen und welche sequenziell
- Leicht zu erstellen und zu verwalten für kleine bis mittelgroße Projekte

## Nachteile

- Zeigt nicht den kritischen Pfad auf
- Kann bei großen Projekten mit vielen Aufgaben unhandlich werden
- Änderungen an einer Aufgabe benötigen eine manuelle Anpassung an abhängigen Aufgaben

## Beispiel

Ein kleines Team soll innerhalb von fünf Wochen eine Landingpage für eine Produkteinführung erstellen. Der Projektmanager erstellt ein Gantt-Diagramm, um den Zeitplan zu planen:

1. **Anforderungen** (Woche 1): Das Team sammelt Anforderungen von der Marketingabteilung, definiert den Seiteninhalt und einigt sich auf den Umfang
2. **Design** (Woche 1 bis 2): Der Designer beginnt mit der Erstellung von Mockups, während die Anforderungen noch finalisiert werden, mit leichter Überschneidung zur ersten Phase
3. **Implementierung** (Woche 2 bis 4): Sobald die Designrichtung klar ist, beginnen die Entwickler mit dem Bau der Seite. Das ist die längste Phase
4. **Test** (Woche 4): QA beginnt mit dem Testen fertiggestellter Abschnitte, während die Entwicklung noch läuft
5. **Bereitstellung** (Woche 5): Nach der finalen Freigabe wird die Seite vor dem Starttermin in Produktion bereitgestellt

Das Gantt-Diagramm macht es dem Team leicht zu erkennen, welche Phasen sich überschneiden, wo Übergaben stattfinden und ob die Fünf-Wochen-Frist realistisch ist.

```text
| Aufgabe        | Woche 1 | Woche 2 | Woche 3 | Woche 4 | Woche 5 |
| -------------- |-------- | ------- | ------- | ------- | ------- |
| Anforderungen  |███████  |         |         |         |         |
| Design         |     ████|████     |         |         |         |
| Umsetzung      |         |  ███████|█████████|█████    |         |
| Testing        |         |         |         |  ███████|         |
| Deployment     |         |         |         |         |█████████|
```
