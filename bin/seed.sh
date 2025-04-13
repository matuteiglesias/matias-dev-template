#!/bin/bash

set -e

APP_NAME=$1
if [ -z "$APP_NAME" ]; then
  echo "❌ Please provide a project name"
  echo "Usage: ./bin/seed.sh my-app"
  exit 1
fi

echo "🧱 Seeding new fullstack app: $APP_NAME"

mkdir -p ~/repos/$APP_NAME
cd ~/repos/$APP_NAME

# Call your existing setup script
bash ./setup.sh "$APP_NAME"

