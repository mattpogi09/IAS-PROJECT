# Secure Login App

Simple Laravel + React (Inertia) project for the IAS secure login requirements.

## Features

- Login with username or email
- Password hashing with bcrypt (Laravel defaults)
- Server-side validation and safe login error messaging
- WebGoat lesson link (SQL Injection) on the dashboard

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
```

## Run

```bash
php artisan serve
npm run dev
```

Open `http://127.0.0.1:8000`.

## Smoke Test

1. Register a user with name, username, email, and password.
2. Log out and log in again using the username or email.
3. Confirm the dashboard shows the WebGoat lesson section and security notes.

## WebGoat Lesson Link

The dashboard links to `http://localhost:8080/WebGoat/lessons/sqlinjection`.
If your WebGoat URL differs, update the link in the dashboard UI.
