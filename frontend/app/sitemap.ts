import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publicOnly } from "@/content/types";
import { collection, pieceHref } from "@/content/watches";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.lastUpdated);
  const sections = ["", "/about", "/watches", "/experiences", "/experiences/vintage-watch-trading", "/artwork"].map((path) => ({
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
  return [...sections, ...pieces];
}
