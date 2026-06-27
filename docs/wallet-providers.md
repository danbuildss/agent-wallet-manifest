# Wallet Provider Integration

Wallet providers can help their users declare financial identity automatically by generating Agent Wallet Manifests at wallet creation time.

This document is for teams building wallet infrastructure — Privy, Safe, Dynamic, Reown, Turnkey, Web3Auth, and similar.

---

## Why this matters

When a developer creates an agent wallet through your platform, they know the wallet's purpose immediately: treasury, operator, fee receiver. That context disappears the moment the wallet hits the chain — it becomes an anonymous address.

If your platform auto-generates a manifest at creation time, that context is preserved publicly and permanently. Every wallet your platform creates becomes a declared, verifiable identity.

---

## Integration patterns

### Pattern 1: Generation at wallet creation

When a developer creates an agent wallet, prompt them for:
- Agent name
- Wallet role (from the standard role enum)
- Chain

Generate the `.agent/wallets.json` file for them and offer to commit it to their repo.

**Minimal generated manifest:**
```json
{
  "$schema": "https://schema.zettaai.co/wallets.v1.json",
  "agent": "[agent-name]",
  "project": "[project-name]",
  "ecosystem": "[chain]",
  "wallets": [
    {
      "address": "[generated-address]",
      "chain": "[chain]",
      "role": "[role]",
      "verification_method": "repo_manifest",
      "label": "[label]",
      "active": true
    }
  ]
}
```

### Pattern 2: Export from dashboard

Add an "Export Wallet Manifest" button to the wallet dashboard. Developers can download their `.agent/wallets.json` pre-populated with all wallets they've created through your platform.

### Pattern 3: GitHub App integration

Build a GitHub App that:
1. Listens for new wallets created through your platform
2. Automatically opens a PR to the agent's repo with the manifest file
3. The developer reviews and merges

This is the highest-conversion path — the developer does almost nothing.

### Pattern 4: SDK method

If your platform has an SDK, add a method:

```typescript
// Example — adapt to your SDK's shape
const manifest = await wallet.exportManifest({
  agent: 'my-agent',
  project: 'My Project',
  roles: {
    [treasuryAddress]: 'treasury',
    [operatorAddress]: 'operator',
  }
})

await manifest.writeToRepo('./') // writes .agent/wallets.json
```

---

## Wallet roles reference

| Role | When to use |
|------|-------------|
| `treasury` | Long-term fund storage |
| `revenue` | Receiving income |
| `expense` | Paying providers |
| `payment_receiver` | Receiving user payments |
| `fee_receiver` | Protocol fee collection |
| `operator` | Agent execution wallet (gas, transactions) |
| `deployer` | Contract deployment only |

---

## Verification method

For wallets created through your platform, use `repo_manifest` as the verification method unless you support on-chain signature verification.

If your platform can produce a signed message proving wallet ownership, `on_chain_signature` provides a stronger trust signal.

---

## Getting listed

If you integrate the manifest standard into your platform, open a PR to add your platform to the framework guides in [`docs/`](.) and to the wallet providers table below.

## Known integrations

| Platform | Integration type | Notes |
|----------|-----------------|-------|
| — | — | Be the first. Open a PR. |

---

## Questions

Open a GitHub Issue tagged `wallet-provider` if you are building an integration and have questions.
