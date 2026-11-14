import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fleuron } from "@/components/Deco";
import { Note } from "@/components/Editorial";
import PageMast from "@/components/PageMast";
import { T } from "@/components/T";
import type { Bi } from "@/content/types";
import { PAGE_SCENES } from "@/content/scenes";
import Scene from "@/components/Scene";
import { catalogueRows } from "@/content/catalogue";
import { letterHref } from "@/content/pages";

export const metadata: Metadata = {
  title: "The Catalogue",
  description: "Every entry in Eric Xu's personal archive on one page — watches, artworks, experiences and recognition, numbered like an old collection catalogue.",
};

type Row = { id: string; title: Bi; note?: Bi; href: string };
type Fig = { src: string; width: number; height: number; alt: string; tilt: number };

function Part({ letter, name, rows, fig }: { letter: string; name: Bi; rows: Row[]; fig?: Fig }) {
  const open = letterHref(letter.toLowerCase());
  return (
    <section className={`cat-part${fig ? " has-fig" : ""}`}>
      {fig ? (
        <figure className="cat-fig" style={{ rotate: `${fig.tilt}deg` }}>
          <Image src={fig.src} width={fig.width} height={fig.height} alt={fig.alt} sizes="220px" />
        </figure>
      ) : null}
      <div className="cat-part-head">
        <span className="cat-letter" aria-hidden="true">
          {letter}
        </span>
        <h2 className="cat-name">
          <Link href={open} className="plain-link">
            <T v={name} />
          </Link>
        </h2>
        <Note>
          {rows.length} <T v={{ en: rows.length === 1 ? "entry" : "entries", zh: "个条目" }} />
        </Note>
      </div>
      <ol className="cat-list">
        {rows.map((r) => (
          <li key={r.id + r.href}>
            <Link href={r.href} className="cat-row">
              <span className="cat-id">{r.id}</span>
              <span className="cat-title">
                <T v={r.title} />
              </span>
              <span className="cat-dots" aria-hidden="true" />
              {r.note ? (
                <span className="cat-note">
                  <T v={r.note} />
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function CataloguePage() {
  const { w: watches, a: works, e: lives, r: honours, p: projects } = catalogueRows();
  const total = watches.length + works.length + lives.length + honours.length + projects.length;

  return (
    <>
      <PageMast
        word="INDEX."
        scene={PAGE_SCENES.catalogue.mast}
        layout="frame"
        metal
        num="VI"
        kicker={{ en: "The Catalogue", zh: "总目录" }}
        title={{ en: "Everything in the archive, numbered.", zh: "档案里的一切，逐条编号。" }}
        lede={{
          en: "Like the index at the back of an old collection catalogue: every watch, work, experience and project, with its archive number. Follow any line to its page.",
          zh: "就像老式藏品目录最后的索引：每一块表、每一件作品、每一段经历和每一个项目，都有自己的档案编号。点任意一行，就能翻到那一页。",
        }}
        voice="bodoni"
        stamp={{ top: "EXU · CATALOGUE · INDEX", bottom: `${total} ENTRIES · MMXXVI`, mid: "Ix" }}
      />

      <div className="wrap cat paper-page">
        <Part letter="W" name={{ en: "Watches — the collection", zh: "W —— 腕表收藏" }} rows={watches} fig={{ src: "/collection/w-001-pole-epoch.jpg", width: 1280, height: 1600, alt: "W-001 on the wrist", tilt: 4 }} />
        <Fleuron className="fleuron" />
        <Part letter="A" name={{ en: "Artworks — finished & in progress", zh: "A —— 作品与草稿" }} rows={works} fig={{ src: "/artworks/a-001-the-night-and-time.jpg", width: 1251, height: 1600, alt: "A-001, The Night and Time", tilt: -3 }} />
        <Fleuron className="fleuron" />
        <Part letter="E" name={{ en: "Experiences — timeline & chapters", zh: "E —— 时间线与篇章" }} rows={lives} fig={{ src: "/objects/archive-newspapers.jpg", width: 1040, height: 1300, alt: "A small watch photographed on period watch advertisements", tilt: 3 }} />
        <Fleuron className="fleuron" />
        <Part letter="R" name={{ en: "Recognition", zh: "R —— 荣誉" }} rows={honours} fig={{ src: "/posters/cappiello-1922.jpg", width: 543, height: 684, alt: "", tilt: -5 }} />
        <Fleuron className="fleuron" />
        <Part letter="P" name={{ en: "Projects", zh: "P —— 项目" }} rows={projects} fig={{ src: "/artworks/a-020-watch-design.jpg", width: 1200, height: 1600, alt: "A watch and strap design sheet", tilt: 2 }} />
        <p className="cat-colophon mono-note">
          <T v={{ en: "Set in Bodoni Moda, Instrument Serif, Pinyon Script and DM Mono. See the", zh: "排印字体：Bodoni Moda、Instrument Serif、Pinyon Script 与 DM Mono。详见" }} />{" "}
          <Link href="/colophon" className="plain-link">
            <T v={{ en: "colophon", zh: "版本说明" }} />
          </Link>
          .
        </p>
      </div>
      <Scene use={PAGE_SCENES.catalogue.frieze} />
    </>
  );
}
