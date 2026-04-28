---
title: "Google Search Operators"
description: "Overview of advanced Google search operators and techniques for more precise search results."
keywords:
    - Google
    - Search
    - Search Operators
    - Google Dorking
    - Advanced Search
---

# Google Search Operators

## Exact Match

Wrap a phrase in double quotes to search for that exact sequence of words.

```text
"dependency injection in Angular"
```

Returns only results containing that exact phrase, not pages that merely mention the individual words separately.

## Exclude Terms

Use `-` directly before a word to exclude results containing that term.

```text
python -snake
```

Searches for "python" but excludes pages about snakes.

## OR Operator

Use `OR` (uppercase) between terms to find pages containing either term.

```text
React OR Vue
```

## Wildcard

Use `*` as a placeholder for unknown words within an exact-match phrase.

```text
"how to * a REST API"
```

## Site Search

Use `site:` to restrict results to a specific domain.

```text
site:developer.mozilla.org flexbox
```

Can also target a TLD:

```text
site:edu machine learning
```

## File Type

Use `filetype:` to find specific file formats.

```text
filetype:pdf network security
```

Common file types: `pdf`, `docx`, `xlsx`, `pptx`, `csv`, `xml`, `json`, `txt`

## URL, Title, and Text Filters

- `inurl:` — term must appear in the URL
- `intitle:` — term must appear in the page title
- `intext:` — term must appear in the body text
- `allinurl:`, `allintitle:`, `allintext:` — all following terms must appear in the respective location

```text
intitle:cheatsheet javascript
```

```text
allinurl:api docs v2
```

## Date Range

Use `before:` and `after:` with dates in `YYYY-MM-DD` format.

```text
"React Server Components" after:2025-01-01
```

## Related and Cache

- `related:` — find sites similar to a given domain
- `cache:` — view Google's cached version of a page

```text
related:stackoverflow.com
```

## Combining Operators

Operators can be combined for highly targeted searches.

```text
site:github.com filetype:md "contributing guidelines"
```

```text
"error handling" site:stackoverflow.com -closed after:2024-01-01
```

```text
intitle:resume filetype:pdf site:edu "computer science"
```
