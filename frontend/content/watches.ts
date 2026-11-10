import type { ArchiveMeta, Bi } from "./types";

/* ------------------------------------------------------------------ */
/*  02 — The Collection (personal watches only)                        */
/*                                                                     */
/*  To add a watch: copy one entry, give it the next number (W-011),  */
/*  put a 4:5 photo (e.g. 1280 × 1600) in public/collection/ and fill  */
/*  in the fields. Leave `reference` empty ("") if none is known.     */
/* ------------------------------------------------------------------ */

export const collectionIntro = {
  title: { en: "The Collection", zh: "个人收藏" } as Bi,
  lede: {
    en: "The watches I own and wear — from an independent tourbillon to a Soviet calendar and a pocket watch signed in Denmark. Each has an archive number, its reference where one exists, and a short note on why it stays.",
    zh: "我拥有并佩戴的腕表——从独立制表的陀飞轮，到苏联时代的日历表，再到一块在丹麦署名的怀表。每块表都有档案编号、能确认的 reference，以及它留在收藏里的理由。",
  } as Bi,
  footnote: {
    en: "References are taken from dials, casebacks and papers. Dates marked “est.” are estimates for vintage pieces.",
    zh: "Reference 来自表盘、表背和保卡。标注“约”的年代为古董表的估计年代。",
  } as Bi,
};

export type CollectionWatch = ArchiveMeta & {
  brand: string;
  model: Bi;
  reference: string;
  era: Bi;
  movement: Bi;
  case: Bi;
  note: Bi;
  image: { src: string; width: number; height: number; alt: string; position?: string };
};

export const collection: CollectionWatch[] = [
  {
    id: "W-001",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Pole Epoch",
    model: { en: "001 · Flying Tourbillon", zh: "极辰 001 · 飞行陀飞轮" },
    reference: "001",
    era: { en: "2025", zh: "2025 年" },
    movement: { en: "Hand-wound flying tourbillon", zh: "手动上链 · 飞行陀飞轮" },
    case: { en: "Steel, 39.5 mm", zh: "精钢，39.5 毫米" },
    note: {
      en: "The heart of the collection. An independent Chinese tourbillon from Atelier Jichen, with off-centre hours, small seconds and a salmon dial — the open cage at eight o’clock is what I study most closely.",
      zh: "这份收藏的核心。来自 Atelier Jichen 的中国独立制表陀飞轮：偏心时分、小秒针和鲑鱼色表盘——八点位置敞开的陀飞轮框架，是我看得最仔细的地方。",
    },
    image: {
      src: "/collection/w-001-pole-epoch.jpg",
      width: 1280,
      height: 1600,
      alt: "Pole Epoch 001 flying tourbillon with a salmon dial, on the wrist",
    },
  },
  {
    id: "W-002",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Tudor",
    model: { en: "Black Bay Fifty-Eight 925", zh: "碧湾 Fifty-Eight 925" },
    reference: "M79010SG",
    era: { en: "Modern", zh: "现代" },
    movement: { en: "Automatic · Calibre MT5400, COSC", zh: "自动上链 · MT5400 机芯，COSC 认证" },
    case: { en: "925 silver, 39 mm", zh: "925 纯银，39 毫米" },
    note: {
      en: "A divers’ watch named after 1958, made in satin-finished 925 silver with a taupe dial and bezel. A tool watch in a precious metal — the contradiction is the charm.",
      zh: "一块以 1958 年命名的潜水表，采用拉丝 925 纯银表壳，配灰褐色表盘与表圈。用贵金属做工具表——这种矛盾正是它的魅力。",
    },
    image: {
      src: "/collection/w-002-tudor-bb58-925.jpg",
      width: 1280,
      height: 1600,
      alt: "Tudor Black Bay Fifty-Eight 925 on a leather strap, worn with a white linen shirt",
    },
  },
  {
    id: "W-003",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Cuervo y Sobrinos",
    model: { en: "Prominente", zh: "Prominente" },
    reference: "",
    era: { en: "Modern", zh: "现代" },
    movement: { en: "Swiss made · small seconds and date", zh: "瑞士制造 · 小秒针与日期" },
    case: { en: "Steel, rectangular", zh: "精钢，长方形表壳" },
    note: {
      en: "The Havana house’s most famous shape, first introduced in 1938. Overlapping sub-dials in clous de Paris guilloché, and a date window signed “Habana”.",
      zh: "这家哈瓦那品牌最著名的表型，最早出现于 1938 年。相互叠合的副表盘饰以巴黎钉纹，日期窗下方写着 “Habana”。",
    },
    image: {
      src: "/collection/w-003-cuervo-prominente.jpg",
      width: 1280,
      height: 1600,
      alt: "Cuervo y Sobrinos Prominente rectangular watch on a brown alligator strap",
    },
  },
  {
    id: "W-004",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Steeldive",
    model: { en: "SD1970, ice blue", zh: "SD1970 冰蓝" },
    reference: "SD1970",
    era: { en: "Modern", zh: "现代" },
    movement: { en: "Automatic · 200 m", zh: "自动上链 · 200 米防水" },
    case: { en: "Steel, turtle case", zh: "精钢，海龟形表壳" },
    note: {
      en: "An affordable homage to the 1970 Seiko 6105 “Captain Willard”. I bought it to understand the turtle-shaped case on the wrist before ever owning the original.",
      zh: "致敬 1970 年精工 6105 “Captain Willard” 的平价腕表。我买它，是为了在拥有原版之前，先在手腕上理解这种海龟形表壳。",
    },
    image: {
      src: "/collection/w-004-steeldive-sd1970.jpg",
      width: 1280,
      height: 1600,
      alt: "Steeldive SD1970 diver with an ice-blue dial on a steel bracelet",
    },
  },
  {
    id: "W-005",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Raketa",
    model: { en: "Perpetual Calendar", zh: "万年历" },
    reference: "2628.H",
    era: { en: "After 1991 (est.)", zh: "约 1991 年后" },
    movement: { en: "Hand-wound · Calibre 2628.H", zh: "手动上链 · 2628.H 机芯" },
    case: { en: "Steel-tone, round", zh: "钢色圆形表壳" },
    note: {
      en: "From the Petrodvorets factory, with a burgundy sunburst dial. The “perpetual calendar” is printed: you line up the year with the month to read the day — a clever, low-tech answer to a complicated problem.",
      zh: "来自彼得宫钟表厂，酒红色太阳纹表盘。所谓“万年历”是印在表盘上的：把年份和月份对齐，就能读出星期——用简单的方法解决复杂的问题。",
    },
    image: {
      src: "/collection/w-005-raketa-calendar.jpg",
      width: 1280,
      height: 1600,
      alt: "Raketa perpetual calendar watch with a burgundy dial on burgundy velvet",
    },
  },
  {
    id: "W-006",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Antima",
    model: { en: "Military-style wristwatch", zh: "军表风格腕表" },
    reference: "",
    era: { en: "Mid-20th century (est.)", zh: "约 20 世纪中期" },
    movement: { en: "Hand-wound · Incabloc", zh: "手动上链 · Incabloc 防震" },
    case: { en: "Chrome-plated", zh: "镀铬表壳" },
    note: {
      en: "My “little trench watch” from the market: black dial, Arabic numerals, small seconds, now on a burgundy-and-cream strap. The scratches are part of its record.",
      zh: "我在市场上淘到的“小战壕表”：黑色表盘、阿拉伯数字、小秒针，现在配一条酒红米白条纹表带。表面的划痕也是它历史的一部分。",
    },
    image: {
      src: "/collection/w-006-antima.jpg",
      width: 1280,
      height: 1600,
      alt: "Antima black-dial vintage watch on a striped strap, held against a black background",
    },
  },
  {
    id: "W-007",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Favre-Leuba",
    model: { en: "Genève, 17 jewels", zh: "Genève，17 钻" },
    reference: "",
    era: { en: "1960s (est.)", zh: "约 1960 年代" },
    movement: { en: "Hand-wound, 17 jewels", zh: "手动上链，17 钻" },
    case: { en: "Steel", zh: "精钢" },
    note: {
      en: "A clean silver dial with long baton indices, from one of the oldest names in Swiss watchmaking. Thin, simple and honest.",
      zh: "干净的银色表盘配长条刻度，来自瑞士制表业最古老的名字之一。轻薄、简单、诚实。",
    },
    image: {
      src: "/collection/w-007-favre-leuba.jpg",
      width: 1280,
      height: 1600,
      alt: "Favre-Leuba Genève watch with a silver dial on a grey suede strap",
    },
  },
  {
    id: "W-008",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Dolmen",
    model: { en: "Automatic, 21 jewels", zh: "自动上链，21 钻" },
    reference: "",
    era: { en: "1960s (est.)", zh: "约 1960 年代" },
    movement: { en: "Automatic · Incabloc · date", zh: "自动上链 · Incabloc · 日期" },
    case: { en: "Gold-tone", zh: "金色表壳" },
    note: {
      en: "A gold-tone automatic with a sunburst dial and date — a forgotten Swiss name that shows how good an ordinary watch from the 1960s could be. Left in the photo.",
      zh: "金色自动表，太阳纹表盘带日期——一个被遗忘的瑞士名字，却说明了 1960 年代一块普通腕表能有多好。照片左侧。",
    },
    image: {
      src: "/collection/w-008-dolmen-sarcar.jpg",
      width: 1280,
      height: 1600,
      alt: "Two gold vintage watches in a hand: a Dolmen automatic on the left and a Sarcar on the right",
    },
  },
  {
    id: "W-009",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Sarcar",
    model: { en: "Genève dress watch", zh: "Genève 正装表" },
    reference: "",
    era: { en: "1960s–70s (est.)", zh: "约 1960–70 年代" },
    movement: { en: "Mechanical", zh: "机械" },
    case: { en: "Gold-tone, mesh bracelet", zh: "金色表壳，米兰编织表链" },
    note: {
      en: "Pure dress watch: an ivory dial, black Roman numerals and a gold mesh bracelet. Right in the photo.",
      zh: "纯粹的正装表：象牙白表盘、黑色罗马数字和金色编织表链。照片右侧。",
    },
    image: {
      src: "/collection/w-008-dolmen-sarcar.jpg",
      width: 1280,
      height: 1600,
      alt: "Two gold vintage watches in a hand: a Dolmen automatic on the left and a Sarcar on the right",
    },
  },
  {
    id: "W-010",
    updated: "2026-11-10",
    visibility: "public",
    brand: "Nicolai Schultz",
    model: { en: "Pocket watch, Helsingør", zh: "怀表，赫尔辛格" },
    reference: "",
    era: { en: "Early 20th century (est.)", zh: "约 20 世纪初" },
    movement: { en: "Hand-wound, gilt movement", zh: "手动上链，镀金机芯" },
    case: { en: "Silver, hinged cover", zh: "银壳，铰链后盖" },
    note: {
      en: "Signed for a watchmaker in Helsingør, Denmark. A white enamel dial with small seconds, and under the hinged cover a gilt movement with polished steel wheels.",
      zh: "表盘署名为丹麦赫尔辛格的一位钟表匠。白色珐琅表盘配小秒针，打开铰链后盖，是一枚镀金机芯和抛光钢轮。",
    },
    image: {
      src: "/collection/w-010-nicolai-schultz.jpg",
      width: 1280,
      height: 1600,
      alt: "Nicolai Schultz Helsingør pocket watch with a white enamel dial on red velvet",
    },
  },
];
