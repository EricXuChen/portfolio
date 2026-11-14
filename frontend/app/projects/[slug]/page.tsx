import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GiantWord } from "@/components/Editorial";
import PageMast from "@/components/PageMast";
import RoomLinks from "@/components/RoomLinks";
import { T } from "@/components/T";
import { PROJECT_PAGES, projectHref } from "@/content/pages";
import { statusLabel, trading } from "@/content/trading";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const k = PROJECT_PAGES.findIndex((p) => p.slug === slug);
  if (k < 0) return {};
  return { title: trading.next[k].title.en, description: PROJECT_PAGES[k].note.en, alternates: { canonical: projectHref(slug) } };
}

const LAYOUTS = ["frame", "vertical", "overlap", "classic", "split"] as const;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const k = PROJECT_PAGES.findIndex((p) => p.slug === slug);
  if (k < 0) notFound();
  const p = PROJECT_PAGES[k];
  const item = trading.next[k];
  const prev = PROJECT_PAGES[(k - 1 + PROJECT_PAGES.length) % PROJECT_PAGES.length];
  const next = PROJECT_PAGES[(k + 1) % PROJECT_PAGES.length];

  return (
    <>
      <PageMast
        word={p.word}
        scene={p.scene}
        layout={LAYOUTS[k % LAYOUTS.length]}
        voice={k % 2 ? "cond" : "bodoni"}
        num={p.id}
        kicker={{ en: "On the workbench", zh: "工作台上" }}
        title={item.title}
        stamp={{ top: `EXU · PROJECT · ${p.id}`, bottom: (statusLabel[item.status].en ?? "").toUpperCase(), mid: "P." }}
      />

      <section className={`project-sheet project-sheet-${item.status}`} aria-label={item.title.en}>
        <GiantWord word={p.id} outline className="project-id-word" drift={-0.1} />
        <div className="wrap project-sheet-grid">
          <p className="project-status mono-note">
            <span className="proj-dot" aria-hidden="true" /> <T v={statusLabel[item.status]} />
          </p>
          <p className="project-note">
            <T v={p.note} />
          </p>
        </div>
      </section>

      <RoomLinks title={{ en: "Connected pages", zh: "相关页面" }} links={p.links} variant={k % 2 ? "list" : "cards"} />

      <nav className="wrap entry-nav" aria-label="Other projects">
        <Link href={projectHref(prev.slug)} className="entry-nav-link">
          ← {prev.id}
        </Link>
        <Link href="/projects" className="entry-nav-all">
          <T v={{ en: "All projects", zh: "全部项目" }} />
        </Link>
        <Link href={projectHref(next.slug)} className="entry-nav-link entry-nav-next">
          {next.id} →
        </Link>
      </nav>
    </>
  );
}
