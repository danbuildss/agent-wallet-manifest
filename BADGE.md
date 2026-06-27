# Agent Wallet Manifest Badge

Display that your agent has declared its wallet identity.

---

## Standard badge (no registry required)

This badge signals that your agent has a valid Agent Wallet Manifest. It does not depend on any registry.

```markdown
[![Agent Wallet Manifest](https://img.shields.io/badge/agent--wallet--manifest-declared-blue)](https://github.com/danbuildss/agent-wallet-manifest)
```

The GitHub Action prints this badge automatically after every successful validation run.

---

## Zetta AI registry badge (optional)

If you've submitted your manifest to the [Zetta AI registry](https://www.zettaai.co), you get a live badge that updates as your verification status changes:

```markdown
[![Agent Wallet Manifest](https://www.zettaai.co/api/badge/YOUR-AGENT-SLUG.svg)](https://www.zettaai.co/registry/YOUR-AGENT-SLUG)
```

Replace `YOUR-AGENT-SLUG` with your slug (e.g. `aeon-protocol-aeon`, `danbuildss-luca`).

### Zetta badge states

| Status | Color | Meaning |
|--------|-------|---------|
| `verified` | Green | On-chain or cryptographic proof confirmed |
| `claimed` | Green | Team has authenticated ownership |
| `wallets-declared` | Blue | Manifest submitted, pending review |
| `candidate` | Grey | Indexed from public data |
| `unknown` | Grey | Not yet indexed |

---

## Other registry badges

If you've submitted to another registry that supports the standard, follow that registry's badge instructions. Any compliant registry can provide its own badge.

---

## How the action prints your badge

After every successful validation run, the GitHub Action prints your badge markdown to the job summary. Find it in the Actions tab under your workflow run summary.

To submit to the Zetta AI registry and get the live badge:

```yaml
- uses: danbuildss/agent-wallet-manifest@v1
  with:
    zetta-api-key: ${{ secrets.ZETTA_API_KEY }}
    registry-submit: 'true'
```
