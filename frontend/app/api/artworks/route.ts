import { NextResponse } from "next/server";
import { ARTWORKS } from "@/lib/content";

export function GET() {
  return NextResponse.json(ARTWORKS);
}
