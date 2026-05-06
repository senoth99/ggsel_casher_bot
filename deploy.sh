#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Error: pnpm is not installed. Install pnpm first."
  exit 1
fi

DOMAIN="${DOMAIN:-ggsel.cashercollection.com}"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-3000}"
SETUP_NGINX="${SETUP_NGINX:-1}"
ENABLE_SSL="${ENABLE_SSL:-0}"

if [[ "$SETUP_NGINX" == "1" ]] && command -v nginx >/dev/null 2>&1; then
  if [[ $EUID -ne 0 ]]; then
    echo "Warning: not root, skipping nginx setup. Run as root to auto-configure domain."
  else
    NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
    echo "Configuring nginx for ${DOMAIN}..."
    cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://${HOST}:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

    ln -sfn "$NGINX_CONF" "/etc/nginx/sites-enabled/${DOMAIN}"
    nginx -t
    systemctl reload nginx

    if [[ "$ENABLE_SSL" == "1" ]] && command -v certbot >/dev/null 2>&1; then
      certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@${DOMAIN#*.}" --redirect || true
    fi
  fi
fi

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Building production bundle..."
pnpm build

echo "Starting production Next.js on ${HOST}:${PORT}..."
echo "Domain target: ${DOMAIN}"
exec pnpm exec next start --hostname "$HOST" --port "$PORT"
