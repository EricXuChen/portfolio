import type { Artwork, Profile, Watch } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Could not load ${path}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  profile: () => getJson<Profile>("/api/profile"),
  artworks: () => getJson<Artwork[]>("/api/artworks"),
  artwork: (id: string) => getJson<Artwork>(`/api/artworks/${id}`),
  watches: () => getJson<Watch[]>("/api/watches"),
};
