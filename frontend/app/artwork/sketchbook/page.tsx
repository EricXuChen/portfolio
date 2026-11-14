import type { Metadata } from "next";
import PageMast from "@/components/PageMast";
import StudioRooms from "@/components/StudioRooms";
import WorkWall from "@/components/WorkWall";
import { SKETCHBOOK_HREF, artworks, sketchbookIntro } from "@/content/artwork";
import { SKETCHBOOK_SCENE } from "@/content/scenes";
import { publicOnly } from "@/content/types";

export const metadata: Metadata = {
  title: "The sketchbook",
  description: sketchbookIntro.lede.en,
  alternates: { canonical: SKETCHBOOK_HREF },
};

export default function SketchbookPage() {
  const works = publicOnly(artworks).filter((a) => a.status === "draft");
  return (
    <>
      <PageMast
        word="SKETCHES."
        scene={SKETCHBOOK_SCENE}
        layout="classic"
        voice="cond"
        num="IV"
        kicker={{ en: "Artwork · unfinished", zh: "作品 · 未完成" }}
        title={sketchbookIntro.title}
        lede={sketchbookIntro.lede}
        stamp={{ top: "EXU · STUDIO · SKETCHBOOK", bottom: `${String(works.length).padStart(2, "0")} SHEETS`, mid: "S." }}
      />

      <section className="wrap section room-wall room-sketchbook" aria-label="Sketches">
        <WorkWall works={works} hang="strip" />
      </section>

      <StudioRooms here={SKETCHBOOK_HREF} />
    </>
  );
}
