import { artHref, artworks } from "./artwork";
import { chapterHref, chapters, recognition, timeline } from "./experiences";
import { PROJECT_PAGES, momentHref, projectHref } from "./pages";
import { trading } from "./trading";
import type { Bi } from "./types";
import { publicOnly } from "./types";
import { collection, pieceHref } from "./watches";

export type CatalogueRow = { id: string; title: Bi; note?: Bi; href: string };

/** Every entry of the archive, by letter — shared by the catalogue and its letter pages. */
export function catalogueRows() {
  const w: CatalogueRow[] = publicOnly(collection).map((x) => ({
    id: x.id,
    title: { en: `${x.brand} — ${x.model.en}`, zh: `${x.brand} —— ${x.model.zh}` },
    note: x.reference ? { en: `Ref. ${x.reference}`, zh: `Ref. ${x.reference}` } : undefined,
    href: pieceHref(x.id),
  }));
  const a: CatalogueRow[] = publicOnly(artworks).map((x) => ({
    id: x.id,
    title: { en: x.title, zh: `《${x.titleZh}》` },
    note: {
      en: [x.medium?.en, x.year, x.status === "draft" ? "draft" : ""].filter(Boolean).join(" · "),
      zh: [x.medium?.zh, x.year, x.status === "draft" ? "草稿" : ""].filter(Boolean).join(" · "),
    },
    href: artHref(x.slug),
  }));
  const e: CatalogueRow[] = [
    ...publicOnly(timeline).map((x) => ({ id: x.id, title: x.title, note: x.period, href: momentHref(x.id) })),
    ...publicOnly(chapters).map((x) => ({ id: x.id, title: x.title, href: chapterHref(x.id) })),
  ];
  const r: CatalogueRow[] = publicOnly(recognition).map((x) => ({
    id: x.id,
    title: x.title,
    note: { en: `${x.year} · ${x.award.en}`, zh: `${x.year} · ${x.award.zh}` },
    href: "/recognition",
  }));
  const p: CatalogueRow[] = [
    { id: "P-00", title: trading.title, note: { en: "case study", zh: "案例" }, href: `/experiences/${trading.slug}` },
    ...trading.next.map((n, i) => ({ id: `P-0${i + 1}`, title: n.title, href: PROJECT_PAGES[i] ? projectHref(PROJECT_PAGES[i].slug) : "/projects" })),
  ];
  return { w, a, e, r, p };
}
