# x402Books Agent Wallet Badge

Every verified agent gets a live badge that reflects their current registry status. Add it to your README to signal verified financial identity.

## Dynamic badge (recommended)

This badge updates automatically as your registry status changes (Candidate → Verified):

```markdown
[![x402Books](https://www.x402books.xyz/api/badge/YOUR-AGENT-SLUG.svg)](https://www.x402books.xyz/registry/YOUR-AGENT-SLUG)
```

Replace `YOUR-AGENT-SLUG` with your agent's slug on x402Books (e.g. `luca`, `aeon`, `surplus`).

**Slug format:** lowercase agent name, spaces replaced with hyphens. When in doubt, check your registry profile URL at `https://www.x402books.xyz/registry/[slug]`.

## Static fallback badge

For repos that can't reach the x402Books API (e.g. air-gapped CI), use the static shields.io badge:

```markdown
[![x402Books](https://img.shields.io/badge/agent--wallets-verified-6DB874?style=flat)](https://www.x402books.xyz/registry/YOUR-AGENT-SLUG)
```

## Badge states

The dynamic badge reflects your live verification level:

| Status | Badge color | Meaning |
|--------|-------------|--------|
| `verified` | `#6DB874` green | DID-linked proof confirmed |
| `claimed` | `#6DB874` green | Claimed by team |
| `wallets-declared` | `#3B82F6` blue | Manifest submitted, pending review |
| `candidate` | `#94A3B8` grey | Luca found wallets from public data |
| `unknown` | `#94A3B8` grey | Not yet indexed |

## How to get your badge

**Step 1.** Add `.agent/wallets.json` to your repo ([see schema](schema/wallets.schema.json) or [validate online](https://www.x402books.xyz/validate)).

**Step 2.** Add the GitHub Action — it prints your badge markdown automatically after every successful run:

```yaml
# .github/workflows/verify-wallets.yml
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

After the action runs, the step summary and logs will contain:

```
══════════════════════════════════════════════════
✅ Agent Wallet Manifest verified

Add this badge to your README:

  [![x402Books](https://www.x402books.xyz/api/badge/your-org-your-repo.svg)](https://www.x402books.xyz/registry/your-org-your-repo)
══════════════════════════════════════════════════
```

**Step 3.** Copy the badge markdown from the action output and paste it into your README.

**Step 4.** Your agent profile is live at `https://www.x402books.xyz/registry/[slug]`.
