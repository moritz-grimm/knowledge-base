---
title: IT-Sicherheitsziele
description: Die vier IT-Sicherheitsziele, confidentiality, integrity, availability and authenticity, und was sie bedeuten.
keywords:
    - Sicherheitsziele
    - Vertraulichkeit
    - Integrität
    - Authentizität
    - Verfügbarkeit
---

# IT-Sicherheitsziele

## Übersicht

IT-Sicherheit besitzt vier Sicherheitsziele welche definieren wann ein System sicher ist.

## Confidentiality (Vertraulichkeit)

Informationen sind nur für autorisierte Personen oder Systeme zugänglich.

- Daten müssen vor unautorisiertem Zugriff geschützt werden
- Erreichbar durch Verschlüsselung, Zugangskontrollen und Need-to-know Prinzipien
- **Beispiel**: Nur der vorgesehen Empfänger kann eine verschlüsselte E-Mail lesen

## Integrity (Integrität)

Informationen sind akkurat und wurden nicht durch unbefugte verändert worden.

- Daten dürfen nicht modifiziert, beschädigt oder gelöscht werden ohne Autorisierung, weder absichtlich oder ausversehen
- Kann erreicht werden durch Hash Funktionen, Digitale Signaturen und Checksummen
- **Beispiel**: Eine heruntergeladene Datei, deren Hashwert mit dem veröffentlichten Wert übereinstimmt, wurde nicht verändert.

## Availability (Verfügbarkeit)

Systeme und Daten sind verfügbar wenn sie von einem autorisierten Nutzer benötigt werden.

- Systeme müssen immer verfügbar bleiben, ein Ausfall oder Zugriffsverweigerung stellt ein Versagen dar
- Kann erreicht werden durch Redundanz, Backups, DDoS Schutz und fehlertolerante Infrastruktur
- **Beispiel**: Ein Web Service geschützt gegen DDoS Attacken bleibt erreichbar selbst während einer Attacke

## Authenticity (Authentizität)

Die Identität eines Kommunikationspartners oder die Herkunft von Daten kann verifiziert werden.

- Stellt sicher, dass Parteien die sind, für die sie sich ausgeben, und dass die Daten aus einer vertrauenswürdigen Quelle kommen
- Kann erreicht werden durch digitale Zertifikate, Signaturen und Authentifizierungsprotokolle (z.B. TLS, MFA)
- **Beispiel**: Ein TLS Zertifikat beweist, dass eine Website wirklich von der angegebenen Organisation verwaltet wird

## Zusammenfassung

| Ziel                                                                  | Frage                                         | Lösungen                           |
| --------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------- |
| [Confidentiality (Vertraulichkeit)](#confidentiality-vertraulichkeit) | Wer hat hier Zugriff?                         | Verschlüsselung, Zugangskontrollen |
| [Integrity (Integrität)](#integrity-integrität)                       | Wurde das hier unbefugt modifiziert?          | Hashes, Digitale Signaturen        |
| [Availability (Verfügbarkeit)](#availability-verfügbarkeit)           | Ist das bei Bedarf zugänglich?                | Redundanz, Backups                 |
| [Authenticity (Authentizität)](#authenticity-authentizität)           | Ist das wirklich, wer/was es zu sein vorgibt? | Zertifikate, MFA                   |
