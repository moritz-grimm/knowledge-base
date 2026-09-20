---
title: "Compiler vs. Interpreter"
description: "Wie Compiler und Interpreter Quellcode übersetzen, ihre Vor- und Nachteile sowie die Rolle von Bytecode, virtuellen Maschinen und Just-in-Time-Kompilierung"
keywords:
    - "Compiler"
    - "Interpreter"
    - "Just-in-Time"
    - "JIT"
    - "Bytecode"
    - "Virtuelle Maschine"
    - "Linker"
    - "Ahead-of-Time"
    - "Transpiler"
    - "Programmiersprachen"
tags:
    - ap2
---

# Compiler vs. Interpreter

## Überblick

Ein Prozessor kann ausschließlich Maschinencode ausführen. Quellcode, der in einer Hochsprache geschrieben ist,
muss daher zunächst übersetzt werden. Dafür existieren zwei grundlegende Ansätze:

- **Compiler**: übersetzt das gesamte Programm **vor** der Ausführung in ein eigenständiges, maschinenlesbares Artefakt
- **Interpreter**: liest den Quellcode **während** der Ausführung und führt jede Anweisung unmittelbar aus

Ob eine Sprache kompiliert oder interpretiert wird, ist eine Eigenschaft der **Implementierung**, nicht der
Sprache selbst. C wird üblicherweise kompiliert, es existieren jedoch C-Interpreter; JavaScript wurde historisch
interpretiert und wird von modernen Engines zur Laufzeit kompiliert.

---

## Compiler

### Übersetzungsvorgang

Die Übersetzung erfolgt in der Regel in mehreren Phasen:

1. **Lexikalische Analyse**: Der Zeichenstrom wird in Token zerlegt (Schlüsselwörter, Bezeichner, Operatoren)
2. **Syntaktische Analyse**: Die Token werden gegen die Grammatik geprüft und in einen Syntaxbaum überführt
3. **Semantische Analyse**: Typverträglichkeit, Deklarationen und Gültigkeitsbereiche werden überprüft
4. **Optimierung**: Die Zwischendarstellung wird verbessert (z.B. Entfernen von totem Code, Schleifenentrollung)
5. **Codeerzeugung**: Maschinencode wird ausgegeben, typischerweise als Objektdateien

Ein **Linker** fügt die Objektdateien anschließend mit den benötigten Bibliotheken zu einem ausführbaren Programm
zusammen.

```text
Quellcode => [Compiler] => Objektcode => [Linker] => Ausführbare Datei => [CPU]
```

Fehler werden zur Übersetzungszeit gemeldet, sodass ein Programm mit Syntax- oder Typfehlern die Ausführung nie
erreicht.

### Vorteile

- **Ausführungsgeschwindigkeit**: Der übersetzte Maschinencode läuft direkt auf dem Prozessor
- **Frühe Fehlererkennung**: Syntaktische und viele semantische Fehler fallen auf, bevor das Programm ausgeliefert wird
- **Optimierung**: Das gesamte Programm ist sichtbar, was umfangreiche Optimierungen ermöglicht
- **Schutz des Quellcodes**: Nur das kompilierte Artefakt muss verteilt werden
- **Keine Laufzeitabhängigkeit**: Auf dem Zielsystem muss das Compiler-Tool nicht installiert sein

### Nachteile

- **Übersetzungszeit**: Jede Änderung erfordert einen neuen Build, bevor sie getestet werden kann
- **Plattformabhängigkeit**: Maschinencode ist an eine Prozessorarchitektur und ein Betriebssystem gebunden, daher wird pro Zielplattform ein eigener Build benötigt
- **Debugging-Aufwand**: Der ausgeführte Maschinencode ähnelt dem Quellcode nicht mehr, was Debug-Symbole erforderlich macht

---

## Interpreter

Der Interpreter liest den Quellcode Anweisung für Anweisung, analysiert ihn und führt ihn unmittelbar aus. Eine
separat ausführbare Datei entsteht dabei nicht. Der Interpreter muss auf dem Zielsystem vorhanden sein.

```text
Quellcode => [Interpreter] => Anweisung analysiert und ausgeführt => [CPU]
```

Fehler werden erst sichtbar, wenn die betroffene Zeile tatsächlich erreicht wird. Ein Syntaxfehler in einem selten
genutzten Zweig kann daher lange unbemerkt bleiben.

### Vorteile

- **Schneller Entwicklungszyklus**: Geänderter Code kann sofort ausgeführt werden, ohne Build-Schritt
- **Plattformunabhängigkeit**: Derselbe Quellcode läuft überall dort, wo ein Interpreter verfügbar ist
- **Einfacheres Debugging**: Fehler werden mit Bezug auf die ursprüngliche Quellcodezeile gemeldet
- **Flexibilität**: Code kann zur Laufzeit erzeugt und ausgeführt werden

### Nachteile

- **Ausführungsgeschwindigkeit**: Der Übersetzungsaufwand fällt bei jedem Lauf an, bei Code innerhalb von
  Schleifen sogar wiederholt
- **Späte Fehlererkennung**: Fehler treten erst zur Laufzeit auf
- **Laufzeitabhängigkeit**: Der Interpreter muss auf dem Zielsystem installiert sein
- **Offenlegung des Quellcodes**: Das Programm wird üblicherweise als lesbarer Quellcode ausgeliefert

---

## Bytecode und virtuelle Maschinen

Die meisten modernen Plattformen kombinieren beide Ansätze. Der Quellcode wird zu **Bytecode** kompiliert, einem
kompakten Zwischencode, der nicht an einen bestimmten Prozessor gebunden ist. Eine **virtuelle Maschine** (VM)
führt diesen Bytecode anschließend auf dem Zielsystem aus.

```text
Quellcode => [Compiler] => Bytecode => [Virtuelle Maschine] => Maschinencode => [CPU]
```

| Plattform | Compiler   | Zwischencode                       | Laufzeitumgebung              |
| --------- | ---------- | ---------------------------------- | ----------------------------- |
| Java      | `javac`    | Bytecode (`.class`)                | JVM (Java Virtual Machine)    |
| C# / .NET | `csc`      | CIL (Common Intermediate Language) | CLR (Common Language Runtime) |
| Python    | integriert | Bytecode (`.pyc`)                  | Python VM                     |

Dadurch werden die beiden plattformabhängigen Belange getrennt: Der Compiler läuft einmal und erzeugt portablen
Bytecode, während nur die virtuelle Maschine je Plattform implementiert werden muss. Das Ergebnis ist das Prinzip
*write once, run anywhere*, erkauft durch eine zusätzliche Schicht zwischen Programm und Hardware.

---

## Just-in-Time-Kompilierung

Ein **Just-in-Time-Compiler** (JIT) ist Teil der virtuellen Maschine. Bytecode wird zunächst interpretiert, wobei
die Laufzeitumgebung erfasst, wie oft welche Abschnitte ausgeführt werden. Häufig genutzte Abschnitte, sogenannte
*Hot Spots*, werden zur Laufzeit in nativen Maschinencode übersetzt und zwischengespeichert, sodass spätere
Aufrufe mit nativer Geschwindigkeit laufen.

```text
Bytecode => [Interpretation + Profiling] => heißer Code => [JIT-Compiler] => zwischengespeicherter Maschinencode
```

### Vorteile

- **Nahezu native Geschwindigkeit** bei gleichzeitigem Erhalt der Portabilität des Bytecodes
- **Laufzeitinformationen** wie tatsächliche Datentypen und Verzweigungshäufigkeiten ermöglichen Optimierungen, die ein statischer Compiler nicht durchführen kann

### Nachteile

- **Aufwärmphase**: Die ersten Ausführungen sind langsam, was sich bei kurz laufenden Programmen bemerkbar macht
- **Speicherverbrauch**: Profiling-Daten und übersetzter Code belegen zusätzlichen Speicher
- **Weniger vorhersagbares Zeitverhalten**: Die Übersetzung während der Ausführung lässt Laufzeiten schwanken, was für Echtzeitsysteme problematisch ist

Das Gegenstück ist die **Ahead-of-Time-Kompilierung** (AOT), bei der der Bytecode vollständig vor der Ausführung
übersetzt wird. Das entfernt die Aufwärmphase und verkürzt die Startzeit, verliert aber die Laufzeitinformationen
und wird daher für kurzlebige Prozesse wie Kommandozeilenwerkzeuge oder Serverless-Funktionen eingesetzt.

### JIT vs. AOT

| Kriterium                 | Just-in-Time (JIT)                              | Ahead-of-Time (AOT)                        |
| ------------------------- | ----------------------------------------------- | ------------------------------------------ |
| Zeitpunkt der Übersetzung | Zur Laufzeit, für häufig genutzten Code         | Vollständig vor der Ausführung             |
| Startzeit                 | Langsam, Warm-up                                | Schnell, keine Warm-up                     |
| Spitzenleistung           | Hoch, durch Laufzeitoptimierung                 | Begrenzt, nur statische Optimierung        |
| Optimierungsgrundlage     | Tatsächliches Laufzeitprofil (Hot Spots, Typen) | Nur statische Codeanalyse                  |
| Speicherbedarf            | Höher, Profiling-Daten und Codecache            | Geringer                                   |
| Zeitverhalten             | Schwankend                                      | Vorhersagbar                               |
| Dynamische Sprachfeatures | Uneingeschränkt                                 | Eingeschränkt, benötigt Konfiguration      |
| Typische Einsatzgebiete   | Lang laufende Server- und Desktopanwendungen    | Kurzlebige Prozesse, CLI-Tools, Serverless |

---

## Transpiler

Ein **Transpiler** (Source-to-Source-Compiler) übersetzt Quellcode in den Quellcode einer anderen Sprache auf
derselben Abstraktionsebene, statt in Maschinencode. Typische Beispiele sind TypeScript, das zu JavaScript
transpiliert wird, und Sass, das zu CSS transpiliert wird.

```text
TypeScript => [Transpiler] => JavaScript => [Engine mit JIT] => Maschinencode
```

---

## Vergleich

| Kriterium                        | Compiler                       | Interpreter                                     |
| -------------------------------- | ------------------------------ | ----------------------------------------------- |
| Zeitpunkt der Übersetzung        | Vollständig vor der Ausführung | Während der Ausführung, Anweisung für Anweisung |
| Ergebnis                         | Ausführbare Datei              | Kein separates Artefakt                         |
| Ausführungsgeschwindigkeit       | Hoch                           | Niedrig                                         |
| Fehlererkennung                  | Zur Übersetzungszeit           | Zur Laufzeit, nur im ausgeführten Code          |
| Entwicklungszyklus               | Langsamer, Build erforderlich  | Schneller, sofortige Ausführung                 |
| Plattformunabhängigkeit          | Gering, ein Build je Plattform | Hoch, benötigt einen Interpreter                |
| Voraussetzung auf dem Zielsystem | Keine                          | Interpreter muss installiert sein               |
| Schutz des Quellcodes            | Gegeben                        | Meist nicht gegeben                             |

---

## Typische Vertreter

- **Zu Maschinencode kompiliert**: C, C++, Rust, Go, Delphi
- **Interpretiert**: Shell-Skripte, Perl, PHP, Ruby, Python
- **Bytecode mit VM und JIT**: Java, Kotlin, C# sowie JavaScript in Engines wie V8
