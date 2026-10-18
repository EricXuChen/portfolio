import type { MetadataRoute } from "next";
import { ARTWORKS } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/gallery", "/watches"].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
  const artworks = ARTWORKS.map((work) => ({
    url: new URL(`/gallery/${work.id}`, siteUrl).toString(),
  }));

  return [...pages, ...artworks];
}