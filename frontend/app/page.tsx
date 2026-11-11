import Image from "next/image";
import Link from "next/link";
import { Rocaille, Sunburst } from "@/components/Deco";
import DecorWatch from "@/components/DecorWatch";
import { Figure } from "@/components/Figure";
import FloatingWatch from "@/components/FloatingWatch";
import { Kicker, T } from "@/components/T";
import { posters } from "@/content/antiques";
import { artworks } from "@/content/artwork";
import { recognition } from "@/content/experiences";
import { trading } from "@/content/trading";
import { home, site } from "@/content/site";
import { blurFor } from "@/content/placeholders";
import { publicOnly } from "@/content/types";
import { collection, pieceHref } from "@/content/watches";

const FEATURED_WATCHES = ["W-001", "W-005", "W-010"];

export default function HomePage() {
  const watches = publicOnly(collection).filter((w) => FEATURED_WATCHES.includes(w.id));
  const studioWork = publicOnly(artworks).find((a) => a.slug === "ink-and-water-venice");
  const studio = studioWork?.images?.[0];
  const award = publicOnly(recognition)[0];

  return (
    <>
      <section className="cover-band">
      <DecorWatch which="silver" className="decor-cover" />
      <div className="cover wrap">
        <div className="cover-text">
          <p className="edition">
            <T v={site.edition} />
          </p>
          <Kicker v={home.kicker} />
          <h1 className="display">
            <T v={home.title} />
          </h1>
          <p className="role-line">
            <T v={home.roles} />
          </p>
          <p className="lede">
            <T v={home.lede} />
          </p>
          <Link className="text-link" href="/about">
            <T v={home.cta} /> <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <figure className="cover-figure">
          <Sunburst className="cover-sun" rays={44} />
          <Link href={pieceHref("W-010")} className="arch">
            <Image
              src="/objects/nicolai-schultz-dial.jpg"
              width={1280}
              height={1600}
              alt="Nicolai Schultz silver pocket watch from Helsingør on burgundy velvet, beside sheet music"
              priority
              sizes="(max-width: 960px) 80vw, 440px"
              placeholder={blurFor("/objects/nicolai-schultz-dial.jpg") ? "blur" : "empty"}
              blurDataURL={blurFor("/objects/nicolai-schultz-dial.jpg")}
            />
          </Link>
          <figcaption className="caption">
            <span className="caption-num">W-010</span>
            <T v={{ en: "Nicolai Schultz, Helsingør — from my collection", zh: "Nicolai Schultz，赫尔辛格——我的收藏" }} />
          </figcaption>
        </figure>
      </div>
      </section>

      <section className="wrap section band-ivory">
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

      <section className="wrap section has-decor">
        <DecorWatch which="gold" className="decor-trio" />
        <div className="section-head section-head-center">
          <Kicker num="02" v={{ en: "From the Collection", zh: "收藏选录" }} />
          <h2 className="h-section">
            <T v={{ en: "Three watches, three ideas of time.", zh: "三块表，三种关于时间的想法。" }} />
          </h2>
        </div>
        <div className="trio">
          {watches.map((w) => (
            <Link key={w.id} href={pieceHref(w.id)} className="trio-item case">
              <div className="velvet">
                <div className="img-frame ratio-45">
                  <Image
                    src={w.image.src}
                    alt={w.image.alt}
                    width={w.image.width}
                    height={w.image.height}
                    sizes="(max-width: 900px) 100vw, 33vw"
                    placeholder={blurFor(w.image.src) ? "blur" : "empty"}
                    blurDataURL={blurFor(w.image.src)}
                  />
                </div>
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

      <figure className="interlude">
        <div className="interlude-media">
          <Image
            data-parallax="0.12"
            src="/objects/nicolai-schultz-movement.jpg"
            width={1920}
            height={1280}
            alt="The open movement of the Nicolai Schultz pocket watch: gilt plates, a balance and two winding wheels"
            sizes="100vw"
            placeholder={blurFor("/objects/nicolai-schultz-movement.jpg") ? "blur" : "empty"}
            blurDataURL={blurFor("/objects/nicolai-schultz-movement.jpg")}
          />
        </div>
        <figcaption className="interlude-text wrap">
          <span className="interlude-line">
            <T v={{ en: "An appreciation for mechanical precision.", zh: "对机械精密的敬意。" }} />
          </span>
          <span className="caption">
            <span className="caption-num">W-010</span>
            <T v={{ en: "Nicolai Schultz, Helsingør — the movement", zh: "Nicolai Schultz，赫尔辛格——机芯" }} />
          </span>
        </figcaption>
      </figure>

      <FloatingWatch />

      <section className="photo-band" aria-label="Selected project">
        <div className="photo-band-media">
          <Image
            data-parallax="0.08"
            src="/objects/archive-market-finds-wide.jpg"
            width={1920}
            height={1080}
            alt="Two vintage gold watches held in an open hand"
            sizes="100vw"
            placeholder={blurFor("/objects/archive-market-finds-wide.jpg") ? "blur" : "empty"}
            blurDataURL={blurFor("/objects/archive-market-finds-wide.jpg")}
          />
        </div>
        <div className="photo-band-inner wrap">
          <div className="project-text">
            <Kicker num="03" v={{ en: "Selected Project", zh: "精选项目" }} />
            <h2 className="display display-md">
              <T v={trading.title} />
            </h2>
            <p className="role-line">
              <T v={trading.role} />
            </p>
            <p className="prose-p">
              <T v={trading.lede} />
            </p>
            <ul className="stat-row stat-row-overlay">
              {trading.results.map((r) => (
                <li key={r.label.en} className="stat">
                  <Figure className="stat-figure" value={r.figure} />
                  <span className="stat-label">
                    <T v={r.label} />
                  </span>
                </li>
              ))}
            </ul>
            <Link className="text-link" href={`/experiences/${trading.slug}`}>
              <T v={{ en: "Read the case study", zh: "阅读案例" }} /> →
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap award-wrap">
        {award ? (
          <Link href={`/experiences#${award.id}`} className="award-line">
            <span className="award-kicker">
              <T v={{ en: "Recognition", zh: "荣誉" }} />
            </span>
            <span className="award-text">
              <T v={{ en: `${award.title.en} ${award.year}`, zh: `${award.year} ${award.title.zh}` }} />
              <span className="award-sep"> — </span>
              <T v={award.award} /> · <T v={award.field} />
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </section>

      {studio && studioWork ? (
        <section className="wrap section band-ivory">
          <div className="studio">
            <Link href={`/artwork#${studioWork.slug}`} className="studio-image">
              <div className="img-frame">
                <Image
                  src={studio.src}
                  alt={studio.alt}
                  width={studio.width}
                  height={studio.height}
                  sizes="(max-width: 900px) 100vw, 55vw"
                  placeholder={blurFor(studio.src) ? "blur" : "empty"}
                  blurDataURL={blurFor(studio.src)}
                />
              </div>
              <span className="caption">
                <span className="caption-num">{studioWork.id}</span>
                <T v={{ en: `${studioWork.title}, ${studioWork.year}`, zh: `《${studioWork.titleZh}》，${studioWork.year}` }} />
              </span>
            </Link>
            <div className="studio-text">
              <Kicker num="04" v={{ en: "From the Studio", zh: "画室" }} />
              <h2 className="h-section">
                <T v={{ en: "Drawing as a way of looking.", zh: "绘画，是一种观看的方式。" }} />
              </h2>
              <p className="prose-p">
                <T
                  v={{
                    en: "Ink, charcoal, pastel and watercolour — finished pieces, sketches still on the table, and The Night and Time, a work about a tourbillon and the speed of a modern city.",
                    zh: "墨水、炭笔、色粉与水彩——完成的作品、还在画桌上的草稿，以及《The Night and Time》，一件关于陀飞轮与现代城市节奏的作品。",
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

      <section className="wrap section closing band-deep">
        <div className="closing-inner">
          <figure className="poster-print">
            <Image
              src={posters.election.src}
              width={posters.election.width}
              height={posters.election.height}
              alt={posters.election.alt}
              sizes="220px"
            />
            <figcaption className="caption">
              <T v={{ en: "Leonetto Cappiello, poster, c. 1922", zh: "Leonetto Cappiello，海报，约 1922 年" }} />
            </figcaption>
          </figure>
          <div className="closing-body">
            <Rocaille className="rocaille" />
            <p className="closing-text">
              <T v={home.closing} />
            </p>
            <Link className="text-link" href="/about">
              <T v={{ en: "Read about me", zh: "了解我" }} /> →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
