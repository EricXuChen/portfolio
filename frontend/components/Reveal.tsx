"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Blocks that ease into view as the visitor scrolls down to them. */
const SELECTOR = [
  ".section-head",
  ".index-list li",
  ".trio-item",
  ".studio > *",
  ".closing-inner > *",
  ".about-intro > *",
  ".plain-card",
  ".pull-quote",
  ".values li",
  ".split-2 > *",
  ".piece",
  ".tl-item",
  ".chapter",
  ".featured-inner > *",
  ".work",
  ".plate",
  ".quote-plate > *",
  ".g-item",
  ".cab-item",
  ".archive-strip li",
  ".step",
  ".stage",
].join(",");

/**
 * Scroll motion for the whole site, in one place:
 * - blocks below the first screen fade up as they arrive;
 * - figures marked data-count count up from zero once;
 * - images marked data-parallax drift slightly against the scroll.
 * Without JavaScript, or with reduced motion, everything is simply shown.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const fold = window.innerHeight * 0.9;
    const items = Array.from(document.querySelectorAll<HTMLElement>(`main ${SELECTOR.split(",").join(", main ")}`)).filter(
      (el) => !el.classList.contains("is-in") && el.getBoundingClientRect().top > fold,
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
    items.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });

    /* count-up figures */
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const countIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          countIo.unobserve(el);
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? "";
          if (!Number.isFinite(target) || target <= 0) continue;
          const pad = el.dataset.pad ? Number(el.dataset.pad) : 0;
          const t0 = performance.now();
          const dur = Math.min(1600, 600 + target * 18);
          const tick = (now: number) => {
            const k = Math.min(1, (now - t0) / dur);
            const v = Math.round(target * (1 - Math.pow(1 - k, 3)));
            el.textContent = String(v).padStart(pad, "0") + suffix;
            if (k < 1) requestAnimationFrame(tick);
          };
          el.textContent = String(0).padStart(pad, "0") + suffix;
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => countIo.observe(el));

    /* parallax */
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of layers) {
        const box = el.parentElement?.getBoundingClientRect();
        if (!box || box.bottom < -200 || box.top > vh + 200) continue;
        const speed = Number(el.dataset.parallax) || 0.12;
        const offset = (box.top + box.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    if (layers.length) {
      paint();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io.disconnect();
      countIo.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
