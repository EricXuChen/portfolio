import type { ReactNode } from "react";
import type { Bi } from "@/content/types";
import { T } from "./T";

/*
 * Small typographic pieces for the editorial layouts.
 * Each one is a voice: the giant word, the technical note, the hand-written
 * aside, the line that runs up the edge of the page.
 */

/** A single word set so large it becomes the picture. It may run off the page. */
export function GiantWord({
  word,
  className = "",
  outline = false,
  italic = false,
  script = false,
  drift,
}: {
  word: string;
  className?: string;
  outline?: boolean;
  italic?: boolean;
  /** Set in the flowing copperplate script. */
  script?: boolean;
  /** Slides sideways while scrolling: positive drifts right, negative left. */
  drift?: number;
}) {
  return (
    <p
      className={`giant${outline ? " giant-outline" : ""}${italic ? " giant-italic" : ""}${script ? " giant-script" : ""} ${className}`}
      aria-hidden="true"
      data-drift={drift}
    >
      {word}
    </p>
  );
}

/** Tiny technical annotation in a typewriter voice. */
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`mono-note ${className}`}>{children}</p>;
}

/** A hand-written aside. */
export function Hand({ v, className = "" }: { v: Bi; className?: string }) {
  return (
    <p className={`hand-note ${className}`}>
      <T v={v} />
    </p>
  );
}

/** A line set vertically along the edge of a section. */
export function Edge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`edge-text ${className}`} aria-hidden="true">
      {children}
    </p>
  );
}
