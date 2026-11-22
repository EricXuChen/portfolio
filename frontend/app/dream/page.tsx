import type { Metadata } from "next";
import Link from "next/link";
import DreamEye from "@/components/DreamEye";
import DreamPlay from "@/components/DreamPlay";
import { Letters } from "@/components/Editorial";
import Pendulum from "@/components/Pendulum";
import { T } from "@/components/T";
import { DREAM_HREF, DREAM_ROOMS, dreamHref, dreamIntro } from "@/content/dream";

export const metadata: Metadata = {
  title: "The dream",
  description: dreamIntro.lede.en,
  alternates: { canonical: DREAM_HREF },
};

/* The way into the dream: a long burgundy hall with nine doors standing in the fog. */
export default function DreamEntrance() {
  return (
    <>
      <section className="dream dream-entrance" aria-labelledby="dream-title">
        <div className="dream-scene dream-entrance-hall" aria-hidden="true">
          <div className="dream-floor" />
          <span className="dream-sun dream-sun-low" />
        </div>
        <div className="dream-fog" aria-hidden="true" />
        <div className="dream-bloom" aria-hidden="true" />
        <Pendulum className="dream-pend dream-pend-entrance" />
        <DreamEye className="dream-eye-pos" />
        <div className="dream-entrance-head">
          <p className="mono-note">☾ — The dream / 梦</p>
          <h1 id="dream-title" className="dream-title" data-letters="">
            <span className="l-en" lang="en">
              <Letters text={dreamIntro.title.en} />
            </span>
            <span className="l-zh" lang="zh-Hans">
              <Letters text={dreamIntro.title.zh} />
            </span>
          </h1>
          <p className="dream-lede">
            <T v={dreamIntro.lede} />
          </p>
        </div>
        <nav className="dream-doors dream-doors-all" aria-label="Rooms of the dream">
          {DREAM_ROOMS.map((r, i) => (
            <Link key={r.id} className={`dream-door dream-door-all dream-door-n${i}`} href={dreamHref(r.id)} data-door="">
              <span className="door-light" aria-hidden="true" />
              <span className="door-leaf" aria-hidden="true" />
              <span className="door-label">
                {r.num} · <T v={r.name} />
              </span>
            </Link>
          ))}
        </nav>
        <p className="dream-vhs" aria-hidden="true">
          <span className="dream-rec">●</span> PLAY ▶ 00:00:00<span className="dream-num">D-00</span>
        </p>
        <div className="dream-scan" aria-hidden="true" />
        <div className="dream-grain" aria-hidden="true" />
        <DreamPlay others={DREAM_ROOMS.map((r) => dreamHref(r.id))} />
      </section>
    </>
  );
}
