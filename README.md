# Agent Wallet Manifest

[![x402Books](https://www.x402books.xyz/api/badge/danbuildss-agent-wallet-manifest.svg)](https://www.x402books.xyz/registry/luca)

The open standard for autonomous agent financial identity.

---

## The problem

Autonomous agents move real money — paying for inference, receiving API revenue, holding treasury funds — but there is no standard way to declare which wallets belong to which agent. Anyone can claim a wallet address. Projects can't prove which addresses are theirs. Financial activity is unreadable, unauditable, and untrustworthy. The Agent Wallet Manifest fixes that: a single `.x402books/wallets.json` file in your repo becomes a signed, verifiable declaration of your agent's financial identity — publicly indexed on [x402Books](https://www.x402books.xyz) and interpreted by [Luca](https://www.x402books.xyz/luca).

---

## Quick start

**1. Add your manifest**

Create `.x402books/wallets.json` in your repo:

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
      "last_updated": "2026-06-05",
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
    paths: ['.x402books/wallets.json']
  pull_request:
    paths: ['.x402books/wallets.json']

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: danbuildss/agent-wallet-manifest@v1
```

**3. Copy your badge from the action output**

After the action runs, the step summary prints your badge markdown ready to copy:

```markdown
[![x402Books](https://www.x402books.xyz/api/badge/YOUR-AGENT-SLUG.svg)](https://www.x402books.xyz/registry/YOUR-AGENT-SLUG)
```

The badge updates live as your verification status changes. See [`BADGE.md`](BADGE.md) for all badge variants and status levels.

That's it. Your agent now has a public financial identity profile at `https://www.x402books.xyz/registry/[slug]`.

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

---

## How it connects

```
your repo
  └── .x402books/wallets.json
        │
        ▼
  x402Books registry          — indexes and classifies wallet activity
        │
        ▼
  Luca verdict                — "Healthy treasury. Consistent settlement activity."
        │
        ▼
  live badge in your README   — trust signal, updates as status changes
```

**x402Books** is the financial visibility layer. It reads your manifest, monitors on-chain activity, and classifies transactions (settlements, revenue, inference spend, internal transfers).

**Luca** is the AI that sits on top. It reads x402Books data and generates human-readable financial verdicts: treasury health, settlement quality, runway signals.

Every `.x402books/wallets.json` file in any public repo is automatically picked up and indexed. Every manifest becomes a registry profile. Every profile becomes a verification opportunity.

---

## Schema reference

Full schema at [`schema/wallets.schema.json`](schema/wallets.schema.json).

**Required fields:** `agent`, `project`, `ecosystem`, `wallets`

**Each wallet requires:** `address`, `chain`, `role`, `verification_method`

Supported chains: `base`, `ethereum`, `arbitrum`, `optimism`, `polygon`, `solana`, `avalanche`, `bnb`, `zora`, `blast`, `linea`, `scroll`, `mode`, `other`

Verification methods: `repo_manifest`, `on_chain_signature`, `dns_record`, `social_post`, `multisig_ownership`

---

## Validate locally

```bash
npx @x402books/validate-manifest .x402books/wallets.json
```

Or use the online validator at [x402books.xyz/validate](https://www.x402books.xyz/validate).

---

## Examples

See [`/examples`](examples/) for real manifests:

- [`luca.wallets.json`](examples/luca.wallets.json) — Luca, x402Books AI
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

*Built by [x402Books](https://www.x402books.xyz) — the financial operating system for autonomous entities.*
