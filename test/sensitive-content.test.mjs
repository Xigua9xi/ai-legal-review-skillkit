import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

test("public files pass the sensitive content check", () => {
  const result = spawnSync(process.execPath, ["scripts/check-sensitive-content.mjs"], {
    encoding: "utf8"
  });

  assert.equal(result.status, 0, result.stderr);
});
