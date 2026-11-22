"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { DreamRoomId } from "@/content/dream";

/**
 * What you can do inside a dream room. Mounted once in every room; it finds
 * its room and wires up only what that room has:
 *   hallway/stairs  scrolling walks you in (or up)
 *   frames          the frames lean after the pointer
 *   sky             clouds are pushed by the pointer and can be dragged;
 *                   tapping the sky leaves a new star
 *   pool            tapping the water sends out a ripple
 *   stairs          tapping a step lights it
 *   doors           a door opens, and you come out in another room
 *   tv              tapping the screen changes the channel
 *   bedroom         the music box plays (only when tapped), the pinwheel
 *                   spins, the balloons can be pulled down and let go
 */

/* An original little tune for the music box (A minor, three-four). [semitones from A4, beats] */
const TUNE: [number, number][] = [
  [7, 1], [12, 1], [10, 1], [7, 2], [3, 1],
  [5, 1], [7, 1], [3, 1], [0, 3],
  [3, 1], [7, 1], [12, 1], [15, 2], [14, 1],
  [12, 1], [10, 1], [7, 1], [12, 3],
  [10, 1], [7, 1], [5, 1], [3, 2], [7, 1],
  [5, 1], [2, 1], [-2, 1], [0, 3],
];

function playTune(ctx: AudioContext, onEnd: () => void) {
  const beat = 0.34;
  let t = ctx.currentTime + 0.05;
  const master = ctx.createGain();
  master.gain.value = 0.14;
  master.connect(ctx.destination);
  for (const [semi, beats] of TUNE) {
    const f = 440 * Math.pow(2, semi / 12) * 2; // an octave up: tiny comb teeth
    for (const [mult, amp] of [
      [1, 1],
      [2.01, 0.28],
      [4.2, 0.08],
    ] as const) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f * mult;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(amp, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 1.6 / mult);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 1.7);
    }
    t += beat * beats;
  }
  const ms = (t - ctx.currentTime) * 1000 + 600;
  const timer = window.setTimeout(onEnd, ms);
  return () => {
    window.clearTimeout(timer);
    master.disconnect();
  };
}

export default function DreamPlay({ room, others }: { room?: DreamRoomId; others: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const off: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(el: EventTarget, type: K, fn: (e: HTMLElementEventMap[K]) => void, opts?: AddEventListenerOptions) => {
      el.addEventListener(type, fn as EventListener, opts);
      off.push(() => el.removeEventListener(type, fn as EventListener, opts));
    };
    const inside = (e: Event, sel: string) => !!(e.target as Element | null)?.closest(sel);
    const local = (e: { clientX: number; clientY: number }) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height };
    };
    const busy = "[data-swing], .dream-eye, a, button, .retro-window, [data-cloud], [data-balloon]";

    /* ---- walking in: how far the room has scrolled through the screen ---- */
    if (room === "hallway" || room === "stairs") {
      let raf = 0;
      const walk = () => {
        raf = 0;
        const r = host.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
        host.style.setProperty("--walk", (reduced ? 0.5 : p).toFixed(3));
      };
      walk();
      on(window, "scroll", () => {
        if (!raf) raf = requestAnimationFrame(walk);
      }, { passive: true });
      off.push(() => cancelAnimationFrame(raf));
    }

    /* ---- the frames lean after the pointer ---- */
    if (room === "frames" && !reduced) {
      on(host, "pointermove", (e) => {
        const p = local(e);
        host.style.setProperty("--mx", ((p.x / p.w - 0.5) * 2).toFixed(3));
        host.style.setProperty("--my", ((p.y / p.h - 0.5) * 2).toFixed(3));
      });
      on(host, "pointerleave", () => {
        host.style.setProperty("--mx", "0");
        host.style.setProperty("--my", "0");
      });
    }

    /* ---- clouds: pushed by the pointer, dragged by hand ---- */
    const clouds = Array.from(host.querySelectorAll<HTMLElement>(".cloud-push"));
    if (clouds.length) {
      const st = clouds.map(() => ({ x: 0, y: 0, px: 0, py: 0 }));
      let dragging: { i: number; id: number; sx: number; sy: number; ox: number; oy: number } | null = null;
      let px = -9999;
      let py = -9999;
      let raf = 0;
      const tick = () => {
        raf = 0;
        let moving = false;
        clouds.forEach((c, i) => {
          const s = st[i];
          if (!dragging || dragging.i !== i) {
            const r = c.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const d = Math.hypot(px - cx, py - cy);
            const reach = Math.max(160, r.width * 0.8);
            const k = d < reach ? (1 - d / reach) * 70 : 0;
            const tx = k ? ((cx - px) / d) * k : 0;
            const ty = k ? ((cy - py) / d) * k * 0.5 : 0;
            s.px += (tx - s.px) * 0.12;
            s.py += (ty - s.py) * 0.12;
            if (Math.abs(tx - s.px) > 0.3 || Math.abs(ty - s.py) > 0.3) moving = true;
          }
          c.style.translate = `${(s.x + s.px).toFixed(1)}px ${(s.y + s.py).toFixed(1)}px`;
        });
        if (moving) raf = requestAnimationFrame(tick);
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };
      on(host, "pointermove", (e) => {
        if (dragging && dragging.id === e.pointerId) {
          const s = st[dragging.i];
          s.x = dragging.ox + e.clientX - dragging.sx;
          s.y = dragging.oy + e.clientY - dragging.sy;
          e.preventDefault();
        } else if (!reduced && e.pointerType !== "touch") {
          px = e.clientX;
          py = e.clientY;
        }
        kick();
      });
      on(host, "pointerleave", () => {
        px = py = -9999;
        kick();
      });
      clouds.forEach((c, i) => {
        on(c, "pointerdown", (e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          dragging = { i, id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: st[i].x, oy: st[i].y };
          c.setPointerCapture?.(e.pointerId);
          c.classList.add("is-held");
          e.stopPropagation();
        });
        const drop = () => {
          if (dragging?.i === i) dragging = null;
          c.classList.remove("is-held");
        };
        on(c, "pointerup", drop);
        on(c, "pointercancel", drop);
        on(c, "pointermove", (e) => {
          if (dragging?.i !== i) return;
          st[i].x = dragging.ox + e.clientX - dragging.sx;
          st[i].y = dragging.oy + e.clientY - dragging.sy;
          kick();
        });
      });
      off.push(() => cancelAnimationFrame(raf));
    }

    /* ---- sky: a tap leaves a new star ---- */
    if (room === "sky") {
      on(host, "click", (e) => {
        if (inside(e, busy)) return;
        const p = local(e);
        const layer = host.querySelector(".dream-sky-layer");
        if (!layer) return;
        const stars = layer.querySelectorAll(".dream-star.is-new");
        if (stars.length > 40) stars[0].remove();
        const s = document.createElement("span");
        s.className = `dream-star is-new dream-star-${Math.floor(Math.random() * 7)}`;
        s.style.left = `${p.x}px`;
        s.style.top = `${p.y}px`;
        layer.appendChild(s);
      });
    }

    /* ---- pool: a tap sends out a ripple ---- */
    if (room === "pool") {
      on(host, "click", (e) => {
        if (inside(e, busy)) return;
        const p = local(e);
        const layer = host.querySelector(".dream-pool-layer");
        if (!layer) return;
        for (let i = 0; i < (reduced ? 1 : 3); i++) {
          const r = document.createElement("span");
          r.className = "dream-ripple";
          r.style.left = `${p.x}px`;
          r.style.top = `${p.y}px`;
          r.style.animationDelay = `${i * 0.22}s`;
          layer.appendChild(r);
          window.setTimeout(() => r.remove(), 2200 + i * 220);
        }
      });
    }

    /* ---- stairs: a tapped step lights up ---- */
    if (room === "stairs") {
      host.querySelectorAll<HTMLElement>("[data-step]").forEach((s) => {
        s.style.pointerEvents = "auto";
        on(s, "click", () => {
          s.classList.remove("is-lit");
          void s.offsetWidth;
          s.classList.add("is-lit");
        });
      });
    }

    /* ---- doors: open, then come out in another room ---- */
    host.querySelectorAll<HTMLAnchorElement>("[data-door]").forEach((d) => {
      on(d, "click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        d.classList.add("is-open");
        const href = d.getAttribute("href") || others[0];
        window.setTimeout(() => router.push(href), reduced ? 60 : 700);
      });
    });

    /* ---- television: tap to change the channel ---- */
    const tv = host.querySelector<HTMLElement>("[data-tv]");
    if (tv) {
      const screen = tv.querySelector<HTMLElement>(".tv-screen");
      const num = tv.querySelector<HTMLElement>(".tv-num");
      let ch = 0;
      on(tv, "click", () => {
        ch = (ch + 1) % 6;
        if (!screen) return;
        screen.classList.add("is-switching");
        window.setTimeout(() => {
          screen.dataset.channel = String(ch);
          if (num) num.textContent = `CH ${ch}`;
          screen.classList.remove("is-switching");
        }, reduced ? 0 : 220);
      });
    }

    /* ---- bedroom: music box, pinwheel, balloons ---- */
    const box = host.querySelector<HTMLElement>("[data-musicbox]");
    if (box) {
      let ctx: AudioContext | null = null;
      let stop: (() => void) | null = null;
      on(box, "click", () => {
        if (stop) {
          stop();
          stop = null;
          box.classList.remove("is-playing");
          return;
        }
        try {
          const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          ctx = ctx ?? new AC();
          void ctx.resume();
          box.classList.add("is-playing");
          stop = playTune(ctx, () => {
            box.classList.remove("is-playing");
            stop = null;
          });
        } catch {
          box.classList.add("is-playing");
          window.setTimeout(() => box.classList.remove("is-playing"), 4000);
        }
      });
      off.push(() => {
        stop?.();
        void ctx?.close();
      });
    }
    const pin = host.querySelector<HTMLElement>("[data-pinwheel]");
    if (pin) {
      on(pin, "click", () => {
        pin.classList.remove("is-spun");
        void pin.offsetWidth;
        pin.classList.add("is-spun");
      });
    }
    host.querySelectorAll<HTMLElement>("[data-balloon]").forEach((b) => {
      let d: { id: number; sx: number; sy: number } | null = null;
      on(b, "pointerdown", (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        d = { id: e.pointerId, sx: e.clientX, sy: e.clientY };
        b.setPointerCapture?.(e.pointerId);
        b.classList.add("is-held");
        b.style.transition = "none";
      });
      on(b, "pointermove", (e) => {
        if (!d || d.id !== e.pointerId) return;
        e.preventDefault();
        b.style.translate = `${e.clientX - d.sx}px ${e.clientY - d.sy}px`;
      });
      const letGo = () => {
        if (!d) return;
        d = null;
        b.classList.remove("is-held");
        b.style.transition = "";
        b.style.translate = "";
      };
      on(b, "pointerup", letGo);
      on(b, "pointercancel", letGo);
    });

    return () => off.forEach((f) => f());
  }, [room, others, router]);

  return <span ref={ref} hidden />;
}
