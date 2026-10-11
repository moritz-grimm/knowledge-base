---
title: "Fehlhandlung, Fehlerzustand und Fehlerwirkung"
description: "Die ISTQB-Begriffe Fehlhandlung, Fehlerzustand und Fehlerwirkung als Wirkungskette, die Grundursache, Fehlerzustände ohne Fehlerwirkung, Testen und Debugging sowie falsch positive und falsch negative Testergebnisse."
keywords:
    - Fehlhandlung
    - Irrtum
    - Fehlerzustand
    - Defekt
    - Bug
    - Fehlerwirkung
    - Ausfall
    - Grundursache
    - Grundursachenanalyse
    - Debugging
    - Falsch positiv
    - Falsch negativ
    - ISTQB
tags:
    - ap2
---

# Fehlhandlung, Fehlerzustand und Fehlerwirkung

Das ISTQB (International Software Testing Qualifications Board) ist ein internationales Gremium, das Begriffe und Zertifizierungen für das Softwaretesten festlegt. Es unterscheidet drei Begriffe, die eine Wirkungskette bilden: Ein Mensch begeht eine **Fehlhandlung**, die Fehlhandlung hinterlässt einen **Fehlerzustand** in einem Arbeitsergebnis, und der Fehlerzustand kann bei der Ausführung eine **Fehlerwirkung** verursachen.

| Begriff       | Englisch           | Definition                                                                                                  | Liegt in                                                                                                                                                                  |
| ------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fehlhandlung  | Error, mistake     | Eine menschliche Handlung, die ein falsches Ergebnis hervorbringt                                           | Dem Menschen: ein Missverständnis, eine falsche Annahme oder ein Versehen, oft verursacht durch Zeitdruck, Komplexität, Ermüdung, fehlendes Wissen oder fehlende Schulung |
| Fehlerzustand | Defect, fault, bug | Eine Imperfektheit oder ein Mangel in einem Arbeitsergebnis, sodass es seine Anforderungen nicht erfüllt    | Einem Arbeitsergebnis: Anforderungen, Entwurf, Quellcode, Testfälle, Build-Skripte                                                                                        |
| Fehlerwirkung | Failure            | Ein Ereignis, bei dem das System eine geforderte Funktion nicht innerhalb der festgelegten Grenzen erbringt | Dem Verhalten des laufenden Systems                                                                                                                                       |

## Abweichungen von der Wirkungskette

- **Fehlerzustände in frühen Arbeitsergebnissen:** Ein Fehlerzustand in einer Anforderung oder im Entwurf, den dort niemand findet, wird in den Code übernommen und kann dort mehrere Fehlerzustände erzeugen.
- **Fehlerzustände ohne Fehlerwirkung:** Ein Fehlerzustand verursacht nur dann eine Fehlerwirkung, wenn der fehlerhafte Teil unter den Bedingungen ausgeführt wird, die ihn sichtbar machen. Manche Fehlerzustände wirken bei jeder Ausführung, manche nur bei bestimmten Eingaben, Konfigurationen oder Lasten und manche nie, z.B. in Code, der nie erreicht wird.
- **Fehlerwirkungen ohne Fehlhandlung:** Umgebungsbedingungen wie Strahlung oder elektromagnetische Felder können Firmware oder Speicher verfälschen und Fehlerwirkungen auslösen, die kein Mensch verursacht hat.

## Grundursache

Die **Grundursache** (Root Cause), nach der eine **Grundursachenanalyse** sucht, ist der tiefere Grund, warum ein Fehlerzustand entstanden ist, meist die Situation, die zur Fehlhandlung geführt hat, z.B. eine mehrdeutige Anforderung oder Zeitdruck. Die Korrektur des Fehlerzustands beseitigt nur diesen einen Fehlerzustand, während die Beseitigung der Grundursache auch weitere Fehlerzustände derselben Art verhindert.

## Testen und Debugging

Der **dynamische Test** führt das Testobjekt aus und löst Fehlerwirkungen aus, die zeigen, dass ein Fehlerzustand existiert, aber nicht, wo er liegt. **Debugging** reproduziert dann die Fehlerwirkung, diagnostiziert sie (Lokalisieren des Fehlerzustands und seiner Grundursache) und behebt den Fehlerzustand.

Der **statische Test** wie Reviews und statische Analyse untersucht Arbeitsergebnisse, ohne sie auszuführen, und findet Fehlerzustände direkt, auch solche in Dokumenten und solche, die nie eine Fehlerwirkung verursachen würden. Da die Stelle des Fehlerzustands bereits bekannt ist, besteht das Debugging hier nur aus der Behebung.

In beiden Fällen folgen nach der Behebung ein [Fehlernachtest und Regressionstests](./test-levels.md#änderungsbezogene-tests).

## Falsch positive und falsch negative Ergebnisse

- **Falsch positiv:** Der Test schlägt fehl, obwohl das Testobjekt korrekt ist, weil der Test oder seine Umgebung fehlerhaft ist, z.B. durch ein falsches erwartetes Ergebnis, falsche Testdaten oder eine fehlerhafte Testumgebung.
- **Falsch negativ:** Der Test besteht, obwohl das Testobjekt einen Fehlerzustand enthält, z.B. weil eine Assertion den falschen Wert prüft oder die Eingabe den Fehlerzustand nicht erreicht.

## Beispiel: Ticketpreis

Die Anforderung an den [`TicketPricer`](./unit-tests.md#aufbau-arrange-act-assert) lautet „Kinder bis 6 Jahre sind frei“, wobei der Vertrieb Kinder vor ihrem sechsten Geburtstag meint.

| Begriff       | Beispiel                                                                          |
| ------------- | --------------------------------------------------------------------------------- |
| Fehlhandlung  | Der Entwickler liest „bis 6 Jahre“ als „bis einschließlich 6“                     |
| Fehlerzustand | Die Bedingung `age <= 6` statt `age < 6`                                          |
| Fehlerwirkung | `priceFor(6)` liefert `0` statt `6`: Ein sechsjähriges Kind erhält ein Freiticket |
| Grundursache  | Die mehrdeutige Formulierung „bis 6 Jahre“ in der Anforderung                     |

Was dieses Beispiel zeigt: Der Fehlerzustand verursacht nur bei der Eingabe `6` eine Fehlerwirkung, sodass Tests mit den Altern `3`, `10` und `30` bestehen und eine Testsuite ohne [Grenzwerttests](./unit-tests.md#grenzwerttests) ihn nicht aufdeckt. Die Korrektur der Bedingung behebt `priceFor`, die mehrdeutige Anforderung bleibt aber bestehen und kann überall dort zum selben Fehlerzustand führen, wo die Altersgrenze ebenfalls implementiert wird, z.B. im Onlineshop.

## Häufige Fehler

1. **Fehlerzustand und Fehlerwirkung als Synonyme:** Ein Testbericht mit der Aussage „der Fehlerzustand ist, dass die Rechnung 120 EUR zeigt“ beschreibt eine Fehlerwirkung. Der Fehlerzustand ist die Stelle im Code, die den falschen Betrag erzeugt.
2. **Bestandene Tests als Beweis für Fehlerfreiheit:** Ein Test deckt einen Fehlerzustand nur auf, wenn er den fehlerhaften Teil mit seiner Eingabe ausführt und eine Fehlerwirkung auslöst, sodass Fehlerzustände, die andere Bedingungen brauchen oder nie eine Fehlerwirkung verursachen, unentdeckt bleiben.
3. **Jeder fehlgeschlagene Test als Fehlerzustand im Testobjekt:** Ein fehlgeschlagener Test kann auch durch den Test, die Testdaten oder die Umgebung verursacht sein, und in diesem Fall sucht das Debugging des Testobjekts nach einem Fehlerzustand, den es nicht gibt.
4. **Korrektur des Fehlerzustands ohne die Grundursache:** Die korrigierte Zeile verursacht keine Fehlerwirkung mehr, aber die Situation, die zur Fehlhandlung geführt hat, bleibt bestehen und kann dieselbe Art von Fehlerzustand an anderer Stelle erzeugen.

## Siehe auch

- [Teststufen](./test-levels.md): auf welcher Stufe welche Fehlerzustände gefunden werden und warum frühe Stufen günstiger sind
- [Unit-Tests](./unit-tests.md): Grenzwerttests und Regressionstests für `TicketPricer`
