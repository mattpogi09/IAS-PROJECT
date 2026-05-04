#!/bin/bash
set -e

echo "=== Writing .env ==="
cat > /var/www/html/.env <<EOF
APP_NAME="Secure Login App"
APP_ENV=production
APP_DEBUG=false
APP_URL=${APP_URL:-http://localhost}
APP_KEY=${APP_KEY:-}

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_MAINTENANCE_DRIVER=file
BCRYPT_ROUNDS=12

LOG_CHANNEL=stderr
LOG_LEVEL=error

DB_CONNECTION=${DB_CONNECTION:-pgsql}
DB_HOST=${DB_HOST:-127.0.0.1}
DB_PORT=${DB_PORT:-5432}
DB_DATABASE=${DB_DATABASE:-laravel}
DB_USERNAME=${DB_USERNAME:-laravel}
DB_PASSWORD=${DB_PASSWORD:-}

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

echo "=== Generating APP_KEY (if not set) ==="
php artisan key:generate --force

echo "=== Running migrations ==="
php artisan migrate --force

echo "=== Caching config / routes / views ==="
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "=== Starting Apache ==="
exec apache2-foreground
