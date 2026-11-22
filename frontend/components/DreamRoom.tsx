import Image from "next/image";
import type { Bi } from "@/content/types";
import DreamEye from "./DreamEye";
import { T } from "./T";

/**
 * A room from a dream, between two real ones: a corridor of doorways on a
 * checkered floor, a burgundy sky with drifting clouds, or a tiled pool.
 * Each holds a small pocket watch you can set swinging, and one line of text.
 */
export default function DreamRoom({ variant, caption, stamp }: { variant: "hallway" | "sky" | "pool"; caption: Bi; stamp: string }) {
  return (
    <section className={`dream dream-${variant}`} aria-label={caption.en}>
      <div className="dream-scan" aria-hidden="true" />
      {variant === "hallway" ? (
        <div className="dream-hall" aria-hidden="true">
          <div className="dream-floor" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`dream-arch dream-arch-${i}`} />
          ))}
          <span className="dream-light" />
        </div>
      ) : null}
      {variant === "sky" ? (
        <div className="dream-sky-layer" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`dream-cloud dream-cloud-${i}`} />
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className={`dream-star dream-star-${i % 7}`} style={{ left: `${(i * 37) % 97}%`, top: `${(i * 23) % 60}%` }} />
          ))}
        </div>
      ) : null}
      {variant === "pool" ? (
        <div className="dream-pool-layer" aria-hidden="true">
          <div className="dream-tiles" />
          <span className="dream-caustic" />
          <div className="dream-water" />
          <span className="dream-rim" />
          <span className="dream-ladder" />
        </div>
      ) : null}

      <span className="dream-thread" aria-hidden="true" />
      <Image
        className="dream-watch"
        src="/objects/gold-pocket-watch.png"
        width={619}
        height={860}
        alt="A small pocket watch — click to set it swinging"
        sizes="120px"
        data-swing=""
        tabIndex={0}
      />
      <DreamEye className="dream-eye-pos" />

      <p className="dream-caption glitch" data-text-en={caption.en} data-text-zh={caption.zh}>
        <T v={caption} />
      </p>
      <p className="dream-vhs" aria-hidden="true">
        <span className="dream-rec">●</span> PLAY ▶ {stamp}
      </p>
    </section>
  );
}
