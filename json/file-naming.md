# JSON file naming

## Answer: kebab-case

```text
user-data.json
api-config.json
database-schema.json
```

## Why kebab-case?

- **Cross-platform safe**: No issues with case-insensitive file systems (Windows/macOS)
- **Better readability** in file lists and explorers
- **URL-friendly**: If files are served over HTTP

## Don't confuse

- **File name**: `user-config.json` (kebab-case) ✓
- **Keys in JSON**: `"userId": 123` (camelCase) ✓
