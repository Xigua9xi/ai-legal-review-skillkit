---
name: public-contract-legal-review
description: Use this skill for AI-assisted Chinese contract review workflows that require structured risk findings, traceable contract evidence, revision suggestions, and human legal review.
---

# Public Contract Legal Review

Use this skill when the user asks for Chinese contract review, clause review, sales contract review, EPC or engineering contract review, tender contract review, or review of extracted contract text.

This skill provides review assistance only. Do not present the output as a final legal opinion, signing approval, or substitute for qualified human legal review.

## Inputs

Accept any of these inputs:

- Extracted contract text.
- Pasted contract clauses.
- A document package summary with file names and detected document roles.
- Synthetic fixtures used for testing review behavior.

If the source document is a PDF, Word file, image, or scan, first extract visible text with available document-processing tools. Preserve clause numbers, page references, headings, tables, blanks, and attachment names when possible. Mark OCR uncertainty or missing content explicitly.

## Workflow

1. Classify the review scope.
   - Identify contract type: general, sales, EPC/engineering, tender package, or unknown.
   - Identify document roles: main contract, attachment, technical agreement, quotation sheet, supplemental agreement, or unknown.

2. Normalize the contract package.
   - Keep each source file separate.
   - Preserve clause hierarchy, tables, page references, blanks, and attachment references.
   - Do not invent missing content.

3. Select public rules.
   - Always apply `rules/general-contract-review.md`.
   - Apply `rules/sales-contract-review.md` for sales, procurement, supply, or product delivery contracts.
   - Apply `rules/epc-engineering-review.md` when the document includes EPC, engineering, construction, project owner, milestone payment, commissioning, subcontracting, or project acceptance issues.

4. Identify risks.
   - Tie each finding to contract text, clause number, page, section, or document role when possible.
   - Distinguish legal risk, commercial risk, ambiguity, missing information, and document-package uncertainty.
   - Treat blank, placeholder, or redacted fields as `to_confirm` unless the surrounding text shows a substantive risk.

5. Produce a structured report.
   - Follow `schemas/review-report.schema.json` and `templates/report-template.md`.
   - For each material issue, include risk level, contract basis, risk explanation, and revision suggestion.
   - Do not disclose private rule sources, internal policy assumptions, or hidden chain-of-thought.

## Risk levels

- `high`: May affect validity, payment recovery, major liability exposure, performance feasibility, dispute forum, intellectual property ownership, or core commercial interest.
- `medium`: May cause interpretation dispute, operational burden, delayed performance, evidence gaps, or increased enforcement cost.
- `low`: Mainly affects completeness, clarity, format, notice, or execution convenience.
- `to_confirm`: Depends on missing facts, missing attachments, redacted fields, OCR uncertainty, or business confirmation.

## Output principles

- Use cautious, evidence-based language.
- Avoid absolute conclusions when the contract package is incomplete.
- Do not say "no legal risk"; say no material risk was identified under the reviewed scope.
- Flag issues requiring human legal review.
