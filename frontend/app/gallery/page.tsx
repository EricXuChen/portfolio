import { api } from "@/lib/api";
import Link from "next/link";

export default async function GalleryPage() {
  try {
    const [artworks, profile] = await Promise.all([api.artworks(), api.profile()]);
    const count = artworks.length;
    const intro =
      profile.sections?.gallery ??
      "Open any work for the full image, medium, and process notes.";

    return (
      <main>
        <div className="page-shell">
          <header className="page-intro">
            <p className="kicker">Studio wall</p>
            <h1>Gallery</h1>
            <p className="page-intro__lead">
              {count} piece{count === 1 ? "" : "s"} from my sketchbooks and studio table — charcoal,
              oil, line, and watercolor.
            </p>
            <p className="section-desc">{intro}</p>
          </header>

          <div className="gallery-stack">
            {artworks.map((work, index) => (
              <article className="gallery-piece" key={work.id}>
                <Link className="gallery-frame" href={`/gallery/${work.id}`} aria-label={work.title}>
                  {work.image ? (
                    <img src={work.image} alt={`${work.title} — ${work.medium}, ${work.year}`} />
                  ) : (
                    <div
                      className="gallery-fallback"
                      style={{ background: `linear-gradient(145deg, ${work.accent}, ${work.wash})` }}
                    />
                  )}
                </Link>
                <div className="gallery-copy">
                  <span className="idx">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>
                      <Link href={`/gallery/${work.id}`}>{work.title}</Link>
                    </h2>
                    <p className="meta-line">
                      {work.year} · {work.medium} · {work.size}
                    </p>
                    <p>{work.note}</p>
                    <Link className="text-link" href={`/gallery/${work.id}`}>
                      View full piece →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    );
  } catch {
    return <p className="error">Could not load artworks from the API. Is the Python backend running?</p>;
  }
}
