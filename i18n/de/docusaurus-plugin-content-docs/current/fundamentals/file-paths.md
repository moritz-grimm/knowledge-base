---
title: "Dateipfade"
description: "Absolute und relative Pfade in einem Dateisystem. Wie sie sich unterscheiden und die besonderen Pfadbestandteile `/`, `.`, `..` und `~`."
keywords:
    - Dateipfad
    - Absoluter Pfad
    - Relativer Pfad
    - Arbeitsverzeichnis
    - Dateisystem
---

# Dateipfade

Ein **Pfad** beschreibt den Ort einer Datei oder eines Ordners im Dateisystem. Es gibt zwei Schreibweisen: **absolut** und **relativ**.

## Absolute Pfade

Ein absoluter Pfad beginnt an der **Root** des Dateisystems und ist dadurch eindeutig, unabhängig vom aktuellen Ort.

- Unter Linux und macOS ist das Rootverzeichnis `/`, z.B. `/home/user/notes.txt`
- Unter Windows beginnt er mit einem Laufwerksbuchstaben, z.B. `C:\Users\user\notes.txt`

## Relative Pfade

Ein relativer Pfad wird **relativ zum aktuellen Arbeitsverzeichnis** interpretiert. Er beginnt nicht mit `/` (oder einem Laufwerksbuchstaben).

```bash
cd /home/user
cat notes.txt          # => /home/user/notes.txt
cat projects/app.js    # => /home/user/projects/app.js
```

## Besondere Pfadbestandteile

| Bestandteil | Bedeutung                                        |
| ----------- | ------------------------------------------------ |
| `/`         | Rootverzeichnis (Beginn eines absoluten Pfads)   |
| `.`         | Das aktuelle Verzeichnis                         |
| `..`        | Das übergeordnete Verzeichnis (eine Ebene höher) |
| `~`         | Das Home-Verzeichnis des aktuellen Benutzers     |

### Beispiele

```bash
cd ..        # Eine Ebene nach oben
cd ./bin     # In das bin-Verzeichnis unterhalb des aktuellen wechseln
cd ~         # Ins Home-Verzeichnis wechseln
cat ../config.txt
```

## Arbeitsverzeichnis

Das **Arbeitsverzeichnis** ist das Verzeichnis, in dem sich ein Prozess gerade „befindet". Es ist der Bezugspunkt, gegen den jeder relative Pfad aufgelöst wird.

```bash
pwd    # Gibt das aktuelle Arbeitsverzeichnis aus
```
