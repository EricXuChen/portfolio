"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { getServerState, getState, readingOf, subscribe, type Reading } from "./repeater";
import RepeaterButton from "./RepeaterButton";
import { T } from "./T";

/**
 * The repeater page's instrument: the time it is now, what the repeater will
 * strike for it (three rows of marks), and one button.
 */
export default function RepeaterPanel() {
  const s = useSyncExternalStore(subscribe, getState, getServerState);
  const [now, setNow] = useState<Reading | null>(null);
  useEffect(() => {
    const tick = () => setNow(readingOf(new Date()));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);
  const r = s.playing && s.reading ? s.reading : now;
  const lit = (g: "h" | "q" | "m", i: number) => s.playing && s.done[g] > i;
  const rows: { g: "h" | "q" | "m"; n: number; name: { en: string; zh: string }; how: { en: string; zh: string } }[] = r
    ? [
        { g: "h", n: r.h, name: { en: "Hours", zh: "时" }, how: { en: "low gong, once for each hour", zh: "低音，几点敲几下" } },
        { g: "q", n: r.q, name: { en: "Quarters", zh: "刻" }, how: { en: "ding-dong, once for each quarter", zh: "叮—咚，过了几刻敲几组" } },
        { g: "m", n: r.m, name: { en: "Minutes", zh: "分" }, how: { en: "high gong, for the minutes left over", zh: "高音，零出来几分钟敲几下" } },
      ]
    : [];
  return (
    <div className="rp-panel">
      <p className="rp-now" aria-live="off">
        <span className="rp-now-kicker">
          <T v={{ en: "It is now", zh: "现在是" }} />
        </span>
        <span className="rp-now-time">{r ? r.label : "—:—"}</span>
      </p>
      <div className="rp-rows">
        {rows.map((row) => (
          <div key={row.g} className={`rp-row rp-row-${row.g}${s.playing && s.group === row.g ? " is-now" : ""}`}>
            <p className="rp-row-name">
              <T v={row.name} />
              <span className="rp-row-count">× {row.n}</span>
            </p>
            <p className="rp-marks" aria-hidden="true">
              {row.n === 0 ? <span className="rp-none">—</span> : null}
              {Array.from({ length: row.n }, (_, i) => (
                <span key={i} className={`rp-mark rp-mark-${row.g}${lit(row.g, i) ? " is-lit" : ""}`}>
                  {row.g === "q" ? (
                    <>
                      <i />
                      <i />
                    </>
                  ) : null}
                </span>
              ))}
            </p>
            <p className="rp-row-how">
              <T v={row.how} />
            </p>
          </div>
        ))}
      </div>
      <RepeaterButton
        variant="big"
        className="rp-button"
        label={
          s.playing ? (
            <T v={{ en: "Striking… press to stop", zh: "正在敲……再按一下停止" }} />
          ) : (
            <T v={{ en: "Press, and hear the time", zh: "按一下，听现在几点" }} />
          )
        }
      />
      <p className="rp-hint">
        <T
          v={{
            en: "Sound plays only when you press. On an iPhone with the silent switch on, you will see the strikes but not hear them.",
            zh: "只有按了才会出声。iPhone 如果开着静音开关，你会看到它在敲，但听不到。",
          }}
        />
      </p>
    </div>
  );
}
