import Image from "next/image";

/**
 * A pocket watch hanging on a chain from the top of its room. Click it and it
 * swings; grab it, pull it aside and let go, and it swings like a real
 * pendulum until it comes to rest. The second hand keeps the visitor's time.
 * The physics lives in Interactions (one engine for every [data-swing]).
 */
export default function Pendulum({
  size = "big",
  className = "",
  label = "A pocket watch on a chain — click it, or pull it and let go",
}: {
  size?: "big" | "mid" | "small";
  className?: string;
  label?: string;
}) {
  return (
    <div className={`pend pend-${size} ${className}`} data-swing-host="">
      <span className="pend-shadow" aria-hidden="true" />
      <div
        className="pend-arm"
        data-swing=""
        data-period={size === "big" ? "2.3" : size === "mid" ? "1.8" : "1.4"}
        role="button"
        tabIndex={0}
        aria-label={label}
      >
        <span className="pend-chain" aria-hidden="true" />
        <span className="pend-watch">
          <Image
            src="/objects/pocket-watch-plain.webp"
            width={619}
            height={860}
            alt=""
            draggable={false}
            sizes={size === "big" ? "(max-width: 700px) 46vw, 34vh" : "110px"}
            quality={size === "big" ? 60 : undefined}
          />
          <svg className="pend-hand" viewBox="0 0 619 860" aria-hidden="true" focusable="false">
            <g className="pend-sec">
              <path d="M302.5 610 L301 560 L302.5 336 L304 560 Z" fill="#1b1416" />
              <circle cx="302.5" cy="603" r="9" fill="none" stroke="#1b1416" strokeWidth="3" />
              <circle cx="302.5" cy="560" r="6.5" fill="#1b1416" />
              <circle cx="302.5" cy="560" r="2.2" fill="#c5a477" />
            </g>
          </svg>
          <span className="pend-glint" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
