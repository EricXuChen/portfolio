"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * A very faint dream over the whole archive: film grain, darker corners, a
 * trail of gold dust behind the pointer, and a videotape skip when you move
 * from one page to another. None of it can be clicked; text stays readable.
 */
export default function DreamLayer() {
  const pathname = usePathname();
  const canvas = useRef<HTMLCanvasElement>(null);
  const jump = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  /* Keep it smooth on slow machines: for a few seconds after each page opens,
     count frames. If the browser can't keep up (under 40 a second), the slow
     background motion (fog, drifting clouds, the idle sway) is switched off;
     everything you touch still works. */
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("dream-lite")) return;
    let n = 0;
    let raf = 0;
    let t0 = 0;
    const start = window.setTimeout(() => {
      t0 = performance.now();
      const tick = () => {
        n++;
        const dt = performance.now() - t0;
        if (dt < 2500) raf = requestAnimationFrame(tick);
        else if (!document.hidden && (n * 1000) / dt < 40) root.classList.add("dream-lite");
      };
      raf = requestAnimationFrame(tick);
    }, 1200);
    return () => {
      window.clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  /* the videotape skip between pages */
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = jump.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.remove("is-on");
    void el.offsetWidth;
    el.classList.add("is-on");
    const t = window.setTimeout(() => el.classList.remove("is-on"), 380);
    return () => window.clearTimeout(t);
  }, [pathname]);

  /* gold dust behind the pointer */
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = () => {
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    type Mote = { x: number; y: number; vx: number; vy: number; life: number; r: number; star: boolean };
    const motes: Mote[] = [];
    let raf = 0;
    let lx = 0;
    let ly = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        m.life -= 0.022;
        if (m.life <= 0) {
          motes.splice(i, 1);
          continue;
        }
        m.x += m.vx;
        m.y += m.vy;
        m.vy += 0.012;
        const a = Math.min(1, m.life * 0.95);
        ctx.fillStyle = `rgba(236, 214, 170, ${a.toFixed(3)})`;
        if (m.star) {
          const s = m.r * 2.4;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y - s);
          ctx.lineTo(m.x + s * 0.22, m.y - s * 0.22);
          ctx.lineTo(m.x + s, m.y);
          ctx.lineTo(m.x + s * 0.22, m.y + s * 0.22);
          ctx.lineTo(m.x, m.y + s);
          ctx.lineTo(m.x - s * 0.22, m.y + s * 0.22);
          ctx.lineTo(m.x - s, m.y);
          ctx.lineTo(m.x - s * 0.22, m.y - s * 0.22);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = motes.length ? requestAnimationFrame(draw) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const d = Math.hypot(e.clientX - lx, e.clientY - ly);
      if (d < 9) return;
      lx = e.clientX;
      ly = e.clientY;
      if (motes.length < 70) {
        motes.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.4,
          life: 1,
          r: 1.1 + Math.random() * 1.7,
          star: Math.random() < 0.18,
        });
      }
      if (!raf) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", size);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", size);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="dream-layer" aria-hidden="true">
      <div className="dl-vignette" />
      <div className="dl-grain" />
      <canvas ref={canvas} className="dl-dust" />
      <div ref={jump} className="dl-jump" />
    </div>
  );
}
