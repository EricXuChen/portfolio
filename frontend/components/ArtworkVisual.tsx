import type { Artwork } from "@/lib/types";

type Props = {
  work: Pick<Artwork, "title" | "accent" | "wash" | "image">;
};

export function ArtworkVisual({ work }: Props) {
  if (work.image) {
    return (
      <div className="swatch swatch-photo">
        <img src={work.image} alt={work.title} />
      </div>
    );
  }

  return (
    <div
      className="swatch"
      style={{ background: `linear-gradient(145deg, ${work.accent}, ${work.wash})` }}
    />
  );
}
