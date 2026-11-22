"use client";

import { useEffect } from "react";

/**
 * Small interactions that work across the whole archive:
 *  - click any pocket watch marked [data-swing] and it swings like a pendulum,
 *    then slowly comes to rest;
 *  - framed works marked [data-tilt] lean a little towards the pointer.
 * One listener for the whole page, nothing to set up per element.
 */
export default function Interactions() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const swing = (el: HTMLElement) => {
      el.classList.remove("is-swinging", "is-swinging-soft");
      void el.offsetWidth; // restart the animation on every click
      el.classList.add(reduced ? "is-swinging-soft" : "is-swinging");
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-swing]");
      if (el) swing(el);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-swing]");
      if (el) {
        e.preventDefault();
        swing(el);
      }
    };
    const onEnd = (e: AnimationEvent) => {
      const el = e.target as HTMLElement;
      if (e.animationName.startsWith("pendulum")) el.classList.remove("is-swinging", "is-swinging-soft");
    };

    /* lean framed works towards the pointer (fine pointers only) */
    const fine = window.matchMedia("(pointer: fine)").matches && !reduced;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]");
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
        el.classList.add("is-tilting");
      });
    };
    const onLeave = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]");
      if (!el || (e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("is-tilting");
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    document.addEventListener("animationend", onEnd);
    if (fine) {
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onLeave, { passive: true });
    }
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("animationend", onEnd);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
