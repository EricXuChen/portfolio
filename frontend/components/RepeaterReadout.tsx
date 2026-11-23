"use client";

import { useSyncExternalStore } from "react";
import { getServerState, getState, subscribe } from "./repeater";
import { T } from "./T";

/** What the repeater is striking, shown while it strikes (and read out once). */
export default function RepeaterReadout() {
  const s = useSyncExternalStore(subscribe, getState, getServerState);
  const r = s.reading;
  return (
    <div className={`repeater-readout${s.playing && r ? " is-on" : ""}`} aria-live="polite" aria-atomic="true">
      {s.playing && r ? (
        <p>
          <span className="rr-kicker">
            <T v={{ en: "Repeater", zh: "三问" }} />
          </span>
          <span className={`rr-part${s.group === "h" ? " is-now" : ""}`}>
            {r.h} <T v={{ en: r.h === 1 ? "hour" : "hours", zh: "时" }} />
          </span>
          <span className="rr-dot">·</span>
          <span className={`rr-part${s.group === "q" ? " is-now" : ""}`}>
            {r.q} <T v={{ en: r.q === 1 ? "quarter" : "quarters", zh: "刻" }} />
          </span>
          <span className="rr-dot">·</span>
          <span className={`rr-part${s.group === "m" ? " is-now" : ""}`}>
            {r.m} <T v={{ en: r.m === 1 ? "minute" : "minutes", zh: "分" }} />
          </span>
          <span className="rr-eq">= {r.label}</span>
        </p>
      ) : null}
    </div>
  );
}
