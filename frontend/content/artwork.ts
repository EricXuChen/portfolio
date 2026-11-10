import type { ArchiveMeta, Bi } from "./types";

/* ------------------------------------------------------------------ */
/*  04 — Artwork & Creativity                                          */
/* ------------------------------------------------------------------ */

export const artworkIntro = {
  title: { en: "Artwork & Creativity", zh: "艺术作品" } as Bi,
  lede: {
    en: "Paintings, drawings and studies from the sketchbook and the studio table — each with its concept, process and what I learned from it.",
    zh: "来自速写本和画桌的绘画、素描与习作——每件作品都附有创作理念、过程，以及我从中得到的体会。",
  } as Bi,
  statementTitle: { en: "Artist Statement", zh: "创作自述" } as Bi,
  statement: [
    {
      en: "I make art to slow down. Most of my work begins with looking closely — how colour changes a form, how a loose line can hold movement, how a quiet wash can suggest a whole street.",
      zh: "我通过创作让自己慢下来。大多数作品都从仔细观察开始：色彩如何改变形体，松动的线条如何留住动态，一层安静的淡彩如何暗示出整条街道。",
    },
    {
      en: "I change materials on purpose: charcoal and pigment when I want energy, oil when I want weight, ink and watercolour when I want speed and air.",
      zh: "我会有意识地更换材料：想要力量感时用彩色炭笔和颜料，想要重量感时用油画，想要速度和空气感时用墨水和水彩。",
    },
    {
      en: "Time runs through the work in another way too. Watches taught me to notice small mechanisms and slow rituals — and The Night and Time asks what it means to pay attention in a city that never stops.",
      zh: "时间也以另一种方式贯穿我的作品。腕表教会我留意细小的机械和缓慢的仪式——而《The Night and Time》想问的是：在一座从不停歇的城市里，专注意味着什么。",
    },
  ] as Bi[],
};

export type Artwork = ArchiveMeta & {
  slug: string;
  title: string;
  titleZh: string;
  year?: string;
  medium?: Bi;
  support?: Bi;
  image?: { src: string; width: number; height: number; alt: string };
  concept: Bi;
  inspiration?: Bi;
  process?: Bi;
  reflection?: Bi;
  symbols?: Bi[];
  featured?: boolean;
};

export const artworks: Artwork[] = [
  {
    id: "A-001",
    updated: "2026-11-10",
    visibility: "public",
    slug: "the-night-and-time",
    featured: true,
    title: "The Night and Time",
    titleZh: "夜与时间",
    concept: {
      en: "A work built around a single watch. Against the speed of a modern city, a close-up of a tourbillon asks the viewer to slow down and notice how time is actually made.",
      zh: "一件围绕一块腕表展开的作品。在现代城市的快节奏背景前，陀飞轮的特写让观者放慢脚步，留意时间究竟是如何被“制造”出来的。",
    },
    inspiration: {
      en: "The watch at the centre is a gift from my uncle. It carries personal meaning for me, which is why it — and not an idealised watch — became the subject.",
      zh: "作品中心的腕表是叔叔送给我的礼物。它对我有很强的个人意义，所以我选择它，而不是一块理想化的腕表，作为作品的主体。",
    },
    symbols: [
      {
        en: "The watch — time itself, and a personal connection.",
        zh: "腕表——时间本身，也是一段个人联系。",
      },
      {
        en: "The tourbillon — the relationship between mechanism and time: a cage turning to correct for gravity.",
        zh: "陀飞轮——机械结构与时间的关系：一个为抵消重力而不停旋转的框架。",
      },
      {
        en: "City buildings and the background — the fast rhythm of modern society.",
        zh: "城市建筑与背景——现代社会的快节奏。",
      },
      {
        en: "The close-up composition — attention, and the decision to slow down.",
        zh: "特写构图——专注，以及选择放慢节奏。",
      },
    ],
  },
  {
    id: "A-002",
    updated: "2026-11-10",
    visibility: "public",
    slug: "colorful-chicken",
    title: "Colorful Chicken",
    titleZh: "彩色公鸡",
    year: "2025",
    medium: { en: "Colourful charcoal and pigment", zh: "彩色炭笔与颜料" },
    support: { en: "Studio sheet", zh: "画室用纸" },
    image: {
      src: "/artworks/picture1.jpg",
      width: 1279,
      height: 1706,
      alt: "Colorful Chicken — a rooster in colourful charcoal and pigment",
    },
    concept: {
      en: "A portrait of a rooster where colour, not outline, carries the energy — so the bird feels like a presence rather than a diagram.",
      zh: "一幅由色彩而不是轮廓承担能量的公鸡肖像，让它看起来像一个“存在”，而不是一张示意图。",
    },
    process: {
      en: "I blocked in the dark structure first, then dragged saturated colour over it so the feathers and comb feel loud and alive instead of flat.",
      zh: "先铺出深色的结构，再把饱和的颜色拖擦上去，让羽毛和鸡冠显得鲜明、有生命力，而不是平面的。",
    },
    reflection: {
      en: "Letting the colour push past the outline keeps the drawing energetic.",
      zh: "让颜色越过轮廓线，画面才能保持活力。",
    },
  },
  {
    id: "A-003",
    updated: "2026-11-10",
    visibility: "public",
    slug: "oil-melon",
    title: "Oil Melon",
    titleZh: "油画·甜瓜",
    year: "2025",
    medium: { en: "Oil paint", zh: "油画颜料" },
    support: { en: "Studio panel", zh: "画板" },
    image: {
      src: "/artworks/picture2.jpg",
      width: 1279,
      height: 1706,
      alt: "Oil Melon — an oil study of a melon on white drapery",
    },
    concept: {
      en: "An oil study of a melon on a quiet table: weight, a rough rind, and how a thin highlight can make fruit look heavy and edible at the same time.",
      zh: "一幅安静桌面上的甜瓜油画习作：重量、粗糙的外皮，以及一道细细的高光如何让水果同时显得沉甸甸又可口。",
    },
    process: {
      en: "The slower paint surface gave me room to compare warm and cool greens against the drapery and the dark red ground.",
      zh: "油画较慢的干燥速度，让我有时间在衬布和深红色背景之间比较冷暖不同的绿色。",
    },
    reflection: {
      en: "A simple arrangement can stay calm and still hold the eye.",
      zh: "简单的构图可以保持安静，同时依然吸引视线。",
    },
  },
  {
    id: "A-004",
    updated: "2026-11-10",
    visibility: "public",
    slug: "chicken-sketch",
    title: "Chicken Sketch",
    titleZh: "公鸡速写",
    year: "2025",
    medium: { en: "Graphite / ink sketch", zh: "铅笔 / 墨水速写" },
    support: { en: "Sketchbook page", zh: "速写本" },
    image: {
      src: "/artworks/picture3.jpg",
      width: 1279,
      height: 1706,
      alt: "Chicken Sketch — a fast, gestural drawing of a rooster",
    },
    concept: {
      en: "A second rooster, drawn faster and looser — about gesture and silhouette, the opposite of the colour portrait.",
      zh: "第二只公鸡，画得更快、更松——关注的是姿态和轮廓，与彩色肖像正好相反。",
    },
    process: {
      en: "I kept the marks direct so the posture reads quickly.",
      zh: "笔触保持直接，让姿态一眼就能读出来。",
    },
    reflection: {
      en: "Leaving the imperfect lines visible became part of the sketch's character.",
      zh: "保留不完美的线条，反而成为这张速写的个性。",
    },
  },
  {
    id: "A-005",
    updated: "2026-11-10",
    visibility: "public",
    slug: "paris-street",
    title: "Paris Street",
    titleZh: "巴黎街景",
    year: "2025",
    medium: { en: "Watercolour", zh: "水彩" },
    support: { en: "A4 paper", zh: "A4 纸" },
    image: {
      src: "/artworks/picture4.jpg",
      width: 1279,
      height: 1706,
      alt: "Paris Street — a watercolour of a Parisian square with flags and a column",
    },
    concept: {
      en: "A Paris square with flags and a central column, painted so the city feels like a memory you walk through, not a postcard.",
      zh: "一座有旗帜和中央纪念柱的巴黎广场，画成一段可以走进去的记忆，而不是一张明信片。",
    },
    process: {
      en: "Wet-into-wet washes built the stone and sky; edges stayed soft on purpose. A few firmer marks anchor the scene.",
      zh: "用湿画法叠出石材和天空，边缘刻意保持柔和；少数更肯定的线条把画面稳住。",
    },
    reflection: {
      en: "Loose washes let light and architecture blend together.",
      zh: "松动的淡彩让光线与建筑自然融合。",
    },
  },
];
