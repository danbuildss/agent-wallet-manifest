# Security Policy

The Agent Wallet Manifest is a **declaration standard**. It defines how autonomous agents declare their wallet identities in a machine-readable format. It does not custody assets, execute transactions, or authenticate wallet ownership by itself.

---

## Supported versions

| Version | Status |
|---------|--------|
| 1.0.x | Supported |

---

## Scope

This security policy covers:

- **Schema** (`schema/wallets.schema.json`) — structural vulnerabilities, validation bypasses
- **Validator** (`validator/validate.ts`, `dist/validate.js`) — code execution, dependency vulnerabilities, incorrect validation outcomes
- **GitHub Action** (`action.yml`) — injection vulnerabilities, unintended data exposure in CI
- **Documentation** — misleading security guidance that could cause adopters to misunderstand the trust model

---

## Out of scope

- Wallet addresses declared in manifests (accuracy is the builder's responsibility)
- Third-party registry implementations
- Zetta AI infrastructure (`zettaai.co`)
- On-chain activity of declared wallets
- Social engineering attacks against wallet owners

---

## Security principles

**The Manifest is a declaration, not a proof.**
A `.agent/wallets.json` file states that a wallet belongs to an agent. It does not cryptographically prove it. Registries and implementations may apply additional verification layers on top of the standard declaration.

**The Manifest does not custody assets.**
No funds pass through or are controlled by the manifest format, schema, validator, or GitHub Action.

**The Manifest does not execute transactions.**
The standard produces no on-chain activity.

**Builders are responsible for accuracy.**
Declaring a wallet you do not own is misrepresentation. The standard provides no technical enforcement — trust is established through the public, auditable nature of the declaration and any verification layer applied by a registry.

**Registries may apply additional verification.**
Registries consuming the standard are responsible for their own verification models and trust tiers.

---

## Reporting a vulnerability

If you discover a security vulnerability in the schema, validator, or GitHub Action, please report it privately before public disclosure.

**Contact:** security@zettaai.co

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fix (optional)

We will acknowledge receipt within 3 business days and aim to resolve confirmed vulnerabilities within 14 days.

---

## Responsible disclosure

We ask that you:
1. Report privately before public disclosure
2. Allow reasonable time for a fix before publishing details
3. Avoid accessing, modifying, or exposing data belonging to others during research

We commit to:
1. Acknowledging your report promptly
2. Keeping you informed of our progress
3. Crediting researchers who responsibly disclose issues (unless you prefer to remain anonymous)

---

## Dependency vulnerabilities

The validator depends on `ajv` and `ajv-formats`. If you discover a vulnerability in these dependencies that affects this project's use case, please report it following the process above.
