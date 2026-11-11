import Link from "next/link";
import { artworks } from "@/content/artwork";
import { chapters, timeline } from "@/content/experiences";
import { nav, site, navMore } from "@/content/site";
import { publicOnly } from "@/content/types";
import { collection } from "@/content/watches";
import { DecoRule, Sunburst } from "./Deco";
import { GuillocheDial } from "./Illustrations";
import LiveDial from "./LiveDial";
import { T, dateBi } from "./T";

/** Counts come straight from the content files — never typed in by hand. */
export function archiveCounts() {
  return {
    watches: publicOnly(collection).length,
    experiences: publicOnly([...timeline, ...chapters]).length,
    artworks: publicOnly(artworks).length,
  };
}

export default function Footer() {
  const c = archiveCounts();
  return (
    <footer className="site-footer">
      <Sunburst className="footer-sun" rays={56} />
      <div className="footer-top">
        <p className="footer-wordmark" aria-label={site.mark}>
          {site.mark}
        </p>
        <DecoRule className="deco-rule footer-rule" />
        <p className="footer-tag">
          <T v={{ en: "Horology · Entrepreneurship · Art", zh: "制表 · 创业 · 艺术" }} />
        </p>
      </div>

      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-dial">
            <LiveDial>
              <GuillocheDial className="dial" />
            </LiveDial>
          </div>
          <p className="footer-note">
            <T
              v={{
                en: "A personal archive of time, objects and experiences. The dial shows your local time.",
                zh: "一个关于时间、物件与经历的个人档案。表盘显示的是你此刻的本地时间。",
              }}
            />
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <ul>
            {[...nav, ...navMore].map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span className="nav-num">{item.num}</span> <T v={item.label} />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/credits">
                <span className="nav-num">—</span> <T v={{ en: "Picture credits", zh: "图片来源" }} />
              </Link>
            </li>
          </ul>
        </nav>

        <dl className="footer-index">
          <div>
            <dt>
              <T v={{ en: "Watches", zh: "腕表收藏" }} />
            </dt>
            <dd data-count={c.watches}>{c.watches}</dd>
          </div>
          <div>
            <dt>
              <T v={{ en: "Experiences", zh: "经历记录" }} />
            </dt>
            <dd data-count={c.experiences}>{c.experiences}</dd>
          </div>
          <div>
            <dt>
              <T v={{ en: "Artworks", zh: "艺术作品" }} />
            </dt>
            <dd data-count={c.artworks}>{c.artworks}</dd>
          </div>
        </dl>
      </div>

      <div className="footer-base">
        <span>
          © 2026 {site.name} · <T v={{ en: "Barcelona", zh: "巴塞罗那" }} />
        </span>
        <span>
          <T v={{ en: "Last updated", zh: "最后更新" }} /> <T v={dateBi(site.lastUpdated)} />
        </span>
      </div>
    </footer>
  );
}
