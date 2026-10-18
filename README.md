# Eric Xu — local portfolio

Personal site for **Eric Xu**: student at BFIS Barcelona, debate & MUN, vintage watches, entrepreneurship, and studio art.

- **Backend:** Python (FastAPI) on `http://127.0.0.1:8000`
- **Frontend:** Next.js (React) on `http://localhost:3000`

## What you need once

1. **Python 3**
2. **Node.js LTS** — https://nodejs.org/

## Run the site (every time)

### Windows (PowerShell)

```powershell
cd path\to\ericwebsite
Set-ExecutionPolicy -Scope Process Bypass
.\start-local.ps1
```

Or right-click `start-local.ps1` → **Run with PowerShell**.

### macOS / Linux

```bash
cd path/to/ericwebsite
chmod +x start-local.sh
./start-local.sh
```

The script installs packages if needed, starts Python + React, then opens `http://localhost:3000`.

Leave the terminal open. Press **Ctrl+C** to stop.

## Pages

| URL | What it is |
| --- | --- |
| http://localhost:3000 | Home / about |
| http://localhost:3000/gallery | Artwork gallery |
| http://localhost:3000/gallery/[id] | Single artwork |
| http://localhost:3000/watches | Watch collection |
| http://127.0.0.1:8000/api/profile | Profile API (JSON) |

The portfolio uses the built-in Next.js content by default. To change the live site's bio, art, or
watches, edit `frontend/lib/content.ts`. The optional Python API is available for local API testing;
when `NEXT_PUBLIC_API_URL` is set, its data can override the built-in content.

For deployment, set `NEXT_PUBLIC_SITE_URL` to the public site origin (for example,
`https://your-domain.com`) in the frontend environment. This is used for canonical metadata and the
sitemap; on Vercel, the configured production project URL is used as a fallback.
