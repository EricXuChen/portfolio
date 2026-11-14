import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GiantWord } from "@/components/Editorial";
import PageMast from "@/components/PageMast";
import RoomLinks from "@/components/RoomLinks";
import { T } from "@/components/T";
import { INTERESTS, interestHref } from "@/content/pages";
import { about } from "@/content/site";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return INTERESTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const it = INTERESTS.find((i) => i.slug === slug);
  if (!it) return {};
  const card = about.interests[it.index];
  return { title: card.title.en, description: card.text.en, alternates: { canonical: interestHref(slug) } };
}

export default async function InterestPage({ params }: Props) {
  const { slug } = await params;
  const k = INTERESTS.findIndex((i) => i.slug === slug);
  if (k < 0) notFound();
  const it = INTERESTS[k];
  const card = about.interests[it.index];
  const prev = INTERESTS[(k - 1 + INTERESTS.length) % INTERESTS.length];
  const next = INTERESTS[(k + 1) % INTERESTS.length];

  return (
    <>
      <PageMast
        word={it.word}
        scene={it.scene}
        layout={it.layout}
        voice={it.voice}
        num={`I·${k + 1}`}
        kicker={about.interestsTitle}
        title={card.title}
        stamp={{ top: "EXU · WHAT I PAY ATTENTION TO", bottom: `INTEREST ${k + 1} OF ${INTERESTS.length}`, mid: "I." }}
      />

      <section className={`interest-statement interest-${k % 3}`} aria-label={card.title.en}>
        <GiantWord word={it.word.replace(".", "")} script className="interest-script" drift={0.12} />
        <div className="wrap">
          <p className="interest-text">
            <T v={card.text} />
          </p>
        </div>
      </section>

      <RoomLinks title={{ en: "Where it shows up in the archive", zh: "在档案里的哪些地方能看到" }} links={it.links} variant={k % 2 ? "cards" : "list"} />

      <nav className="wrap entry-nav" aria-label="Other interests">
        <Link href={interestHref(prev.slug)} className="entry-nav-link">
          ← <T v={about.interests[prev.index].title} />
        </Link>
        <Link href="/about" className="entry-nav-all">
          <T v={{ en: "About", zh: "关于我" }} />
        </Link>
        <Link href={interestHref(next.slug)} className="entry-nav-link entry-nav-next">
          <T v={about.interests[next.index].title} /> →
        </Link>
      </nav>
    </>
  );
}
