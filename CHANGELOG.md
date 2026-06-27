# Changelog

All notable changes to the Agent Wallet Manifest standard are documented here.

This project follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2026-06-27

Initial stable release of the Agent Wallet Manifest open standard.

### Schema
- JSON Schema draft-07 at `schema/wallets.schema.json`
- Required fields: `agent`, `project`, `ecosystem`, `wallets`
- Each wallet requires: `address`, `chain`, `role`, `verification_method`
- 14 supported chains: `base`, `ethereum`, `arbitrum`, `optimism`, `polygon`, `solana`, `avalanche`, `bnb`, `zora`, `blast`, `linea`, `scroll`, `mode`, `other`
- 10 wallet roles: `treasury`, `revenue`, `expense`, `payment_receiver`, `fee_receiver`, `operator`, `deployer`, `token_contract`, `token_bound_account`, `unknown`
- 5 verification methods: `repo_manifest`, `on_chain_signature`, `dns_record`, `social_post`, `multisig_ownership`
- Optional fields: `website`, `x_handle`, `x` (legacy), `github`, `contact`, `did`, `label`, `notes`, `evidence_url`, `last_updated`, `active`
- Legacy aliases: `fee_recipient` (use `fee_receiver`), `x` (use `x_handle`)

### Validator
- TypeScript validator at `validator/validate.ts`
- Compiled output at `dist/validate.js`
- Powered by Ajv (JSON Schema draft-07 + formats)
- CLI: `node dist/validate.js .agent/wallets.json`

### GitHub Action
- Reusable composite action at `action.yml`
- Validates manifest against schema by default
- Optional registry submission via `zetta-api-key` + `registry-submit: 'true'`
- Legacy path auto-detection: falls back to `.x402books/wallets.json` if `.agent/wallets.json` not found
- Prints badge markdown to CI job summary on every successful run
- Usage: `uses: danbuildss/agent-wallet-manifest@v1`

### Documentation
- `README.md` — quick start, architecture, schema reference
- `GOVERNANCE.md` — maintainers, versioning, proposal process
- `CONTRIBUTING.md` — how to contribute, proposal process, issue labels
- `SECURITY.md` — security policy for the standard
- `BADGE.md` — standard badge and Zetta AI registry badge
- `docs/registries.md` — how to build a registry on the standard
- `docs/wallet-providers.md` — wallet provider integration guide
- `docs/frameworks.md` — framework integration guide
- `docs/agentkit.md`, `docs/aeon.md`, `docs/goat.md`, `docs/virtuals.md`, `docs/bankr.md` — framework-specific guides

### Examples
- `examples/minimal.wallets.json` — minimal valid manifest
- `examples/aeon.wallets.json` — AEON Protocol (real addresses)
- `examples/luca.wallets.json` — Luca, Zetta AI
- `examples/surplus.wallets.json` — Surplus
- `examples/nipmod.wallets.json` — Nipmod
