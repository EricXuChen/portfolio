import Image from "next/image";
import Link from "next/link";
import { Rocaille, Stamp } from "@/components/Deco";
import DecorWatch from "@/components/DecorWatch";
import { Edge, GiantWord, Hand, Note } from "@/components/Editorial";
import { Figure } from "@/components/Figure";
import FloatingWatch from "@/components/FloatingWatch";
import Scene from "@/components/Scene";
import { T } from "@/components/T";
import { posters } from "@/content/antiques";
import { artworks } from "@/content/artwork";
import { recognition } from "@/content/experiences";
import { trading } from "@/content/trading";
import { home } from "@/content/site";
import { blurFor } from "@/content/placeholders";
import { publicOnly } from "@/content/types";
import { PAGE_SCENES } from "@/content/scenes";
import { collection, pieceHref } from "@/content/watches";
import Interlude from "@/components/Interlude";

/* Three pieces from the collection, each shown at a different scale. */
const TEASER = [
  { id: "W-001", size: "lg", voice: "bodoni" },
  { id: "W-005", size: "sm", voice: "cond" },
  { id: "W-002", size: "md", voice: "italic" },
] as const;

/* The four chapters of the archive, each set in its own typographic voice. */
const CHAPTER_VOICES = ["voice-italic", "voice-bodoni", "voice-cond", "voice-garamond", "voice-mono", "voice-bodoni-italic"];
const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

export default function HomePage() {
  const watches = publicOnly(collection);
  const studioWork = publicOnly(artworks).find((a) => a.slug === "ink-and-water-venice");
  const study = publicOnly(artworks).find((a) => a.slug === "rose");
  const studio = studioWork?.images?.[0];
  const studyImg = study?.images?.[0];
  const award = publicOnly(recognition)[0];

  return (
    <>
      {/* ---------------------------------------------------------- cover */}
      <section className="ed-cover has-scene" aria-label="Eric Xu">
        <Scene use={PAGE_SCENES.home.cover} eager />
        <div className="ed-cover-top wrap">
          <Note>Nº 001 — <T v={{ en: "Personal archive", zh: "个人档案" }} /></Note>
          <Note className="ed-cover-coord">41.39° N · 2.17° E — Barcelona</Note>
          <Note className="ed-cover-year">MMXXVI</Note>
        </div>

        <h1 className="ed-masthead" aria-label="Eric Xu">
          <span className="ed-masthead-first">Eric</span>
          <span className="ed-masthead-last">Xu</span>
        </h1>

        <div className="ed-cover-body wrap">
          <div className="ed-cover-text">
            <p className="ed-hello">
              <T v={home.title} />
            </p>
            <ul className="ed-roles" aria-label="Interests">
              {home.roles.en.split(" · ").map((r, i) => (
                <li key={r}>
                  <span className="l-en" lang="en">
                    {r}
                  </span>
                  <span className="l-zh" lang="zh-Hans">
                    {home.roles.zh.split(" · ")[i]}
                  </span>
                </li>
              ))}
            </ul>
            <p className="ed-cover-lede">
              <T v={home.lede} />
            </p>
            <Link className="text-link" href="/about">
              <T v={home.cta} /> <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <figure className="ed-cover-figure">
            <Link href={pieceHref("W-010")} className="ed-cover-photo">
              <Image
                src="/objects/nicolai-schultz-dial.jpg"
                width={1280}
                height={1600}
                alt="A silver pocket watch from Helsingør on burgundy velvet, beside sheet music — from Eric's collection"
                priority
                sizes="(max-width: 960px) 78vw, 400px"
                placeholder={blurFor("/objects/nicolai-schultz-dial.jpg") ? "blur" : "empty"}
                blurDataURL={blurFor("/objects/nicolai-schultz-dial.jpg")}
              />
            </Link>
            <Hand className="ed-cover-hand" v={{ en: "my Danish pocket watch ↙", zh: "我的丹麦怀表 ↙" }} />
            <figcaption>
              <Note>W-010 · <T v={{ en: "from my collection", zh: "我的收藏" }} /></Note>
            </figcaption>
          </figure>
        </div>

        <Stamp className="stamp" />
        <Edge className="ed-cover-edge">
          <T v={{ en: "Time · Objects · Experiences", zh: "时间 · 物件 · 经历" }} />
        </Edge>
      </section>

      {/* ---------------------------------------------------------- contents */}
      <section className="ed-contents has-scene" aria-label="Contents">
        <Scene use={PAGE_SCENES.home.contents} />
        <DecorWatch which="silver" className="decor-contents" />
        <div className="wrap">
          <div className="ed-contents-head">
            <Note>
              <T v={{ en: "Contents", zh: "目录" }} /> — 01 / 06
            </Note>
            <p className="ed-contents-title">
              <T v={home.interestsTitle} />
            </p>
          </div>
          <ol className="toc">
            {home.sections.map((s, i) => (
              <li key={s.href} className={`toc-row toc-row-${i + 1}`}>
                <Link href={s.href} className={`toc-link ${CHAPTER_VOICES[i]}`}>
                  <span className="toc-num" aria-hidden="true">
                    {ROMAN[i]}
                  </span>
                  <span className="toc-title">
                    <T v={s.title} />
                  </span>
                  <span className="toc-text">
                    <T v={s.text} />
                  </span>
                  <span className="toc-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------- TIME + floating watch */}
      <FloatingWatch />

      {/* ---------------------------------------------------------- collection teaser */}
      <section className="ed-teaser" aria-label="From the collection">
        <GiantWord word="COLLECTION." outline className="ed-teaser-word" drift={-0.25} />
        <div className="wrap ed-teaser-grid">
          <div className="ed-teaser-head">
            <Note>02 — <T v={{ en: "From the collection", zh: "收藏选录" }} /></Note>
            <p className="ed-teaser-title">
              <T v={{ en: "Three watches,", zh: "三块表，" }} />
              <em>
                <T v={{ en: " three ideas of time.", zh: "三种关于时间的想法。" }} />
              </em>
            </p>
            <Hand className="ed-teaser-hand" v={{ en: "each one stays for a reason", zh: "每一块留下，都有理由" }} />
          </div>
          {TEASER.map((t) => {
            const w = watches.find((x) => x.id === t.id);
            if (!w) return null;
            return (
              <Link key={w.id} href={pieceHref(w.id)} className={`teaser-piece teaser-${t.size} voice-${t.voice}`}>
                <span className="teaser-photo">
                  <Image
                    src={w.image.src}
                    alt={w.image.alt}
                    width={w.image.width}
                    height={w.image.height}
                    sizes={t.size === "lg" ? "(max-width: 900px) 92vw, 44vw" : "(max-width: 900px) 70vw, 26vw"}
                    placeholder={blurFor(w.image.src) ? "blur" : "empty"}
                    blurDataURL={blurFor(w.image.src)}
                  />
                </span>
                <span className="teaser-meta">
                  <span className="mono-note">
                    {w.id}
                    {w.reference ? ` / ref. ${w.reference}` : ""}
                  </span>
                  <span className="teaser-name">{w.brand}</span>
                  <span className="teaser-model">
                    <T v={w.model} />
                  </span>
                </span>
              </Link>
            );
          })}
          <p className="ed-teaser-more">
            <Link className="text-link" href="/watches">
              <T v={{ en: "All ten watches", zh: "全部十块表" }} /> →
            </Link>
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- MECHANISM */}
      <figure className="ed-mech">
        <div className="ed-mech-media">
          <Image
            src="/objects/nicolai-schultz-movement.jpg"
            width={1920}
            height={1280}
            alt="The open movement of Eric's pocket watch: gilt plates, the balance and two winding wheels"
            sizes="100vw"
            placeholder={blurFor("/objects/nicolai-schultz-movement.jpg") ? "blur" : "empty"}
            blurDataURL={blurFor("/objects/nicolai-schultz-movement.jpg")}
          />
        </div>
        <span className="ed-pin ed-pin-balance" aria-hidden="true">
          <span className="ed-pin-dot" />
          <span className="ed-pin-line" />
          <span className="mono-note">
            <T v={{ en: "the balance — its heartbeat", zh: "摆轮——它的心跳" }} />
          </span>
        </span>
        <span className="ed-pin ed-pin-wheels" aria-hidden="true">
          <span className="ed-pin-dot" />
          <span className="ed-pin-line" />
          <span className="mono-note">
            <T v={{ en: "winding wheels", zh: "上链齿轮" }} />
          </span>
        </span>
        <GiantWord word="MECHANISM." className="ed-mech-word" drift={0.18} />
        <figcaption className="ed-mech-cap">
          <span className="ed-mech-line">
            <T v={{ en: "An appreciation for mechanical precision.", zh: "对机械精密的敬意。" }} />
          </span>
          <Note>W-010 · <T v={{ en: "the movement, opened", zh: "打开后的机芯" }} /></Note>
        </figcaption>
      </figure>

      {/* ---------------------------------------------------------- selected project */}
      <section className="ed-project" aria-label="Selected project">
        <div className="ed-project-media">
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
        <div className="wrap ed-project-inner">
          <Note>03 — <T v={{ en: "Selected project", zh: "精选项目" }} /></Note>
          <h2 className="ed-project-title">
            <T v={trading.title} />
          </h2>
          <p className="ed-project-lede">
            <T v={trading.lede} />
          </p>
          <ul className="ed-figures">
            {trading.results.map((r) => (
              <li key={r.label.en}>
                <Figure className="ed-figure" value={r.figure} />
                <span className="mono-note">
                  <T v={r.label} />
                </span>
              </li>
            ))}
          </ul>
          <Link className="text-link" href={`/experiences/${trading.slug}`}>
            <T v={{ en: "Read the case study", zh: "阅读案例" }} /> →
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------- a sentence alone */}
      <Interlude align="left" />

      <section className="ed-lone has-scene" aria-label="Learning by doing">
        <Scene use={PAGE_SCENES.home.lone} />
        <Edge className="ed-lone-numeral">VI.</Edge>
        <p className="lone-line">
          <T v={{ en: "Learning by doing —", zh: "边做边学——" }} />
          <br />
          <em>
            <T v={{ en: "in watches, in business, in drawing.", zh: "腕表如此，生意如此，画画也如此。" }} />
          </em>
        </p>
        {award ? (
          <Link href={`/experiences#${award.id}`} className="ed-lone-award">
            <Note>
              <T v={{ en: "Recognition", zh: "荣誉" }} /> — <T v={{ en: `${award.title.en} ${award.year}`, zh: `${award.year} ${award.title.zh}` }} /> ·{" "}
              <T v={award.award} /> · <T v={award.field} /> →
            </Note>
          </Link>
        ) : null}
      </section>

      {/* ---------------------------------------------------------- studio */}
      {studio && studioWork ? (
        <section className="ed-studio" aria-label="From the studio">
          <GiantWord word="Memory" script className="ed-studio-word" drift={0.2} />
          <div className="wrap ed-studio-grid">
            <Link href={`/artwork#${studioWork.slug}`} className="ed-studio-main">
              <Image
                src={studio.src}
                alt={studio.alt}
                width={studio.width}
                height={studio.height}
                sizes="(max-width: 900px) 100vw, 58vw"
                placeholder={blurFor(studio.src) ? "blur" : "empty"}
                blurDataURL={blurFor(studio.src)}
              />
              <Note>
                {studioWork.id} · <T v={{ en: `${studioWork.title}, ${studioWork.year}`, zh: `《${studioWork.titleZh}》，${studioWork.year}` }} />
              </Note>
            </Link>
            {study && studyImg ? (
              <Link href={`/artwork#${study.slug}`} className="ed-studio-study">
                <Image
                  src={studyImg.src}
                  alt={studyImg.alt}
                  width={studyImg.width}
                  height={studyImg.height}
                  sizes="(max-width: 900px) 40vw, 16vw"
                  placeholder={blurFor(studyImg.src) ? "blur" : "empty"}
                  blurDataURL={blurFor(studyImg.src)}
                />
                <Note>{study.id} · <T v={{ en: "study", zh: "习作" }} /></Note>
              </Link>
            ) : null}
            <div className="ed-studio-text">
              <Note>04 — <T v={{ en: "From the studio", zh: "画室" }} /></Note>
              <p className="ed-studio-title">
                <T v={{ en: "Drawing as a", zh: "绘画，是一种" }} />
                <em>
                  <T v={{ en: " way of looking.", zh: "观看的方式。" }} />
                </em>
              </p>
              <p className="ed-studio-lede">
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

      {/* ---------------------------------------------------------- closing */}
      <Scene use={PAGE_SCENES.home.closing} />
      <section className="ed-closing" aria-label="Closing">
        <div className="wrap ed-closing-grid">
          <figure className="poster-print ed-closing-poster">
            <Image
              src={posters.election.src}
              width={posters.election.width}
              height={posters.election.height}
              alt={posters.election.alt}
              sizes="240px"
            />
            <figcaption>
              <Note>Leonetto Cappiello, c. 1922</Note>
            </figcaption>
          </figure>
          <div className="ed-closing-body">
            <Rocaille className="rocaille" />
            <p className="ed-closing-text">
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
