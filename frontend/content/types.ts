/**
 * Shared content types for the archive.
 *
 * Every entry carries:
 *  - id          archive number (W-001, M-001, E-001, A-001 …)
 *  - updated     last-updated date, ISO format (YYYY-MM-DD)
 *  - visibility  "public" entries are shown; "draft" and "private" are never rendered
 *
 * To hide an entry without deleting it, change its visibility to "draft".
 */

export type Bi = { en: string; zh: string };

export type Visibility = "public" | "draft" | "private";

export type ArchiveMeta = {
  id: string;
  updated: string;
  visibility: Visibility;
};

export function isPublic<T extends { visibility: Visibility }>(entry: T): boolean {
  return entry.visibility === "public";
}

export function publicOnly<T extends { visibility: Visibility }>(entries: T[]): T[] {
  return entries.filter(isPublic);
}
