import { api } from "@/lib/api";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const work = await api.artwork(id).catch(() => null);

  if (!work) {
    return { title: "Artwork Not Found" };
  }

  const description = `${work.title} (${work.year}) is an original ${work.medium.toLowerCase()} artwork by Eric Xu. ${work.note}`;
  const title = `${work.title} | ${work.medium}`;

  return {
    title,
    description: description.length > 160 ? `${description.slice(0, 157).trimEnd()}...` : description,
    alternates: { canonical: `/gallery/${work.id}` },
    openGraph: {
      type: "article",
      title,
      description,
      images: work.image ? [{ url: work.image, alt: `${work.title}, ${work.medium}, ${work.year}` }] : [],
    },
  };
}

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
    notFound();
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
            A closer look at the materials and decisions behind this studio piece. The process note
            below describes what I focused on while making it.
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
