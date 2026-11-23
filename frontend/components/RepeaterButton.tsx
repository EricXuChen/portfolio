"use client";

import { useId, useRef, useSyncExternalStore } from "react";
import { getServerState, getState, strike, subscribe } from "./repeater";

/**
 * The repeater slide. On a hanging watch it sits on the left of the case
 * (variant "slide"); elsewhere it is a small button ("pill") or the big
 * button of the repeater page ("big"). Pressing it strikes the time now.
 */
export default function RepeaterButton({
  variant = "slide",
  className = "",
  label,
  shake,
}: {
  variant?: "slide" | "pill" | "big";
  className?: string;
  label?: React.ReactNode;
  /** What trembles with each strike (a selector); by default the watch the slide sits on. */
  shake?: string;
}) {
  const s = useSyncExternalStore(subscribe, getState, getServerState);
  const ref = useRef<HTMLButtonElement>(null);
  const id = useId();
  const playing = s.playing && s.owner === id;
  return (
    <button
      ref={ref}
      type="button"
      className={`repeater repeater-${variant}${playing ? " is-striking" : ""} ${className}`}
      data-no-swing=""
      aria-label={playing ? "Stop the minute repeater" : "Minute repeater — strike the time it is now"}
      aria-pressed={playing}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        const host = ref.current?.closest("[data-swing-host], .repeater-host");
        const watch = ((shake ? document.querySelector(shake) : host?.querySelector(".pend-arm[data-swing] .pend-watch, .interlude-watch, .repeater-shake") ?? host) as HTMLElement | null) ?? null;
        strike(watch, id);
      }}
    >
      {variant === "slide" ? (
        <span className="repeater-slide-knob" aria-hidden="true" />
      ) : (
        <>
          <span className="repeater-bell" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M4 15 Q12 4 20 15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="12" cy="17.5" r="1.6" fill="currentColor" />
              <path d="M7 10.5 Q12 3 17 10.5" fill="none" stroke="currentColor" strokeWidth="1" opacity=".6" />
            </svg>
          </span>
          <span className="repeater-label">{label}</span>
        </>
      )}
    </button>
  );
}
