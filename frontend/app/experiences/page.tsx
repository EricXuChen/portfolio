import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveTag, Kicker, T } from "@/components/T";
import Timeline from "@/components/Timeline";
import { categoryLabel, chapters, experiencesIntro, recognition } from "@/content/experiences";
import { trading } from "@/content/trading";
import Image from "next/image";
import { posters } from "@/content/antiques";
import { publicOnly } from "@/content/types";

export const metadata: Metadata = {
  title: "Life Experiences",
  description:
    "A timeline of projects and turning points — vintage watch entrepreneurship, business systems, debate and MUN, and international education.",
};

export default function ExperiencesPage() {
  return (
    <>
      <header className="page-head wrap page-head-poster">
        <div className="poster-bg" aria-hidden="true">
          <Image src={posters.zenith.src} width={posters.zenith.width} height={posters.zenith.height} alt="" sizes="560px" priority />
        </div>
        <Kicker num="03" v={{ en: "Experiences", zh: "经历" }} />
        <h1 className="display">
          <T v={experiencesIntro.title} />
        </h1>
        <p className="lede">
          <T v={experiencesIntro.lede} />
        </p>
      </header>

      <section className="wrap feature-band" aria-label="Case study">
        <Link href={`/experiences/${trading.slug}`} className="case-card corners">
          <span className="case-card-kicker">
            <T v={{ en: "Featured case study", zh: "重点案例" }} />
          </span>
          <span className="case-card-title">
            <T v={trading.title} />
          </span>
          <span className="case-card-role">
            <T v={trading.role} />
          </span>
          <span className="case-card-stats">
            {trading.results.slice(0, 3).map((r) => (
              <span key={r.label.en}>
                <b>{r.figure}</b> <T v={r.label} />
              </span>
            ))}
          </span>
          <span className="text-link">
            <T v={{ en: "Read the case study", zh: "阅读案例" }} /> →
          </span>
        </Link>
      </section>

      <section className="wrap section band-ivory" aria-labelledby="tl-title">
        <div className="section-head">
          <Kicker num="A" v={{ en: "Timeline", zh: "时间线" }} />
          <h2 id="tl-title" className="h-section">
            <T v={{ en: "2025 — today", zh: "2025 年至今" }} />
          </h2>
        </div>
        <Timeline />
      </section>

      <section className="wrap section" aria-labelledby="rec-title">
        <div className="section-head">
          <Kicker num="B" v={{ en: "Recognition", zh: "荣誉" }} />
          <h2 id="rec-title" className="h-section">
            <T v={{ en: "Results that can be verified.", zh: "可以核实的成果。" }} />
          </h2>
        </div>
        <ul className="recognition">
          {publicOnly(recognition).map((r) => (
            <li key={r.id} id={r.id} className="recog">
              <span className="recog-year">{r.year}</span>
              <div className="recog-body">
                <p className="recog-award">
                  <T v={r.award} /> · <T v={r.field} />
                </p>
                <h3 className="h-card h-card-lg">
                  <T v={r.title} />
                </h3>
                <p className="recog-work">
                  <T v={{ en: `“${r.work.en}”`, zh: `《${r.work.zh}》` }} />
                </p>
                <p className="recog-note">
                  <T v={r.note} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section band-ivory">
        <div className="section-head">
          <Kicker num="C" v={{ en: "Chapters", zh: "经历章节" }} />
          <h2 className="h-section">
            <T v={{ en: "Background, process, takeaway.", zh: "背景、过程与收获。" }} />
          </h2>
        </div>
        <div className="chapters">
          {publicOnly(chapters).map((ch) => (
            <article key={ch.id} id={ch.id} className="chapter">
              <ArchiveTag id={ch.id} updated={ch.updated} />
              <p className="chapter-cat">
                <T v={categoryLabel[ch.category]} />
              </p>
              <h3 className="h-card h-card-lg">
                <T v={ch.title} />
              </h3>
              <dl className="chapter-dl">
                <div>
                  <dt>
                    <T v={{ en: "Background", zh: "背景" }} />
                  </dt>
                  <dd>
                    <T v={ch.background} />
                  </dd>
                </div>
                <div>
                  <dt>
                    <T v={{ en: "Process", zh: "过程" }} />
                  </dt>
                  <dd>
                    <T v={ch.process} />
                  </dd>
                </div>
                <div>
                  <dt>
                    <T v={{ en: "Takeaway", zh: "收获" }} />
                  </dt>
                  <dd>
                    <T v={ch.takeaway} />
                  </dd>
                </div>
              </dl>
              {ch.category === "entrepreneurship" ? (
                <Link href={`/experiences/${trading.slug}`} className="text-link chapter-link">
                  <T v={{ en: "Read the case study", zh: "阅读完整案例" }} /> →
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <nav className="wrap next-link" aria-label="Next section">
        <Link href="/artwork" className="text-link">
          <span className="nav-num">04</span> <T v={{ en: "Continue to Artwork", zh: "继续：艺术作品" }} /> →
        </Link>
      </nav>
    </>
  );
}
