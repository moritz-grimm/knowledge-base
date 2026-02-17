---
name: review-translation
description: Review and compare an English doc and its German translation for errors
argument-hint: <english-file> <german-file>
---

Read both files passed as $ARGUMENTS and compare them thoroughly. Check the following points in order:

## Frontmatter
- Title must be translated into the target language (not left in English)
- No duplicate fields (e.g. two `description:` lines), invalid YAML
- Typos in `description` and `keywords`
- Keywords should be in the target language

## Content completeness
- No leftover source-language sentences or bullet points in the translation (common when only partially translated)
- All sections present in the source must exist in the translation
- No sections added or removed without reason

## Content accuracy
- Numbers, formulas, percentages and technical terms must match exactly
- Watch for subtle meaning changes — e.g. a note referencing the wrong price basis, a wrong percentage, or a term swap that changes the meaning
- Multiplication in formulas must use `x` (the letter), not `×` (Unicode symbol)

## Language & spelling
- Typos in the translated text (e.g. missing letters, wrong umlauts)
- Grammar errors (e.g. wrong adjective endings, missing capitalisation of nominalised verbs in German)
- Abbreviations: `z.B.` not `z.b.`
- Decimal separator: German uses `,` (e.g. `0,43`), English uses `.` (e.g. `0.43`), check all numbers in both files

## Markdown formatting
- Every heading must have a blank line before and after
- Every list must have a blank line before and after
- Code blocks must have a language specifier

## Output
Report every issue found with file, line number, the problematic text, and the correction. Then apply all fixes.