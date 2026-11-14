import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtImage from "@/components/ArtImage";
import { Fleuron, Stamp } from "@/components/Deco";
import { GiantWord, Note } from "@/components/Editorial";
import { T } from "@/components/T";
import { artHref, artworks, plateHang, roman } from "@/content/artwork";
import { blurFor } from "@/content/placeholders";
import type { Bi } from "@/content/types";
import { publicOnly } from "@/content/types";
import Scene from "@/components/Scene";
import { PAGE_SCENES, PLATE_TEXTURES, type SceneUse } from "@/content/scenes";

type Props = { params: Promise<{ slug: string }> };

/* One plate per work, built ahead of time: /artwork/the-night-and-time … */
export const dynamicParams = false;

export function generateStaticParams() {
  return publicOnly(artworks).map((a) => ({ slug: a.slug }));
}

function locate(slug: string) {
  const list = publicOnly(artworks);
  const i = list.findIndex((a) => a.slug === slug);
  if (i < 0) return null;
  return { work: list[i], index: i, total: list.length, prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = locate(slug);
  if (!found) return {};
  const a = found.work;
  const description = (a.concept ?? a.note)?.en ?? `${a.title} — ${a.medium?.en ?? "artwork"} by Eric Xu.`;
  const cover = a.images?.[0];
  return {
    title: a.title,
    description,
    alternates: { canonical: artHref(a.slug) },
    openGraph: cover ? { images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] } : undefined,
  };
}

export default async function PlatePage({ params }: Props) {
  const { slug } = await params;
  const found = locate(slug);
  if (!found) notFound();
  const { work: a, index, total, prev, next } = found;
  const [cover, ...more] = a.images ?? [];
  const plate = roman(index + 1);
  const isDraft = a.status === "draft";

  const texts: { label: Bi; v?: Bi }[] = [
    { label: { en: "On the sheet", zh: "画面" }, v: a.look },
    { label: { en: "Concept", zh: "创作理念" }, v: a.concept },
    { label: { en: "Inspiration", zh: "灵感" }, v: a.inspiration },
    { label: { en: "Process", zh: "过程" }, v: a.process },
    { label: { en: "Reflection", zh: "体会" }, v: a.reflection },
    { label: { en: "Technique", zh: "手法" }, v: a.technique },
  ];
  const written = texts.filter((t) => t.v);
  const hang = plateHang(a, index);
  /* the wall behind the work: a pattern, the grain of old paper, or nothing at all */
  const wall: SceneUse | null =
    hang === "spotlight" || hang === "museum"
        ? null
        : (PLATE_TEXTURES[index % PLATE_TEXTURES.length] ?? PAGE_SCENES.plate.page);

  return (
    <>
      <article className={`plate-page plate-hang-${hang}${wall ? " has-scene" : ""}${isDraft ? " is-draft" : ""}`}>
        {wall ? <Scene use={wall} eager /> : null}
        <GiantWord word={`PL. ${plate}`} outline className="plate-word" drift={-0.1} />

        <div className="wrap plate-top">
          <p className="crumbs">
            <Link href="/artwork">
              <T v={{ en: "Artwork & Creativity", zh: "艺术作品" }} />
            </Link>
            <span className="crumbs-sep" aria-hidden="true">
              /
            </span>
            <span className="archive-id">{a.id}</span>
          </p>
          <Note>
            <T v={{ en: `Plate ${plate} of ${roman(total)}`, zh: `第 ${plate} 图版 / 共 ${roman(total)}` }} />
          </Note>
        </div>

        <div className="wrap plate-grid">
          {cover ? (
            <div className="plate-figure">
              <div className="plate-mount">
                {hang === "pinned" ? (
                  <>
                    <span className="tape tape-1" aria-hidden="true" />
                    <span className="tape tape-2" aria-hidden="true" />
                  </>
                ) : null}
                <ArtImage
                  src={cover.src}
                  width={cover.width}
                  height={cover.height}
                  alt={cover.alt}
                  priority
                  sizes="(max-width: 960px) 100vw, 56vw"
                  blurDataURL={blurFor(cover.src)}
                  caption={
                    <>
                      {a.id} · {a.title}
                      {a.year ? `, ${a.year}` : ""}
                    </>
                  }
                />
              </div>
              {hang === "diptych" ? (
                <div className="plate-loupe-wrap" aria-hidden="true">
                  <div className="plate-loupe" style={{ backgroundImage: `url(${cover.src})`, backgroundPosition: a.detailPos ?? "42% 45%" }} />
                  <p className="mono-note plate-loupe-note">× 3.5 — detail</p>
                </div>
              ) : null}
              {hang === "museum" ? (
                <p className="plate-plaque">
                  <span>{a.id}</span>
                  <b>{a.title}</b>
                  {a.medium ? <T v={a.medium} /> : null}
                  {a.year ? <span>{a.year}</span> : null}
                </p>
              ) : (
                <p className="plate-label">
                  <b>Pl. {plate}</b> {a.id}
                </p>
              )}
            </div>
          ) : null}

          <div className="plate-text">
            {isDraft ? (
              <p className="plate-draft mono-note">
                <T v={{ en: "Draft — still on the table", zh: "草稿——还在画桌上" }} />
              </p>
            ) : null}
            <h1 className="plate-title">{a.title}</h1>
            <p className="plate-title-zh" lang="zh-Hans">
              《{a.titleZh}》
            </p>
            <dl className="plate-facts">
              {a.medium ? (
                <div>
                  <dt>
                    <T v={{ en: "Medium", zh: "媒材" }} />
                  </dt>
                  <dd>
                    <T v={a.medium} />
                  </dd>
                </div>
              ) : null}
              {a.support ? (
                <div>
                  <dt>
                    <T v={{ en: "Support", zh: "载体" }} />
                  </dt>
                  <dd>
                    <T v={a.support} />
                  </dd>
                </div>
              ) : null}
              {a.year ? (
                <div>
                  <dt>
                    <T v={{ en: "Year", zh: "年份" }} />
                  </dt>
                  <dd>{a.year}</dd>
                </div>
              ) : null}
              <div>
                <dt>
                  <T v={{ en: "Archive no.", zh: "档案编号" }} />
                </dt>
                <dd>{a.id}</dd>
              </div>
            </dl>

            {a.note && !written.length ? (
              <p className="plate-note">
                <T v={a.note} />
              </p>
            ) : null}

            {written.map((t, i) => (
              <section key={t.label.en} className={`plate-section plate-section-${i + 1}`}>
                <h2 className="mono-note">
                  {roman(i + 1)}. <T v={t.label} />
                </h2>
                <p>
                  <T v={t.v as Bi} />
                </p>
              </section>
            ))}

            {a.details?.length ? (
              <section className="plate-section plate-details-list">
                <h2 className="mono-note">
                  <T v={{ en: "Look closer", zh: "细看" }} />
                </h2>
                <ul className="plate-symbols">
                  {a.details.map((d) => (
                    <li key={d.en}>
                      <T v={d} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {a.symbols?.length ? (
              <section className="plate-section">
                <h2 className="mono-note">
                  <T v={{ en: "Symbols in the work", zh: "作品中的象征" }} />
                </h2>
                <ul className="plate-symbols">
                  {a.symbols.map((s) => (
                    <li key={s.en}>
                      <T v={s} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>

        {more.length ? (
          <div className="wrap plate-more">
            {more.map((m, i) => (
              <figure key={m.src} className={`plate-detail plate-detail-${i + 1}`}>
                <ArtImage
                  src={m.src}
                  width={m.width}
                  height={m.height}
                  alt={m.alt}
                  sizes="(max-width: 960px) 80vw, 34vw"
                  blurDataURL={blurFor(m.src)}
                  caption={<>{m.alt}</>}
                />
                <figcaption className="mono-note">
                  {a.id} · <T v={{ en: `detail ${i + 1}`, zh: `局部 ${i + 1}` }} />
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}

        <Stamp className="stamp plate-stamp" top="EXU · STUDIO · PLATES" bottom={`PL. ${plate} · ${a.id}`} mid="Pl." />
      </article>

      <Fleuron className="fleuron fleuron-gap" />

      <nav className="wrap plate-nav" aria-label="More plates">
        <Link href={artHref(prev.slug)} className="plate-nav-link">
          <span className="mono-note">← Pl. {roman(((index - 1 + total) % total) + 1)}</span>
          <span className="plate-nav-title">{prev.title}</span>
        </Link>
        <Link href="/artwork" className="plate-nav-all mono-note">
          <T v={{ en: "All plates", zh: "全部图版" }} />
        </Link>
        <Link href={artHref(next.slug)} className="plate-nav-link plate-nav-next">
          <span className="mono-note">Pl. {roman(((index + 1) % total) + 1)} →</span>
          <span className="plate-nav-title">{next.title}</span>
        </Link>
      </nav>
    </>
  );
}
