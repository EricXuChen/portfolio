import { NextResponse } from "next/server";
import { ARTWORKS } from "@/lib/content";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  const work = ARTWORKS.find((item) => item.id === id);
  if (!work) {
    return NextResponse.json({ detail: "Artwork not found" }, { status: 404 });
  }
  return NextResponse.json(work);
}
