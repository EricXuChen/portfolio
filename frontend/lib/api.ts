import { ARTWORKS, PROFILE, WATCHES } from "./content";
import type { Artwork, Profile, Watch } from "./types";

/**
 * Portfolio content lives in this Next.js app so Vercel works without a
 * separate Python server. Optionally set NEXT_PUBLIC_API_URL to use FastAPI locally.
 */
const REMOTE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${REMOTE}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Could not load ${path}`);
  }
  return res.json() as Promise<T>;
}

async function fromRemoteOrLocal<T>(path: string, local: () => T): Promise<T> {
  if (!REMOTE) {
    return local();
  }
  try {
    return await getJson<T>(path);
  } catch {
    return local();
  }
}

export const api = {
  profile: () => fromRemoteOrLocal<Profile>("/api/profile", () => PROFILE),
  artworks: () => fromRemoteOrLocal<Artwork[]>("/api/artworks", () => ARTWORKS),
  artwork: async (id: string) => {
    if (REMOTE) {
      try {
        return await getJson<Artwork>(`/api/artworks/${id}`);
      } catch {
        /* fall through to local */
      }
    }
    const work = ARTWORKS.find((item) => item.id === id);
    if (!work) {
      throw new Error(`Artwork not found: ${id}`);
    }
    return work;
  },
  watches: () => fromRemoteOrLocal<Watch[]>("/api/watches", () => WATCHES),
};
