import type { ArchiveMeta, Bi } from "./types";

/* ------------------------------------------------------------------ */
/*  03 — Life Experiences                                              */
/* ------------------------------------------------------------------ */

export const experiencesIntro = {
  title: { en: "Life Experiences", zh: "人生经历" } as Bi,
  lede: {
    en: "Not a CV, but a record in time order: what I tried, how it went and what I took from it. Dates summarise my own records — some projects started earlier than the month they appear under.",
    zh: "这不是一份简历，而是一份按时间顺序整理的记录：我尝试了什么、过程如何、得到了什么。时间点是对已有记录的概括，部分项目的起点早于所列月份。",
  } as Bi,
};

export type Category =
  | "education"
  | "entrepreneurship"
  | "debate"
  | "projects"
  | "growth"
  | "future";

export const categoryLabel: Record<Category, Bi> = {
  education: { en: "Education", zh: "教育" },
  entrepreneurship: { en: "Entrepreneurship", zh: "创业" },
  debate: { en: "Debate & MUN", zh: "辩论与模联" },
  projects: { en: "Business Projects", zh: "商业项目" },
  growth: { en: "Personal Development", zh: "个人成长" },
  future: { en: "Future", zh: "未来方向" },
};

export type TimelineEntry = ArchiveMeta & {
  period: Bi;
  title: Bi;
  categories: Category[];
  points: Bi[];
};

export const timeline: TimelineEntry[] = [
  {
    id: "E-001",
    updated: "2026-11-10",
    visibility: "public",
    period: { en: "2025", zh: "2025 年" },
    title: { en: "Watches become more than a hobby", zh: "腕表不再只是爱好" },
    categories: ["growth", "education"],
    points: [
      {
        en: "Started studying mechanical movements, complications and independent watchmakers seriously.",
        zh: "开始系统地研究机械机芯、复杂功能和独立制表师。",
      },
      {
        en: "Set ambitious academic goals and began thinking about business as a long-term direction.",
        zh: "设定较高的学业目标，开始把商业视为长期发展方向。",
      },
    ],
  },
  {
    id: "E-002",
    updated: "2026-11-10",
    visibility: "public",
    period: { en: "Early 2026", zh: "2026 年初" },
    title: { en: "Research before buying", zh: "先研究，再出手" },
    categories: ["education", "future"],
    points: [
      {
        en: "Learned to decide by comparison — two versions of the same watch, two marketplaces for selling it — and to ask why one option is better, not only which.",
        zh: "学会通过比较做决定——同一款表的两个版本、两个出售它的平台——不只问哪个更好，也追问为什么更好。",
      },
      {
        en: "Began researching universities and business programmes in Europe.",
        zh: "开始研究欧洲的大学和商科项目。",
      },
    ],
  },
  {
    id: "E-003",
    updated: "2026-11-10",
    visibility: "public",
    period: { en: "First half of 2026", zh: "2026 年上半年" },
    title: { en: "The first sales", zh: "第一批成交" },
    categories: ["entrepreneurship", "debate"],
    points: [
      {
        en: "Started reselling vintage watches online and at flea markets — around 50 completed sales on Wallapop by the end of June.",
        zh: "开始在网上和跳蚤市场出售二手腕表——截至 6 月底，在 Wallapop 上完成了约 50 笔交易。",
      },
      {
        en: "Took part in debate and Model United Nations alongside school work.",
        zh: "在学业之外参与辩论和模拟联合国活动。",
      },
    ],
  },
  {
    id: "E-004",
    updated: "2026-11-10",
    visibility: "public",
    period: { en: "July – August 2026", zh: "2026 年 7 月 – 8 月" },
    title: { en: "Scaling the supply side", zh: "扩展货源" },
    categories: ["entrepreneurship", "projects"],
    points: [
      {
        en: "Brought in a first batch of watches from overseas suppliers and learned what shipping, inspection and import really involve.",
        zh: "从海外渠道引进第一批腕表，真正了解了物流、验货和进口的实际流程。",
      },
      {
        en: "Planned a market stall, with price tiers by watch type.",
        zh: "规划线下市场摊位，并按腕表类型设计价格分层。",
      },
      {
        en: "Tested bundles of watch, leather case and spare strap.",
        zh: "测试“腕表 + 皮质表套 + 备用表带”的组合销售。",
      },
    ],
  },
  {
    id: "E-005",
    updated: "2026-11-10",
    visibility: "public",
    period: { en: "September 2026", zh: "2026 年 9 月" },
    title: { en: "A new school year and a website plan", zh: "新学年与网站计划" },
    categories: ["education", "projects"],
    points: [
      {
        en: "Started a new year of IB Middle Years studies.",
        zh: "开始新一学年的 IB 中学项目（MYP）学习。",
      },
      {
        en: "Planned a dedicated watch website with a burgundy, ivory and gold identity and an editable catalogue.",
        zh: "规划一个独立的腕表网站：酒红、象牙白与金色的视觉风格，以及可编辑的商品目录。",
      },
    ],
  },
  {
    id: "E-006",
    updated: "2026-11-10",
    visibility: "public",
    period: { en: "October 2026", zh: "2026 年 10 月" },
    title: { en: "From selling to systems", zh: "从销售到系统" },
    categories: ["projects", "entrepreneurship"],
    points: [
      {
        en: "Designed a Google Sheets system for inventory, partner sellers and monthly settlement.",
        zh: "设计了用于库存、合作销售和月度结算的 Google Sheets 系统。",
      },
      {
        en: "Researched platform rules and the tax side of selling online.",
        zh: "研究了二手平台规则以及网上销售涉及的税务问题。",
      },
      {
        en: "Mapped a step-by-step procedure for receiving, checking and photographing watches, with AI-assisted data entry.",
        zh: "梳理了收货、检查和拍摄的标准流程，并引入 AI 辅助数据录入。",
      },
    ],
  },
  {
    id: "E-007",
    updated: "2026-11-10",
    visibility: "public",
    period: { en: "November 2026", zh: "2026 年 11 月" },
    title: { en: "Building this archive", zh: "建立这个档案" },
    categories: ["growth", "projects"],
    points: [
      {
        en: "Designed and launched this bilingual personal archive.",
        zh: "设计并上线了这个双语个人档案网站。",
      },
      {
        en: "Continued maths, Spanish, debate and MUN.",
        zh: "继续数学、西班牙语、辩论和模拟联合国的学习与活动。",
      },
    ],
  },
];

export type Chapter = ArchiveMeta & {
  category: Category;
  title: Bi;
  background: Bi;
  process: Bi;
  takeaway: Bi;
};

export const chapters: Chapter[] = [
  {
    id: "E-101",
    updated: "2026-11-10",
    visibility: "public",
    category: "education",
    title: { en: "International Education", zh: "国际教育" },
    background: {
      en: "I study at an international school on the IB pathway, in an environment where English, Chinese and Spanish are part of everyday life.",
      zh: "我在国际学校就读，走 IB 课程路线；英语、中文和西班牙语都是日常生活的一部分。",
    },
    process: {
      en: "Mathematics, sciences, English, Spanish, Individuals & Societies and art. Outside class I practise algebra on Art of Problem Solving and keep a pocket notebook for ideas and key concepts.",
      zh: "学习数学、科学、英语、西班牙语、个人与社会和艺术。课外在 Art of Problem Solving 上练习代数，并用一个口袋笔记本记录想法和重点知识。",
    },
    takeaway: {
      en: "Learning across three languages taught me that the same idea often needs a different structure to land in each one.",
      zh: "在三种语言之间学习让我明白：同一个想法，在不同语言里往往需要不同的结构才能表达清楚。",
    },
  },
  {
    id: "E-102",
    updated: "2026-11-10",
    visibility: "public",
    category: "entrepreneurship",
    title: { en: "Independent Watch Reselling", zh: "独立二手腕表经营" },
    background: {
      en: "I wanted to handle more watches than I could ever own, and to understand the market from the inside.",
      zh: "我想接触比自己能拥有的多得多的腕表，并从内部理解这个市场。",
    },
    process: {
      en: "Sourcing at flea markets and online, inspection, photography, honest listings and buyer conversations — then records, numbering and partner sellers as the volume grew.",
      zh: "在跳蚤市场和网上采购，检查、拍摄、如实描述并与买家沟通——随着数量增加，又加入了记录、编号和合作销售。",
    },
    takeaway: {
      en: "Negotiation, inventory and patience. And that condition, photography and trust change a watch's value as much as its brand.",
      zh: "学会了议价、库存管理和耐心。也明白了成色、照片和信任对价值的影响，不亚于品牌本身。",
    },
  },
  {
    id: "E-103",
    updated: "2026-11-10",
    visibility: "public",
    category: "debate",
    title: { en: "Debate & Model United Nations", zh: "辩论与模拟联合国" },
    background: {
      en: "Debate and MUN keep the other half of my brain sharp. I am an executive member and take part in conferences.",
      zh: "辩论和模联让我另一半的思维保持敏锐。我是执行成员，并参加相关会议与比赛。",
    },
    process: {
      en: "Researching topics, writing position papers, preparing arguments for both sides and delivering conclusions under time pressure.",
      zh: "研究议题、撰写立场文件、为正反双方准备论点，并在时间压力下完成总结陈述。",
    },
    takeaway: {
      en: "A strong case is built in the research, not on the podium. Listening carefully across cultures matters as much as speaking.",
      zh: "有力的论证是在研究阶段建立的，而不是在讲台上。跨文化地认真倾听，和发言同样重要。",
    },
  },
  {
    id: "E-104",
    updated: "2026-11-10",
    visibility: "public",
    category: "projects",
    title: { en: "Business Systems & Automation", zh: "商业系统与自动化" },
    background: {
      en: "As the watch project grew, repeating the same data entry and photo sorting by hand stopped making sense.",
      zh: "随着腕表项目扩大，手动重复录入数据和整理照片已经不再合理。",
    },
    process: {
      en: "Google Sheets for inventory and settlement, a numbering and tagging system, brand photo folders, and research into AI-assisted workflows on a Mac.",
      zh: "用 Google Sheets 管理库存与结算，建立编号和标签系统、按品牌整理照片文件夹，并研究在 Mac 上用 AI 辅助的工作流程。",
    },
    takeaway: {
      en: "Automate the repetitive steps; keep the decisions — and the selling — human.",
      zh: "把重复的步骤自动化，把决策和销售留给人。",
    },
  },
  {
    id: "E-105",
    updated: "2026-11-10",
    visibility: "public",
    category: "growth",
    title: { en: "Personal Development", zh: "个人成长" },
    background: {
      en: "I tend to start many projects at once and to keep refining a plan before testing it.",
      zh: "我容易同时开展很多项目，也容易在测试之前不断优化方案。",
    },
    process: {
      en: "Setting smaller, measurable steps; tracking progress in tables; practising flute and tennis as long-term habits rather than bursts.",
      zh: "设定更小、可衡量的步骤；用表格追踪进度；把长笛和网球当作长期习惯，而不是一时的投入。",
    },
    takeaway: {
      en: "My current focus: turning ideas into consistent, measurable results.",
      zh: "我目前的重点：把想法转化为持续、稳定、可衡量的成果。",
    },
  },
  {
    id: "E-106",
    updated: "2026-11-10",
    visibility: "public",
    category: "future",
    title: { en: "Future Aspirations", zh: "未来方向" },
    background: {
      en: "I want to study business, management or entrepreneurship at university, ideally in Europe.",
      zh: "我希望在大学学习商业、管理或创业相关专业，最好在欧洲。",
    },
    process: {
      en: "Researching business schools in Switzerland and Italy, their language and mathematics requirements, and how practical projects can support an application.",
      zh: "研究瑞士和意大利的商学院，了解语言和数学要求，以及实践项目如何支持申请。",
    },
    takeaway: {
      en: "The goal is not only a place at a university, but arriving with real projects to build on.",
      zh: "目标不只是被大学录取，而是带着可以继续发展的真实项目进入大学。",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Recognition — only results that can be verified                    */
/* ------------------------------------------------------------------ */

export type Recognition = ArchiveMeta & {
  year: string;
  title: Bi;
  award: Bi;
  field: Bi;
  work: Bi;
  note: Bi;
};

export const recognition: Recognition[] = [
  {
    id: "R-001",
    updated: "2026-11-11",
    visibility: "public",
    year: "2026",
    title: { en: "John Locke Global Essay Prize", zh: "约翰·洛克全球论文奖" },
    award: { en: "Commendation", zh: "嘉许（Commendation）" },
    field: { en: "Theology", zh: "神学" },
    work: {
      en: "Is Religious Experience Better Explained by Neuroscience or by Theology?",
      zh: "宗教体验更适合用神经科学还是神学来解释？",
    },
    note: {
      en: "The essay brought together neuroscience, accounts of religious experience and philosophical perspectives.",
      zh: "文章结合了神经科学、关于宗教体验的研究，以及哲学视角。",
    },
  },
];

/* Each chapter also has a page of its own: /experiences/international-education … */
const CHAPTER_SLUGS: Record<string, string> = {
  "E-101": "international-education",
  "E-102": "watch-reselling",
  "E-103": "debate-and-mun",
  "E-104": "business-systems",
  "E-105": "personal-development",
  "E-106": "future-aspirations",
};

export function chapterSlug(id: string) {
  return CHAPTER_SLUGS[id] ?? id.toLowerCase();
}

export function chapterHref(id: string) {
  return `/experiences/${chapterSlug(id)}`;
}
