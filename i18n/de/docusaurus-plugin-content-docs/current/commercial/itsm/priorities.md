---
title: Priorisierung im IT-Support
description: "Die ITIL-Prioritätsmatrix (Dringlichkeit x Auswirkung) und die Eisenhower-Matrix als Werkzeuge zur Priorisierung von Incidents und Aufgaben im IT-Support"
keywords:
  - "ITIL-Prioritätsmatrix"
  - "Dringlichkeit"
  - "Auswirkung"
  - "Eisenhower-Matrix"
  - "Priorisierung"
  - "Incident-Priorität"
  - "Reaktionszeit"
  - "SLA"
---

# Priorisierung im IT-Support

## Überblick

Für die Priorisierung im IT-Support werden zwei Hauptwerkzeuge eingesetzt: die **ITIL-Prioritätsmatrix** und die **Eisenhower-Matrix**.

## ITIL-Prioritätsmatrix

### Dringlichkeitsstufen (Urgency)

| Stufe           | Beschreibung                                                                                                                                                                                                                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hoch (H)**    | Der durch den Incident verursachte Schaden nimmt schnell zu. Aufgaben, die nicht erfüllt werden können, sind sehr zeitkritisch. Durch schnelles Handeln kann verhindert werden, dass aus einem Minor Incident ein [Major Incident](./incident-management.md#major-incident) wird. Mehrere Benutzer mit VIP-Status sind betroffen. |
| **Mittel (M)**  | Der Schaden nimmt im Verlauf der Zeit zu. Aufgaben, die nicht erfüllt werden können, sind nur mäßig zeitkritisch. Ein einzelner Benutzer mit VIP-Status ist betroffen.                                                                                                                                                            |
| **Niedrig (N)** | Der Schaden nimmt im Verlauf der Zeit nur unwesentlich zu. Aufgaben, die nicht erfüllt werden können, sind nicht zeitkritisch.                                                                                                                                                                                                    |

### Auswirkungsstufen (Impact)

| Stufe           | Beschreibung                                                                                                                                                                                                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hoch (H)**    | Eine große Anzahl von Mitarbeitern ist betroffen und/oder kann ihre Aufgaben nicht erfüllen. Eine große Anzahl von Kunden ist betroffen oder substantiell beeinträchtigt. Finanzieller Schaden voraussichtlich > 10.000 EUR. Imageschaden in großem Umfang wahrscheinlich. Gefahr für Leib und Leben. |
| **Mittel (M)**  | Eine mäßige Anzahl von Mitarbeitern ist betroffen und/oder kann Aufgaben nicht wie vorgesehen erfüllen. Mäßige Anzahl von Kunden betroffen oder Einschränkungen beim Komfort. Finanzieller Schaden voraussichtlich 1.000–10.000 EUR. Moderate Imageschädigung wahrscheinlich.                         |
| **Niedrig (N)** | Eine minimale Anzahl von Mitarbeitern ist betroffen, kann Aufgaben aber noch mit zusätzlichem Aufwand erfüllen. Minimale Anzahl Kunden betroffen, nur geringe Komforteinschränkungen. Finanzieller Schaden voraussichtlich < 1.000 EUR. Nur minimale Imageschädigung zu erwarten.                     |

### Prioritätsmatrix

Die **Dringlichkeit-x-Auswirkung-Matrix** ergibt einen Prioritätscode von 1 (kritisch) bis 5 (sehr niedrig):

|                     | **Auswirkung H** | **Auswirkung M** | **Auswirkung N** |
| ------------------- | ---------------- | ---------------- | ---------------- |
| **Dringlichkeit H** | **1**            | 2                | 3                |
| **Dringlichkeit M** | 2                | **3**            | 4                |
| **Dringlichkeit N** | 3                | 4                | **5**            |

### Prioritätscodes und [SLA](./sla.md) Antwort/Lösungszeiten

| Priorität | Beschreibung | Reaktionszeit | Lösungszeit |
| --------- | ------------ | ------------- | ----------- |
| **1**     | Kritisch     | Sofort        | 1 Stunde    |
| **2**     | Hoch         | 10 Minuten    | 4 Stunden   |
| **3**     | Mittel       | 1 Stunde      | 8 Stunden   |
| **4**     | Niedrig      | 4 Stunden     | 24 Stunden  |
| **5**     | Sehr niedrig | 1 Tag         | 1 Woche     |

## Eisenhower-Matrix

Die **Eisenhower-Matrix** ist eine Methode des Zeitmanagements zur Unterscheidung von wichtigen und dringenden Aufgaben. Benannt nach dem 34. US-Präsidenten Dwight D. Eisenhower (1953–1961). Auch genannt: Vier-Quadranten-Methode, Eisenhower-Methode oder Eisenhower-Box.

**Ziel:** Nicht die Dinge richtig tun, sondern die richtigen Dinge tun (Effektivität, nicht nur Effizienz).

Zwei Fragen pro Aufgabe:

1. Wie wichtig ist die Aufgabe?
2. Wie dringend ist die Aufgabe?

### Die vier Quadranten

|                   | **Dringend**                            | **Nicht dringend**                                |
| ----------------- | --------------------------------------- | ------------------------------------------------- |
| **Wichtig**       | **A: Erledigen** (sofort, selbst)       | **B: Neu terminieren** (planen und Termin setzen) |
| **Nicht wichtig** | **C: Delegieren** (oder automatisieren) | **D: Papierkorb** (archivieren oder löschen)      |

### Prinzipien

- Wichtige Aufgaben besitzen unmittelbar Bezug zu definierten Zielen
- Dringende Aufgaben dulden keinen Aufschub und sind idealerweise sofort zu erledigen
- Wichtige und dringende Aufgaben: selbst schnellstmöglich erledigen
- Dringende, aber nicht wichtige Aufgaben: delegieren oder automatisieren; falls nicht möglich, nach den A-Aufgaben erledigen
- Wichtige, aber nicht dringende Aufgaben: planen und terminieren; niedriger priorisiert als A-Aufgaben
- Nicht wichtige und nicht dringende Aufgaben: nicht bearbeiten; je nach Kontext archivieren oder löschen

## Vergleich: ITIL-Matrix vs. Eisenhower-Matrix

| Kriterium                  | ITIL-Prioritätsmatrix                                                                                                             | Eisenhower-Matrix                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Zweck**                  | Priorisierung von IT-[Incidents](./incident-management.md)/[Problemen](./problem-management.md)/[Changes](./change-management.md) | Priorisierung von persönlichen oder Team-Aufgaben |
| **Dimensionen**            | Dringlichkeit x Auswirkung (geschäftsorientiert)                                                                                  | Dringlichkeit x Wichtigkeit (zielorientiert)      |
| **Skalierung**             | 5 Prioritätsstufen mit definierten [SLA](./sla.md)-Zeiten                                                                         | 4 Quadranten mit Handlungsempfehlungen            |
| **Am besten geeignet für** | IT-Service-Desk, strukturierte Teams                                                                                              | Selbstmanagement, allgemeine Aufgabenorganisation |
| **Praktikabilität**        | Objektiv, standardisiert, skalierbar                                                                                              | Einfacher, flexibler, weniger strukturiert        |
