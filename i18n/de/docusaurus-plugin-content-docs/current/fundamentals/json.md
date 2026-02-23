---
title: "JSON"
description: "JSON-Konventionen: Dateibenennung, Key Bennenung und Vergleich von JSON, JSONC und JSON5"
keywords:
  - "JSON"
  - "JSONC"
  - "JSON5"
  - "Dateibenennung"
  - "Schlüsselbenennung"
  - "kebab-case"
  - "camelCase"
  - "Namenskonventionen"
---

# JSON

## Überblick

JSON (JavaScript Object Notation) ist ein leichtgewichtiges, textbasiertes Datenformat, das Anfang der 2000er von Douglas Crockford eingeführt wurde. Es leitet sich von der Objekt-Literal-Syntax von JavaScript ab, ist aber sprachunabhängig. Heute ist JSON das am weitesten verbreitete Format für den Datenaustausch zwischen Web-Clients und Servern, Konfigurationsdateien und APIs.

## Dateibenennung

### Antwort: kebab-case

```text
user-data.json
api-config.json
database-schema.json
```

### Warum kebab-case?

- **Plattformübergreifend sicher**: Keine Probleme mit Dateisystemen, die nicht zwischen Groß- und Kleinschreibung unterscheiden (Windows/macOS)
- **Bessere Lesbarkeit** in Dateilisten und Explorern
- **URL-freundlich**: Funktioniert ohne Encoding, wenn Dateien über HTTP bereitgestellt werden

## Schlüsselbenennung

### Antwort: camelCase

```json
{
  "userId": 123,
  "firstName": "Alice",
  "isActive": true
}
```

### Warum camelCase?

- Standard im JavaScript-/TypeScript-Ökosystem, aus dem JSON stammt
- Die JSON-Spezifikation selbst schreibt keinen Schlüsselstil vor
- Die meisten öffentlichen Web-APIs (Google, GitHub, Stripe) verwenden camelCase

### Hinweis

`snake_case` ist in Python-orientierten APIs üblich (z.B. Django REST Framework, FastAPI). Einen Stil wählen und im Projekt konsistent bleiben.

## JSON vs. JSONC vs. JSON5

| Merkmal                          | JSON                 | JSONC                                       | JSON5                                            |
| -------------------------------- | -------------------- | ------------------------------------------- | ------------------------------------------------ |
| Kommentare                       | Nein                 | `//` und `/* */`                            | `//` und `/* */`                                 |
| Trailing Commas                  | Nein                 | Ja                                          | Ja                                               |
| Schlüssel ohne Anführungszeichen | Nein                 | Nein                                        | Ja                                               |
| Einfache Anführungszeichen       | Nein                 | Nein                                        | Ja                                               |
| Typische Verwendung              | Datenaustausch, APIs | Konfigurationsdateien (VS Code, TypeScript) | Konfigurationsdateien, manuell bearbeitete Daten |
