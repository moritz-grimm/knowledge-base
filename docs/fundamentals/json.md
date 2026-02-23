---
title: "JSON"
description: "JSON conventions: file naming, key naming, and comparison of JSON, JSONC, and JSON5"
keywords:
  - "JSON"
  - "JSONC"
  - "JSON5"
  - "File Naming"
  - "Key Naming"
  - "kebab-case"
  - "camelCase"
  - "Naming Conventions"
---

# JSON

## Overview

JSON (JavaScript Object Notation) is a lightweight, text-based data format introduced by Douglas Crockford in the early 2000s. It is derived from the object literal syntax of JavaScript but is language-independent. Today JSON is the most widely used format for data exchange between web clients and servers, configuration files, and APIs.

## File Naming

### Answer: kebab-case

```text
user-data.json
api-config.json
database-schema.json
```

### Why kebab-case?

- **Cross-platform safe**: No issues with case-insensitive file systems (Windows/macOS)
- **Better readability** in file lists and explorers
- **URL-friendly**: Works without encoding if files are served over HTTP

## Key Naming

### Answer: camelCase

```json
{
  "userId": 123,
  "firstName": "Alice",
  "isActive": true
}
```

### Why camelCase?

- Standard in the JavaScript/TypeScript ecosystem, where JSON originates
- The JSON specification itself does not prescribe a key style
- Most public web APIs (Google, GitHub, Stripe) use camelCase

### Note

`snake_case` is common in Python-centric APIs (e.g. Django REST Framework, FastAPI). Pick one style and stay consistent within a project.

## JSON vs. JSONC vs. JSON5

| Feature               | JSON                | JSONC                              | JSON5                           |
| --------------------- | ------------------- | ---------------------------------- | ------------------------------- |
| Comments              | No                  | `//` and `/* */`                   | `//` and `/* */`                |
| Trailing commas       | No                  | Yes                                | Yes                             |
| Unquoted keys         | No                  | No                                 | Yes                             |
| Single-quoted strings | No                  | No                                 | Yes                             |
| Typical use           | Data exchange, APIs | Config files (VS Code, TypeScript) | Config files, human-edited data |
