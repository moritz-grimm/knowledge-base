---
title: "Regular Expressions"
description: "Overview of regular expression syntax, character classes, quantifiers, anchors, groups, lookaround, and common patterns."
keywords:
  - "Regular Expressions"
  - "Regex"
  - "Pattern Matching"
  - "Character Classes"
  - "Quantifiers"
  - "Anchors"
  - "Lookahead"
  - "Lookbehind"
  - "Groups"
---

# Regular Expressions

## Overview

Regular expressions (regex) are patterns used to match character combinations in strings. They are supported by virtually every programming language and many command-line tools (e.g. `grep`, `sed`, `awk`). A regex engine scans the input string and checks whether (and where) the pattern matches.

## Basics

### Character Classes

Match a **single character** from a defined set.

| Syntax   | Meaning                               |
| -------- | ------------------------------------- |
| `.`      | Any character except newline          |
| `[abc]`  | One of `a`, `b`, or `c`               |
| `[^abc]` | Any character except `a`, `b`, or `c` |
| `[a-z]`  | Any lowercase letter                  |
| `[0-9]`  | Any digit                             |
| `\d`     | Digit (`[0-9]`)                       |
| `\D`     | Non-digit (`[^0-9]`)                  |
| `\w`     | Word character (`[a-zA-Z0-9_]`)       |
| `\W`     | Non-word character (`[^a-zA-Z0-9_]`)  |
| `\s`     | Whitespace (`[ \t\n\r\f\v]`)          |
| `\S`     | Non-whitespace (`[^\t\n\r\f\v]`)      |

#### Examples

```text
Pattern: [A-Z]\w+
Input:   "Hello World 123"
Matches: Hello, World
```

`[A-Z]` matches one uppercase letter, `\w+` then matches one or more word characters after it. `123` has no uppercase letter at the start, so it is skipped. `\w` does include digits, but `[A-Z]` restricts the first character to letters only.

```text
Pattern: \d\d\d
Input:   "Call 555-1234"
Matches: 555, 123
```

Three consecutive digits. The `-` breaks the sequence, so `1234` produces two overlapping windows but only `123` matches as a complete three-digit group (the engine then continues at `4`, which alone is not enough).

### Quantifiers

Control **how many times** the preceding element must occur.

| Syntax  | Meaning                               |
| ------- | ------------------------------------- |
| `*`     | 0 or more [(greedy)](#greedy-vs-lazy) |
| `+`     | 1 or more [(greedy)](#greedy-vs-lazy) |
| `?`     | 0 or 1 (optional)                     |
| `{n}`   | Exactly n times                       |
| `{n,}`  | n or more times                       |
| `{n,m}` | Between n and m times                 |

#### Examples

```text
Pattern: colou?r
Input:   "color and colour"
Matches: color, colour
```

The `?` makes the `u` optional, so both `color` (0 times `u`) and `colour` (1 time `u`) match.

```text
Pattern: \d{2,4}
Input:   "1 22 333 4444 55555"
Matches: 22, 333, 4444, 5555
```

Matches between 2 and 4 consecutive digits. `1` is too short. `55555` yields `5555` (greedy, so the engine takes the maximum 4) and the remaining `5` is too short for another match.

### Anchors

Match a **position** rather than a character.

| Syntax | Meaning                            |
| ------ | ---------------------------------- |
| `^`    | Start of string (or line with `m`) |
| `$`    | End of string (or line with `m`)   |
| `\b`   | Word boundary                      |
| `\B`   | Non-word boundary                  |

#### Examples

```text
Pattern: \bcat\b
Matches: "the cat sat"    => cat
No match: "concatenate"
```

`\b` marks the boundary between a word character and a non-word character. In `concatenate`, `cat` is surrounded by other letters, so `\b` does not match at those positions.

```text
Pattern: ^\d+
Input:   "42 is the answer"
Match:   42
```

`^` anchors the match to the start of the string. `\d+` then matches one or more digits from that position. Since `42` is at the very beginning, it matches.

```text
Pattern: \.$
Input:   "End of sentence."
Match:   .
```

`$` anchors the match to the end of the string. `\.` matches a literal dot (escaped because `.` normally means "any character"). Together they match a dot at the end of the string.

### Groups and Alternation

Parentheses `()` create groups that capture the matched substring.

```text
Pattern: (foo)(bar)
Input:   foobar
Group 1: foo
Group 2: bar
```

Each pair of `()` creates a numbered group. The full match is `foobar`, but the groups let you access `foo` and `bar` individually (e.g. for search-and-replace or extraction).

The pipe `|` acts as a logical OR.

```text
Pattern: cat|dog
Matches: cat, dog
```

The engine tries `cat` first, and if that fails at the current position, it tries `dog`.

```text
Pattern: (\d{3})-(\d{4})
Input:   "555-1234"
Group 1: 555
Group 2: 1234
```

Groups can capture parts of a structured string separately. Here the area code and number are split into two groups, while the `-` is matched but not captured.

### Flags

Flags modify how the pattern is applied.

| Flag | Name             | Effect                                   |
| ---- | ---------------- | ---------------------------------------- |
| `g`  | Global           | Find all matches, not just the first     |
| `i`  | Case-insensitive | Ignore upper/lower case                  |
| `m`  | Multiline        | `^` and `$` match start/end of each line |
| `s`  | Dotall           | `.` also matches newline characters      |
| `u`  | Unicode          | Treat pattern and input as Unicode       |

#### Examples

```text
Pattern (no flag): /hello/
Input:   "Hello World"
No match

Pattern (with i): /hello/i
Input:   "Hello World"
Match:   Hello
```

Without the `i` flag, `hello` does not match `Hello` because the `H` is uppercase. With the `i` flag, case is ignored and the match succeeds.

## Advanced Patterns

### Greedy vs. Lazy

- **Greedy** (default): matches as much as possible
- **Lazy** (append `?`): matches as little as possible

| Syntax | Meaning          |
| ------ | ---------------- |
| `*?`   | 0 or more (lazy) |
| `+?`   | 1 or more (lazy) |
| `??`   | 0 or 1 (lazy)    |

#### Examples

```text
Input:   <b>bold</b> and <b>more</b>

Greedy:  <.*>   => 1 match:  <b>bold</b> and <b>more</b>
Lazy:    <.*?>  => 4 matches: <b>, </b>, <b>, </b>
```

Greedy `.*` expands as far as possible, matching from the first `<` to the very last `>`, the entire string in one match. Lazy `.*?` stops at the earliest possible `>`, so each tag is matched individually.

### Non-Capturing Groups

Use `(?:...)` when grouping is needed but capturing is not.

```text
Pattern: (?:foo|bar)baz
Matches: foobaz, barbaz
```

### Named Groups

Use `(?<name>...)` to assign a name to a group.

```text
Pattern: (?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})
Input:   2026-03-18
year:    2026
month:   03
day:     18
```

### Backreferences

Refer to a previously captured group with `\1`, `\2`, etc.

```text
Pattern: (\w+)\s\1
Matches: "hello hello"    => hello hello
No match: "hello world"
```

### Lookaround

Lookaround assertions check for a pattern **without consuming** characters.

| Syntax     | Name                | Meaning             |
| ---------- | ------------------- | ------------------- |
| `(?=...)`  | Positive lookahead  | Followed by ...     |
| `(?!...)`  | Negative lookahead  | Not followed by ... |
| `(?<=...)` | Positive lookbehind | Preceded by ...     |
| `(?<!...)` | Negative lookbehind | Not preceded by ... |

#### Examples

```text
Pattern: \d+(?= USD)
Input:   "100 USD and 200 EUR"
Match:   100
```

```text
Pattern: \b\w+\b(?!\.com)
Input:   "test.com and example.org"
Effect:  Matches words NOT followed by .com
```

```text
Pattern: (?<=\$)\d+
Input:   "Price: $50"
Match:   50
```

```text
Pattern: (?<!un)happy
Input:   "happy and unhappy"
Match:   happy (first one only)
```

### Common Patterns

```text
Email (simplified):     [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
IPv4 address:           \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
ISO date (YYYY-MM-DD):  \d{4}-\d{2}-\d{2}
Hex color code:         #[0-9a-fA-F]{3,8}
URL (simplified):       https?://[^\s]+
```
