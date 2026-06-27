# Contributing to the Agent Wallet Manifest

The Agent Wallet Manifest is an open standard. Contributions from the community make it better.

---

## What you can contribute

### Framework documentation
Step-by-step adoption guides for frameworks and tools. See the existing guides in `docs/` for the format. Submit a PR adding `docs/[framework].md`.

### Examples
Real-world manifests showing how different agent types structure their wallet declarations. Submit a PR adding `examples/[agent].wallets.json`.

### Bug fixes in the validator
The validator lives in `validator/`. If you find a case where valid JSON fails validation or invalid JSON passes, open an issue with a reproduction.

### README and documentation improvements
Clarity improvements, typo fixes, better explanations — always welcome. Submit a PR.

### Schema changes
Schema changes require a proposal. See the proposal process below.

---

## Proposal process

For any change that modifies the schema (new fields, new role values, new chains, new verification methods):

1. **Open a GitHub Issue** with the label `proposal`
2. **Describe:**
   - What you want to add or change
   - Why it matters
   - Which agents, frameworks, or use cases need it
   - Whether it is backwards compatible
3. **Wait for community feedback** — proposals stay open for at least 7 days
4. **If accepted**, open a PR implementing the change
5. **Schema PRs require maintainer review** before merge

**What gets accepted:**
- Changes that make agents more financially readable, trustworthy, or auditable
- Changes requested by multiple independent adopters
- Changes that do not break existing valid manifests

**What does not get accepted:**
- Token price or market cap fields
- Governance token financial attribution
- Anything that frames financial identity around speculation

---

## Issue labels

| Label | Use for |
|-------|---------|
| `proposal` | Schema change proposals |
| `bug` | Validator bugs or schema errors |
| `framework` | Framework integration questions |
| `registry` | Registry implementation questions |
| `wallet-provider` | Wallet provider integration questions |
| `docs` | Documentation improvements |
| `question` | General questions |

---

## Pull request process

1. Fork the repo and create a branch
2. Make your changes
3. Ensure any example manifests are valid against the schema
4. Submit a PR with a clear description of what you changed and why
5. A maintainer will review within 7 days

---

## Adding your framework or registry

**Framework guide:** Add `docs/[framework].md` following the structure of existing guides. Open a PR. Once merged, you'll be listed in `docs/frameworks.md`.

**Registry:** Implement the standard and open a PR updating the known implementations table in `docs/registries.md`.

**Wallet provider:** Integrate manifest generation and open a PR updating `docs/wallet-providers.md`.

---

## Code of conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) v2.1.
