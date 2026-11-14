import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DecorWatch from "@/components/DecorWatch";
import { notFound } from "next/navigation";
import { Fleuron, Stamp } from "@/components/Deco";
import { Edge, GiantWord, Note } from "@/components/Editorial";
import { T } from "@/components/T";
import { categoryLabel, chapterHref, chapterSlug, chapters, timeline } from "@/content/experiences";
import { trading } from "@/content/trading";
import { publicOnly } from "@/content/types";
import Scene from "@/components/Scene";
import { CHAPTER_SCENES } from "@/content/scenes";

type Props = { params: Promise<{ slug: string }> };

/* One page per chapter: /experiences/debate-and-mun … (the case study keeps its own page). */
export const dynamicParams = false;

export function generateStaticParams() {
  return publicOnly(chapters).map((c) => ({ slug: chapterSlug(c.id) }));
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const ORNAMENT = ["gold", "pendant", "silver"] as const;
const PHOTO: Record<string, { src: string; alt: string }> = {
  "E-102": { src: "/objects/archive-market-finds.jpg", alt: "Two vintage watches held in one hand" },
  "E-104": { src: "/objects/archive-newspapers.jpg", alt: "A watch photographed on period watch advertisements for a listing" },
};

const WORDS: Record<string, string> = {
  education: "LANGUAGES.",
  entrepreneurship: "MARKETS.",
  debate: "ARGUMENT.",
  projects: "SYSTEMS.",
  growth: "HABITS.",
  future: "HORIZON.",
};

function locate(slug: string) {
  const list = publicOnly(chapters);
  const i = list.findIndex((c) => chapterSlug(c.id) === slug);
  if (i < 0) return null;
  return { ch: list[i], index: i, total: list.length, prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = locate(slug);
  if (!found) return {};
  return {
    title: found.ch.title.en,
    description: found.ch.background.en,
    alternates: { canonical: chapterHref(found.ch.id) },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const found = locate(slug);
  if (!found) notFound();
  const { ch, index, total, prev, next } = found;
  const related = publicOnly(timeline).filter((e) => e.categories.includes(ch.category));
  const scenes = CHAPTER_SCENES[slug];

  return (
    <>
      <article className={`chap-page${scenes ? " has-scene" : ""}`}>
        {scenes ? <Scene use={scenes.hero} eager className="scene-hero" /> : null}
        <DecorWatch which={ORNAMENT[index % ORNAMENT.length]} className="decor-chap" />
        <p className="chap-numeral" aria-hidden="true">
          {ROMAN[index]}
        </p>
        <Edge className="chap-edge">
          {ch.id} · <T v={categoryLabel[ch.category]} />
        </Edge>

        <div className="wrap chap-top">
          <p className="crumbs">
            <Link href="/experiences">
              <T v={{ en: "Life Experiences", zh: "人生经历" }} />
            </Link>
            <span className="crumbs-sep" aria-hidden="true">
              /
            </span>
            <span className="archive-id">{ch.id}</span>
          </p>
          <Note>
            <T v={{ en: `Chapter ${ROMAN[index]} of ${ROMAN[total - 1]}`, zh: `第 ${ROMAN[index]} 篇 / 共 ${ROMAN[total - 1]} 篇` }} />
          </Note>
        </div>

        <div className="wrap chap-head">
          <h1 className="chap-title">
            <T v={ch.title} />
          </h1>
          <p className="chap-lead">
            <T v={ch.background} />
          </p>
        </div>

        <GiantWord word={WORDS[ch.category] ?? "EXPERIENCE."} outline className="chap-word" drift={0.14} />

        {scenes?.frieze ? <Scene use={scenes.frieze} className="chap-frieze" /> : null}

        <div className="wrap chap-body">
          <section className="chap-process">
            <h2 className="mono-note">
              <T v={{ en: "What I did", zh: "我做了什么" }} />
            </h2>
            <p>
              <T v={ch.process} />
            </p>
          </section>
          {PHOTO[ch.id] ? (
            <figure className="chap-photo">
              <Image src={PHOTO[ch.id].src} width={1040} height={1300} alt={PHOTO[ch.id].alt} sizes="(max-width: 960px) 70vw, 300px" />
            </figure>
          ) : null}
          <blockquote className="chap-take">
            <p>
              <T v={ch.takeaway} />
            </p>
            <footer className="mono-note">
              — <T v={{ en: "what stayed with me", zh: "留下来的东西" }} />
            </footer>
          </blockquote>
        </div>

        {ch.id === "E-102" ? (
          <p className="wrap chap-case">
            <Link className="text-link" href={`/experiences/${trading.slug}`}>
              <T v={{ en: "The full case study", zh: "完整案例" }} /> →
            </Link>
          </p>
        ) : null}

        {related.length ? (
          <section className="wrap chap-related" aria-label="On the timeline">
            <Note>
              <T v={{ en: "On the timeline", zh: "时间线上" }} />
            </Note>
            <ol>
              {related.map((e) => (
                <li key={e.id}>
                  <Link href={`/experiences#${e.id}`} className="chap-rel-row">
                    <span className="chap-rel-date">
                      <T v={e.period} />
                    </span>
                    <span className="chap-rel-title">
                      <T v={e.title} />
                    </span>
                    <span className="mono-note">{e.id}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <Stamp className="stamp chap-stamp" top="EXU · LIFE EXPERIENCES" bottom={`CHAPTER ${ROMAN[index]} · ${ch.id}`} mid={ROMAN[index]} />
      </article>

      <Fleuron className="fleuron fleuron-gap" />

      <nav className="wrap plate-nav" aria-label="More chapters">
        <Link href={chapterHref(prev.id)} className="plate-nav-link">
          <span className="mono-note">← {ROMAN[(index - 1 + total) % total]}</span>
          <span className="plate-nav-title">
            <T v={prev.title} />
          </span>
        </Link>
        <Link href="/experiences" className="plate-nav-all mono-note">
          <T v={{ en: "All chapters", zh: "全部篇章" }} />
        </Link>
        <Link href={chapterHref(next.id)} className="plate-nav-link plate-nav-next">
          <span className="mono-note">{ROMAN[(index + 1) % total]} →</span>
          <span className="plate-nav-title">
            <T v={next.title} />
          </span>
        </Link>
      </nav>
    </>
  );
}
