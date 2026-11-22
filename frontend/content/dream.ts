import type { Bi } from "./types";

/**
 * The archive's dream: rooms that sit between the real pages. Each one has a
 * pocket watch hanging in it, an eye that watches you, and doors to the others.
 * Nothing here is about anyone — only rooms, light and time.
 */

export type DreamRoomId = "hallway" | "sky" | "pool" | "stairs" | "frames" | "doors" | "tv" | "bedroom" | "gallery";

/** Things that make a picture feel like a dream (the checklist each room is held to). */
export const DREAM_ELEMENTS = {
  light: { en: "overexposed light", zh: "过曝柔光" },
  grain: { en: "film grain", zh: "胶片颗粒" },
  fog: { en: "fog", zh: "雾" },
  clouds: { en: "clouds", zh: "云" },
  endless: { en: "endless doors, corridors or stairs", zh: "没有尽头的门、走廊或楼梯" },
  water: { en: "water and reflections", zh: "水和倒影" },
  floating: { en: "floating objects", zh: "漂浮的东西" },
  eye: { en: "an eye", zh: "眼睛" },
  checker: { en: "checkered floor", zh: "棋盘地" },
  vhs: { en: "videotape picture", zh: "录像带画面" },
  window: { en: "old computer window", zh: "老电脑窗口" },
  arrow: { en: "pixel arrow", zh: "像素箭头" },
  words: { en: "strange words", zh: "奇怪的话" },
  childhood: { en: "childhood things", zh: "童年感的小物件" },
} as const satisfies Record<string, Bi>;

export type DreamElement = keyof typeof DREAM_ELEMENTS;

export type DreamRoom = {
  id: DreamRoomId;
  num: string;
  name: Bi;
  caption: Bi;
  stamp: string;
  /** A real room from the trip photographs, turned into a dream. */
  photo?: string;
  elements: DreamElement[];
  /** A few lines for the room's own page. */
  lines: Bi[];
  /** The page the room also appears on. */
  home?: string;
};

export const DREAM_ROOMS: DreamRoom[] = [
  {
    id: "hallway",
    num: "D-01",
    name: { en: "The hallway", zh: "走廊" },
    caption: { en: "this hallway is longer than it looks", zh: "这条走廊比看起来更长" },
    stamp: "04:44:00",
    elements: ["checker", "endless", "light", "floating", "eye", "vhs", "words", "grain", "fog", "arrow"],
    lines: [
      { en: "Keep walking. The door at the end is open.", zh: "继续走。尽头那扇门是开着的。" },
      { en: "Scroll, and the hallway walks with you.", zh: "往下滚，走廊会跟着你往里走。" },
    ],
    home: "/",
  },
  {
    id: "sky",
    num: "D-02",
    name: { en: "The sky", zh: "天空" },
    caption: { en: "you have been here before", zh: "你以前来过这里" },
    stamp: "00:00:00",
    elements: ["clouds", "floating", "light", "fog", "eye", "vhs", "words", "grain"],
    lines: [
      { en: "Push the clouds. Tap the sky to leave a star.", zh: "推一推云。点一下天空，就会多一颗星星。" },
      { en: "The sky is the colour of the walls.", zh: "天空和墙是一个颜色。" },
    ],
    home: "/about",
  },
  {
    id: "pool",
    num: "D-03",
    name: { en: "The pool", zh: "泳池" },
    caption: { en: "the water remembers every hour", zh: "水记得每一个小时" },
    stamp: "03:17:00",
    elements: ["water", "floating", "childhood", "light", "fog", "eye", "vhs", "words", "grain"],
    lines: [
      { en: "Nobody swims here. Touch the water anyway.", zh: "这里没有人游泳。还是摸一下水吧。" },
      { en: "The ladder goes down further than the pool.", zh: "梯子比泳池还要深。" },
    ],
    home: "/experiences",
  },
  {
    id: "stairs",
    num: "D-04",
    name: { en: "The stairs", zh: "楼梯" },
    caption: { en: "every step is one second", zh: "每一级台阶是一秒" },
    stamp: "11:59:59",
    elements: ["endless", "clouds", "light", "floating", "eye", "vhs", "words", "fog", "grain"],
    lines: [
      { en: "Sixty steps to the minute. Nobody has reached the top.", zh: "六十级是一分钟。还没有人走到顶。" },
      { en: "Tap a step and it lights up.", zh: "点一级台阶，它会亮起来。" },
    ],
    home: "/watches",
  },
  {
    id: "frames",
    num: "D-05",
    name: { en: "The frames", zh: "画框" },
    caption: { en: "the painting is looking back", zh: "画也在看你" },
    stamp: "02:22:00",
    elements: ["endless", "eye", "floating", "light", "vhs", "words", "checker", "grain", "fog"],
    lines: [
      { en: "A frame inside a frame inside a frame.", zh: "画框里有画框，画框里还有画框。" },
      { en: "Move the mouse: the frames lean after you.", zh: "动一下鼠标，画框会跟着你歪过来。" },
    ],
    home: "/artwork",
  },
  {
    id: "doors",
    num: "D-06",
    name: { en: "The doors", zh: "门" },
    caption: { en: "every door opens onto the same room", zh: "每一扇门都通向同一个房间" },
    stamp: "05:05:05",
    photo: "doors",
    elements: ["endless", "light", "fog", "floating", "eye", "words", "vhs", "arrow", "grain"],
    lines: [
      { en: "Open one. You will come out somewhere else in the dream.", zh: "打开一扇。你会从梦里的另一个地方出来。" },
      { en: "The light behind them is always on.", zh: "门后面的灯一直亮着。" },
    ],
    home: "/projects",
  },
  {
    id: "tv",
    num: "D-07",
    name: { en: "The television room", zh: "电视房" },
    caption: { en: "nothing is on. it is still playing.", zh: "什么都没在播。它还在放。" },
    stamp: "--:--:--",
    photo: "tv",
    elements: ["childhood", "vhs", "window", "eye", "floating", "words", "fog", "light", "grain"],
    lines: [
      { en: "Tap the screen to change the channel.", zh: "点屏幕换台。" },
      { en: "Every channel is the same evening.", zh: "每一个台都是同一个晚上。" },
    ],
    home: "/catalogue",
  },
  {
    id: "bedroom",
    num: "D-08",
    name: { en: "The bedroom", zh: "卧室" },
    caption: { en: "you fell asleep at 4:44", zh: "你在 4:44 睡着了" },
    stamp: "04:44:44",
    photo: "bedroom",
    elements: ["childhood", "clouds", "light", "fog", "floating", "eye", "words", "vhs", "grain"],
    lines: [
      { en: "Wind the music box. Blow on the pinwheel. Let the balloons go.", zh: "上一下八音盒的发条，吹一下风车，把气球放走。" },
      { en: "The bed is made. Nobody has slept in it.", zh: "床铺得很整齐。没有人睡过。" },
    ],
  },
  {
    id: "gallery",
    num: "D-09",
    name: { en: "The mirror gallery", zh: "镜廊" },
    caption: { en: "the mirrors are counting", zh: "镜子在数数" },
    stamp: "09:09:09",
    photo: "gallery",
    elements: ["endless", "water", "light", "window", "arrow", "eye", "floating", "words", "vhs", "fog", "grain"],
    lines: [
      { en: "The floor is a mirror. So is the ceiling, if you look long enough.", zh: "地板是一面镜子。看久了，天花板也是。" },
      { en: "Close the window. It will come back.", zh: "把窗口关掉。它会回来的。" },
    ],
  },
];

export const dreamHref = (id: DreamRoomId) => `/dream/${id}`;
export const DREAM_HREF = "/dream";

export function dreamRoom(id: DreamRoomId): DreamRoom {
  const r = DREAM_ROOMS.find((x) => x.id === id);
  if (!r) throw new Error(`no dream room ${id}`);
  return r;
}

/** The three rooms whose doors stand in a room (the next ones round the circle). */
export function doorsFrom(id: DreamRoomId): DreamRoom[] {
  const i = DREAM_ROOMS.findIndex((r) => r.id === id);
  return [1, 3, 5].map((k) => DREAM_ROOMS[(i + k) % DREAM_ROOMS.length]);
}

export const dreamIntro: { title: Bi; lede: Bi } = {
  title: { en: "The archive is dreaming.", zh: "档案在做梦。" },
  lede: {
    en: "Nine rooms that sit between the real pages. Every door is connected; you may get a little lost. In each room a pocket watch is hanging — pull it.",
    zh: "九个夹在真实页面之间的房间。所有的门都是通的，你可能会有点迷路。每个房间里都吊着一只怀表——拉一下它。",
  },
};
