import Image from "next/image";

/**
 * A breath between sections: a whole screen of empty burgundy wall with one
 * small pocket watch hanging from a long chain. Nothing to read.
 */
export default function Interlude({ align = "right", tone = "deep" }: { align?: "left" | "center" | "right"; tone?: "deep" | "ink" }) {
  return (
    <section className={`interlude interlude-${align} interlude-${tone}`} aria-label="A pause">
      <div className="interlude-host" data-swing-host="">
        <span className="interlude-shadow" aria-hidden="true" />
        <div className="interlude-arm" data-swing="" data-period="2.6" role="button" tabIndex={0} aria-label="A small pocket watch on a long chain — click it, or pull it and let go">
          <span className="interlude-chain" aria-hidden="true" />
          <Image className="interlude-watch" src="/objects/pocket-watch-plain.webp" width={619} height={860} alt="" sizes="110px" draggable={false} />
        </div>
      </div>
    </section>
  );
}
