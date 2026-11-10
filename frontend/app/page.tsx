import Image from "next/image";
import Link from "next/link";
import { GuillocheDial } from "@/components/Illustrations";
import { Both, Kicker, T } from "@/components/T";
import { artworks } from "@/content/artwork";
import { home, site } from "@/content/site";
import { publicOnly } from "@/content/types";
import { collection } from "@/content/watches";

const FEATURED_WATCHES = ["W-001", "W-005", "W-010"];

export default function HomePage() {
  const watches = publicOnly(collection).filter((w) => FEATURED_WATCHES.includes(w.id));
  const art = publicOnly(artworks).find((a) => a.id === "A-005");

  return (
    <>
      <section className="cover wrap">
        <div className="cover-text">
          <p className="edition">
            <T v={site.edition} />
          </p>
          <Kicker v={home.kicker} />
          <h1 className="display">
            <T v={home.title} />
          </h1>
          <p className="lede">
            <T v={home.lede} />
          </p>
          <Link className="text-link" href="/about">
            <T v={home.cta} /> <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <figure className="cover-figure">
          <GuillocheDial className="dial" />
          <figcaption className="caption">
            <span className="caption-num">Fig. 01</span>
            <Both
              v={{
                en: "Guilloché dial study, drawn in code for this archive",
                zh: "机刻雕花表盘研究，为本档案以代码绘制",
              }}
            />
          </figcaption>
        </figure>
      </section>

      <section className="wrap section">
        <div className="section-head section-head-center">
          <Kicker num="01–04" v={home.interestsKicker} />
          <h2 className="h-section">
            <T v={home.interestsTitle} />
          </h2>
          <p className="section-sub">Horology · Experiences · Art</p>
        </div>
        <ol className="index-list">
          {home.sections.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="index-row">
                <span className="index-num">{s.num}</span>
                <span className="index-title">
                  <T v={s.title} />
                </span>
                <span className="index-text">
                  <T v={s.text} />
                </span>
                <span className="index-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section">
        <div className="section-head section-head-center">
          <Kicker num="02" v={{ en: "From the Collection", zh: "收藏选录" }} />
          <h2 className="h-section">
            <T v={{ en: "Three watches, three ideas of time.", zh: "三块表，三种关于时间的想法。" }} />
          </h2>
        </div>
        <div className="trio">
          {watches.map((w) => (
            <Link key={w.id} href={`/watches#${w.id}`} className="trio-item">
              <div className="img-frame ratio-45">
                <Image src={w.image.src} alt={w.image.alt} width={w.image.width} height={w.image.height} sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <p className="piece-meta">
                <span className="archive-id">{w.id}</span>
                {w.reference ? <span className="piece-era">Ref. {w.reference}</span> : null}
              </p>
              <h3 className="trio-brand">{w.brand}</h3>
              <p className="piece-model">
                <T v={w.model} />
              </p>
            </Link>
          ))}
        </div>
        <p className="centered">
          <Link className="text-link" href="/watches">
            <T v={{ en: "View the full collection", zh: "查看全部收藏" }} /> →
          </Link>
        </p>
      </section>

      {art?.image ? (
        <section className="wrap section">
          <div className="studio">
            <Link href={`/artwork#${art.slug}`} className="studio-image">
              <div className="img-frame ratio-45">
                <Image src={art.image.src} alt={art.image.alt} width={art.image.width} height={art.image.height} sizes="(max-width: 900px) 100vw, 45vw" />
              </div>
            </Link>
            <div className="studio-text">
              <Kicker num="04" v={{ en: "From the Studio", zh: "画室" }} />
              <h2 className="h-section">
                <T v={{ en: "Painting as a way of looking.", zh: "绘画，是一种观看的方式。" }} />
              </h2>
              <p className="prose-p">
                <T
                  v={{
                    en: "Charcoal, oil and watercolour studies — and The Night and Time, a work about a tourbillon and the speed of a modern city.",
                    zh: "炭笔、油画和水彩习作——以及《The Night and Time》，一件关于陀飞轮与现代城市节奏的作品。",
                  }}
                />
              </p>
              <Link className="text-link" href="/artwork">
                <T v={{ en: "Enter the studio", zh: "进入画室" }} /> →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="wrap section closing">
        <p className="closing-text">
          <T v={home.closing} />
        </p>
      </section>
    </>
  );
}
