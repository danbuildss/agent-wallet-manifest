# Agent Wallet Manifest

The open standard for autonomous agent wallet identity.

One file. Any chain. Any framework. Readable by any registry, tool, or product that consumes it.

---

## What it is

Autonomous agents move real money — paying for inference, receiving API revenue, holding treasury funds — but there is no standard way to declare which wallets belong to which agent.

The Agent Wallet Manifest is a machine-readable declaration: a single `.agent/wallets.json` file in a public repo that states which wallets belong to an agent, what role each wallet plays, and how ownership is verified.

Anything can consume it. Any registry can index it. Any tool can read it. Any product can build on it.

---

## How it fits in the ecosystem

```
Builder
      │
      ▼
.agent/wallets.json
      │
      ▼
Any Registry · Any Wallet Provider · Any Framework · Any Analytics Tool
      │
      ▼
Applications
```

The manifest is the declaration layer — neutral, open, and implementation-agnostic.

Anyone can build on it:
- **Registries** — index manifests, serve profiles, provide verification
- **Wallet providers** — auto-generate manifests at wallet creation
- **Frameworks** — scaffold manifests during project setup
- **Analytics tools** — consume declared wallets for financial intelligence
- **Security products** — monitor declared wallets for anomalies

See [`docs/registries.md`](docs/registries.md), [`docs/wallet-providers.md`](docs/wallet-providers.md), and [`docs/frameworks.md`](docs/frameworks.md) for how to build on the standard.

---

## Quick start

**Step 1. Add your manifest**

Create `.agent/wallets.json` in your repo root:

```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "my-agent",
  "project": "My Project",
  "ecosystem": "base",
  "website": "https://myproject.xyz",
  "wallets": [
    {
      "address": "0xYourWalletAddress",
      "chain": "base",
      "role": "treasury",
      "verification_method": "repo_manifest",
      "label": "Main Treasury",
      "active": true
    }
  ]
}
```

**Step 2. Add the GitHub Action**

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

On every push the action validates your manifest against the schema and prints your badge markdown in the job summary — ready to copy into your README.

**Step 3. Optionally submit to a registry**

To submit to the [Zetta AI registry](https://www.zettaai.co):

```yaml
      - uses: danbuildss/agent-wallet-manifest@v1
        with:
          zetta-api-key: ${{ secrets.ZETTA_API_KEY }}
          registry-submit: 'true'
```

Other registry implementations can define their own submission steps.

That's it. Your agent has a declared, verifiable financial identity.

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
| `payment_receiver` | Receives payments from users or integrations |
| `fee_receiver` | Receives protocol or platform fees |
| `operator` | Hot wallet for agent-initiated on-chain operations |
| `deployer` | Used to deploy contracts |
| `token_contract` | Address of an associated token contract |
| `token_bound_account` | ERC-6551 token-bound account |
| `unknown` | Role not yet classified |

> `fee_recipient` is a legacy alias for `fee_receiver` — both are valid.

---

## Schema reference

Full schema at [`schema/wallets.schema.json`](schema/wallets.schema.json).

**Required fields:** `agent`, `project`, `ecosystem`, `wallets`

**Each wallet requires:** `address`, `chain`, `role`, `verification_method`

Supported chains: `base`, `ethereum`, `arbitrum`, `optimism`, `polygon`, `solana`, `avalanche`, `bnb`, `zora`, `blast`, `linea`, `scroll`, `mode`, `other`

Verification methods: `repo_manifest`, `on_chain_signature`, `dns_record`, `social_post`, `multisig_ownership`

---

## Validate

Online: [zettaai.co/validate](https://www.zettaai.co/validate)

Locally:
```bash
node dist/validate.js .agent/wallets.json
```

---

## Examples

See [`/examples`](examples/) for real manifests:

- [`minimal.wallets.json`](examples/minimal.wallets.json) — minimal valid manifest
- [`aeon.wallets.json`](examples/aeon.wallets.json) — AEON Protocol
- [`luca.wallets.json`](examples/luca.wallets.json) — Luca, Zetta AI
- [`surplus.wallets.json`](examples/surplus.wallets.json) — Surplus
- [`nipmod.wallets.json`](examples/nipmod.wallets.json) — Nipmod

---

## Framework guides

Step-by-step adoption guides for specific frameworks:

- [AgentKit](docs/agentkit.md)
- [AEON](docs/aeon.md)
- [GOAT](docs/goat.md)
- [Virtuals](docs/virtuals.md)
- [Bankr](docs/bankr.md)

---

## Build on the standard

- [Building a registry](docs/registries.md) — index manifests, serve profiles, provide verification
- [Wallet provider integration](docs/wallet-providers.md) — auto-generate manifests at wallet creation
- [Framework integration](docs/frameworks.md) — scaffold manifests during project setup

---

## Badge

See [`BADGE.md`](BADGE.md) for badge variants and how the action prints your badge markdown automatically.

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). PRs welcome for framework docs, examples, and tooling.

For schema changes, open a GitHub Issue tagged `proposal` and follow the process in [`GOVERNANCE.md`](GOVERNANCE.md).

---

*Maintained by [Zetta AI](https://www.zettaai.co). Open standard — anyone can adopt, implement, or build on it.*
