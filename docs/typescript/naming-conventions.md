---
title: "Naming Conventions"
description: "TypeScript naming conventions for files, variables, functions, classes, interfaces, types, enums, generics, and booleans."
keywords:
  - "TypeScript"
  - "Naming Conventions"
  - "camelCase"
  - "PascalCase"
  - "kebab-case"
  - "UPPER_SNAKE_CASE"
---

# Naming Conventions

## Overview

Consistent naming makes code easier to read and maintain. These conventions reflect widely adopted TypeScript community standards.

## Files & Directories

- Use **kebab-case** for file and directory names: `user-service.ts`, `auth-utils/`
- Use `.ts` for plain TypeScript, `.tsx` for files containing JSX
- Test files: `user-service.test.ts` or `user-service.spec.ts`
- Name files after their primary export where possible

```text
src/
  services/
    user-service.ts       => export class UserService
    auth-handler.ts       => export function authHandler
  models/
    user-profile.ts       => export interface UserProfile
  constants/
    http-status-codes.ts  => export enum HttpStatusCode
```

## Variables & Constants

- Use **camelCase** for local variables and function-scoped values
- Use **UPPER_SNAKE_CASE** for module-level constants with fixed values
- Use **camelCase** for mutable module-level variables or complex constant objects

```typescript
// Inside a function => camelCase
function processUser() {
  const userName = "Alice";
  let retryCount = 0;
}
```

```typescript
// Module level => UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = "https://api.example.com";

// Module level => complex objects stay camelCase
const defaultConfig = {
  timeout: 5000,
  retries: 3,
};
```

## Functions & Methods

- Use **camelCase**
- Start with a **verb** that describes the action
- Common prefixes: `get`, `set`, `create`, `update`, `delete`, `fetch`, `handle`, `validate`, `parse`, `format`, `convert`, `check`

```typescript
function getUserById(id: string): User { /* ... */ }
function validateEmail(email: string): boolean { /* ... */ }
function formatCurrency(amount: number): string { /* ... */ }
function parseResponseBody<T>(response: Response): T { /* ... */ }
```

## Classes

- Use **PascalCase**
- Use **nouns** or noun phrases
- Private members: prefix with `_` or use the `private` keyword (both conventions exist, pick one per project)

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

- Use **PascalCase** for both
- **No `I` prefix** for interfaces, this is a C# convention, not idiomatic TypeScript
- Use interfaces for object shapes that may be extended, types for unions, intersections, and mapped types

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

### Why PascalCase for enum members?

The TypeScript compiler and standard library use PascalCase for enum members (e.g. `TypeScript.SyntaxKind.MethodDeclaration`). `UPPER_SNAKE_CASE` is common in other languages but not idiomatic in TypeScript.

## Generics

- Use **single uppercase letters** for simple, well-known type parameters: `T` (type), `K` (key), `V` (value), `E` (element)
- Use **descriptive PascalCase names** prefixed with `T` when the meaning isn't obvious or when there are multiple type parameters

```typescript
// Simple cases, single letters are clear enough
function identity<T>(value: T): T { return value; }
function mapEntries<K, V>(map: Map<K, V>): [K, V][] { /* ... */ }

// Multiple or domain-specific parameters, descriptive names help
function merge<TSource, TTarget>(source: TSource, target: TTarget): TSource & TTarget {
  /* ... */
}

interface Repository<TEntity, TId> {
  findById(id: TId): TEntity;
}
```

## Booleans

- Prefix with **`is`**, **`has`**, **`should`**, **`can`**, or **`was`**
- The name should read like a yes/no question

```typescript
const isActive = true;
const hasPermission = user.roles.includes("admin");
const shouldRetry = retryCount < MAX_RETRIES;
const canEdit = isActive && hasPermission;
const wasProcessed = record.status === "done";
```

## Summary

| Element              | Convention         | Example                  |
| -------------------- | ------------------ | ------------------------ |
| Files & Directories  | kebab-case         | `user-service.ts`        |
| Variables            | camelCase          | `userName`               |
| Constants            | UPPER_SNAKE_CASE   | `MAX_RETRIES`            |
| Functions & Methods  | camelCase          | `getUserById`            |
| Classes              | PascalCase         | `UserRepository`         |
| Interfaces & Types   | PascalCase         | `UserProfile`            |
| Enums                | PascalCase         | `HttpStatusCode`         |
| Enum Members         | PascalCase         | `NotFound`               |
| Generics             | T / PascalCase     | `T`, `TEntity`           |
| Booleans             | is/has/can/should  | `isActive`               |
