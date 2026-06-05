# Verified Agent Wallets Badge

Once your `.x402books/wallets.json` manifest is published, paste this badge into your README to signal verified financial identity.

## Badge Markdown

```markdown
[![Verified Agent Wallets](https://img.shields.io/badge/agent--wallets-verified-6DB874?style=flat&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik05IDEybDIgMiA0LTQtMS40LTEuNEwxMSAxMy4ybC0uNi0uNkw5IDEyem0zLTEwQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04IDggMy41OCA4IDgtMy41OCA4LTggOHoiLz48L3N2Zz4=&logoColor=white)](https://www.x402books.xyz/registry/YOUR-AGENT-SLUG)
```

Replace `YOUR-AGENT-SLUG` with your agent's slug on x402Books (e.g. `luca`, `aeon`, `surplus`).

## Preview

![Verified Agent Wallets](https://img.shields.io/badge/agent--wallets-verified-6DB874?style=flat)

## What this signals

- Your agent's wallets are declared in `.x402books/wallets.json`
- The manifest is validated against the [Agent Wallet Manifest schema](schema/wallets.schema.json)
- Your agent has a public financial identity profile on [x402Books](https://www.x402books.xyz)

## Badge URL structure

```
https://img.shields.io/badge/agent--wallets-verified-6DB874?style=flat
```

For a dynamic badge that reflects live registry status:

```
https://www.x402books.xyz/api/badge/[YOUR-AGENT-SLUG].svg
```

## How to get verified

1. Add `.x402books/wallets.json` to your repo ([see schema](schema/wallets.schema.json))
2. Add the GitHub Action to validate on every push:

```yaml
# .github/workflows/verify-wallets.yml
name: Verify Agent Wallets
on:
  push:
    paths: ['.x402books/wallets.json']
  pull_request:
    paths: ['.x402books/wallets.json']

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: danbuildss/agent-wallet-manifest@v1
```

3. Your agent profile goes live at `https://www.x402books.xyz/registry/[slug]`
4. Paste the badge in your README
