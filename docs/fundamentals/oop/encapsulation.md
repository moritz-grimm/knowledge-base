---
title: "Encapsulation"
description: "Encapsulation and information hiding in object-oriented programming: access modifiers public, protected, package and private in UML, Java, TypeScript and C#, and the purpose of getters and setters."
keywords:
    - Encapsulation
    - Information Hiding
    - Access Modifier
    - Visibility
    - public
    - protected
    - private
    - Getter
    - Setter
sidebar_position: 2
tags:
    - ap2
---

# Encapsulation

Encapsulation hides the internal state of an object and allows access only through defined methods (information hiding). The object guarantees its own consistency: a bank account rejects a negative deposit instead of relying on every caller to check it.

## Access Modifiers

| Modifier  | UML | Accessible from                     |
| --------- | --- | ----------------------------------- |
| public    | `+` | Everywhere                          |
| protected | `#` | The class itself and its subclasses |
| package   | `~` | All classes in the same package     |
| private   | `-` | Only the class itself               |

- **Java:** Without a modifier, a member has package visibility. `protected` additionally includes the package.
- **TypeScript:** Without a modifier, a member is `public`. There is no package visibility. `private` is checked only by the compiler, while `#name` (an ECMAScript private field) is also private at runtime.
- **C#:** `internal` restricts access to the same assembly, which comes closest to package visibility.

## Getters and Setters

Getters and setters are methods that read or change a private attribute. Their purpose is control over access:

- A setter can validate the new value before accepting it.
- A getter can return a computed value or a copy instead of the internal reference.
- Omitting the setter makes an attribute read-only from outside.
- The internal representation can change later without affecting callers.

```typescript
class BankAccount {
    private balance = 0;

    getBalance(): number {
        return this.balance;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Amount must be positive");
        }
        this.balance += amount;
    }
}
```

`deposit()` takes the role of the setter and enforces the rule, but unlike a `setBalance()` it allows only the change the domain provides for, so the balance cannot be overwritten with an arbitrary value.

## Common Mistakes

1. **Getter and setter for every attribute:** A setter without validation lets any caller set any value. The object can no longer guarantee its consistency, and the attribute is effectively public.

## See Also

- [Class and Object](./class-and-object.md): attributes, state and behaviour of an object
- [Class Diagram](../uml/class-diagram.md): the UML notation for classes, visibilities, inheritance and associations
