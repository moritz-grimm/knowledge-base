---
title: "Singleton"
description: "Singleton design pattern: a class with exactly one globally reachable instance, private constructor, static getInstance(), lazy and eager initialisation, drawbacks and thread safety."
keywords:
    - Singleton
    - Design Patterns
    - Creational Patterns
    - getInstance
    - Lazy Initialisation
    - Eager Initialisation
    - Global State
sidebar_position: 1
tags:
    - ap2
---

# Singleton

Singleton is a [creational pattern](index.mdx#categories) from the Gang of Four catalogue.

## Problem

Exactly one instance of a class may exist, and it must be reachable from everywhere, e.g. the application configuration.

## Solution

The class prevents instantiation from outside and manages its single instance itself. This requires three elements:

- A `private` constructor, so `new` fails outside the class
- A `static` attribute holding the instance
- A `static` method `getInstance()` that creates the instance on the first call and returns it

```typescript
class Configuration {
    private static instance: Configuration | null = null;

    private constructor() {
        // load settings
    }

    static getInstance(): Configuration {
        if (Configuration.instance === null) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }
}

const a = Configuration.getInstance();
const b = Configuration.getInstance();
console.log(a === b);                  // true
```

The instance is created either on first use, as in the variant above (lazy initialisation), or at program start (eager initialisation). Under concurrent access, the lazy variant needs precautions, see [Common Mistakes](#common-mistakes).

## Typical Use

Configuration, logging, connection pool, cache.

## Comparison with Similar Patterns

A [registry](./registry.md) also gives global access to shared objects. Unlike a singleton, it holds any number of objects of any classes and returns them by key.

## Drawbacks

A singleton is global state. Classes that call `getInstance()` hide this dependency, and tests cannot replace the instance with a fake. Many projects therefore let a [dependency injection](../dependency-injection.md) container manage a single instance instead.

## Common Mistakes

1. **Singleton as a convenient global variable:** Any class can call `getInstance()`, so the dependency does not appear in any constructor or method signature. Tests cannot replace the instance, and state left behind by one test affects the next. Dependency injection with a single shared instance gives the same guarantee without these problems.
2. **Lazy singleton without synchronisation:** In a multithreaded runtime, two threads that call `getInstance()` at the same time can both pass the check for an existing instance and create two instances. Synchronising access to `getInstance()` or using eager initialisation prevents this.

## See Also

- [Dependency Injection](../dependency-injection.md): a single shared instance without a hidden dependency
