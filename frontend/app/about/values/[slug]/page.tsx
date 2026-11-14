import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Interlude from "@/components/Interlude";
import { T } from "@/components/T";
import { VALUE_SLUGS, valueHref } from "@/content/pages";
import { about } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return VALUE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const i = VALUE_SLUGS.indexOf(slug as (typeof VALUE_SLUGS)[number]);
  if (i < 0) return {};
  return { title: about.values[i].title.en, description: about.values[i].text.en, alternates: { canonical: valueHref(slug) } };
}

const ALIGN = ["left", "right", "center", "left"] as const;

/* A value gets a page of mostly empty wall: one numeral, one sentence. */
export default async function ValuePage({ params }: Props) {
  const { slug } = await params;
  const i = VALUE_SLUGS.indexOf(slug as (typeof VALUE_SLUGS)[number]);
  if (i < 0) notFound();
  const v = about.values[i];
  const prev = VALUE_SLUGS[(i - 1 + VALUE_SLUGS.length) % VALUE_SLUGS.length];
  const next = VALUE_SLUGS[(i + 1) % VALUE_SLUGS.length];
  const align = ALIGN[i % ALIGN.length];

  return (
    <>
      <article className={`value-page value-${align}`}>
        <p className="mono-note value-kicker">
          <T v={about.valuesTitle} /> — {v.num} / IV
        </p>
        <p className="value-numeral" aria-hidden="true">
          {v.num}
        </p>
        <h1 className="value-title">
          <T v={v.title} />
        </h1>
        <p className="value-text">
          <T v={v.text} />
        </p>
      </article>

      <Interlude align={align === "left" ? "right" : align === "right" ? "left" : "center"} tone={i % 2 ? "ink" : "deep"} />

      <nav className="wrap entry-nav" aria-label="Other values">
        <Link href={valueHref(prev)} className="entry-nav-link">
          ← {about.values[VALUE_SLUGS.indexOf(prev)].num}
        </Link>
        <Link href="/about" className="entry-nav-all">
          <T v={{ en: "About", zh: "关于我" }} />
        </Link>
        <Link href={valueHref(next)} className="entry-nav-link entry-nav-next">
          {about.values[VALUE_SLUGS.indexOf(next)].num} →
        </Link>
      </nav>
    </>
  );
}
