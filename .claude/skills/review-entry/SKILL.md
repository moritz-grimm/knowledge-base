---
name: review-entry
description: Review a knowledge base entry and its German translation — guideline compliance, translation parity, redundancy and filler
argument-hint: <english-file> [german-file]
---

# Review Entry

Review a knowledge base entry in both locales.

## Files

The first path in $ARGUMENTS is the English source, e.g. `docs/fundamentals/uml/use-case-diagram.md`. The German translation is derived from it by convention:

`docs/<rest>` => `i18n/de/docusaurus-plugin-content-docs/current/<rest>`

A second path may be passed to override that derivation. If the derived file does not exist, report the missing translation as the first finding and review the English file alone.

## Before starting

Run `git status --short` on both files. If either one is untracked or has unstaged modifications, point this out **before reading the files** and ask the user to stage them:

```bash
git add <english-file> <german-file>
```

The review applies its corrections directly to the files. Staging them beforehand is what makes those corrections visible afterwards as an isolated `git diff`, instead of mixed into the changes that were already in the working tree. Wait for confirmation, then start. If the files are already staged and clean in the working tree, start without asking.

**Critical instruction**: Do NOT skim the files. You must compare every single line of the source against the corresponding line in the translation. Read both files in full, then walk through them paragraph by paragraph, sentence by sentence. Meaning, logic, and factual accuracy must be preserved exactly.

**Rule source**: `CLAUDE.md` in the repository root is the single source of truth for the content rules, in the sections **Adding New Documentation**, **Tags**, **Translation Guidelines**, **File Naming**, **Writing Style** and **Markdown Formatting**. Read it before comparing the files. The checklist below says *where to look*, it deliberately does not restate the rules, so that a new rule in `CLAUDE.md` takes effect without editing this skill. If `CLAUDE.md` cannot be read, say so instead of reviewing against guessed rules.

**Scope**: Rules that `CLAUDE.md` marks as applied "only when the file is touched for another reason" are scoped per file, not per line. Both files under review are being worked on, so they are checked in full against those rules, including lines the current change did not touch.

Check the following points in order.

## 1. Frontmatter

- Which fields must be translated is defined in **Translation Guidelines** in `CLAUDE.md`
- Required fields are defined in **Adding New Documentation** in `CLAUDE.md`
- Tags must follow the **Tags** section in `CLAUDE.md` and be set identically in both files
- No duplicate fields (e.g. two `description:` lines), invalid YAML
- Typos in `description` and `keywords`

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
- Formula notation follows **Markdown Formatting** in `CLAUDE.md` (e.g. `x` instead of `×`), in both files

## 4. Language & spelling

- Typos in the translated text (e.g. missing letters, wrong umlauts)
- Grammar errors (e.g. wrong adjective endings, missing capitalisation of nominalised verbs in German)
- Check both files against **Writing Style** in `CLAUDE.md` — the form of address, and the neutrality of the entry. The latter is easy to miss because such a sentence reads as helpful: report every mention of an examination, a course or the occasion the entry was written for, in both locales, and propose the neutral wording or the deletion as the fix
- The locale-specific conventions in **Markdown Formatting** in `CLAUDE.md` (abbreviations, decimal separator, separators) — check all numbers and abbreviations in both files

## 5. Links & references

- All internal and external links from the source must be present in the translation, and vice versa — flag links in the translation that do not exist in the source
- What may and may not be translated in a link is defined in **Translation Guidelines** in `CLAUDE.md`
- Relative link targets must resolve to an existing file

## 6. Code blocks & inline code

- What may and may not be translated in code is defined in **Translation Guidelines** in `CLAUDE.md`
- Code block requirements are defined in **Markdown Formatting** in `CLAUDE.md`

## 7. Markdown formatting

- Check both files against the **Markdown Formatting** section of `CLAUDE.md`, line by line
- Pay particular attention to the rules that differ between the locales, and to rules that are easy to lose while translating (blank lines around headings and lists, list punctuation, term lists, trailing newline)
- File naming follows **File Naming** in `CLAUDE.md`

## 8. Redundancy & filler

The **Writing Style** rules in `CLAUDE.md` ("Say it once", "No section recaps", "No announcement sentences", "No opening restatement") are the ones most often violated in long entries, and they cannot be checked by skimming — the repetitions sit hundreds of lines apart. Run this explicitly for every entry longer than roughly 100 lines:

1. **Build a claim map.** While reading, note every core statement of the entry (a rule, a definition, a criterion) together with each line number where it appears, including paraphrases, not just literal repetitions. A long entry typically runs through the same material four times — overview, notation table, per-concept sections, worked example, mistakes list — and that is only visible when the occurrences are listed side by side.
2. **Report every statement that appears more than twice**, with all its line numbers, and name the one section that should keep it.
3. **Check each section's opening sentence** against the table row or overview sentence it expands on. If it only paraphrases it, report the sentence.
4. **Report announcement sentences** individually, with the shortened version as the fix ("The essential point: X" => "X"). A sentence introducing a table is not an announcement per se: if it carries a statement of its own or tells the reader what the table compares, it stays. Report it only when it says nothing beyond the heading above it or the fact that a table follows.
5. **Check prose next to a diagram or code block.** If it describes what the diagram already shows instead of adding what the diagram cannot show, report it.

What must **not** be proposed for deletion, per **Cut rhetoric, not facts** in `CLAUDE.md`:

- Any sentence carrying a verifiable statement about notation — the direction of an arrow, the shape of an element, solid versus dashed, a rule about what is forbidden. It is rephrased or kept, never dropped because the same fact appears elsewhere
- Entries in a "Common Mistakes" list. The mistake perspective has its own value for exam preparation, so a statement appearing both in the running text and in that list is a deliberate duplicate
- A recap list as a whole. It is trimmed to what the example itself adds, not removed

Before proposing a cut, check whether the sentence contains a checkable statement about notation. If it does, propose a rephrasing. Only purely rhetorical material is cut.

Report the redundancy findings for the English source and name the corresponding German lines, so that a cut lands in both locales.

## Output

Report the findings as two separate tables.

**Table 1 — corrections.** Everything from points 1 to 7:

| # | File | Line | Issue | Found | Fix |
|---|------|------|-------|-------|-----|

- **#**: Sequential issue number
- **File**: Which file (use `EN` for the English source, `DE` for the German translation)
- **Line**: Line number in that file
- **Issue**: Brief category (e.g. "Typo", "Untranslated", "Wrong number", "Meaning changed", "Missing blank line", "Dash => comma")
- **Found**: The problematic text (quote the relevant snippet)
- **Fix**: The corrected text

**Table 2 — redundancy and filler.** Everything from point 8:

| # | Statement | Lines EN / DE | Keep in | Proposal |
|---|-----------|---------------|---------|----------|

- **Statement**: The repeated claim, or the filler sentence quoted
- **Lines EN / DE**: Every occurrence, both locales
- **Keep in**: The one section that should own the statement
- **Proposal**: Cut, or the rephrased version

If a table has no entries, state "No issues found." for it explicitly.

Then **apply Table 1 to both files** — those are unambiguous corrections.

**Do not apply Table 2.** Cutting redundancy means deciding which section owns a statement, and that decision is the user's. Present the table and wait for the go-ahead.
