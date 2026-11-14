import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageMast from "@/components/PageMast";
import { T } from "@/components/T";
import { ERAS, eraHref } from "@/content/pages";
import { blurFor } from "@/content/placeholders";
import { publicOnly } from "@/content/types";
import { collection, pieceHref } from "@/content/watches";

type Props = { params: Promise<{ era: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ERAS.map((e) => ({ era: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { era } = await params;
  const e = ERAS.find((x) => x.slug === era);
  if (!e) return {};
  return { title: `The collection · ${e.title.en}`, description: e.lede.en, alternates: { canonical: eraHref(era) } };
}

export default async function EraPage({ params }: Props) {
  const { era } = await params;
  const k = ERAS.findIndex((x) => x.slug === era);
  if (k < 0) notFound();
  const e = ERAS[k];
  const watches = publicOnly(collection).filter((w) => e.ids.includes(w.id));
  const prev = ERAS[(k - 1 + ERAS.length) % ERAS.length];
  const next = ERAS[(k + 1) % ERAS.length];

  return (
    <>
      <PageMast
        word={e.word}
        scene={e.scene}
        metal
        layout={e.layout}
        voice={k % 2 ? "italic" : "cond"}
        num="II"
        kicker={{ en: "The collection, by era", zh: "收藏 · 按年代" }}
        title={e.title}
        lede={e.lede}
        stamp={{ top: "EXU · THE COLLECTION", bottom: `${String(watches.length).padStart(2, "0")} PIECES`, mid: "W." }}
      />

      <section className={`wrap era-case era-${watches.length > 2 ? "many" : "few"}`} aria-label={e.title.en}>
        <ol>
          {watches.map((w, i) => (
            <li key={w.id} className={`era-item era-item-${(i % 3) + 1}`}>
              <Link href={pieceHref(w.id)} className="era-link">
                <span className="era-velvet">
                  <Image
                    src={w.image.src}
                    width={w.image.width}
                    height={w.image.height}
                    alt={w.image.alt}
                    sizes="(max-width: 800px) 80vw, 30vw"
                    placeholder={blurFor(w.image.src) ? "blur" : "empty"}
                    blurDataURL={blurFor(w.image.src)}
                    style={w.image.position ? { objectPosition: w.image.position } : undefined}
                  />
                </span>
                <span className="era-cap">
                  <span className="archive-id">{w.id}</span>
                  <span className="era-model">
                    <T v={w.model} />
                  </span>
                  <span className="era-era">
                    <T v={w.era} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <nav className="wrap entry-nav" aria-label="Other eras">
        <Link href={eraHref(prev.slug)} className="entry-nav-link">
          ← <T v={prev.title} />
        </Link>
        <Link href="/watches" className="entry-nav-all">
          <T v={{ en: "The whole collection", zh: "全部收藏" }} />
        </Link>
        <Link href={eraHref(next.slug)} className="entry-nav-link entry-nav-next">
          <T v={next.title} /> →
        </Link>
      </nav>
    </>
  );
}
