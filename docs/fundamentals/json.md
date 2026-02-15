---
title: "JSON File Naming"
description: "JSON file naming conventions and best practices for consistent and cross-platform compatible file naming"
keywords:
  - "JSON"
  - "File Naming"
  - "kebab-case"
  - "Naming Conventions"
  - "Best Practices"
---

# JSON

## File Naming

### Answer: kebab-case

```text
user-data.json
api-config.json
database-schema.json
```

#### Why kebab-case?

- **Cross-platform safe**: No issues with case-insensitive file systems (Windows/macOS)
- **Better readability** in file lists and explorers
- **URL-friendly**: If files are served over HTTP

#### Don't confuse

- **File name**: `user-config.json` (kebab-case) ✓
- **Keys in JSON**: `"userId": 123` (camelCase) ✓
