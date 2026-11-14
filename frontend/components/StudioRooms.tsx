import Link from "next/link";
import { SERIES, SKETCHBOOK_HREF, artYears, artworks, roman, seriesHref, yearHref, type ArtKind } from "@/content/artwork";
import { publicOnly } from "@/content/types";
import { T } from "./T";

/** The doors out of any studio room: the other media, the years, the sketchbook. */
export default function StudioRooms({ here }: { here?: string }) {
  const works = publicOnly(artworks);
  const kinds = Object.keys(SERIES) as ArtKind[];
  const years = artYears(works);
  const rooms = [
    ...kinds.map((k) => ({ href: seriesHref(k), label: SERIES[k].title, n: works.filter((a) => a.kind === k).length })),
    ...years.map((y) => ({ href: yearHref(y), label: { en: y, zh: `${y} 年` }, n: works.filter((a) => a.year === y).length })),
    { href: SKETCHBOOK_HREF, label: { en: "The sketchbook", zh: "速写本" }, n: works.filter((a) => a.status === "draft").length },
    { href: "/artwork", label: { en: "The whole studio", zh: "整个画室" }, n: works.length },
  ];
  return (
    <nav className="wrap rooms" aria-label="Rooms of the studio">
      <p className="mono-note rooms-head">
        <T v={{ en: "Other rooms of the studio", zh: "画室的其他房间" }} />
      </p>
      <ol className="rooms-list">
        {rooms
          .filter((r) => r.href !== here)
          .map((r, i) => (
            <li key={r.href}>
              <Link href={r.href} className="rooms-link">
                <span className="rooms-num">{roman(i + 1)}</span>
                <span className="rooms-label">
                  <T v={r.label} />
                </span>
                <span className="rooms-dots" aria-hidden="true" />
                <span className="rooms-count">{String(r.n).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
      </ol>
    </nav>
  );
}
