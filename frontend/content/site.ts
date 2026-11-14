import type { Bi } from "./types";

/* ------------------------------------------------------------------ */
/*  Site-wide settings                                                 */
/* ------------------------------------------------------------------ */

export const site = {
  mark: "EXU.",
  name: "Eric Xu",
  title: "EXU. — The Personal Archive",
  edition: { en: "Barcelona · 2026", zh: "巴塞罗那 · 2026" } as Bi,
  description:
    "The personal archive of Eric Xu, Barcelona — a watch collection, a vintage watch business, life experiences and artwork.",
  lastUpdated: "2026-11-11",
  /* Filled in automatically by Vercel at build time; localhost when running on this Mac. */
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
};

export const nav: { href: string; num: string; label: Bi }[] = [
  { href: "/about", num: "01", label: { en: "About", zh: "个人简介" } },
  { href: "/watches", num: "02", label: { en: "Collection", zh: "腕表收藏" } },
  { href: "/experiences", num: "03", label: { en: "Experiences", zh: "人生经历" } },
  { href: "/artwork", num: "04", label: { en: "Artwork", zh: "艺术作品" } },
];

/* Further pages, listed in the menu and the footer (not in the top bar). */
export const navMore: { href: string; num: string; label: Bi }[] = [
  { href: "/projects", num: "05", label: { en: "Projects", zh: "进行中的项目" } },
  { href: "/catalogue", num: "06", label: { en: "Catalogue", zh: "总目录" } },
  { href: "/colophon", num: "—", label: { en: "Colophon", zh: "版本说明" } },
];

/* ------------------------------------------------------------------ */
/*  Home (cover)                                                       */
/* ------------------------------------------------------------------ */

export const home = {
  kicker: { en: "Eric Xu · Personal Archive", zh: "Eric Xu · 个人档案" } as Bi,
  title: { en: "Hello, I’m Eric.", zh: "你好，我是 Eric。" } as Bi,
  roles: { en: "Horology · Entrepreneurship · Art · Flute · History · Debate", zh: "制表 · 创业 · 艺术 · 长笛 · 历史 · 辩论" } as Bi,
  lede: {
    en: "I’m a student at an international school in Barcelona, on the IB pathway. I collect and study mechanical watches, draw and paint, play the flute, read history and enjoy a good debate — and I learned business by trying it. This is where I keep the record.",
    zh: "我在巴塞罗那的一所国际学校读书，走 IB 路线。我收藏、研究机械腕表，画画，吹长笛，读历史，也喜欢一场好的辩论——商业则是我边做边学的。这里是我留存这一切的地方。",
  } as Bi,
  cta: { en: "More about me", zh: "更多关于我" } as Bi,
  interestsKicker: { en: "Selected Interests", zh: "四个板块" } as Bi,
  interestsTitle: { en: "A life beyond the dial.", zh: "表盘之外的生活。" } as Bi,
  sections: [
    {
      href: "/about",
      num: "01",
      title: { en: "About Me", zh: "个人简介" },
      text: {
        en: "Who I am, what I pay attention to, and the values that connect watches, business and art.",
        zh: "我是谁、我关注什么，以及把腕表、商业和艺术连接起来的价值观。",
      },
    },
    {
      href: "/watches",
      num: "02",
      title: { en: "The Collection", zh: "腕表收藏" },
      text: {
        en: "Ten watches I own and wear — an independent tourbillon, a Soviet calendar, a Danish pocket watch — each with its reference.",
        zh: "我拥有并佩戴的十块表——独立制表陀飞轮、苏联日历表、丹麦怀表——每块都附有 reference。",
      },
    },
    {
      href: "/experiences",
      num: "03",
      title: { en: "Life Experiences", zh: "人生经历" },
      text: {
        en: "Projects and turning points: a vintage watch business, debate and MUN, an essay prize and international education.",
        zh: "项目与转折：古董表生意、辩论与模拟联合国、论文奖项，以及国际教育。",
      },
    },
    {
      href: "/artwork",
      num: "04",
      title: { en: "Artwork & Creativity", zh: "艺术作品" },
      text: {
        en: "Paintings, drawings and The Night and Time — a work about a watch, a gift and the speed of modern life.",
        zh: "绘画、素描，以及《The Night and Time》——一件关于腕表、礼物与现代生活节奏的作品。",
      },
    },
    {
      href: "/projects",
      num: "05",
      title: { en: "Ongoing Projects", zh: "进行中的项目" },
      text: {
        en: "Ideas still in development: systems, straps, a watch of my own design — and this archive itself.",
        zh: "仍在发展中的想法：系统、表带、自己设计的腕表——以及这个档案本身。",
      },
    },
    {
      href: "/catalogue",
      num: "06",
      title: { en: "The Catalogue", zh: "总目录" },
      text: {
        en: "Every entry in the archive on one page, numbered like an old collection catalogue.",
        zh: "档案里的每一个条目都在这一页，像老式藏品目录一样编号。",
      },
    },
  ] as { href: string; num: string; title: Bi; text: Bi }[],
  closing: {
    en: "Watches taught me to notice small mechanisms and slow rituals. Everything here — the collection, the projects, the drawings — grew out of that. The archive keeps growing with the work.",
    zh: "腕表教会我留意细小的机构和缓慢的仪式。这里的一切——收藏、项目、画作——都由此而来。这个档案会随着作品不断更新。",
  } as Bi,
};

/* ------------------------------------------------------------------ */
/*  01 — About                                                         */
/* ------------------------------------------------------------------ */

export const about = {
  title: { en: "About Me", zh: "个人简介" } as Bi,
  intro: [
    {
      en: "I am a student based in Barcelona, with a strong interest in mechanical watchmaking, business, art and design.",
      zh: "我是一名生活在巴塞罗那的学生，对机械制表、商业、艺术和设计有浓厚的兴趣。",
    },
    {
      en: "My interests extend beyond the objects themselves. I enjoy exploring the history, craftsmanship and ideas behind mechanical watches, while also building practical experience in the vintage watch market and small-scale business operations.",
      zh: "我的兴趣不只停留在物件本身。我喜欢研究机械腕表背后的历史、工艺和理念，同时也在二手腕表市场和小规模商业经营中积累实际经验。",
    },
    {
      en: "I am particularly interested in the relationship between traditional craftsmanship and modern innovation. Outside of horology, I enjoy creative projects, debate, music and exploring new ideas.",
      zh: "我尤其关注传统工艺与现代创新之间的关系。在制表之外，我也喜欢艺术创作、辩论、音乐，以及探索新的想法。",
    },
    {
      en: "This website is a personal archive of my interests, experiences and creative work — documenting the things I value and the journey behind them.",
      zh: "这个网站是我的个人档案，记录我的兴趣、经历和创作，也记录我所珍视的事物以及它们背后的过程。",
    },
  ] as Bi[],
  card: [
    { label: { en: "Name", zh: "姓名" }, value: { en: "Eric Xu", zh: "Eric Xu" } },
    { label: { en: "Based in", zh: "所在地" }, value: { en: "Barcelona, Spain", zh: "西班牙 · 巴塞罗那" } },
    {
      label: { en: "Education", zh: "教育" },
      value: { en: "International school · IB pathway", zh: "国际学校 · IB 课程体系" },
    },
    {
      label: { en: "Languages", zh: "语言" },
      value: { en: "English · Chinese · Spanish", zh: "英语 · 中文 · 西班牙语" },
    },
    {
      label: { en: "Main interests", zh: "主要兴趣" },
      value: { en: "Horology · Entrepreneurship · Art · History · Debate", zh: "制表 · 创业 · 艺术 · 历史 · 辩论" },
    },
    {
      label: { en: "Recognition", zh: "荣誉" },
      value: {
        en: "John Locke Global Essay Prize 2026 — Commendation, Theology",
        zh: "2026 约翰·洛克全球论文奖——神学类嘉许（Commendation）",
      },
    },
    {
      label: { en: "Direction", zh: "发展方向" },
      value: { en: "Business · Entrepreneurship", zh: "商业管理 · 创业" },
    },
  ] as { label: Bi; value: Bi }[],
  interestsTitle: { en: "What I Pay Attention To", zh: "我关注的方向" } as Bi,
  interests: [
    {
      title: { en: "Mechanical watchmaking", zh: "机械制表" },
      text: {
        en: "Movements, complications, hand-finishing and independent watchmakers — and the history that shaped them.",
        zh: "机芯、复杂功能、手工打磨和独立制表师，以及塑造它们的历史。",
      },
    },
    {
      title: { en: "Business & entrepreneurship", zh: "商业与创业" },
      text: {
        en: "Sourcing, pricing, inventory and systems. I like to understand how something is bought, valued and sold.",
        zh: "采购、定价、库存与运营系统。我喜欢弄清楚一件东西如何被买入、估值和卖出。",
      },
    },
    {
      title: { en: "Art & design", zh: "艺术与设计" },
      text: {
        en: "Drawing and painting as a way to slow down and look closely: colour, weight, gesture and light.",
        zh: "通过绘画让自己慢下来、看得更仔细：色彩、重量、姿态与光线。",
      },
    },
    {
      title: { en: "History", zh: "历史" },
      text: {
        en: "Objects with a past: how design decisions, makers and places leave traces on what we use today.",
        zh: "有历史的物件：设计决策、制作者和地方如何在今天的物品上留下痕迹。",
      },
    },
    {
      title: { en: "Debate & ideas", zh: "辩论与思辨" },
      text: {
        en: "Building an argument, testing it against the other side and presenting it clearly under pressure.",
        zh: "构建论点、从对立面检验它，并在压力下清晰地表达。",
      },
    },
    {
      title: { en: "Music & sport", zh: "音乐与运动" },
      text: {
        en: "Flute — classical, rock and modern jazz — and tennis. Both reward patience, timing and practice.",
        zh: "长笛（古典、摇滚与现代爵士）和网球。两者都需要耐心、节奏感和长期练习。",
      },
    },
  ] as { title: Bi; text: Bi }[],
  valuesTitle: { en: "What I Value", zh: "我看重的东西" } as Bi,
  values: [
    {
      num: "I",
      title: { en: "Craft over logos", zh: "工艺胜于品牌" },
      text: {
        en: "I care more about how something is made — the movement, the finishing, the design history — than about the name on the dial.",
        zh: "相比表盘上的名字，我更在意一件东西是怎么做出来的：机芯、打磨和设计背后的历史。",
      },
    },
    {
      num: "II",
      title: { en: "Honest description", zh: "诚实地描述" },
      text: {
        en: "Separating what I can verify from what is still uncertain — in a watch listing, in a debate case, or on this website.",
        zh: "把能够核实的和仍不确定的区分开来——无论是在商品描述、辩论论证，还是这个网站上。",
      },
    },
    {
      num: "III",
      title: { en: "Learning by doing", zh: "在实践中学习" },
      text: {
        en: "I understand an idea best once I have tested it on something real: a sale, a painting, a spreadsheet, a speech.",
        zh: "一个想法只有在真实事情上检验过——一笔交易、一幅画、一张表格、一次演讲——我才真正理解它。",
      },
    },
    {
      num: "IV",
      title: { en: "Build the system, then refine", zh: "先建立系统，再持续优化" },
      text: {
        en: "Good results usually come from a simple process repeated and improved, not from a single perfect attempt.",
        zh: "好的结果通常来自一个被不断重复和改进的简单流程，而不是一次完美的尝试。",
      },
    },
  ] as { num: string; title: Bi; text: Bi }[],
  music: {
    title: { en: "Music", zh: "音乐" } as Bi,
    line: { en: "I play the flute.", zh: "我会吹长笛。" } as Bi,
    sub: { en: "Another way of keeping time.", zh: "另一种计时的方式。" } as Bi,
  },
  quote: {
    text: "Old money, not old man.",
    note: {
      en: "How I describe my taste in watches and clothes: classic, cultured and restrained — but never dated.",
      zh: "我对自己腕表和穿衣审美的概括：经典、有文化感、克制，但不显老气。",
    } as Bi,
  },
  styleTitle: { en: "Style & Aesthetics", zh: "审美与风格" } as Bi,
  style: {
    en: "White linen shirts, classic shoes, a pocket watch or a bow tie on the right occasion. I prefer understated pieces with history behind them to loud branding — the same instinct that draws me to guilloché dials and hand-wound movements.",
    zh: "白色亚麻衬衫、经典皮鞋，合适的场合配一块怀表或一个领结。比起张扬的品牌标识，我更喜欢低调、有历史感的东西——这和我被机刻雕花表盘与手动上链机芯吸引的原因是一样的。",
  } as Bi,
  futureTitle: { en: "Looking Ahead", zh: "对未来的想法" } as Bi,
  future: [
    {
      en: "Study business and management at university — I am researching programmes in Switzerland, Italy and beyond.",
      zh: "在大学学习商业与管理——目前正在研究瑞士、意大利等地的项目。",
    },
    {
      en: "Turn the vintage watch project into a well-run small business with clear systems.",
      zh: "把二手腕表项目发展成一个运营规范、系统清晰的小型生意。",
    },
    {
      en: "One day, design a small series of watches of my own.",
      zh: "将来设计并制作一个属于自己的小批量腕表系列。",
    },
    {
      en: "Share what I learn through long-form writing and video about watches and markets.",
      zh: "通过关于腕表和市场的长文与长视频，分享我学到的东西。",
    },
  ] as Bi[],
};
