import { api } from "@/lib/api";
import Link from "next/link";

export default async function GalleryPage() {
  try {
    const artworks = await api.artworks();

    return (
      <main>
        <div className="page-shell">
          <header className="page-intro">
            <p className="kicker">Studio wall</p>
            <h1>Gallery</h1>
            <p>
              Four pieces from my sketchbooks and studio table — charcoal, oil, line, and
              watercolor. Open any work for the full image and notes.
            </p>
          </header>

          <div className="gallery-stack">
            {artworks.map((work, index) => (
              <Link className="gallery-piece" href={`/gallery/${work.id}`} key={work.id}>
                <div className="gallery-frame">
                  {work.image ? (
                    <img src={work.image} alt={work.title} />
                  ) : (
                    <div
                      className="gallery-fallback"
                      style={{ background: `linear-gradient(145deg, ${work.accent}, ${work.wash})` }}
                    />
                  )}
                </div>
                <div className="gallery-copy">
                  <span className="idx">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{work.title}</h2>
                    <p className="meta-line">
                      {work.year} · {work.medium}
                    </p>
                    <p>{work.note}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  } catch {
    return <p className="error">Could not load artworks from the API.</p>;
  }
}
