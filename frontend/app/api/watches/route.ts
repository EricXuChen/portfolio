import { NextResponse } from "next/server";
import { WATCHES } from "@/lib/content";

export function GET() {
  return NextResponse.json(WATCHES);
}
