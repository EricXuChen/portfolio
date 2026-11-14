import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageMast from "@/components/PageMast";
import { T } from "@/components/T";
import { catalogueRows } from "@/content/catalogue";
import { LETTERS, letterHref, type Letter } from "@/content/pages";

type Props = { params: Promise<{ letter: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(LETTERS) as Letter[]).map((letter) => ({ letter }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letter } = await params;
  const L = LETTERS[letter as Letter];
  if (!L) return {};
  return { title: `Catalogue · ${L.title.en}`, alternates: { canonical: letterHref(letter) } };
}

const LAYOUTS = ["centered", "frame", "vertical", "split", "overlap"] as const;

export default async function LetterPage({ params }: Props) {
  const { letter } = await params;
  const keys = Object.keys(LETTERS) as Letter[];
  const k = keys.indexOf(letter as Letter);
  if (k < 0) notFound();
  const L = LETTERS[letter as Letter];
  const rows = catalogueRows()[letter as Letter];
  const prev = keys[(k - 1 + keys.length) % keys.length];
  const next = keys[(k + 1) % keys.length];

  return (
    <>
      <PageMast
        word={L.word}
        scene={L.scene}
        metal
        layout={LAYOUTS[k % LAYOUTS.length]}
        voice={k % 2 ? "italic" : "bodoni"}
        num="Ix"
        kicker={{ en: "The catalogue, one letter", zh: "总目录 · 单个字母" }}
        title={L.title}
        lede={{ en: `${rows.length} entries.`, zh: `共 ${rows.length} 条。` }}
        stamp={{ top: "EXU · CATALOGUE", bottom: `${String(rows.length).padStart(2, "0")} ENTRIES`, mid: L.word.replace(".", "") }}
      />

      <section className={`wrap letter-ledger letter-${letter}`} aria-label={L.title.en}>
        <ol>
          {rows.map((r) => (
            <li key={r.id}>
              <Link href={r.href} className="letter-row">
                <span className="letter-id">{r.id}</span>
                <span className="letter-title">
                  <T v={r.title} />
                </span>
                <span className="letter-dots" aria-hidden="true" />
                {r.note ? (
                  <span className="letter-note">
                    <T v={r.note} />
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <nav className="wrap entry-nav" aria-label="Other letters">
        <Link href={letterHref(prev)} className="entry-nav-link">
          ← {LETTERS[prev].word}
        </Link>
        <Link href="/catalogue" className="entry-nav-all">
          <T v={{ en: "The whole catalogue", zh: "完整目录" }} />
        </Link>
        <Link href={letterHref(next)} className="entry-nav-link entry-nav-next">
          {LETTERS[next].word} →
        </Link>
      </nav>
    </>
  );
}
