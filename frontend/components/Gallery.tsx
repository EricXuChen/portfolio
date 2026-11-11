"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Bi } from "@/content/types";
import { T } from "./T";

export type GalleryView = { src: string; width: number; height: number; alt: string; blur?: string };

export type GalleryItem = {
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  year?: string;
  medium?: Bi;
  kind?: "ink" | "pencil" | "colour";
  draft?: boolean;
  texts: { label: Bi; body: Bi }[];
  views: GalleryView[];
};

const KINDS: { key: "all" | "ink" | "pencil" | "colour"; label: Bi }[] = [
  { key: "all", label: { en: "All", zh: "全部" } },
  { key: "ink", label: { en: "Ink", zh: "墨水" } },
  { key: "pencil", label: { en: "Pencil & charcoal", zh: "铅笔与炭笔" } },
  { key: "colour", label: { en: "Colour", zh: "色彩" } },
];

/**
 * A wall of artworks in their own proportions, with a viewer that opens
 * full size and steps through the wall (← →, swipe, or the arrows).
 */
export default function Gallery({ items, filters = false, label }: { items: GalleryItem[]; filters?: boolean; label: string }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]["key"]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [view, setView] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<number | null>(null);

  const shown = useMemo(() => items.filter((it) => kind === "all" || it.kind === kind), [items, kind]);
  const current = open === null ? null : shown[open];

  const show = useCallback((i: number) => {
    setOpen(i);
    setView(0);
    if (!dialog.current?.open) dialog.current?.showModal();
  }, []);

  const step = useCallback(
    (d: number) => {
      if (open === null || shown.length === 0) return;
      setOpen((open + d + shown.length) % shown.length);
      setView(0);
    },
    [open, shown.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [step]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const it of items) if (it.kind) c[it.kind] = (c[it.kind] ?? 0) + 1;
    return c;
  }, [items]);

  const v = current?.views[Math.min(view, (current?.views.length ?? 1) - 1)];

  return (
    <div className="gallery">
      {filters ? (
        <div className="filters" role="group" aria-label={`${label} — filter`}>
          {KINDS.filter((k) => k.key === "all" || counts[k.key]).map((k) => (
            <button key={k.key} type="button" aria-pressed={kind === k.key} onClick={() => setKind(k.key)}>
              <T v={k.label} />
              <span className="count">{counts[k.key] ?? 0}</span>
            </button>
          ))}
        </div>
      ) : null}

      <ul className="masonry" aria-label={label}>
        {items.map((it) => {
          const i = shown.indexOf(it);
          const cover = it.views[0];
          return (
            <li
              key={it.id}
              id={it.slug}
              className={`g-item${it.draft ? " is-draft" : ""}`}
              hidden={i < 0}
              style={{ "--ar": (cover.width / cover.height).toFixed(3) } as React.CSSProperties}
            >
              <button type="button" className="g-frame" onClick={() => show(i)} aria-label={`${it.id} · ${it.title} — open`}>
                <Image
                  src={cover.src}
                  width={cover.width}
                  height={cover.height}
                  alt={cover.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  placeholder={cover.blur ? "blur" : "empty"}
                  blurDataURL={cover.blur}
                />
                {it.draft ? (
                  <span className="g-tag">
                    <T v={{ en: "Draft", zh: "草稿" }} />
                  </span>
                ) : null}
                {it.views.length > 1 ? (
                  <span className="g-count" aria-hidden="true">
                    {it.views.length}
                    <i />
                  </span>
                ) : null}
              </button>
              <p className="g-cap">
                <span className="archive-id">{it.id}</span>
                <Link className="g-title" href={`/artwork/${it.slug}`}>
                  <T v={{ en: it.title, zh: `《${it.titleZh}》` }} />
                </Link>
                <span className="g-meta">
                  {it.medium ? <T v={it.medium} /> : null}
                  {it.year ? <> · {it.year}</> : null}
                </span>
              </p>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        className="viewer"
        aria-label={current ? `${current.id} · ${current.title}` : label}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        {current && v ? (
          <div className="viewer-inner">
            <div
              className="viewer-stage"
              onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touch.current === null) return;
                const dx = e.changedTouches[0].clientX - touch.current;
                touch.current = null;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              }}
            >
              <Image
                key={v.src}
                src={v.src}
                width={v.width}
                height={v.height}
                alt={v.alt}
                sizes="(max-width: 960px) 100vw, 64vw"
                placeholder={v.blur ? "blur" : "empty"}
                blurDataURL={v.blur}
              />
              {current.views.length > 1 ? (
                <div className="viewer-views" role="group" aria-label="Views">
                  {current.views.map((w, k) => (
                    <button key={w.src} type="button" aria-pressed={k === view} onClick={() => setView(k)} aria-label={`View ${k + 1}`}>
                      <Image src={w.src} width={w.width} height={w.height} alt="" sizes="64px" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="viewer-info">
              <p className="viewer-count">
                <span className="count-num">{String((open ?? 0) + 1).padStart(2, "0")}</span>
                <span> / {String(shown.length).padStart(2, "0")}</span>
              </p>
              <p className="viewer-id">
                <span className="archive-id">{current.id}</span>
                {current.draft ? (
                  <span className="g-tag g-tag-inline">
                    <T v={{ en: "Draft", zh: "草稿" }} />
                  </span>
                ) : null}
              </p>
              <h2 className="viewer-title">{current.title}</h2>
              <p className="title-zh">《{current.titleZh}》</p>
              <p className="viewer-meta">
                {current.medium ? <T v={current.medium} /> : null}
                {current.year ? <> · {current.year}</> : null}
              </p>
              {current.texts.length ? (
                <dl className="work-dl">
                  {current.texts.map((t) => (
                    <div key={t.label.en}>
                      <dt>
                        <T v={t.label} />
                      </dt>
                      <dd>
                        <T v={t.body} />
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <Link className="text-link viewer-plate" href={`/artwork/${current.slug}`}>
                <T v={{ en: "Open the plate", zh: "打开图版页" }} /> →
              </Link>
            </div>

            <button type="button" className="viewer-close" onClick={() => dialog.current?.close()} aria-label="Close">
              ×
            </button>
            {shown.length > 1 ? (
              <>
                <button type="button" className="viewer-arrow viewer-prev" onClick={() => step(-1)} aria-label="Previous work">
                  ←
                </button>
                <button type="button" className="viewer-arrow viewer-next" onClick={() => step(1)} aria-label="Next work">
                  →
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
