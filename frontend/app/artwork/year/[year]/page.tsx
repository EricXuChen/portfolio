import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageMast from "@/components/PageMast";
import StudioRooms from "@/components/StudioRooms";
import WorkWall from "@/components/WorkWall";
import { artYears, artworks, roman, yearHref } from "@/content/artwork";
import { YEAR_SCENES } from "@/content/scenes";
import { publicOnly } from "@/content/types";

type Props = { params: Promise<{ year: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return artYears(publicOnly(artworks)).map((year) => ({ year }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return { title: `Artwork, ${year}`, description: `Every work by Eric Xu dated ${year}.`, alternates: { canonical: yearHref(year) } };
}

const LAYOUTS = ["centered", "split", "classic"] as const;
const HANGS = ["ledger", "salon", "salon"] as const;

export default async function YearPage({ params }: Props) {
  const { year } = await params;
  const all = publicOnly(artworks);
  const years = artYears(all);
  const i = years.indexOf(year);
  if (i < 0) notFound();
  const works = all.filter((a) => a.year === year);
  const scene = YEAR_SCENES[year];

  return (
    <>
      <PageMast
        word={roman(Number(year))}
        scene={scene}
        metal
        layout={LAYOUTS[i % LAYOUTS.length]}
        voice={i % 2 ? "italic" : "bodoni"}
        num="IV"
        kicker={{ en: "Artwork · by year", zh: "作品 · 按年份" }}
        title={{ en: `The year ${year}`, zh: `${year} 年` }}
        lede={{ en: `Every work dated ${year}.`, zh: `所有标注为 ${year} 年的作品。` }}
        stamp={{ top: `EXU · STUDIO · ${year}`, bottom: `${String(works.length).padStart(2, "0")} WORKS`, mid: "A." }}
      />

      <section className={`wrap section room-wall room-year${scene ? "" : " room-bare"}`} aria-label={`Works from ${year}`}>
        <WorkWall works={works} hang={HANGS[i % HANGS.length]} />
      </section>

      <StudioRooms here={yearHref(year)} />
    </>
  );
}
