

# 🚀 appgun — Fullstack Seed Project Launcher

Welcome to **appgun**, a minimal but powerful tool to bootstrap fullstack apps using:

- **🎨 Next.js** + Tailwind + shadcn/ui for frontend  
- **⚙️ FastAPI** for backend  
- **🌱 Sandbox templates** to pre-populate reusable components or APIs

## 🧱 What It Does

`appgun` is a launcher that sets up a working fullstack project in seconds. It:

- Creates a folder like `~/repos/my-app`
- Scaffolds a Next.js frontend with Tailwind and shadcn/ui
- Creates a FastAPI backend with modular structure
- Injects template files from your local `sandbox/`
- Prepares the app for development immediately

---

## 📦 Project Structure

```bash
matias-dev-template/
├── setup.sh               # Core setup logic
├── bin/
│   ├── seed.sh            # Shortcut: ./bin/seed.sh my-app
│   └── dev.sh             # Optional launcher for both dev servers
├── sandbox/               # Template files
│   ├── back/              # FastAPI modules/snippets
│   └── frontend/          # React components, pages, styles
└── README.md
```

---

## 🚀 Usage

### 1. Create a new app

```bash
./bin/seed.sh ask-docs
```

This will:
- Create `~/repos/ask-docs`
- Run the full setup (via `setup.sh`)
- Install frontend/backend deps
- Inject your template files

### 2. Run dev servers

From the project folder:

**Frontend (Next.js):**
```bash
cd ~/repos/ask-docs/frontend
npm run dev
```

**Backend (FastAPI):**
```bash
cd ~/repos/ask-docs/back
uvicorn app.main:app --reload
```

---

## 🧪 What's in the Sandbox?

These are the base files copied into each new project:

### Frontend
- UI components (e.g., `Button.tsx`, `ChatBox.tsx`)
- Base layout (`layout.tsx`)
- `globals.css` with Tailwind tokens
- Optional `package.json` to override Next defaults

### Backend
- `main.py` and router
- `file_scan.py`, reusable utils, core modules
- FastAPI starter structure: `routes/`, `core/`, `config/`, `services/`

You can modify the contents of `sandbox/` to evolve your default template!

---

## 🧠 Why Use This?

- Avoid repetitive boilerplate
- Standardize team setup
- Iterate fast
- Improve your starter every time you launch a project
- Self-dogfooding = better developer experience

---

## 🛠️ Customization Ideas

- Add test templates (`pytest`, Playwright)
- Add GitHub Actions for CI
- Add Dockerfile + devcontainer
- Add `.gitignore`, `.editorconfig`, `.prettierrc`

---

## 📍License

MIT — built by [Matías Iglesias](https://github.com/matuteiglesias)

---
