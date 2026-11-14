import Image from "next/image";
import Link from "next/link";
import type { RoomLink } from "@/content/pages";
import { T } from "./T";

/** Doors to the other rooms where the same thing shows up. */
export default function RoomLinks({ title, links, variant = "list" }: { title: { en: string; zh: string }; links: RoomLink[]; variant?: "list" | "cards" }) {
  if (!links.length) return null;
  return (
    <nav className={`wrap room-links room-links-${variant}`} aria-label={title.en}>
      <p className="mono-note room-links-head">
        <T v={title} />
      </p>
      <ol>
        {links.map((l, i) => (
          <li key={l.href + i}>
            <Link href={l.href} className="room-link">
              {l.img ? (
                <span className="room-link-img">
                  <Image src={l.img.src} width={l.img.width} height={l.img.height} alt="" sizes="160px" />
                </span>
              ) : null}
              <span className="room-link-kicker">{l.kicker ?? String(i + 1).padStart(2, "0")}</span>
              <span className="room-link-label">
                <T v={l.label} />
              </span>
              <span className="room-link-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
