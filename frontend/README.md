# EXU. — The Personal Archive

Personal website of Eric Xu: **About · Collection · Experiences · Artwork**, in English and Chinese.

- Framework: **Next.js** (React + TypeScript), in the `frontend` folder
- Code: GitHub **EricXuChen/portfolio** · Hosting: **Vercel** (project *portfolio-eric*)
- No database or server — all content lives in `frontend/content/`

## Updating the content

Everything you see on the site is in these files. Open them in VS Code or Cursor, edit the text, save.

| File | What it holds |
| --- | --- |
| `frontend/content/site.ts` | Home page, About page, navigation, "last updated" date |
| `frontend/content/watches.ts` | The collection (W-001 …) |
| `frontend/content/experiences.ts` | Timeline (E-001 …), chapters (E-101 …) and recognition (R-001 …) |
| `frontend/content/trading.ts` | The vintage watch trading case study |
| `frontend/content/artwork.ts` | Artist statement and artworks (A-001 …) |
| `frontend/content/antiques.ts` | The Cabinet (nine antique watches from museums and public collections), the floating pocket watch, the Art Deco posters, and the picture credits |

Rules that keep the archive tidy:

1. Every text has an English and a Chinese version: `{ en: "…", zh: "…" }`.
2. Every entry has an archive number (`id`), a date (`updated: "YYYY-MM-DD"`) and `visibility`.
3. To hide an entry without deleting it, set `visibility: "draft"`. Only `"public"` entries are shown.
4. When you change something, update its `updated` date — and `lastUpdated` in `site.ts`.
5. The numbers in the footer are counted automatically.

### Adding a watch

1. Crop the photo to 4:5 (for example 1280 × 1600) and put it in `frontend/public/collection/`, e.g. `w-011-omega.jpg`.
2. In `watches.ts`, copy the last entry, give it the next number (`W-011`) and fill in the fields. Leave `reference: ""` if there is none.
3. That's all — the watch appears in the gallery and the index, and gets its own page at `/watches/w-011`.
   (Optional: a designed share picture `frontend/public/og/w-011.jpg`, 1200 × 630. Without it, the photo is used when the link is shared.)

### Adding an artwork

1. Put the photo in `frontend/public/artworks/`, named after its number, e.g. `a-026-harbour.jpg` (long side about 1600 px).
2. In `artwork.ts`, copy an entry, give it the next number and fill it in. Photos go in `images` — the first one is the cover, any others become extra views in the viewer:
   ```ts
   images: [img("/artworks/a-026-harbour.jpg", 1200, 1600, "Harbour — watercolour of boats at dusk")],
   ```
3. `kind` puts it on a shelf of the gallery filter: `"ink"`, `"pencil"` (pencil & charcoal) or `"colour"`.
4. For a sketch or a work that isn't finished, add `status: "draft"` — it then appears under **Drafts & works in progress**. When it's done, delete that line and it moves into the gallery.

### The Cabinet, posters and picture credits

The antique watches on the home page (C-01 … C-09), the floating gold pocket watch and the Cappiello posters are **not** Eric's — they come from museums and Wikimedia Commons under public-domain or Creative Commons licences. Each one has a `credit` in `antiques.ts` (author, source, licence, and what was changed), and all of them are listed automatically on **/credits**. If you add or swap one:

1. Use only real antique watches or pocket watches, from a museum or Wikimedia Commons, with a licence that allows reuse (Public domain, CC0, CC BY, CC BY-SA).
2. Crop it to 4:5 (800 × 1000) and put it in `frontend/public/antiques/`.
3. Fill in its `credit` — the licence requires it for CC BY / CC BY-SA pictures.
4. Describe it by era, place and craft, **not by brand** — no maker names in titles, captions, alt texts or file names. This is a personal archive, not a shop. (Posters get their lettering removed for the same reason.)

Photos of artworks are straightened (perspective-corrected) and cropped to the sheet before they go in `public/artworks/`.

### Privacy checklist (public site)

Public: the city (Barcelona) and "international school · IB pathway". Do not publish: the school's name, grade, age, home address, daily routine, contact details, client or partner names, supplier locations, prices, revenue or profit. Check photos for papers, screens or name tags in the background before adding them.

## Run it on this Mac

```bash
cd ~/Desktop/ericwebsite/frontend
npm run dev
```

Opens http://localhost:3000. Press **Ctrl+C** to stop.

## Publish to the web

Double-click **发布网站.command** in the `ericwebsite` folder. It sends the `frontend` folder to GitHub (EricXuChen/portfolio); Vercel then rebuilds the site by itself in 1–2 minutes.

## Pages

| Address | Page |
| --- | --- |
| `/` | Cover — the dial shows the visitor's local time |
| `/about` | 01 — About Me |
| `/watches` | 02 — The Collection (Gallery / Index) |
| `/watches/w-001` … | One page per watch (← → keys turn the pages) |
| `/experiences` | 03 — Life Experiences (timeline, recognition, chapters) |
| `/experiences/vintage-watch-trading` | Case study — Vintage Watch Trading |
| `/artwork` | 04 — Artwork & Creativity |
| `/credits` | Picture credits and licences |

Old addresses `/gallery` and `/art` redirect to `/artwork`.
