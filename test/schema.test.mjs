import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("review report schema defines human review as required", async () => {
  const schema = JSON.parse(await readFile("schemas/review-report.schema.json", "utf8"));

  assert.ok(schema.required.includes("human_review_required"));
  assert.equal(schema.properties.human_review_required.const, true);
  assert.ok(schema.properties.findings.items.required.includes("suggested_action"));
});
