# Agent Wallet Manifest — AgentKit

Coinbase AgentKit makes it easy to deploy onchain AI agents. Adding a manifest gives your AgentKit agent a verified financial identity — making it readable, trustworthy, and auditable by any registry or tool that consumes the standard.

---

## Why

AgentKit agents hold and spend onchain funds. Without a manifest, those wallets are anonymous. With one, anyone can see:
- Which wallets belong to your agent
- What role each wallet plays (treasury, operator, fee receiver)
- That you've claimed them publicly

This is the difference between an anonymous address and a verified agent identity.

---

## Installation

**Step 1.** Create `.agent/wallets.json` in your repo root.

```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "my-agentkit-agent",
  "project": "My Project",
  "ecosystem": "base",
  "x_handle": "@myproject",
  "website": "https://myproject.xyz",
  "wallets": [
    {
      "address": "0xYourAgentWalletAddress",
      "chain": "base",
      "role": "operator",
      "label": "AgentKit Wallet",
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

**Step 3.** Push. CI validates and prints your badge markdown in the job summary.

---

## Wallet Roles for AgentKit

| Your Wallet | Role to Use |
|-------------|-------------|
| AgentKit MPC wallet (spends gas, executes) | `operator` |
| Main treasury / funds | `treasury` |
| Fee collection | `fee_receiver` |
| Revenue | `revenue` |

---

## Verification

Once CI passes, copy the badge markdown from the job summary and paste it into your README.

Optionally, your agent profile is available at `https://www.zettaai.co/registry/[owner]-[repo]` if you submitted to the Zetta registry.
