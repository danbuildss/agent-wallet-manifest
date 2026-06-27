# Building a Registry on the Agent Wallet Manifest

Anyone can build a registry that indexes Agent Wallet Manifests. This document explains what a compliant registry implementation looks like.

---

## What a registry does

A registry:
1. Discovers `.agent/wallets.json` files in public repositories
2. Validates them against the schema
3. Serves a public profile for each agent
4. Optionally provides verification, badges, and submission APIs

There is no single canonical registry. Multiple registries can coexist, each serving different ecosystems, use cases, or trust models.

---

## Minimum viable registry

A compliant registry must:

- Index `.agent/wallets.json` (and optionally `.x402books/wallets.json` for legacy support)
- Validate manifests against [`schema/wallets.schema.json`](../schema/wallets.schema.json)
- Serve a public profile URL per indexed agent
- Never modify or misrepresent the declared manifest data

Everything else — verification tiers, badges, analytics, APIs — is optional and implementation-specific.

---

## Discovery methods

Registries can discover manifests through:

**GitHub search**
```
filename:wallets.json path:.agent
```

**Webhook / push submission** — agents submit their repo URL after adding a manifest

**Framework integrations** — frameworks notify a registry when a manifest is created

**Manual submission** — a form or API endpoint where agents register themselves

---

## Profile URL convention

The recommended profile URL format:
```
https://[your-registry]/registry/[owner]-[repo]
```

Example: `https://www.zettaai.co/registry/aeon-protocol-aeon`

This convention means profile URLs are predictable and linkable from the GitHub Action output.

---

## Submission API

If your registry accepts push submissions, the recommended endpoint shape:

```
POST /api/registry/submit
Content-Type: application/json

{
  "repo": "owner/repo",
  "manifest_path": ".agent/wallets.json"
}
```

This matches the shape used by the GitHub Action's optional submission step, making it easy for adopters to submit to any compatible registry.

---

## Verification tiers

Verification is implementation-specific. Registries can define their own trust models. Common patterns:

| Tier | Description |
|------|-------------|
| Declared | Manifest exists and is schema-valid |
| Claimed | Team has authenticated ownership (e.g. API key, OAuth) |
| Verified | On-chain or cryptographic proof confirmed |

Do not misrepresent another registry's verification status.

---

## Badge integration

If your registry provides badges, the recommended URL format:
```
https://[your-registry]/api/badge/[owner]-[repo].svg
```

This allows the GitHub Action's badge output to be adapted for any registry.

---

## Known implementations

| Registry | URL | Notes |
|----------|-----|-------|
| Zetta AI | [zettaai.co](https://www.zettaai.co) | Reference implementation. Indexing, verification, financial identity profiles. |

To add your registry to this list, open a PR updating this table.

---

## Questions

Open a GitHub Issue tagged `registry` if you are building an implementation and have questions about the standard.
