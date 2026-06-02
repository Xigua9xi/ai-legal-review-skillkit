import { readFile } from "node:fs/promises";

const skill = await readFile("skills/contract-review/SKILL.md", "utf8");
const rules = [
  "rules/general-contract-review.md",
  "rules/sales-contract-review.md",
  "rules/epc-engineering-review.md"
];

console.log("ai-legal-review-skillkit");
console.log("");
console.log(skill.split("\n").slice(0, 8).join("\n"));
console.log("");
console.log("Rule files:");
for (const rule of rules) {
  console.log(`- ${rule}`);
}
