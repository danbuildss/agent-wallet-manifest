# Why Adopt the Agent Wallet Manifest

The Agent Wallet Manifest is a single `.agent/wallets.json` file that declares which wallets belong to an agent, what role each wallet plays, and how ownership is verified.

This page explains why different groups should adopt or build on it.

---

## Agent Builders

**Why adopt?**
Your agent moves real money. Without a manifest, every wallet it uses is anonymous — indistinguishable from any other address on-chain. A manifest makes your agent's financial activity attributable, auditable, and trustworthy.

**What do you gain?**
- Public financial identity your users and partners can verify
- A verified badge for your README
- Eligibility for registry profiles, financial intelligence, and treasury monitoring products
- A clear declaration that separates treasury from operator from revenue wallets

**Implementation effort**
Low. Add one JSON file to your repo and one GitHub Action. Under 5 minutes.

---

## Frameworks

**Why adopt?**
Every agent project built on your framework should have a financial identity from day one. If you scaffold `.agent/wallets.json` automatically, your entire user base gets financial identity without any extra effort.

**What do you gain?**
- Every project on your framework becomes financially readable
- You're listed in the ecosystem as a framework partner
- Your users can connect to registries, analytics, and intelligence products that consume the standard
- You reduce adoption friction for a growing infrastructure layer

**Implementation effort**
Low to medium. Add manifest generation to your `init` or `create` command, or include it as a project template. See [docs/frameworks.md](frameworks.md).

---

## Wallet Providers

**Why adopt?**
You create wallets. You know their purpose at creation time — treasury, operator, fee receiver. That context disappears the moment the wallet hits the chain. A manifest preserves it permanently.

**What do you gain?**
- Every wallet you provision gets a public, verifiable identity
- You reduce post-creation confusion for your users ("which wallet was this?")
- You become a distribution channel for the standard — every wallet you create with a manifest is adoption
- You're listed in the ecosystem as a wallet provider partner

**Implementation effort**
Low. Add manifest generation as an export option in your dashboard, or scaffold it during wallet creation. See [docs/wallet-providers.md](wallet-providers.md).

---

## Registries

**Why adopt?**
A registry that indexes the standard gets a growing, structured dataset of agent wallet identities — without having to define the format yourself. Any agent that adopts the standard is automatically in scope for your registry.

**What do you gain?**
- A structured, growing dataset of declared agent wallets
- Compatibility with the GitHub Action's submission flow
- Listing in the known registries table
- A head start on financial identity infrastructure for the agent economy

**Implementation effort**
Medium. Index `.agent/wallets.json` from public repos, validate against the schema, and serve profiles. See [docs/registries.md](registries.md) for the full spec.

---

## Analytics Platforms

**Why adopt?**
On-chain data without identity context is hard to interpret. The manifest provides structured identity — wallet roles, agent names, projects, ecosystems — that turns anonymous addresses into attributable activity.

**What do you gain?**
- Wallet-to-agent attribution for on-chain activity
- Structured role data (treasury vs. operator vs. revenue) for financial classification
- A growing dataset of declared wallets to enrich your existing data

**Implementation effort**
Low to medium. Index manifests from public repos or consume from a registry. Enrich your existing address data with manifest metadata.

---

## Security Tools

**Why adopt?**
Monitoring wallets you can't attribute is guesswork. The manifest tells you exactly which wallets belong to which agent and what role they play — so anomaly detection, drain alerts, and unusual activity flags are meaningful.

**What do you gain?**
- Attribution context for every monitored wallet
- Role-aware alerting (e.g. "treasury wallet drained" vs. "operator wallet spent gas")
- A structured dataset of declared wallets to build monitoring on

**Implementation effort**
Low. Index manifests and use the role data to enrich your monitoring rules.

---

## Treasury & Finance Products

**Why adopt?**
Autonomous agents are becoming significant financial actors. Treasury tools, accounting products, and financial reporting platforms that can classify agent wallet activity — using declared roles — are positioned ahead of a wave of demand.

**What do you gain?**
- Structured financial identity for agent wallets (treasury, revenue, expense, fee receiver)
- A standard format to build financial reports and treasury dashboards on
- Early positioning as infrastructure for AI-native finance

**Implementation effort**
Low to medium. Consume declared manifests, use role data for financial classification, build reports on top.
