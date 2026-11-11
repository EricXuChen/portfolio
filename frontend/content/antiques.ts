
/* ------------------------------------------------------------------ */
/*  Antique watches and posters used as decoration (not Eric's).       */
/*  Every picture is public domain, CC0 or Creative Commons: /credits  */
/* ------------------------------------------------------------------ */

export type Credit = {
  work: string;
  author: string;
  source: string;
  license: "Public domain" | "CC0" | "CC BY 2.0" | "CC BY-SA 2.0" | "CC BY-SA 3.0" | "CC BY-SA 4.0";
  licenseUrl?: string;
  url: string;
  changes: string;
};

export type Decor = {
  src: string;
  width: number;
  height: number;
  credit: Credit;
};

const BYSA2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const BYSA3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";

/* Antique watches used purely as ornament — faded into the background, never captioned. */
export const decor: Record<"silver" | "gold" | "pendant", Decor> = {
  silver: {
    src: "/decor/repousse-silver.jpg",
    width: 800,
    height: 1000,
    credit: {
      work: "Watch, Geneva, 1809–19 (The Met 66581)",
      author: "The Metropolitan Museum of Art",
      source: "Wikimedia Commons",
      license: "CC0",
      licenseUrl: CC0,
      url: "https://commons.wikimedia.org/wiki/File:Watch_MET_66581.jpg",
      changes: "Cropped, background darkened, toned in champagne as a background ornament",
    },
  },
  gold: {
    src: "/decor/gold-1890.jpg",
    width: 800,
    height: 1000,
    credit: {
      work: "Fondation de la Haute Horlogerie (Kremlin exhibition) — Pocket watch, 1890",
      author: "shakko",
      source: "Wikimedia Commons",
      license: "CC BY-SA 3.0",
      licenseUrl: BYSA3,
      url: "https://commons.wikimedia.org/wiki/File:Fondation_de_la_Haute_Horlogerie_(Kremlin_exhibition)_by_shakko_28.jpg",
      changes: "Cropped and toned in champagne as a background ornament; this version is shared under CC BY-SA 3.0",
    },
  },
  pendant: {
    src: "/decor/art-deco-pendant.jpg",
    width: 800,
    height: 1000,
    credit: {
      work: "Pendant watch, 1920s (Jazz Age exhibition, Cleveland Museum of Art)",
      author: "Tim Evanson",
      source: "Wikimedia Commons",
      license: "CC BY-SA 2.0",
      licenseUrl: BYSA2,
      url: "https://commons.wikimedia.org/wiki/File:Watch_-_Longines_(38691655675).jpg",
      changes: "Cropped and toned in champagne as a background ornament; this version is shared under CC BY-SA 2.0",
    },
  },
};

/** The gold pocket watch that drifts across the home page. */
export const floatingWatch = {
  image: {
    src: "/objects/gold-pocket-watch.png",
    width: 619,
    height: 860,
    alt: "A gold open-face pocket watch with Roman numerals and a fluted crown",
  },
  credit: {
    work: "Pocket watch, Paris, c. 1900 (The Met)",
    author: "The Metropolitan Museum of Art",
    source: "Wikimedia Commons",
    license: "CC0",
    licenseUrl: CC0,
    url: "https://commons.wikimedia.org/wiki/File:Pocket_watch_MET_SF1979_498_1_img1.jpg",
    changes: "Cut out from its background",
  } as Credit,
};

/** Art Deco posters by Leonetto Cappiello that show pocket watches (lettering removed). */
export const posters = {
  zenith: {
    src: "/posters/cappiello-1912-duotone.jpg",
    original: "/posters/cappiello-1912.jpg",
    width: 1143,
    height: 1328,
    alt: "Leonetto Cappiello, 1912: two figures in flowing robes seated on a giant pocket watch",
    credit: {
      work: "Leonetto Cappiello — poster with two figures on a pocket watch, 1912",
      author: "Bibliothèque nationale de France",
      source: "Wikimedia Commons",
      license: "Public domain",
      url: "https://commons.wikimedia.org/wiki/File:Z%C3%A9nith_-_affiche_-_(Leonetto)_Cappiello_-_btv1b90151578.jpg",
      changes: "Cropped to the figures and the watch, lettering and the name on the dial removed; duotone in burgundy and champagne",
    } as Credit,
  },
  election: {
    src: "/posters/cappiello-1922.jpg",
    width: 543,
    height: 684,
    alt: "Leonetto Cappiello, about 1922: dancers holding up the numerals beside a huge gold pocket watch",
    credit: {
      work: "Leonetto Cappiello — poster with dancers and a pocket watch, c. 1922",
      author: "Leonetto Cappiello",
      source: "Wikimedia Commons",
      license: "Public domain",
      url: "https://commons.wikimedia.org/wiki/File:Affiche_Montre_%C3%89lection.jpg",
      changes: "Cropped; lettering, printer's stamp and the name on the dial removed",
    } as Credit,
  },
};

export function allCredits(): Credit[] {
  return [decor.silver.credit, decor.gold.credit, decor.pendant.credit, floatingWatch.credit, posters.zenith.credit, posters.election.credit];
}
