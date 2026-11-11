import type { Metadata } from "next";
import Link from "next/link";
import { Kicker, T } from "@/components/T";
import { allCredits } from "@/content/antiques";

export const metadata: Metadata = {
  title: "Picture Credits",
  description: "Sources and licences of the museum and public-domain images used on this site.",
};

export default function CreditsPage() {
  const credits = allCredits();
  return (
    <>
      <header className="page-head wrap">
        <Kicker v={{ en: "Picture credits", zh: "图片来源" }} />
        <h1 className="display">
          <T v={{ en: "With thanks.", zh: "致谢。" }} />
        </h1>
        <p className="lede">
          <T
            v={{
              en: "The antique watches and posters on this site come from museums and public collections. My own watches, drawings and photographs are not listed here.",
              zh: "本站的古董表与海报图片来自博物馆和公共收藏。我自己的腕表、画作和照片不在此列。",
            }}
          />
        </p>
      </header>

      <section className="wrap section band-ivory">
        <ol className="credits">
          {credits.map((c, i) => (
            <li key={c.url} className="credit">
              <span className="credit-num">{String(i + 1).padStart(2, "0")}</span>
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
