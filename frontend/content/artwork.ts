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
  banner: {
    src: "/studio/pen-banner.jpg",
    width: 1920,
    height: 800,
    alt: "An ink drawing of ornamental scrollwork in progress, a fountain pen resting beside it",
    caption: {
      en: "At the drawing table — Ornamental Cartouche (A-019) in progress",
      zh: "画桌上——进行中的《巴洛克边框》（A-019）",
    } as Bi,
  },
  draftsLede: {
    en: "Sketches, studies and pieces still on the table. They stay unfinished here on purpose — the process is part of the work.",
    zh: "速写、习作，以及还在画桌上的作品。它们在这里刻意保持未完成的样子——过程本身也是作品的一部分。",
  } as Bi,
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

export type ArtImage = { src: string; width: number; height: number; alt: string };

/** Which shelf of the gallery a work sits on. */
export type ArtKind = "ink" | "pencil" | "colour";

export type Artwork = ArchiveMeta & {
  slug: string;
  title: string;
  titleZh: string;
  year?: string;
  medium?: Bi;
  support?: Bi;
  kind?: ArtKind;
  /** "draft" = sketch or work in progress (shown in the Drafts section). */
  status?: "finished" | "draft";
  /** Photos of the work — the first one is the cover; the rest are extra views. */
  images?: ArtImage[];
  /** A short description, for works without the longer texts below. */
  note?: Bi;
  concept?: Bi;
  inspiration?: Bi;
  process?: Bi;
  reflection?: Bi;
  symbols?: Bi[];
  featured?: boolean;
};

const img = (src: string, width: number, height: number, alt: string): ArtImage => ({ src, width, height, alt });

export const artworks: Artwork[] = [
  {
    id: "A-001",
    updated: "2026-11-10",
    visibility: "public",
    slug: "the-night-and-time",
    featured: true,
    title: "The Night and Time",
    titleZh: "夜与时间",
    medium: { en: "Watercolour", zh: "水彩" },
    kind: "colour",
    images: [
      img(
        "/artworks/a-001-the-night-and-time.jpg",
        1251,
        1600,
        "The Night and Time — watercolour of a candle, a bottle with a tourbillon watch, a tin of Altoids and a red curtain on a round table",
      ),
    ],
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
    kind: "colour",
    images: [
      img("/artworks/a-002-colorful-chicken-2.jpg", 1209, 1600, "Colorful Chicken — a rooster beside a large egg, in colourful charcoal and pigment"),
      img("/artworks/picture1.jpg", 1008, 1405, "Colorful Chicken — a second photograph of the finished sheet, in warmer light"),
    ],
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
    kind: "colour",
    images: [
      img("/artworks/picture2.jpg", 1149, 1515, "Oil Melon — an oil study of a melon on white drapery"),
      img("/artworks/a-003-oil-melon-easel.jpg", 990, 1152, "Oil Melon in progress on the studio easel"),
    ],
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
    kind: "pencil",
    images: [img("/artworks/picture3.jpg", 1142, 1337, "Chicken Sketch — a fast, gestural drawing of a rooster")],
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
    kind: "colour",
    images: [img("/artworks/picture4.jpg", 1097, 805, "Paris Street — a watercolour of a Parisian square with flags and a column")],
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

  /* ---------------------------------------------------------------- */
  /*  Gallery — finished works                                          */
  /* ---------------------------------------------------------------- */
  {
    id: "A-006",
    updated: "2026-11-11",
    visibility: "public",
    slug: "the-reader",
    title: "The Reader",
    titleZh: "读书的老人",
    year: "2026",
    medium: { en: "Charcoal", zh: "炭笔" },
    kind: "pencil",
    images: [
      img("/artworks/a-006-the-reader.jpg", 1030, 1421, "The Reader — charcoal drawing of an old bearded man over a book"),
      img("/artworks/a-006-the-reader-detail.jpg", 1200, 1600, "The Reader — close view of the face, hands and the red page"),
    ],
    note: {
      en: "An old man bent over a heavy book. The whole drawing stays in charcoal greys; the only colour is the small red page.",
      zh: "一位埋首于厚书的老人。整幅画都停留在炭笔的灰调里，唯一的颜色是那一页小小的红。",
    },
  },
  {
    id: "A-007",
    updated: "2026-11-11",
    visibility: "public",
    slug: "black-cat-on-tartan",
    title: "Black Cat on Tartan",
    titleZh: "格子毯上的黑猫",
    year: "2026",
    medium: { en: "Pastel", zh: "色粉" },
    kind: "colour",
    images: [img("/artworks/a-007-black-cat.jpg", 1361, 1600, "Black Cat on Tartan — a black cat licking its paw on a tartan blanket against red floral cloth")],
    note: {
      en: "A black cat licking its paw on a tartan blanket, in front of a red floral cloth.",
      zh: "一只在格子毯上舔爪的黑猫，背后是红色碎花布。",
    },
  },
  {
    id: "A-008",
    updated: "2026-11-11",
    visibility: "public",
    slug: "ink-and-water-venice",
    title: "Ink and Water, Venice",
    titleZh: "墨与水·威尼斯",
    year: "2025",
    medium: { en: "Ink, with a hand-drawn frame", zh: "墨水，手绘边框" },
    kind: "ink",
    images: [
      img("/artworks/a-008-venice.jpg", 1600, 1053, "Ink and Water, Venice — St Mark's Basin in cross-hatched ink inside an ornamental frame"),
      img("/artworks/a-008-venice-detail.jpg", 1600, 1050, "Ink and Water, Venice — closer view of the bell tower, palaces and gondolas"),
    ],
    note: {
      en: "St Mark's Basin with the bell tower and the Doge's Palace, in dense cross-hatching, inside an ornamental frame drawn by hand.",
      zh: "圣马可湾、钟楼与总督宫，用密集的交叉排线画成，外面是一圈手绘的装饰边框。",
    },
  },
  {
    id: "A-009",
    updated: "2026-11-11",
    visibility: "public",
    slug: "mountain-bell-tower",
    title: "Mountain Bell Tower",
    titleZh: "山谷钟楼",
    year: "2025",
    medium: { en: "Charcoal and graphite", zh: "炭笔与铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-009-mountain-bell-tower.jpg", 1429, 1600, "Mountain Bell Tower — a Romanesque bell tower and church below mountains, in charcoal")],
    note: {
      en: "A Romanesque bell tower and a small church at the foot of the mountains.",
      zh: "群山脚下的一座罗马式钟楼和小教堂。",
    },
  },
  {
    id: "A-010",
    updated: "2026-11-11",
    visibility: "public",
    slug: "terrace-in-the-afternoon",
    title: "Terrace in the Afternoon",
    titleZh: "午后露台",
    year: "2024",
    medium: { en: "Watercolour and ink", zh: "水彩与墨线" },
    kind: "colour",
    images: [img("/artworks/a-010-terrace.jpg", 1123, 1600, "Terrace in the Afternoon — watercolour of a café terrace under an awning and a street of arcades")],
    note: {
      en: "A café terrace under an awning, looking down a street of arcades.",
      zh: "遮阳篷下的露台，望向一条带拱廊的街道。",
    },
  },
  {
    id: "A-011",
    updated: "2026-11-11",
    visibility: "public",
    slug: "river-town",
    title: "River Town",
    titleZh: "河畔小镇",
    year: "2025",
    medium: { en: "Charcoal", zh: "炭笔" },
    kind: "pencil",
    images: [img("/artworks/a-011-river-town.jpg", 1600, 1083, "River Town — charcoal drawing of an old town and bridge reflected in water")],
    note: {
      en: "An old town and its bridge, reflected in still water.",
      zh: "一座老镇和它的石桥，倒映在平静的水面上。",
    },
  },
  {
    id: "A-012",
    updated: "2026-11-11",
    visibility: "public",
    slug: "pig-melon-and-apple",
    title: "Pig, Melon and Apple",
    titleZh: "猪、西瓜与苹果",
    year: "2025",
    medium: { en: "Watercolour and coloured pencil", zh: "水彩与彩铅" },
    kind: "colour",
    images: [img("/artworks/a-012-pig-melon-apple.jpg", 1600, 1073, "Pig, Melon and Apple — a blue pig, a slice of watermelon and an apple on an open plain")],
    note: {
      en: "A still life that turns surreal: a blue pig, a slice of watermelon and an apple on an open plain.",
      zh: "一幅变得超现实的静物：蓝色的猪、一片西瓜和一个苹果，放在开阔的原野上。",
    },
  },
  {
    id: "A-013",
    updated: "2026-11-11",
    visibility: "public",
    slug: "rose",
    title: "Rose",
    titleZh: "玫瑰",
    year: "2025",
    medium: { en: "Graphite", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-013-rose.jpg", 1443, 1429, "Rose — a single rose in graphite against a dark ground")],
    note: {
      en: "A single rose in graphite, the petals lifted out of a dark ground.",
      zh: "一朵用铅笔画的玫瑰，花瓣从深色的背景里被提亮出来。",
    },
  },
  {
    id: "A-014",
    updated: "2026-11-11",
    visibility: "public",
    slug: "pocket-watch-pen-and-letter",
    title: "Pocket Watch, Pen and Letter",
    titleZh: "怀表、钢笔与信",
    year: "2025",
    medium: { en: "Ink", zh: "墨水" },
    kind: "ink",
    images: [img("/artworks/a-014-pocket-watch.jpg", 1600, 1300, "Pocket Watch, Pen and Letter — ink drawing of an open pocket watch, a fountain pen and a letter")],
    note: {
      en: "An open pocket watch with its movement showing, a fountain pen and a letter with a crest.",
      zh: "打开后盖、露出机芯的怀表，一支钢笔，和一封带纹章的信。",
    },
  },
  {
    id: "A-015",
    updated: "2026-11-11",
    visibility: "public",
    slug: "halberdier-with-balloons",
    title: "Halberdier with Balloons",
    titleZh: "拿气球的戟兵",
    medium: { en: "Pencil", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-015-halberdier.jpg", 742, 1195, "Halberdier with Balloons — a soldier with a halberd, a bunch of balloons and a smiling shield")],
    note: {
      en: "A soldier in a fur hat holding a halberd — and a bunch of balloons, and a shield with a smiling face.",
      zh: "一位戴毛皮帽、手持长戟的士兵——同时还拿着一大把气球，和一面画着笑脸的盾牌。",
    },
  },
  {
    id: "A-016",
    updated: "2026-11-11",
    visibility: "public",
    slug: "grand-staircase",
    title: "The Grand Staircase, Palais Garnier",
    titleZh: "巴黎歌剧院·大阶梯",
    year: "2025",
    medium: { en: "Ink", zh: "墨水" },
    kind: "ink",
    images: [
      img("/artworks/a-016-grand-staircase.jpg", 1320, 1600, "The Grand Staircase of the Palais Garnier — ink drawing with arches and a crowd"),
      img("/artworks/a-016-grand-staircase-2.jpg", 1498, 1600, "The Grand Staircase, Palais Garnier — the whole sheet"),
    ],
    note: {
      en: "The grand staircase of the Palais Garnier, the Paris Opera — drawn in ink, with the crowd as small marks.",
      zh: "巴黎歌剧院（加尼叶宫）的大阶梯，用墨水画成，人群只是一个个小小的笔触。",
    },
  },
  {
    id: "A-017",
    updated: "2026-11-11",
    visibility: "public",
    slug: "opera-house-facade",
    title: "Palais Garnier, Dome and Façade",
    titleZh: "巴黎歌剧院·穹顶与立面",
    year: "2025",
    medium: { en: "Pencil", zh: "铅笔" },
    kind: "pencil",
    images: [
      img("/artworks/a-017-opera-facade.jpg", 1600, 1037, "Palais Garnier — pencil drawing of the dome and rooftop statues"),
      img("/artworks/a-017-opera-facade-2.jpg", 1600, 1244, "Palais Garnier, Dome and Façade — the whole sheet"),
    ],
    note: {
      en: "The dome and rooftop statues of the Paris Opera, in fast pencil lines.",
      zh: "巴黎歌剧院的穹顶和屋顶雕像，用很快的铅笔线条画成。",
    },
  },

  /* ---------------------------------------------------------------- */
  /*  Drafts — sketches and works in progress                           */
  /* ---------------------------------------------------------------- */
  {
    id: "A-018",
    updated: "2026-11-11",
    visibility: "public",
    status: "draft",
    slug: "venice-second-frame",
    title: "Venice, a Second Frame",
    titleZh: "威尼斯·第二幅边框",
    medium: { en: "Ink over a pencil grid", zh: "墨水，铅笔网格" },
    kind: "ink",
    images: [img("/artworks/a-018-venice-frame.jpg", 1200, 1600, "A second Venice frame in progress, lying on the engraving it follows")],
    note: {
      en: "A second Venice frame, laid on the engraving it follows. Where the ink has not reached yet, the pencil grid still shows.",
      zh: "第二幅威尼斯边框，放在作为参照的版画上。墨线还没画到的地方，仍能看到铅笔网格。",
    },
  },
  {
    id: "A-019",
    updated: "2026-11-11",
    visibility: "public",
    status: "draft",
    slug: "ornamental-cartouche",
    title: "Ornamental Cartouche",
    titleZh: "巴洛克边框",
    medium: { en: "Fineliner and fountain pen", zh: "针管笔与钢笔" },
    kind: "ink",
    images: [
      img("/artworks/a-019-cartouche.jpg", 1600, 1067, "Ornamental Cartouche in progress on the drawing table, with pens, a compass and a chain"),
      img("/artworks/a-019-cartouche-detail.jpg", 1600, 1067, "Ornamental Cartouche — close view of the inked scrollwork beside a fountain pen"),
    ],
    note: {
      en: "A Baroque frame with oval windows and a small clock face in the corner — one side inked, the other still in pencil.",
      zh: "一个带椭圆窗口的巴洛克边框，角落里有一个小钟面——一侧已经上墨，另一侧还是铅笔稿。",
    },
  },
  {
    id: "A-020",
    updated: "2026-11-11",
    visibility: "public",
    status: "draft",
    slug: "watch-and-strap-design",
    title: "Watch and Strap, a Design Study",
    titleZh: "腕表与表带设计稿",
    medium: { en: "Fineliner and pencil", zh: "针管笔与铅笔" },
    kind: "ink",
    images: [img("/artworks/a-020-watch-design.jpg", 1200, 1600, "Watch and strap design sheet with measurements, beside a pocket watch and a gold wristwatch")],
    note: {
      en: "A design sheet for a watch: the case at 28–30 mm, the crown, and a strap with its material options — leather, crocodile, canvas, Oyster and Milanese steel.",
      zh: "一张腕表设计稿：28–30 毫米的表壳、表冠，以及一条表带和它的材质选项——皮革、鳄鱼皮、帆布、蚝式与米兰钢带。",
    },
  },
  {
    id: "A-021",
    updated: "2026-11-11",
    visibility: "public",
    status: "draft",
    slug: "tall-ship",
    title: "Tall Ship",
    titleZh: "帆船",
    year: "2025",
    medium: { en: "Pencil and watercolour", zh: "铅笔与水彩" },
    kind: "colour",
    images: [img("/artworks/a-021-tall-ship.jpg", 1098, 1600, "Tall Ship — a pencil drawing of a ship with the first watercolour washes, brush in hand")],
    note: {
      en: "A tall ship in pencil, with the first washes of watercolour just going in.",
      zh: "铅笔勾出的帆船，第一层水彩刚刚铺上。",
    },
  },
  {
    id: "A-022",
    updated: "2026-11-11",
    visibility: "public",
    status: "draft",
    slug: "panda-on-a-branch",
    title: "Panda on a Branch",
    titleZh: "树枝上的熊猫",
    year: "2024",
    medium: { en: "White chalk on black paper", zh: "黑卡纸，白色粉笔" },
    kind: "pencil",
    images: [img("/artworks/a-022-panda.jpg", 1600, 1350, "Panda on a Branch — white chalk outline on black paper")],
    note: {
      en: "A panda resting on a branch, drawn in white on black — so far only the first layer.",
      zh: "趴在树枝上的熊猫，黑纸白笔——目前只有第一层。",
    },
  },
  {
    id: "A-023",
    updated: "2026-11-11",
    visibility: "public",
    status: "draft",
    slug: "ships-quick-sketch",
    title: "Ships, a Quick Sketch",
    titleZh: "帆船速写",
    year: "2025",
    medium: { en: "Ink", zh: "墨水" },
    kind: "ink",
    images: [img("/artworks/a-023-ships-sketch.jpg", 1133, 1600, "Ships — a quick ink sketch of galleons and small sails")],
    note: {
      en: "Galleons and small sails, drawn quickly in ink.",
      zh: "用墨水快速画下的大帆船和小帆。",
    },
  },
  {
    id: "A-024",
    updated: "2026-11-11",
    visibility: "public",
    status: "draft",
    slug: "auditorium-first-sketch",
    title: "Palais Garnier Auditorium, First Sketch",
    titleZh: "巴黎歌剧院观众厅草稿",
    year: "2025",
    medium: { en: "Pencil", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-024-auditorium-sketch.jpg", 1600, 1200, "Palais Garnier auditorium — a loose pencil sketch of boxes, balconies and ceiling")],
    note: {
      en: "Inside the Paris Opera — boxes, balconies and the ceiling — still as fast construction lines.",
      zh: "巴黎歌剧院内部——包厢、楼座和天顶——都还是快速的结构线。",
    },
  },
  {
    id: "A-025",
    updated: "2026-11-11",
    visibility: "public",
    status: "draft",
    slug: "staircase-first-sketch",
    title: "Staircase, First Sketch",
    titleZh: "大阶梯草稿",
    year: "2025",
    medium: { en: "Pencil", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-025-staircase-sketch.jpg", 1094, 1600, "The first pencil sketch for The Grand Staircase, Palais Garnier")],
    note: {
      en: "The first pencil sketch for The Grand Staircase, Palais Garnier (A-016).",
      zh: "《巴黎歌剧院·大阶梯》（A-016）的第一张铅笔草稿。",
    },
  },
];

/** Every work also has a plate of its own: /artwork/the-night-and-time … */
export function artHref(slug: string) {
  return `/artwork/${slug}`;
}

const ROMAN_TABLE: [number, string][] = [
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

/** Plate numbers in the old style: 1 → I, 24 → XXIV. */
export function roman(n: number) {
  let out = "";
  for (const [v, s] of ROMAN_TABLE) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}
