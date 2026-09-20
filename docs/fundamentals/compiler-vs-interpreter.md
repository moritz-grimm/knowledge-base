---
title: "Compiler vs. Interpreter"
description: "How compilers and interpreters translate source code, their advantages and disadvantages, and the role of bytecode, virtual machines and just-in-time compilation"
keywords:
    - "Compiler"
    - "Interpreter"
    - "Just-in-Time"
    - "JIT"
    - "Bytecode"
    - "Virtual Machine"
    - "Linker"
    - "Ahead-of-Time"
    - "Transpiler"
    - "Programming Languages"
tags:
    - ap2
---

# Compiler vs. Interpreter

## Overview

A processor can only execute machine code. Source code written in a high-level language therefore has to be
translated first. Two fundamental approaches exist:

- **Compiler**: translates the entire program **before** execution into an independent, machine-readable artifact
- **Interpreter**: reads the source code **during** execution and carries out each statement immediately

Whether a language is compiled or interpreted is a property of the **implementation**, not of the language
itself. C is usually compiled, but C interpreters exist; JavaScript was historically interpreted and is
compiled at runtime by modern engines.

---

## Compiler

### Translation Process

The translation is usually performed in several phases:

1. **Lexical analysis**: the character stream is split into tokens (keywords, identifiers, operators)
2. **Syntax analysis**: the tokens are checked against the grammar and turned into a syntax tree
3. **Semantic analysis**: type compatibility, declarations and scopes are verified
4. **Optimization**: the intermediate representation is improved (e.g. dead code elimination, loop unrolling)
5. **Code generation**: machine code is emitted, typically as object files

A **linker** then combines the object files with the required libraries into an executable program.

```text
Source Code => [Compiler] => Object Code => [Linker] => Executable => [CPU]
```

Errors are reported at compile time, so a program with syntax or type errors never reaches execution.

### Advantages

- **Execution speed**: the translated machine code runs directly on the processor
- **Early error detection**: syntactic and many semantic errors surface before the program is shipped
- **Optimization**: the whole program is visible, which allows extensive optimizations
- **Source code protection**: only the compiled artifact has to be distributed
- **No runtime dependency**: the target system does not need the compiler tool installed

### Disadvantages

- **Compilation time**: every change requires a new build before it can be tested
- **Platform dependency**: machine code is bound to a processor architecture and operating system, so a
  separate build is needed per target platform
- **Debugging effort**: the executed machine code no longer resembles the source code, which requires
  debug symbols

---

## Interpreter

The interpreter reads the source code statement by statement, analyses it and executes it immediately. No
separately executable file is produced. The interpreter has to be present on the target system.

```text
Source Code => [Interpreter] => Statement analysed and executed => [CPU]
```

Errors only become visible when the affected line is actually reached. A syntax error in a rarely used branch
can therefore remain unnoticed for a long time.

### Advantages

- **Fast development cycle**: changed code can be executed immediately, without a build step
- **Platform independence**: the same source code runs anywhere an interpreter is available
- **Easier debugging**: errors are reported with reference to the original source line
- **Flexibility**: code can be generated and executed at runtime

### Disadvantages

- **Execution speed**: the translation overhead occurs on every run, and repeatedly for code inside loops
- **Late error detection**: errors only appear at runtime
- **Runtime dependency**: the interpreter must be installed on the target system
- **Source code disclosure**: the program is usually delivered as readable source code

---

## Bytecode and Virtual Machines

Most modern platforms combine both approaches. The source code is compiled into **bytecode**, a compact
intermediate code that is not tied to a specific processor. A **virtual machine** (VM) then executes this
bytecode on the target system.

```text
Source Code => [Compiler] => Bytecode => [Virtual Machine] => Machine Code => [CPU]
```

| Platform  | Compiler | Intermediate Code                  | Runtime                       |
| --------- | -------- | ---------------------------------- | ----------------------------- |
| Java      | `javac`  | Bytecode (`.class`)                | JVM (Java Virtual Machine)    |
| C# / .NET | `csc`    | CIL (Common Intermediate Language) | CLR (Common Language Runtime) |
| Python    | built-in | Bytecode (`.pyc`)                  | Python VM                     |

This separates the two platform-dependent concerns: the compiler runs once and produces portable bytecode,
while only the virtual machine has to be implemented per platform. The result is the principle
*write once, run anywhere*, at the cost of an additional layer between program and hardware.

---

## Just-in-Time Compilation

A **just-in-time compiler** (JIT) is part of the virtual machine. Bytecode is initially interpreted, and the
runtime records how often which sections are executed. Frequently used sections, so-called *hot spots*, are
compiled into native machine code at runtime and cached, so that subsequent calls run at native speed.

```text
Bytecode => [Interpretation + Profiling] => hot code => [JIT Compiler] => cached Machine Code
```

### Advantages

- **Near-native speed** while keeping the portability of bytecode
- **Runtime information** such as actual data types and branch frequencies enables optimizations a static
  compiler cannot perform

### Disadvantages

- **Warm-up phase**: the first executions are slow, which is noticeable for short-running programs
- **Memory consumption**: profiling data and compiled code occupy additional memory
- **Less predictable timing**: compilation during execution makes runtimes fluctuate, which is problematic
  for real-time systems

The counterpart is **ahead-of-time compilation** (AOT), where the bytecode is fully translated before
execution. This removes the warm-up phase and shortens startup time, but loses the runtime information, and
is therefore used for short-lived processes such as command line tools or serverless functions.

### JIT vs. AOT

| Criterion                 | Just-in-Time (JIT)                           | Ahead-of-Time (AOT)                          |
| ------------------------- | -------------------------------------------- | -------------------------------------------- |
| Point of translation      | At runtime, for frequently used code         | Completely before execution                  |
| Startup time              | Slow, warm-up phase                          | Fast, no warm-up                             |
| Peak performance          | High, through runtime optimization           | Limited, static optimization only            |
| Basis for optimization    | Actual runtime profile (hot spots, types)    | Static code analysis only                    |
| Memory consumption        | Higher, profiling data and code cache        | Lower                                        |
| Timing predictability     | Fluctuating                                  | Predictable                                  |
| Dynamic language features | Unrestricted                                 | Restricted, requires configuration           |
| Typical use cases         | Long-running server and desktop applications | Short-lived processes, CLI tools, serverless |

---

## Transpiler

A **transpiler** (source-to-source compiler) translates source code into the source code of another
language at the same abstraction level, rather than into machine code. Typical examples are TypeScript,
which is transpiled to JavaScript, and Sass, which is transpiled to CSS.

```text
TypeScript => [Transpiler] => JavaScript => [Engine with JIT] => Machine Code
```

---

## Comparison

| Criterion                    | Compiler                    | Interpreter                              |
| ---------------------------- | --------------------------- | ---------------------------------------- |
| Point of translation         | Completely before execution | During execution, statement by statement |
| Result                       | Executable file             | No separate artifact                     |
| Execution speed              | High                        | Low                                      |
| Error detection              | At compile time             | At runtime, only in executed code        |
| Development cycle            | Slower, build required      | Faster, immediate execution              |
| Platform independence        | Low, one build per platform | High, requires an interpreter            |
| Requirement on target system | None                        | Interpreter must be installed            |
| Source code protection       | Given                       | Usually not given                        |

---

## Typical Representatives

- **Compiled to machine code**: C, C++, Rust, Go, Delphi
- **Interpreted**: Shell scripts, Perl, PHP, Ruby, Python
- **Bytecode with VM and JIT**: Java, Kotlin, C#, and JavaScript in engines such as V8
