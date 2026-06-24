# Agent Wallet Manifest — GOAT

GOAT (Great Onchain Agent Toolkit) by Crossmint gives AI agents tools to interact with blockchains. Adding a manifest gives your GOAT agent a verified financial identity.

---

## Why

GOAT agents hold wallets and execute onchain actions. Without a manifest, those wallets are unattributed. With one, your agent has a public financial identity that any system can read and verify.

---

## Installation

**Step 1.** Create `.agent/wallets.json` in your repo root.

```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "my-goat-agent",
  "project": "My Project",
  "ecosystem": "base",
  "x_handle": "@myproject",
  "website": "https://myproject.xyz",
  "wallets": [
    {
      "address": "0xYourAgentWalletAddress",
      "chain": "base",
      "role": "operator",
      "label": "GOAT Agent Wallet",
      "verification_method": "github_repo"
    },
    {
      "address": "0xYourTreasuryAddress",
      "chain": "base",
      "role": "treasury",
      "label": "Treasury",
      "verification_method": "github_repo"
    }
  ]
}
```

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

**Step 4.** Push. Badge markdown is printed to CI summary.

---

## Wallet Roles for GOAT

| Your Wallet | Role to Use |
|-------------|-------------|
| Agent execution wallet | `operator` |
| Treasury | `treasury` |
| Fee collection | `fee_receiver` |

---

## Verification

Once CI passes:
`https://www.zettaai.co/registry/[owner]-[repo]`
