import Image from "next/image";

/**
 * A breath between sections: a whole screen of empty burgundy wall with one
 * small pocket watch hanging from a long chain. Nothing to read.
 */
export default function Interlude({ align = "right", tone = "deep" }: { align?: "left" | "center" | "right"; tone?: "deep" | "ink" }) {
  return (
    <section className={`interlude interlude-${align} interlude-${tone}`} aria-label="A pause">
      <span className="interlude-chain" aria-hidden="true" />
      <Image
        className="interlude-watch"
        src="/objects/gold-pocket-watch.png"
        width={619}
        height={860}
        alt="A small pocket watch — click to set it swinging"
        sizes="110px"
        data-swing=""
        tabIndex={0}
      />
    </section>
  );
}
