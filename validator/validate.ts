#!/usr/bin/env ts-node
import Ajv from "ajv";
import addFormats from "ajv-formats";
import * as fs from "fs";
import * as path from "path";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schemaPath = path.join(__dirname, "../schema/wallets.schema.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
const validate = ajv.compile(schema);

function run() {
  const target = process.argv[2];

  if (!target) {
    console.error("Usage: node dist/validate.js <path-to-wallets.json>");
    console.error("Example: node dist/validate.js .agent/wallets.json");
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), target);

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found — ${filePath}`);
    process.exit(1);
  }

  let data: unknown;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    console.error(`Error: Could not parse JSON — ${filePath}`);
    process.exit(1);
  }

  const valid = validate(data);

  if (valid) {
    const manifest = data as { agent: string; project: string; wallets: unknown[] };
    console.log(`✓ Valid — ${manifest.agent} (${manifest.project})`);
    console.log(`  ${manifest.wallets.length} wallet(s) declared`);
    process.exit(0);
  } else {
    console.error(`✗ Invalid — ${filePath}`);
    console.error("");
    for (const err of validate.errors ?? []) {
      const field = err.instancePath || "(root)";
      console.error(`  ${field}: ${err.message}`);
    }
    process.exit(1);
  }
}

run();
