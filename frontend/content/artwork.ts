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
  /** What is on the sheet — described from the work itself. */
  look?: Bi;
  /** How it is drawn or painted — what the marks show. */
  technique?: Bi;
  /** Small things worth a closer look. */
  details?: Bi[];
  /** How the plate page hangs the work (chosen automatically when missing). */
  hang?: PlateHang;
  /** Where the magnifying loupe looks on a diptych plate, e.g. "35% 40%". */
  detailPos?: string;
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
  {
    id: "A-026",
    updated: "2026-11-13",
    visibility: "public",
    slug: "bird-on-a-branch",
    title: "Bird on a Branch",
    titleZh: "枝上的鸟",
    year: "2024",
    medium: { en: "Graphite and white on toned paper", zh: "铅笔与白色提亮，色纸" },
    kind: "pencil",
    images: [img("/artworks/a-026-bird-on-a-branch.jpg", 1030, 1600, "Bird on a Branch — a small bird hanging upside down from a thin stem, in graphite on tan paper")],
    note: {
      en: "A small bird hanging upside down from a thin stem, in graphite on toned paper.",
      zh: "一只倒挂在细枝上的小鸟，铅笔画在色纸上。",
    },
    look: {
      en: "A small bird hangs head-down from a thin, upright stem, its beak pointing at the floor and its eye turned towards us. Everything else on the tan sheet is left empty, so the bird and the stem carry the whole page.",
      zh: "一只小鸟头朝下挂在一根细细的竖枝上，喙指向地面，眼睛朝着我们。棕色纸面上其余的地方全部留白，整张纸只靠鸟和枝撑起来。",
    },
    technique: {
      en: "Soft graphite follows the direction of the feathers in short, overlapping strokes. A few touches of white lift the beak, the eye-ring and the edge of the wing off the toned paper, which does the work of the middle tone.",
      zh: "软铅顺着羽毛的方向，用短而重叠的笔触画出来。几处白色提亮了喙、眼圈和翅膀的边缘；色纸本身就是中间调。",
    },
    details: [
      { en: "The feet locked around the stem — the whole weight hangs from one small grip.", zh: "缠在枝上的脚——全身的重量都挂在这一小处抓握上。" },
      { en: "The single highlight on the tip of the beak.", zh: "喙尖上唯一的一点高光。" },
    ],
  },
  {
    id: "A-027",
    updated: "2026-11-13",
    visibility: "public",
    slug: "paper-boat",
    title: "Paper Boat",
    titleZh: "纸船",
    year: "2024",
    medium: { en: "Graphite", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-027-paper-boat.jpg", 1600, 1138, "Paper Boat — a folded paper boat drawn in graphite, resting on a single line")],
    note: {
      en: "A folded paper boat, drawn in tone rather than outline.",
      zh: "一只折纸船，用明暗而不是轮廓画出来。",
    },
    look: {
      en: "A folded paper boat seen from the side, resting on one long line that crosses the whole sheet. Nothing else is drawn — no water, no background — so the fold itself becomes the subject.",
      zh: "一只从侧面看的折纸船，停在一条横贯整张纸的长线上。除此之外什么也没画——没有水，也没有背景——折痕本身成了主题。",
    },
    technique: {
      en: "Every face of the fold gets its own value: light on the outer sails, a darker grey inside the hull, the deepest tone where two planes meet. The shape reads almost entirely from these changes of tone, with very little outline.",
      zh: "折纸的每一个面都有自己的明度：外侧的帆最亮，船身内部更灰，两个面相交的地方最深。形体几乎完全靠这些明暗变化读出来，轮廓线用得很少。",
    },
    details: [
      { en: "The central sail, where three planes meet in a single point.", zh: "中间那面帆——三个面在一个点上相交。" },
    ],
  },
  {
    id: "A-028",
    updated: "2026-11-13",
    visibility: "public",
    slug: "penguin",
    title: "Penguin",
    titleZh: "小企鹅",
    year: "2024",
    medium: { en: "Coloured pencil and watercolour", zh: "彩铅与水彩" },
    kind: "colour",
    images: [img("/artworks/a-028-penguin.jpg", 1516, 1600, "Penguin — a round, toy-like penguin in orange and yellow against a deep blue watercolour wash")],
    note: {
      en: "A round, toy-like penguin against a deep blue wash.",
      zh: "一只圆滚滚、像玩具一样的企鹅，背景是深蓝色的水彩。",
    },
    look: {
      en: "A round, toy-like penguin with an orange body, a cream face, a yellow belly and two small red feet, standing in front of a deep blue background that breaks up into white towards the edges of the paper.",
      zh: "一只圆滚滚、像玩具一样的企鹅：橙色的身体，奶白色的脸，黄色的肚子和两只小红脚，站在深蓝色的背景前；蓝色到了纸边就碎成了白色。",
    },
    technique: {
      en: "Two speeds on one sheet. The blue is loose watercolour, left to bloom and fade; the penguin is built up slowly in coloured pencil, with the strokes still visible on the cheeks and wings.",
      zh: "一张纸上的两种速度：蓝色是松动的水彩，任它晕开、淡出；企鹅则用彩铅慢慢叠出来，脸颊和翅膀上还看得见笔触。",
    },
    details: [
      { en: "The two black eyes, each with one small spot of white left on purpose.", zh: "两只黑眼睛，各留了一小点白。" },
      { en: "The pink nose — the warmest colour on the sheet.", zh: "粉红色的鼻子——整张画上最暖的颜色。" },
    ],
  },
  {
    id: "A-029",
    updated: "2026-11-13",
    visibility: "public",
    slug: "squirrel-on-a-birch",
    title: "Squirrel on a Birch",
    titleZh: "白桦上的松鼠",
    year: "2024",
    medium: { en: "Soft pastel", zh: "色粉" },
    kind: "colour",
    images: [img("/artworks/a-029-squirrel.jpg", 1186, 1600, "Squirrel on a Birch — a squirrel climbing head-first down a pale birch trunk, against a soft green background")],
    note: {
      en: "A squirrel coming head-first down a birch trunk, against soft greens.",
      zh: "一只头朝下从白桦树干上爬下来的松鼠，背景是柔和的绿色。",
    },
    look: {
      en: "A squirrel comes down a pale birch trunk head-first, its bushy black tail curled above it and its reddish body pressed against the bark. Behind it the forest is only blurred patches of green, like a background out of focus.",
      zh: "一只松鼠头朝下从苍白的白桦树干上下来，蓬松的黑尾巴卷在上方，红褐色的身体贴着树皮。身后的树林只是一团团模糊的绿，像没有对焦的背景。",
    },
    technique: {
      en: "The background is rubbed and blended so it stays soft; the squirrel and the bark are drawn with short, sharp strokes of pastel on top, so they come forward. The grain of the paper shows through the light areas of the trunk.",
      zh: "背景是擦揉、混合出来的，所以一直保持柔和；松鼠和树皮则用短而利落的色粉笔触画在上面，于是向前跳出来。树干亮部还能透出纸的纹理。",
    },
    details: [
      { en: "The small front paws gripping the bark.", zh: "抓着树皮的两只小前爪。" },
      { en: "The dark marks on the birch, drawn one by one.", zh: "白桦上的深色斑纹，一笔一笔画出来的。" },
    ],
  },
  {
    id: "A-030",
    updated: "2026-11-13",
    visibility: "public",
    slug: "galloping-horse",
    title: "Galloping Horse",
    titleZh: "奔马",
    year: "2024",
    medium: { en: "Graphite", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-030-galloping-horse.jpg", 1600, 1154, "Galloping Horse — a dark horse at full gallop through long grass, in graphite")],
    note: {
      en: "A dark horse at full gallop through long grass.",
      zh: "一匹在长草里全速奔跑的深色马。",
    },
    look: {
      en: "A dark horse runs at full gallop across a field of long grass, mane and tail streaming back, two hooves off the ground. A soft mass of trees closes the right side; the sky is a pale, misty grey.",
      zh: "一匹深色的马在长草地上全速奔跑，鬃毛和尾巴向后飘，两只蹄子离地。右边是一团柔和的树丛，天空是淡淡的、雾一样的灰。",
    },
    technique: {
      en: "Three kinds of mark. Smudged graphite for the misty background; blended tone with sharp, lifted highlights for the muscles of the horse; and quick vertical strokes, almost scratches, for the grass.",
      zh: "三种笔触：雾气般的背景用擦抹的铅笔；马的肌肉用混合的明暗加上擦出来的锐利高光；草则用快速的竖向短线，几乎像是刮出来的。",
    },
    details: [
      { en: "The light running along the neck and the shoulder.", zh: "沿着脖子和肩膀的一道光。" },
      { en: "The tail, drawn as movement more than as hair.", zh: "尾巴——画的是运动，而不是毛发。" },
    ],
  },
  {
    id: "A-031",
    updated: "2026-11-13",
    visibility: "public",
    slug: "the-red-cart",
    title: "The Red Cart",
    titleZh: "红色小车",
    year: "2025",
    medium: { en: "Pencil and watercolour", zh: "铅笔与水彩" },
    kind: "colour",
    images: [img("/artworks/a-031-red-cart.jpg", 1511, 1600, "The Red Cart — a cartoon cat lounging on a long red cart on four wheels, in pencil and watercolour")],
    note: {
      en: "A cartoon cat lounging on a long red cart — the cart in colour, the cat still in pencil.",
      zh: "一只卡通猫躺在一辆长长的红色小车上——小车上了色，猫还是铅笔线。",
    },
    look: {
      en: "A cartoon cat stretches out on a long red cart with four black wheels, one paw on the handle, eyes half closed behind a pair of glasses. The cart is painted; the cat is still in pencil line.",
      zh: "一只卡通猫舒展地躺在一辆长长的红色小车上，四个黑轮子，一只爪子搭在把手上，眼镜后面的眼睛半闭着。小车已经上色，猫还停留在铅笔线稿。",
    },
    technique: {
      en: "The watercolour is kept to a single colour — the red of the cart — with black for the wheels, so the light pencil drawing of the cat stays on top and the eye goes straight to the cart.",
      zh: "水彩只用了一种颜色——小车的红——再加上轮子的黑，于是猫的铅笔线稿轻轻浮在上面，视线会直接落到小车上。",
    },
    details: [
      { en: "The wheels, each with a small highlight left in white.", zh: "每个轮子上都留了一点白色高光。" },
    ],
  },
  {
    id: "A-032",
    updated: "2026-11-13",
    visibility: "public",
    slug: "a-cats-day",
    title: "A Cat’s Day",
    titleZh: "一只猫的一天",
    year: "2025",
    medium: { en: "Watercolour and pencil", zh: "水彩与铅笔" },
    kind: "colour",
    images: [img("/artworks/a-032-a-cats-day.jpg", 1600, 1290, "A Cat’s Day — four scenes of the same cartoon cat on a yellow ground: a double bass, a red cart, a pink cape and a frying pan")],
    note: {
      en: "One sheet, four scenes of the same cartoon cat, on a bright yellow ground.",
      zh: "一张纸，同一只卡通猫的四个场景，铺在明亮的黄色上。",
    },
    look: {
      en: "The same grey cartoon cat appears four times on one yellow sheet: playing a double bass, riding the red cart, flying under a pink cape, and — in a chef’s hat — stirring a frying pan over a chequered floor.",
      zh: "同一只灰色的卡通猫在一张黄色的纸上出现了四次：拉低音提琴，骑着红色小车，披着粉色披风飞，还有戴着厨师帽、在格子地面上搅一口平底锅。",
    },
    technique: {
      en: "A flat yellow wash holds the separate scenes together as one page. Each figure is drawn in pencil, then tinted with greys and a few reds, and dated in small handwriting beside it.",
      zh: "一层平涂的黄色把分开的场景统一成一页。每个形象先用铅笔画好，再染上灰色和几处红色，旁边用小字写了日期。",
    },
    details: [
      { en: "The red cart from The Red Cart (A-031) appears again here.", zh: "《红色小车》（A-031）里的那辆小车，在这里又出现了。" },
      { en: "The red-and-white chequered floor — the only pattern on the sheet.", zh: "红白格子的地面——整张纸上唯一的图案。" },
    ],
  },
  {
    id: "A-033",
    updated: "2026-11-13",
    visibility: "public",
    slug: "balloon-dog",
    title: "Balloon Dog",
    titleZh: "气球狗",
    year: "2025",
    medium: { en: "Black and grey on toned paper", zh: "色纸上的黑与灰" },
    kind: "ink",
    images: [img("/artworks/a-033-balloon-dog.jpg", 1201, 1600, "Balloon Dog — a mirror-polished balloon dog in black, grey and white on a beige sheet")],
    note: {
      en: "A mirror-polished balloon dog, drawn as reflections.",
      zh: "一只镜面抛光的气球狗，用反光画出来。",
    },
    look: {
      en: "A balloon dog made of mirror-polished metal stands in profile in the middle of an otherwise empty sheet — snout, ears, legs and tail all twisted from the same long balloon.",
      zh: "一只镜面抛光的金属气球狗以侧面站在空白纸面的正中——鼻子、耳朵、腿和尾巴，全都由同一根长气球拧出来。",
    },
    technique: {
      en: "Chrome has no colour of its own, so it is drawn only as reflection: hard black shapes, bright untouched paper for the highlights, and soft greys where each curve turns away from the light.",
      zh: "镜面金属自己没有颜色，所以只能画它的反射：坚硬的黑色形状，留白的纸面作高光，每一段曲面转离光线的地方用柔和的灰。",
    },
    details: [
      { en: "The narrow white line running along the top of every balloon.", zh: "每一节气球顶部都有一道细细的白线。" },
    ],
  },
  {
    id: "A-034",
    updated: "2026-11-13",
    visibility: "public",
    slug: "sleeping-cat-and-red-ball",
    title: "Sleeping Cat and Red Ball",
    titleZh: "睡猫与红球",
    year: "2025",
    medium: { en: "Watercolour", zh: "水彩" },
    kind: "colour",
    images: [img("/artworks/a-034-sleeping-cat.jpg", 1252, 1600, "Sleeping Cat and Red Ball — a grey and white cat curled up on an orange-brown ground beside a red ball")],
    note: {
      en: "A cat curled up asleep, a red ball beside it.",
      zh: "一只蜷着睡觉的猫，旁边一只红球。",
    },
    look: {
      en: "A grey-and-white cat lies curled up asleep on a warm orange-brown ground, seen from above. A red ball sits just below it, the only strong colour in the picture.",
      zh: "一只灰白相间的猫蜷着睡在温暖的橙褐色底子上，从上往下看。它下方有一只红球，是整幅画里唯一浓烈的颜色。",
    },
    technique: {
      en: "Watercolour on rough paper: the grain shows through every wash, and the colours are allowed to run into each other at the edges, so the cat seems to sink into the ground around it.",
      zh: "粗纹纸上的水彩：每一层颜色下面都透出纸纹，颜色在边缘相互渗开，于是猫好像陷进了周围的底色里。",
    },
    details: [
      { en: "The tucked-in paws at the front of the curl.", zh: "蜷起来时收在前面的爪子。" },
    ],
  },
  {
    id: "A-035",
    updated: "2026-11-13",
    visibility: "public",
    slug: "staircase-from-below",
    title: "Staircase, from Below",
    titleZh: "仰望阶梯",
    year: "2025",
    medium: { en: "Ink wash", zh: "水墨淡彩" },
    kind: "ink",
    images: [img("/artworks/a-035-staircase-from-below.jpg", 1265, 1600, "Staircase, from Below — a steep view up a grand staircase with arches, in grey ink wash")],
    note: {
      en: "A grand staircase seen from below, in layers of grey wash.",
      zh: "从下往上看的一座大阶梯，用一层层灰色淡墨画成。",
    },
    look: {
      en: "A staircase seen from below at a steep angle: flights and balustrades cross the sheet diagonally, and a row of arches tilts up towards a curved opening at the top.",
      zh: "从下方以很陡的角度看一座阶梯：梯段和栏杆斜着穿过整张纸，一排拱门向上倾斜，通向顶端一个弧形的开口。",
    },
    technique: {
      en: "Layered grey washes do the work of light and shadow — the darkest tones sit under the flights, the lightest on the arches — over perspective lines that pull everything towards the top of the page.",
      zh: "一层层灰色的淡墨承担了光和影：最深的调子在梯段下面，最浅的在拱门上；底下是把一切拉向画面顶端的透视线。",
    },
    details: [
      { en: "The balusters, each one a single stroke of the brush.", zh: "栏杆柱，每一根都是一笔。" },
    ],
  },
  {
    id: "A-036",
    updated: "2026-11-13",
    visibility: "public",
    status: "draft",
    slug: "baptism-study",
    title: "The Baptism, a Study",
    titleZh: "洗礼（习作）",
    year: "2025",
    medium: { en: "Pencil", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-036-baptism-study.jpg", 1248, 1565, "The Baptism, a Study — a pencil study of a haloed figure pouring water over another figure’s head, with a bird in a circle above")],
    note: {
      en: "A crowded figure scene in pencil: water poured over a head, a halo, a bird above.",
      zh: "一幅人物众多的铅笔习作：水从头顶浇下，一圈光环，上方一只鸟。",
    },
    look: {
      en: "A tall figure with a halo holds a bowl above the head of a smaller figure, as if pouring water over him. Other figures crowd in from the left, and at the top a small bird sits inside a circle of light.",
      zh: "一个头顶光环的高大人物举着一只碗，停在另一个人头顶上方，像是要往下浇水。左边挤进来更多的人，画面上方一只小鸟停在一圈光里。",
    },
    technique: {
      en: "Loose, searching lines — some figures redrawn two or three times — with tone pushed only into the faces, the bowl and the folds of the robes. The rest is left as construction.",
      zh: "松散、试探性的线条——有些人物重画了两三遍——只在脸、碗和衣褶里加重了明暗，其余部分保留为结构线。",
    },
    details: [
      { en: "The dark bowl — the heaviest tone on the sheet.", zh: "那只深色的碗——整张纸上最重的调子。" },
    ],
  },
  {
    id: "A-037",
    updated: "2026-11-13",
    visibility: "public",
    status: "draft",
    slug: "arcade-in-perspective",
    title: "Arcade in One-Point Perspective",
    titleZh: "单点透视的拱廊",
    year: "2025",
    medium: { en: "Pencil", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-037-arcade-perspective.jpg", 1088, 1600, "Arcade in One-Point Perspective — a long covered arcade with shopfronts and a glazed roof, all lines running to one point")],
    note: {
      en: "A long covered arcade in one-point perspective, construction lines still showing.",
      zh: "一条用单点透视画的长拱廊，结构线都还在。",
    },
    look: {
      en: "A long covered arcade: shopfronts down both sides, a glazed vault overhead and a tall window at the far end. Every line in the drawing runs to a single point under that window.",
      zh: "一条长长的有顶拱廊：两边是店面，头顶是玻璃拱顶，尽头是一扇高窗。画里的每一条线都汇向那扇窗下的同一个点。",
    },
    technique: {
      en: "An exercise in construction: the vanishing point is fixed first, the floor is mapped out as a grid, and only then do the windows, signs and arches go in. The guide lines are left visible.",
      zh: "一次关于结构的练习：先定好消失点，把地面画成网格，然后才加上窗户、招牌和拱。辅助线都保留了下来。",
    },
  },
  {
    id: "A-038",
    updated: "2026-11-13",
    visibility: "public",
    status: "draft",
    slug: "in-the-studio",
    title: "In the Studio",
    titleZh: "画室里",
    year: "2025",
    medium: { en: "Pencil", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-038-in-the-studio.jpg", 1525, 1295, "In the Studio — two men seated by a tall curtained window, beside an easel with a plaster bust, in pencil")],
    note: {
      en: "Two men talking by a tall window, beside an easel and a plaster bust.",
      zh: "两个人坐在高窗边谈话，旁边是画架和一尊石膏像。",
    },
    look: {
      en: "Two men sit close together, talking, beside a tall window hung with heavy curtains. On the left an easel holds a plaster bust; a lamp hangs from the ceiling and a jug stands on the floor.",
      zh: "两个男人挨着坐在一起谈话，身旁是挂着厚窗帘的高窗。左边的画架上放着一尊石膏像，天花板上垂下一盏灯，地上立着一只壶。",
    },
    technique: {
      en: "A quick tonal sketch: diagonal hatching blocks in the curtains and the dark corners, and the two figures are found with a few searching lines over them.",
      zh: "一张快速的明暗速写：斜向排线铺出窗帘和暗角，两个人物则用几条试探的线在上面找出来。",
    },
    details: [
      { en: "The plaster bust on the easel, watching the two of them.", zh: "画架上那尊石膏像，像在看着他们两个。" },
    ],
  },
  {
    id: "A-039",
    updated: "2026-11-13",
    visibility: "public",
    slug: "the-chess-players",
    title: "The Chess Players",
    titleZh: "下棋的人",
    year: "2025",
    medium: { en: "Pen and ink", zh: "钢笔" },
    kind: "ink",
    images: [img("/artworks/a-039-chess-players.jpg", 685, 900, "The Chess Players — two men thinking over a chessboard, drawn in cross-hatched pen")],
    note: {
      en: "Two men over a chessboard, both caught in the middle of thinking.",
      zh: "两个人隔着一张棋盘，都停在思考的那一刻。",
    },
    look: {
      en: "Two men face each other across a chessboard. One leans his head on his hand and looks down at the pieces; the other rests his chin on his fist and looks back at him. Nobody is moving.",
      zh: "两个人隔着一张棋盘相对而坐。一个用手撑着头，低头看着棋子；另一个把下巴搁在拳头上，回头看着他。谁都没有动。",
    },
    technique: {
      en: "Everything is built from cross-hatching: tight nets of lines for the shadows on the jackets and the faces, open paper for the light falling on the board between them.",
      zh: "一切都由交叉排线构成：外套和脸上的阴影是密密的线网，两人之间棋盘上的光则是留白的纸。",
    },
    details: [
      { en: "The two hands — one on a forehead, one under a chin.", zh: "两只手——一只扶着额头，一只托着下巴。" },
    ],
  },
  {
    id: "A-040",
    updated: "2026-11-13",
    visibility: "public",
    slug: "tall-window-and-clock",
    title: "Tall Window and Clock",
    titleZh: "高窗与时钟",
    year: "2025",
    medium: { en: "Pencil", zh: "铅笔" },
    kind: "pencil",
    images: [img("/artworks/a-040-tall-window.jpg", 400, 1245, "Tall Window and Clock — a narrow vertical drawing of arched windows with a clock face above and a desk below")],
    note: {
      en: "A narrow, tall panel: arched windows, a clock face above them, a desk below.",
      zh: "一块又窄又高的画面：拱形的窗，窗上一只钟面，窗下一张书桌。",
    },
    look: {
      en: "A very tall, narrow panel. A clock face with its numerals sits high above two arched windows; through the glass a spire rises in the distance, and in front of the windows a desk holds an open book and a small cup.",
      zh: "一块非常高、非常窄的画面。一只带数字的钟面高高地挂在两扇拱窗之上；透过玻璃，远处升起一座尖塔；窗前的书桌上放着一本打开的书和一只小杯子。",
    },
    technique: {
      en: "The narrow format does the composing: the eye climbs from the desk to the windows to the clock. Fine vertical lines carry the window frames, and the floor is darkened to hold the bottom of the panel.",
      zh: "窄长的画幅本身就在构图：视线从书桌爬到窗户，再爬到钟。细长的竖线撑起窗框，地面压暗，稳住画面的底部。",
    },
    details: [
      { en: "The clock face at the top — numerals set around it one by one.", zh: "顶上的钟面——数字一个一个排在一圈。" },
    ],
  },
  {
    id: "A-041",
    updated: "2026-11-13",
    visibility: "public",
    slug: "barcelona-watercolour-notes",
    title: "Barcelona, Watercolour Notes",
    titleZh: "巴塞罗那水彩速记",
    year: "2026",
    medium: { en: "Watercolour and ink", zh: "水彩与墨线" },
    kind: "colour",
    images: [img("/artworks/a-041-barcelona-notes.jpg", 1600, 1465, "Barcelona, Watercolour Notes — rooftops, towers and a round red-and-green form under a pale sky, with the word Barcelona written in the corner")],
    note: {
      en: "Rooftops and towers in quick ink, washed over with colour, and the city’s name in the corner.",
      zh: "用快速墨线画下的屋顶和塔楼，上面铺了颜色，角落里写着城市的名字。",
    },
    look: {
      en: "Rooftops, towers and a line of hills under a pale sky; in the foreground, a round red-and-green form like a wheel or a bench. In the top corner the word “Barcelona” is written in a looping hand.",
      zh: "淡淡的天空下是屋顶、塔楼和一道山线；前景里有一个红绿相间的圆形，像轮子，也像一张长椅。左上角用花体写着 “Barcelona”。",
    },
    technique: {
      en: "Ink first, fast and loose; then washes of colour dropped in over it without staying inside the lines, so the drawing and the colour each keep their own speed.",
      zh: "先用墨线，又快又松；再把颜色铺上去，不刻意待在线里——线和色各自保留自己的速度。",
    },
  },
];

/** Every work also has a plate of its own: /artwork/the-night-and-time … */
export function artHref(slug: string) {
  return `/artwork/${slug}`;
}

const ROMAN_TABLE: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
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

/* ------------------------------------------------------------------ */
/*  The studio's other rooms: by medium, by year, and the sketchbook.  */
/* ------------------------------------------------------------------ */
export const SERIES = {
  ink: {
    word: "INK.",
    title: { en: "Works in ink", zh: "墨" } as Bi,
    lede: { en: "Everything drawn in ink — pen, brush and wash, from quick notes to finished sheets.", zh: "所有用墨完成的作品——钢笔、毛笔和淡墨，从快速笔记到完成的画。" } as Bi,
  },
  pencil: {
    word: "GRAPHITE.",
    title: { en: "Works in pencil", zh: "铅笔" } as Bi,
    lede: { en: "Graphite and pencil: studies of tone, of perspective and of the figure.", zh: "铅笔与石墨：关于明暗、透视和人物的练习。" } as Bi,
  },
  colour: {
    word: "COLOUR.",
    title: { en: "Works in colour", zh: "色彩" } as Bi,
    lede: { en: "Watercolour, pastel, coloured pencil and paint — the works where colour carries the picture.", zh: "水彩、色粉、彩铅和颜料——由颜色撑起画面的作品。" } as Bi,
  },
} satisfies Record<ArtKind, { word: string; title: Bi; lede: Bi }>;

export const seriesHref = (kind: ArtKind) => `/artwork/series/${kind}`;
export const yearHref = (year: string) => `/artwork/year/${year}`;
export const SKETCHBOOK_HREF = "/artwork/sketchbook";

export const sketchbookIntro = {
  title: { en: "The sketchbook", zh: "速写本" } as Bi,
  lede: { en: "Sketches, studies and works still in progress — the construction lines left in.", zh: "草图、习作和还在进行中的作品——结构线都留着。" } as Bi,
};

/** Every year that has at least one dated work, oldest first. */
export function artYears(list: Artwork[]) {
  return Array.from(new Set(list.map((a) => a.year).filter((y): y is string => Boolean(y)))).sort();
}

/* ------------------------------------------------------------------ */
/*  Six ways to hang a plate, so no two neighbouring plates look alike */
/* ------------------------------------------------------------------ */
export type PlateHang = "gallery" | "spotlight" | "ivory" | "pinned" | "museum" | "diptych";

export function plateHang(a: Artwork, index: number): PlateHang {
  if (a.hang) return a.hang;
  if (a.status === "draft") return (["pinned", "museum", "pinned", "diptych", "spotlight"] as PlateHang[])[index % 5];
  const img = a.images?.[0];
  const r = img ? img.width / img.height : 1;
  if (r < 0.6) return "museum";
  if (r > 1.18) return index % 2 ? "diptych" : "spotlight";
  const cycle: PlateHang[] = ["gallery", "spotlight", "ivory", "museum", "diptych"];
  return cycle[index % cycle.length];
}
