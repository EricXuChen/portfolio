import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DecorWatch from "@/components/DecorWatch";
import { Kicker, T } from "@/components/T";
import { artworks } from "@/content/artwork";
import { blurFor } from "@/content/placeholders";
import { about } from "@/content/site";
import { publicOnly } from "@/content/types";
import PageMast from "@/components/PageMast";
import { PAGE_SCENES } from "@/content/scenes";
import { Flute, Stave } from "@/components/Flute";
import Interlude from "@/components/Interlude";
import { INTERESTS, VALUE_SLUGS, interestHref, valueHref } from "@/content/pages";

export const metadata: Metadata = {
  title: "About",
  description: "About Eric Xu — interests in mechanical watchmaking, business, art and design, and the values behind them.",
};

export default function AboutPage() {
  const deskWork = publicOnly(artworks).find((a) => a.slug === "watch-and-strap-design");
  const desk = deskWork?.images?.[0];

  return (
    <>
      <PageMast
        word="EXU."
        scene={PAGE_SCENES.about.mast}
        layout="overlap"
        num="I"
        kicker={{ en: "About Me", zh: "个人简介" }}
        title={{ en: "A student, a collector, a maker of small things.", zh: "一个学生，一个收藏者，一个做小东西的人。" }}
        tone="burgundy"
        voice="italic"
        stamp={{ top: "EXU · ABOUT · ERIC XU", bottom: "BARCELONA · MMXXVI", mid: "E.X." }}
      >
        <DecorWatch which="pendant" className="decor-mast" />
      </PageMast>

      <section className="wrap about-intro">
        <div className="prose prose-lg">
          {about.intro.map((p, i) => (
            <p key={i}>
              <T v={p} />
            </p>
          ))}
        </div>
        <aside className="index-card" aria-label="Profile">
          <p className="index-card-head">
            <span>
              <T v={{ en: "Archive card", zh: "档案卡" }} />
            </span>
            <span className="archive-id">P-001</span>
          </p>
          <dl>
            {about.card.map((row) => (
              <div key={row.label.en}>
                <dt>
                  <T v={row.label} />
                </dt>
                <dd>
                  <T v={row.value} />
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <Kicker num="A" v={about.interestsTitle} />
        </div>
        <div className="grid-3">
          {about.interests.map((item, i) => (
            <article key={item.title.en} className="plain-card">
              <h3 className="h-card">
                <Link href={interestHref(INTERESTS.find((x) => x.index === i)?.slug ?? "")} className="plain-link">
                  <T v={item.title} /> →
                </Link>
              </h3>
              <p>
                <T v={item.text} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-music" id="music" aria-label="Music">
        <p className="music-word" aria-hidden="true">
          Flute
        </p>
        <Stave className="music-stave" />
        <div className="wrap music-grid">
          <div className="music-text">
            <p className="mono-note music-kicker">
              <span className="music-num">A·II</span> — <T v={about.music.title} />
            </p>
            <h2 className="music-line">
              <T v={about.music.line} />
            </h2>
            <p className="music-sub">
              <T v={about.music.sub} />
            </p>
          </div>
          <Flute className="music-flute" />
        </div>
        <p className="music-zh" aria-hidden="true">
          长笛
        </p>
      </section>

      <section className="wrap section quote-plate band-ivory">
        {desk ? (
          <Link href={`/artwork#${deskWork?.slug}`} className="quote-plate-image">
            <span className="img-frame">
              <Image
                src={desk.src}
                width={desk.width}
                height={desk.height}
                alt={desk.alt}
                sizes="(max-width: 900px) 100vw, 40vw"
                placeholder={blurFor(desk.src) ? "blur" : "empty"}
                blurDataURL={blurFor(desk.src)}
              />
            </span>
            <span className="caption">
              <span className="caption-num">{deskWork?.id}</span>
              <T v={{ en: "At the desk — a watch and strap design study", zh: "书桌上——一张腕表与表带设计稿" }} />
            </span>
          </Link>
        ) : null}
        <figure className="pull-quote">
          <blockquote>“{about.quote.text}”</blockquote>
          <figcaption>
            <T v={about.quote.note} />
          </figcaption>
        </figure>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <Kicker num="B" v={about.valuesTitle} />
        </div>
        <ol className="values">
          {about.values.map((v, i) => (
            <li key={v.num}>
              <span className="value-num">{v.num}</span>
              <div>
                <h3 className="h-card">
                  <Link href={valueHref(VALUE_SLUGS[i])} className="plain-link">
                    <T v={v.title} /> →
                  </Link>
                </h3>
                <p>
                  <T v={v.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Interlude align="center" tone="ink" />

      <section className="wrap section split-2">
        <div>
          <Kicker num="C" v={about.styleTitle} />
          <p className="prose-p">
            <T v={about.style} />
          </p>
        </div>
        <div>
          <Kicker num="D" v={about.futureTitle} />
          <ul className="dash-list">
            {about.future.map((item, i) => (
              <li key={i}>
                <T v={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav className="wrap next-link" aria-label="Next section">
        <Link href="/watches" className="text-link">
          <span className="nav-num">02</span> <T v={{ en: "Continue to The Collection", zh: "继续：腕表收藏" }} /> →
        </Link>
      </nav>
    </>
  );
}
