"use client";

import { useEffect } from "react";

/**
 * The small physics and play that work across the whole archive, with one set
 * of listeners for every page:
 *
 *  - [data-swing]   pocket watches hang from their top edge. Click one and it
 *                   swings; grab it, pull it aside and let go, and it swings
 *                   like a real pendulum (damped, so it slowly comes to rest).
 *  - [data-tilt]    framed works lean towards the pointer; a click lights a ring.
 *  - [data-letters] big words whose letters lift and slip near the pointer.
 *  - .stamp         archive stamps press down and leave an inked mark.
 *  - second hands   every drawn second hand is set to the visitor's clock.
 */

type Drag = { id: number; x: number; y: number; grab: number; start: number; moved: boolean; samples: [number, number][] };
type Swing = {
  el: HTMLElement;
  host: HTMLElement | null;
  follows: HTMLElement[];
  theta: number;
  omega: number;
  w0: number;
  gamma: number;
  drag: Drag | null;
};

const MAX = 1.25; // rad, about 72°

export default function Interactions() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const root = document.documentElement;

    /* ---------- second hands keep the visitor's seconds ---------- */
    const now = new Date();
    root.style.setProperty("--sec-delay", `${-(now.getSeconds() + now.getMilliseconds() / 1000)}s`);

    /* ---------- pendulums ---------- */
    const swings = new WeakMap<HTMLElement, Swing>();
    const active = new Set<Swing>();
    let raf = 0;
    let last = 0;

    const get = (el: HTMLElement): Swing => {
      let s = swings.get(el);
      if (!s) {
        const period = parseFloat(el.dataset.period || "1.8");
        const host = el.closest<HTMLElement>("[data-swing-host]");
        s = {
          el,
          host,
          follows: host ? Array.from(host.querySelectorAll<HTMLElement>("[data-swing-follow]")) : [],
          theta: 0,
          omega: 0,
          w0: (2 * Math.PI) / period,
          gamma: reduced ? 2.6 : 0.42,
          drag: null,
        };
        swings.set(el, s);
      }
      return s;
    };

    const paint = (s: Swing) => {
      const deg = (s.theta * 180) / Math.PI;
      const rot = `${deg.toFixed(3)}deg`;
      const moving = Math.abs(deg) > 0.05 || !!s.drag;
      s.el.style.rotate = rot;
      s.host?.style.setProperty("--swing", Math.sin(s.theta).toFixed(4));
      s.el.classList.toggle("is-moving", moving);
      for (const f of s.follows) {
        f.style.rotate = rot;
        f.classList.toggle("is-moving", moving);
      }
    };

    const step = (t: number) => {
      const dt = Math.min(0.034, (t - last) / 1000 || 0.016);
      last = t;
      for (const s of active) {
        if (s.drag) continue;
        const n = 4;
        const h = dt / n;
        for (let i = 0; i < n; i++) {
          const acc = -s.w0 * s.w0 * Math.sin(s.theta) - 2 * s.gamma * s.omega;
          s.omega += acc * h;
          s.theta += s.omega * h;
        }
        if (Math.abs(s.theta) < 0.0015 && Math.abs(s.omega) < 0.004) {
          s.theta = 0;
          s.omega = 0;
          active.delete(s);
        }
        paint(s);
      }
      raf = active.size ? requestAnimationFrame(step) : 0;
    };
    const wake = (s: Swing) => {
      active.add(s);
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    /** A push: from rest it swings out to about 29°; pushes while it swings add up to the limit. */
    const push = (s: Swing, dir: number) => {
      const amp = reduced ? 0.12 : 0.62;
      if (Math.abs(s.theta) < 0.02 && Math.abs(s.omega) < 0.05) s.omega = dir * s.w0 * amp;
      else s.omega += Math.sign(s.omega || dir) * s.w0 * amp * 0.6;
      const lim = s.w0 * MAX;
      s.omega = Math.max(-lim, Math.min(lim, s.omega));
      wake(s);
    };

    const pivotOf = (el: HTMLElement) => {
      const parent = (el.offsetParent as HTMLElement | null) ?? document.body;
      const r = parent.getBoundingClientRect();
      const fy = parseFloat(el.dataset.pivot || "0");
      return { x: r.left + el.offsetLeft + el.offsetWidth / 2, y: r.top + el.offsetTop + el.offsetHeight * fy };
    };
    const angleTo = (el: HTMLElement, x: number, y: number) => {
      const p = pivotOf(el);
      return Math.atan2(-(x - p.x), Math.max(8, y - p.y));
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as Element | null)?.closest("[data-no-swing]")) return; // the repeater slide is pressed, not swung
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-swing]");
      if (!el) return;
      if (e.pointerType === "mouse") e.preventDefault(); // no text selection or image drag
      const s = get(el);
      s.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, grab: angleTo(el, e.clientX, e.clientY), start: s.theta, moved: false, samples: [] };
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* capture is a nicety */
      }
      active.delete(s);
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-swing]");
      const s = el ? swings.get(el) : undefined;
      if (!s?.drag || s.drag.id !== e.pointerId) return;
      const d = s.drag;
      if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 5) return;
      d.moved = true;
      e.preventDefault();
      const a = d.start + (angleTo(s.el, e.clientX, e.clientY) - d.grab);
      s.theta = Math.max(-MAX, Math.min(MAX, a));
      d.samples.push([performance.now(), s.theta]);
      if (d.samples.length > 6) d.samples.shift();
      paint(s);
    };
    const onUp = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-swing]");
      const s = el ? swings.get(el) : undefined;
      if (!s?.drag || s.drag.id !== e.pointerId) return;
      const d = s.drag;
      s.drag = null;
      if (!d.moved) {
        /* a click: push it away from the side that was touched */
        if (e.type === "pointercancel") return;
        const p = pivotOf(s.el);
        push(s, e.clientX >= p.x ? 1 : -1);
        return;
      }
      const sm = d.samples;
      if (sm.length >= 2) {
        const [t0, a0] = sm[0];
        const [t1, a1] = sm[sm.length - 1];
        const v = (a1 - a0) / Math.max(0.016, (t1 - t0) / 1000);
        const lim = s.w0 * MAX;
        s.omega = Math.max(-lim, Math.min(lim, reduced ? v * 0.3 : v));
      }
      wake(s);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      if ((e.target as Element | null)?.closest("[data-no-swing]")) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-swing]");
      if (!el) return;
      e.preventDefault();
      push(get(el), Math.random() > 0.5 ? 1 : -1);
    };

    /* ---------- frames lean towards the pointer; a click lights a ring ---------- */
    let tiltRaf = 0;
    const onTilt = (e: PointerEvent) => {
      if (!fine || reduced) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]");
      if (!el) return;
      cancelAnimationFrame(tiltRaf);
      tiltRaf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
        el.classList.add("is-tilting");
      });
    };
    const onTiltOut = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]");
      if (!el || (e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("is-tilting");
    };
    const glow = (el: HTMLElement) => {
      el.classList.remove("is-glow");
      void el.offsetWidth;
      el.classList.add("is-glow");
      window.setTimeout(() => el.classList.remove("is-glow"), 1300);
    };

    /* ---------- stamps press down and leave a mark ---------- */
    const stampIt = (el: Element, x: number, y: number) => {
      const host = el.parentElement;
      if (!host) return;
      el.classList.remove("is-pressed");
      void (el as HTMLElement).getBoundingClientRect();
      el.classList.add("is-pressed");
      const marks = host.querySelectorAll(":scope > .stamp-mark");
      if (marks.length >= 3) marks[0].remove();
      const r = el.getBoundingClientRect();
      const hr = host.getBoundingClientRect();
      const mark = el.cloneNode(true) as SVGElement;
      mark.removeAttribute("class");
      mark.setAttribute("class", "stamp-mark");
      mark.setAttribute("aria-hidden", "true");
      const cs = getComputedStyle(el);
      mark.style.color = cs.color;
      mark.style.mixBlendMode = cs.mixBlendMode;
      mark.style.opacity = String(Math.max(0.6, Math.min(0.8, parseFloat(cs.opacity) * 1.3)));
      const size = r.width * 0.7;
      mark.style.width = `${size}px`;
      mark.style.left = `${x - hr.left - size / 2 + (Math.random() - 0.5) * 40}px`;
      mark.style.top = `${y - hr.top - size / 2 + r.height * 0.55}px`;
      mark.style.rotate = `${((Math.random() - 0.5) * 50).toFixed(1)}deg`;
      host.appendChild(mark);
    };

    /* ---------- letters that lift near the pointer ---------- */
    let letters: HTMLElement[] = [];
    const collect = () => {
      letters = Array.from(document.querySelectorAll<HTMLElement>("[data-letters] .fl"));
    };
    collect();
    let collectT = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(collectT);
      collectT = window.setTimeout(collect, 200);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    let lx = -9999;
    let ly = -9999;
    let lraf = 0;
    const lift = () => {
      lraf = 0;
      const vh = window.innerHeight;
      for (const l of letters) {
        const r = l.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh || r.width === 0) continue;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const reach = Math.max(110, r.height * 0.85);
        const d = Math.hypot(lx - cx, ly - cy);
        const k = d < reach ? 1 - d / reach : 0;
        if (k <= 0) {
          if (l.style.translate) {
            l.style.translate = "";
            l.style.rotate = "";
          }
          continue;
        }
        const side = cx > lx ? 1 : -1;
        l.style.translate = `${(side * k * r.height * 0.05).toFixed(1)}px ${(-k * r.height * 0.15).toFixed(1)}px`;
        l.style.rotate = `${(side * k * 7).toFixed(2)}deg`;
      }
    };
    const onLetters = (e: PointerEvent) => {
      if (reduced || e.pointerType === "touch") return;
      lx = e.clientX;
      ly = e.clientY;
      if (!lraf) lraf = requestAnimationFrame(lift);
    };
    const onScroll = () => {
      if (!lraf && lx > -9999) lraf = requestAnimationFrame(lift);
    };

    /* ---------- one click handler for the small things ---------- */
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const frame = t?.closest<HTMLElement>("[data-tilt]");
      if (frame) glow(frame);
      const stamp = t?.closest(".stamp");
      if (stamp) stampIt(stamp, e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      onMove(e);
      onTilt(e);
      onLetters(e);
    };

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointermove", onPointerMove, { passive: false });
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
    document.addEventListener("pointerout", onTiltOut, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      document.removeEventListener("pointerout", onTiltOut);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      mo.disconnect();
      window.clearTimeout(collectT);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(tiltRaf);
      cancelAnimationFrame(lraf);
    };
  }, []);
  return null;
}
