import { api } from "@/lib/api";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ArtworkDetailPage({ params }: Props) {
  const { id } = await params;

  let artworks;
  try {
    artworks = await api.artworks();
  } catch {
    return (
      <p className="error">
        Could not reach the Python API. Start the backend with start-local.ps1, then open this
        artwork again.
      </p>
    );
  }

  const work = artworks.find((item) => item.id === id);
  if (!work) {
    return (
      <main>
        <div className="page-shell">
          <header className="page-intro">
            <p className="kicker">Gallery</p>
            <h1>Artwork not found</h1>
            <p className="section-desc">
              That piece is not in the collection. It may have been renamed or removed.
            </p>
            <p style={{ marginTop: "1.2rem" }}>
              <Link className="text-link" href="/gallery">
                ← Back to gallery
              </Link>
            </p>
          </header>
        </div>
      </main>
    );
  }

  const index = artworks.findIndex((item) => item.id === work.id);
  const prev = index > 0 ? artworks[index - 1] : null;
  const next = index >= 0 && index < artworks.length - 1 ? artworks[index + 1] : null;

  return (
    <main>
      <div className="page-shell">
        <header className="page-intro artwork-detail-intro">
          <p className="kicker">
            <Link href="/gallery">Gallery</Link> / {String(index + 1).padStart(2, "0")} of{" "}
            {artworks.length}
          </p>
          <h1>{work.title}</h1>
          <p className="meta-line">
            {work.year} · {work.medium} · {work.size}
          </p>
          <p className="section-desc">
            Process note and full view for this studio piece. Use the links below to move through
            the collection.
          </p>
        </header>

        <figure className="artwork-hero">
          {work.image ? (
            <img src={work.image} alt={`${work.title} — ${work.medium}, ${work.year}`} />
          ) : (
            <div
              className="gallery-fallback tall"
              style={{ background: `linear-gradient(145deg, ${work.accent}, ${work.wash})` }}
            />
          )}
          <figcaption>{work.note}</figcaption>
        </figure>

        <nav className="artwork-pager" aria-label="Artwork navigation">
          {prev ? <Link href={`/gallery/${prev.id}`}>← {prev.title}</Link> : <span />}
          <Link href="/gallery">All works</Link>
          {next ? <Link href={`/gallery/${next.id}`}>{next.title} →</Link> : <span />}
        </nav>
      </div>
    </main>
  );
}
