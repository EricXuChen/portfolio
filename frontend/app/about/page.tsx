import type { Metadata } from "next";
import Link from "next/link";
import { Kicker, T } from "@/components/T";
import { about } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Eric Xu — interests in mechanical watchmaking, business, art and design, and the values behind them.",
};

export default function AboutPage() {
  return (
    <>
      <header className="page-head wrap">
        <Kicker num="01" v={{ en: "About Me", zh: "个人简介" }} />
        <h1 className="display">
          <T v={about.title} />
        </h1>
      </header>

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
            <span>Archive card</span>
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

      <section className="wrap section">
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
          <span className="nav-num">02</span> <T v={{ en: "Continue to Watches & Horology", zh: "继续：腕表与制表" }} /> →
        </Link>
      </nav>
    </>
  );
}
