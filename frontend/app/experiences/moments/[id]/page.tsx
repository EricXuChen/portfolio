import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Edge, Hand } from "@/components/Editorial";
import PageMast from "@/components/PageMast";
import RoomLinks from "@/components/RoomLinks";
import { T } from "@/components/T";
import { categoryLabel, chapterHref, chapters, timeline } from "@/content/experiences";
import { MOMENT_SCENES, momentHref } from "@/content/pages";
import { publicOnly } from "@/content/types";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publicOnly(timeline).map((e) => ({ id: e.id.toLowerCase() }));
}

function locate(id: string) {
  const list = publicOnly(timeline);
  const i = list.findIndex((e) => e.id.toLowerCase() === id);
  return i < 0 ? null : { e: list[i], i, list };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const f = locate(id);
  if (!f) return {};
  return { title: `${f.e.id} · ${f.e.title.en}`, description: f.e.points[0]?.en, alternates: { canonical: momentHref(f.e.id) } };
}

const LAYOUTS = ["classic", "split", "overlap", "vertical", "frame", "centered", "split"] as const;
const VOICES = ["italic", "bodoni", "cond"] as const;

export default async function MomentPage({ params }: Props) {
  const { id } = await params;
  const f = locate(id);
  if (!f) notFound();
  const { e, i, list } = f;
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  const related = publicOnly(chapters).filter((c) => e.categories.includes(c.category));

  return (
    <>
      <PageMast
        word={e.period.en.toUpperCase().replace("EARLY ", "") + "."}
        scene={MOMENT_SCENES[e.id]}
        metal={i % 2 === 0}
        layout={LAYOUTS[i % LAYOUTS.length]}
        voice={VOICES[i % VOICES.length]}
        num={e.id}
        kicker={{ en: "A moment on the timeline", zh: "时间线上的一刻" }}
        title={e.title}
        lede={e.period}
        stamp={{ top: `EXU · TIMELINE · ${e.id}`, bottom: `MOMENT ${i + 1} OF ${list.length}`, mid: "E." }}
      />

      <section className={`wrap moment-body moment-${i % 3}`} aria-label={e.title.en}>
        <Edge className="moment-edge">
          {e.id} · <T v={e.period} />
        </Edge>
        <ol className="moment-points">
          {e.points.map((p, k) => (
            <li key={k}>
              <span className="moment-num">{String(k + 1).padStart(2, "0")}</span>
              <p>
                <T v={p} />
              </p>
            </li>
          ))}
        </ol>
        <p className="moment-tags mono-note">
          {e.categories.map((c, k) => (
            <span key={c}>
              {k ? " · " : ""}
              <T v={categoryLabel[c]} />
            </span>
          ))}
        </p>
        <Hand className="moment-hand" v={{ en: "one page of the timeline", zh: "时间线的一页" }} />
      </section>

      <RoomLinks
        title={{ en: "The chapters this belongs to", zh: "它属于哪些篇章" }}
        links={related.map((c) => ({ href: chapterHref(c.id), kicker: c.id, label: c.title }))}
        variant={i % 2 ? "cards" : "list"}
      />

      <nav className="wrap entry-nav" aria-label="Timeline">
        <Link href={momentHref(prev.id)} className="entry-nav-link">
          ← {prev.id} · <T v={prev.title} />
        </Link>
        <Link href="/experiences" className="entry-nav-all">
          <T v={{ en: "Timeline", zh: "时间线" }} />
        </Link>
        <Link href={momentHref(next.id)} className="entry-nav-link entry-nav-next">
          {next.id} · <T v={next.title} /> →
        </Link>
      </nav>
    </>
  );
}
