#!/usr/bin/env bash
# Configure GitHub Actions secrets for Cloudflare Workers deploys.
# Prefer a dedicated API token (does not expire like OAuth). Create one at:
# https://dash.cloudflare.com/profile/api-tokens → Create Token → Edit Cloudflare Workers
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/rome-places"

if ! command -v gh >/dev/null; then
  echo "Install GitHub CLI: https://cli.github.com/" >&2
  exit 1
fi

ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-}"
API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"

if [[ -z "$ACCOUNT_ID" ]]; then
  ACCOUNT_ID="$(npx wrangler whoami 2>/dev/null | awk '/Account ID/ { getline; gsub(/[│ ]/, ""); print; exit }')"
fi

if [[ -z "$API_TOKEN" ]]; then
  echo "Paste a Cloudflare API token (Edit Cloudflare Workers), then press Enter:"
  read -r -s API_TOKEN
  echo
fi

if [[ -z "$API_TOKEN" || -z "$ACCOUNT_ID" ]]; then
  echo "Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID." >&2
  exit 1
fi

gh secret set CLOUDFLARE_API_TOKEN --body "$API_TOKEN"
gh secret set CLOUDFLARE_ACCOUNT_ID --body "$ACCOUNT_ID"
echo "GitHub secrets updated for $(gh repo view --json nameWithOwner -q .nameWithOwner)."
