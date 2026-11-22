"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A dialog box from an old computer, in the archive's colours. It does not
 * block anything: it can be dragged by its title bar and closed. Close it and
 * it comes back a moment later somewhere else, saying something new — at most
 * twice. With `idleSeconds` it only appears after the visitor has been still
 * that long, once per visit.
 */
export default function RetroWindow({
  title,
  children,
  again = [],
  buttons,
  idleSeconds,
  storageKey,
  className = "",
}: {
  title: string;
  children: ReactNode;
  /** What it says when it comes back (one entry per return, at most two). */
  again?: ReactNode[];
  buttons: { label: ReactNode; action?: "close" | "back" }[];
  idleSeconds?: number;
  storageKey?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(!idleSeconds);
  const [round, setRound] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const back = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!idleSeconds) return;
    try {
      if (storageKey && sessionStorage.getItem(storageKey)) return;
    } catch {
      /* storage can be unavailable; the window still works */
    }
    let t = window.setTimeout(() => setOpen(true), idleSeconds * 1000);
    const reset = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setOpen(true), idleSeconds * 1000);
    };
    const evs = ["pointermove", "keydown", "scroll", "touchstart"] as const;
    evs.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    return () => {
      window.clearTimeout(t);
      evs.forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, [idleSeconds, storageKey]);

  useEffect(() => () => window.clearTimeout(back.current), []);

  const close = () => {
    const rect = box.current?.getBoundingClientRect();
    setOpen(false);
    const returns = Math.min(2, again.length);
    if (round < returns) {
      /* it comes back somewhere else */
      back.current = window.setTimeout(() => {
        const w = rect?.width ?? 300;
        const h = rect?.height ?? 160;
        /* somewhere else on the screen, but always fully on it */
        const baseLeft = (rect?.left ?? 0) - pos.x;
        const baseTop = (rect?.top ?? 0) - pos.y;
        const left = 16 + Math.random() * Math.max(0, window.innerWidth - w - 32);
        const top = Math.min(Math.max(72, baseTop + (Math.random() - 0.5) * 240), Math.max(72, window.innerHeight - h - 16));
        setPos({ x: Math.round(left - baseLeft), y: Math.round(top - baseTop) });
        setRound((r) => r + 1);
        setOpen(true);
      }, 1400);
      return;
    }
    try {
      if (storageKey) sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div
      ref={box}
      className={`retro-window ${idleSeconds ? "retro-floating" : ""} ${round ? "retro-again" : ""} ${className}`}
      role="dialog"
      aria-modal="false"
      aria-label={title}
      style={{ translate: `${pos.x}px ${pos.y}px` }}
    >
      <div
        className="retro-bar"
        onPointerDown={(e) => {
          if ((e.target as Element).closest(".retro-close")) return;
          drag.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y };
          (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setPos({ x: drag.current.ox + e.clientX - drag.current.x, y: drag.current.oy + e.clientY - drag.current.y });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
      >
        <button type="button" className="retro-close" aria-label="Close" onClick={close} />
        <span className="retro-title">{title}</span>
      </div>
      <div className="retro-body">
        <span className="retro-icon" aria-hidden="true">
          {round ? "!" : "?"}
        </span>
        <div className="retro-text">{round ? again[round - 1] : children}</div>
      </div>
      <div className="retro-buttons">
        {buttons.map((b, i) => (
          <button
            key={i}
            type="button"
            className={`retro-btn${i === buttons.length - 1 ? " retro-default" : ""}`}
            onClick={() => {
              if (b.action === "back" && window.history.length > 1) window.history.back();
              else close();
            }}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
