# Agent Wallet Manifest

**A standard for autonomous agents to publish their verified wallet addresses.**

```
.x402books/wallets.json
```

---

## The Problem

There is no standard way to answer: *which wallet does this agent actually use?*

If you want to pay an agent, verify its treasury, audit its spending, or build tooling on top of it — you have nowhere to look. Agent wallet ownership is unverified, scattered, and inconsistent across the ecosystem.

## The Solution

One file in your repo. Publicly readable. Machine-verifiable.

Agent projects add a `wallets.json` manifest to their repository at `.x402books/wallets.json`. This file declares every wallet the agent uses — treasury, operators, payment receivers, token contracts — with roles, chains, and verification evidence.

x402Books AI uses this manifest to auto-import agents into the [Agent Financial Registry](https://www.x402books.xyz), generate verified financial reports, and score treasury health.

---

## Quickstart

**1. Create the manifest file in your repo:**

```
mkdir .x402books
touch .x402books/wallets.json
```

**2. Add your wallet data:**

```json
{
  "agent": "YourAgent",
  "project": "Your Project",
  "ecosystem": "Base",
  "website": "https://yourproject.xyz",
  "x": "@YourHandle",
  "wallets": [
    {
      "address": "0xYourWalletAddress",
      "chain": "base",
      "role": "treasury",
      "verification_method": "repo_manifest",
      "evidence_url": "https://github.com/yourorg/yourrepo",
      "notes": "Primary treasury wallet.",
      "last_updated": "2026-05-20",
      "active": true
    }
  ]
}
```

**3. Validate your manifest:**

```bash
npx agent-wallet-manifest validate .x402books/wallets.json
# ✓ Valid manifest — YourAgent (Your Project)
#   1 wallet(s) declared
```

**4. Submit to the x402Books registry:**

Once your manifest is live, submit it at [x402books.xyz](https://www.x402books.xyz) or call:

```
GET https://api.x402books.xyz/v1/registry/import?repo=yourorg/yourrepo
```

---

## Wallet Roles

| Role | Description |
|------|-------------|
| `treasury` | Primary funds storage. Where revenue accumulates. |
| `revenue` | Dedicated wallet receiving protocol income. |
| `expense` | Wallet used for outgoing payments and costs. |
| `operator` | Hot wallet the agent uses for gas and on-chain actions. |
| `deployer` | Wallet that deployed contracts. |
| `fee_recipient` | Receives protocol fees. |
| `payment_receiver` | Accepts incoming payments from users or other agents. |
| `token_contract` | The address of the project's ecosystem token. |
| `token_bound_account` | ERC-6551 token-bound account. |
| `unknown` | Role not yet classified. |

---

## Verification Methods

| Method | Description |
|--------|-------------|
| `repo_manifest` | This file. Wallet is declared in a public GitHub repo. |
| `on_chain_signature` | Wallet signed a message proving repo ownership. |
| `dns_record` | Address published in DNS TXT record for the project domain. |
| `social_post` | Publicly posted from verified project social account. |
| `multisig_ownership` | Wallet is a multisig with public signers. |

---

## Full Schema

See [`schema/wallets.schema.json`](./schema/wallets.schema.json) for the complete JSON Schema (draft-07).

**Top-level fields:**

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `agent` | ✓ | string | Agent name |
| `project` | ✓ | string | Project or org name |
| `ecosystem` | ✓ | string | Primary blockchain ecosystem |
| `wallets` | ✓ | array | List of wallet objects |
| `website` | — | string (URI) | Project website |
| `x` | — | string | X/Twitter handle |
| `github` | — | string | GitHub handle |
| `contact` | — | string | Contact email or URL |

**Wallet object fields:**

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `address` | ✓ | string | EVM address (`0x...`) |
| `chain` | ✓ | enum | See supported chains below |
| `role` | ✓ | enum | See wallet roles above |
| `verification_method` | ✓ | enum | See verification methods above |
| `evidence_url` | — | string (URI) | URL to verification evidence |
| `notes` | — | string | Human-readable purpose |
| `last_updated` | — | date | ISO 8601 date (YYYY-MM-DD) |
| `active` | — | boolean | Is this wallet currently active? |

**Supported chains:** `base`, `ethereum`, `arbitrum`, `optimism`, `polygon`, `solana`, `avalanche`, `bnb`, `zora`, `blast`, `linea`, `scroll`, `mode`, `other`

---

## Add CI Validation

Keep your manifest valid on every push. Copy [`.github/workflows/validate.yml`](./.github/workflows/validate.yml) into your repo:

```yaml
name: Validate Wallet Manifest

on:
  push:
    paths:
      - ".x402books/wallets.json"
  pull_request:
    paths:
      - ".x402books/wallets.json"

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate manifest
        run: npx agent-wallet-manifest validate .x402books/wallets.json
```

---

## Examples

- [`examples/luca.wallets.json`](./examples/luca.wallets.json) — Luca, the x402Books AI agent
- [`examples/example-agent.wallets.json`](./examples/example-agent.wallets.json) — Starter template

---

## Why `.x402books/`?

The directory namespace is owned by x402Books AI, the financial intelligence platform for autonomous agents. This ensures manifests are indexed by the registry automatically, and lets x402Books generate verified financial reports and trust scores for any agent that publishes one.

---

## Integration with x402Books AI

When your manifest is live on GitHub:

- Your agent is auto-importable to the [Agent Financial Registry](https://www.x402books.xyz)
- Financial reports generated for your wallet will show **Manifest Verified**
- Treasury health scoring uses your declared wallet roles to classify inflows and outflows correctly
- Your agent becomes discoverable to other agents and builders in the ecosystem

---

## License

MIT — free to use, fork, and build on.

---

*Built by [x402Books AI](https://www.x402books.xyz) — Financial intelligence platform for autonomous agents.*
