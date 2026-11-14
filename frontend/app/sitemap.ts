import type { MetadataRoute } from "next";
import { SERIES, SKETCHBOOK_HREF, artHref, artYears, artworks, seriesHref, yearHref, type ArtKind } from "@/content/artwork";
import { chapterHref, chapters } from "@/content/experiences";
import { site } from "@/content/site";
import { publicOnly } from "@/content/types";
import { collection, pieceHref } from "@/content/watches";
import { ERAS, INTERESTS, LETTERS, PROJECT_PAGES, VALUE_SLUGS, eraHref, interestHref, letterHref, momentHref, projectHref, valueHref } from "@/content/pages";
import { timeline } from "@/content/experiences";

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
  const rooms = [
    ...(Object.keys(SERIES) as ArtKind[]).map(seriesHref),
    ...artYears(publicOnly(artworks)).map(yearHref),
    SKETCHBOOK_HREF,
  ].map((path) => ({ url: `${site.url}${path}`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 }));
  const more = [
    ...INTERESTS.map((i) => interestHref(i.slug)),
    ...VALUE_SLUGS.map(valueHref),
    ...publicOnly(timeline).map((e) => momentHref(e.id)),
    ...PROJECT_PAGES.map((p) => projectHref(p.slug)),
    "/recognition",
    ...Object.keys(LETTERS).map(letterHref),
    ...ERAS.map((e) => eraHref(e.slug)),
  ].map((path) => ({ url: `${site.url}${path}`, lastModified, changeFrequency: "monthly" as const, priority: 0.5 }));
  return [...sections, ...pieces, ...plates, ...chaps, ...rooms, ...more];
}
