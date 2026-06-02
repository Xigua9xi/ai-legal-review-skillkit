import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const requiredFields = ["id", "category", "severity_hint", "review_question", "recommended_action"];

test("risk taxonomy entries include required fields", async () => {
  for (const file of ["taxonomies/sales-contract-risk-taxonomy.json", "taxonomies/epc-engineering-risk-taxonomy.json"]) {
    const entries = JSON.parse(await readFile(file, "utf8"));
    assert.ok(entries.length > 0);
    for (const entry of entries) {
      for (const field of requiredFields) {
        assert.equal(typeof entry[field], "string", `${file} ${entry.id ?? "<missing id>"} missing ${field}`);
        assert.notEqual(entry[field].trim(), "");
      }
    }
  }
});

test("public review profiles are present for common postures", async () => {
  for (const file of [
    "profiles/company-review-preferences.template.md",
    "profiles/buyer-side.profile.md",
    "profiles/seller-side.profile.md",
    "profiles/conservative-risk.profile.md",
    "profiles/balanced-risk.profile.md",
    "profiles/fast-business-review.profile.md"
  ]) {
    const text = await readFile(file, "utf8");
    assert.ok(text.includes("# "), `${file} should have a title`);
  }
});
