import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Figure } from "@/components/Figure";
import { Kicker, T } from "@/components/T";
import { blurFor } from "@/content/placeholders";
import { statusLabel, trading } from "@/content/trading";
import Scene from "@/components/Scene";
import { PAGE_SCENES } from "@/content/scenes";

export const metadata: Metadata = {
  title: "Vintage Watch Trading — Case Study",
  description:
    "Eric Xu's independent vintage watch business in Barcelona: sourcing, evaluation, photography and listing, sales and business management — 50+ completed sales.",
  alternates: { canonical: `/experiences/${trading.slug}` },
};

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/* Photographs from my own archive (no prices, places or people). */
const ARCHIVE = [
  {
    src: "/objects/archive-market-finds.jpg",
    alt: "Two vintage gold watches held in one hand",
    caption: { en: "Vintage finds: two gold dress watches", zh: "淘到的老表：两枚金色正装表" },
  },
  {
    src: "/objects/archive-newspapers.jpg",
    alt: "A small trench-style watch on a striped strap, photographed on old Spanish watch advertisements",
    caption: { en: "Photographed on period watch advertisements", zh: "以老式腕表广告为背景拍摄" },
  },
  {
    src: "/objects/archive-raketa.jpg",
    alt: "A Soviet-era calendar watch with a burgundy sunburst dial on the wrist",
    caption: { en: "A Soviet-era calendar watch, worn", zh: "佩戴中的一枚苏联时代日历表" },
  },
];

export default function TradingPage() {
  return (
    <>
      <header className="photo-band photo-band-head">
        <div className="photo-band-media">
          <Image
            data-parallax="0.08"
            src="/objects/archive-market-finds-wide.jpg"
            width={1920}
            height={1080}
            alt="Two vintage gold watches held in an open hand"
            sizes="100vw"
            priority
            placeholder={blurFor("/objects/archive-market-finds-wide.jpg") ? "blur" : "empty"}
            blurDataURL={blurFor("/objects/archive-market-finds-wide.jpg")}
          />
        </div>
        <div className="photo-band-inner wrap">
          <div className="project-text">
            <p className="crumbs">
              <Link href="/experiences">
                <T v={{ en: "Life Experiences", zh: "人生经历" }} />
              </Link>
              <span className="crumbs-sep" aria-hidden="true">
                /
              </span>
              <span>
                <T v={trading.kicker} />
              </span>
            </p>
            <h1 className="display">
              <T v={trading.title} />
            </h1>
            <p className="role-line">
              <T v={trading.role} />
            </p>
            <p className="lede">
              <T v={trading.lede} />
            </p>
          </div>
        </div>
      </header>

      <section className="wrap section results band-ivory" aria-label="Results">
        <ul className="stat-row">
          {trading.results.map((r) => (
            <li key={r.label.en} className="stat">
              <Figure className="stat-figure" value={r.figure} />
              <span className="stat-label">
                <T v={r.label} />
              </span>
              <span className="stat-note">
                <T v={r.note} />
              </span>
            </li>
          ))}
        </ul>
        <p className="fine-print">
          <T v={trading.resultsNote} />
        </p>
      </section>

      <section className="wrap section split-2 split-wide">
        <div>
          <Kicker num="A" v={{ en: "Overview", zh: "概况" }} />
          <dl className="ledger ledger-compact">
            {trading.facts.map((f) => (
              <div key={f.label.en}>
                <dt>
                  <T v={f.label} />
                </dt>
                <dd>
                  <T v={f.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="prose prose-lg">
          {trading.intro.map((p) => (
            <p key={p.en}>
              <T v={p} />
            </p>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <Kicker num="B" v={{ en: "How it works", zh: "运作方式" }} />
          <h2 className="h-section">
            <T v={{ en: "From the market to the buyer.", zh: "从市场到买家。" }} />
          </h2>
        </div>
        <ol className="steps">
          {trading.operations.map((o, i) => (
            <li key={o.title.en} className="step">
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-card">
                <T v={o.title} />
              </h3>
              <p>
                <T v={o.text} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <Scene use={PAGE_SCENES.caseStudy.frieze} />
      <section className="wrap section">
        <div className="section-head">
          <Kicker num="C" v={{ en: "Brands handled", zh: "经手品牌" }} />
          <h2 className="h-section">
            <T v={{ en: "Fourteen brands, two traditions.", zh: "十四个品牌，两种传统。" }} />
          </h2>
        </div>
        <div className="brand-groups">
          {trading.brands.map((g) => (
            <div key={g.group.en} className="brand-group">
              <p className="h-small">
                <T v={g.group} />
              </p>
              <p className="brand-count">
                <Figure value={g.count} />
              </p>
              <p className="brand-note">
                <T v={g.note} />
              </p>
            </div>
          ))}
        </div>
        <ul className="archive-strip" aria-label="From the archive">
          {ARCHIVE.map((a) => (
            <li key={a.src}>
              <figure>
                <div className="velvet corners">
                  <Image
                    src={a.src}
                    width={1040}
                    height={1300}
                    alt={a.alt}
                    sizes="(max-width: 640px) 50vw, 30vw"
                    placeholder={blurFor(a.src) ? "blur" : "empty"}
                    blurDataURL={blurFor(a.src)}
                  />
                </div>
                <figcaption className="caption">
                  <T v={a.caption} />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section split-2 split-wide">
        <div>
          <Kicker num="D" v={{ en: "Development", zh: "发展阶段" }} />
          <h2 className="h-section">
            <T v={{ en: "Step by step.", zh: "一步一步。" }} />
          </h2>
        </div>
        <ol className="stages">
          {trading.stages.map((s, i) => (
            <li key={s.title.en} className={`stage is-${s.status}`}>
              <span className="stage-num">{roman[i]}</span>
              <div>
                <h3 className="h-card">
                  <T v={s.title} />
                </h3>
                <p>
                  <T v={s.text} />
                </p>
              </div>
              <span className={`status status-${s.status}`}>
                <T v={statusLabel[s.status]} />
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <Kicker num="E" v={{ en: "What comes next", zh: "接下来" }} />
          <h2 className="h-section">
            <T v={{ en: "Ongoing and planned.", zh: "进行中与计划中。" }} />
          </h2>
        </div>
        <ul className="next-grid">
          {trading.next.map((n) => {
            const body = (
              <>
                <span className={`status status-${n.status}`}>
                  <T v={statusLabel[n.status]} />
                </span>
                <span className="next-title">
                  <T v={n.title} />
                </span>
                {n.href ? (
                  <span className="next-more">
                    <T v={{ en: "See the design study", zh: "看设计稿" }} /> →
                  </span>
                ) : null}
              </>
            );
            return (
              <li key={n.title.en}>
                {n.href ? (
                  <Link href={n.href} className="next-card">
                    {body}
                  </Link>
                ) : (
                  <div className="next-card">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <nav className="wrap next-link" aria-label="Back">
        <Link href="/experiences" className="text-link">
          ← <T v={{ en: "Back to Life Experiences", zh: "返回人生经历" }} />
        </Link>
      </nav>
    </>
  );
}
