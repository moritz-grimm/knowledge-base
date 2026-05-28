---
title: "MariaDB"
description: "Überblick und SQL-Befehlsreferenz für MariaDB, ein Open-Source-Datenbankmanagementsystem."
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

## Überblick

MariaDB ist ein Open-Source-Datenbankmanagementsystem, das 2009 von den ursprünglichen MySQL-Entwicklern gegründet wurde, nachdem Oracle Sun Microsystems übernommen hatte. Es ist ein Community-getriebener Fork von MySQL und in den meisten Anwendungsfällen vollständig kompatibel, wodurch es häufig als Drop-in-Ersatz eingesetzt wird.

MariaDB ist ACID-konform und unterstützt mehrere Storage Engines, darunter InnoDB und Aria. Es wird häufig für Webanwendungen, Content-Management-Systeme wie WordPress und Drupal sowie allgemeine OLTP-Workloads eingesetzt.

## CREATE TABLE

Legt eine neue Tabelle mit ihren Spalten, Datentypen und Constraints an.

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

Ändert eine bestehende Tabelle durch Hinzufügen, Entfernen oder Umbenennen von Spalten.

```sql
ALTER TABLE users ADD COLUMN age INT;

ALTER TABLE users DROP COLUMN age;

ALTER TABLE users MODIFY COLUMN name VARCHAR(200) NOT NULL;

ALTER TABLE users RENAME COLUMN name TO full_name;
```

## DROP / TRUNCATE

Löscht eine Tabelle dauerhaft oder entfernt alle Zeilen und behält dabei die Struktur.

```sql
DROP TABLE users;       -- Tabelle inkl. aller Daten löschen

TRUNCATE TABLE users;   -- Alle Zeilen löschen, Struktur behalten
```

## INSERT

Fügt eine oder mehrere Zeilen in eine Tabelle ein.

```sql
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

INSERT INTO users (name, email) VALUES
    ('Bob',   'bob@example.com'),
    ('Carol', 'carol@example.com');
```

## SELECT

Liest Zeilen aus einer oder mehreren Tabellen, optional mit Filterung, Sortierung und Paginierung.

```sql
SELECT id, name, email
FROM   users
WHERE  created > '2024-01-01'
ORDER BY name ASC
LIMIT  10 OFFSET 20;
```

### Aliases

Weist Spalten oder Tabellen temporäre Namen zur besseren Lesbarkeit zu.

```sql
SELECT u.name AS user_name, o.total AS order_total
FROM   users  AS u
JOIN   orders AS o ON o.user_id = u.id;
```

### JOINs

Verknüpft Zeilen aus mehreren Tabellen anhand einer gemeinsamen Spalte.

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

Gruppiert Zeilen nach Spaltenwert und filtert Gruppen optional nach der Aggregation.

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

Verschachtelt eine Abfrage in einer anderen, entweder als Filter oder als abgeleitete Tabelle.

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

Ändert bestehende Zeilen in einer Tabelle.

```sql
UPDATE users
SET    name  = 'Alice Smith',
       email = 'alicesmith@example.com'
WHERE  id = 1;
```

## DELETE

Entfernt Zeilen aus einer Tabelle.

```sql
DELETE FROM users WHERE id = 1;
```

## Indizes

Beschleunigt Abfragen durch eine Datenstruktur für schnellere Suchen auf einer oder mehreren Spalten.

```sql
CREATE INDEX idx_users_name ON users (name);

CREATE UNIQUE INDEX idx_users_email ON users (email);

DROP INDEX idx_users_email ON users;

SHOW INDEX FROM users;
```

## Views

Erstellt eine benannte, wiederverwendbare Abfrage, die wie eine Tabelle referenziert werden kann.

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM   users
WHERE  active = 1;

DROP VIEW active_users;
```

## Transaktionen

Fasst mehrere Anweisungen zu einer atomaren Einheit zusammen, die entweder vollständig ausgeführt oder vollständig zurückgerollt wird.

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- ROLLBACK;   -- Alle Änderungen seit START TRANSACTION rückgängig machen
```

## Funktionen

### String

Häufig verwendete Funktionen zur Bearbeitung von Textwerten.

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

Häufig verwendete Funktionen für Datums- und Zeitwerte.

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

Funktionen, die aus einer Menge von Zeilen einen einzelnen Wert berechnen.

```sql
COUNT(*)        -- Alle Zeilen zählen
COUNT(email)    -- Nicht-NULL-Werte zählen
SUM(total)      -- Summe
AVG(total)      -- Durchschnitt
MIN(total)      -- Minimum
MAX(total)      -- Maximum
```

### Konditional

Funktionen und Ausdrücke zur Rückgabe unterschiedlicher Werte basierend auf Bedingungen.

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
