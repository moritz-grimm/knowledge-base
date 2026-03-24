---
title: "Namenskonventionen"
description: "TypeScript Namenskonventionen für Dateien, Variablen, Funktionen, Klassen, Interfaces, Typen, Enums, Generics und Booleans."
keywords:
  - "TypeScript"
  - "Namenskonventionen"
  - "camelCase"
  - "PascalCase"
  - "kebab-case"
  - "UPPER_SNAKE_CASE"
---

# Namenskonventionen

## Überblick

Konsistentes Naming macht Code leichter les- und wartbar. Diese Konventionen reflektieren weit verbreitete TypeScript Community Standards.

## Dateien & Ordner

- **kebab-case** für Datei- und Ordernamen verwenden: `user-service.ts`, `auth-utils/`
- Man nutzt `.ts` für normales TypeScript und `.tsx` für Dateien welche JSX enthalten
- Testdateien: `user-service.test.ts` oder `user-service.spec.ts`
- Dateien am besten immer nach ihrem primären Export benennen wenn möglich

```text
src/
  services/
    user-service.ts       => exportiert Klasse UserService
    auth-handler.ts       => exportiert Funktion authHandler
  models/
    user-profile.ts       => exportiert Interface UserProfile
  constants/
    http-status-codes.ts  => export Enum HttpStatusCode
```

## Variablen & Konstanten

- **camelCase** für lokale Variablen und funktions-scoped Werte
- **UPPER_SNAKE_CASE** für module-level Konstanten mit fixen Werten
- **camelCase** für veränderbare module-level Variablen oder komplexe konstante Objekte

```typescript
// In einer Funktion => camelCase
function processUser() {
  const userName = "Alice";
  let retryCount = 0;
}
```

```typescript
// Module level => UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = "https://api.example.com";

// Module level => komplexe Objekte bleiben in camelCase
const defaultConfig = {
  timeout: 5000,
  retries: 3,
};
```

## Funktionen & Methoden

- Immer **camelCase**
- Mit einem **Verb** beginnen das die Aktion beschreibt
- Häufige Präfixe: `get`, `set`, `create`, `update`, `delete`, `fetch`, `handle`, `validate`, `parse`, `format`, `convert`, `check`

```typescript
function getUserById(id: string): User { /* ... */ }
function validateEmail(email: string): boolean { /* ... */ }
function formatCurrency(amount: number): string { /* ... */ }
function parseResponseBody<T>(response: Response): T { /* ... */ }
```

## Klassen

- Immer in **PascalCase**
- Mit einem **Nomen** oder eine Nominalphrase
- Private Funktionen: Präfix mit `_` oder das `private` Keyword nutzen (Beide Konventionen existieren, jeweils immer nur eine pro Projekt auswählen)

```typescript
class UserRepository {
  private _connection: DbConnection;

  constructor(connection: DbConnection) {
    this._connection = connection;
  }

  findById(id: string): User { /* ... */ }
}

class HttpClient { /* ... */ }
class EventEmitter { /* ... */ }
```

## Interfaces & Type Aliases

- **PascalCase** für beide nutzen
- **Kein `I` Präfix** für Interfaces, das ist eine C# Konvention, nicht idiomatisches TypeScript
- Interfaces werden genutzt für Objekte die erweitert werden können, Typen für Unions, Intersections und mapped types

```typescript
// Interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface Repository<T> {
  findById(id: string): T;
  save(entity: T): void;
}

// Type aliases
type Status = "active" | "inactive" | "pending";
type Nullable<T> = T | null;
type UserWithRole = UserProfile & { role: string };
```

## Enums

- Enum name: **PascalCase** (singular)
- Enum members: **PascalCase**

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

enum HttpStatusCode {
  Ok = 200,
  NotFound = 404,
  InternalServerError = 500,
}
```

### Warum PascalCase für Enum Members?

Der TypeScript Compiler und Standard Librarys nutzen PascalCase für Enum Members (z.B. `TypeScript.SyntaxKind.MethodDeclaration`). `UPPER_SNAKE_CASE` ist üblich in anderen Sprachen, in TypeScript jedoch nicht idiomatisch.

## Generics

- **Einzelne Großbuchstaben** für simple, bekannte Typen Parameter: `T` (type), `K` (key), `V` (value), `E` (element)
- Nutze **beschreibende Namen in PascalCase** präfixed mit `T`, wenn die Bedeutung nicht offensichtlich ist oder wenn mehrere Typenparameter vorhanden sind

```typescript
// Einzelne Großbuchstaben sind hier klar genug
function identity<T>(value: T): T { return value; }
function mapEntries<K, V>(map: Map<K, V>): [K, V][] { /* ... */ }

// Bei mehreren oder domänenspezifischen Parametern sind aussagekräftige Namen hilfreich
function merge<TSource, TTarget>(source: TSource, target: TTarget): TSource & TTarget {
  /* ... */
}

interface Repository<TEntity, TId> {
  findById(id: TId): TEntity;
}
```

## Booleans

- Präfix mit **`is`**, **`has`**, **`should`**, **`can`**, oder **`was`**
- Der Namen sollte sich wie eine Ja/Nein Frage lesen

```typescript
const isActive = true;
const hasPermission = user.roles.includes("admin");
const shouldRetry = retryCount < MAX_RETRIES;
const canEdit = isActive && hasPermission;
const wasProcessed = record.status === "done";
```

## Zusammenfassung

| Element               | Konvention        | Beispiele         |
| --------------------- | ----------------- | ----------------- |
| Dateien & Ordner      | kebab-case        | `user-service.ts` |
| Variablen             | camelCase         | `userName`        |
| Konstanten            | UPPER_SNAKE_CASE  | `MAX_RETRIES`     |
| Funktionen & Methoden | camelCase         | `getUserById`     |
| Klassen               | PascalCase        | `UserRepository`  |
| Interfaces & Types    | PascalCase        | `UserProfile`     |
| Enums                 | PascalCase        | `HttpStatusCode`  |
| Enum Members          | PascalCase        | `NotFound`        |
| Generics              | T / PascalCase    | `T`, `TEntity`    |
| Booleans              | is/has/can/should | `isActive`        |
