# Agent Wallet Manifest — Bankr

Bankr is a crypto-native social payment and agent platform. Adding a manifest gives Bankr-connected agents verified financial identity on the open registry.

---

## Why

Bankr agents send and receive payments onchain. The manifest makes those payment wallets publicly attributable — so your agent's financial activity has an identity behind it, not just an address.

---

## Installation

**Step 1.** Create `.agent/wallets.json` in your repo root.

```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "my-bankr-agent",
  "project": "My Project",
  "ecosystem": "base",
  "x_handle": "@myproject",
  "website": "https://myproject.xyz",
  "wallets": [
    {
      "address": "0xYourPaymentWalletAddress",
      "chain": "base",
      "role": "payment_receiver",
      "label": "Payment Wallet",
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

**Step 4.** Push. Badge markdown printed to CI summary — paste it in your README.

---

## Wallet Roles for Bankr Agents

| Your Wallet | Role to Use |
|-------------|-------------|
| Payment receiver | `payment_receiver` |
| Treasury | `treasury` |
| Expense wallet | `expense` |
| Execution wallet | `operator` |

---

## Verification

Once CI passes:
`https://www.zettaai.co/registry/[owner]-[repo]`
