---
title: "Verschlüsselung und digitale Signaturen"
description: "Symmetrische und asymmetrische Verschlüsselung inklusive AES, RSA und Diffie-Hellman, Hashfunktionen, Passwort-Hashing mit Salt und bcrypt sowie digitale Signaturen."
keywords:
    - Verschlüsselung
    - Digitale Signatur
    - Symmetrische Verschlüsselung
    - Asymmetrische Verschlüsselung
    - Public Key
    - Private Key
    - Hash
    - AES
    - RSA
    - Diffie-Hellman
    - Salting
    - bcrypt
    - Passwort-Hashing
    - IT-Sicherheit
tags:
    - ap2
---

# Verschlüsselung und digitale Signaturen

## Überblick

Verschlüsselung schützt Daten vor unbefugtem Zugriff, indem sie die Daten in ein unlesbares Format bringt. Digitale Signaturen verifizieren die Authentizität und Integrität der Daten, um sicherzustellen, dass sie während des Transports nicht manipuliert wurden.

## Symmetrische Verschlüsselung

Sender und Empfänger verwenden **denselben Schlüssel** zum Verschlüsseln und Entschlüsseln.

- **Schnell** und effizient beim Verschlüsseln großer Datenmengen
- **Schlüsselverteilung** ist eine Herausforderung, da der Schlüssel vorab sicher ausgetauscht werden muss
- **Verbreitete Verfahren:** AES (Advanced Encryption Standard), DES (Data Encryption Standard), 3DES (Triple Data Encryption Standard)
- **Typischer Anwendungsfall:** Verschlüsselung großer Datenmengen

```text
Klartext => [Verschlüsseln mit Schlüssel] => Ciphertext => [Entschlüsseln mit Schlüssel] => Klartext
```

### AES

AES (Advanced Encryption Standard) wurde 2001 als Nachfolger von DES standardisiert und ist das heute eingesetzte symmetrische Verfahren.

- **Blockverschlüsselung:** verschlüsselt Blöcke von 128 Bit, längere Daten werden in Blöcke aufgeteilt und aufgefüllt
- **Schlüssellängen:** 128, 192 oder 256 Bit, daraus ergibt sich die Anzahl der Runden (10, 12 oder 14)
- **Performance:** auf aktuellen CPUs in Hardware umgesetzt (AES-NI), dadurch schnell genug für vollständige Festplattenverschlüsselung
- **Gilt als sicher:** es ist kein praktikabler Angriff bekannt, der besser ist als das Durchprobieren aller Schlüssel

Da eine Blockverschlüsselung jeden Block einzeln verschlüsselt, legt ein **Betriebsmodus** fest, wie die Blöcke verknüpft werden:

| Modus                       | Eigenschaft                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ECB (Electronic Codebook)   | Jeder Block wird unabhängig verschlüsselt, gleiche Klartextblöcke ergeben gleiche Chiffratblöcke, daher ungeeignet         |
| CBC (Cipher Block Chaining) | Jeder Block wird mit dem vorherigen Chiffratblock verknüpft, benötigt einen Initialisierungsvektor, kein Integritätsschutz |
| CTR (Counter Mode)          | Macht aus der Blockverschlüsselung eine parallelisierbare Stromverschlüsselung                                             |
| GCM (Galois/Counter Mode)   | Heute die Standardwahl: CTR mit einem Authentifizierungs-Tag, das zusätzlich Manipulation erkennt                          |

Typischer Einsatz: Datei- und Festplattenverschlüsselung (LUKS, BitLocker, VeraCrypt), Verschlüsselung der Nutzdaten in [TLS](#hybride-verschlüsselung), verschlüsselte Archive und Datenbankspalten.

### DES und 3DES

DES ist der Vorgänger von AES mit einer Schlüssellänge von 56 Bit, die heute innerhalb von Stunden durchprobiert werden kann und damit als gebrochen gilt. 3DES wendet DES dreifach an und erreicht so effektiv 112 Bit, ist aber langsam und findet sich nur noch in Altsystemen. Für Neuentwicklungen wird keines von beiden verwendet.

---

## Asymmetrische Verschlüsselung

Nutzt ein **Schlüsselpaar**: einen Public Key (wird öffentlich geteilt) und einen Private Key (wird geheim gehalten).

- Daten, die mit dem Public Key verschlüsselt wurden, können nur mit dem zugehörigen Private Key entschlüsselt werden
- **Langsamer** als die symmetrische Verschlüsselung aufgrund der mathematischen Komplexität
- **Verbreitete Verfahren:** RSA (Rivest-Shamir-Adleman), ECC (Elliptic Curve Cryptography)
- **Typische Anwendungsfälle:** Schlüsselaustausch (hybride Verschlüsselung), digitale Signaturen

```text
Klartext => [Verschlüsseln mit Public Key des Empfängers] => Ciphertext => [Entschlüsseln mit Private Key des Empfängers] => Klartext
```

### RSA

RSA ist das bekannteste asymmetrische Verfahren. Der Name setzt sich aus den Erfindern Rivest, Shamir und Adleman zusammen.

- **Grundlage der Sicherheit:** Zwei große Primzahlen zu multiplizieren ist einfach, das Produkt wieder in sie zu zerlegen nicht
- **Schlüssellängen:** 2048 Bit als Minimum, 3072 oder 4096 Bit für langfristigen Schutz, nicht mit symmetrischen Schlüssellängen vergleichbar
- **Fähigkeiten:** Verschlüsselung und digitale Signaturen mit demselben Schlüsselpaar
- **Einschränkung:** Die Nutzdaten müssen kürzer sein als der Schlüssel, weshalb RSA einen symmetrischen Schlüssel verschlüsselt und nicht die Daten selbst

ECC (Elliptic Curve Cryptography) erreicht vergleichbare Sicherheit mit deutlich kürzeren Schlüsseln. Ein 256-Bit-ECC-Schlüssel entspricht etwa einem 3072-Bit-RSA-Schlüssel. Deshalb ist ECC beim Schlüsselaustausch in [TLS](#hybride-verschlüsselung) (ECDHE) zum Standard geworden und wird zunehmend für Zertifikatssignaturen (ECDSA) eingesetzt.

### Diffie-Hellman

Diffie-Hellman ist kein Verschlüsselungsverfahren, sondern ein Verfahren zur **Schlüsselvereinbarung**. Beide Seiten leiten aus öffentlichen Werten und ihrem eigenen geheimen Wert ein gemeinsames Geheimnis ab, ohne dass dieses Geheimnis jemals übertragen wird.

```text
Alice                                    Bob
Geheimnis a                              Geheimnis b
       ── öffentlicher Wert A ────────►
       ◄──────── öffentlicher Wert B ──
gemeinsamer Schlüssel aus (B, a)  ==  gemeinsamer Schlüssel aus (A, b)
```

- Ein Mithörer sieht beide öffentlichen Werte, kann daraus aber nicht den gemeinsamen Schlüssel ableiten
- **Ephemere** Varianten (DHE, ECDHE) erzeugen je Sitzung ein neues Schlüsselpaar, sodass eine spätere Kompromittierung des Langzeitschlüssels mitgeschnittenen Verkehr nicht entschlüsselt (Forward Secrecy)
- Diffie-Hellman allein authentifiziert niemanden: Ohne Zertifikat kann ein Angreifer in der Mitte mit jeder Seite einen eigenen Schlüssel vereinbaren und den Verkehr weiterleiten

---

## Hybride Verschlüsselung

In der Praxis wird keines der beiden Verfahren allein eingesetzt: Die asymmetrische Kryptografie löst die Schlüsselverteilung, die symmetrische übernimmt die eigentliche Arbeit. TLS kombiniert sie genau so:

1. Der Server weist seine Identität mit einem **Zertifikat** nach, das seinen Public Key enthält.
2. Beide Seiten vereinbaren über **ECDHE** einen Sitzungsschlüssel und authentifizieren den Austausch über das Zertifikat.
3. Die Nutzdaten werden mit diesem Sitzungsschlüssel **symmetrisch** verschlüsselt, üblicherweise mit AES-GCM.
4. Der Sitzungsschlüssel wird mit dem Ende der Verbindung verworfen.

---

## Hashfunktionen

Eine Hashfunktion ordnet Daten beliebiger Größe einer Ausgabe fester Größe zu (Hash/Digest).

- **Einweg:** Die Originaldaten können nicht aus dem Hash abgeleitet werden
- **Deterministisch:** Der gleiche Input erzeugt immer den gleichen Hash
- **Kollisionsresistent:** Verschiedene Inputs sollten nicht den gleichen Hash produzieren
- **Lawineneffekt:** Die Änderung eines einzelnen Bits im Input verändert etwa die Hälfte der Bits des Hashes

Typische Anwendungen: Integritätsprüfung von Downloads, Duplikaterkennung, Signaturen und, in Verbindung mit den unten beschriebenen Verfahren, die Speicherung von Passwörtern.

| Verfahren | Hashlänge | Einschätzung                                                                                                        |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| MD5       | 128 Bit   | Gebrochen, Kollisionen lassen sich in Sekunden erzeugen, nur noch als Prüfsumme gegen Übertragungsfehler vertretbar |
| SHA-1     | 160 Bit   | Gebrochen, es existieren praktikable Kollisionsangriffe, für Signaturen nicht mehr im Einsatz                       |
| SHA-256   | 256 Bit   | Aktueller Standard, Teil der SHA-2-Familie                                                                          |
| SHA-512   | 512 Bit   | Wie SHA-256 mit längerem Hash, auf 64-Bit-Systemen schneller als SHA-256                                            |
| SHA-3     | variabel  | Anderer innerer Aufbau als SHA-2, gedacht als Reserve, falls SHA-2 geschwächt wird                                  |

---

## Passwörter hashen

Passwörter werden nie im Klartext gespeichert und nie verschlüsselt, denn ein Schlüssel, der sie entschlüsseln kann, müsste irgendwo existieren. Sie werden gehasht, damit eine gestohlene Datenbank nicht die Passwörter selbst offenlegt.

Ein einfaches `SHA-256` genügt dafür aus zwei Gründen nicht:

- **Gleiche Passwörter ergeben gleiche Hashes**, der Hash verrät also, welche Konten dasselbe Passwort nutzen, und eine vorberechnete Tabelle (Rainbow Table) löst verbreitete Passwörter sofort auf
- **Hashfunktionen sind bewusst schnell**, und aktuelle Hardware berechnet Milliarden SHA-256-Hashes pro Sekunde, wodurch das Durchprobieren kurzer Passwörter praktikabel wird

### Salt

Ein Salt ist ein Zufallswert, der je Passwort erzeugt und zusammen mit ihm gehasht wird. Der Salt ist nicht geheim und wird neben dem Hash gespeichert.

```text
Hash = H(Salt + Passwort)
```

- Gleiche Passwörter ergeben unterschiedliche Hashes, da sich der Salt unterscheidet
- Rainbow Tables werden wertlos, weil ein Angreifer eine Tabelle je Salt bräuchte
- Jedes Passwort muss einzeln angegriffen werden statt alle gemeinsam

Ein **Pepper** ist ein zusätzlicher geheimer Wert, der für alle Passwörter gleich ist und außerhalb der Datenbank liegt, etwa in der Anwendungskonfiguration. Er hilft nur, wenn die Datenbank abfließt, die Konfiguration aber nicht.

### Arbeitsfaktor

Die zweite Maßnahme besteht darin, das Hashen absichtlich langsam zu machen: Ein für Passwörter entworfenes Verfahren wiederholt seine innere Operation viele Male. Die Anzahl der Wiederholungen ist als **Kostenfaktor** konfigurierbar und wird angehoben, sobald Hardware schneller wird. Eine Verzögerung von etwa 100 ms je Anmeldung fällt für Nutzer nicht auf und macht das Durchprobieren von Milliarden Kandidaten unpraktikabel.

### bcrypt

bcrypt ist das verbreitetste Verfahren dieser Art und basiert auf der Blowfish-Verschlüsselung.

- Der Salt wird erzeugt und **im Hash selbst** gespeichert, eine eigene Spalte ist daher nicht nötig
- Der Kostenfaktor ist Teil des Hashes, wodurch alte Hashes auch nach einer Anhebung noch geprüft werden können
- Bewusst langsam und speicherabhängig, dadurch auf GPUs schwerer zu beschleunigen als SHA-basierte Verfahren
- Einschränkung: Es werden nur die ersten 72 Byte der Eingabe verwendet

```text
$2b$12$eImiTXuWVxfM37uY4JANjQ.../hJ6CtPTuOrAXTlHGDLcJU3wG6Hpu
 │   │  └── Salt (22 Zeichen) ─────┘└── Hash ────────────────┘
 │   └───── Kostenfaktor 12, also 2^12 Runden
 └───────── Kennung des Verfahrens
```

Alternativen mit demselben Zweck:

| Verfahren | Hinweis                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Argon2id  | Gewinner der Password Hashing Competition, in Zeit, Speicher und Parallelität einstellbar, aktuelle Empfehlung für neue Systeme |
| scrypt    | Speicherintensiv und daher auf spezialisierter Hardware teuer zu parallelisieren                                                |
| PBKDF2    | Weit verfügbar und standardisiert, aber nur rechenintensiv, damit das schwächste dieser Verfahren                               |
| bcrypt    | Etabliert, gut untersucht, in jeder Sprache verfügbar                                                                           |

Was in einer Passwortspeicherung nie vorkommt: Klartext, umkehrbare Verschlüsselung, Hashes ohne Salt und eine einzelne schnelle Hashfunktion wie MD5, SHA-1 oder SHA-256.

---

## Digitale Signaturen

Digitale Signaturen verifizieren, dass die Daten von einer bestimmten Partei gesendet und nicht verändert wurden.

**Signieren (Sender):**

1. Einen [Hash](#hashfunktionen) der Nachricht erstellen
2. Den Hash mit dem eigenen **Private Key** verschlüsseln => das ist die Signatur
3. Die Nachricht zusammen mit der Signatur senden

**Verifizierung (Empfänger):**

1. Die Signatur mit dem **Public Key** des Senders entschlüsseln => ergibt den ursprünglichen Hash
2. Die empfangene Nachricht selbst hashen
3. Beide Hashes vergleichen: Stimmen sie überein, ist die Signatur gültig und die Nachricht authentisch

Dieser Ablauf beschreibt RSA-Signaturen. [ECDSA](#rsa) verschlüsselt den Hash nicht, sondern berechnet die Signatur aus dem Hash und dem Private Key. Der Empfänger prüft sie mit dem Public Key.
