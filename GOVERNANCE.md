# Governance

The Agent Wallet Manifest is an open standard. Anyone can adopt it, implement it, or build on it without permission.

---

## Principles

- **Neutral by design.** The standard belongs to the ecosystem. No single company owns agent financial identity.
- **Backwards compatible first.** Existing adopters are never broken by schema updates.
- **Community proposals.** Schema changes require open discussion, not unilateral decisions.
- **Open implementations.** Any registry, indexer, analytics tool, or intelligence product can consume the standard. No approval required.

---

## Maintainers

Maintainers have merge access and are responsible for:
- Reviewing and merging PRs
- Managing schema versions
- Ensuring backwards compatibility
- Long-term support of active versions

**Current maintainers:**
- [Zetta AI](https://www.zettaai.co) — `@zettaaidotco`

We welcome additional maintainers from the community. If your project is a significant adopter and you want to help maintain the standard, open an issue.

---

## Proposing changes

Anyone can propose a change.

**Process:**
1. Open a GitHub Issue with the label `proposal`
2. Describe what you want to add, why it matters, and which projects need it
3. Community discussion period — minimum 7 days
4. If accepted, open a PR
5. Schema changes require maintainer approval before merge

**For detailed contribution guidelines**, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## Schema versioning

| Version | Status | Schema URL |
|---------|--------|------------|
| v1 | Active | `https://schema.zettaai.co/wallets.v1.json` |

**Rules:**
- `v1` is long-term supported. Adopters on `v1` will never be broken.
- New optional fields can be added to `v1` without a version bump.
- Required field changes, removed fields, or breaking enum changes require a new version.
- New versions are tagged in this repo — adopters pin their action to a version.

---

## Building on the standard

Any team can build on the Agent Wallet Manifest without permission or coordination with the maintainers:

- **Registries** — index manifests, serve profiles, provide verification
- **Wallet providers** — generate manifests at wallet creation
- **Frameworks** — scaffold manifests during project setup
- **Analytics products** — consume declared wallets for financial intelligence
- **Security tools** — monitor declared wallets
- **Intelligence products** — reason about agent financial activity

See [`docs/registries.md`](docs/registries.md) for the registry implementation spec.

---

## Long-term support

`v1` of the schema and action is supported indefinitely.

If the current maintainers ever stop maintaining this repository:
1. Ownership transfers to an active community maintainer
2. A migration guide is published before any deprecation
3. `uses: danbuildss/agent-wallet-manifest@v1` remains resolvable for a minimum of 24 months after any transition

---

## Code of conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) v2.1.
