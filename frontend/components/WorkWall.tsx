import Image from "next/image";
import Link from "next/link";
import { artHref, type Artwork } from "@/content/artwork";
import { blurFor } from "@/content/placeholders";
import { T } from "./T";

/**
 * A wall of framed works, each one linking to its plate. Three hangs so the
 * studio's rooms do not all look alike:
 *   salon  — staggered, mixed sizes, like a crowded nineteenth-century wall
 *   ledger — one work per row, small, with a wide margin of empty wall
 *   strip  — a single line of frames running sideways
 */
export default function WorkWall({ works, hang = "salon" }: { works: Artwork[]; hang?: "salon" | "ledger" | "strip" }) {
  return (
    <ol className={`ww ww-${hang}`}>
      {works.map((a, i) => {
        const img = a.images?.[0];
        if (!img) return null;
        return (
          <li key={a.slug} className={`ww-item ww-item-${(i % 5) + 1}`}>
            <Link href={artHref(a.slug)} className="ww-link">
              <span className={`ww-frame${i % 3 === 1 ? " ww-velvet" : ""}`}>
                <Image
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt={img.alt}
                  sizes={hang === "ledger" ? "(max-width: 800px) 70vw, 30vw" : "(max-width: 800px) 80vw, 28vw"}
                  placeholder={blurFor(img.src) ? "blur" : "empty"}
                  blurDataURL={blurFor(img.src)}
                />
              </span>
              <span className="ww-cap">
                <span className="archive-id">{a.id}</span>
                <span className="ww-title">
                  <span className="l-en" lang="en">
                    {a.title}
                  </span>
                  <span className="l-zh" lang="zh-Hans">
                    《{a.titleZh}》
                  </span>
                </span>
                <span className="ww-meta">
                  {a.medium ? <T v={a.medium} /> : null}
                  {a.year ? <> · {a.year}</> : null}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
