"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: React.ReactNode;
  priority?: boolean;
  sizes?: string;
  blurDataURL?: string;
};

/** Artwork image in a 4:5 frame; click to see the full, uncropped piece. */
export default function ArtImage({ src, width, height, alt, caption, priority, sizes, blurDataURL }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className="art-frame" onClick={() => ref.current?.showModal()}>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority={priority}
          sizes={sizes ?? "(max-width: 900px) 100vw, 50vw"}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
        />
        <span className="art-frame-hint" aria-hidden="true">
          ⤢
        </span>
        <span className="sr-only">Open full image</span>
      </button>

      <dialog
        ref={ref}
        className="lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <figure>
          <Image src={src} width={width} height={height} alt={alt} sizes="90vw" />
          <figcaption>{caption}</figcaption>
        </figure>
        <button type="button" className="lightbox-close" onClick={() => ref.current?.close()}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
      </dialog>
    </>
  );
}
