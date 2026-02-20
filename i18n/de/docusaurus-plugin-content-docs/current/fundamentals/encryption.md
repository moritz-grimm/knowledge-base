---
title: Verschlüsselung und Digitale Signaturen
description: Überblick über symmetrische und asymmetrische Verschlüsselung, Hash Funktionen und digitale Signaturen.
keywords:
    - Verschlüsselung
    - Digitale Signaturen
    - Symmetrische Verschlüsselung
    - Asymmetrische Verschlüsselung
    - Public Key
    - Private Key
    - Hash
    - IT-Sicherheit
---

# Verschlüsselung und Digitale Signaturen

## Überblick

Verschlüsselung schützt Daten vor unbefugtem Zugriff indem es die Daten in ein unlesbares Format bringt. Digitale Signaturen verifizieren die Authentizität und Integrität der Daten um sicherzustellen dass sie während dem Transport nicht manipuliert wurden.

## Symmetrische Verschlüsselung

Jeweils der Sender und Empfänger haben den **gleichen** Schlüssel zum verschlüsseln und entschlüsseln.

- **Schnell** und **effizient** um große Mengen an Daten zu verschlüsseln
- **Schlüssel Verteilung** ist eine große Herausforderung, da der Schlüssel davor natürlich sicher getauscht werden muss
- **Bekannte Beispiele**: AES (Advanced Encryption Standard), DES (Data Encryption Standard), 3DES (Triple Data Encryption Standard)
- **Typische Anwendungsfälle**: Verschlüsselung großer Datenmengen

```text
Klartext => [Verschlüsseln] => Ciphertext => [Entschlüsseln] => Klartext
```

---

## Asymmetrische Verschlüsselung

Nutzt ein **Schlüsselpaar**: Einen public key (kann öffentlich geteilt werden), und einen private key (muss geheim gehalten werden).

- Daten welche mit dem public key verschlüsselt wurden können nur mit dem zugehörigen private key wieder entschlüsselt werden
- **Langsamer** als die symmetrische Verschlüsselung aufgrund der mathematischen Komplexität
- **Bekannte Beispiele**: RSA (Rivest-Shamir-Adleman), ECC (Elliptic Curve Cryptography)
- **Typische Anwendungsfälle**: Schlüsselaustausch (Hybride Verschlüsselung), Digitale Signaturen

```text
Klartext => [Verschlüsseln mit Public Key des Empfänger] => Ciphertext => [Entschlüsseln mit Private Key des Empfängers] => Klartext
```

---

## Hash Funktionen

Eine Hash-Funktion ordnet Daten beliebiger Größe einer Ausgabe fester Größe zu (Hash/Digest).

- **Einweg**: Die Original Daten können nicht aus dem Hash abgeleitet werden
- **Deterministisch**: Der gleiche Input erzeugt immer den gleichen Output
- **Kollisionsresistent**: Verschiedene Inputs sollten nicht den gleichen Hash produzieren
- **Bekannte Beispiele**: SHA-256, SHA-3, MD5

## Digitale Signaturen

Digitale Signaturen verifizieren, dass die Daten von einer bestimmten Partei gesendet und nicht durch Dritte verändert wurden.

**Signieren (Sender):**

1. Erstellt einen [Hash](#hash-funktionen) der Nachricht
2. Verschlüsselt den Hash der Nachricht mit seinem eigenen **private key** => Das ist die Signatur
3. Sendet die Nachricht zusammen mit seiner Signatur

**Verifizierung (Empfänger):**

1. Entschlüsselt die Signatur mit dem **public key** des Senders => Enthüllt den ursprünglichen Hash
2. Die empfangene Nachricht selbst nochmal hashen
3. Beide Hashes vergleichen, wenn sie zusammenpassen wurde die Nachricht nicht verändert
