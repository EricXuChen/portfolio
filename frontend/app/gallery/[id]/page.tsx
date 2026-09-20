import { api } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ArtworkDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const [work, artworks] = await Promise.all([api.artwork(id), api.artworks()]);
    const index = artworks.findIndex((item) => item.id === work.id);
    const prev = index > 0 ? artworks[index - 1] : null;
    const next = index >= 0 && index < artworks.length - 1 ? artworks[index + 1] : null;

    return (
      <main>
        <div className="page-shell">
          <header className="page-intro artwork-detail-intro">
            <p className="kicker">
              <Link href="/gallery">Gallery</Link> / {String(index + 1).padStart(2, "0")}
            </p>
            <h1>{work.title}</h1>
            <p className="meta-line">
              {work.year} · {work.medium} · {work.size}
            </p>
          </header>

          <figure className="artwork-hero">
            {work.image ? (
              <img src={work.image} alt={work.title} />
            ) : (
              <div
                className="gallery-fallback tall"
                style={{ background: `linear-gradient(145deg, ${work.accent}, ${work.wash})` }}
              />
            )}
            <figcaption>{work.note}</figcaption>
          </figure>

          <nav className="artwork-pager">
            {prev ? <Link href={`/gallery/${prev.id}`}>← {prev.title}</Link> : <span />}
            <Link href="/gallery">All works</Link>
            {next ? <Link href={`/gallery/${next.id}`}>{next.title} →</Link> : <span />}
          </nav>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
