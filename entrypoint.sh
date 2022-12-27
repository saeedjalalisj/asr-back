#!/bin/sh

echo "Waiting for mongodb to start..."

while ! nc -z tts_mongodb 27017; do
  sleep 0.1
done

echo "Mongodb started"

npm run start