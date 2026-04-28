---
title: "Google-Suchoperatoren"
description: "Übersicht über erweiterte Google-Suchoperatoren und Techniken für bessere Suchergebnisse."
keywords:
    - Google
    - Suche
    - Suchoperatoren
    - Google Dorking
    - Erweiterte Suche
---

# Google-Suchoperatoren

## Exakte Übereinstimmung

Eine Phrase in Anführungszeichen setzen, um nach genau dieser Wortfolge zu suchen.

```text
"dependency injection in Angular"
```

Liefert nur Ergebnisse, die genau diese Phrase enthalten, nicht Seiten, die lediglich die einzelnen Wörter separat erwähnen.

## Begriffe ausschließen

Ein `-` direkt vor einem Wort verwenden, um Ergebnisse mit diesem Begriff auszuschließen.

```text
python -snake
```

Sucht nach "python", schließt aber Seiten über Schlangen aus.

## ODER-Operator

`OR` (in Großbuchstaben) zwischen Begriffen verwenden, um Seiten zu finden, die einen der beiden Begriffe enthalten.

```text
React OR Vue
```

## Wildcard/Platzhalter

`*` als Platzhalter für unbekannte Wörter innerhalb einer Phrase in Anführungszeichen verwenden.

```text
"how to * a REST API"
```

## Website-Suche

`site:` verwenden, um Ergebnisse auf eine bestimmte Domain einzuschränken.

```text
site:www.moritz-grimm.dev
```

Kann auch auf eine TLD abzielen:

```text
site:edu machine learning
```

## Dateityp

`filetype:` verwenden, um bestimmte Dateiformate zu finden.

```text
filetype:pdf network security
```

Gängige Dateitypen: `pdf`, `docx`, `xlsx`, `pptx`, `csv`, `xml`, `json`, `txt`

## URL-, Titel- und Textfilter

- `inurl:` — Begriff muss in der URL vorkommen
- `intitle:` — Begriff muss im Seitentitel vorkommen
- `intext:` — Begriff muss im Fließtext vorkommen
- `allinurl:`, `allintitle:`, `allintext:` — alle folgenden Begriffe müssen an der jeweiligen Stelle vorkommen

```text
intitle:cheatsheet javascript
```

```text
allinurl:api docs v2
```

## Datumsbereich

`before:` und `after:` mit Datumsangaben im Format `YYYY-MM-DD` verwenden.

```text
"React Server Components" after:2025-01-01
```

## Ähnliche Seiten und Cache

- `related:` — ähnliche Websites zu einer bestimmten Domain finden
- `cache:` — die von Google zwischengespeicherte Version einer Seite anzeigen

```text
related:stackoverflow.com
```

## Operatoren kombinieren

Operatoren können für gezielte Suchen kombiniert werden.

```text
site:github.com filetype:md "contributing guidelines"
```

```text
"error handling" site:stackoverflow.com -closed after:2024-01-01
```

```text
intitle:resume filetype:pdf site:edu "computer science"
```
