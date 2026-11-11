import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { T } from "@/components/T";
import { decor, floatingWatch, posters } from "@/content/antiques";
import PageMast from "@/components/PageMast";

export const metadata: Metadata = {
  title: "Picture Credits",
  description: "Sources and licences of the museum and public-domain images used on this site.",
};

export default function CreditsPage() {
  /* each credit with the picture it belongs to */
  const credits = [
    { ...decor.silver.credit, thumb: decor.silver.src },
    { ...decor.gold.credit, thumb: decor.gold.src },
    { ...decor.pendant.credit, thumb: decor.pendant.src },
    { ...floatingWatch.credit, thumb: floatingWatch.image.src },
    { ...posters.zenith.credit, thumb: posters.zenith.src },
    { ...posters.election.credit, thumb: posters.election.src },
  ];
  return (
    <>
      <PageMast
        word="THANKS."
        num="—"
        kicker={{ en: "Picture credits", zh: "图片来源" }}
        title={{ en: "With thanks.", zh: "致谢。" }}
        lede={{
          en: "The antique watches and posters on this site come from museums and public collections. My own watches, drawings and photographs are not listed here.",
          zh: "本站的古董表与海报图片来自博物馆和公共收藏。我自己的腕表、画作和照片不在此列。",
        }}
        voice="italic"
        stamp={{ top: "EXU · PICTURE CREDITS", bottom: "WITH THANKS", mid: "©" }}
      />

      <section className="wrap section">
        <ol className="credits">
          {credits.map((c, i) => (
            <li key={c.url} className="credit">
              <span className="credit-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="credit-thumb">
                <Image src={c.thumb} width={160} height={200} alt="" sizes="96px" />
              </span>
              <div>
                <p className="credit-work">{c.work}</p>
                <p className="credit-meta">
                  {c.author} · {c.source} ·{" "}
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} rel="license noopener" target="_blank">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                </p>
                <p className="credit-meta">
                  <T v={{ en: "Changes", zh: "改动" }} />: {c.changes} ·{" "}
                  <a href={c.url} rel="noopener" target="_blank">
                    <T v={{ en: "Source", zh: "原图" }} />
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <nav className="wrap next-link" aria-label="Back to start">
        <Link href="/" className="text-link">
          <T v={{ en: "Back to the cover", zh: "回到首页" }} /> ↑
        </Link>
      </nav>
    </>
  );
}
