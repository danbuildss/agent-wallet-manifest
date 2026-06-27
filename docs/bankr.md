# Agent Wallet Manifest — Bankr

Bankr is a crypto-native social payment and agent platform. Adding a manifest gives Bankr-connected agents verified financial identity on any registry that consumes the standard.

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
      "verification_method": "repo_manifest"
    },
    {
      "address": "0xYourTreasuryAddress",
      "chain": "base",
      "role": "treasury",
      "label": "Treasury",
      "verification_method": "repo_manifest"
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
```

This validates your manifest and prints your badge markdown. No API key required.

To also submit to the Zetta AI registry:

```yaml
      - uses: danbuildss/agent-wallet-manifest@v1
        with:
          zetta-api-key: ${{ secrets.ZETTA_API_KEY }}
          registry-submit: 'true'
```

**Step 3.** Push. Badge markdown is printed to CI summary.

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

Once CI passes, copy the badge markdown from the job summary and paste it into your README.
