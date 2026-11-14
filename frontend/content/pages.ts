/**
 * The archive's smaller rooms: one page per interest, per value, per moment
 * on the timeline, per project, per era of the collection, per letter of the
 * catalogue. Every word here comes from content that already exists on the
 * site; these pages only give each thing a room of its own.
 */
import type { SceneUse } from "./scenes";
import type { Bi } from "./types";

type Layout = "classic" | "overlap" | "split" | "vertical" | "centered" | "frame";
type Voice = "italic" | "bodoni" | "cond";

export type RoomLink = { href: string; label: Bi; kicker?: string; img?: { src: string; width: number; height: number } };

/* ------------------------------------------------------------------ */
/*  Interests — from “What I pay attention to” on the About page        */
/* ------------------------------------------------------------------ */
export const INTERESTS: {
  slug: string;
  index: number;
  word: string;
  layout: Layout;
  voice: Voice;
  scene: SceneUse;
  links: RoomLink[];
}[] = [
  {
    slug: "mechanical-watchmaking",
    index: 0,
    word: "MOVEMENT.",
    layout: "split",
    voice: "bodoni",
    scene: { id: "pedestal-side", kind: "ghost", side: "right", o: 0.8, pos: "50% 45%" },
    links: [
      { href: "/watches", kicker: "W", label: { en: "The collection", zh: "腕表收藏" }, img: { src: "/collection/w-001-pole-epoch.jpg", width: 1280, height: 1600 } },
      { href: "/watches/era/after-1990", kicker: "W", label: { en: "Watches after 1990", zh: "1990 年之后的表" } },
      { href: "/watches/era/mid-century", kicker: "W", label: { en: "Mid-century watches", zh: "世纪中期的表" } },
      { href: "/watches/era/early-twentieth-century", kicker: "W", label: { en: "Early twentieth century", zh: "二十世纪初" } },
      { href: "/experiences/moments/e-001", kicker: "E-001", label: { en: "Watches become more than a hobby", zh: "腕表不再只是爱好" } },
    ],
  },
  {
    slug: "business-and-entrepreneurship",
    index: 1,
    word: "TRADE.",
    layout: "overlap",
    voice: "cond",
    scene: { id: "vessel-detail", kind: "ghost", side: "right", o: 0.8, pos: "50% 50%" },
    links: [
      { href: "/experiences/vintage-watch-trading", kicker: "P-00", label: { en: "Vintage watch trading — the case study", zh: "二手腕表经营——案例" } },
      { href: "/experiences/watch-reselling", kicker: "E-102", label: { en: "Independent watch reselling", zh: "独立二手腕表经营" } },
      { href: "/experiences/business-systems", kicker: "E-104", label: { en: "Business systems & automation", zh: "商业系统与自动化" } },
      { href: "/projects", kicker: "P", label: { en: "Projects on the workbench", zh: "工作台上的项目" } },
      { href: "/experiences/moments/e-003", kicker: "E-003", label: { en: "The first sales", zh: "第一批成交" } },
    ],
  },
  {
    slug: "art-and-design",
    index: 2,
    word: "COLOUR.",
    layout: "centered",
    voice: "italic",
    scene: { id: "maiolica-plate", kind: "ghost", side: "top", o: 0.62, pos: "50% 45%" },
    links: [
      { href: "/artwork", kicker: "A", label: { en: "The studio", zh: "画室" }, img: { src: "/artworks/a-001-the-night-and-time.jpg", width: 1251, height: 1600 } },
      { href: "/artwork/series/ink", kicker: "A", label: { en: "Works in ink", zh: "墨" } },
      { href: "/artwork/series/pencil", kicker: "A", label: { en: "Works in pencil", zh: "铅笔" } },
      { href: "/artwork/series/colour", kicker: "A", label: { en: "Works in colour", zh: "色彩" } },
      { href: "/artwork/sketchbook", kicker: "A", label: { en: "The sketchbook", zh: "速写本" } },
    ],
  },
  {
    slug: "history",
    index: 3,
    word: "PAST.",
    layout: "frame",
    voice: "bodoni",
    scene: { id: "coat-of-arms", kind: "ghost", side: "right", o: 0.8, pos: "50% 40%" },
    links: [
      { href: "/watches/era/early-twentieth-century", kicker: "W-010", label: { en: "A pocket watch from the early twentieth century", zh: "一块二十世纪初的怀表" } },
      { href: "/artwork/grand-staircase", kicker: "A", label: { en: "The Grand Staircase, Palais Garnier", zh: "巴黎歌剧院大阶梯" } },
      { href: "/artwork/baptism-study", kicker: "A-036", label: { en: "The Baptism, a Study", zh: "洗礼（习作）" } },
      { href: "/watches/era/mid-century", kicker: "W", label: { en: "Mid-century watches", zh: "世纪中期的表" } },
    ],
  },
  {
    slug: "debate-and-ideas",
    index: 4,
    word: "ARGUMENT.",
    layout: "vertical",
    voice: "cond",
    scene: { id: "justitia-oval", kind: "ghost", side: "right", o: 0.8, pos: "50% 45%" },
    links: [
      { href: "/experiences/debate-and-mun", kicker: "E-103", label: { en: "Debate & Model United Nations", zh: "辩论与模拟联合国" } },
      { href: "/recognition", kicker: "R-001", label: { en: "John Locke Global Essay Prize", zh: "约翰·洛克全球论文奖" } },
      { href: "/about/values/honest-description", kicker: "II", label: { en: "Honest description", zh: "诚实地描述" } },
    ],
  },
  {
    slug: "music-and-sport",
    index: 5,
    word: "TEMPO.",
    layout: "classic",
    voice: "italic",
    scene: { id: "empire-pendulum", kind: "ghost", side: "left", o: 0.8, pos: "50% 45%" },
    links: [
      { href: "/about#music", kicker: "♪", label: { en: "The flute, on the About page", zh: "关于我 · 长笛" } },
      { href: "/about/values/learning-by-doing", kicker: "III", label: { en: "Learning by doing", zh: "在实践中学习" } },
    ],
  },
];

export const interestHref = (slug: string) => `/about/interests/${slug}`;

/* ------------------------------------------------------------------ */
/*  Values — “What I value”, each on a page of mostly empty wall        */
/* ------------------------------------------------------------------ */
export const VALUE_SLUGS = ["craft-over-logos", "honest-description", "learning-by-doing", "build-the-system"] as const;
export const valueHref = (slug: string) => `/about/values/${slug}`;

/* ------------------------------------------------------------------ */
/*  Moments — one page per entry on the timeline                        */
/* ------------------------------------------------------------------ */
export const MOMENT_SCENES: Record<string, SceneUse> = {
  "E-001": { id: "vessel-lid", kind: "ghost", side: "right", o: 0.8, pos: "50% 45%" },
  "E-002": { id: "vessel-jewels", kind: "ghost", side: "left", o: 0.8, pos: "50% 45%" },
  "E-003": { id: "maiolica-court", kind: "ghost", side: "right", o: 0.78, pos: "50% 45%" },
  "E-004": { id: "grey-desk", kind: "ghost", side: "left", o: 0.8, pos: "50% 55%" },
  "E-005": { id: "alcove", kind: "ghost", side: "right", o: 0.8, pos: "50% 40%" },
  "E-006": { id: "coffer-center", kind: "ghost", side: "top", o: 0.62, pos: "50% 50%" },
  "E-007": { id: "gallery-detail", kind: "ghost", side: "left", o: 0.8, pos: "50% 40%" },
};
export const momentHref = (id: string) => `/experiences/moments/${id.toLowerCase()}`;

/* ------------------------------------------------------------------ */
/*  Projects — one page per idea on the workbench                       */
/* ------------------------------------------------------------------ */
export const PROJECT_PAGES: {
  id: string;
  slug: string;
  word: string;
  scene: SceneUse;
  note: Bi;
  links: RoomLink[];
}[] = [
  {
    id: "P-01",
    slug: "independent-vintage-watch-website",
    word: "WEBSITE.",
    scene: { id: "chandelier-detail", kind: "ghost", side: "right", o: 0.8, pos: "50% 40%" },
    note: { en: "A site of its own for the business, planned after the marketplaces.", zh: "在各个线上平台之后，为这门生意规划一个属于自己的网站。" },
    links: [{ href: "/experiences/vintage-watch-trading", kicker: "P-00", label: { en: "The trading case study", zh: "二手腕表经营案例" } }],
  },
  {
    id: "P-02",
    slug: "inventory-management-automation",
    word: "LEDGER.",
    scene: { id: "wood-coffer", kind: "ghost", side: "top", o: 0.62, pos: "50% 50%" },
    note: { en: "Numbering, spreadsheets and automated data entry, so every piece has a record.", zh: "编号、表格和自动化数据录入，让每一块表都有记录。" },
    links: [{ href: "/experiences/business-systems", kicker: "E-104", label: { en: "Business systems & automation", zh: "商业系统与自动化" } }],
  },
  {
    id: "P-03",
    slug: "watch-accessories-and-straps",
    word: "STRAPS.",
    scene: { id: "canopy-textile", kind: "ghost", side: "left", o: 0.78, pos: "50% 50%" },
    note: { en: "Straps measured and drawn on the design sheet in the studio.", zh: "在画室的设计稿上量好尺寸、画出来的表带。" },
    links: [{ href: "/artwork/watch-and-strap-design", kicker: "A-020", label: { en: "Watch and strap, a design study", zh: "腕表与表带设计稿" } }],
  },
  {
    id: "P-04",
    slug: "distribution-network",
    word: "NETWORK.",
    scene: { id: "ceiling-corner", kind: "ghost", side: "right", o: 0.8, pos: "50% 45%" },
    note: { en: "Working with partner sellers, with clear rules for settling results.", zh: "与合作卖家共同经营，并制定清晰的结算规则。" },
    links: [{ href: "/experiences/watch-reselling", kicker: "E-102", label: { en: "Independent watch reselling", zh: "独立二手腕表经营" } }],
  },
  {
    id: "P-05",
    slug: "independent-watch-design",
    word: "DESIGN.",
    scene: { id: "clock-dial", kind: "ghost", side: "left", o: 0.8, pos: "50% 45%" },
    note: { en: "From the design sheet on the studio table towards a watch of my own.", zh: "从画桌上的那张设计稿开始，走向一块属于自己的腕表。" },
    links: [
      { href: "/artwork/watch-and-strap-design", kicker: "A-020", label: { en: "Watch and strap, a design study", zh: "腕表与表带设计稿" } },
      { href: "/about/interests/mechanical-watchmaking", kicker: "I", label: { en: "Mechanical watchmaking", zh: "机械制表" } },
    ],
  },
];
export const projectHref = (slug: string) => `/projects/${slug}`;

/* ------------------------------------------------------------------ */
/*  The collection by era                                               */
/* ------------------------------------------------------------------ */
export const ERAS: { slug: string; word: string; title: Bi; lede: Bi; ids: string[]; scene: SceneUse; layout: Layout }[] = [
  {
    slug: "after-1990",
    word: "MODERN.",
    title: { en: "After 1990", zh: "1990 年之后" },
    lede: { en: "The watches in the collection made in the last three decades — from a 2025 tourbillon to a calendar watch from after 1991.", zh: "收藏里近三十年制造的表——从 2025 年的陀飞轮，到 1991 年之后的日历表。" },
    ids: ["W-001", "W-002", "W-003", "W-004", "W-005"],
    scene: { id: "dome-detail", kind: "ghost", side: "right", o: 0.8, pos: "50% 45%" },
    layout: "split",
  },
  {
    slug: "mid-century",
    word: "MID-CENTURY.",
    title: { en: "The middle of the century", zh: "二十世纪中期" },
    lede: { en: "Watches estimated to the 1950s, 60s and 70s.", zh: "年代估计在 1950 至 1970 年代的表。" },
    ids: ["W-006", "W-007", "W-008", "W-009"],
    scene: { id: "pedestal-detail", kind: "ghost", side: "left", o: 0.8, pos: "50% 40%" },
    layout: "overlap",
  },
  {
    slug: "early-twentieth-century",
    word: "MCMX.",
    title: { en: "Early twentieth century", zh: "二十世纪初" },
    lede: { en: "The oldest piece in the collection: a pocket watch from the early twentieth century.", zh: "收藏里最老的一件：一块二十世纪初的怀表。" },
    ids: ["W-010"],
    scene: { id: "mantel-detail", kind: "ghost", side: "right", o: 0.8, pos: "50% 50%" },
    layout: "centered",
  },
];
export const eraHref = (slug: string) => `/watches/era/${slug}`;

/* ------------------------------------------------------------------ */
/*  Catalogue letters                                                   */
/* ------------------------------------------------------------------ */
export const LETTERS = {
  w: { word: "W.", title: { en: "W — Watches", zh: "W —— 腕表" } as Bi, scene: { id: "damask", kind: "wallpaper", o: 0.2 } as SceneUse },
  a: { word: "A.", title: { en: "A — Artworks", zh: "A —— 作品" } as Bi, scene: { id: "coffer-key", kind: "wallpaper", o: 0.2 } as SceneUse },
  e: { word: "E.", title: { en: "E — Experiences", zh: "E —— 经历" } as Bi, scene: { id: "coffer-blue", kind: "wallpaper", o: 0.2 } as SceneUse },
  r: { word: "R.", title: { en: "R — Recognition", zh: "R —— 荣誉" } as Bi, scene: { id: "damask-grey", kind: "wallpaper", o: 0.2 } as SceneUse },
  p: { word: "P.", title: { en: "P — Projects", zh: "P —— 项目" } as Bi, scene: { id: "damask-forest", kind: "wallpaper", o: 0.16 } as SceneUse },
};
export type Letter = keyof typeof LETTERS;
export const letterHref = (l: string) => `/catalogue/${l}`;
