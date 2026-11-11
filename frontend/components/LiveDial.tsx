"use client";

import { useEffect, useRef } from "react";

/* Hand angles at rest (10:09:34), matching the server-rendered drawing. */
const REST = { hour: -55, minute: 54, seconds: 208 };
const BEATS = 8; // 28,800 vph — the small seconds advances eight times a second
const SET_MS = 1800; // the hands are "set" to the visitor's time when the page opens

function anglesAt(d: Date) {
  const sec = d.getSeconds() + Math.floor((d.getMilliseconds() / 1000) * BEATS) / BEATS;
  const min = d.getMinutes() + sec / 60;
  const hr = (d.getHours() % 12) + min / 60;
  return { hour: hr * 30, minute: min * 6, seconds: sec * 6 };
}

/** Clockwise from `from` to the same position as `to` (so the hands never run backwards). */
function forward(from: number, to: number) {
  return from + ((((to - from) % 360) + 360) % 360);
}

/**
 * Wraps the guilloché dial on the cover and turns it into a working watch:
 * hour and minute hands show the visitor's local time and the small seconds
 * beats at 8 Hz. Without JavaScript the drawing simply stays at 10:09.
 */
export default function LiveDial({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const hands = {
      hour: root.querySelector<SVGGElement>('[data-hand="hour"]'),
      minute: root.querySelector<SVGGElement>('[data-hand="minute"]'),
      seconds: root.querySelector<SVGGElement>('[data-hand="seconds"]'),
    };
    if (!hands.hour || !hands.minute || !hands.seconds) return;
    const all = [hands.hour, hands.minute, hands.seconds];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const place = (a: { hour: number; minute: number; seconds: number }) => {
      hands.hour!.style.transform = `rotate(${a.hour}deg)`;
      hands.minute!.style.transform = `rotate(${a.minute}deg)`;
      hands.seconds!.style.transform = `rotate(${a.seconds}deg)`;
    };

    let timer: number | undefined;
    let settle: number | undefined;

    const run = () => {
      window.clearInterval(timer);
      if (document.hidden) return;
      place(anglesAt(new Date()));
      timer = window.setInterval(() => place(anglesAt(new Date())), reduce ? 15000 : 1000 / BEATS);
    };

    if (reduce) {
      run();
    } else {
      /* Set the watch: sweep forward from 10:09 to the time the sweep will end. */
      const target = anglesAt(new Date(Date.now() + SET_MS));
      all.forEach((h) => (h.style.transition = `transform ${SET_MS}ms cubic-bezier(0.25, 0.8, 0.2, 1)`));
      place({
        hour: forward(REST.hour, target.hour),
        minute: forward(REST.minute, target.minute),
        seconds: forward(REST.seconds, target.seconds),
      });
      settle = window.setTimeout(() => {
        all.forEach((h) => (h.style.transition = "none"));
        run();
      }, SET_MS + 40);
    }

    const onVisibility = () => (document.hidden ? window.clearInterval(timer) : run());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(settle);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={ref} className="live-dial">
      {children}
    </div>
  );
}
