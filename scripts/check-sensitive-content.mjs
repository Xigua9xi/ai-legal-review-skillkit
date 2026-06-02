import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const roots = ["skills", "rules", "taxonomies", "schemas", "templates", "profiles", "fixtures", "README.md"];
const blockedPatterns = [
  /四川通力绿建材有限公司/,
  /成都客车股份有限公司/,
  /德阳市嘉陵江西路/,
  /华电储能项目/,
  /统一社会信用代码/,
  /身份证/,
  /银行账号/,
  /API[_-]?KEY/i,
  /\b(client_secret|secret_key|api_secret)\b/i,
  /password/i,
  /\b1[3-9]\d{9}\b/,
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
];

let failures = 0;

async function collectFiles(path) {
  const files = [];
  const entries = await safeReadDir(path);
  if (entries.length === 0) {
    files.push(path);
    return files;
  }
  for (const entry of entries) {
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function safeReadDir(path) {
  try {
    return await readdir(path, { withFileTypes: true });
  } catch {
    return [];
  }
}

for (const root of roots) {
  for (const file of await collectFiles(root)) {
    if (!/\.(md|json|yaml|yml)$/.test(file)) {
      continue;
    }
    const text = await readFile(file, "utf8");
    for (const pattern of blockedPatterns) {
      if (pattern.test(text)) {
        console.error(`${file}: blocked sensitive pattern ${pattern}`);
        failures += 1;
      }
    }
  }
}

process.exitCode = failures === 0 ? 0 : 1;
