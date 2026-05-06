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
SERVICE_NAME="${SERVICE_NAME:-ggsel.service}"
PNPM_BIN="$(command -v pnpm)"

if [[ $EUID -ne 0 ]]; then
  echo "Error: run deploy.sh as root (needed for systemd/nginx setup)."
  exit 1
fi

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Building production bundle..."
pnpm build

echo "Configuring systemd service ${SERVICE_NAME}..."
cat > "/etc/systemd/system/${SERVICE_NAME}" <<EOF
[Unit]
Description=GGSEL CASHER Next.js
After=network.target

[Service]
Type=simple
WorkingDirectory=${ROOT_DIR}
Environment=NODE_ENV=production
ExecStart=${PNPM_BIN} exec next start --hostname ${HOST} --port ${PORT}
Restart=always
RestartSec=3
User=root

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now "${SERVICE_NAME}"
systemctl restart "${SERVICE_NAME}"

if [[ "$SETUP_NGINX" == "1" ]] && command -v nginx >/dev/null 2>&1; then
  NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
  echo "Configuring nginx for ${DOMAIN}..."
  mkdir -p /var/www/certbot/.well-known/acme-challenge
  cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
        default_type "text/plain";
        try_files \$uri =404;
    }

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
  rm -f /etc/nginx/sites-enabled/default
  nginx -t
  systemctl reload nginx

  if [[ "$ENABLE_SSL" == "1" ]] && command -v certbot >/dev/null 2>&1; then
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@${DOMAIN#*.}" --redirect || true
  fi
fi

echo "Verifying service and endpoint..."
systemctl status "${SERVICE_NAME}" --no-pager -l
curl -I --max-time 8 "http://${HOST}:${PORT}" || true
curl -I --max-time 8 "http://${DOMAIN}" || true

echo "Deploy complete."
