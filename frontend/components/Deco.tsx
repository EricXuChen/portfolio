/* ------------------------------------------------------------------ */
/*  Art Deco and Rococo ornaments — drawn as thin lines in currentColor */
/* ------------------------------------------------------------------ */

/** Half sunburst: rays fanning up from a point, the classic Deco motif. */
export function Sunburst({ className, rays = 36 }: { className?: string; rays?: number }) {
  const cx = 300;
  const cy = 300;
  const lines = Array.from({ length: rays + 1 }, (_, i) => {
    const a = Math.PI + (Math.PI * i) / rays;
    const long = i % 2 === 0;
    const r1 = long ? 70 : 110;
    const r2 = long ? 296 : 250;
    return (
      <line
        key={i}
        x1={(cx + r1 * Math.cos(a)).toFixed(1)}
        y1={(cy + r1 * Math.sin(a)).toFixed(1)}
        x2={(cx + r2 * Math.cos(a)).toFixed(1)}
        y2={(cy + r2 * Math.sin(a)).toFixed(1)}
      />
    );
  });
  return (
    <svg className={className} viewBox="0 0 600 300" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="0.8" vectorEffect="non-scaling-stroke">
        {lines}
        <path d="M 4 300 A 296 296 0 0 1 596 300" />
        <path d="M 50 300 A 250 250 0 0 1 550 300" />
        <path d="M 190 300 A 110 110 0 0 1 410 300" />
        <path d="M 230 300 A 70 70 0 0 1 370 300" />
        <path d="M 270 300 A 30 30 0 0 1 330 300" />
      </g>
    </svg>
  );
}

/** A Deco divider: double rules stepping in toward a central lozenge. */
export function DecoRule({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 20" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 10 H118 M30 6 H112 M30 14 H112" />
        <path d="M320 10 H202 M290 6 H208 M290 14 H208" />
        <path d="M160 1 L169 10 L160 19 L151 10 Z" />
        <path d="M160 5 L165 10 L160 15 L155 10 Z" fill="currentColor" />
        <path d="M138 10 L142 6 L146 10 L142 14 Z M174 10 L178 6 L182 10 L178 14 Z" />
      </g>
    </svg>
  );
}

/** A Rococo rocaille: a scallop shell between two C-scrolls. */
export function Rocaille({ className }: { className?: string }) {
  const half = (
    <g>
      <path d="M86 30 C 72 37, 56 37, 47 28 C 40 21, 45 11, 54 13 C 61 15, 61 23, 55 24" />
      <path d="M47 28 C 34 35, 18 33, 9 24 C 4 19, 5 12, 11 12 C 16 12, 17 18, 13 19" />
      <path d="M70 34 C 66 40, 58 43, 50 41" />
      <path d="M30 31 C 26 37, 18 39, 12 36" />
    </g>
  );
  return (
    <svg className={className} viewBox="0 0 200 48" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        {half}
        <g transform="translate(200 0) scale(-1 1)">{half}</g>
        {/* shell */}
        <path d="M100 38 C 88 30, 86 16, 100 6 C 114 16, 112 30, 100 38 Z" />
        <path d="M100 38 L100 9 M100 38 L93 13 M100 38 L107 13 M100 38 L89 21 M100 38 L111 21" />
        <path d="M90 38 C 94 42, 106 42, 110 38" />
      </g>
    </svg>
  );
}
