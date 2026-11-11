import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ArtImage from "@/components/ArtImage";
import Gallery, { type GalleryItem } from "@/components/Gallery";
import { TourbillonNight } from "@/components/Illustrations";
import { ArchiveTag, Kicker, T } from "@/components/T";
import { type Artwork, artworkIntro, artworks } from "@/content/artwork";
import { blurFor } from "@/content/placeholders";
import { publicOnly } from "@/content/types";

export const metadata: Metadata = {
  title: "Artwork & Creativity",
  description:
    "Paintings, drawings and The Night and Time — artwork by Eric Xu with concept, process and reflection for each piece.",
};

/* Turn an archive entry into what the gallery wall and viewer need. */
function toItem(w: Artwork): GalleryItem {
  const texts = [
    { label: { en: "About the work", zh: "关于作品" }, body: w.note },
    { label: { en: "Concept", zh: "创作理念" }, body: w.concept },
    { label: { en: "Process", zh: "创作过程" }, body: w.process },
    { label: { en: "Reflection", zh: "创作后的思考" }, body: w.reflection },
  ].filter((t): t is { label: { en: string; zh: string }; body: { en: string; zh: string } } => Boolean(t.body));
  return {
    id: w.id,
    slug: w.slug,
    title: w.title,
    titleZh: w.titleZh,
    year: w.year,
    medium: w.medium,
    kind: w.kind,
    draft: w.status === "draft",
    texts,
    views: (w.images ?? []).map((im) => ({ ...im, blur: blurFor(im.src) })),
  };
}

export default function ArtworkPage() {
  const works = publicOnly(artworks);
  const featured = works.find((w) => w.featured);
  const withPhotos = works.filter((w) => !w.featured && w.images?.length);
  const finished = withPhotos.filter((w) => w.status !== "draft");
  const drafts = withPhotos.filter((w) => w.status === "draft");
  const banner = artworkIntro.banner;

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

      <figure className="wrap plate">
        <div className="plate-frame">
          <Image
            src={banner.src}
            width={banner.width}
            height={banner.height}
            alt={banner.alt}
            priority
            sizes="(max-width: 1240px) 100vw, 1180px"
            placeholder={blurFor(banner.src) ? "blur" : "empty"}
            blurDataURL={blurFor(banner.src)}
          />
        </div>
        <figcaption className="caption">
          <span className="caption-num">Fig. 02</span>
          <T v={banner.caption} />
        </figcaption>
      </figure>

      <section className="wrap section split-2 split-wide statement band-ivory">
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
              {featured.images?.[0] ? (
                <div className="velvet corners">
                  <ArtImage
                    src={featured.images[0].src}
                    width={featured.images[0].width}
                    height={featured.images[0].height}
                    alt={featured.images[0].alt}
                    sizes="(max-width: 960px) 100vw, 46vw"
                    blurDataURL={blurFor(featured.images[0].src)}
                    caption={<T v={{ en: `${featured.title} — ${featured.medium?.en ?? ""}`, zh: `《${featured.titleZh}》——${featured.medium?.zh ?? ""}` }} />}
                  />
                </div>
              ) : (
                <TourbillonNight className="night" />
              )}
              <figcaption className="caption caption-light">
                <span className="caption-num">{featured.id}</span>
                <T
                  v={{
                    en: `${featured.title}${featured.medium ? `, ${featured.medium.en.toLowerCase()}` : ""}`,
                    zh: `《${featured.titleZh}》${featured.medium ? `，${featured.medium.zh}` : ""}`,
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
                {featured.concept ? (
                  <div>
                    <dt>
                      <T v={{ en: "Concept", zh: "创作理念" }} />
                    </dt>
                    <dd>
                      <T v={featured.concept} />
                    </dd>
                  </div>
                ) : null}
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

      <section className="wrap section band-ivory" aria-label="Gallery">
        <div className="section-head">
          <Kicker num="B" v={{ en: "Gallery", zh: "画廊" }} />
          <h2 className="h-section">
            <T v={{ en: "Drawings and paintings, 2024 — 2026.", zh: "2024—2026 年的素描与绘画。" }} />
          </h2>
        </div>
        <Gallery items={finished.map(toItem)} filters label="Gallery" />
      </section>

      <section className="wrap section drafts" aria-label="Drafts">
        <div className="section-head">
          <Kicker num="C" v={{ en: "Drafts & works in progress", zh: "草稿与进行中的作品" }} />
          <h2 className="h-section">
            <T v={{ en: "Unfinished, on purpose.", zh: "尚未完成的部分。" }} />
          </h2>
          <p className="section-sub-text">
            <T v={artworkIntro.draftsLede} />
          </p>
        </div>
        <Gallery items={drafts.map(toItem)} label="Drafts" />
      </section>

      <nav className="wrap next-link" aria-label="Back to start">
        <Link href="/" className="text-link">
          <T v={{ en: "Back to the cover", zh: "回到首页" }} /> ↑
        </Link>
      </nav>
    </>
  );
}
