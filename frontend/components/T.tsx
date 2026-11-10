import type { Bi } from "@/content/types";

/**
 * Bilingual text. Both languages are rendered into the page; CSS shows the one
 * that matches <html data-lang="…">, so switching language is instant and
 * search engines can read both.
 */
export function T({ v }: { v: Bi }) {
  return (
    <>
      <span className="l-en" lang="en">
        {v.en}
      </span>
      <span className="l-zh" lang="zh-Hans">
        {v.zh}
      </span>
    </>
  );
}

/** Both languages at once — used for small captions and labels. */
export function Both({ v, sep = " · " }: { v: Bi; sep?: string }) {
  if (v.en === v.zh) return <>{v.en}</>;
  return (
    <>
      <span lang="en">{v.en}</span>
      <span className="sep" aria-hidden="true">
        {sep}
      </span>
      <span lang="zh-Hans" className="zh">
        {v.zh}
      </span>
    </>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function dateBi(iso: string): Bi {
  const [y, m, d] = iso.split("-").map(Number);
  return { en: `${d} ${MONTHS[m - 1]} ${y}`, zh: `${y}年${m}月${d}日` };
}

/** Archive number + last-updated date, e.g. “W-001 · Updated 10 Nov 2026”. */
export function ArchiveTag({ id, updated }: { id: string; updated: string }) {
  return (
    <p className="archive-tag">
      <span className="archive-id">{id}</span>
      <span className="archive-date">
        <T v={{ en: "Updated", zh: "更新于" }} /> <T v={dateBi(updated)} />
      </span>
    </p>
  );
}

/** Small numbered section label, e.g. “02 — Horology / 腕表与制表”. */
export function Kicker({ num, v }: { num?: string; v: Bi }) {
  return (
    <p className="kicker">
      {num ? <span className="kicker-num">{num} — </span> : null}
      <T v={v} />
    </p>
  );
}
