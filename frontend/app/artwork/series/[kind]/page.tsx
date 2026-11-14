import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageMast from "@/components/PageMast";
import StudioRooms from "@/components/StudioRooms";
import WorkWall from "@/components/WorkWall";
import { SERIES, artworks, seriesHref, type ArtKind } from "@/content/artwork";
import { SERIES_SCENES } from "@/content/scenes";
import { publicOnly } from "@/content/types";

type Props = { params: Promise<{ kind: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(SERIES) as ArtKind[]).map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind } = await params;
  const s = SERIES[kind as ArtKind];
  if (!s) return {};
  return { title: s.title.en, description: s.lede.en, alternates: { canonical: seriesHref(kind as ArtKind) } };
}

const LOOK: Record<ArtKind, { layout: "frame" | "vertical" | "overlap"; voice: "italic" | "bodoni" | "cond"; hang: "ledger" | "salon" | "strip" }> = {
  ink: { layout: "frame", voice: "bodoni", hang: "ledger" },
  pencil: { layout: "vertical", voice: "italic", hang: "salon" },
  colour: { layout: "overlap", voice: "cond", hang: "strip" },
};

export default async function SeriesPage({ params }: Props) {
  const { kind } = await params;
  const k = kind as ArtKind;
  const s = SERIES[k];
  if (!s) notFound();
  const works = publicOnly(artworks).filter((a) => a.kind === k);
  const look = LOOK[k];

  return (
    <>
      <PageMast
        word={s.word}
        scene={SERIES_SCENES[k]}
        layout={look.layout}
        voice={look.voice}
        num="IV"
        kicker={{ en: "Artwork · by medium", zh: "作品 · 按媒材" }}
        title={s.title}
        lede={s.lede}
        stamp={{ top: `EXU · STUDIO · ${s.word.replace(".", "")}`, bottom: `${String(works.length).padStart(2, "0")} WORKS · MMXXVI`, mid: "A." }}
      >
        <p className="count-line mast-count">
          <span className="count-num">{String(works.length).padStart(2, "0")}</span>
          <span className="l-en" lang="en">
            works on this wall
          </span>
          <span className="l-zh" lang="zh-Hans">
            件作品
          </span>
        </p>
      </PageMast>

      <section className={`wrap section room-wall room-${k}`} aria-label={s.title.en}>
        <WorkWall works={works} hang={look.hang} />
      </section>

      <StudioRooms here={seriesHref(k)} />
    </>
  );
}
