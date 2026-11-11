"use client";

import { useEffect, useState } from "react";
import { T } from "./T";

type View = "gallery" | "index";
const KEY = "collection-view";

/**
 * Gallery (photographs) or Index (a catalogue list) for the collection.
 * Both views are already in the page; this only chooses which one shows,
 * and remembers the choice for the next visit.
 */
export default function ViewSwitch({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("gallery");

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "index") setView("index");
    } catch {
      /* storage unavailable — stay on the gallery */
    }
  }, []);

  function choose(next: View) {
    setView(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* the switch still works for this visit */
    }
  }

  return (
    <div className="view-wrap" data-view={view}>
      <div className="view-switch" role="group" aria-label="View / 浏览方式">
        <button type="button" aria-pressed={view === "gallery"} onClick={() => choose("gallery")}>
          <span className="view-icon view-icon-gallery" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <T v={{ en: "Gallery", zh: "画廊" }} />
        </button>
        <button type="button" aria-pressed={view === "index"} onClick={() => choose("index")}>
          <span className="view-icon view-icon-index" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <T v={{ en: "Index", zh: "目录" }} />
        </button>
      </div>
      {children}
    </div>
  );
}
