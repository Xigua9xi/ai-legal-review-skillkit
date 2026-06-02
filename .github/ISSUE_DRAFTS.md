# Issue Drafts

These drafts are intended to become real GitHub issues after the repository is published.

## Convert report schema checks into a validator CLI

### Problem

The repository includes a report schema but does not yet provide a CLI for validating generated review reports.

### Proposed change

Add a CLI that validates JSON review reports against `schemas/review-report.schema.json`.

### Acceptance criteria

- Valid reports pass.
- Invalid reports show readable error messages.
- Tests cover missing `human_review_required`, invalid `risk_level`, and missing `suggested_action`.
- Markdown report generation remains separate from schema validation.

### Labels

`enhancement`, `good first issue`

## Add a public profile selection guide

### Problem

The repository includes several profile templates, but users may not know when to choose buyer-side, seller-side, conservative, balanced, or fast-business review profiles.

### Proposed change

Add a short guide under `docs/` that explains profile selection and adaptation.

### Acceptance criteria

- Guide explains each bundled profile.
- Guide includes at least two adaptation examples.
- Guide warns users not to publish completed internal profiles containing confidential policy.

### Labels

`documentation`, `profiles`

## Add expected findings for synthetic fixtures

### Problem

Synthetic contract fixtures exist, but the repository does not yet include expected review findings for each fixture.

### Proposed change

Add `fixtures/expected-findings/` with expected risk findings for each synthetic contract.

### Acceptance criteria

- Each synthetic fixture has a matching expected-findings file.
- Expected findings include risk level, risk type, contract basis, and suggested action.
- Findings use only synthetic facts.

### Labels

`fixtures`, `verification`

## Convert sales review rules into structured taxonomy JSON

### Problem

The sales rules are currently richer in Markdown than in taxonomy JSON. A structured taxonomy would make validation and tooling easier.

### Proposed change

Expand `taxonomies/sales-contract-risk-taxonomy.json`.

### Acceptance criteria

- Add entries for party authority, product specification, payment trigger, acceptance, warranty, liability, termination, confidentiality, IP, and dispute resolution.
- Every entry includes risk id, category, severity hint, review question, and recommended action.
- Tests continue to enforce required fields.

### Labels

`taxonomy`, `enhancement`

## Add examples for redacted and blank fields

### Problem

AI review tools often overstate risk when contract fields are blank or intentionally redacted.

### Proposed change

Add synthetic examples for blank party information, missing price fields, redacted contact details, and missing attachments.

### Acceptance criteria

- Expected handling classifies these issues as `to_confirm` unless surrounding context shows substantive risk.
- README or docs include a short blank-field handling explanation.
- Sensitive-content checks pass.

### Labels

`examples`, `verification`

## Improve sensitive-content detection

### Problem

The current sensitive-content scanner is intentionally simple and pattern-based.

### Proposed change

Improve the scanner to reduce false positives while catching common private information in Chinese legal review materials.

### Acceptance criteria

- Detect phone numbers, emails, identity-card-like strings, bank-account-like strings, and configured blocked phrases.
- Allow a project-local allowlist for synthetic examples.
- Tests cover both blocked and allowed examples.

### Labels

`security`, `help wanted`

## Add a contract-review workflow diagram

### Problem

New users may understand the repository faster with a visual workflow.

### Proposed change

Add a Mermaid diagram to the README or `docs/workflow.md`.

### Acceptance criteria

- Diagram covers input, extraction, profile selection, rule selection, finding generation, schema validation, and human review.
- Diagram does not imply automated approval.

### Labels

`documentation`, `good first issue`
