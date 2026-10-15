---
title: "Teststufen"
description: "Die Teststufen nach ISTQB: Komponententest, Integrationstest mit seinen Strategien, Platzhaltern und Treibern, Systemtest und Abnahmetest mit seinen Formen, ihr Bezug zum V-Modell, die Testpyramide sowie Fehlernachtests und Regressionstests über alle Stufen."
keywords:
    - Teststufen
    - ISTQB
    - Komponententest
    - Unit-Test
    - Integrationstest
    - Komponentenintegrationstest
    - Systemintegrationstest
    - Big-Bang-Integration
    - Top-down-Integration
    - Bottom-up-Integration
    - Platzhalter
    - Treiber
    - Systemtest
    - Abnahmetest
    - Benutzerabnahmetest
    - Betrieblicher Abnahmetest
    - Alpha-Test
    - Beta-Test
    - V-Modell
    - Testpyramide
    - Fehlernachtest
    - Regressionstest
tags:
    - ap2
---

# Teststufen

Eine **Teststufe** ist eine Gruppe von Testaktivitäten, die gemeinsam organisiert und verwaltet werden und sich auf einen Entwicklungsstand beziehen. Der ISTQB Certified Tester Foundation Level (Lehrplan 4.0) unterscheidet fünf Teststufen: Komponententest, Komponentenintegrationstest, Systemtest, Systemintegrationstest und Abnahmetest. Viele Darstellungen fassen die beiden Integrationsstufen zu einer zusammen und sprechen von vier Teststufen.

Jede Stufe hat ihr eigenes **Testobjekt** (was getestet wird), ihre eigene **Testbasis** (die Dokumente, aus denen Testfälle und erwartete Ergebnisse abgeleitet werden) und ihr eigenes Ziel. Die Testfälle einer Stufe werden entworfen, sobald ihre Testbasis vorliegt, lange bevor sie ausgeführt werden können. Ihr Entwurf deckt mehrdeutige oder widersprüchliche Anforderungen früh auf, solange ihre Korrektur noch günstig ist.

Ein Fehler ist auf der niedrigsten Stufe am günstigsten zu beheben, die ihn finden kann. Dort wird er kurz nach seiner Entstehung gefunden, die Suche beschränkt sich auf ein kleines Testobjekt, und es baut noch keine andere Komponente auf ihm auf. Auf höheren Stufen muss der Fehler erst unter vielen Komponenten lokalisiert werden, und seine Korrektur kann auch abhängige Teile betreffen.

## Vergleich

| Teststufe                                        | Testobjekt                                                                                | Testbasis                                                                                | Ziel                                                                                                                                   | Typische Fehler                                                                                                                    | Getestet von                                  | Umgebung                                                        |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| [Komponententest](#komponententest)              | Einzelne Komponente: Funktion, Klasse, Modul                                              | Feinentwurf, Komponentenspezifikation, Code                                              | Die Komponente arbeitet für sich allein korrekt                                                                                        | Falsche Berechnungen, falsche Bedingungen, nicht behandelte Grenzwerte und Ausnahmen                                               | Entwickler                                    | Entwicklungsumgebung, Testframework, Testdoubles                |
| [Komponentenintegrationstest](#integrationstest) | Schnittstellen und Zusammenspiel zwischen Komponenten                                     | Architekturentwurf, Schnittstellenspezifikationen, Sequenzdiagramme                      | Die Komponenten arbeiten korrekt zusammen                                                                                              | Falsche Datenformate oder Einheiten an einer Schnittstelle, falsche Aufrufreihenfolge, fehlende Parameter, nicht behandelte Fehler | Entwickler, Tester                            | Build-Server oder Integrationsumgebung                          |
| [Systemtest](#systemtest)                        | Das vollständige, integrierte System                                                      | Pflichtenheft, Anwendungsfälle, User Stories, nicht-funktionale Anforderungen            | Das System erfüllt die spezifizierten funktionalen und nicht-funktionalen Anforderungen                                                | Falsche oder fehlende Funktionen, abgebrochene End-to-End-Abläufe, unzureichende Performance oder Sicherheit                       | Unabhängige Tester                            | Produktionsnahe Testumgebung                                    |
| [Systemintegrationstest](#integrationstest)      | Schnittstellen zu externen Systemen, z.B. Zahlungsdienstleister, ERP-System, Webservices  | Schnittstellenvereinbarungen, API-Spezifikationen, systemübergreifende Geschäftsprozesse | Das System arbeitet mit den umgebenden Systemen zusammen                                                                               | Abweichende Nachrichtenstrukturen, Protokollfehler, falsche Interpretation von Daten, keine Reaktion auf Timeouts                  | Tester, oft gemeinsam mit der Partnerseite    | Produktionsnahe Umgebung mit echten oder simulierten Partnern   |
| [Abnahmetest](#abnahmetest)                      | Das System in seinem Nutzungskontext, einschließlich Geschäftsprozessen und Dokumentation | Fachliche Anforderungen, Vertrag, Gesetze und Normen, Benutzer- und Betriebshandbücher   | Nachweis, dass das System die vereinbarten Anforderungen erfüllt und einsatzbereit ist, und die Entscheidung über Abnahme und Freigabe | Abweichungen vom fachlichen Bedarf, unbrauchbare Abläufe, nicht erfüllte vertragliche oder gesetzliche Anforderungen               | Kunde, Benutzer, Betreiber, Aufsichtsbehörden | Produktionsähnliche Umgebung, teilweise die Produktionsumgebung |

## Komponententest

Der Komponententest wird auch **Unit-Test** oder **Modultest** genannt.

- **Isolation:** Jede Komponente wird für sich allein getestet. Abhängigkeiten zu anderen Komponenten, Datenbanken oder dem Netzwerk werden durch Testdoubles ersetzt.
- **Automatisierung:** Ohne diese Abhängigkeiten läuft ein Komponententest in Millisekunden und liefert immer dasselbe Ergebnis. Komponententests lassen sich deshalb leicht automatisieren und bei jedem Build ausführen.
- **White-Box-Test:** Die Testfälle werden aus dem Code und seiner inneren Struktur abgeleitet. Weil das Testobjekt klein ist und die Entwickler seinen Code kennen, ist der Komponententest die einzige Stufe, auf der White-Box-Tests mit gemessener Codeabdeckung üblich sind.

Aufbau, Arten, Testdoubles und die White-Box sind unter [Unit-Tests](./unit-tests.md) ausführlicher beschrieben.

## Integrationstest

**Integration** ist das schrittweise Zusammensetzen getesteter Komponenten zu größeren Einheiten bis hin zum vollständigen System. Jedes Mal, wenn eine Komponente hinzukommt, prüft der Integrationstest die neuen Schnittstellen zwischen ihr und den bereits zusammengesetzten Komponenten. Das ISTQB trennt zwei Stufen:

- **Komponentenintegrationstest:** Testet das Zusammenspiel der Komponenten innerhalb des Systems. Er folgt auf den Komponententest.
- **Systemintegrationstest:** Testet die Schnittstellen zwischen dem System und anderen Systemen. Er folgt auf den Systemtest oder läuft parallel zu ihm, weil die Partnersysteme oft erst spät oder nur als Simulation verfügbar sind.

### Integrationsstrategien

Die Integrationsstrategie legt fest, in welcher Reihenfolge Komponenten zusammengefügt werden. Die Wahl hängt von der Architektur ab, von der Reihenfolge, in der Komponenten fertig werden, und vom Risiko einzelner Schnittstellen.

| Strategie                        | Vorgehen                                                                                                            | Vorteile                                                                 | Nachteile                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Big Bang                         | Alle Komponenten werden auf einmal zusammengefügt und als Ganzes getestet                                           | Keine Platzhalter oder Treiber nötig                                     | Der Test beginnt erst, wenn alles fertig ist, Fehler sind schwer zu lokalisieren                    |
| Top-down                         | Beginnt mit der obersten Komponente, z.B. der Benutzeroberfläche, und ergänzt die aufgerufenen Komponenten darunter | Früh ein lauffähiges Gerüst des Systems, früh Feedback zum Ablauf        | Viele Platzhalter nötig, untere Komponenten werden spät getestet                                    |
| Bottom-up                        | Beginnt mit den untersten Komponenten, z.B. dem Datenzugriff, und ergänzt die aufrufenden Komponenten darüber       | Keine Platzhalter nötig, Basiskomponenten werden früh gründlich getestet | Viele Treiber nötig, das System als Ganzes wird erst am Ende sichtbar                               |
| Sandwich (hybrid)                | Kombiniert Top-down für die oberen und Bottom-up für die unteren Schichten, die sich in der Mitte treffen           | Obere und untere Schichten werden parallel getestet                      | Höherer Planungsaufwand, die mittlere Schicht wird zuletzt getestet                                 |
| Funktionsorientiert inkrementell | Integriert jeweils die Komponenten, die für eine Funktion oder einen Geschäftsprozess benötigt werden               | Früh nutzbare Funktionen, Reihenfolge folgt der fachlichen Priorität     | Erfordert Wissen, welche Komponenten eine Funktion berührt, Platzhalter und Treiber weiterhin nötig |

- **Inkrementell:** Komponenten werden einzeln oder in kleinen Gruppen hinzugefügt, und jeder Schritt wird vor dem nächsten getestet. Top-down, Bottom-up, Sandwich und funktionsorientiert inkrementelle Integration gehören zu dieser Gruppe.
- **Nicht inkrementell:** Big Bang ist die einzige Strategie dieser Art.

**Continuous Integration** ist eine Form der inkrementellen Integration, bei der jede Änderung in den Hauptzweig integriert und automatisch getestet wird, sobald sie eingecheckt ist, und nicht erst am Ende einer Entwicklungsphase.

### Platzhalter und Treiber

Die inkrementelle Integration testet eine Komponente, bevor alle Komponenten um sie herum integriert sind. Bei der Top-down-Integration fehlen noch die Komponenten, die das Testobjekt aufruft, und ein **Platzhalter (Stub)** springt für sie ein. Bei der Bottom-up-Integration gibt es noch keine Komponente, die das Testobjekt aufruft, und ein **Treiber (Driver)** übernimmt diese Rolle.

|                            | Platzhalter (Stub)                                            | Treiber (Driver)                                                |
| -------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| Ersetzt                    | Eine Komponente, die vom Testobjekt **aufgerufen** wird       | Eine Komponente, die das Testobjekt **aufruft**                 |
| Position in der Hierarchie | Unterhalb des Testobjekts                                     | Oberhalb des Testobjekts                                        |
| Verhalten                  | Liefert feste oder einfache Antworten statt echter Ergebnisse | Liefert Eingabedaten, ruft das Testobjekt auf, prüft Ergebnisse |
| Beispiel                   | Zahlungsdienst, der jede Zahlung bestätigt                    | Testprogramm, das die Datenzugriffsschicht direkt aufruft       |

In automatisierten Tests übernimmt die Testmethode die Rolle des Treibers, sodass kein eigenes Treiberprogramm geschrieben wird. Sie ruft das Testobjekt mit im Test festgelegten Eingabedaten auf und prüft die Ergebnisse mit Assertions.

Als eine Art von [Testdouble](./unit-tests.md#testdoubles) ersetzen Platzhalter auch im Komponententest die Abhängigkeiten der isolierten Komponente.

## Systemtest

Der Systemtest prüft das vollständige System aus Sicht seiner Benutzer und gegen seine Spezifikation. Die Testfälle werden ohne Kenntnis des Codes abgeleitet (Black-Box-Test), typischerweise als End-to-End-Szenarien entlang von Anwendungsfällen oder Geschäftsprozessen.

- **Funktionaler Systemtest:** Prüft, *was* das System tut, d.h. ob jede spezifizierte Funktion das erwartete Ergebnis liefert, z.B. ob eine Bestellung gespeichert und eine Rechnung erstellt wird.
- **Nicht-funktionaler Systemtest:** Prüft, *wie gut* das System es tut, entlang der Qualitätsmerkmale der [ISO/IEC 25010](../projectmanagement/iso-25010.md). Beispiele sind Last- und Performancetests, Sicherheitstests, Gebrauchstauglichkeitstests, Kompatibilitätstests mit verschiedenen Browsern und Betriebssystemen sowie Wiederherstellungstests nach einem Ausfall.

Die Testumgebung wird so produktionsnah wie möglich aufgebaut:

- **Infrastruktur:** Es werden dasselbe Betriebssystem, dieselben Datenbank- und Middleware-Versionen sowie vergleichbare Hardware, ein vergleichbares Netzwerk und eine vergleichbare Konfiguration verwendet. Viele [Fehlerwirkungen](./error-defect-failure.md) treten nur bei einer bestimmten Konfiguration auf und blieben in einer Entwicklungsumgebung unentdeckt.
- **Datenmenge:** Realistische Datenmengen decken Fehlerwirkungen auf, die nur unter Last auftreten.
- **Testdaten:** Testdaten werden erzeugt oder durch Anonymisierung aus Produktionsdaten abgeleitet. Personenbezogene Daten aus der Produktion dürfen ohne Rechtsgrundlage nicht zum Testen verwendet werden ([DSGVO](../commercial/personal-data.md)).
- **Trennung von der Produktion:** Die Produktionsumgebung selbst wird für Systemtests nicht verwendet, weil Testläufe echte Daten verändern oder beschädigen könnten.

Der Systemtest wird von Testern durchgeführt, die das System nicht entwickelt haben. Unabhängige Tester teilen die Annahmen der Entwickler nicht und finden deshalb Missverständnisse der Anforderungen, die die Entwickler eventuell sowohl in den Code als auch in die Komponententests übernommen haben.

## Abnahmetest

Der Abnahmetest prüft, ob das System für seinen vorgesehenen Einsatz geeignet ist, und dient als Grundlage für die Entscheidung über Abnahme und Freigabe. Sein Hauptziel ist nicht, Fehler zu finden, sondern nachzuweisen, dass das System die vereinbarten Anforderungen erfüllt und einsatzbereit ist. Viele Fehlerwirkungen auf dieser Stufe zeigen, dass die unteren Stufen unzureichend waren. Die Abnahmekriterien werden vor der Entwicklung vereinbart, z.B. im [Lastenheft](../projectmanagement/requirements-specification.md) oder als Akzeptanzkriterien von User Stories.

| Form                            | Prüft                                                                                                                                                       | Durchgeführt von                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Benutzerabnahmetest (UAT)       | Ob die Benutzer ihre Geschäftsprozesse mit dem System in einer realen oder simulierten Arbeitsumgebung ausführen können                                     | Vorgesehene Benutzer                     |
| Betrieblicher Abnahmetest (OAT) | Ob das System betrieben werden kann: Installation, Datensicherung und Wiederherstellung, Notfallwiederherstellung, Benutzerverwaltung, Überwachung, Patchen | Administratoren, Betriebsteam            |
| Vertraglicher Abnahmetest       | Ob die im Vertrag vereinbarten Abnahmekriterien erfüllt sind, typischerweise bei Individualsoftware                                                         | Kunde                                    |
| Regulatorischer Abnahmetest     | Ob das System Gesetze, Normen und Vorschriften einhält, z.B. DSGVO, Barrierefreiheit nach BITV 2.0, Medizinprodukteverordnung                               | Kunde, Prüfer, Aufsichtsbehörden         |
| Alpha-Test                      | Verhalten eines Produkts für den Massenmarkt, getestet beim Hersteller                                                                                      | Potenzielle Benutzer, unabhängige Tester |
| Beta-Test                       | Verhalten eines Produkts für den Massenmarkt, getestet bei den Benutzern in deren eigener Umgebung                                                          | Ausgewählte echte Benutzer               |

### Abnahmeprotokoll

Das Ergebnis einer förmlichen Abnahme wird in einem **Abnahmeprotokoll** festgehalten. Es enthält:

- Datum, Ort und Teilnehmer
- Testobjekt mit Version sowie den Vertrag oder die Spezifikation, gegen die geprüft wird
- Durchgeführte Tests und ihre Ergebnisse
- Gefundene Mängel, nach Schwere eingestuft, mit Fristen für ihre Beseitigung
- Ergebnis: Abnahme, Abnahme unter Vorbehalt der aufgeführten Mängel oder Verweigerung
- Unterschriften beider Parteien

Wird die Software im Rahmen eines Werkvertrags (§ 631 BGB) erstellt, hat die Abnahme rechtliche Folgen:

- Die Vergütung wird fällig.
- Die Verjährungsfrist für Mängelansprüche beginnt.
- Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung des Werks geht auf den Besteller über (§ 644 BGB).
- Die Beweislast für Mängel geht auf den Besteller über. Vor der Abnahme muss der Unternehmer die Mangelfreiheit beweisen.
- Wegen bei der Abnahme bekannter Mängel können Nacherfüllung, Rücktritt und Minderung später nur verlangt werden, wenn sie im Abnahmeprotokoll vorbehalten werden.
- Setzt der Unternehmer dem Besteller nach Fertigstellung des Werks eine angemessene Frist zur Abnahme und verweigert der Besteller die Abnahme nicht innerhalb dieser Frist unter Angabe mindestens eines Mangels, gilt das Werk als abgenommen.

## Teststufen im Entwicklungsprozess

Sequenzielle und agile Entwicklung verwenden dieselben Teststufen mit denselben Testbasen, durchlaufen sie aber zu unterschiedlichen Zeitpunkten und unterschiedlich oft.

### V-Modell

Jedes Spezifikationsdokument auf dem linken Ast des [V-Modells](../projectmanagement/classic-vs-agile.md#v-modell) ist die Testbasis der gegenüberliegenden Teststufe.

### Agile Entwicklung

Die Teststufen laufen nicht als aufeinanderfolgende Phasen ab. Komponenten-, Integrations- und Systemtests finden innerhalb jeder Iteration statt, und die Abnahme des Inkrements durch den Product Owner entspricht dem Abnahmetest.

## Testpyramide

Die **Testpyramide** von Mike Cohn (*Succeeding with Agile*, 2009) betrachtet nur automatisierte Tests und beschreibt, wie viele davon welcher Granularität eine Testsuite enthalten sollte.

| Schicht                  | Tests                                                                               | Anteil   | Geschwindigkeit und Stabilität                                   |
| ------------------------ | ----------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------- |
| UI / End-to-End (Spitze) | Vollständige Abläufe über die Benutzeroberfläche, z.B. mit Selenium oder Playwright | ca. 10 % | Sekunden bis Minuten pro Test, anfällig bei jeder Layoutänderung |
| Service / Integration    | Zusammenspiel von Komponenten und mit der Datenbank, APIs ohne Benutzeroberfläche   | ca. 20 % | Sekunden pro Test, abhängig von der Infrastruktur                |
| Unit (Basis)             | Einzelne Komponenten in Isolation                                                   | ca. 70 % | Millisekunden pro Test, deterministisch                          |

Die Prozentwerte sind eine häufig zitierte Faustregel, Cohn selbst hat aber keine Werte angegeben. Weil höhere Tests langsamer, anfälliger und teurer in Erstellung und Wartung sind und ein fehlschlagender Test auf hoher Ebene nicht zeigt, welche Komponente den Fehler enthält, wird jedes Verhalten auf der niedrigsten Schicht getestet, die einen Fehler darin erkennen kann, und End-to-End-Tests decken nur die wichtigsten Abläufe ab.

Das Gegenstück zur Testpyramide ist das Anti-Pattern **Eiswaffel** (*ice cream cone*, Alister Scott): wenige Unit-Tests unten, viele End-to-End-Tests darüber und obendrauf ein großer Anteil manueller Tests. Anders als bei der Pyramide sind hier die meisten Tests langsam, sodass Entwickler lange auf Feedback zu ihren Änderungen warten.

## Änderungsbezogene Tests

Nach einer Änderung oder Fehlerbehebung werden bestehende Tests erneut ausgeführt.

- **Fehlernachtest:** Zeigt, dass die Behebung den Fehler beseitigt hat, indem die Tests erneut ausgeführt werden, die ihn aufgedeckt haben.
- **Regressionstest:** Zeigt, dass die Änderung keine zuvor funktionierenden Teile beschädigt hat. Er reicht von den automatisierten Komponententests bei jedem Build bis zu einem wiederholten Abnahmetest vor einem neuen Release.

## Beispiel: Rabatt im Onlineshop

Ein Onlineshop führt einen Rabatt ein: Bestellungen ab 100 EUR erhalten 5 % Nachlass.

| Teststufe                    | Testfall                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Komponententest              | `DiscountCalculator` liefert 0 für 99,99 EUR und 5,00 für 100,00 EUR                                                |
| Komponentenintegrationstest  | Der Warenkorb übergibt die Bruttosumme in Cent, und `DiscountCalculator` interpretiert sie als Cent, nicht als Euro |
| Systemtest                   | Ein Kunde bestellt über die Weboberfläche für 120 EUR, und Bestellbestätigung und Rechnung zeigen 114 EUR           |
| Systemtest, nicht-funktional | Der Bestellabschluss mit Rabatt antwortet bei 500 gleichzeitigen Benutzern innerhalb von 2 Sekunden                 |
| Systemintegrationstest       | Der Zahlungsdienstleister erhält 114 EUR, nicht 120 EUR                                                             |
| Abnahmetest                  | Die Vertriebsabteilung gibt Testbestellungen auf und bestätigt, dass der Rabatt den Aktionsbedingungen entspricht   |

Was dieses Beispiel zeigt: Übergibt der Warenkorb die Summe in Cent, während `DiscountCalculator` Euro erwartet, kommt eine Bestellung über 99,99 EUR als 9999 an und erhält einen Rabatt. Der Komponententest kann diesen Fehler nicht finden, weil der Rechner für sich allein korrekt ist. Erst der Komponentenintegrationstest, der den Warenkorb mit dem Rechner verbindet, deckt ihn auf.

## Häufige Fehler

1. **Integrationstest als wiederholter Komponententest:** Integrationstests, die die Berechnungen der einzelnen Komponenten erneut prüfen, z.B. jede Rabattgrenze über den gesamten Bestellvorgang, wiederholen die Komponententests mit höherem Aufwand. Die Testfälle eines Integrationstests zielen stattdessen auf die Schnittstellen, d.h. auf Datenformate, Aufrufreihenfolge und Fehlerbehandlung zwischen den Komponenten.
2. **Platzhalter und Treiber vertauscht:** Ein Platzhalter wird vom Testobjekt aufgerufen und ersetzt eine Komponente darunter. Ein Treiber ruft das Testobjekt auf und ersetzt eine Komponente darüber. Die Top-down-Integration benötigt deshalb Platzhalter, die Bottom-up-Integration Treiber.
3. **Big Bang als Zeitersparnis:** Alles auf einmal zu integrieren spart den Aufwand für Platzhalter und Treiber, eine Fehlerwirkung kann dann aber aus jeder der Schnittstellen stammen. Die Zeit für die Fehlerlokalisierung übersteigt den eingesparten Aufwand meistens.
4. **Systemtest in der Entwicklungsumgebung:** Fehlerwirkungen, die durch Konfiguration, Betriebssystem- oder Datenbankversionen, Datenmengen oder Last entstehen, treten dort nicht auf und werden erst in der Produktion gefunden.
5. **Produktionsdaten als Testdaten:** Personenbezogene Daten aus der Produktion ohne Rechtsgrundlage in die Testumgebung zu kopieren, verstößt gegen die DSGVO.
6. **Abnahmetest als Fehlersuche:** Seine Testfälle decken die vereinbarten Abnahmekriterien ab, nicht Grenzwerte oder Schnittstellen. Fehler, die bis zu dieser Stufe liegen bleiben, werden deshalb am teuersten Punkt gefunden oder gelangen unentdeckt in die Produktion.
7. **Nicht-funktionale Anforderungen erst am Ende getestet:** Performance- und Sicherheitsprobleme haben ihre Ursache oft in der Architektur. Werden sie erst im Abnahmetest entdeckt, erfordert ihre Behebung oft Änderungen an der Architektur.
8. **Testpyramide als festes Verhältnis:** Das Verhältnis ist kein Ziel, sondern das Ergebnis davon, jedes Verhalten auf der niedrigsten Schicht zu testen, die einen Fehler darin erkennen kann.

## Siehe auch

- [Unit-Tests](./unit-tests.md): Aufbau, Arten und Testdoubles von Komponententests
- [Fehlhandlung, Fehlerzustand und Fehlerwirkung](./error-defect-failure.md): die Begriffe für Ursache und Wirkung eines Fehlers
- [Klassisches vs. agiles Projektmanagement](../projectmanagement/classic-vs-agile.md): das V-Modell als Vorgehensmodell
- [Softwarequalität nach ISO/IEC 25010](../projectmanagement/iso-25010.md): die Qualitätsmerkmale, die nicht-funktionale Tests prüfen
- [Lastenheft/Pflichtenheft](../projectmanagement/requirements-specification.md): die Dokumente, die die Testbasis von System- und Abnahmetests bilden
- [Anwendungsfalldiagramm](./uml/use-case-diagram.md): Anwendungsfälle als Grundlage für Systemtestszenarien
