import type { Metadata } from "next";
import Link from "next/link";
import ArtImage from "@/components/ArtImage";
import { TourbillonNight } from "@/components/Illustrations";
import { ArchiveTag, Both, Kicker, T } from "@/components/T";
import { artworkIntro, artworks } from "@/content/artwork";
import { publicOnly } from "@/content/types";

export const metadata: Metadata = {
  title: "Artwork & Creativity",
  description:
    "Paintings, drawings and The Night and Time — artwork by Eric Xu with concept, process and reflection for each piece.",
};

export default function ArtworkPage() {
  const works = publicOnly(artworks);
  const featured = works.find((w) => w.featured);
  const gallery = works.filter((w) => !w.featured);

  return (
    <>
      <header className="page-head wrap">
        <Kicker num="04" v={{ en: "Artwork", zh: "艺术作品" }} />
        <h1 className="display">
          <T v={artworkIntro.title} />
        </h1>
        <p className="lede">
          <T v={artworkIntro.lede} />
        </p>
      </header>

      <section className="wrap section split-2 split-wide statement">
        <Kicker num="A" v={artworkIntro.statementTitle} />
        <div className="prose prose-lg">
          {artworkIntro.statement.map((p, i) => (
            <p key={i}>
              <T v={p} />
            </p>
          ))}
        </div>
      </section>

      {featured ? (
        <section id={featured.slug} className="featured-work">
          <div className="wrap featured-inner">
            <figure className="featured-figure">
              <TourbillonNight className="night" />
              <figcaption className="caption caption-light">
                <span className="caption-num">Fig. 03</span>
                <Both
                  v={{
                    en: "Motif study for The Night and Time — photograph of the work to be added",
                    zh: "《The Night and Time》母题草图——作品照片待添加",
                  }}
                />
              </figcaption>
            </figure>
            <div className="featured-text">
              <ArchiveTag id={featured.id} updated={featured.updated} />
              <p className="kicker kicker-light">
                <T v={{ en: "Featured work", zh: "重点作品" }} />
              </p>
              <h2 className="h-feature">{featured.title}</h2>
              <p className="title-zh">《{featured.titleZh}》</p>
              <dl className="work-dl">
                <div>
                  <dt>
                    <T v={{ en: "Concept", zh: "创作理念" }} />
                  </dt>
                  <dd>
                    <T v={featured.concept} />
                  </dd>
                </div>
                {featured.inspiration ? (
                  <div>
                    <dt>
                      <T v={{ en: "Inspiration", zh: "灵感来源" }} />
                    </dt>
                    <dd>
                      <T v={featured.inspiration} />
                    </dd>
                  </div>
                ) : null}
              </dl>
              {featured.symbols ? (
                <>
                  <h3 className="h-small h-small-light">
                    <T v={{ en: "Symbols in the work", zh: "作品中的象征" }} />
                  </h3>
                  <ul className="dash-list">
                    {featured.symbols.map((s) => (
                      <li key={s.en}>
                        <T v={s} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="wrap section" aria-label="Portfolio">
        <div className="section-head">
          <Kicker num="B" v={{ en: "Portfolio", zh: "作品集" }} />
          <h2 className="h-section">
            <T v={{ en: "Studio work, 2025.", zh: "2025 年画室作品。" }} />
          </h2>
        </div>

        <div className="works">
          {gallery.map((w, i) => (
            <article key={w.id} id={w.slug} className={`work${i % 2 ? " work-flip" : ""}`}>
              {w.image ? (
                <figure className="work-figure">
                  <ArtImage
                    src={w.image.src}
                    width={w.image.width}
                    height={w.image.height}
                    alt={w.image.alt}
                    priority={i === 0}
                    caption={
                      <Both
                        v={{
                          en: `${w.title}, ${w.year ?? ""} — ${w.medium?.en ?? ""}`,
                          zh: `《${w.titleZh}》，${w.year ?? ""} — ${w.medium?.zh ?? ""}`,
                        }}
                      />
                    }
                  />
                  <figcaption className="caption">
                    <span className="caption-num">{w.id}</span>
                    <Both
                      v={{
                        en: `${w.title}, ${w.year ?? ""}`,
                        zh: `《${w.titleZh}》，${w.year ?? ""}`,
                      }}
                    />
                  </figcaption>
                </figure>
              ) : null}

              <div className="work-text">
                <ArchiveTag id={w.id} updated={w.updated} />
                <h3 className="h-work">{w.title}</h3>
                <p className="title-zh">《{w.titleZh}》</p>
                <dl className="work-facts">
                  {w.year ? (
                    <div>
                      <dt>
                        <T v={{ en: "Year", zh: "年份" }} />
                      </dt>
                      <dd>{w.year}</dd>
                    </div>
                  ) : null}
                  {w.medium ? (
                    <div>
                      <dt>
                        <T v={{ en: "Medium", zh: "媒介" }} />
                      </dt>
                      <dd>
                        <T v={w.medium} />
                      </dd>
                    </div>
                  ) : null}
                  {w.support ? (
                    <div>
                      <dt>
                        <T v={{ en: "Support", zh: "载体" }} />
                      </dt>
                      <dd>
                        <T v={w.support} />
                      </dd>
                    </div>
                  ) : null}
                </dl>
                <dl className="work-dl">
                  <div>
                    <dt>
                      <T v={{ en: "Concept", zh: "创作理念" }} />
                    </dt>
                    <dd>
                      <T v={w.concept} />
                    </dd>
                  </div>
                  {w.process ? (
                    <div>
                      <dt>
                        <T v={{ en: "Process", zh: "创作过程" }} />
                      </dt>
                      <dd>
                        <T v={w.process} />
                      </dd>
                    </div>
                  ) : null}
                  {w.reflection ? (
                    <div>
                      <dt>
                        <T v={{ en: "Reflection", zh: "创作后的思考" }} />
                      </dt>
                      <dd>
                        <T v={w.reflection} />
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <nav className="wrap next-link" aria-label="Back to start">
        <Link href="/" className="text-link">
          <T v={{ en: "Back to the cover", zh: "回到首页" }} /> ↑
        </Link>
      </nav>
    </>
  );
}
