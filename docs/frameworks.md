# Framework Integration

Frameworks can dramatically accelerate manifest adoption by scaffolding `.agent/wallets.json` automatically when a developer sets up a new agent project.

This document is for teams building agent frameworks — AgentKit, GOAT, Virtuals, Eliza, and similar.

---

## Why this matters

The biggest adoption friction for any standard is the first file. If your framework creates `.agent/wallets.json` as part of project scaffolding, every project using your framework automatically has financial identity from day one.

You don't have to build financial infrastructure. You just have to generate a JSON file.

---

## Integration patterns

### Pattern 1: CLI scaffolding

Add manifest generation to your `init` or `create` command:

```bash
# Example — adapt to your CLI
my-framework create my-agent

# During setup, prompt:
# > Agent name: my-agent
# > Primary chain: base
# > Treasury wallet address (optional, can add later):

# Generates: .agent/wallets.json
```

Minimum required output:
```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "[agent-name]",
  "project": "[project-name]",
  "ecosystem": "[chain]",
  "wallets": []
}
```

Even an empty wallets array is valid if the developer fills it in later — but the file being present means CI will validate it and the structure is in place.

### Pattern 2: Template inclusion

Include a `.agent/wallets.json` template in your project template repository:

```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "{{agent_name}}",
  "project": "{{project_name}}",
  "ecosystem": "base",
  "wallets": [
    {
      "address": "REPLACE_WITH_YOUR_WALLET_ADDRESS",
      "chain": "base",
      "role": "treasury",
      "verification_method": "repo_manifest",
      "label": "Main Treasury",
      "active": true
    }
  ]
}
```

Include the GitHub Action workflow template as well:

```yaml
# .github/workflows/verify-wallets.yml
name: Verify Agent Wallets
on:
  push:
    paths: ['.agent/wallets.json']
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: danbuildss/agent-wallet-manifest@v1
```

### Pattern 3: Runtime wallet registration

If your framework creates wallets at runtime (e.g. MPC wallets, embedded wallets), add a helper that writes wallet addresses to the manifest:

```typescript
// Example — adapt to your framework's shape
import { registerWallet } from '@my-framework/manifest'

await registerWallet({
  address: agentWallet.address,
  chain: 'base',
  role: 'operator',
  label: 'Agent execution wallet'
})
// Appends to .agent/wallets.json
```

### Pattern 4: Documentation

The lowest-effort integration: add a section to your framework's documentation explaining how to add an Agent Wallet Manifest. Link to this repo. Use the quick start from the README.

Even documentation-only integration drives adoption.

---

## What to scaffold

At minimum, scaffold:
- `.agent/wallets.json` with the agent's name, project, and ecosystem
- `.github/workflows/verify-wallets.yml` with the validation action

Optionally scaffold:
- Pre-filled wallet entries if your framework creates wallets during setup
- A `README` note explaining how to update the manifest when adding wallets

---

## Wallet roles for agent frameworks

| Wallet type | Role to use |
|-------------|-------------|
| Execution / MPC wallet | `operator` |
| Treasury | `treasury` |
| Revenue collection | `revenue` |
| Fee receiver | `fee_receiver` |
| User payment receiver | `payment_receiver` |

---

## Getting listed

If you integrate the manifest standard into your framework, open a PR to add a dedicated guide in `docs/[framework].md` and to the integrations table below.

## Known integrations

| Framework | Integration type | Guide |
|-----------|-----------------|-------|
| Coinbase AgentKit | Documentation | [agentkit.md](agentkit.md) |
| AEON | Documentation | [aeon.md](aeon.md) |
| GOAT | Documentation | [goat.md](goat.md) |
| Virtuals | Documentation | [virtuals.md](virtuals.md) |
| Bankr | Documentation | [bankr.md](bankr.md) |

---

## Questions

Open a GitHub Issue tagged `framework` if you are building an integration and have questions.
