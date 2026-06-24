# Agent Wallet Manifest — AEON

AEON is an autonomous execution and settlement layer. Adding a manifest gives AEON-powered agents verified financial identity on the open registry.

---

## Why

AEON agents execute and settle onchain. The manifest connects those settlement wallets to a public financial identity — treasury vs. deployer vs. fee receiver — making AEON agent activity readable and auditable.

---

## Installation

**Step 1.** Create `.agent/wallets.json` in your repo root.

```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "my-aeon-agent",
  "project": "My Project",
  "ecosystem": "base",
  "x_handle": "@myproject",
  "website": "https://myproject.xyz",
  "wallets": [
    {
      "address": "0xYourTreasuryAddress",
      "chain": "base",
      "role": "treasury",
      "label": "Treasury",
      "verification_method": "github_repo"
    },
    {
      "address": "0xYourDeployerAddress",
      "chain": "base",
      "role": "deployer",
      "label": "Deployer",
      "verification_method": "github_repo"
    }
  ]
}
```

**Note:** Do not include your token contract address. Token contracts are not attributed to financial books.

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
        with:
          registry-api-key: ${{ secrets.ZETTA_API_KEY }}
```

**Step 3.** Add `ZETTA_API_KEY` to your repo secrets.

**Step 4.** Push. CI validates and submits to registry.

---

## Wallet Roles for AEON Agents

| Your Wallet | Role to Use |
|-------------|-------------|
| Primary treasury | `treasury` |
| Contract deployer | `deployer` |
| Settlement receiver | `fee_receiver` |
| Execution wallet | `operator` |

---

## Verification

Once CI passes:
`https://www.zettaai.co/registry/[owner]-[repo]`
