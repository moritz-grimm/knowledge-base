---
name: review-translation
description: Review and compare an English doc and its German translation for errors
argument-hint: <english-file> <german-file>
---

Read both files passed as $ARGUMENTS and compare them thoroughly.

**Critical instruction**: Do NOT skim the files. You must compare every single line of the source against the corresponding line in the translation. Read both files in full, then walk through them paragraph by paragraph, sentence by sentence. Meaning, logic, and factual accuracy must be preserved exactly.

Check the following points in order:

## 1. Frontmatter

- Title must be translated into the target language (not left in English)
- No duplicate fields (e.g. two `description:` lines), invalid YAML
- Typos in `description` and `keywords`
- Keywords should be in the target language

## 2. Content completeness

- No leftover source-language sentences or bullet points in the translation (common when only partially translated)
- All sections present in the source must exist in the translation
- No sections added or removed without reason

## 3. Content accuracy (line-by-line)

Go through every paragraph and bullet point. For each one, verify:

- The translated sentence conveys the **exact same meaning** as the source
- Numbers, formulas, percentages, and technical terms match exactly
- No subtle meaning shifts (e.g. a note referencing the wrong price basis, a wrong percentage, a term swap that changes the meaning, a negation added or dropped, a condition weakened or strengthened)
- Causal relationships and logical flow are preserved (e.g. "because" must not become "although")
- Multiplication in formulas must use `x` (the letter), not `×` (Unicode symbol)

## 4. Language & spelling

- Typos in the translated text (e.g. missing letters, wrong umlauts)
- Grammar errors (e.g. wrong adjective endings, missing capitalisation of nominalised verbs in German)
- Abbreviations: `z.B.` not `z.b.`
- Decimal separator: German uses `,` (e.g. `0,43`), English uses `.` (e.g. `0.43`) — check all numbers in both files
- Prefer `,` over `-` as a separator where grammatically possible (e.g. "sicher, zuverlässig" instead of "sicher - zuverlässig")

## 5. Links & references

- All internal and external links from the source must be present in the translation, and vice versa — flag links in the translation that do not exist in the source
- Link targets (URLs, relative paths) must not be translated
- Link display text should be translated

## 6. Code blocks & inline code

- Contents of fenced code blocks must NOT be translated (code stays as-is)
- Inline code (backtick-wrapped) must NOT be translated
- Code blocks must have a language specifier (e.g. ` ```js `, not ` ``` `)

## 7. Markdown formatting

- Every heading must have a blank line before and after
- Every list must have a blank line before and after
- Use `=>` instead of `→` (Unicode arrow)
- File must end with exactly one trailing newline

## Output

Report every issue as a markdown table with exactly these columns:

| # | File | Line | Issue | Found | Fix |
|---|------|------|-------|-------|-----|

- **#**: Sequential issue number
- **File**: Which file (use `EN` for the English source, `DE` for the German translation)
- **Line**: Line number in that file
- **Issue**: Brief category (e.g. "Typo", "Untranslated", "Wrong number", "Meaning changed", "Missing blank line", "Dash => comma")
- **Found**: The problematic text (quote the relevant snippet)
- **Fix**: The corrected text

If no issues are found, state "No issues found." explicitly.

After presenting the table, apply all fixes to the affected files.
