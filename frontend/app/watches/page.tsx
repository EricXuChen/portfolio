import type { Metadata } from "next";
import Link from "next/link";
import ArtImage from "@/components/ArtImage";
import { Both, Kicker, T } from "@/components/T";
import { publicOnly } from "@/content/types";
import { collection, collectionIntro } from "@/content/watches";

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
        <div className="collection-grid">
          {watches.map((w, i) => (
            <article key={w.id} id={w.id} className="piece">
              <ArtImage
                src={w.image.src}
                width={w.image.width}
                height={w.image.height}
                alt={w.image.alt}
                priority={i < 2}
                sizes="(max-width: 900px) 100vw, 50vw"
                caption={
                  <>
                    {w.id} · {w.brand} — <Both v={w.model} />
                    {w.reference ? <> · Ref. {w.reference}</> : null}
                  </>
                }
              />
              <div className="piece-text">
                <p className="piece-meta">
                  <span className="archive-id">{w.id}</span>
                  <span className="piece-era">
                    <T v={w.era} />
                  </span>
                </p>
                <h2 className="piece-brand">{w.brand}</h2>
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
