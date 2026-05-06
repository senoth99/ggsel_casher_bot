#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Error: pnpm is not installed. Install pnpm first."
  exit 1
fi

HOST="${HOST:-0.0.0.0}"
PORT="${PORT:-3000}"

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Building production bundle..."
pnpm build

echo "Starting Next.js on ${HOST}:${PORT}..."
exec pnpm start -- --hostname "$HOST" --port "$PORT"
