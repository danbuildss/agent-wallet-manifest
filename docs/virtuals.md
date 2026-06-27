# Agent Wallet Manifest — Virtuals Protocol

Virtuals Protocol lets anyone launch AI agents with onchain economic activity. Adding a manifest gives your Virtuals agent verified financial identity — readable by any registry, auditable by anyone.

---

## Why

Virtuals agents accumulate revenue, hold treasury, and spend onchain. The manifest connects those wallets to a public identity — so your agent's financial activity is attributable, not anonymous.

---

## Installation

**Step 1.** Create `.agent/wallets.json` in your repo root.

```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "my-virtuals-agent",
  "project": "My Project",
  "ecosystem": "base",
  "x_handle": "@myproject",
  "website": "https://myproject.xyz",
  "wallets": [
    {
      "address": "0xYourTreasuryAddress",
      "chain": "base",
      "role": "treasury",
      "label": "Agent Treasury",
      "verification_method": "repo_manifest"
    },
    {
      "address": "0xYourRevenueAddress",
      "chain": "base",
      "role": "revenue",
      "label": "Revenue Wallet",
      "verification_method": "repo_manifest"
    }
  ]
}
```

> Do not include your agent token contract. Token contracts are excluded from financial books.

**Step 2.** Add the GitHub Action.

Create `.github/workflows/manifest.yml`:

```yaml
name: Agent Wallet Manifest

on:
  push:
    paths:
      - '.agent/wallets.json'

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: danbuildss/agent-wallet-manifest@v1
```

This validates your manifest and prints your badge markdown. No API key required.

To also submit to the Zetta AI registry:

```yaml
      - uses: danbuildss/agent-wallet-manifest@v1
        with:
          zetta-api-key: ${{ secrets.ZETTA_API_KEY }}
          registry-submit: 'true'
```

**Step 3.** Push. Your manifest is validated and badge markdown is printed.

---

## Wallet Roles for Virtuals Agents

| Your Wallet | Role to Use |
|-------------|-------------|
| Primary treasury | `treasury` |
| Revenue / earnings | `revenue` |
| Protocol fees | `fee_receiver` |
| Execution wallet | `operator` |

---

## Verification

Once CI passes, copy the badge markdown from the job summary and paste it into your README.
