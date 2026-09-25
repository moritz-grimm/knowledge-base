---
title: "Service-Modelle (IaaS, PaaS, SaaS)"
sidebar_position: 2
description: "On-Premise, Infrastructure-as-a-Service, Platform-as-a-Service, Function-as-a-Service und Software-as-a-Service erklärt"
keywords:
    - "IaaS"
    - "PaaS"
    - "SaaS"
    - "Cloud-Service-Modelle"
    - "Infrastructure as a Service"
    - "Platform as a Service"
    - "Software as a Service"
    - "FaaS"
    - "Function as a Service"
    - "Serverless"
tags:
    - ap2
---

# Cloud-Service-Modelle

## Überblick

Cloud-Computing-Dienste werden typischerweise in drei Haupt-Service-Modelle kategorisiert, die jeweils unterschiedliche Stufen von Kontrolle & Flexibilität bieten.

| Service-Modell                                      | Kunde verwaltet                                         | Anbieter verwaltet                                                                           | Beispiele                                            |
| --------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **[On-Premise](#on-premise)**                       | Alles                                                   | Nichts                                                                                       | Eigenes Datencenter, lokale Server                   |
| **[IaaS](#infrastructure-as-a-service-iaas)**       | Betriebssystem, Middleware, Runtime, Daten, Anwendungen | Virtualisierung, Server, Speicher, Netzwerk                                                  | AWS EC2, Azure VMs, Google Compute Engine            |
| **[PaaS](#platform-as-a-service-paas)**             | Daten, Anwendungen                                      | Runtime, Middleware, Betriebssystem, Virtualisierung, Server, Speicher, Netzwerk             | Heroku, Google App Engine, Azure App Service, Vercel |
| **[FaaS](#function-as-a-service-faas--serverless)** | Einzelne Funktionen, Daten                              | Runtime, Skalierung, Middleware, Betriebssystem, Virtualisierung, Server, Speicher, Netzwerk | AWS Lambda, Azure Functions, Cloudflare Workers      |
| **[SaaS](#software-as-a-service-saas)**             | Nur Konfiguration                                       | Alles                                                                                        | Gmail, Salesforce, Microsoft 365, Dropbox            |

---

## On-Premise

### Definition

On-Premise (auch "On-Prem" genannt) bedeutet das Betreiben und Verwalten der gesamten IT-Infrastruktur lokal in den eigenen Einrichtungen. Es ist kein Cloud-Anbieter beteiligt. Das Unternehmen besitzt, betreibt und wartet alles, von der physischen Hardware bis zu den Anwendungen.

### Leistungsumfang

- Physische Server und Hardware
- Komplette Kontrolle über alle Layer
- Daten bleiben innerhalb der eigenen Einrichtung
- Keine Abhängigkeit von externen Anbietern

### Verantwortlichkeiten

**Unternehmen verwaltet:**

- Physische Hardware (Server, Speicher, Netzwerk)
- Virtualisierung
- Betriebssysteme
- Middleware
- Runtime-Umgebungen
- Anwendungen
- Daten
- Security, Backups, Wiederherstellung im Katastrophenfall

### Anwendungsfälle

- **Strenge Compliance-Anforderungen:** Branchen mit strikten Datenverordnungen (z.B. öffentliche Verwaltung, Gesundheitswesen, Finanzwesen)
- **Legacy-Systeme:** Anwendungen, die nicht in die Cloud migriert werden können
- **Low-Latency-Anforderungen:** Systeme mit Anforderungen an niedrige Netzwerklatenz
- **Vollständige Datensouveränität:** Sensible Daten, die vollständig im Haus bleiben müssen

### Vorteile

- Vollständige Kontrolle über Hardware und Software
- Daten verlassen niemals die eigenen Einrichtungen
- Keine wiederkehrenden Cloud-Abonnementkosten
- Keine Abhängigkeit von einer Internetverbindung
- Leichtere Einhaltung strenger Datenvorschriften

### Nachteile

- Hohe Anfangsinvestitionen (Hardware, Gebäude, Kühlung)
- Erfordert dediziertes IT-Personal zur Wartung
- Skalierung erfordert Kauf und Installation von neuer Hardware
- Volle Verantwortung für alle Updates, Patches und Security
- Hardware kann veralten

---

## Infrastructure as a Service (IaaS)

### Definition

IaaS stellt nur virtualisierte Computing-Ressourcen über das Internet bereit. Es bietet die grundlegenden Bausteine, um eine eigene Cloud-IT-Infrastruktur aufzubauen.

### Leistungsumfang

- Virtuelle Maschinen
- Speicher
- Netzwerke
- Betriebssystem-Images

### Verantwortlichkeiten

**Kunde verwaltet:**

- Betriebssysteme
- Anwendungen
- Daten
- Runtime-Umgebungen
- Middleware

**Anbieter verwaltet:**

- Physische Server
- Speicher-Hardware
- Netzwerk-Equipment
- Virtualisierungsschicht

### Anwendungsfälle

- **Testing und Development:** Schnelles Hochfahren/Herunterfahren von Testumgebungen
- **Website-Hosting:** Websites mit voller Kontrolle über die Infrastruktur hosten
- **Speicher und Backup:** Großangelegte Datenspeicherlösungen
- **High-Performance Computing:** Rechenintensive Workloads

### Vorteile

- Vollständige Kontrolle über die Infrastruktur
- Pay-as-you-go-Preismodell
- Hochgradig skalierbar
- Keine physische Hardware-Wartung

### Nachteile

- Erfordert technisches Fachwissen
- Sicherheits-Patches und Updates liegen allein beim Kunden
- Mehr Verwaltungsaufwand als bei PaaS/SaaS

### Beispiele

- Amazon Web Services (AWS) EC2
- Microsoft Azure Virtual Machines
- Google Compute Engine
- Hetzner

---

## Platform as a Service (PaaS)

### Definition

PaaS bietet eine Plattform, die es Kunden ermöglicht, Anwendungen zu entwickeln, auszuführen und zu verwalten, ohne sich um die Infrastruktur kümmern zu müssen.

### Leistungsumfang

- **Fertige Laufzeitumgebungen** (Node.js, Python, Java, PHP, ...)
- **Verwaltete Datenbanken** (PostgreSQL, MySQL, MongoDB, Redis)
- **Automatisches Deployment** (Code via Git pushen => automatische Builds)
- **Eingebaute Skalierung** (die Anwendung skaliert automatisch je nach Traffic)
- **Entwicklungstools** (Logging, Monitoring, Debugging)

### Verantwortlichkeiten

**Kunde verwaltet:**

- Anwendungen
- Daten

**Anbieter verwaltet:**

- Runtime-Umgebung
- Middleware
- Betriebssysteme
- Virtualisierung
- Server, Speicher, Netzwerk

### Anwendungsfälle

- **Anwendungsentwicklung:** Apps ohne Sorgen um Infrastruktur erstellen
- **API-Entwicklung und -Verwaltung:** APIs erstellen und hosten
- **Microservices-Architektur:** Containerisierte Anwendungen deployen

### Vorteile

- Schnellere Entwicklung und schnelleres Deployment
- Integrierte Skalierbarkeit
- Reduzierte Verwaltungskomplexität
- Fokus auf Code, nicht auf Infrastruktur
- Integrierte Entwicklungstools

### Nachteile

- Weniger Kontrolle als bei IaaS
- Potenzieller Vendor-Lock-in
- Unterstützt möglicherweise nicht alle Programmiersprachen/Frameworks
- Begrenzte Anpassungsmöglichkeiten

### Beispiele

- Heroku
- Google App Engine
- Microsoft Azure App Service
- Red Hat OpenShift
- AWS Elastic Beanstalk
- Vercel, Netlify

---

## Function as a Service (FaaS) / Serverless

### Definition

FaaS ist die konsequente Fortsetzung von PaaS: Die Einheit, die ausgeliefert wird, ist keine Anwendung mehr, sondern eine einzelne Funktion. Sie läuft nicht dauerhaft, sondern wird durch ein Ereignis gestartet, verarbeitet es und wird wieder beendet.

"Serverless" ist der weitere Begriff für dieses Betriebsmodell und irreführend: Server sind weiterhin beteiligt, aber für den Kunden nicht mehr sichtbar oder verwaltbar. Neben FaaS umfasst der Begriff auch verwaltete Dienste, die demselben Prinzip folgen, etwa serverlose Datenbanken, Objektspeicher und Nachrichtenwarteschlangen.

### Leistungsumfang

- **Ereignisgesteuerte Ausführung:** HTTP-Anfrage, Zeitplan, Nachricht in einer Warteschlange, Dateiupload, Datenbankänderung
- **Automatische Skalierung ab null:** keine Instanz im Ruhezustand, viele parallele Instanzen unter Last
- **Keine Kapazitätsplanung:** keine Instanzanzahl, keine Maschinengröße, keine Autoscaling-Regeln
- **Abrechnung je Aufruf:** Ausführungszeit und Speicher, üblicherweise millisekundengenau
- **Integriertes Logging und Monitoring** durch die Plattform

### Verantwortlichkeiten

**Kunde verwaltet:**

- Den Funktionscode und seine Abhängigkeiten
- Die Konfiguration: Auslöser, Berechtigungen, Umgebungsvariablen, Speicher und Zeitlimit
- Daten und externen Zustand

**Anbieter verwaltet:**

- Laufzeitumgebung und deren Updates
- Skalierung, einschließlich der Anzahl paralleler Instanzen
- Middleware, Betriebssystem, Virtualisierung
- Server, Speicher, Netzwerk

### Eigenschaften

| Eigenschaft        | Folge für den Entwurf                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Zustandslos        | Eine Funktion behält zwischen zwei Aufrufen keinen Zustand. Zustand gehört in eine Datenbank, einen Cache oder einen Objektspeicher            |
| Cold Start         | Der erste Aufruf nach einer Ruhephase benötigt zusätzliche Zeit für den Start der Laufzeitumgebung, was bei latenzkritischen Anfragen auffällt |
| Ausführungslimit   | Ein Aufruf wird nach einer maximalen Laufzeit abgebrochen. Langlaufende Aufgaben müssen daher aufgeteilt werden                                |
| Ereignisgesteuert  | Die Funktion läuft nur, wenn ein Ereignis sie auslöst, und kann nicht von selbst starten                                                       |
| Skalierung ab null | Eine Lastspitze erzeugt viele parallele Cold Starts                                                                                            |

### Anwendungsfälle

- **APIs und Webhooks:** Endpunkte mit unregelmäßiger oder unvorhersehbarer Last
- **Ereignisverarbeitung:** Reaktion auf einen Upload, eine Nachricht in einer Warteschlange oder eine Datenbankänderung
- **Geplante Aufgaben:** Aufräumen, Berichte, Importe nach Zeitplan
- **Verbindungscode:** kleine Transformationen zwischen zwei Diensten
- **Bild- und Dateiverarbeitung:** Erzeugen von Vorschaubildern nach einem Upload

### Vorteile

- Keine Serveradministration und keine Kapazitätsplanung
- Kosten skalieren genau mit der Last und Ruhezeit ist kostenlos
- Sehr schnell von der Idee zum ausgelieferten Endpunkt
- Die Skalierung übernimmt die Plattform

### Nachteile

- Cold Starts machen die Latenz weniger vorhersehbar
- Begrenzte Laufzeit, Speichergröße und Paketgröße je Funktion
- Starke Anbieterabhängigkeit, da Auslöser und Berechtigungsmodelle anbieterspezifisch sind
- Debugging und lokales Testen sind aufwendiger als bei einer dauerhaft laufenden Anwendung
- Viele kleine Funktionen verteilen die Logik und erschweren das Verständnis des Gesamtverhaltens
- Bei dauerhaft hoher Last ist eine permanent laufende Instanz meist günstiger

### Beispiele

- AWS Lambda
- Azure Functions
- Google Cloud Functions / Cloud Run Functions
- Cloudflare Workers
- Vercel Functions, Netlify Functions

---

## Software as a Service (SaaS)

### Definition

SaaS liefert voll funktionsfähige Anwendungen über das Internet. Nutzer greifen auf Software über einen Webbrowser zu, ohne Installation oder Wartung.

### Leistungsumfang

- Sofort einsatzbereite Anwendungen
- Automatische Updates
- Zugriff von jedem Gerät mit Internet
- Multi-Tenant-Architektur

### Verantwortlichkeiten

**Kunde verwaltet:**

- Benutzerkonfiguration
- Dateneingabe
- Zugriffsberechtigungen

**Anbieter verwaltet:**

- Alles andere (Anwendung, Daten, Runtime, Middleware, Betriebssystem, Infrastruktur)

### Anwendungsfälle

- **E-Mail und Kommunikation:** Business-E-Mail, Messaging
- **Customer Relationship Management (CRM)**
- **Kollaborationstools:** Dokumenten-Sharing, Projektmanagement
- **Office-Produktivität:** Textverarbeitung, Tabellenkalkulation, Präsentationen
- **Personalwesen:** Gehaltsabrechnung, Recruiting, Mitarbeiterverwaltung

### Vorteile

- Keine Installation oder Wartung erforderlich
- Automatische Updates
- Niedrigere Anfangskosten
- Einfach zu verwenden und zu skalieren

### Nachteile

- Keine Kontrolle über die Infrastruktur und vollständige Abhängigkeit von der betreibenden Firma
- Begrenzte Anpassung
- Datensicherheitsbedenken (Daten extern in der Cloud gespeichert)
- Abonnementkosten können sich summieren
- Abhängig von einer Internetverbindung

### Beispiele

- **Google Workspace** (Gmail, Google Docs, Drive)
- **Microsoft 365** (Outlook, Word, Excel, Teams)
- **ADITO** (CRM)
- **Slack** (Team-Kommunikation)
- **Dropbox** (Dateispeicher)
- **Zoom** (Videokonferenzen)

---

## Die Pizza-Analogie

- **On-Premise:** Pizza zu Hause selbst machen
- **IaaS:** Pizzateig und Belag kaufen und selbst backen
- **PaaS:** Pizza mit selbst gewähltem Belag zur Lieferung bestellen
- **FaaS:** Bei Hunger ein einzelnes Stück kaufen und pro Stück zahlen (nichts wird warmgehalten)
- **SaaS:** In einem Pizza-Restaurant essen

---

## Zusätzliche Service-Modelle

Über die drei Kernmodelle und [FaaS](#function-as-a-service-faas--serverless) hinaus gibt es weitere spezialisierte Service-Modelle:

### Database as a Service (DBaaS)

- Verwaltete Datenbanklösungen
- Beispiele: Amazon RDS, Azure SQL Database, MongoDB Atlas

### Container as a Service (CaaS)

- Container-Orchestrierungsplattformen
- Beispiele: Amazon ECS, Google Kubernetes Engine, Azure Kubernetes Service

### Desktop as a Service (DaaS)

- Virtuelle Desktops über die Cloud bereitgestellt
- Beispiele: Amazon WorkSpaces, Azure Virtual Desktop, Citrix DaaS

### Backend as a Service (BaaS)

- Backend vom Anbieter verwaltet, Frontend vom Kunden
- Beispiele: Supabase, Firebase
