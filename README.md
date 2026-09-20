# Eric — local portfolio

Personal site for **Eric**, 14, artist and watch collector.

- **Backend:** Python (FastAPI) on `http://127.0.0.1:8000`
- **Frontend:** React with **Next.js** on `http://localhost:3000`

Nest.js is a Node backend framework. This project uses **Next.js** (React) for the frontend and **Python** for the backend, which is the usual split.

## What you need once

1. **Python 3** — already on this Mac.
2. **Node.js LTS** — https://nodejs.org/ (needed for the React site).

If Node is installed under `~/.local/node`, the start scripts add that folder to `PATH` automatically.

## Run the site (every time)

### On this Mac (zsh / Terminal)

```bash
cd /Users/eric/Desktop/ericwebsite
chmod +x start-local.sh
./start-local.sh
```

The script installs packages if needed, starts Python + React, then **opens `http://localhost:3000` in your browser**.

Leave the Terminal window open. Press **Ctrl+C** to stop.

### On Windows (PowerShell)

```powershell
cd path\to\ericwebsite
Set-ExecutionPolicy -Scope Process Bypass
.\start-local.ps1
```

Or Explorer: right-click `start-local.ps1` → **Run with PowerShell**.

It also waits until the site is ready and **opens the localhost URL** in your default browser.

### PowerShell on macOS (optional)

If you install PowerShell 7 (`pwsh`):

```bash
pwsh ./start-local.ps1
```

## Pages

| URL | What it is |
| --- | --- |
| http://localhost:3000 | About Eric |
| http://localhost:3000/art | Artwork |
| http://localhost:3000/watches | Watch collection |
| http://127.0.0.1:8000/api/profile | Python API (JSON) |

To change bio, art, or watches, edit `backend/app.py` and refresh the browser (the API reloads on save).
