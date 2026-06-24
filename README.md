# Agent Wallet Manifest

[![Zetta AI](https://www.zettaai.co/api/badge/danbuildss-agent-wallet-manifest.svg)](https://www.zettaai.co/registry/luca)

The open standard for autonomous agent financial identity.

---

## The problem

Autonomous agents move real money — paying for inference, receiving API revenue, holding treasury funds — but there is no standard way to declare which wallets belong to which agent. Anyone can claim a wallet address. Projects can't prove which addresses are theirs. Financial activity is unreadable, unauditable, and untrustworthy. The Agent Wallet Manifest fixes that: a single `.agent/wallets.json` file in your repo becomes a signed, verifiable declaration of your agent's financial identity — publicly indexed on [Zetta AI](https://www.zettaai.co) and interpreted by [Luca](https://www.zettaai.co/luca).

---

## Quick start

**1. Add your manifest**

Create `.agent/wallets.json` in your repo:

```json
{
  "agent": "MyAgent",
  "project": "My Project",
  "ecosystem": "Base",
  "website": "https://myproject.xyz",
  "wallets": [
    {
      "address": "0xYourWalletAddress",
      "chain": "base",
      "role": "payment_receiver",
      "verification_method": "repo_manifest",
      "notes": "Primary wallet for API revenue.",
      "last_updated": "2026-06-16",
      "active": true
    }
  ]
}
```

**2. Add the GitHub Action**

Create `.github/workflows/verify-wallets.yml`:

```yaml
name: Verify Agent Wallets
on:
  push:
    paths: ['.agent/wallets.json']
  pull_request:
    paths: ['.agent/wallets.json']

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: danbuildss/agent-wallet-manifest@v1
```

On every push the action will:
- ✓ Validate your manifest against the schema
- ✓ Submit it to the Zetta registry
- ✓ Print your badge markdown in the job summary — ready to copy

**3. Copy your badge from the action output**

After the action runs, the step summary shows:

```markdown
[![Zetta AI](https://www.zettaai.co/api/badge/YOUR-AGENT-SLUG.svg)](https://www.zettaai.co/registry/YOUR-AGENT-SLUG)
```

The badge updates live as your verification status changes. See [`BADGE.md`](BADGE.md) for all variants and status levels.

That's it. Your agent has a public financial identity profile at `https://www.zettaai.co/registry/[slug]`.

---

## Legacy path support

Already using `.x402books/wallets.json`? No migration needed — both paths are supported:

| Path | Status |
|------|--------|
| `.agent/wallets.json` | Standard (recommended) |
| `.x402books/wallets.json` | Legacy (still works) |

The action detects both automatically.

---

## Wallet roles

| Role | Description |
|------|-------------|
| `treasury` | Holds protocol reserves and long-term funds |
| `revenue` | Receives income from services or API usage |
| `expense` | Sends payments to providers or services |
| `operator` | Hot wallet for agent-initiated on-chain operations |
| `deployer` | Used to deploy contracts |
| `fee_recipient` | Receives protocol or platform fees |
| `payment_receiver` | Receives payments from users or integrations |
| `token_contract` | Address of an associated token contract |
| `token_bound_account` | ERC-6551 token-bound account |
| `unknown` | Role not yet classified |

> **Note:** Token contracts are never books-eligible. Only `treasury`, `revenue`, `expense`, `operator`, `deployer`, `fee_recipient`, and `payment_receiver` wallets produce financial records in Zetta.

---

## How it connects

```
your repo
  └── .agent/wallets.json
        │
        ▼
  Zetta registry              — indexes and classifies wallet activity
        │
        ▼
  Luca verdict                — "Healthy treasury. Consistent settlement activity."
        │
        ▼
  live badge in your README   — updates automatically as status changes
  Luca Skills API             — callable financial intelligence for other agents
```

**Zetta AI** is the financial visibility layer. It reads your manifest, monitors on-chain activity, and classifies transactions (settlements, revenue, inference spend, internal transfers).

**Luca** is the AI that sits on top. It reads Zetta data and generates human-readable financial verdicts: treasury health, settlement quality, runway signals — and exposes them as callable skills at `https://www.zettaai.co/api/luca/skills`.

Every `.agent/wallets.json` file in any public repo is automatically picked up and indexed. Every manifest becomes a registry profile. Every profile becomes a verification opportunity.

---

## Schema reference

Full schema at [`schema/wallets.schema.json`](schema/wallets.schema.json).

**Required fields:** `agent`, `project`, `ecosystem`, `wallets`

**Each wallet requires:** `address`, `chain`, `role`, `verification_method`

Supported chains: `base`, `ethereum`, `arbitrum`, `optimism`, `polygon`, `solana`, `avalanche`, `bnb`, `zora`, `blast`, `linea`, `scroll`, `mode`, `other`

Verification methods: `repo_manifest`, `on_chain_signature`, `dns_record`, `social_post`, `multisig_ownership`

---

## Validate

Online validator (recommended): [zettaai.co/validate](https://www.zettaai.co/validate)

Locally:
```bash
node dist/validate.js .agent/wallets.json
```

---

## Examples

See [`/examples`](examples/) for real manifests:

- [`luca.wallets.json`](examples/luca.wallets.json) — Luca, Zetta AI
- [`aeon.wallets.json`](examples/aeon.wallets.json) — AEON Protocol
- [`surplus.wallets.json`](examples/surplus.wallets.json) — Surplus
- [`nipmod.wallets.json`](examples/nipmod.wallets.json) — Nipmod

---

## Badge

See [`BADGE.md`](BADGE.md) for the dynamic badge, static fallback, all status levels, and how the action prints your badge markdown automatically.

---

## Contributing

This is an open standard. PRs welcome for:
- New wallet roles
- Additional chains
- Verification methods
- Tooling improvements

---

*Built by [Zetta AI](https://www.zettaai.co) — the financial operating system for autonomous entities.*
