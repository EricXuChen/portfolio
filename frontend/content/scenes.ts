/**
 * Scenes — photographs from a trip, recoloured into the archive's inks and
 * faded into the walls of each page. They are atmosphere only: never
 * captioned, never introduced, no places or dates.
 *
 * To swap a photograph, change one `id` in PAGE_SCENES below.
 * Files live in /public/scenes/<id>-1600.webp and <id>-800.webp.
 */

/** Pixel size of the 1600 version (used for width/height attributes). */
export const SCENE_FILES = {
  "gallery": { w: 1600, h: 1200 },
  "damask": { w: 1050, h: 1400 },
  "damask-forest": { w: 1400, h: 1400 },
  "coffer-gilt": { w: 1050, h: 1400 },
  "tapestry": { w: 1600, h: 978 },
  "stucco-doors": { w: 1600, h: 1333 },
  "clockroom": { w: 1050, h: 1400 },
  "damask-grey": { w: 880, h: 1060 },
  "chapel": { w: 1600, h: 1333 },
  "tapestry-hunt": { w: 1600, h: 756 },
  "painted-vault": { w: 1600, h: 1333 },
  "rococo-clock": { w: 990, h: 1400 },
  "coffer-key": { w: 1050, h: 1400 },
  "justitia": { w: 1600, h: 711 },
  "scales": { w: 980, h: 1400 },
  "rococo-corner": { w: 1482, h: 1400 },
  "dome": { w: 1600, h: 1333 },
  "mantel-desk": { w: 1600, h: 1333 },
  "caryatid": { w: 1050, h: 1400 },
  "engraving": { w: 985, h: 1400 },
  "theatre": { w: 1280, h: 1260 },
  "board": { w: 1400, h: 1400 },
  "vessel": { w: 1600, h: 1244 },
  "coffer-blue": { w: 1050, h: 1400 },
  "gilt-ceiling": { w: 1575, h: 1400 },
  "doorway": { w: 1260, h: 1400 },
  "pedestal-clock": { w: 1050, h: 1400 },
  "red-chair": { w: 1050, h: 1400 },
  "portrait-room": { w: 1050, h: 1400 },
  "canopy-bed": { w: 1050, h: 1400 },
  "empire-clock": { w: 1050, h: 1400 },
  "red-room": { w: 1260, h: 1400 },
  "chandelier": { w: 1400, h: 1400 },
  "mantel-wall": { w: 1050, h: 1400 },
  "parade-bed": { w: 1326, h: 1400 },
  "crimson-salon": { w: 1050, h: 1400 },
  "gilt-cornice": { w: 1482, h: 1400 },
  "grey-room": { w: 1050, h: 1400 },
  "maiolica": { w: 1326, h: 1400 },
  "green-gallery": { w: 1050, h: 1400 },
  "long-gallery": { w: 1400, h: 1400 },
  "mirror-gallery": { w: 1575, h: 1400 },
  "stove-niche": { w: 1050, h: 1400 },
  "pedestal-side": { w: 1050, h: 1400 },
  "vessel-detail": { w: 1600, h: 1333 },
  "maiolica-plate": { w: 1200, h: 1400 },
  "coat-of-arms": { w: 772, h: 1400 },
  "justitia-oval": { w: 1050, h: 1400 },
  "empire-pendulum": { w: 1326, h: 1400 },
  "vessel-lid": { w: 1575, h: 1400 },
  "vessel-jewels": { w: 1050, h: 1400 },
  "maiolica-court": { w: 1145, h: 1400 },
  "grey-desk": { w: 1050, h: 1400 },
  "alcove": { w: 1050, h: 1400 },
  "coffer-center": { w: 1200, h: 1400 },
  "gallery-detail": { w: 1200, h: 1400 },
  "chandelier-detail": { w: 1200, h: 1200 },
  "wood-coffer": { w: 1600, h: 978 },
  "canopy-textile": { w: 933, h: 1400 },
  "ceiling-corner": { w: 1200, h: 1300 },
  "clock-dial": { w: 900, h: 1000 },
  "dome-detail": { w: 1000, h: 1000 },
  "pedestal-detail": { w: 900, h: 1200 },
  "mantel-detail": { w: 1000, h: 900 },

} satisfies Record<string, { w: number; h: number }>;

export type SceneId = keyof typeof SCENE_FILES;

/**
 * ghost     — the whole opening is one photograph (L3); a veil darkens the text side
 * wallpaper — a woven or carved pattern across a whole section, very faint
 * paper     — a pattern pressed into the ivory band, like old paper
 * frieze    — a horizontal band between two sections
 * oval      — an object in a gilt oval, only where the page is empty
 */
export type SceneKind = "ghost" | "wallpaper" | "paper" | "frieze" | "oval";

export type SceneUse = {
  id: SceneId;
  kind: SceneKind;
  /** ghost: which side the photograph sits on; "top" fades downwards. */
  side?: "left" | "right" | "top";
  /** Opacity 0–1. Defaults per kind. */
  o?: number;
  /** object-position, e.g. "50% 30%". */
  pos?: string;
  /** Stretch to the full viewport width when the host is a centred .wrap. */
  bleed?: boolean;
};

export const PAGE_SCENES = {
  home: {
    cover: { id: "gallery", kind: "ghost", side: "right", o: 0.8, pos: "50% 40%" },
    contents: { id: "damask", kind: "wallpaper", o: 0.2 },
    lone: { id: "coffer-gilt", kind: "paper", o: 0.13 },
    closing: { id: "tapestry", kind: "frieze", o: 0.85, pos: "50% 42%" },
  },
  about: {
    mast: { id: "stucco-doors", kind: "ghost", side: "right", o: 0.8, pos: "50% 45%" },
  },
  watches: {
    mast: { id: "clockroom", kind: "ghost", side: "right", o: 0.8, pos: "50% 35%" },
    exhibit: { id: "damask-forest", kind: "wallpaper", o: 0.08, bleed: true },
  },
  watch: {
    page: { id: "damask-grey", kind: "wallpaper", o: 0.12, bleed: true },
  },
  experiences: {
    mast: { id: "chapel", kind: "ghost", side: "right", o: 0.8, pos: "50% 40%" },
    frieze: { id: "tapestry-hunt", kind: "frieze", o: 0.85, pos: "50% 50%" },
  },
  caseStudy: {
    frieze: { id: "mantel-desk", kind: "frieze", o: 0.85, pos: "50% 55%" },
  },
  artwork: {
    mast: { id: "caryatid", kind: "ghost", side: "left", o: 0.8, pos: "50% 30%" },
    /* behind the real artworks: pattern only, never a photograph of paintings */
    salon: { id: "damask", kind: "wallpaper", o: 0.08, bleed: true },
  },
  plate: {
    page: { id: "damask-forest", kind: "wallpaper", o: 0.08 },
  },
  projects: {
    mast: { id: "board", kind: "ghost", side: "top", o: 0.62, pos: "50% 50%" },
    oval: { id: "vessel", kind: "oval", o: 0.95, pos: "50% 45%" },
    frieze: { id: "theatre", kind: "frieze", o: 0.85, pos: "50% 50%" },
  },
  catalogue: {
    mast: { id: "coffer-blue", kind: "wallpaper", o: 0.22 },
    frieze: { id: "mirror-gallery", kind: "frieze", o: 0.85, pos: "50% 40%" },
  },
  credits: {
    frieze: { id: "engraving", kind: "frieze", o: 0.8, pos: "50% 22%" },
    mast: { id: "gilt-ceiling", kind: "ghost", side: "left", o: 0.8, pos: "50% 50%" },
  },
  notFound: {
    page: { id: "doorway", kind: "ghost", side: "left", o: 0.62, pos: "50% 40%", bleed: true },
  },
} satisfies Record<string, Record<string, SceneUse>>;

/** One opening photograph per chapter (and one band for the chapter on debate). */
export const CHAPTER_SCENES: Record<string, { hero: SceneUse; frieze?: SceneUse }> = {
  "international-education": { hero: { id: "painted-vault", kind: "ghost", side: "top", o: 0.62, pos: "50% 30%" } },
  "watch-reselling": { hero: { id: "rococo-clock", kind: "ghost", side: "right", o: 0.8, pos: "50% 30%" } },
  "debate-and-mun": {
    hero: { id: "coffer-key", kind: "ghost", side: "top", o: 0.62, pos: "50% 20%" },
    frieze: { id: "justitia", kind: "frieze", o: 0.9, pos: "50% 50%" },
  },
  "business-systems": { hero: { id: "scales", kind: "ghost", side: "right", o: 0.8, pos: "50% 40%" } },
  "personal-development": { hero: { id: "rococo-corner", kind: "ghost", side: "right", o: 0.8, pos: "50% 35%" } },
  "future-aspirations": { hero: { id: "dome", kind: "ghost", side: "top", o: 0.62, pos: "50% 25%" } },
};

/** Each watch in the collection opens on its own room. */
export const WATCH_SCENES: Record<string, SceneUse> = {
  "W-001": { id: "pedestal-clock", kind: "ghost", side: "left", o: 0.8, pos: "50% 40%", bleed: true },
  "W-002": { id: "red-chair", kind: "ghost", side: "left", o: 0.8, pos: "50% 55%", bleed: true },
  "W-003": { id: "portrait-room", kind: "ghost", side: "left", o: 0.8, pos: "50% 45%", bleed: true },
  "W-004": { id: "canopy-bed", kind: "ghost", side: "left", o: 0.8, pos: "50% 45%", bleed: true },
  "W-005": { id: "empire-clock", kind: "ghost", side: "left", o: 0.8, pos: "50% 50%", bleed: true },
  "W-006": { id: "red-room", kind: "ghost", side: "left", o: 0.8, pos: "50% 40%", bleed: true },
  "W-007": { id: "chandelier", kind: "ghost", side: "left", o: 0.8, pos: "50% 35%", bleed: true },
  "W-008": { id: "mantel-wall", kind: "ghost", side: "left", o: 0.8, pos: "50% 55%", bleed: true },
  "W-009": { id: "parade-bed", kind: "ghost", side: "left", o: 0.8, pos: "50% 45%", bleed: true },
  "W-010": { id: "crimson-salon", kind: "ghost", side: "left", o: 0.8, pos: "50% 40%", bleed: true },
};

/** Behind a real artwork only a pattern is allowed — never a photograph of paintings. */
export const PLATE_TEXTURES: SceneUse[] = [
  { id: "damask", kind: "wallpaper", o: 0.09 },
  { id: "coffer-key", kind: "wallpaper", o: 0.09 },
  { id: "damask-forest", kind: "wallpaper", o: 0.09 },
  { id: "coffer-blue", kind: "wallpaper", o: 0.09 },
  { id: "damask-grey", kind: "wallpaper", o: 0.09 },
  { id: "coffer-gilt", kind: "wallpaper", o: 0.09 },
];

/** Openings for the studio's other rooms: by medium, by year, the sketchbook. */
export const SERIES_SCENES: Record<string, SceneUse> = {
  ink: { id: "gilt-cornice", kind: "ghost", side: "right", o: 0.8, pos: "50% 40%" },
  pencil: { id: "grey-room", kind: "ghost", side: "left", o: 0.8, pos: "50% 45%" },
  colour: { id: "maiolica", kind: "ghost", side: "top", o: 0.66, pos: "50% 50%" },
};

export const YEAR_SCENES: Record<string, SceneUse> = {
  "2024": { id: "green-gallery", kind: "ghost", side: "right", o: 0.8, pos: "50% 40%" },
  "2025": { id: "long-gallery", kind: "ghost", side: "left", o: 0.8, pos: "50% 45%" },
  /* 2026 is left bare on purpose: one framed work on an empty wall */
};

export const SKETCHBOOK_SCENE: SceneUse = { id: "stove-niche", kind: "ghost", side: "right", o: 0.8, pos: "50% 45%" };
