---
title: "Service-Modelle (IaaS, PaaS, SaaS)"
sidebar_position: 2
description: "Infrastructure-as-a-Service, Platform-as-a-Service und Software-as-a-Service erklärt"
keywords:
  - "IaaS"
  - "PaaS"
  - "SaaS"
  - "Cloud Service-Modelle"
  - "Infrastructure as a Service"
  - "Platform as a Service"
  - "Software as a Service"
---

# Cloud Service-Modelle

## Überblick

Cloud-Computing-Dienste werden typischerweise in drei Haupt-Service-Modelle kategorisiert, die jeweils unterschiedliche Stufen von Kontrolle & Flexibilität bieten.

| Service-Modell                                | Du verwaltest                                           | Anbieter verwaltet                                                               | Beispiele                                    |
| --------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------- |
| **[On-Premise](#on-premise)**                 | Alles                                                   | Nichts                                                                           | Eigenes Datencenter, Lokaler Serverraum      |
| **[IaaS](#infrastructure-as-a-service-iaas)** | Betriebssystem, Middleware, Runtime, Daten, Anwendungen | Virtualisierung, Server, Speicher, Netzwerk                                      | AWS EC2, Azure VMs, Google Compute Engine    |
| **[PaaS](#platform-as-a-service-paas)**       | Daten, Anwendungen                                      | Runtime, Middleware, Betriebssystem, Virtualisierung, Server, Speicher, Netzwerk | Heroku, Google App Engine, Azure App Service |
| **[SaaS](#software-as-a-service-saas)**       | Nur Konfiguration                                       | Alles                                                                            | Gmail, Salesforce, Microsoft 365, Dropbox    |

---

## On-Premise

### Definition

On-premise (auch oft "on-prem" genannt) bedeutet das Betreiben und Managen der gesamten IT-Infrastruktur lokal in den eigenen Einrichtungen. Es sind keine Cloud-Anbieter involviert. Dein Unternehmen besitzt, betreibt und verwaltet alles, von der physischen Hardware bis zu den Anwendungen.

### Was du bekommst

- Physische Server und Hardware
- Komplette Kontrolle über alle Layer
- Daten bleiben innerhalb der eigenen Einrichtung
- Keine Abhängigkeiten von anderen Anbietern

### Verantwortlichkeiten

**Du verwaltest:**

- Physische Hardware (Server, Speicher, Netzwerk)
- Virtualisierung
- Betriebssysteme
- Middleware
- Runtime-Umgebungen
- Anwendungen
- Daten
- Security, Backups, Wiederherstellung im Katastrophenfall

### Anwendungsfälle

- **Strenge Compliance-Anforderungen**: Branchen mit strikten Datenverordnungen (z.B. Regierungen, Gesundheitswesen, Finanzwesen)
- **Legacy-Systeme**: Anwendungen, die nicht in die Cloud migriert werden können
- **Low-Latency-Anforderungen**: Systeme mit Anforderungen an niedrige Netzwerklatenz
- **Datensouveränität**: Sensible Daten, die vollständig im Haus bleiben müssen

### Vorteile

- Vollständige Kontrolle über Hardware und Software
- Daten verlassen niemals die eigenen Einrichtungen
- Keine wiederkehrenden Cloud-Kosten
- Keine Abhängigkeit von einer Internetverbindung
- Leichtere Einhaltung strenger Datenvorschriften

### Nachteile

- Hohe Anfangsinvestitionen (Hardware, Gebäude, Kühlung)
- Erfordert dediziertes IT-Personal zur Wartung
- Skalierung erfordert Kauf und Installation von neuer Hardware
- Selbstverantwortlich für alle Updates, Patches und Security
- Hardware kann veralten

---

## Infrastructure as a Service (IaaS)

### Definition

IaaS stellt nur die virtualisierte Computing-Ressourcen über das Internet bereit. Es bietet die grundlegenden Bausteine um seine eigene Cloud-IT-Infrastruktur zu bauen.

### Was du bekommst

- Virtuelle Maschinen
- Speicher
- Netzwerke
- Betriebssysteme

### Verantwortlichkeiten

**Du verwaltest:**

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

- **Testing und Development**: Schnelles Hochfahren/Herunterfahren von Testumgebungen
- **Website-Hosting**: Websites mit voller Kontrolle über die Infrastruktur hosten
- **Speicher und Backup**: Großangelegte Datenspeicherlösungen
- **High-Performance Computing**: Rechenintensive Workloads

### Vorteile

- Vollständige Kontrolle über die Infrastruktur
- Pay-as-you-go Preismodell
- Hochgradig skalierbar
- Keine physische Hardware-Wartung

### Nachteile

- Erfordert technisches Fachwissen
- Du verwaltest Sicherheits-Patches und Updates alleine
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

### Was du bekommst

- **Fertige Laufzeitumgebungen** (Node.js, Python, Java, PHP, ...)
- **Verwaltete Datenbanken** (PostgreSQL, MySQL, MongoDB, Redis)
- **Automatisches Deployment** (Code via Git pushen => automatische Builds)
- **Eingebaute Skalierung** (deine App skaliert automatisch je nach Traffic)
- **Entwicklungstools** (Logging, Monitoring, Debugging)

### Verantwortlichkeiten

**Du verwaltest:**

- Anwendungen
- Daten

**Anbieter verwaltet:**

- Runtime-Umgebung
- Middleware
- Betriebssysteme
- Virtualisierung
- Server, Speicher, Netzwerk

### Anwendungsfälle

- **Anwendungsentwicklung**: Apps ohne Sorgen um Infrastruktur erstellen
- **API-Entwicklung und -Verwaltung**: APIs erstellen und hosten
- **Microservices-Architektur**: Containerisierte Anwendungen deployen

### Vorteile

- Schnellere Entwicklung und Deployment
- Integrierte Skalierbarkeit
- Reduzierte Verwaltungskomplexität
- Fokus auf Code, nicht auf Infrastruktur
- Integrierte Entwicklungstools

### Nachteile

- Weniger Kontrolle als bei IaaS
- Potenzielle Vendor Lock-in
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

## Software as a Service (SaaS)

### Definition

SaaS liefert voll funktionsfähige Anwendungen über das Internet. Nutzer greifen auf Software über einen Webbrowser zu, ohne Installation oder Wartung.

### Was du bekommst

- Sofort einsatzbereite Anwendungen
- Automatische Updates
- Zugriff von jedem Gerät mit Internet
- Multi-Tenant-Architektur

### Verantwortlichkeiten

**Du verwaltest:**

- Benutzerkonfiguration
- Dateneingabe
- Zugriffsberechtigungen

**Anbieter verwaltet:**

- Alles andere (Anwendung, Daten, Runtime, Middleware, Betriebssystem, Infrastruktur)

### Anwendungsfälle

- **E-Mail und Kommunikation**: Business-E-Mail, Messaging
- **Customer Relationship Management (CRM)**
- **Kollaborationstools**: Dokumenten-Sharing, Projektmanagement
- **Office-Produktivität**: Textverarbeitung, Tabellenkalkulation, Präsentationen
- **Personalwesen**: Gehaltsabrechnung, Recruiting, Mitarbeiterverwaltung

### Vorteile

- Keine Installation oder Wartung erforderlich
- Überall mit Internet zugänglich
- Automatische Updates
- Niedrigere Anfangskosten
- Einfach zu verwenden und zu skalieren

### Nachteile

- Keine Kontrolle über die Infrastruktur, komplett abhängig von der betreibenden Firma
- Begrenzte Anpassung
- Datensicherheitsbedenken (Daten extern in der Cloud gespeichert)
- Abonnementkosten können sich summieren
- Abhängig von Internetverbindung

### Beispiele

- **Google Workspace** (Gmail, Google Docs, Drive)
- **Microsoft 365** (Outlook, Word, Excel, Teams)
- **ADITO** (CRM)
- **Slack** (Team-Kommunikation)
- **Dropbox** (Dateispeicher)
- **Zoom** (Videokonferenzen)

---

## Die Pizza-Analogie

Eine beliebte Analogie vergleicht Cloud-Service-Modelle mit Pizza-Bestellung:

- **On-Premises**: Du machst Pizza zu Hause (du verwaltest alles)
- **IaaS**: Du kaufst Pizzateig und Belag, backst selbst (Infrastruktur bereitgestellt)
- **PaaS**: Du bestellst Pizza zur Lieferung (Plattform bereitgestellt, du wählst Belag)
- **SaaS**: Du isst in einem Pizza-Restaurant (kompletter Service bereitgestellt)

---

## Zusätzliche Service-Modelle

Über die drei Kernmodelle hinaus gibt es spezialisierte Service-Modelle:

### Function as a Service (FaaS) / Serverless

- Code ausführen ohne Server zu verwalten
- Beispiele: AWS Lambda, Azure Functions, Google Cloud Functions
- Bezahle nur für die Ausführungszeit

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

- Das Backend wird verwaltet, während du dich um das Frontend kümmerst
- Beispiele: Supabase, Firebase
