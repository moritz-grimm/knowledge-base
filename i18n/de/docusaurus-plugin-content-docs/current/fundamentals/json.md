# JSON

## File Naming

### Antwort: kebab-case

```text
user-data.json
api-config.json
database-schema.json
```

#### Warum kebab-case?

- **Cross-platform kompatibel**: No issues with case-insensitive file systems (Windows/macOS)
- **Bessere Lesbarkeit**: in file lists and explorers
- **URL-freundlich**: If files are served over HTTP

#### Nicht verwechseln

- **Dateibennenung**: `user-config.json` (kebab-case) ✓
- **Keys in einem JSON**: `"userId": 123` (camelCase) ✓
