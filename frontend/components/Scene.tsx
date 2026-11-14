import type { CSSProperties } from "react";
import { SCENE_FILES, type SceneUse } from "@/content/scenes";

const DEFAULT_OPACITY = { ghost: 0.45, wallpaper: 0.15, paper: 0.12, frieze: 0.6, oval: 0.9 } as const;

/**
 * A trip photograph faded into the wall behind a section. Purely decorative:
 * no caption, hidden from screen readers. The host element needs the
 * `has-scene` class (it isolates the stacking context so the photo sits
 * between the section's own background and its content).
 */
export default function Scene({ use, eager = false, className = "" }: { use: SceneUse; eager?: boolean; className?: string }) {
  const file = SCENE_FILES[use.id];
  const cls = [
    "scene",
    `scene-${use.kind}`,
    use.side ? `scene-${use.side}` : "",
    use.bleed ? "scene-bleed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const style = { "--o": use.o ?? DEFAULT_OPACITY[use.kind] } as CSSProperties;

  return (
    <div className={cls} style={style} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/scenes/${use.id}-1600.webp`}
        srcSet={`/scenes/${use.id}-800.webp 800w, /scenes/${use.id}-1600.webp 1600w`}
        sizes={use.kind === "oval" ? "(max-width: 700px) 200px, 360px" : "(max-width: 700px) 260px, 100vw"}
        width={file.w}
        height={file.h}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={use.pos ? { objectPosition: use.pos } : undefined}
      />
    </div>
  );
}
