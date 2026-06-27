# Agent Wallet Manifest

The open standard for autonomous agent financial identity.

Any agent, framework, wallet provider, registry, or analytics product can adopt, implement, or build on this standard.

---

## The problem

Autonomous agents move real money — paying for inference, receiving API revenue, holding treasury funds — but there is no standard way to declare which wallets belong to which agent. Anyone can claim a wallet address. Projects can't prove which addresses are theirs. Financial activity is unreadable, unauditable, and untrustworthy.

The Agent Wallet Manifest fixes that: a single `.agent/wallets.json` file in your repo is a verifiable declaration of your agent's financial identity — readable by any registry, indexer, or intelligence product that consumes it.

---

## Quick start

**1. Add your manifest**

Create `.agent/wallets.json` in your repo:

```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "MyAgent",
  "project": "My Project",
  "ecosystem": "base",
  "website": "https://myproject.xyz",
  "wallets": [
    {
      "address": "0xYourWalletAddress",
      "chain": "base",
      "role": "payment_receiver",
      "verification_method": "repo_manifest",
      "notes": "Primary wallet for API revenue.",
      "last_updated": "2026-06-27",
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
- Validate your manifest against the schema
- Print your badge markdown in the job summary — ready to copy

To also submit to the Zetta AI registry, add your API key:

```yaml
      - uses: danbuildss/agent-wallet-manifest@v1
        with:
          zetta-api-key: ${{ secrets.ZETTA_API_KEY }}
          registry-submit: 'true'
```

**3. Copy your badge from the action output**

After the action runs, the step summary shows your badge markdown — copy and paste it into your README.

The badge updates live as your verification status changes. See [`BADGE.md`](BADGE.md) for all variants and status levels.

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

| Role | Description | Books-eligible |
|------|-------------|----------------|
| `treasury` | Holds protocol reserves and long-term funds | Yes |
| `revenue` | Receives income from services or API usage | Yes |
| `expense` | Sends payments to providers or services | Yes |
| `payment_receiver` | Receives payments from users or integrations | Yes |
| `fee_receiver` | Receives protocol or platform fees | Yes |
| `multisig` | Governance treasury | Yes |
| `operator` | Hot wallet for agent-initiated on-chain operations | No |
| `deployer` | Used to deploy contracts | No |
| `token_contract` | Address of an associated token contract | No |
| `token_bound_account` | ERC-6551 token-bound account | No |
| `unknown` | Role not yet classified | No |

> `fee_recipient` is a legacy alias for `fee_receiver` — both are valid, prefer `fee_receiver` in new manifests.

---

## How it works

```
Agent repo
  └── .agent/wallets.json     ← Layer 1: open declaration (this standard)
        │
        ▼
  Registry / Indexer          ← Layer 2: any implementation
  (Zetta AI, Safe, Bankr,
   your own, or anyone's)
        │
        ▼
  Intelligence / Analytics    ← Layer 3: any product built on top
  (Luca, dashboards, alerts,
   audit tools, treasury apps)
```

The manifest is the declaration layer — neutral, open, and implementation-agnostic. Any registry can index it. Any tool can read it. Any product can build on it.

[Zetta AI](https://www.zettaai.co) is one registry implementation. [Luca](https://www.zettaai.co/luca) is one intelligence product. Neither is required to use the standard.

---

## Schema reference

Full schema at [`schema/wallets.schema.json`](schema/wallets.schema.json).

**Required fields:** `agent`, `project`, `ecosystem`, `wallets`

**Each wallet requires:** `address`, `chain`, `role`, `verification_method`

Supported chains: `base`, `ethereum`, `arbitrum`, `optimism`, `polygon`, `solana`, `avalanche`, `bnb`, `zora`, `blast`, `linea`, `scroll`, `mode`, `other`

Verification methods: `repo_manifest`, `on_chain_signature`, `dns_record`, `social_post`, `multisig_ownership`

---

## Validate

Online validator: [zettaai.co/validate](https://www.zettaai.co/validate)

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

## Framework docs

Step-by-step adoption guides:

- [AgentKit](docs/agentkit.md)
- [AEON](docs/aeon.md)
- [GOAT](docs/goat.md)
- [Virtuals](docs/virtuals.md)
- [Bankr](docs/bankr.md)

---

## Badge

See [`BADGE.md`](BADGE.md) for the dynamic badge, static fallback, all status levels, and how the action prints your badge markdown automatically.

---

## Contributing

This is an open standard. PRs welcome for:
- New wallet roles
- Additional chains
- Verification methods
- Framework documentation
- Tooling improvements

For schema changes, see [GOVERNANCE.md](GOVERNANCE.md).

---

*Maintained by [Zetta AI](https://www.zettaai.co). Open standard — anyone can adopt, implement, or build on it.*
