#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ajv = new ajv_1.default({ allErrors: true });
(0, ajv_formats_1.default)(ajv);
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
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    catch {
        console.error(`Error: Could not parse JSON — ${filePath}`);
        process.exit(1);
    }
    const valid = validate(data);
    if (valid) {
        const manifest = data;
        console.log(`✓ Valid — ${manifest.agent} (${manifest.project})`);
        console.log(`  ${manifest.wallets.length} wallet(s) declared`);
        process.exit(0);
    }
    else {
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
