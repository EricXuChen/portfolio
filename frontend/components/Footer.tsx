import Link from "next/link";
import { artworks } from "@/content/artwork";
import { chapters, timeline } from "@/content/experiences";
import { nav, site } from "@/content/site";
import { publicOnly } from "@/content/types";
import { collection } from "@/content/watches";
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
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="mark mark-lg">{site.mark}</p>
          <p className="footer-tag">Horology · Experiences · Art</p>
          <p className="footer-note">
            <T
              v={{
                en: "A personal archive of interests, experiences and creative work.",
                zh: "一个记录兴趣、经历与创作的个人档案。",
              }}
            />
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span className="nav-num">{item.num}</span> <T v={item.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <dl className="footer-index">
          <div>
            <dt>
              <T v={{ en: "Watches", zh: "腕表收藏" }} />
            </dt>
            <dd>{c.watches}</dd>
          </div>
          <div>
            <dt>
              <T v={{ en: "Experiences", zh: "经历记录" }} />
            </dt>
            <dd>{c.experiences}</dd>
          </div>
          <div>
            <dt>
              <T v={{ en: "Artworks", zh: "艺术作品" }} />
            </dt>
            <dd>{c.artworks}</dd>
          </div>
        </dl>
      </div>

      <div className="footer-base">
        <span>© 2026 {site.name}</span>
        <span>
          <T v={{ en: "Last updated", zh: "最后更新" }} /> <T v={dateBi(site.lastUpdated)} />
        </span>
      </div>
    </footer>
  );
}
