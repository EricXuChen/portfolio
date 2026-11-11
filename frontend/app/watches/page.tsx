import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ViewSwitch from "@/components/ViewSwitch";
import { Kicker, T } from "@/components/T";
import { blurFor } from "@/content/placeholders";
import { publicOnly } from "@/content/types";
import { collection, collectionIntro, pieceHref } from "@/content/watches";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "The personal watch collection of Eric Xu — an independent tourbillon, a Tudor in silver, a Cuervo y Sobrinos Prominente, a Raketa calendar, vintage Swiss pieces and a Danish pocket watch.",
};

export default function CollectionPage() {
  const watches = publicOnly(collection);

  return (
    <>
      <header className="page-head wrap page-head-center">
        <Kicker num="02" v={{ en: "Horology", zh: "制表" }} />
        <h1 className="display">
          <T v={collectionIntro.title} />
        </h1>
        <p className="lede">
          <T v={collectionIntro.lede} />
        </p>
        <p className="count-line">
          <span className="count-num">{String(watches.length).padStart(2, "0")}</span>
          <T v={{ en: "pieces in the archive", zh: "件收藏" }} />
        </p>
      </header>

      <section className="wrap section" aria-label="Watches">
        <ViewSwitch>
          {/* Gallery */}
          <div className="collection-grid">
            {watches.map((w, i) => (
              <article key={w.id} id={w.id} className="piece case">
                <Link href={pieceHref(w.id)} className="piece-link" aria-label={`${w.id} · ${w.brand} ${w.model.en}`}>
                  <span className="velvet">
                    <span className="img-frame ratio-45">
                      <Image
                        src={w.image.src}
                        width={w.image.width}
                        height={w.image.height}
                        alt={w.image.alt}
                        priority={i < 2}
                        sizes="(max-width: 960px) 100vw, 50vw"
                        placeholder={blurFor(w.image.src) ? "blur" : "empty"}
                        blurDataURL={blurFor(w.image.src)}
                      />
                      <span className="frame-label" aria-hidden="true">
                        <T v={{ en: "View the record", zh: "查看档案" }} /> →
                      </span>
                    </span>
                  </span>
                </Link>
                <div className="piece-text">
                  <p className="piece-meta">
                    <span className="archive-id">{w.id}</span>
                    <span className="piece-era">
                      <T v={w.era} />
                    </span>
                  </p>
                  <h2 className="piece-brand">
                    <Link href={pieceHref(w.id)}>{w.brand}</Link>
                  </h2>
                  <p className="piece-model">
                    <T v={w.model} />
                  </p>
                  <dl className="piece-facts">
                    <div>
                      <dt>Ref.</dt>
                      <dd>{w.reference || <span className="muted">—</span>}</dd>
                    </div>
                    <div>
                      <dt>
                        <T v={{ en: "Movement", zh: "机芯" }} />
                      </dt>
                      <dd>
                        <T v={w.movement} />
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <T v={{ en: "Case", zh: "表壳" }} />
                      </dt>
                      <dd>
                        <T v={w.case} />
                      </dd>
                    </div>
                  </dl>
                  <p className="piece-note">
                    <T v={w.note} />
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Index */}
          <div className="collection-index">
            <div className="ix-head" aria-hidden="true">
              <span>No.</span>
              <span />
              <span>
                <T v={{ en: "Watch", zh: "腕表" }} />
              </span>
              <span>Ref.</span>
              <span>
                <T v={{ en: "Era", zh: "年代" }} />
              </span>
              <span>
                <T v={{ en: "Movement", zh: "机芯" }} />
              </span>
              <span />
            </div>
            <ol>
              {watches.map((w) => (
                <li key={w.id}>
                  <Link href={pieceHref(w.id)} className="ix-row">
                    <span className="ix-id archive-id">{w.id}</span>
                    <span className="ix-thumb">
                      <Image
                        src={w.image.src}
                        width={w.image.width}
                        height={w.image.height}
                        alt=""
                        sizes="64px"
                        placeholder={blurFor(w.image.src) ? "blur" : "empty"}
                        blurDataURL={blurFor(w.image.src)}
                      />
                    </span>
                    <span className="ix-watch">
                      <span className="ix-brand">{w.brand}</span>
                      <span className="ix-model">
                        <T v={w.model} />
                      </span>
                    </span>
                    <span className="ix-ref">{w.reference || <span className="muted">—</span>}</span>
                    <span className="ix-era">
                      <T v={w.era} />
                    </span>
                    <span className="ix-movement">
                      <T v={w.movement} />
                    </span>
                    <span className="ix-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </ViewSwitch>

        <p className="fine-print centered">
          <T v={collectionIntro.footnote} />
        </p>
      </section>

      <nav className="wrap next-link" aria-label="Next section">
        <Link href="/experiences" className="text-link">
          <span className="nav-num">03</span> <T v={{ en: "Continue to Life Experiences", zh: "继续：人生经历" }} /> →
        </Link>
      </nav>
    </>
  );
}
