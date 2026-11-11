/**
 * Original line illustrations drawn in code for this archive.
 * They stand in for photography until real watch macro photos are added.
 */

const TAU = Math.PI * 2;
const f = (n: number) => n.toFixed(1);

function polar(cx: number, cy: number, r: number, a: number) {
  // a = angle in radians, 0 at 12 o'clock, clockwise
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)] as const;
}

function rosePath(cx: number, cy: number, base: number, amp: number, petals: number, steps = 360) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const r = base + amp * Math.sin(petals * t);
    const [x, y] = polar(cx, cy, r, t);
    d += `${i === 0 ? "M" : "L"}${f(x)} ${f(y)}`;
  }
  return `${d}Z`;
}

function spiralPath(cx: number, cy: number, r0: number, r1: number, turns: number, steps = 420) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const p = i / steps;
    const a = p * turns * TAU;
    const r = r0 + (r1 - r0) * p;
    const [x, y] = polar(cx, cy, r, a);
    d += `${i === 0 ? "M" : "L"}${f(x)} ${f(y)}`;
  }
  return d;
}

/** Breguet-style “pomme” hand pointing straight up from (cx, cy); rotate with a transform. */
function breguetHand(cx: number, cy: number, len: number, ring: number, width: number) {
  const ringY = cy - len + ring * 2.2;
  return (
    <>
      <path
        d={`M${cx - width} ${cy + 14} L${cx - width * 0.35} ${ringY + ring} L${cx + width * 0.35} ${ringY + ring} L${cx + width} ${cy + 14} Z`}
      />
      <circle cx={cx} cy={ringY} r={ring} fill="none" strokeWidth={width * 0.9} />
      <path d={`M${cx - width * 0.35} ${ringY - ring} L${cx} ${cy - len} L${cx + width * 0.35} ${ringY - ring} Z`} />
    </>
  );
}

const NUMERALS = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

export function GuillocheDial({ className }: { className?: string }) {
  const c = 300;
  const copies = 40;
  const petals = 9;
  const roseStep = 360 / petals / copies;

  return (
    <svg
      className={className}
      viewBox="0 0 600 600"
      role="img"
      aria-label="Line drawing of a guilloché watch dial with pomme hands"
    >
      <defs>
        <clipPath id="gd-field">
          <circle cx={c} cy={c} r={214} />
        </clipPath>
        <clipPath id="gd-sub">
          <circle cx={c} cy={c + 112} r={46} />
        </clipPath>
        <path id="gd-rose" d={rosePath(c, c, 150, 70, petals, 540)} />
      </defs>

      {/* case and dial */}
      <circle cx={c} cy={c} r={294} className="ill-case" />
      <circle cx={c} cy={c} r={286} className="ill-line-strong" />
      <circle cx={c} cy={c} r={281} className="ill-dial" />

      {/* guilloché field */}
      <g clipPath="url(#gd-field)" className="ill-guilloche">
        {Array.from({ length: copies }, (_, i) => (
          <use key={i} href="#gd-rose" transform={`rotate(${f(i * roseStep)} ${c} ${c})`} />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={`r${i}`} cx={c} cy={c} r={18 + i * 4.2} />
        ))}
      </g>
      <circle cx={c} cy={c} r={214} className="ill-line" />
      <circle cx={c} cy={c} r={219} className="ill-line" />

      {/* chapter ring */}
      <circle cx={c} cy={c} r={268} className="ill-line" />
      <circle cx={c} cy={c} r={276} className="ill-line" />
      <g className="ill-ticks">
        {Array.from({ length: 60 }, (_, i) => {
          const a = (i / 60) * TAU;
          const five = i % 5 === 0;
          const [x1, y1] = polar(c, c, five ? 262 : 268, a);
          const [x2, y2] = polar(c, c, 276, a);
          return <line key={i} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} strokeWidth={five ? 1.6 : 0.7} />;
        })}
      </g>
      <g className="ill-numerals">
        {NUMERALS.map((n, i) => {
          const a = (i / 12) * TAU;
          const [x, y] = polar(c, c, 241, a);
          return (
            <text key={n} x={f(x)} y={f(y)} textAnchor="middle" dominantBaseline="central">
              {n}
            </text>
          );
        })}
      </g>

      {/* signature */}
      <text x={c} y={c - 92} textAnchor="middle" className="ill-signature">
        EXU.
      </text>
      <text x={c} y={c - 70} textAnchor="middle" className="ill-sub-signature">
        PERSONAL ARCHIVE
      </text>

      {/* small seconds */}
      <circle cx={c} cy={c + 112} r={50} className="ill-dial" />
      <g clipPath="url(#gd-sub)" className="ill-guilloche">
        {Array.from({ length: 18 }, (_, i) => (
          <circle key={i} cx={c} cy={c + 112} r={2 + i * 2.6} />
        ))}
      </g>
      <circle cx={c} cy={c + 112} r={50} className="ill-line" />
      <g className="ill-ticks">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * TAU;
          const [x1, y1] = polar(c, c + 112, 42, a);
          const [x2, y2] = polar(c, c + 112, 50, a);
          return <line key={i} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} strokeWidth={0.8} />;
        })}
      </g>
      <g className="ill-hand-seconds" data-hand="seconds" style={{ transform: "rotate(208deg)" }}>
        <line x1={c} y1={c + 120} x2={c} y2={c + 112 - 42} />
        <circle cx={c} cy={c + 112} r={2.6} />
      </g>

      {/* hands rest at 10:09; on the home page LiveDial sets them to the visitor's time */}
      <g className="ill-hand" data-hand="hour" style={{ transform: "rotate(-55deg)" }}>
        {breguetHand(c, c, 150, 9, 4.2)}
      </g>
      <g className="ill-hand" data-hand="minute" style={{ transform: "rotate(54deg)" }}>
        {breguetHand(c, c, 228, 8, 3.4)}
      </g>
      <circle cx={c} cy={c} r={7} className="ill-pinion" />
      <circle cx={c} cy={c} r={2.4} className="ill-dial" />
    </svg>
  );
}

/** Tourbillon cage above a city skyline — the motif of “The Night and Time”. */
export function TourbillonNight({ className }: { className?: string }) {
  const cx = 300;
  const cy = 230;
  const sky = [
    [0, 420], [40, 420], [40, 360], [92, 360], [92, 392], [120, 392], [120, 300], [150, 300], [150, 280],
    [172, 280], [172, 300], [196, 300], [196, 370], [236, 370], [236, 330], [262, 330], [262, 404],
    [338, 404], [338, 318], [356, 318], [356, 250], [366, 238], [376, 250], [376, 318], [394, 318],
    [394, 384], [430, 384], [430, 342], [470, 342], [470, 296], [500, 296], [500, 372], [538, 372],
    [538, 330], [568, 330], [568, 400], [600, 400],
  ];
  const skyline = sky.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const windows: [number, number][] = [];
  for (let x = 128; x < 146; x += 8) for (let y = 312; y < 392; y += 14) windows.push([x, y]);
  for (let x = 476; x < 496; x += 8) for (let y = 308; y < 372; y += 14) windows.push([x, y]);
  for (let x = 344; x < 390; x += 10) for (let y = 330; y < 404; y += 16) windows.push([x, y]);

  return (
    <svg className={className} viewBox="0 0 600 480" role="img" aria-label="Line drawing of a tourbillon cage above a city skyline">
      <g className="night-lines">
        {/* cage */}
        <circle cx={cx} cy={cy} r={128} strokeWidth={0.8} />
        <circle cx={cx} cy={cy} r={118} strokeWidth={1.6} />
        {[0, 120, 240].map((deg) => (
          <g key={deg} transform={`rotate(${deg} ${cx} ${cy})`}>
            <path d={`M${cx - 10} ${cy - 20} C ${cx - 18} ${cy - 70}, ${cx - 8} ${cy - 100}, ${cx} ${cy - 118}`} />
            <path d={`M${cx + 10} ${cy - 20} C ${cx + 18} ${cy - 70}, ${cx + 8} ${cy - 100}, ${cx} ${cy - 118}`} />
            <circle cx={cx} cy={cy - 118} r={5} />
          </g>
        ))}
        {/* balance wheel */}
        <circle cx={cx} cy={cy} r={76} strokeWidth={2.2} />
        <circle cx={cx} cy={cy} r={70} strokeWidth={0.6} />
        {[30, 150, 270].map((deg) => {
          const [x, y] = polar(cx, cy, 70, (deg / 360) * TAU);
          return <line key={deg} x1={cx} y1={cy} x2={f(x)} y2={f(y)} strokeWidth={1.4} />;
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const [x, y] = polar(cx, cy, 79, (i / 8) * TAU + 0.2);
          return <circle key={i} cx={f(x)} cy={f(y)} r={2.6} />;
        })}
        {/* hairspring */}
        <path d={spiralPath(cx, cy, 9, 54, 7)} strokeWidth={0.7} />
        <circle cx={cx} cy={cy} r={7} strokeWidth={1.4} />
        {/* crescent moon */}
        <path d="M512 52 A26 26 0 1 0 512 104 A20 20 0 1 1 512 52 Z" strokeWidth={1.1} />
        {/* city */}
        <path d={skyline} strokeWidth={1.2} />
        <line x1={0} y1={440} x2={600} y2={440} strokeWidth={0.6} />
      </g>
      <g className="night-windows">
        {windows.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={3} height={5} />
        ))}
      </g>
    </svg>
  );
}

/** A small movement-bridge motif with Côtes de Genève stripes, for the business section. */
export function MovementPlate({ className }: { className?: string }) {
  const stripes = Array.from({ length: 16 }, (_, i) => 40 + i * 22);
  return (
    <svg className={className} viewBox="0 0 400 260" role="img" aria-label="Line drawing of a watch movement bridge with Geneva stripes">
      <defs>
        <clipPath id="mp-bridge">
          <path d="M30 60 Q 30 30 60 30 L 300 30 Q 370 30 370 100 L 370 160 Q 370 230 300 230 L 60 230 Q 30 230 30 200 Z" />
        </clipPath>
      </defs>
      <g className="plate-lines">
        <g clipPath="url(#mp-bridge)">
          {stripes.map((x) => (
            <path key={x} d={`M${x} 20 Q ${x + 30} 130 ${x} 240`} strokeWidth={0.6} />
          ))}
        </g>
        <path d="M30 60 Q 30 30 60 30 L 300 30 Q 370 30 370 100 L 370 160 Q 370 230 300 230 L 60 230 Q 30 230 30 200 Z" strokeWidth={1.4} />
        {[
          [90, 80],
          [300, 70],
          [310, 190],
          [80, 190],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={11} strokeWidth={1.2} />
            <line x1={x - 8} y1={y} x2={x + 8} y2={y} strokeWidth={1.4} transform={`rotate(${x / 3} ${x} ${y})`} />
          </g>
        ))}
        {[
          [200, 130, 30],
          [130, 130, 14],
          [270, 130, 14],
        ].map(([x, y, r]) => (
          <g key={`j${x}`}>
            <circle cx={x} cy={y} r={r} strokeWidth={1.2} />
            <circle cx={x} cy={y} r={r * 0.4} strokeWidth={1} />
          </g>
        ))}
      </g>
    </svg>
  );
}
