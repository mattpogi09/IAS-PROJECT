#!/bin/bash
set -e

# ── 1. Ensure required storage directories exist ──────────────────────────────
echo "=== Creating storage directories ==="
mkdir -p /var/www/html/storage/framework/views \
         /var/www/html/storage/framework/cache \
         /var/www/html/storage/framework/sessions \
         /var/www/html/storage/logs \
         /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# ── 2. Configure Apache to listen on $PORT ────────────────────────────────────
PORT="${PORT:-10000}"
echo "=== Configuring Apache to listen on port $PORT ==="
sed -i "s/Listen 80/Listen $PORT/" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:80>/<VirtualHost *:$PORT>/" /etc/apache2/sites-available/000-default.conf

# ── 3. Write .env — all values read from Render env vars ─────────────────────
echo "=== Writing .env ==="
cat > /var/www/html/.env <<EOF
APP_NAME="${APP_NAME:-Secure Login App}"
APP_ENV=${APP_ENV:-production}
APP_DEBUG=${APP_DEBUG:-false}
APP_URL=${APP_URL:-http://localhost}
APP_KEY=${APP_KEY:-}

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_MAINTENANCE_DRIVER=file
BCRYPT_ROUNDS=12

LOG_CHANNEL=stderr
LOG_LEVEL=${LOG_LEVEL:-error}

TRUSTED_PROXIES=*
TRUSTED_HOSTS=.*

DB_CONNECTION=${DB_CONNECTION:-pgsql}
DB_HOST=${DB_HOST:-127.0.0.1}
DB_PORT=${DB_PORT:-5432}
DB_DATABASE=${DB_DATABASE:-laravel}
DB_USERNAME=${DB_USERNAME:-laravel}
DB_PASSWORD=${DB_PASSWORD:-}

SESSION_DRIVER=${SESSION_DRIVER:-file}
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=${QUEUE_CONNECTION:-sync}
CACHE_STORE=${CACHE_STORE:-file}

MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="Secure Login App"

VITE_APP_NAME="Secure Login App"
EOF

# ── 4. Generate key, migrate, cache ───────────────────────────────────────────
cd /var/www/html

echo "=== Generating APP_KEY (only if not already set) ==="
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
else
    echo "APP_KEY already set — skipping generation"
fi

echo "=== Running migrations ==="
php artisan migrate --force

echo "=== Caching config / routes / views ==="
php artisan config:cache
php artisan route:cache
php artisan view:cache

# ── 5. Start Apache ───────────────────────────────────────────────────────────
echo "=== Starting Apache on port $PORT ==="
exec apache2-foreground
