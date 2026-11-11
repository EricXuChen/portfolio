import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DecorWatch from "@/components/DecorWatch";
import { Fleuron, Stamp } from "@/components/Deco";
import { Note } from "@/components/Editorial";
import PageMast from "@/components/PageMast";
import { T } from "@/components/T";
import type { Bi } from "@/content/types";

export const metadata: Metadata = {
  title: "Colophon",
  description: "How the EXU. personal archive is made: its typefaces, colours, pictures and rules.",
};

const FACES: { name: string; cls: string; role: Bi; sample: string }[] = [
  { name: "Bodoni Moda", cls: "face-bodoni", role: { en: "Giant words, titles", zh: "巨型单词与标题" }, sample: "Time & Objects" },
  { name: "Instrument Serif", cls: "face-instrument", role: { en: "Italics, asides, the voice", zh: "斜体、旁白与语气" }, sample: "a way of looking" },
  { name: "Cormorant Garamond", cls: "face-cormorant", role: { en: "Long reading", zh: "长段阅读" }, sample: "Learning by doing" },
  { name: "Antonio", cls: "face-antonio", role: { en: "Condensed headlines, figures", zh: "窄体标题与数字" }, sample: "MECHANISM 1890" },
  { name: "DM Mono", cls: "face-mono", role: { en: "Archive numbers, notes", zh: "档案编号与注释" }, sample: "W-010 / ref. —" },
  { name: "Pinyon Script", cls: "face-caveat", role: { en: "Hand-written margins, flourishes", zh: "手写批注与花体" }, sample: "each one stays for a reason" },
  { name: "Noto Serif SC", cls: "face-noto", role: { en: "Chinese", zh: "中文" }, sample: "时间 · 物件 · 经历" },
];

const INKS: { name: string; hex: string; role: Bi }[] = [
  { name: "Burgundy", hex: "#54252D", role: { en: "the chapters", zh: "篇章" } },
  { name: "Ivory", hex: "#F3EFE6", role: { en: "the paper", zh: "纸张" } },
  { name: "Champagne", hex: "#C5A477", role: { en: "the metal", zh: "金属" } },
  { name: "Ink", hex: "#2A1014", role: { en: "the shadows", zh: "阴影" } },
];

export default function ColophonPage() {
  return (
    <>
      <PageMast
        word="Colophon."
        metal
        num="—"
        kicker={{ en: "How this archive is made", zh: "这个档案是怎样做成的" }}
        title={{ en: "Types, inks and rules.", zh: "字体、颜色与规矩。" }}
        lede={{
          en: "Old books end with a colophon: a note on the type it was set in, the paper and the press. This is the web version.",
          zh: "老书的最后一页常有一段版本说明：用了什么字体、什么纸、在哪里印刷。这是它的网页版。",
        }}
        voice="italic"
        stamp={{ top: "EXU · COLOPHON", bottom: "SET IN BARCELONA", mid: "Fin" }}
      >
        <DecorWatch which="silver" className="decor-mast" />
      </PageMast>

      <section className="wrap colo" aria-label="Typefaces">
        <div className="colo-head">
          <Note>I — <T v={{ en: "Typefaces", zh: "字体" }} /></Note>
          <p className="colo-sub">
            <T v={{ en: "Seven voices, each with one job.", zh: "七种声音，各司其职。" }} />
          </p>
        </div>
        <ul className="faces">
          {FACES.map((f) => (
            <li key={f.name} className={`face ${f.cls}`}>
              <span className="face-sample">{f.sample}</span>
              <span className="face-name mono-note">{f.name}</span>
              <span className="face-role">
                <T v={f.role} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Fleuron className="fleuron fleuron-gap" />

      <section className="wrap colo" aria-label="Colours">
        <div className="colo-head">
          <Note>II — <T v={{ en: "Inks", zh: "颜色" }} /></Note>
          <p className="colo-sub">
            <T v={{ en: "Three colours and a shadow.", zh: "三种颜色，外加一层阴影。" }} />
          </p>
        </div>
        <ul className="inks">
          {INKS.map((c) => (
            <li key={c.hex} className="ink">
              <span className="ink-chip" style={{ background: c.hex }} />
              <span className="ink-name">{c.name}</span>
              <span className="mono-note">{c.hex}</span>
              <span className="ink-role">
                <T v={c.role} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <figure className="colo-press">
        <Image src="/studio/pen-banner.jpg" width={1920} height={800} alt="An ink drawing of ornamental scrollwork in progress, a fountain pen resting beside it" sizes="100vw" />
        <figcaption className="wrap">
          <span className="mono-note">
            <T v={{ en: "The press — my drawing table, where most of this begins", zh: "印刷机——我的画桌，这里大部分东西都从这儿开始" }} />
          </span>
        </figcaption>
      </figure>

      <section className="wrap colo colo-rules" aria-label="Rules">
        <div className="colo-head">
          <Note>III — <T v={{ en: "House rules", zh: "规矩" }} /></Note>
        </div>
        <ol className="rules">
          <li>
            <T v={{ en: "Only my own photographs of my own watches and drawings.", zh: "只用我自己拍的、我自己的表和画。" }} />
          </li>
          <li>
            <T
              v={{
                en: "Antique watches and old posters appear only as decoration — never captioned, never for sale, and credited.",
                zh: "古董表和老海报只作装饰——不配说明、不出售，并注明来源。",
              }}
            />
          </li>
          <li>
            <T v={{ en: "No brand names that are not mine to show.", zh: "不写不属于我的品牌名。" }} />
          </li>
          <li>
            <T v={{ en: "The city, yes; the school, the street and the prices, no.", zh: "写城市可以；学校名、街道和价格不写。" }} />
          </li>
          <li>
            <T v={{ en: "Every entry has a number and a date, and is updated as the work grows.", zh: "每个条目都有编号和日期，并随着作品的积累更新。" }} />
          </li>
        </ol>
        <p className="colo-links">
          <Link href="/credits" className="text-link">
            <T v={{ en: "Picture credits", zh: "图片来源" }} /> →
          </Link>
          <Link href="/catalogue" className="text-link">
            <T v={{ en: "The catalogue", zh: "总目录" }} /> →
          </Link>
        </p>
        <Stamp className="stamp colo-stamp" top="EXU · PERSONAL ARCHIVE" bottom="FINIS · MMXXVI" mid="Fin" />
      </section>
    </>
  );
}
