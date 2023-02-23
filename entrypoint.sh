#!/bin/sh

echo "Waiting for Postgres to start..."

while ! nc -z asr_postgres 5432; do
  sleep 0.1
done

echo "Postgres started"

npm run start