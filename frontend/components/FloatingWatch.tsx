"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { floatingWatch } from "@/content/antiques";
import { T } from "./T";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* ------------------------------------------------------------------ */
/*  The chain: links laid along a gentle curve rising from the bow.     */
/*  Computed once, so the server and the browser draw the same thing.   */
/* ------------------------------------------------------------------ */
type Pt = [number, number];
const P0: Pt = [600, 720];
const P1: Pt = [598, 520];
const P2: Pt = [430, 330];
const P3: Pt = [-40, 40];
const bez = (t: number): Pt => {
  const u = 1 - t;
  return [
    u * u * u * P0[0] + 3 * u * u * t * P1[0] + 3 * u * t * t * P2[0] + t * t * t * P3[0],
    u * u * u * P0[1] + 3 * u * u * t * P1[1] + 3 * u * t * t * P2[1] + t * t * t * P3[1],
  ];
};
const LINKS: { x: number; y: number; a: number; face: boolean }[] = (() => {
  const samples: Pt[] = [];
  for (let i = 0; i <= 400; i++) samples.push(bez(i / 400));
  const out: { x: number; y: number; a: number; face: boolean }[] = [];
  let acc = 0;
  let next = 0;
  const step = 15;
  for (let i = 1; i < samples.length; i++) {
    const [x0, y0] = samples[i - 1];
    const [x1, y1] = samples[i];
    acc += Math.hypot(x1 - x0, y1 - y0);
    if (acc >= next) {
      const a = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
      out.push({ x: +x1.toFixed(1), y: +y1.toFixed(1), a: +a.toFixed(1), face: out.length % 2 === 0 });
      next += step;
    }
  }
  return out;
})();

function Chain() {
  return (
    <svg className="float-chain" viewBox="0 0 620 740" aria-hidden="true">
      <defs>
        <linearGradient id="chainGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7e6bd" />
          <stop offset="0.45" stopColor="#c9a05a" />
          <stop offset="0.7" stopColor="#8a6430" />
          <stop offset="1" stopColor="#e8cc8c" />
        </linearGradient>
      </defs>
      {LINKS.map((l, i) =>
        l.face ? (
          <ellipse
            key={i}
            cx={l.x}
            cy={l.y}
            rx="10"
            ry="6"
            fill="none"
            stroke="url(#chainGold)"
            strokeWidth="2.8"
            transform={`rotate(${l.a} ${l.x} ${l.y})`}
          />
        ) : (
          <rect
            key={i}
            x={l.x - 10}
            y={l.y - 1.9}
            width="20"
            height="3.8"
            rx="1.9"
            fill="url(#chainGold)"
            transform={`rotate(${l.a} ${l.x} ${l.y})`}
          />
        ),
      )}
    </svg>
  );
}

/**
 * The signature moment: an antique gold pocket watch on its chain drifts in
 * from outside the page, turns, and floats across an enormous TIME. — an
 * object entering the composition, never captioned or introduced.
 * Without JavaScript, or with reduced motion, it simply rests in place.
 */
export default function FloatingWatch() {
  const stage = useRef<HTMLElement>(null);
  const obj = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    const w = obj.current;
    if (!el || !w) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      w.style.setProperty("--p", "0.5");
      return;
    }
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh - r.top) / (r.height + vh));
      const e = easeOut(clamp((p - 0.1) / 0.36));
      const drift = Math.min(window.innerWidth * 0.6, 720);
      const x = (1 - e) * drift;
      const rot = (1 - e) * 30 - 6 + clamp((p - 0.5) / 0.5) * 12;
      const y = Math.sin(p * Math.PI) * -22 + (1 - e) * -60;
      const s = 0.86 + 0.14 * e;
      w.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      w.style.opacity = clamp(e * 1.7).toFixed(3);
      w.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    });
    io.observe(el);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const img = floatingWatch.image;

  return (
    <section ref={stage} className="float-stage" aria-label="Why watches">
      <p className="giant float-word" aria-hidden="true">
        TIME.
      </p>
      <p className="float-word-zh" aria-hidden="true">
        时间
      </p>

      <div className="wrap float-copy-top">
        <p className="mono-note">
          <T v={{ en: "Why watches", zh: "为什么是腕表" }} />
        </p>
        <h2 className="float-title">
          <T
            v={{
              en: "Some objects are made to outlive their owners.",
              zh: "有些物件，生来就比主人更长久。",
            }}
          />
        </h2>
      </div>

      <div className="float-track">
        <div className="float-sticky">
          <div ref={obj} className="float-obj">
            <Chain />
            <Image src={img.src} width={img.width} height={img.height} alt={img.alt} sizes="(max-width: 960px) 56vw, 380px" />
            <span className="float-sheen" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="wrap float-copy-bottom">
        <p className="float-caption">
          <T
            v={{
              en: "What draws me is never the name on the dial, but the history behind it.",
              zh: "吸引我的，从来不是表盘上的名字，而是它背后的历史。",
            }}
          />
        </p>
        <p className="hand-note float-hand">
          <T v={{ en: "— the reason for everything here", zh: "——这里一切的缘起" }} />
        </p>
      </div>
    </section>
  );
}
