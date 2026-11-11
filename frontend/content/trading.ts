import type { Bi } from "./types";

/* ------------------------------------------------------------------ */
/*  Case study — Vintage Watch Trading                                 */
/*  Public version: no supplier locations, prices, revenue, profit,     */
/*  client or partner names. Only figures that can be verified.         */
/* ------------------------------------------------------------------ */

export const trading = {
  updated: "2026-11-11",
  slug: "vintage-watch-trading",
  kicker: { en: "Case study", zh: "案例" } as Bi,
  title: { en: "Vintage Watch Trading", zh: "古董表买卖" } as Bi,
  role: {
    en: "Founder · Independent vintage watch reseller · Barcelona",
    zh: "创办人 · 独立古董表卖家 · 巴塞罗那",
  } as Bi,
  lede: {
    en: "Turning an interest in watches into real sourcing, selling and business management.",
    zh: "把对腕表的兴趣，变成真实的采购、销售和经营管理。",
  } as Bi,

  intro: [
    {
      en: "I am an independent vintage watch reseller based in Barcelona, with an interest in mechanical horology and the history of watchmaking.",
      zh: "我是一名在巴塞罗那经营的独立古董表卖家，对机械制表和制表史有浓厚兴趣。",
    },
    {
      en: "The business focuses on sourcing, evaluating and reselling vintage watches through online marketplaces and local markets. Working with Japanese, Swiss and European brands has given me practical experience in evaluation, market research, pricing, photography and sales.",
      zh: "这门生意专注于古董表的采购、鉴别和转售，渠道包括线上二手平台和本地市场。经手日本、瑞士和欧洲的多个品牌，让我在鉴别、市场研究、定价、拍摄和销售上积累了实际经验。",
    },
    {
      en: "Beyond trading, I have been building inventory systems, distribution models and simple automation — aiming for a more structured and sustainable independent watch business.",
      zh: "在买卖之外，我也在搭建库存系统、分销模式和简单的自动化流程，目标是让这门独立腕表生意更有条理、更可持续。",
    },
  ] as Bi[],

  facts: [
    { label: { en: "Type", zh: "类型" }, value: { en: "Independent watch reselling", zh: "独立腕表转售" } },
    { label: { en: "Based in", zh: "所在地" }, value: { en: "Barcelona, Spain", zh: "西班牙 · 巴塞罗那" } },
    { label: { en: "First sales", zh: "首批成交" }, value: { en: "First half of 2026", zh: "2026 年上半年" } },
    { label: { en: "Online", zh: "线上渠道" }, value: { en: "Wallapop · Vinted", zh: "Wallapop · Vinted" } },
    { label: { en: "Offline", zh: "线下渠道" }, value: { en: "Flea markets in Barcelona", zh: "巴塞罗那的跳蚤市场" } },
    {
      label: { en: "Focus", zh: "主营" },
      value: { en: "Vintage mechanical & quartz watches", zh: "古董机械表与石英表" },
    },
    {
      label: { en: "Sourcing", zh: "货源" },
      value: { en: "Second-hand markets and international suppliers", zh: "二手市场与海外供应渠道" },
    },
  ] as { label: Bi; value: Bi }[],

  results: [
    { figure: "50+", label: { en: "Completed sales", zh: "完成交易" }, note: { en: "Wallapop record", zh: "Wallapop 交易记录" } },
    { figure: "2", label: { en: "Online platforms", zh: "线上平台" }, note: { en: "Plus local markets", zh: "另有线下市场" } },
    { figure: "14", label: { en: "Brands handled", zh: "经手品牌" }, note: { en: "Japanese, Swiss, European", zh: "日本、瑞士与欧洲" } },
    { figure: "5", label: { en: "Steps, market to buyer", zh: "从市场到买家的步骤" }, note: { en: "See below", zh: "见下文" } },
  ] as { figure: string; label: Bi; note: Bi }[],

  resultsNote: {
    en: "Revenue, profit and total volume are not published here — only figures I can verify.",
    zh: "这里不公开营业额、利润和累计销量——只展示我能够核实的数字。",
  } as Bi,

  operations: [
    {
      title: { en: "Sourcing", zh: "采购" },
      text: {
        en: "Flea markets and second-hand markets locally, plus selected international suppliers for small batches of watches and stock.",
        zh: "在本地跳蚤市场和二手市场寻找腕表，并通过精选的海外渠道小批量进货。",
      },
    },
    {
      title: { en: "Evaluation", zh: "鉴别" },
      text: {
        en: "Checking case, dial, movement, running condition and completeness — and deciding what is worth selling.",
        zh: "检查表壳、表盘、机芯、走时状况和配件完整度，再决定哪些值得出售。",
      },
    },
    {
      title: { en: "Photography & listing", zh: "拍摄与上架" },
      text: {
        en: "Photographing each watch, researching comparable prices and writing honest listings on Wallapop and Vinted.",
        zh: "为每块表拍照，研究同类价格，并在 Wallapop 和 Vinted 上写下如实的描述。",
      },
    },
    {
      title: { en: "Sales & distribution", zh: "销售与分销" },
      text: {
        en: "Handling online orders, sales at markets, delivery to buyers, and working with partner sellers.",
        zh: "处理线上订单、市场现场销售、交付给买家，以及与合作卖家配合。",
      },
    },
    {
      title: { en: "Business management", zh: "经营管理" },
      text: {
        en: "Inventory numbering, data in Google Sheets, cost calculation and a clear system for sharing results with partners.",
        zh: "库存编号、用 Google Sheets 管理数据、计算成本，并建立与合作方结算的清晰规则。",
      },
    },
  ] as { title: Bi; text: Bi }[],

  /* Counted, not named: this is a case study, not a shop window. */
  brands: [
    {
      group: { en: "Japanese", zh: "日本" },
      count: "3",
      note: {
        en: "Everyday automatics and quartz — the best school for judging condition and fair value.",
        zh: "日常的自动表与石英表——学习判断成色与合理价值的最好课堂。",
      },
    },
    {
      group: { en: "Swiss & European", zh: "瑞士与欧洲" },
      count: "11",
      note: {
        en: "Mid-century mechanical watches from smaller makers, where research and good photographs make the difference.",
        zh: "来自中小制表厂的二十世纪中叶机械表——做足功课、拍好照片，才见分晓。",
      },
    },
  ] as { group: Bi; count: string; note: Bi }[],

  stages: [
    {
      title: { en: "Getting started", zh: "起步" },
      text: { en: "First vintage watches bought, checked and resold.", zh: "第一次买入、检查并转售古董表。" },
      status: "done",
    },
    {
      title: { en: "Online marketplaces", zh: "线上平台" },
      text: { en: "Selling through Wallapop, then Vinted.", zh: "先在 Wallapop、再在 Vinted 上销售。" },
      status: "done",
    },
    {
      title: { en: "Markets in person", zh: "线下市场" },
      text: { en: "Trying flea markets in Barcelona, with price tiers by watch type.", zh: "尝试巴塞罗那的跳蚤市场，并按腕表类型设置价格档位。" },
      status: "done",
    },
    {
      title: { en: "Inventory", zh: "库存" },
      text: { en: "Buying in batches, with numbering and records for every piece.", zh: "批量进货，并为每一块表编号、建档。" },
      status: "done",
    },
    {
      title: { en: "Operations", zh: "运营" },
      text: {
        en: "A distribution system with partner sellers and automated data entry.",
        zh: "建立与合作卖家的分销制度，以及自动化的数据录入。",
      },
      status: "ongoing",
    },
    {
      title: { en: "Brand", zh: "品牌" },
      text: { en: "Planning an independent vintage watch website.", zh: "规划一个独立的古董表零售网站。" },
      status: "planned",
    },
  ] as { title: Bi; text: Bi; status: "done" | "ongoing" | "planned" }[],

  next: [
    {
      title: { en: "Independent vintage watch website", zh: "独立古董表网站" },
      status: "planned",
    },
    {
      title: { en: "Inventory management automation", zh: "库存管理自动化" },
      status: "ongoing",
    },
    {
      title: { en: "Watch accessories & straps", zh: "腕表配件与表带" },
      status: "planned",
      href: "/artwork#watch-and-strap-design",
    },
    {
      title: { en: "Distribution network", zh: "分销网络" },
      status: "ongoing",
    },
    {
      title: { en: "Independent watch design", zh: "独立腕表设计" },
      status: "planned",
      href: "/artwork#watch-and-strap-design",
    },
  ] as { title: Bi; status: "ongoing" | "planned"; href?: string }[],
};

export const statusLabel: Record<"done" | "ongoing" | "planned", Bi> = {
  done: { en: "Done", zh: "已完成" },
  ongoing: { en: "In progress", zh: "进行中" },
  planned: { en: "Planned", zh: "计划中" },
};
