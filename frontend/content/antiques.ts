import type { Bi } from "./types";

/* ------------------------------------------------------------------ */
/*  The Cabinet — antique watches from museum and public collections.  */
/*  These are reference pieces, not part of Eric's collection.         */
/*  Every photo is public domain, CC0 or Creative Commons: see /credits */
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

export type CabinetPiece = {
  id: string;
  name: Bi;
  place: Bi;
  date: Bi;
  title: Bi;
  image: { src: string; width: number; height: number; alt: string };
  holder: Bi;
  credit: Credit;
};

const BYSA2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const BYSA3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const BYSA4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";

export const cabinetIntro = {
  kicker: { en: "The Cabinet", zh: "珍藏柜" } as Bi,
  title: { en: "Nine watches, two centuries.", zh: "九枚古董表，跨越两个世纪。" } as Bi,
  lede: {
    en: "Antique watches from museum and public collections — the craft I measure my own pieces against. They are references, not part of my collection.",
    zh: "来自博物馆与公共收藏的古董表——我用来对照自己收藏的工艺标杆。它们是参考，并不属于我的收藏。",
  } as Bi,
};

const plate = (src: string, alt: string) => ({ src, width: 800, height: 1000, alt });

/* Names of makers are deliberately left out: this is a personal archive, not a shop. */
export const cabinet: CabinetPiece[] = [
  {
    id: "C-01",
    name: { en: "Portrait watch", zh: "肖像怀表" },
    place: { en: "Paris", zh: "巴黎" },
    date: { en: "c. 1830", zh: "约 1830 年" },
    title: { en: "An enamel portrait miniature set into the case", zh: "表壳上嵌一枚珐琅肖像微绘" },
    image: plate("/antiques/c-01-portrait-watch.jpg", "Pocket watch from Paris, about 1830, with an enamel portrait miniature on the case"),
    holder: { en: "Walters Art Museum", zh: "沃尔特斯艺术博物馆" },
    credit: {
      work: "Watch with an enamel portrait, Paris, c. 1830 (Walters Art Museum 58147)",
      author: "Walters Art Museum",
      source: "Wikimedia Commons",
      license: "Public domain",
      url: "https://commons.wikimedia.org/wiki/File:Breguet_et_fils_-_Watch_with_Benjamin_Franklin_-_Walters_58147.jpg",
      changes: "Cropped and tone-adjusted",
    },
  },
  {
    id: "C-02",
    name: { en: "Repoussé silver watch", zh: "浮雕银壳怀表" },
    place: { en: "Geneva", zh: "日内瓦" },
    date: { en: "1809–19", zh: "1809–1819 年" },
    title: { en: "A case chased all over in the rococo manner", zh: "满工雕錾的洛可可风格表壳" },
    image: plate("/antiques/c-02-repousse-silver.jpg", "Silver pocket watch from Geneva, 1809–19, with a richly chased rococo case"),
    holder: { en: "The Metropolitan Museum of Art", zh: "大都会艺术博物馆" },
    credit: {
      work: "Watch, Geneva, 1809–19 (The Met 66581)",
      author: "The Metropolitan Museum of Art",
      source: "Wikimedia Commons",
      license: "CC0",
      licenseUrl: CC0,
      url: "https://commons.wikimedia.org/wiki/File:Watch_MET_66581.jpg",
      changes: "Cropped and tone-adjusted",
    },
  },
  {
    id: "C-03",
    name: { en: "Minute repeater", zh: "三问怀表" },
    place: { en: "Geneva", zh: "日内瓦" },
    date: { en: "c. 1895", zh: "约 1895 年" },
    title: { en: "Split-seconds chronograph in a gold hunter case", zh: "追针计时，金质猎表壳" },
    image: plate("/antiques/c-03-minute-repeater.jpg", "Gold minute repeater with split-seconds chronograph, its hunter case open, Geneva, about 1895"),
    holder: { en: "The Franklin Institute", zh: "富兰克林研究所" },
    credit: {
      work: "Minute repeater with split-seconds chronograph, Geneva, c. 1895 (The Franklin Institute)",
      author: "Daderot",
      source: "Wikimedia Commons",
      license: "Public domain",
      url: "https://commons.wikimedia.org/wiki/File:Patek_Philippe_Minute_Repeater_Split_Seconds_Chronograph,_Geneva,_Switzerland,_c._1895_-_Franklin_Institute_-_DSC06644.jpg",
      changes: "Cropped and tone-adjusted",
    },
  },
  {
    id: "C-04",
    name: { en: "Enamel-dial pocket watch", zh: "珐琅表盘怀表" },
    place: { en: "Glashütte", zh: "格拉苏蒂" },
    date: { en: "Early 20th century", zh: "20 世纪初" },
    title: { en: "White enamel dial and ornate gold hands", zh: "白色珐琅表盘，配华丽金质指针" },
    image: plate("/antiques/c-04-enamel-dial.jpg", "Pocket watch from Glashütte with a white enamel dial and ornate gold hands"),
    holder: { en: "Private collection", zh: "私人收藏" },
    credit: {
      work: "Pocket watch, front view (Glashütte)",
      author: "Johann H. Addicks",
      source: "Wikimedia Commons",
      license: "CC BY-SA 3.0",
      licenseUrl: BYSA3,
      url: "https://commons.wikimedia.org/wiki/File:Taschenuhr_Vorderansicht.jpg",
      changes: "Cropped, blue backdrop replaced with a dark one, tone-adjusted; this version is shared under CC BY-SA 3.0",
    },
  },
  {
    id: "C-05",
    name: { en: "Gold pocket watch", zh: "金质怀表" },
    place: { en: "Vallée de Joux", zh: "汝山谷" },
    date: { en: "1890", zh: "1890 年" },
    title: { en: "Yellow gold on black velvet, shown at a haute horlogerie exhibition", zh: "黄金表壳，在一场高级制表展览中陈列于黑丝绒上" },
    image: plate("/antiques/c-05-gold-1890.jpg", "Yellow gold pocket watch from 1890 on black velvet"),
    holder: { en: "Exhibition, Moscow Kremlin", zh: "莫斯科克里姆林宫展览" },
    credit: {
      work: "Fondation de la Haute Horlogerie (Kremlin exhibition) — Pocket watch, 1890",
      author: "shakko",
      source: "Wikimedia Commons",
      license: "CC BY-SA 3.0",
      licenseUrl: BYSA3,
      url: "https://commons.wikimedia.org/wiki/File:Fondation_de_la_Haute_Horlogerie_(Kremlin_exhibition)_by_shakko_28.jpg",
      changes: "Cropped and tone-adjusted; this version is shared under CC BY-SA 3.0",
    },
  },
  {
    id: "C-06",
    name: { en: "Deck watch", zh: "甲板表" },
    place: { en: "Le Locle", zh: "力洛克" },
    date: { en: "Marine timekeeping", zh: "航海计时" },
    title: { en: "Kept on the bridge, set each day against the ship's chronometer", zh: "放在舰桥上，每天以船上的航海天文钟为准校时" },
    image: plate("/antiques/c-06-deck-watch.jpg", "Deck watch with Roman numerals and a large seconds track"),
    holder: { en: "Private collection", zh: "私人收藏" },
    credit: {
      work: "Deck chronometer, Le Locle",
      author: "Clyde94",
      source: "Wikimedia Commons",
      license: "CC BY-SA 4.0",
      licenseUrl: BYSA4,
      url: "https://commons.wikimedia.org/wiki/File:Cronometro_da_plancia_Ulysse_Nardin,_cos%C3%AC_chiamato_perch%C3%A9_risiedeva_sulla_plancia_della_nave_e_l%27ora_precisa_veniva_regolata_in_base_al_cronometro_da_marina,_che_era_pi%C3%B9_preciso,_e_che_era_collocato_altrove,_spesso_sotto_coperta..jpg",
      changes: "Cropped and tone-adjusted; this version is shared under CC BY-SA 4.0",
    },
  },
  {
    id: "C-07",
    name: { en: "Open-face pocket watch", zh: "开面怀表" },
    place: { en: "Le Locle", zh: "力洛克" },
    date: { en: "1900–1910", zh: "1900–1910 年" },
    title: { en: "A cream dial, patinated by a century", zh: "奶油色表盘，留着一个世纪的痕迹" },
    image: plate("/antiques/c-07-open-face.jpg", "Pocket watch from 1900–1910 with a patinated cream dial and blued hands"),
    holder: { en: "Private collection", zh: "私人收藏" },
    credit: {
      work: "Pocket watch from the years 1900–1910",
      author: "Prunk",
      source: "Wikimedia Commons",
      license: "Public domain",
      url: "https://commons.wikimedia.org/wiki/File:CameraZOOM-20101010135432.jpg",
      changes: "Cropped and tone-adjusted",
    },
  },
  {
    id: "C-08",
    name: { en: "Art Deco pendant watch", zh: "装饰艺术吊坠表" },
    place: { en: "Saint-Imier", zh: "圣伊米耶" },
    date: { en: "1920s", zh: "1920 年代" },
    title: { en: "An octagonal case set with green stones", zh: "八角形表壳，镶嵌绿色宝石" },
    image: plate("/antiques/c-08-art-deco-pendant.jpg", "Art Deco octagonal pendant watch set with green stones"),
    holder: { en: "Cleveland Museum of Art, ‘Jazz Age’ exhibition", zh: "克利夫兰艺术博物馆「爵士时代」展" },
    credit: {
      work: "Pendant watch, 1920s (Jazz Age exhibition, Cleveland Museum of Art)",
      author: "Tim Evanson",
      source: "Wikimedia Commons",
      license: "CC BY-SA 2.0",
      licenseUrl: BYSA2,
      url: "https://commons.wikimedia.org/wiki/File:Watch_-_Longines_(38691655675).jpg",
      changes: "Cropped and tone-adjusted; this version is shared under CC BY-SA 2.0",
    },
  },
  {
    id: "C-09",
    name: { en: "Triple-calendar chronograph", zh: "三历计时表" },
    place: { en: "Geneva", zh: "日内瓦" },
    date: { en: "From 1944", zh: "1944 年起" },
    title: { en: "Chronograph, full calendar and moon phase on one dial", zh: "计时、全历与月相，集于一枚表盘" },
    image: plate("/antiques/c-09-triple-calendar.jpg", "Chronograph with a black dial, three sub-dials, a full calendar and a moon phase"),
    holder: { en: "Private collection", zh: "私人收藏" },
    credit: {
      work: "Triple-calendar chronograph with moon phase, Geneva",
      author: "Nakatajun",
      source: "Wikimedia Commons",
      license: "Public domain",
      url: "https://commons.wikimedia.org/wiki/File:Universal-Geneve_Tri-Compax.jpg",
      changes: "Cropped and tone-adjusted",
    },
  },
];

/** The gold pocket watch that drifts across the home page. */
export const floatingWatch = {
  label: { en: "Gold · c. 1900", zh: "黄金 · 约 1900 年" } as Bi,
  caption: {
    en: "Open-face pocket watch, Paris",
    zh: "开面怀表，巴黎",
  } as Bi,
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
  return [...cabinet.map((c) => c.credit), floatingWatch.credit, posters.zenith.credit, posters.election.credit];
}
