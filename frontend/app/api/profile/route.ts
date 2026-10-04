import { NextResponse } from "next/server";
import { PROFILE } from "@/lib/content";

export function GET() {
  return NextResponse.json(PROFILE);
}
