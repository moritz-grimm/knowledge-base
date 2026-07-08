---
title: "Active Directory"
description: "Kernkonzepte von Active Directory und dem Domänencontroller: logische Struktur, Vertrauensstellungen, LDAP-Benennung, Roaming-Profile und Gruppenrichtlinien."
keywords:
    - Active Directory
    - Domänencontroller
    - Organisationseinheit
    - Gesamtstruktur
    - LDAP
    - Distinguished Name
    - Gruppenrichtlinie
    - GPO
---

# Active Directory

**Active Directory (AD)** ist ein Verzeichnisdienst, der in einer Windows-Umgebung eine zentrale Identitäts- und Zugriffsverwaltung bereitstellt. Statt jeden Rechner einzeln zu konfigurieren, werden Benutzer, Computer und Ressourcen zentral verwaltet. Ein **Domänencontroller (DC)** ist ein Windows Server, der die Active Directory-Domänendienste (AD DS) hostet.

Ein Domänencontroller benötigt einen eindeutigen Namen (z.B. `dc1`), eine statische IP-Adresse und einen funktionierenden DNS-Server; die Rolle „Active Directory-Domänendienste" wird installiert und der Server anschließend hochgestuft.

## Logische Struktur

Active Directory trennt die logische Struktur von der physischen (Standorte, Subnetze, DCs). Die logischen Bausteine sind:

- **Objekt** – Die kleinste verwaltbare Einheit; jede Netzwerkressource (Benutzer, Computer, Drucker …) wird durch ein Objekt repräsentiert.
- **Organisationseinheit (OU)** – Ein Container, der Objekte (Benutzer, Computer, Gruppen) gruppiert, um die Unternehmensstruktur abzubilden. OUs dienen außerdem zur Verknüpfung von Gruppenrichtlinien.
- **Domäne** – Die zentrale Einheit, welche die Active Directory enthält. Sicherheitsrichtlinien gelten innerhalb einer Domäne, die mindestens einen DC besitzen muss.
- **Struktur (Tree)** – Mehrere hierarchisch angeordnete Domänen mit zusammenhängendem Namespace (z.B. `de.abc.com` unter `abc.com`).
- **Gesamtstruktur (Forest)** – Eine oder mehrere Strukturen, typischerweise mit verschiedenen Namespaces. Die Domänen arbeiten unabhängig, können aber über die Gesamtstruktur kommunizieren.

## Globaler Katalog

Der **globale Katalog** ist eine Datenbank, mit der sich Objekte in der gesamten Gesamtstruktur suchen lassen, auch Objekte in anderen Namespaces. An jedem AD-Standort sollte mindestens ein DC eine Kopie des globalen Katalogs beherbergen.

## Vertrauensstellungen

Eine **Vertrauensstellung** beschreibt die Beziehung zwischen zwei Domänen: Die vertrauende Domäne akzeptiert die Authentifizierung aus der vertrauten Domäne.

- **Unidirektional** – Vertrauen in eine Richtung / **Bidirektional** – Vertrauen in beide Richtungen
- **Transitiv** – Vertrauen reicht über weitere Vertrauensstellungen / **Nicht transitiv** – nur für die explizit konfigurierte Vertrauensstellung

Standard ist **bidirektional und transitiv**.

## LDAP und Benennung

**LDAP** (Lightweight Directory Access Protocol) dient dem Zugriff auf den Verzeichnisdienst.

- **Distinguished Name (DN)** – Der eindeutige „LDAP-Pfad" eines Objekts, mit `CN` (Common Name), `OU` (Organizational Unit) und `DC` (Domain Component), z.B. `CN=HPjet5, OU=Assistenz, DC=Firma, DC=DE`.
- **Canonical Name** – Dieselbe Information im DNS-Domänennamenformat, z.B. `HPjet5.Assistenz.firma.de`.

## Roaming-Profile

Ein **Roaming-Profil** wird zentral auf einem Server gespeichert, sodass ein Benutzer an jedem Domänenrechner dieselbe Umgebung vorfindet. Das Profil wird bei der Anmeldung auf den Rechner kopiert und bei der Abmeldung zurücksynchronisiert.

- **Vorteil** – Gleiche Umgebung an jedem Computer.
- **Nachteil** – Benötigt viel Speicher; An- und Abmeldung können langsam sein.

Die Freigaben **SYSVOL** und **NETLOGON** werden bei der Hochstufung eines Servers zum DC erstellt. Sie speichern Gruppenrichtlinien und Anmeldeskripte, die von den Clients abgerufen werden.

## Funktionsebenen

Bei der Hochstufung eines DC werden eine **Gesamtstrukturfunktionsebene** und eine **Domänenfunktionsebene** gewählt. Sie legen fest, welche AD-Funktionen verfügbar sind, und garantieren, dass DCs mit unterschiedlichen Windows-Server-Versionen zusammenarbeiten (Abwärtskompatibilität). Höhere Ebenen bieten mehr Funktionen, lassen sich aber nicht rückgängig machen. Eine Domäne kann auf einer höheren Ebene als die Gesamtstruktur arbeiten, jedoch nicht auf einer niedrigeren.

## Gruppenrichtlinien (GPO)

**Gruppenrichtlinien** sind Konfigurationsanweisungen, mit denen Einstellungen erzwungen werden (z.B. Passwortrichtlinien, Energieeinstellungen, Zugriffsbeschränkungen). Sie werden in Active Directory gespeichert und sind durch Replikation domänenweit verfügbar. Ein **Gruppenrichtlinienobjekt (GPO)** speichert die einzelnen Einstellungen und ist mit dem Objekt **verknüpft**, auf das es sich auswirken soll. GPOs enthalten getrennte Einstellungen für Benutzer und Computer und wirken auf die in einer OU enthaltenen Benutzer- und Computerkonten, nicht auf Gruppen.

### Verarbeitungsreihenfolge

Gruppenrichtlinien können mit einem Standort, einer Domäne oder einer OU verknüpft werden; jeder Computer besitzt zusätzlich eine lokale Richtlinie. Die Verarbeitungsreihenfolge ist **L-S-D-OU**:

1. **Local (Lokal)**
2. **Site (Standort)**
3. **Domain (Domäne)**
4. **OU**

Jeder spätere Schritt überschreibt bei konkurrierenden Einstellungen die des früheren. Somit hat die lokale Richtlinie die niedrigste und die OU-Richtlinie die höchste Priorität. Sind mehrere GPOs auf derselben Ebene verknüpft, entscheidet die Verknüpfungsreihenfolge (der niedrigste Verknüpfungswert gewinnt, da er zuletzt verarbeitet wird).

### Aktualisierung

Gruppenrichtlinieneinstellungen werden im Hintergrund etwa alle **90 Minuten** auf Clients und alle **5 Minuten** auf Domänencontrollern aktualisiert. Eine Aktualisierung lässt sich mit `gpupdate /force` erzwingen. Eine Ausnahme ist die Ordnerumleitung: Sie wird nur bei der Benutzeranmeldung angewendet.
