# Architecture

The Agent Wallet Manifest is a neutral declaration layer. It sits between wallet creation and every product that needs to understand agent financial identity.

---

## Layer diagram

```
Wallet Provider / Framework
          │
          │  generates or scaffolds
          ▼
  .agent/wallets.json          ← declaration file (in agent's repo)
          │
          │  validated by
          ▼
  Agent Wallet Manifest        ← open standard (schema + action + validator)
  (Open Standard)
          │
          │  consumed by
          ▼
┌─────────────────────────────────────────────────────────┐
│  Registries  ·  Explorers  ·  Analytics  ·  Security    │
│  Treasury Tools  ·  Financial Intelligence Products      │
└─────────────────────────────────────────────────────────┘
          │
          │  power
          ▼
     Applications
```

---

## Layers explained

### Layer 0 — Wallet creation
Wallet providers (Privy, Safe, Dynamic, Turnkey) and frameworks (AgentKit, GOAT, Virtuals) create agent wallets. At this point, the purpose of each wallet is known. The manifest captures that context.

### Layer 1 — Declaration (this standard)
The `.agent/wallets.json` file in the agent's public repo is the declaration. It states which wallets belong to the agent, their roles, and how ownership is verified. The Agent Wallet Manifest defines the schema, validator, and GitHub Action for this layer.

This layer is neutral. It has no registry. It has no intelligence. It is purely a structured declaration.

### Layer 2 — Ecosystem implementations
Anything that reads `.agent/wallets.json` and builds value on top of it:
- **Registries** — index manifests, serve profiles, provide verification tiers
- **Explorers** — browse declared agent identities
- **Analytics** — attribute on-chain activity to declared agent wallets
- **Security tools** — monitor declared wallets for anomalies
- **Treasury tools** — classify financial activity by wallet role
- **Financial intelligence** — generate reports, verdicts, runway estimates

Zetta AI is one implementation at this layer — the reference registry and financial identity infrastructure.

### Layer 3 — Applications
End-user products that consume data from Layer 2: dashboards, alerts, reports, embeddable profiles, agent health scores, financial verdicts.

Luca is one application at this layer — a financial intelligence product built on Zetta's registry.

---

## Key principle

The standard defines the file format. Everything else is an implementation choice. Any team can build at Layer 2 or Layer 3 without permission, coordination, or dependency on any other implementation.

---

## Known implementations

See [PARTNERS.md](../PARTNERS.md) for the current list of frameworks, registries, wallet providers, and tools building on the standard.
