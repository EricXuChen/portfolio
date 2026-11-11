import type { MetadataRoute } from "next";
import { artHref, artworks } from "@/content/artwork";
import { chapterHref, chapters } from "@/content/experiences";
import { site } from "@/content/site";
import { publicOnly } from "@/content/types";
import { collection, pieceHref } from "@/content/watches";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.lastUpdated);
  const sections = ["", "/about", "/watches", "/experiences", "/experiences/vintage-watch-trading", "/artwork", "/projects", "/catalogue", "/colophon", "/credits"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const pieces = publicOnly(collection).map((w) => ({
    url: `${site.url}${pieceHref(w.id)}`,
    lastModified: new Date(w.updated),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  const plates = publicOnly(artworks).map((a) => ({
    url: `${site.url}${artHref(a.slug)}`,
    lastModified: new Date(a.updated),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  const chaps = publicOnly(chapters).map((c) => ({
    url: `${site.url}${chapterHref(c.id)}`,
    lastModified: new Date(c.updated),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...sections, ...pieces, ...plates, ...chaps];
}
