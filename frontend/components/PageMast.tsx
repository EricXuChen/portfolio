import type { ReactNode } from "react";
import type { Bi } from "@/content/types";
import { Stamp } from "./Deco";
import { GiantWord, Note } from "./Editorial";
import { T } from "./T";

/**
 * The opening of an inner page, set like the title page of an old catalogue:
 * a running head, one enormous word, a title in its own voice, an archive stamp.
 */
export default function PageMast({
  word,
  num,
  kicker,
  title,
  lede,
  tone = "burgundy",
  voice = "italic",
  stamp,
  metal = false,
  layout = "classic",
  children,
}: {
  word: string;
  num: string;
  kicker: Bi;
  title: Bi;
  lede?: Bi;
  tone?: "ivory" | "burgundy";
  voice?: "italic" | "bodoni" | "cond";
  stamp?: { top?: string; bottom?: string; mid?: string };
  /** Fill the giant word with polished champagne instead of an outline. */
  metal?: boolean;
  /** Each page opens differently: classic, overlap, split, vertical, centered or frame. */
  layout?: "classic" | "overlap" | "split" | "vertical" | "centered" | "frame";
  children?: ReactNode;
}) {
  return (
    <header className={`mast mast-${tone} mast-voice-${voice} mast-layout-${layout}`}>
      <div className="wrap mast-top">
        <Note>
          {num} — <T v={kicker} />
        </Note>
        <Note className="mast-run">EXU. — The Personal Archive</Note>
      </div>
      <GiantWord word={word} className={`mast-word${metal ? " giant-metal" : ""}`} outline={tone === "burgundy" && !metal} drift={-0.12} />
      <div className="wrap mast-body">
        <h1 className="mast-title">
          <T v={title} />
        </h1>
        {lede ? (
          <p className="mast-lede">
            <T v={lede} />
          </p>
        ) : null}
        {children}
      </div>
      <Stamp className={`stamp mast-stamp${tone === "burgundy" ? " stamp-light" : ""}`} {...stamp} />
    </header>
  );
}
