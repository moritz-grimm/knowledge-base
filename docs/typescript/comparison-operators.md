---
title: "Comparison Operators"
description: "Overview of JavaScript/TypeScript comparison operators including equality, relational, strict vs. loose comparison, and operator precedence."
keywords:
  - "JavaScript"
  - "TypeScript"
  - "Comparison Operators"
  - "Strict Equality"
  - "Loose Equality"
  - "Operator Precedence"
---

# Comparison Operators

## Equality Operators

| Operator | Name              | Description                                            |
| -------- | ----------------- | ------------------------------------------------------ |
| `===`    | Strict equality   | Returns `true` if value **and** type are equal         |
| `!==`    | Strict inequality | Returns `true` if value **or** type differ             |
| `==`     | Loose equality    | Returns `true` if values are equal after type coercion |
| `!=`     | Loose inequality  | Returns `true` if values differ after type coercion    |

### Examples

```typescript
1 === 1      // true
1 === "1"    // false (different types)

1 == "1"     // true (string is coerced to number)
0 == false   // true
null == undefined // true
```

**Important:** Always prefer `===` and `!==` over `==` and `!=` to avoid unexpected type coercion.

## Relational Operators

| Operator | Name                  | Example            |
| -------- | --------------------- | ------------------ |
| `>`      | Greater than          | `5 > 3` => `true`  |
| `<`      | Less than             | `5 < 3` => `false` |
| `>=`     | Greater than or equal | `5 >= 5` => `true` |
| `<=`     | Less than or equal    | `3 <= 5` => `true` |

## Nullish and Special Comparisons

| Expression           | Result  | Reason                                 |
| -------------------- | ------- | -------------------------------------- |
| `NaN === NaN`        | `false` | `NaN` is not equal to anything         |
| `null === undefined` | `false` | Different types                        |
| `null == undefined`  | `true`  | Special rule in loose equality         |
| `null == 0`          | `false` | `null` only loosely equals `undefined` |

## Operator Precedence

Operators with a **higher precedence** are evaluated first. Operators on the **same level** are evaluated left to right.

| Precedence  | Operator                 | Description        |
| ----------- | ------------------------ | ------------------ |
| 1 (highest) | `()`                     | Grouping           |
| 2           | `!`                      | Logical NOT        |
| 3           | `>`, `<`, `>=`, `<=`     | Relational         |
| 4           | `===`, `!==`, `==`, `!=` | Equality           |
| 5           | `&&`                     | Logical AND        |
| 6           | `\|\|`                   | Logical OR         |
| 7 (lowest)  | `??`                     | Nullish coalescing |

### Example

```typescript
const result = a > 0 && b === 1 || c !== 2;

// && binds tighter than ||, so this is equivalent to:
const result = (a > 0 && b === 1) || c !== 2;

// NOT:
const result = a > 0 && (b === 1 || c !== 2);

// Solution:
const result = a > 0 && (b === 1 || c !== 2);
```

**Tip:** When in doubt, use parentheses `()` to make the intended evaluation order explicit.
