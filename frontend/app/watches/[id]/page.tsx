import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtImage from "@/components/ArtImage";
import PieceKeys from "@/components/PieceKeys";
import { T } from "@/components/T";
import { blurFor } from "@/content/placeholders";
import { site } from "@/content/site";
import { publicOnly } from "@/content/types";
import { collection, pieceHref, pieceSlug } from "@/content/watches";

type Props = { params: Promise<{ id: string }> };

/* One page per public watch, built ahead of time: /watches/w-001 … */
export const dynamicParams = false;

export function generateStaticParams() {
  return publicOnly(collection).map((w) => ({ id: pieceSlug(w.id) }));
}

function locate(id: string) {
  const list = publicOnly(collection);
  const i = list.findIndex((w) => pieceSlug(w.id) === id);
  if (i < 0) return null;
  return {
    piece: list[i],
    index: i,
    total: list.length,
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const found = locate(id);
  if (!found) return {};
  const w = found.piece;
  const title = `${w.brand} ${w.model.en}`;
  /* A designed share card if one exists in public/og/, otherwise the photo itself. */
  const card = `/og/${pieceSlug(w.id)}.jpg`;
  const share = existsSync(join(process.cwd(), "public", card))
    ? { url: card, width: 1200, height: 630, alt: `${w.id} · ${title}` }
    : { url: w.image.src, width: w.image.width, height: w.image.height, alt: w.image.alt };
  return {
    title,
    description: w.note.en,
    alternates: { canonical: pieceHref(w.id) },
    openGraph: {
      title: `${title} — ${site.mark} Personal Archive`,
      description: w.note.en,
      type: "article",
      siteName: site.title,
      url: pieceHref(w.id),
      images: [share],
    },
    twitter: { card: "summary_large_image", title, description: w.note.en, images: [share] },
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function PiecePage({ params }: Props) {
  const { id } = await params;
  const found = locate(id);
  if (!found) notFound();
  const { piece: w, index, total, prev, next } = found;

  const facts: { label: { en: string; zh: string }; value: React.ReactNode }[] = [
    { label: { en: "Archive no.", zh: "档案编号" }, value: w.id },
    { label: { en: "Reference", zh: "型号" }, value: w.reference || <span className="muted">—</span> },
    { label: { en: "Era", zh: "年代" }, value: <T v={w.era} /> },
    { label: { en: "Movement", zh: "机芯" }, value: <T v={w.movement} /> },
    { label: { en: "Case", zh: "表壳" }, value: <T v={w.case} /> },
  ];

  return (
    <>
      <article className="wrap piece-page">
        <div className="piece-figure velvet corners">
          <ArtImage
            src={w.image.src}
            width={w.image.width}
            height={w.image.height}
            alt={w.image.alt}
            priority
            sizes="(max-width: 960px) 100vw, 52vw"
            blurDataURL={blurFor(w.image.src)}
            caption={
              <>
                {w.id} · {w.brand} — <T v={w.model} />
                {w.reference ? <> · Ref. {w.reference}</> : null}
              </>
            }
          />
        </div>

        <div className="piece-detail">
          <p className="crumbs">
            <Link href="/watches">
              <T v={{ en: "The Collection", zh: "腕表收藏" }} />
            </Link>
            <span className="crumbs-sep" aria-hidden="true">
              /
            </span>
            <span className="archive-id">{w.id}</span>
          </p>

          <p className="piece-count" aria-label={`Piece ${index + 1} of ${total}`}>
            <span className="count-num">{pad(index + 1)}</span>
            <span className="piece-count-total">/ {pad(total)}</span>
          </p>

          <h1 className="piece-title">{w.brand}</h1>
          <p className="piece-model piece-model-lg">
            <T v={w.model} />
          </p>

          <dl className="ledger">
            {facts.map((f) => (
              <div key={f.label.en}>
                <dt>
                  <T v={f.label} />
                </dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="piece-story">
            <h2 className="h-small">
              <T v={{ en: "Why it stays", zh: "为什么留在收藏里" }} />
            </h2>
            <p className="prose-lg">
              <T v={w.note} />
            </p>
          </div>

          <p className="piece-hint" aria-hidden="true">
            <T v={{ en: "Use ← → to turn the pages of the collection", zh: "按 ← → 键翻阅收藏" }} />
          </p>
        </div>
      </article>

      <nav className="wrap piece-nav" aria-label="More from the collection">
        {[
          { w: prev, dir: { en: "Previous", zh: "上一件" }, cls: "piece-nav-prev", arrow: "←" },
          { w: next, dir: { en: "Next", zh: "下一件" }, cls: "piece-nav-next", arrow: "→" },
        ].map(({ w: p, dir, cls, arrow }) => (
          <Link key={cls} href={pieceHref(p.id)} className={`piece-nav-link ${cls}`}>
            <span className="piece-nav-thumb">
              <Image
                src={p.image.src}
                width={p.image.width}
                height={p.image.height}
                alt=""
                sizes="96px"
                placeholder={blurFor(p.image.src) ? "blur" : "empty"}
                blurDataURL={blurFor(p.image.src)}
              />
            </span>
            <span className="piece-nav-text">
              <span className="piece-nav-dir">
                {cls === "piece-nav-prev" ? `${arrow} ` : null}
                <T v={dir} />
                {cls === "piece-nav-next" ? ` ${arrow}` : null}
              </span>
              <span className="piece-nav-name">{p.brand}</span>
              <span className="piece-nav-id">{p.id}</span>
            </span>
          </Link>
        ))}
        <Link href="/watches" className="piece-nav-all">
          <span className="piece-nav-grid" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <T v={{ en: `All ${total} pieces`, zh: `全部 ${total} 件` }} />
        </Link>
      </nav>

      <PieceKeys prev={pieceHref(prev.id)} next={pieceHref(next.id)} />
    </>
  );
}
