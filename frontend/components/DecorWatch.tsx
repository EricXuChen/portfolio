import Image from "next/image";
import { decor } from "@/content/antiques";

/**
 * An antique watch used purely as ornament: toned in champagne, screen-blended
 * into the burgundy and faded out at the edges. Never captioned, hidden from
 * screen readers. Position and size come from the className (see globals.css).
 */
export default function DecorWatch({ which, className = "" }: { which: keyof typeof decor; className?: string }) {
  const d = decor[which];
  return (
    <div className={`decor-watch ${className}`} aria-hidden="true">
      <Image src={d.src} width={d.width} height={d.height} alt="" sizes="(max-width: 640px) 70vw, 560px" />
    </div>
  );
}
