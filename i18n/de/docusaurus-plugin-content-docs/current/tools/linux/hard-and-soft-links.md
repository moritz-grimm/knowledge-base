---
title: "Hard und Soft Links"
description: "Hard links und symbolische (soft) links in Linux. Was sie sind, wie sie sich unterscheiden und wie man sie mit dem `ln` Befehl erstellt und verwaltet."
keywords:
    - Linux
    - Hard Link
    - Soft Link
    - Symbolic Link
    - symlink
    - ln
    - Filesystem
    - inode
---

# Hard und Soft Links

Ein **Link** ist eine Referenz von einem Pfad im Dateisystem zu einer anderen Datei oder einem Ordner. Linux unterstützt zwei Arten: **Hard links** und **Symbolische (soft) links**. Beide werden mit dem `ln` Befehl erstellt, aber verhalten sich sehr unterschiedlich.

## Inodes

Jede Datei im Linux Dateisystem wird anhand einer **Inode** identifiziert, einer Nummer, die auf die eigentlichen Daten auf der Festplatte verweist. Ein Dateiname ist eigentlich nur ein Label, das einer Inode zugeordnet wird, dadurch können auch mehrere Dateinamen auf dieselbe Inode zeigen.

```bash
ls -i file.txt    # Zeigt die Inode Nummer einer Datei
```

## Hard Links

Ein Hard Link erstellt einen **zusätzlichen Dateinamen für dieselbe Inode**. Beide Namen verweisen auf die gleiche Datei auf der Festplatte, aber keine der beiden ist wirklich das Original. Die Datei wird erst wirklich von der Festplatte gelöscht, wenn der letzte Hard Link gelöscht wird.

### Erstellen eines Hard Links

```bash
ln target.txt linkname.txt
```

### Eigenschaften

- Beide teilen sich die gleiche Inode
- Das Löschen eines Links beeinflusst keinen der anderen
- Kann sich nicht über mehrere Dateisysteme erstrecken, beide Links müssen auf derselben Partition sein
- Es können keine Verzeichnisse verlinkt werden (Außer einer seltenen Ausnahme, die für das Betriebssystem reserviert ist)
- Es kann keine Datei verlinkt werden, die nicht existiert

### Beispiel

```bash
echo "hello" > original.txt
ln original.txt hardlink.txt
ls -li original.txt hardlink.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 original.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 hardlink.txt
rm original.txt
cat hardlink.txt    # Gibt immer noch "hello" aus
```

## Symbolische (Soft) Links

Ein symbolischer Link ist eine kleine Spezialdatei, die nur **den Pfad** zu einer anderen Datei oder einem Verzeichnis speichert. Die Spezialdatei verfügt über eine eigene Inode. Wenn das Ziel bewegt oder gelöscht wird, wird der Soft Link zu einem "Dangling" Link und ist somit nicht mehr funktionsfähig.

### Erstellen eines Soft Links

```bash
ln -s target.txt linkname.txt
```

### Eigenschaften

- Verfügt über eine eigene Inode
- Kann sich über mehrere Dateisysteme erstrecken
- Kann auf Verzeichnisse zeigen
- Kann auf ein nicht-existierendes Ziel zeigen (kaputter/dangling Link)
- Kann absolute oder relative Pfade zum Ziel verwenden

### Beispiel

```bash
echo "hello" > original.txt
ln -s original.txt softlink.txt
ls -li original.txt softlink.txt
# 12345 -rw-r--r-- 1 user user  6 Apr 25 10:00 original.txt
# 12346 lrwxrwxrwx 1 user user 12 Apr 25 10:00 softlink.txt -> original.txt
rm original.txt
cat softlink.txt    # error: No such file or directory
```

## Hard vs Soft Links

| Eigenschaft                                     | Hard Link                               | Soft Link |
| ----------------------------------------------- | --------------------------------------- | --------- |
| Zeigt auf                                       | Inode                                   | Pfad      |
| Eigene Inode?                                   | Nein (Besitzt die gleiche wie das Ziel) | Ja        |
| Kann sich über mehrere Dateisysteme erstrecken? | Nein                                    | Ja        |
| Kann auf Verzeichnisse zeigen?                  | Nein                                    | Ja        |
| Kann auf eine nicht existente Datei zeigen?     | Nein                                    | Ja        |
| Überlebt die Löschung des Ziels?                | Ja                                      | Nein      |
| Erstellt mit                                    | `ln`                                    | `ln -s`   |

## Die gängigsten `ln` Optionen

| Befehl               | Beschreibung                                                                         |
| -------------------- | ------------------------------------------------------------------------------------ |
| `ln target name`     | Erstellt einen Hard Link                                                             |
| `ln -s target name`  | Erstellt einen Soft Link                                                             |
| `ln -f target name`  | Entfernt (überschreibt) eine bereits existierende Datei am Zielort                   |
| `ln -i target name`  | Fragt, bevor es eine existierende Datei am Zielort überschreibt                      |
| `ln -b target name`  | Erstellt ein Backup vom Ziel, bevor es ersetzt wird (hängt `~` an den Dateinamen an) |
| `ln -v target name`  | Gibt die Namen aller verlinkten Dateien aus (verbose)                                |
| `ln -sf target name` | Erzwingt das Ersetzen eines existierenden Links mit demselben Namen                  |
| `readlink name`      | Zeigt den Pfad an, auf den ein symbolischer Link verweist                            |
| `readlink -f name`   | Löst alle Symlinks zum kanonischen absoluten Pfad auf                                |

## Wann verwendet man was?

- **Hard Links** sind nützlich, um mehrere stabile Namen für die gleiche Datei zu haben (zum Beispiel Backup-Snapshots, die unveränderten Inhalt teilen), ohne dabei mehr Festplattenspeicher zu verbrauchen.
- **Soft Links** sind die beliebtere Wahl für Shortcuts. Zum Beispiel zum schnellen Versionswechsel eines Tools (z.B. `/usr/bin/python => python3.12`), oder zum Referenzieren von Dateien über verschiedene Mount Points.
