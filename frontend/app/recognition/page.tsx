import type { Metadata } from "next";
import Link from "next/link";
import { Fleuron, Stamp } from "@/components/Deco";
import Scene from "@/components/Scene";
import { T } from "@/components/T";
import { recognition } from "@/content/experiences";
import { publicOnly } from "@/content/types";

export const metadata: Metadata = {
  title: "Recognition",
  description: "John Locke Global Essay Prize 2026 — Commendation, Theology.",
  alternates: { canonical: "/recognition" },
};

/* An award gets a certificate of its own, on the pale paper. */
export default function RecognitionPage() {
  const list = publicOnly(recognition);
  return (
    <section className="cert-room has-scene" aria-label="Recognition">
      <Scene use={{ id: "coffer-gilt", kind: "wallpaper", o: 0.16 }} eager />
      {list.map((r) => (
        <article key={r.id} className="cert">
          <p className="mono-note cert-kicker">
            {r.id} · <T v={{ en: "Recognition", zh: "荣誉" }} /> · {r.year}
          </p>
          <h1 className="cert-title">
            <T v={r.title} />
          </h1>
          <Fleuron className="cert-fleuron" />
          <p className="cert-award">
            <T v={r.award} /> — <T v={r.field} />
          </p>
          <p className="cert-work">
            “<T v={r.work} />”
          </p>
          <p className="cert-note">
            <T v={r.note} />
          </p>
          <Stamp className="cert-stamp" top={`EXU · ${r.id} · ${r.year}`} bottom="COMMENDATION" mid="R." />
        </article>
      ))}
      <p className="cert-back">
        <Link href="/experiences" className="text-link">
          ← <T v={{ en: "Life Experiences", zh: "人生经历" }} />
        </Link>
      </p>
    </section>
  );
}
