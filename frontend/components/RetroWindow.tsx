"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A dialog box from an old computer, in the archive's colours. It does not
 * block anything: it can be dragged by its title bar and closed. With
 * `idleSeconds` it only appears after the visitor has been still that long,
 * once per visit.
 */
export default function RetroWindow({
  title,
  children,
  buttons,
  idleSeconds,
  storageKey,
  className = "",
}: {
  title: string;
  children: ReactNode;
  buttons: { label: ReactNode; action?: "close" | "back" }[];
  idleSeconds?: number;
  storageKey?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(!idleSeconds);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

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

  const close = () => {
    setOpen(false);
    try {
      if (storageKey) sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div
      className={`retro-window ${idleSeconds ? "retro-floating" : ""} ${className}`}
      role="dialog"
      aria-modal="false"
      aria-label={title}
      style={{ translate: `${pos.x}px ${pos.y}px` }}
    >
      <div
        className="retro-bar"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y };
          (e.target as Element).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setPos({ x: drag.current.ox + e.clientX - drag.current.x, y: drag.current.oy + e.clientY - drag.current.y });
        }}
        onPointerUp={() => (drag.current = null)}
      >
        <button type="button" className="retro-close" aria-label="Close" onClick={close} />
        <span className="retro-title">{title}</span>
      </div>
      <div className="retro-body">
        <span className="retro-icon" aria-hidden="true">
          ?
        </span>
        <div className="retro-text">{children}</div>
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
