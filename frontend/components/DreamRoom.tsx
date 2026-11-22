import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { DREAM_ROOMS, doorsFrom, dreamHref, dreamRoom, type DreamRoomId } from "@/content/dream";
import DreamEye from "./DreamEye";
import DreamPlay from "./DreamPlay";
import Pendulum from "./Pendulum";
import RetroWindow from "./RetroWindow";
import { T } from "./T";

/**
 * A room from the archive's dream. Each one has a pocket watch hanging in the
 * middle (pull it), an eye that watches you, a videotape counter and one line
 * of text — and something of its own to touch. On the real pages a room sits
 * between two sections; on its own page (`page`) it opens the page.
 */
export default function DreamRoom({ id, page = false }: { id: DreamRoomId; page?: boolean }) {
  const room = dreamRoom(id);
  const has = (k: string) => (room.elements as string[]).includes(k);
  return (
    <section
      className={`dream dream-room-${id}${room.photo ? " dream-has-photo" : ""}${page ? " dream-hero" : ""}`}
      data-dream={id}
      aria-label={`${room.name.en} — ${room.caption.en}`}
    >
      {room.photo ? (
        <picture className="dream-photo" aria-hidden="true">
          <source media="(max-width: 700px)" srcSet={`/dream/${room.photo}-800.webp`} />
          <img src={`/dream/${room.photo}-1600.webp`} alt="" width={1600} height={1000} loading={page ? "eager" : "lazy"} decoding="async" draggable={false} />
        </picture>
      ) : null}

      {SCENES[id]}

      <div className="dream-fog" aria-hidden="true" />
      <div className="dream-bloom" aria-hidden="true" />

      {id === "doors" ? <Doors from={id} /> : null}
      {id === "hallway" ? (
        <Link className="dream-end-door" href={dreamHref("doors")} aria-label="The door at the end of the hallway" />
      ) : null}

      <Pendulum className="dream-pend" />
      <DreamEye className="dream-eye-pos" />

      {has("arrow") ? <PixelArrow room={id} /> : null}
      {has("window") ? (
        <RetroWindow
          title={id === "tv" ? "NO SIGNAL" : "Mirror.app"}
          className="dream-window"
          again={
            id === "tv"
              ? [<T key="a" v={{ en: "still no signal.", zh: "还是没有信号。" }} />, <T key="b" v={{ en: "it is still playing.", zh: "它还在放。" }} />]
              : [<T key="a" v={{ en: "you closed a mirror.", zh: "你关掉了一面镜子。" }} />, <T key="b" v={{ en: "there are more mirrors.", zh: "镜子还有很多。" }} />]
          }
          buttons={[{ label: <T v={{ en: "OK", zh: "好" }} /> }]}
        >
          {id === "tv" ? (
            <T v={{ en: "the programme has ended. please stay.", zh: "节目已经结束。请留下。" }} />
          ) : (
            <T v={{ en: "you are in the gallery. the gallery is in you.", zh: "你在镜廊里。镜廊也在你里面。" }} />
          )}
        </RetroWindow>
      ) : null}

      <p className="dream-caption glitch" data-text-en={room.caption.en} data-text-zh={room.caption.zh}>
        <T v={room.caption} />
      </p>
      <p className="dream-vhs" aria-hidden="true">
        <span className="dream-rec">●</span> PLAY ▶ {room.stamp}
        <span className="dream-num">{room.num}</span>
      </p>
      <div className="dream-scan" aria-hidden="true" />
      <div className="dream-grain" aria-hidden="true" />

      {!page ? (
        <Link className="dream-enter" href={dreamHref(id)}>
          <T v={{ en: "Step into this room", zh: "走进这个房间" }} /> <span aria-hidden="true">→</span>
        </Link>
      ) : null}
      <DreamPlay room={id} others={DREAM_ROOMS.filter((r) => r.id !== id).map((r) => dreamHref(r.id))} />
    </section>
  );
}

/* ------------------------------------------------------------ the rooms */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const vars = (o: Record<string, string | number>) => o as CSSProperties;

const SCENES: Record<DreamRoomId, ReactNode> = {
  hallway: (
    <div className="dream-scene dream-hall" aria-hidden="true">
      <div className="dream-floor" />
      <div className="dream-hall-walk">
        {range(6).map((i) => (
          <span key={i} className={`dream-arch dream-arch-${i}`} />
        ))}
        <span className="dream-light" />
      </div>
    </div>
  ),
  sky: (
    <div className="dream-scene dream-sky-layer" aria-hidden="true">
      <span className="dream-sun" />
      {range(6).map((i) => (
        <span key={i} className={`dream-cloud dream-cloud-${i}`}>
          <span className="cloud-push" data-cloud="" />
        </span>
      ))}
      {range(16).map((i) => (
        <span key={i} className={`dream-star dream-star-${i % 7}`} style={{ left: `${(i * 37 + 5) % 97}%`, top: `${(i * 23 + 7) % 62}%` }} />
      ))}
    </div>
  ),
  pool: (
    <div className="dream-scene dream-pool-layer" aria-hidden="true">
      <div className="dream-tiles" />
      <span className="dream-caustic" />
      <div className="dream-water" data-water="" />
      <span className="dream-rim" />
      <span className="dream-ladder" />
      <span className="dream-ring" />
    </div>
  ),
  stairs: (
    <div className="dream-scene dream-stairs-layer" aria-hidden="true">
      <span className="dream-sun dream-sun-top" />
      <div className="dream-stairs-walk">
        {range(15).map((i) => (
          <span key={i} className="dream-step" data-step="" style={vars({ "--i": i })} />
        ))}
        <span className="dream-top-door" />
      </div>
      {range(4).map((i) => (
        <span key={i} className={`dream-cloud dream-cloud-low dream-cloud-${i}`}>
          <span className="cloud-push" />
        </span>
      ))}
    </div>
  ),
  frames: (
    <div className="dream-scene dream-frames-layer" aria-hidden="true">
      <div className="dream-checker" />
      <div className="dream-frames">
        {range(7).map((i) => (
          <span key={i} className={`dream-frame dream-frame-${i}`} style={vars({ "--i": i })} />
        ))}
        <span className="dream-frame-eye">
          <DreamEye />
        </span>
      </div>
    </div>
  ),
  doors: <div className="dream-scene dream-doors-layer" aria-hidden="true" />,
  tv: (
    <div className="dream-scene dream-tv-layer">
      <button type="button" className="dream-tv" aria-label="An old television — tap the screen to change the channel" data-tv="">
        <span className="tv-ears" aria-hidden="true" />
        <span className="tv-body" aria-hidden="true">
          <span className="tv-screen" data-channel="0">
            <span className="tv-static" />
            <span className="tv-ch tv-ch-1">
              <DreamEye />
            </span>
            <span className="tv-ch tv-ch-2" />
            <span className="tv-ch tv-ch-3">
              <span>
                <T v={{ en: "NO SIGNAL", zh: "没有信号" }} />
              </span>
            </span>
            <span className="tv-ch tv-ch-4">
              <span className="tv-cloud" />
              <span className="tv-cloud tv-cloud-b" />
            </span>
            <span className="tv-ch tv-ch-5">
              <span>▶ PLAY 00:00:00</span>
            </span>
            <span className="tv-num">CH 0</span>
          </span>
          <span className="tv-knobs" />
        </span>
        <span className="tv-legs" aria-hidden="true" />
      </button>
    </div>
  ),
  bedroom: (
    <div className="dream-scene dream-bed-layer">
      <span className="dream-nightlight" aria-hidden="true" />
      {range(4).map((i) => (
        <span key={i} className={`dream-cloud dream-cloud-ceiling dream-cloud-${i}`} aria-hidden="true">
          <span className="cloud-push" />
        </span>
      ))}
      <div className="dream-balloons" aria-hidden="true">
        {range(3).map((i) => (
          <span key={i} className={`dream-balloon dream-balloon-${i}`} data-balloon="">
            <span className="balloon-body" />
            <span className="balloon-string" />
          </span>
        ))}
      </div>
      <button type="button" className="dream-musicbox" data-musicbox="" aria-label="A music box — tap to wind it (it plays a short tune)">
        <span className="mb-lid" aria-hidden="true" />
        <span className="mb-dancer" aria-hidden="true" />
        <span className="mb-box" aria-hidden="true" />
        <span className="mb-crank" aria-hidden="true" />
        <span className="mb-notes" aria-hidden="true">
          ♪ <span>♫</span> ♪
        </span>
      </button>
      <button type="button" className="dream-pinwheel" data-pinwheel="" aria-label="A paper pinwheel — tap to make it spin">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <g className="pw-blades">
            <path d="M50 50 L50 6 A22 22 0 0 1 72 28 Z" fill="#e7c9c0" />
            <path d="M50 50 L94 50 A22 22 0 0 1 72 72 Z" fill="#8a3a46" />
            <path d="M50 50 L50 94 A22 22 0 0 1 28 72 Z" fill="#e7c9c0" />
            <path d="M50 50 L6 50 A22 22 0 0 1 28 28 Z" fill="#8a3a46" />
            <circle cx="50" cy="50" r="4" fill="#c5a477" />
          </g>
        </svg>
        <span className="pw-stick" aria-hidden="true" />
      </button>
    </div>
  ),
  gallery: (
    <div className="dream-scene dream-gallery-layer" aria-hidden="true">
      <span className="dream-mirror-floor" />
      <span className="dream-chandelier-glow" />
    </div>
  ),
};

function Doors({ from }: { from: DreamRoomId }) {
  const rooms = doorsFrom(from);
  return (
    <div className="dream-doors dream-doors-room">
      {rooms.map((r, i) => (
        <Link key={r.id} className={`dream-door dream-door-${i}`} href={dreamHref(r.id)} data-door="">
          <span className="door-light" aria-hidden="true" />
          <span className="door-leaf" aria-hidden="true" />
          <span className="door-label">
            {r.num} · <T v={r.name} />
          </span>
        </Link>
      ))}
    </div>
  );
}

/* a classic pointer, drawn pixel by pixel: B outline, W fill */
const ARROW = [
  "B",
  "BB",
  "BWB",
  "BWWB",
  "BWWWB",
  "BWWWWB",
  "BWWWWWB",
  "BWWWWWWB",
  "BWWWWWWWB",
  "BWWWWWWWWB",
  "BWWWWWBBBBB",
  "BWWBWWB",
  "BWB.BWWB",
  "BB..BWWB",
  "B....BWWB",
  ".....BWWB",
  "......BB",
];

function PixelArrow({ room }: { room: DreamRoomId }) {
  const text: Record<string, { en: string; zh: string }> = {
    hallway: { en: "keep walking", zh: "继续走" },
    doors: { en: "open one", zh: "开一扇" },
    gallery: { en: "this one", zh: "就是这个" },
  };
  return (
    <span className={`dream-arrow dream-arrow-${room}`} aria-hidden="true">
      <svg viewBox="0 0 11 17" shapeRendering="crispEdges">
        {ARROW.flatMap((row, y) =>
          Array.from(row).map((c, x) =>
            c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={c === "B" ? "#1c0a0d" : "#f6ead2"} />,
          ),
        )}
      </svg>
      <span className="dream-arrow-text">
        <T v={text[room] ?? { en: "here", zh: "这里" }} />
      </span>
    </span>
  );
}
