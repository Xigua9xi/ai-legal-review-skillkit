# ai-legal-review-skillkit

English | [简体中文](README.zh-CN.md)

`ai-legal-review-skillkit` is a public base template for building AI-assisted Chinese contract review workflows.

It is designed for teams that want a reusable legal review skill, structured review rules, configurable company review preferences, synthetic test contracts, and output validation patterns. It does not provide final legal advice, signing approval, or a substitute for human legal review.

## What This Project Does

This repository helps teams build a more standardized AI legal review workflow:

- Guides an AI agent through contract review scope, document normalization, rule selection, risk identification, and report generation.
- Provides public review rules for general contracts, sales contracts, and EPC/engineering contracts.
- Provides profile templates so different companies can adapt review posture, risk tolerance, payment preferences, liability preferences, and report style.
- Provides synthetic fixtures for testing common risk patterns without publishing real contract data.
- Provides machine-readable taxonomies and schema files for future validators, UI tools, or evaluation workflows.
- Includes a sensitive-content check to reduce the risk of publishing private company names, contacts, addresses, credentials, or internal examples.

## What This Project Is Not

- It is not a law firm, legal opinion generator, or automated contract approval system.
- It does not decide whether a contract can be signed.
- It does not include real contracts, customer data, internal legal policies, or private negotiation strategy.
- It should be forked and adapted before internal production use.

## Directory Guide

```text
skills/
  contract-review/
```

The AI skill entrypoint. Start here if you want to understand how the review workflow works. `SKILL.md` defines task scope, inputs, review steps, risk levels, and output principles. `skill.yaml` stores structured metadata and safety boundaries.

```text
rules/
```

Human-readable review rules. These are general public rules that an AI agent or reviewer can apply during contract review.

- `general-contract-review.md`: baseline rules for parties, subject matter, price, payment, delivery, acceptance, liability, termination, confidentiality, IP, and dispute resolution.
- `sales-contract-review.md`: sales/procurement/supply contract extensions.
- `epc-engineering-review.md`: EPC, engineering, construction, milestone, change order, and claim extensions.

```text
profiles/
```

Review preference templates. These are meant to be copied and adapted by each company in a private fork.

- `company-review-preferences.template.md`: blank template for an internal company profile.
- `buyer-side.profile.md`: generic buyer-side posture.
- `seller-side.profile.md`: generic seller-side posture.
- `conservative-risk.profile.md`: stricter escalation posture.
- `balanced-risk.profile.md`: practical default posture.
- `fast-business-review.profile.md`: first-pass business review posture.

```text
fixtures/
```

Synthetic examples for testing and demonstrations. These files are not real contracts. They show common risk patterns such as vague payment triggers, unclear acceptance standards, broad liability, EPC scope conflict, change order risk, and claim time-bar risk.

```text
taxonomies/
```

Machine-readable risk categories. These JSON files can support future validation tools, dashboards, evaluation scripts, or AI output classifiers.

```text
schemas/
```

Output contracts. `review-report.schema.json` defines the expected structure of a review report, including scope, summary, findings, and mandatory human review.

```text
templates/
```

Markdown report templates. Use these to keep AI-generated review reports consistent.

```text
scripts/
```

Local utility scripts.

- `check-sensitive-content.mjs`: scans public files for known sensitive patterns.
- `print-skill-summary.mjs`: prints a short demo summary.

```text
test/
```

Automated checks for schema expectations, taxonomy completeness, profile presence, and sensitive-content scanning.

## Quickstart

Run from this project directory:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run demo
```

Expected use:

- `npm.cmd test`: verifies schema, taxonomy, profile, and sensitive-content checks.
- `npm.cmd run lint`: runs the sensitive-content scanner.
- `npm.cmd run demo`: prints the skill summary and rule file list.

No API key is required.

## How To Use This As A Company Base Template

1. Fork or copy this repository into a private internal repository.
2. Start with `profiles/company-review-preferences.template.md`.
3. Create your own private profile, for example `profiles/internal-seller-side.profile.md`.
4. Adjust `skills/contract-review/SKILL.md` so the workflow loads your selected profile.
5. Add or modify rules in `rules/` to match your contract types and review policy.
6. Add synthetic or fully sanitized fixtures under `fixtures/`.
7. Run `npm.cmd run lint` before publishing or sharing any changes.
8. Keep final approval, signing, and legal conclusions under human review.

## What You Should Customize

Customize these files in a private fork:

- `profiles/company-review-preferences.template.md`: fill in company-specific review posture.
- `profiles/*.profile.md`: add role-specific or business-unit-specific review preferences.
- `rules/*.md`: add contract-type rules, negotiation positions, escalation criteria, and drafting preferences.
- `taxonomies/*.json`: add risk categories that your validator or UI needs.
- `templates/report-template.md`: adapt the report format for your legal, finance, business, or management audience.
- `fixtures/synthetic-contracts/*.md`: add synthetic examples that reflect your common contract patterns.

Do not publish these if they contain confidential content:

- Real customer names, supplier names, project names, addresses, phone numbers, emails, contract numbers, bank accounts, tax IDs, signatures, or seals.
- Internal approval thresholds, pricing policy, risk appetite, negotiation fallback positions, or escalation rules.
- Real contract clauses copied from private transactions unless they are fully authorized and sanitized.

## Suggested Adaptation Pattern

For a seller-side equipment company:

1. Copy `profiles/seller-side.profile.md`.
2. Define payment method preferences, advance payment expectations, acceptance closure requirements, liability cap posture, and finance-confirmation triggers.
3. Expand `rules/sales-contract-review.md` with industry-specific delivery, warranty, and acceptance rules.
4. Add synthetic fixtures for delayed payment, buyer-side acceptance delay, and broad indemnity.
5. Add taxonomy entries for payment, acceptance, warranty, and liability.

For an EPC or engineering team:

1. Copy `profiles/conservative-risk.profile.md` or `profiles/balanced-risk.profile.md`.
2. Expand project scope, change order, claim notice, subcontracting, and project funding preferences.
3. Add synthetic fixtures for scope conflict, owner instruction, change order, and time-bar claims.
4. Add review rules that separate legal, technical, finance, and business confirmations.

## Blank And Redacted Fields

Blank, placeholder, or redacted fields should usually be classified as `to_confirm`, not automatically as high risk.

Escalate only when the missing field affects a material issue, such as party identity, contract price, payment condition, acceptance standard, liability cap, dispute forum, or signing authority.

## Public Contribution Ideas

Good first contributions:

- Add more synthetic fixtures.
- Improve public rules without adding private company content.
- Add more taxonomy entries.
- Add report examples generated from synthetic fixtures.
- Improve sensitive-content detection.
- Build a schema validator CLI.

See `.github/ISSUE_DRAFTS.md` for issue drafts that can be copied into GitHub issues after publishing.

## Safety Notes

Before publishing a fork or pull request:

- Run `npm.cmd run lint`.
- Search for real company names, project names, phone numbers, emails, addresses, contract numbers, tax IDs, bank accounts, and internal policy phrases.
- Replace real examples with synthetic equivalents.
- Keep internal company profiles private unless they are intentionally sanitized for public release.

## Repository Status

This is an early public base template. The current focus is structure, sanitization, reusable profiles, and synthetic examples. Future work should improve validation, evaluation, and domain coverage while keeping private legal practice materials out of the public repository.
