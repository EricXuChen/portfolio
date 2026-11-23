import type { Metadata } from "next";
import Link from "next/link";
import { Fleuron } from "@/components/Deco";
import { GuillocheDial } from "@/components/Illustrations";
import LiveDial from "@/components/LiveDial";
import PageMast from "@/components/PageMast";
import RepeaterButton from "@/components/RepeaterButton";
import RepeaterPanel from "@/components/RepeaterPanel";
import Scene from "@/components/Scene";
import { T } from "@/components/T";
import { REPEATER_HREF, repeater } from "@/content/repeater";
import { PAGE_SCENES } from "@/content/scenes";

export const metadata: Metadata = {
  title: "The minute repeater",
  description: repeater.lede.en,
  alternates: { canonical: REPEATER_HREF },
};

/* 三问: the time it is now, and one button that strikes it. */
export default function MinuteRepeaterPage() {
  return (
    <>
      <PageMast
        word="Chime"
        num="W-♪"
        kicker={repeater.kicker}
        title={repeater.title}
        lede={repeater.lede}
        layout="split"
        voice="bodoni"
        metal
        scene={PAGE_SCENES.repeater.mast}
        stamp={{ top: "EXU · COMPLICATIONS", bottom: "HOURS · QUARTERS · MINUTES", mid: "♪" }}
      />

      <section className="rp-stage" aria-label="Strike the time">
        <div className="rp-watch repeater-host">
          <span className="rp-bow" aria-hidden="true" />
          <div className="rp-case">
            <LiveDial>
              <GuillocheDial className="dial rp-dial repeater-shake" />
            </LiveDial>
          </div>
          <RepeaterButton className="rp-slide" />
          <p className="rp-slide-note" aria-hidden="true">
            <T v={{ en: "the slide", zh: "拨杆" }} /> ↗
          </p>
        </div>
        <RepeaterPanel />
      </section>

      <section className="rp-listen has-scene" aria-labelledby="rp-listen-title">
        <Scene use={PAGE_SCENES.repeater.listen} />
        <div className="wrap">
          <h2 id="rp-listen-title" className="rp-h2">
            <T v={repeater.listen.title} />
          </h2>
          <ol className="rp-steps">
            {repeater.listen.steps.map((s, i) => (
              <li key={s.mark} className={`rp-step rp-step-${s.mark}`}>
                <span className="rp-step-num">{["I", "II", "III"][i]}</span>
                <span className={`rp-step-marks rp-step-marks-${s.mark}`} aria-hidden="true">
                  {s.mark === "q" ? (
                    <span className="rp-mark rp-mark-q is-lit">
                      <i />
                      <i />
                    </span>
                  ) : (
                    <>
                      <span className={`rp-mark rp-mark-${s.mark} is-lit`} />
                      <span className={`rp-mark rp-mark-${s.mark} is-lit`} />
                      <span className={`rp-mark rp-mark-${s.mark} is-lit`} />
                    </>
                  )}
                </span>
                <h3 className="rp-step-head">
                  <T v={s.head} />
                </h3>
                <p className="rp-step-text">
                  <T v={s.text} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Scene use={PAGE_SCENES.repeater.why} />

      <section className="wrap rp-why" aria-label="Why it exists">
        <div>
          <h2 className="rp-h2">
            <T v={repeater.why.title} />
          </h2>
          <p className="rp-text">
            <T v={repeater.why.text} />
          </p>
        </div>
        <div>
          <h2 className="rp-h2">
            <T v={repeater.here.title} />
          </h2>
          <p className="rp-text">
            <T v={repeater.here.text} />
          </p>
          <p className="rp-links">
            <Link className="text-link" href="/watches">
              ← <T v={{ en: "The Collection", zh: "个人收藏" }} />
            </Link>
            <Link className="text-link" href="/dream">
              <T v={{ en: "Hear it in the dream", zh: "去梦里听" }} /> →
            </Link>
          </p>
        </div>
      </section>
      <Fleuron className="fleuron fleuron-gap" />
    </>
  );
}
