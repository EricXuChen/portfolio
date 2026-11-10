# EXU. — The Personal Archive

Personal website of Eric Xu: **About · Watches · Experiences · Artwork**, in English and Chinese.

- Framework: **Next.js** (React + TypeScript), in the `frontend` folder
- Hosting: **Vercel**
- No database or Python server needed any more — all content lives in `frontend/content/`

> The old `backend/` (Python) and `frontend/lib/` folders are from the first version and are no longer used. They can be deleted.

## Updating the content

Everything you see on the site is in four files. Open them in VS Code or Cursor, edit the text, save.

| File | What it holds |
| --- | --- |
| `frontend/content/site.ts` | Home page, About page, navigation, "last updated" date |
| `frontend/content/watches.ts` | Watchmakers (M-001…), collection & wishlist (W-001…), complications, watch business |
| `frontend/content/experiences.ts` | Timeline (E-001…) and experience chapters (E-101…) |
| `frontend/content/artwork.ts` | Artist statement and artworks (A-001…) |

Rules that keep the archive tidy:

1. Every text has an English and a Chinese version: `{ en: "…", zh: "…" }`.
2. Every entry has an archive number (`id`), a date (`updated: "YYYY-MM-DD"`) and `visibility`.
3. To hide an entry without deleting it, set `visibility: "draft"`. Only `"public"` entries are shown.
4. When you change something, update its `updated` date — and `lastUpdated` in `site.ts`.
5. The numbers in the footer (watchmakers, watch entries, experiences, artworks) are counted automatically.

### Adding an artwork photo

1. Put the photo in `frontend/public/artworks/` (for example `night-and-time.jpg`).
2. In `artwork.ts`, add an `image` to the entry:
   ```ts
   image: { src: "/artworks/night-and-time.jpg", width: 1280, height: 1600, alt: "The Night and Time" },
   ```

### Privacy checklist (public site)

Do not publish: school name or location, grade, age, home city/address, daily routine, contact details, client details, supplier locations, prices or other financial figures.

## Run it on this Mac

```bash
cd ~/Desktop/ericwebsite
./start-local.sh
```

Opens http://localhost:3000. Press **Ctrl+C** to stop.

## Publish to the web (Vercel)

Easiest: double-click **发布网站.command** in the `ericwebsite` folder.

Or in Terminal:

```bash
cd ~/Desktop/ericwebsite/frontend
npx vercel --prod
```

The first time, Vercel asks you to log in and to link the folder to a project — choose your existing **portfolio** project so the same web address is updated.

## Pages

| Address | Page |
| --- | --- |
| `/` | Cover |
| `/about` | 01 — About Me |
| `/watches` | 02 — Watches & Horology |
| `/experiences` | 03 — Life Experiences |
| `/artwork` | 04 — Artwork & Creativity |

Old addresses `/gallery` and `/art` redirect to `/artwork`.
