"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * An engraved eye whose iris is a watch dial. The pupil follows the pointer;
 * it blinks now and then, and when it is clicked.
 */
export default function DreamEye({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [blink, setBlink] = useState(false);
  const [squint, setSquint] = useState(false);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = svg.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 400);
        /* too close: it narrows its eye at you */
        setSquint(d < Math.max(90, r.width * 0.9));
        svg.style.setProperty("--px", `${((dx / d) * 15 * k).toFixed(1)}px`);
        svg.style.setProperty("--py", `${((dy / d) * 7 * k).toFixed(1)}px`);
      });
    };
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onMove, { passive: true });
    }
    const timer = reduced
      ? 0
      : window.setInterval(() => {
          setBlink(true);
          window.setTimeout(() => setBlink(false), 180);
        }, 6400);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
    };
  }, []);

  const ticks = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg
      ref={ref}
      className={`dream-eye${blink ? " is-blinking" : squint ? " is-squinting" : ""} ${className}`}
      viewBox="0 0 200 110"
      role="img"
      aria-label="An eye"
      onClick={() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 220);
      }}
    >
      <defs>
        <clipPath id={`eye-shape-${uid}`}>
          <path d="M8 55 Q100 -14 192 55 Q100 124 8 55 Z" />
        </clipPath>
        <radialGradient id={`eye-iris-${uid}`} cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#4f7d63" />
          <stop offset="0.6" stopColor="#1f3a2c" />
          <stop offset="1" stopColor="#0c1a13" />
        </radialGradient>
      </defs>
      {/* lashes, engraved */}
      <g stroke="#c5a477" strokeWidth="1.4" strokeLinecap="round">
        {[-60, -40, -20, 0, 20, 40, 60].map((a) => (
          <path key={a} d={`M${100 + a * 1.25} ${22 - Math.cos((a * Math.PI) / 180) * 6} l${a / 8} -12`} />
        ))}
      </g>
      <g clipPath={`url(#eye-shape-${uid})`}>
        <rect width="200" height="110" fill="#f3e9d6" />
        <g className="dream-eye-iris">
          <circle cx="100" cy="55" r="30" fill={`url(#eye-iris-${uid})`} />
          {ticks.map((t) => (
            <path
              key={t}
              d="M100 28 V34"
              transform={`rotate(${t} 100 55)`}
              stroke="#dcc29a"
              strokeWidth={t % 90 === 0 ? 2.2 : 1}
            />
          ))}
          <circle cx="100" cy="55" r="11" fill="#14060a" />
          <circle cx="94" cy="49" r="3.4" fill="#fff8e8" opacity=".85" />
        </g>
        <g className="dream-eye-lids">
          <rect className="lid-top" x="0" y="-110" width="200" height="110" fill="#3a161c" />
          <rect className="lid-bottom" x="0" y="110" width="200" height="110" fill="#3a161c" />
        </g>
      </g>
      <path d="M8 55 Q100 -14 192 55 Q100 124 8 55 Z" fill="none" stroke="#dcc29a" strokeWidth="2" />
      <path d="M22 55 Q100 4 178 55" fill="none" stroke="#9a7a4c" strokeWidth=".8" />
    </svg>
  );
}
