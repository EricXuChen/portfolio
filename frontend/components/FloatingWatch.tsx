"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { floatingWatch } from "@/content/antiques";
import { Sunburst } from "./Deco";
import { T } from "./T";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The signature moment: as the page scrolls, a gold antique pocket watch
 * drifts in from the right, turns to face the reader and crosses the line
 * between an ivory page and a burgundy one. Without JavaScript, or with
 * reduced motion, it simply rests in place.
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
      const e = easeOut(clamp((p - 0.12) / 0.38));
      const drift = Math.min(window.innerWidth * 0.55, 620);
      const x = (1 - e) * drift;
      const rot = (1 - e) * 26 - 5 + clamp((p - 0.5) / 0.5) * 9;
      const y = Math.sin(p * Math.PI) * -18;
      const s = 0.9 + 0.1 * e;
      w.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      w.style.opacity = clamp(e * 1.6).toFixed(3);
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
    <section ref={stage} className="float-stage" aria-label="An antique pocket watch">
      <div className="wrap float-grid">
        <div className="float-copy float-copy-top">
          <p className="kicker">
            <T v={{ en: "The unexpected object", zh: "意外的物件" }} />
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

        <div className="float-track" aria-hidden="false">
          <div className="float-sticky">
            <Sunburst className="float-sun" rays={40} />
            <div ref={obj} className="float-obj">
              <Image src={img.src} width={img.width} height={img.height} alt={img.alt} sizes="(max-width: 960px) 62vw, 400px" />
              <span className="float-sheen" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="float-copy float-copy-bottom">
          <p className="float-caption">
            <span className="caption-num">
              <T v={floatingWatch.label} />
            </span>
            <T v={floatingWatch.caption} />
          </p>
          <p className="float-note">
            <T
              v={{
                en: "Roman numerals, a fluted crown, nothing more — restraint, made in gold.",
                zh: "罗马数字、带凹槽的表冠，别无其他——用黄金写成的克制。",
              }}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
