/**
 * A concert flute drawn like an engraving: crown, head joint with lip plate,
 * body with open-hole keys on a rod, foot joint. Decorative only.
 */
export function Flute({ className }: { className?: string }) {
  const bodyKeys = [392, 446, 500, 574, 628, 682, 760, 814, 868];
  const footKeys = [990, 1046, 1100];
  return (
    <svg className={className} viewBox="0 0 1200 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="flute-silver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e4c2" />
          <stop offset="0.35" stopColor="#dcc29a" />
          <stop offset="0.62" stopColor="#9a7a4c" />
          <stop offset="1" stopColor="#5a4227" />
        </linearGradient>
        <radialGradient id="flute-cup" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#f6ead0" />
          <stop offset="0.6" stopColor="#c5a477" />
          <stop offset="1" stopColor="#7d5a2b" />
        </radialGradient>
      </defs>

      {/* tube: head joint, body, foot joint */}
      <g className="flute-tube" stroke="#2a1014" strokeWidth="1.2">
        <rect x="58" y="88" width="250" height="26" rx="3" fill="url(#flute-silver)" />
        <rect x="314" y="89" width="612" height="24" rx="2" fill="url(#flute-silver)" />
        <rect x="932" y="90" width="236" height="22" rx="2" fill="url(#flute-silver)" />
        {/* crown */}
        <path d="M58 90 Q34 92 30 101 Q34 110 58 112 Z" fill="url(#flute-cup)" />
        {/* tenon rings */}
        <rect x="304" y="86" width="12" height="30" rx="2" fill="url(#flute-cup)" />
        <rect x="922" y="87" width="12" height="28" rx="2" fill="url(#flute-cup)" />
      </g>

      {/* engraved highlight and shadow lines along the tube */}
      <g fill="none" strokeLinecap="round">
        <path d="M64 93 H300 M320 94 H920 M938 95 H1162" stroke="rgba(255,248,232,.75)" strokeWidth="1.4" />
        <path d="M64 109 H300 M320 108 H920 M938 107 H1162" stroke="rgba(42,16,20,.45)" strokeWidth="1" />
      </g>

      {/* lip plate and embouchure hole */}
      <ellipse cx="196" cy="94" rx="30" ry="11" fill="url(#flute-cup)" stroke="#2a1014" strokeWidth="1.2" />
      <ellipse cx="196" cy="94" rx="11" ry="4.5" fill="#2a1014" />

      {/* key rod */}
      <path d="M360 80 H905 M970 82 H1130" stroke="#c5a477" strokeWidth="3" strokeLinecap="round" />
      <path d="M360 80 H905 M970 82 H1130" stroke="#2a1014" strokeWidth="0.8" strokeOpacity=".5" fill="none" />

      {/* open-hole keys on the body */}
      {bodyKeys.map((x) => (
        <g key={x}>
          <path d={`M${x} 82 V86`} stroke="#9a7a4c" strokeWidth="3" />
          <circle cx={x} cy="99" r="15" fill="url(#flute-cup)" stroke="#2a1014" strokeWidth="1.1" />
          <circle cx={x} cy="99" r="9.5" fill="none" stroke="rgba(42,16,20,.55)" strokeWidth="1" />
          <circle cx={x} cy="99" r="4.2" fill="#2a1014" />
        </g>
      ))}

      {/* thumb key and trill levers */}
      <ellipse cx="560" cy="120" rx="14" ry="6" fill="url(#flute-cup)" stroke="#2a1014" strokeWidth="1" />
      <path d="M720 116 q24 14 52 2 M736 118 q16 10 34 0" stroke="#c5a477" strokeWidth="2.4" fill="none" />

      {/* foot joint keys and rollers */}
      {footKeys.map((x) => (
        <g key={x}>
          <path d={`M${x} 84 V88`} stroke="#9a7a4c" strokeWidth="3" />
          <circle cx={x} cy="100" r="13" fill="url(#flute-cup)" stroke="#2a1014" strokeWidth="1.1" />
        </g>
      ))}
      <rect x="1120" y="112" width="34" height="8" rx="4" fill="url(#flute-cup)" stroke="#2a1014" strokeWidth="0.9" />
    </svg>
  );
}

/**
 * A loose stave drifting across the page, with a handful of notes — not a
 * real melody, just the shape of one.
 */
export function Stave({ className }: { className?: string }) {
  const lines = [0, 1, 2, 3, 4];
  const notes = [
    [120, 2.5],
    [210, 1.5],
    [300, 2],
    [390, 0.5],
    [470, 1],
    [560, 3],
    [650, 2.5],
    [745, 1.5],
    [830, 2],
    [920, 3.5],
    [1010, 3],
  ];
  const y = (step: number) => 40 + step * 14;
  return (
    <svg className={className} viewBox="0 0 1100 140" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {lines.map((l) => (
          <path key={l} d={`M0 ${y(l)} C 300 ${y(l) - 18}, 700 ${y(l) + 18}, 1100 ${y(l) - 4}`} />
        ))}
      </g>
      <g fill="currentColor">
        {notes.map(([x, step], i) => {
          const wobble = Math.sin((x / 1100) * Math.PI * 2) * 9;
          const cy = y(step) + wobble;
          return (
            <g key={i}>
              <ellipse cx={x} cy={cy} rx="8.5" ry="6" transform={`rotate(-22 ${x} ${cy})`} />
              <path d={`M${x + 7.5} ${cy - 2} V${cy - 44}`} stroke="currentColor" strokeWidth="1.4" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
