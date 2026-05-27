---
title: "MariaDB"
description: "Syntax-Referenz für die gängigsten MariaDB-SQL-Befehle mit Beispielen."
keywords:
    - "SQL"
    - "MariaDB"
    - "Datenbank"
    - "Syntax"
    - "Referenz"
    - "SELECT"
    - "INSERT"
    - "UPDATE"
    - "DELETE"
    - "JOIN"
    - "CREATE TABLE"
    - "ALTER TABLE"
    - "Index"
    - "View"
    - "Transaktion"
---

# MariaDB

## CREATE TABLE

```sql
CREATE TABLE users (
    id      INT          NOT NULL AUTO_INCREMENT,
    name    VARCHAR(100) NOT NULL,
    email   VARCHAR(255) NOT NULL UNIQUE,
    created DATETIME     DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

## ALTER TABLE

```sql
ALTER TABLE users ADD COLUMN age INT;

ALTER TABLE users DROP COLUMN age;

ALTER TABLE users MODIFY COLUMN name VARCHAR(200) NOT NULL;

ALTER TABLE users RENAME COLUMN name TO full_name;
```

## DROP / TRUNCATE

```sql
DROP TABLE users;       -- Tabelle inkl. aller Daten löschen

TRUNCATE TABLE users;   -- Alle Zeilen löschen, Struktur behalten
```

## INSERT

```sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

INSERT INTO users (name, email) VALUES
    ('Bob',   'bob@example.com'),
    ('Carol', 'carol@example.com');
```

## SELECT

```sql
SELECT id, name, email
FROM   users
WHERE  created > '2024-01-01'
ORDER BY name ASC
LIMIT  10 OFFSET 20;
```

### Aliases

```sql
SELECT u.name AS user_name, o.total AS order_total
FROM   users  AS u
JOIN   orders AS o ON o.user_id = u.id;
```

### JOINs

```sql
-- INNER JOIN — nur Zeilen, die in beiden Tabellen übereinstimmen
SELECT u.name, o.total
FROM   users  AS u
INNER JOIN orders AS o ON o.user_id = u.id;

-- LEFT JOIN — alle Zeilen der linken Tabelle, übereinstimmende der rechten
SELECT u.name, o.total
FROM   users  AS u
LEFT JOIN orders AS o ON o.user_id = u.id;

-- RIGHT JOIN — alle Zeilen der rechten Tabelle, übereinstimmende der linken
SELECT u.name, o.total
FROM   users  AS u
RIGHT JOIN orders AS o ON o.user_id = u.id;
```

### GROUP BY / HAVING

```sql
-- GROUP BY fasst Zeilen nach Spaltenwert zusammen
SELECT   department_id, COUNT(*) AS headcount
FROM     employees
GROUP BY department_id;

-- HAVING filtert Gruppen nach der Aggregation (WHERE filtert Zeilen davor)
SELECT   department_id, COUNT(*) AS headcount
FROM     employees
GROUP BY department_id
HAVING   headcount > 5;
```

### Unterabfragen

```sql
SELECT name
FROM   users
WHERE  id IN (SELECT user_id FROM orders WHERE total > 100);

-- Unterabfrage als abgeleitete Tabelle
SELECT dept, avg_salary
FROM (
    SELECT department_id AS dept, AVG(salary) AS avg_salary
    FROM   employees
    GROUP BY department_id
) AS dept_avg
WHERE avg_salary > 50000;
```

## UPDATE

```sql
UPDATE users
SET    name  = 'Alice Smith',
       email = 'alicesmith@example.com'
WHERE  id = 1;
```

## DELETE

```sql
DELETE FROM users WHERE id = 1;
```

## Indizes

```sql
CREATE INDEX idx_users_name ON users (name);

CREATE UNIQUE INDEX idx_users_email ON users (email);

DROP INDEX idx_users_email ON users;

SHOW INDEX FROM users;
```

## Views

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM   users
WHERE  active = 1;

DROP VIEW active_users;
```

## Transaktionen

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- ROLLBACK;   -- Alle Änderungen seit START TRANSACTION rückgängig machen
```

## Funktionen

### String

```sql
CONCAT(first_name, ' ', last_name)    -- Strings zusammenfügen
LOWER(name)                            -- Kleinbuchstaben
UPPER(name)                            -- Großbuchstaben
LENGTH(name)                           -- Länge in Bytes
TRIM(name)                             -- Führende/nachfolgende Leerzeichen entfernen
SUBSTRING(name, 1, 3)                 -- Teilstring extrahieren (1-indiziert)
REPLACE(name, 'alt', 'neu')           -- Teilstring ersetzen
```

### Datum / Uhrzeit

```sql
NOW()                                  -- Aktuelles Datum und Uhrzeit
CURDATE()                              -- Aktuelles Datum
DATE(created)                          -- Datumsteil aus Datetime extrahieren
YEAR(created)                          -- Jahr extrahieren
MONTH(created)                         -- Monat extrahieren
DAY(created)                           -- Tag extrahieren
DATE_FORMAT(created, '%d.%m.%Y')      -- Datum als String formatieren
DATEDIFF(end_date, start_date)        -- Differenz in Tagen
DATE_ADD(created, INTERVAL 7 DAY)     -- Intervall addieren
```

### Aggregat

```sql
COUNT(*)        -- Alle Zeilen zählen
COUNT(email)    -- Nicht-NULL-Werte zählen
SUM(total)      -- Summe
AVG(total)      -- Durchschnitt
MIN(total)      -- Minimum
MAX(total)      -- Maximum
```

### Konditional

```sql
-- COALESCE — gibt den ersten Nicht-NULL-Wert zurück
SELECT COALESCE(nickname, name) AS display_name FROM users;

-- CASE
SELECT name,
       CASE
           WHEN score >= 90 THEN 'A'
           WHEN score >= 75 THEN 'B'
           ELSE 'C'
       END AS grade
FROM results;

-- IF
SELECT IF(active = 1, 'Aktiv', 'Inaktiv') AS status FROM users;
```
