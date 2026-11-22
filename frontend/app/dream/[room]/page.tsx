import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DreamRoom from "@/components/DreamRoom";
import DreamPlay from "@/components/DreamPlay";
import { T } from "@/components/T";
import { DREAM_HREF, DREAM_ROOMS, DREAM_ELEMENTS, doorsFrom, dreamHref, type DreamRoomId } from "@/content/dream";

type Props = { params: Promise<{ room: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DREAM_ROOMS.map((r) => ({ room: r.id }));
}

const find = (id: string) => DREAM_ROOMS.find((r) => r.id === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { room } = await params;
  const r = find(room);
  if (!r) return {};
  return { title: `${r.name.en} — the dream`, description: r.caption.en, alternates: { canonical: dreamHref(r.id) } };
}

/* One room of the dream, whole: the room itself, a few lines, and three doors onwards. */
export default async function DreamRoomPage({ params }: Props) {
  const { room } = await params;
  const r = find(room);
  if (!r) notFound();
  const doors = doorsFrom(r.id as DreamRoomId);
  return (
    <>
      <DreamRoom id={r.id} page />
      <section className="dream-after" aria-label="About this room">
        <div className="wrap dream-after-grid">
          <div>
            <p className="mono-note">
              {r.num} — <T v={{ en: "The dream", zh: "梦" }} />
            </p>
            <h1 className="dream-room-title">
              <T v={r.name} />
            </h1>
            {r.lines.map((l, i) => (
              <p key={i} className={i ? "dream-line" : "dream-line dream-line-first"}>
                <T v={l} />
              </p>
            ))}
          </div>
          <ul className="dream-elements" aria-label="What is in this room">
            {r.elements.map((e) => (
              <li key={e}>
                <T v={DREAM_ELEMENTS[e]} />
              </li>
            ))}
          </ul>
        </div>
        <nav className="dream-doors dream-doors-onward" aria-label="Doors to other rooms">
          {doors.map((d, i) => (
            <Link key={d.id} className={`dream-door dream-door-onward dream-door-${i}`} href={dreamHref(d.id)} data-door="">
              <span className="door-light" aria-hidden="true" />
              <span className="door-leaf" aria-hidden="true" />
              <span className="door-label">
                {d.num} · <T v={d.name} />
              </span>
            </Link>
          ))}
        </nav>
        <p className="wrap dream-back">
          <Link className="text-link" href={DREAM_HREF}>
            ← <T v={{ en: "Back to the hall of doors", zh: "回到门厅" }} />
          </Link>
          {r.home ? (
            <Link className="text-link" href={r.home}>
              <T v={{ en: "Wake up", zh: "醒过来" }} /> ↗
            </Link>
          ) : null}
        </p>
        <DreamPlay others={DREAM_ROOMS.map((x) => dreamHref(x.id))} />
      </section>
    </>
  );
}
