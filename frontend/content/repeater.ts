import type { Bi } from "./types";

/* The minute repeater (三问): the page that explains it, and where it lives. */
export const REPEATER_HREF = "/watches/minute-repeater";

export const repeater: {
  kicker: Bi;
  title: Bi;
  lede: Bi;
  listen: { title: Bi; steps: { mark: "h" | "q" | "m"; head: Bi; text: Bi }[] };
  why: { title: Bi; text: Bi };
  here: { title: Bi; text: Bi };
} = {
  kicker: { en: "Complications · No. 1", zh: "复杂功能 · 之一" },
  title: { en: "The minute repeater", zh: "三问" },
  lede: {
    en: "A watch that tells the time out loud. Press the slide on the case, and two tiny hammers strike the hours, the quarters and the minutes on gongs coiled around the movement.",
    zh: "一只会把时间说出来的表。按一下表壳侧面的拨杆，两只小锤就在绕着机芯的音簧上，敲出几点、几刻、几分。",
  },
  listen: {
    title: { en: "How to listen", zh: "怎么听" },
    steps: [
      {
        mark: "h",
        head: { en: "Low notes are the hours", zh: "低音是小时" },
        text: { en: "Four o’clock is four low notes; twelve o’clock is twelve.", zh: "四点就是四下低音，十二点就是十二下。" },
      },
      {
        mark: "q",
        head: { en: "Ding-dongs are the quarters", zh: "“叮—咚”是刻" },
        text: { en: "One ding-dong for each quarter of an hour that has passed — none, one, two or three.", zh: "过了几个一刻钟就敲几组，零到三组。" },
      },
      {
        mark: "m",
        head: { en: "High notes are the minutes", zh: "高音是分钟" },
        text: {
          en: "The minutes left over after the last quarter. 4:47 is four low notes, three ding-dongs and two high notes.",
          zh: "最后一刻之后零出来的分钟。4:47 就是四下低音、三组叮咚、两下高音。",
        },
      },
    ],
  },
  why: {
    title: { en: "Why it exists", zh: "为什么会有它" },
    text: {
      en: "Before electric light, a watch could not be read in the dark. Repeating watches, first made in the late seventeenth century, let their owners hear the time instead. The minute repeater, which counts all the way down to the single minute, is still one of the hardest complications to make by hand: how it sounds depends on how its gongs are shaped, tuned and fixed.",
      zh: "在有电灯之前，夜里是看不清表的。十七世纪末出现了会报时的表，让人可以把时间“听”出来。能一直报到分钟的三问，到今天仍是最难手工制作的复杂功能之一：声音好不好听，取决于音簧怎么弯、怎么调音、怎么固定。",
    },
  },
  here: {
    title: { en: "In this archive", zh: "在这个档案里" },
    text: {
      en: "Every pocket watch hanging in this archive now has a repeater slide on the left of its case — in the dream rooms, on the quiet pages and over the footer. The sound is made in code; nothing is recorded, and nothing plays until you press.",
      zh: "这个档案里每一只吊着的怀表，表壳左边都多了一根三问拨杆——梦房间里、留白页上、页脚上都有。声音是用代码合成的，不是录音；你不按，它就不会响。",
    },
  },
};
