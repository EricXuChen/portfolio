import { api } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vintage Watches | Eric Xu | Watch Collection & Horology Notes",
  description:
    "Explore Eric Xu's vintage watch collection in Barcelona, including watch research, Seiko and Swiss pieces, and horology notes from a young collector.",
  keywords: [
    "vintage watches Barcelona",
    "Eric Xu watches",
    "watch collector student",
    "horology notes",
    "Seiko vintage watch",
  ],
  alternates: { canonical: "/watches" },
  openGraph: {
    title: "Vintage Watches | Eric Xu | Watch Collection & Horology Notes",
    description:
      "A student watch collector's collection of vintage timepieces, research notes, and horology interests.",
  },
};

export default async function WatchesPage() {
  try {
    const [watches, profile] = await Promise.all([api.watches(), api.profile()]);
    const intro =
      profile.sections?.watches_page ??
      "A small, active set of mechanical and vintage watches I wear, study, or resell.";

    return (
      <main>
        <div className="page-shell">
          <header className="page-intro">
            <p className="kicker">Horology</p>
            <h1>Watches</h1>
            <p className="page-intro__lead">
              {watches.length} entries from my research desk and Barcelona flea-market circuit, where
              every watch offers a different lesson in design, mechanics, or condition.
            </p>
            <p className="section-desc">{intro}</p>
          </header>
          <div className="watch-list" style={{ paddingTop: "1.2rem" }}>
            {watches.map((watch, index) => (
              <article className="watch-row" key={watch.id}>
                <div className="idx">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{watch.name}</h3>
                  <p className="meta-line">Acquired {watch.year_acquired}</p>
                </div>
                <dl className="watch-specs">
                  <div>
                    <dt>Movement</dt>
                    <dd>{watch.movement}</dd>
                  </div>
                  <div>
                    <dt>Origin</dt>
                    <dd>{watch.origin}</dd>
                  </div>
                </dl>
                <p>{watch.note}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    );
  } catch {
    return (
      <p className="error">Could not load the watch collection from the API. Is the backend running?</p>
    );
  }
}
