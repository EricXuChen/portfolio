import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Kicker, T } from "@/components/T";
import { artworks } from "@/content/artwork";
import { blurFor } from "@/content/placeholders";
import { about } from "@/content/site";
import { publicOnly } from "@/content/types";

export const metadata: Metadata = {
  title: "About",
  description: "About Eric Xu — interests in mechanical watchmaking, business, art and design, and the values behind them.",
};

export default function AboutPage() {
  const deskWork = publicOnly(artworks).find((a) => a.slug === "watch-and-strap-design");
  const desk = deskWork?.images?.[0];

  return (
    <>
      <header className="page-head wrap">
        <Kicker num="01" v={{ en: "About Me", zh: "个人简介" }} />
        <h1 className="display">
          <T v={about.title} />
        </h1>
      </header>

      <section className="wrap about-intro band-ivory">
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
          {about.interests.map((item) => (
            <article key={item.title.en} className="plain-card">
              <h3 className="h-card">
                <T v={item.title} />
              </h3>
              <p>
                <T v={item.text} />
              </p>
            </article>
          ))}
        </div>
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
          {about.values.map((v) => (
            <li key={v.num}>
              <span className="value-num">{v.num}</span>
              <div>
                <h3 className="h-card">
                  <T v={v.title} />
                </h3>
                <p>
                  <T v={v.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section split-2 band-ivory">
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
