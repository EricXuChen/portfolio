import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DecorWatch from "@/components/DecorWatch";
import { Fleuron, Manicule } from "@/components/Deco";
import { Edge, GiantWord, Hand, Note } from "@/components/Editorial";
import PageMast from "@/components/PageMast";
import { T } from "@/components/T";
import { chapterHref, chapters } from "@/content/experiences";
import { statusLabel, trading } from "@/content/trading";
import type { Bi } from "@/content/types";

export const metadata: Metadata = {
  title: "Ongoing Projects",
  description: "Ideas still in development — systems, straps, a watch of Eric Xu's own design, and this archive itself.",
};

/* One line on each idea, taken from the case study's own record of the work. */
const FRAGMENTS: Record<string, Bi> = {
  "Independent vintage watch website": {
    en: "A site of its own for the business, planned after the marketplaces.",
    zh: "在各个线上平台之后，为这门生意规划一个属于自己的网站。",
  },
  "Inventory management automation": {
    en: "Numbering, Google Sheets and automated data entry, so every piece has a record.",
    zh: "编号、Google Sheets 和自动化数据录入，让每一块表都有记录。",
  },
  "Watch accessories & straps": {
    en: "Straps measured and drawn on the design sheet in the studio.",
    zh: "在画室的设计稿上量好尺寸、画出来的表带。",
  },
  "Distribution network": {
    en: "Working with partner sellers, with clear rules for settling results.",
    zh: "与合作卖家共同经营，并制定清晰的结算规则。",
  },
  "Independent watch design": {
    en: "From the design sheet on the studio table towards a watch of my own.",
    zh: "从画桌上的那张设计稿开始，走向一块属于自己的腕表。",
  },
};

const VOICES = ["proj-v1", "proj-v2", "proj-v3", "proj-v4", "proj-v5"];

/* Own photographs that belong to an idea. */
const PICTURES: Record<string, { src: string; width: number; height: number; alt: Bi }> = {
  "Inventory management automation": {
    src: "/objects/archive-market-finds.jpg",
    width: 1040,
    height: 1300,
    alt: { en: "Two vintage watches held in one hand", zh: "一只手里的两块老表" },
  },
  "Watch accessories & straps": {
    src: "/artworks/a-020-watch-design.jpg",
    width: 1200,
    height: 1600,
    alt: { en: "The watch and strap design sheet", zh: "腕表与表带设计稿" },
  },
};

export default function ProjectsPage() {
  const future = chapters.find((c) => c.id === "E-106");

  return (
    <>
      <PageMast
        word="IDEAS."
        num="V"
        kicker={{ en: "Ongoing Projects", zh: "进行中的项目" }}
        title={{ en: "Things still on the workbench.", zh: "仍在工作台上的东西。" }}
        lede={{
          en: "Not finished, not abandoned — ideas in development, each with an honest status. They move from planned to in progress to done, and this page changes with them.",
          zh: "没有完成，也没有放弃——都是正在发展的想法，各自标着真实的进度。它们会从“计划中”走到“进行中”再到“已完成”，这一页也会跟着更新。",
        }}
        tone="burgundy"
        voice="cond"
        stamp={{ top: "EXU · WORK IN PROGRESS", bottom: "BARCELONA · MMXXVI", mid: "→" }}
      />

      <section className="wrap projs" aria-label="Projects">
        {trading.next.map((p, i) => (
          <article key={p.title.en} className={`proj ${VOICES[i % VOICES.length]}`}>
            {p.title.en === "Independent watch design" ? <DecorWatch which="gold" className="decor-proj" /> : null}
            <p className="proj-num" aria-hidden="true">
              P-0{i + 1}
            </p>
            <h2 className="proj-name">
              <T v={p.title} />
            </h2>
            <p className={`proj-status status-${p.status}`}>
              <span className="proj-dot" aria-hidden="true" />
              <T v={statusLabel[p.status]} />
            </p>
            {FRAGMENTS[p.title.en] ? (
              <p className="proj-frag">
                <T v={FRAGMENTS[p.title.en]} />
              </p>
            ) : null}
            {PICTURES[p.title.en] ? (
              <figure className="proj-pic">
                <Image
                  src={PICTURES[p.title.en].src}
                  width={PICTURES[p.title.en].width}
                  height={PICTURES[p.title.en].height}
                  alt={PICTURES[p.title.en].alt.en}
                  sizes="(max-width: 960px) 40vw, 240px"
                />
              </figure>
            ) : null}
            {p.href ? (
              <Link href={p.href} className="proj-link mono-note">
                <Manicule className="manicule" />
                <T v={{ en: "see the sketch in the studio", zh: "去画室看草图" }} />
              </Link>
            ) : null}
          </article>
        ))}

        <article className="proj proj-archive">
          <p className="proj-num" aria-hidden="true">
            P-06
          </p>
          <h2 className="proj-name">
            <T v={{ en: "This archive", zh: "这个档案" }} />
          </h2>
          <p className="proj-status status-ongoing">
            <span className="proj-dot" aria-hidden="true" />
            <T v={statusLabel.ongoing} />
          </p>
          <p className="proj-frag">
            <T
              v={{
                en: "Designed and launched as a bilingual personal archive; it grows with every new watch, drawing and project.",
                zh: "作为双语个人档案设计并上线；每多一块表、一幅画、一个项目，它就长大一点。",
              }}
            />
          </p>
          <Hand className="proj-hand" v={{ en: "you are here ↓", zh: "你在这里 ↓" }} />
        </article>
      </section>

      {future ? (
        <section className="horizon" aria-label="Further ahead">
          <GiantWord word="Horizon" script className="horizon-word" drift={0.15} />
          <Edge className="horizon-edge">
            {future.id} · <T v={future.title} />
          </Edge>
          <div className="wrap horizon-grid">
            <Note>
              <T v={{ en: "Further ahead", zh: "更远的地方" }} />
            </Note>
            <p className="horizon-lead">
              <T v={future.background} />
            </p>
            <p className="horizon-text">
              <T v={future.process} />
            </p>
            <p className="horizon-take">
              <T v={future.takeaway} />
            </p>
            <Link className="text-link" href={chapterHref(future.id)}>
              <T v={{ en: "Read the chapter", zh: "阅读这一篇" }} /> →
            </Link>
          </div>
        </section>
      ) : null}

      <Fleuron className="fleuron fleuron-gap" />
    </>
  );
}
