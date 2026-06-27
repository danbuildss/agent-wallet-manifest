# Governance

The Agent Wallet Manifest is an open standard.

Zetta AI maintains this repository and consumes the standard — but does not own agent financial identity. The standard belongs to the ecosystem of agents, developers, frameworks, registries, and tools that adopt it.

**Anyone can build on this standard.** Registries, indexers, explorers, analytics products, wallet providers, treasury tools, security products, audit systems — any implementation that reads `.agent/wallets.json` and respects the schema is a valid consumer of the standard. No permission required.

---

## Maintainers

Current maintainers:

- [Zetta AI](https://www.zettaai.co) — `@zettaaidotco`

Maintainers are responsible for:
- Reviewing and merging proposals
- Managing schema versions
- Ensuring backwards compatibility
- Long-term support of `v1`

We welcome additional maintainers from the community. If your project is a significant adopter and you want a seat at the table, open an issue.

---

## Schema Versioning

The manifest follows semantic versioning at the schema level.

| Version | Status | Schema URL |
|---------|--------|------------|
| v1 | Active | `https://schema.zettaai.co/wallets.v1.json` |

**Rules:**
- `v1` is long-term supported. Adopters on `v1` will never be broken.
- New optional fields may be added to `v1` without a version bump.
- Required field additions, removed fields, or enum changes require a new version (`v2`).
- New versions are tagged in this repo (`v2`, `v3`, etc.) — adopters pin their action to a version.

---

## Proposing Changes

Anyone can propose a change to the standard.

**Process:**
1. Open an issue with the label `proposal`
2. Describe: what you want to add, why it matters, which agents or frameworks need it
3. Maintainers review within 7 days
4. If accepted, open a PR against `main`
5. Changes to the schema require at least one maintainer approval and a 7-day comment period

**What gets accepted:**
- Changes that make agents more financially readable, trustworthy, or auditable
- Changes requested by multiple independent adopters
- Changes that do not break existing valid manifests

**What does not get accepted:**
- Token price or market cap fields
- Governance token attribution
- Anything that frames financial identity around speculation

---

## Long-Term Support

`v1` of the schema and action will be supported indefinitely.

If Zetta AI ever stops maintaining this repository, we commit to:
1. Transferring ownership to an active community maintainer
2. Publishing a migration guide before any deprecation
3. Keeping `v1` resolvable via `uses: danbuildss/agent-wallet-manifest@v1` for a minimum of 24 months after any transition

---

## Contributing

Pull requests are welcome for:
- New framework documentation (`docs/`)
- New examples (`examples/`)
- Bug fixes in the validator
- README improvements

For schema changes, open an issue first.

---

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) v2.1.
