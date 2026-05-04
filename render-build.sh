#!/usr/bin/env bash
set -e

echo "=== [1/7] Installing PHP dependencies ==="
composer install --no-dev --optimize-autoloader --no-interaction

echo "=== [2/7] Installing Node dependencies ==="
npm ci

echo "=== [3/7] Building frontend assets ==="
npm run build

echo "=== [4/7] Preparing SQLite database on persistent disk ==="
mkdir -p /var/data
touch /var/data/database.sqlite

echo "=== [5/7] Writing production .env ==="
cat > .env <<EOF
APP_NAME="Secure Login App"
APP_ENV=production
APP_DEBUG=false
APP_URL=${RENDER_EXTERNAL_URL:-http://localhost}
APP_KEY=${APP_KEY:-}

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US
APP_MAINTENANCE_DRIVER=file

BCRYPT_ROUNDS=12

LOG_CHANNEL=stderr
LOG_LEVEL=error

DB_CONNECTION=sqlite
DB_DATABASE=/var/data/database.sqlite

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
CACHE_STORE=file

MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="Secure Login App"

VITE_APP_NAME="Secure Login App"
EOF

echo "=== [6/7] Generating APP_KEY & running migrations ==="
php artisan key:generate --force
php artisan migrate --force

echo "=== [7/7] Caching config/routes/views ==="
php artisan config:cache
php artisan route:cache
php artisan view:cache
chmod -R 775 storage bootstrap/cache

echo "=== Build complete! ==="
