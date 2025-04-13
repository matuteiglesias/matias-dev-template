#!/bin/bash
set -e

PROJECT_NAME="$1"
if [ -z "$PROJECT_NAME" ]; then
  echo "❌ Please provide a project name"
  echo "Usage: ./setup.sh my-app"
  exit 1
fi

REPO_DIR="$HOME/repos/$PROJECT_NAME"
FRONTEND_DIR="$REPO_DIR/frontend"
BACKEND_DIR="$REPO_DIR/back"


echo "📦 Creating base project at $REPO_DIR"
rm -rf "$REPO_DIR"
mkdir -p "$REPO_DIR"
cd "$REPO_DIR"

########################
# Frontend Setup (Next)
########################
echo "🎨 Setting up Next.js frontend..."

rm -rf "$REPO_DIR/frontend/.next"  # Ensure no leftovers
rm -rf "$REPO_DIR/frontend"        # Clean old frontend

npx create-next-app@latest frontend --ts --app --eslint --tailwind --src-dir --import-alias="@/*" --no-git

cd "$FRONTEND_DIR"

# 🔧 Ensure Tailwind core stack is installed
npm install -D tailwindcss postcss autoprefixer

# ✨ Optional Tailwind plugins
npm install -D @tailwindcss/forms tailwind-variants

# 🧠 Initialize shadcn/ui (optional but powerful)
npx shadcn@latest init || echo "ShadCN init skipped or failed"

cd "$REPO_DIR"

########################
# Backend Setup (FastAPI)
########################
echo "🚀 Setting up FastAPI backend..."

mkdir -p $BACKEND_DIR/app/api
mkdir -p $BACKEND_DIR/app/routes
mkdir -p $BACKEND_DIR/app/core
mkdir -p $BACKEND_DIR/app/config
mkdir -p $BACKEND_DIR/app/registry
mkdir -p $BACKEND_DIR/app/services
mkdir -p $BACKEND_DIR/app/data
mkdir -p $BACKEND_DIR/tests

# Placeholder files (to be filled later)
touch $BACKEND_DIR/app/main.py
touch $BACKEND_DIR/app/api/router.py
touch $BACKEND_DIR/app/routes/file_scan.py
touch $BACKEND_DIR/app/config/settings.py
touch $BACKEND_DIR/tests/test_scan.py

########################
# Root-Level Utilities
########################
echo "🧾 Generating README and env..."
 
cat > $REPO_DIR/.env <<EOF
# Environment variables go here
EOF

cat > $REPO_DIR/requirements.txt <<EOF
fastapi
uvicorn
EOF


cd ~/repos


# ========= 🔁 Backend files =========
cp sandbox/back/app/main.py "$BACKEND_DIR"/app/
cp sandbox/back/app/api/router.py "$BACKEND_DIR"/app/api/
cp sandbox/back/app/routes/file_scan.py "$BACKEND_DIR"/app/routes/

mkdir -p "$BACKEND_DIR"/app/core/ai_blocks
cp sandbox/back/app/core/ai_blocks/*.py "$BACKEND_DIR"/app/core/ai_blocks/

mkdir -p "$BACKEND_DIR"/app/core/files
cp sandbox/back/app/core/files/*.py "$BACKEND_DIR"/app/core/files/

mkdir -p "$BACKEND_DIR"/app/core/utils
cp sandbox/back/app/core/utils/*.py "$BACKEND_DIR"/app/core/utils/

# (Optional future add-ons)
# mkdir -p "$BACKEND_DIR/app/config"
# cp sandbox/back/app/config/*.py "$BACKEND_DIR/app/config/"

# ========= 🎨 Frontend files =========
mkdir -p "$FRONTEND_DIR"/src/app
cp sandbox/frontend/src/app/*.tsx "$FRONTEND_DIR"/src/app/
cp sandbox/frontend/src/app/globals.css "$FRONTEND_DIR"/src/app/

mkdir -p "$FRONTEND_DIR"/src/components/ui
cp sandbox/frontend/src/components/ui/* "$FRONTEND_DIR"/src/components/ui/

# Overwrite only if custom one exists
if [ -f sandbox/frontend/package.json ]; then
  cp sandbox/frontend/package.json "$FRONTEND_DIR"/package.json
  (cd "$FRONTEND_DIR" && npm install)
fi

echo "✅ Setup complete!"
echo "👉 Now add your custom files or let me know to copy your own versions into:"
echo "🚀 Project $PROJECT_NAME created at $REPO_DIR"
echo "👉 cd ~/repos/$PROJECT_NAME/frontend && npm run dev"
echo "👉 cd ~/repos/$PROJECT_NAME/back && uvicorn app.main:app --reload"
