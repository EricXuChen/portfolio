import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveTag, Kicker, T } from "@/components/T";
import Timeline from "@/components/Timeline";
import { categoryLabel, chapters, experiencesIntro } from "@/content/experiences";
import { publicOnly } from "@/content/types";

export const metadata: Metadata = {
  title: "Life Experiences",
  description:
    "A timeline of projects and turning points — vintage watch entrepreneurship, business systems, debate and MUN, and international education.",
};

export default function ExperiencesPage() {
  return (
    <>
      <header className="page-head wrap">
        <Kicker num="03" v={{ en: "Experiences", zh: "经历" }} />
        <h1 className="display">
          <T v={experiencesIntro.title} />
        </h1>
        <p className="lede">
          <T v={experiencesIntro.lede} />
        </p>
      </header>

      <section className="wrap section" aria-labelledby="tl-title">
        <div className="section-head">
          <Kicker num="A" v={{ en: "Timeline", zh: "时间线" }} />
          <h2 id="tl-title" className="h-section">
            <T v={{ en: "2025 — today", zh: "2025 年至今" }} />
          </h2>
        </div>
        <Timeline />
      </section>

      <section className="wrap section">
        <div className="section-head">
          <Kicker num="B" v={{ en: "Chapters", zh: "经历章节" }} />
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
