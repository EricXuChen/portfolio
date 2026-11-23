"use client";

/**
 * The minute repeater (三问). Press, and the archive strikes the time it is
 * now on two small gongs, the way a repeating watch does:
 *   hours    — the low gong, once for each hour (1–12)
 *   quarters — high then low, "ding-dong", once for each quarter past (0–3)
 *   minutes  — the high gong, once for each minute after the last quarter (0–14)
 * 4:47 → 4 low · 3 ding-dongs · 2 high.
 * The sound is made here, in code; nothing is recorded, nothing plays unasked.
 */

export type Tone = "low" | "high";
export type Group = "h" | "q" | "m";
export type Strike = { at: number; tone: Tone; group: Group; n: number };
export type Reading = { h: number; q: number; m: number; label: string };

export const LOW_HZ = 698.5; // F5
export const HIGH_HZ = 932.3; // B♭5 — a fourth above

export function readingOf(d: Date): Reading {
  const hh = d.getHours();
  const mm = d.getMinutes();
  return { h: hh % 12 || 12, q: Math.floor(mm / 15), m: mm % 15, label: `${hh % 12 || 12}:${String(mm).padStart(2, "0")}` };
}

/** When each strike falls, in seconds from the press. */
export function plan(r: Pick<Reading, "h" | "q" | "m">): Strike[] {
  const out: Strike[] = [];
  let t = 0.15;
  for (let i = 0; i < r.h; i++, t += 0.46) out.push({ at: t, tone: "low", group: "h", n: i + 1 });
  if (r.q || r.m) t += 0.5;
  for (let i = 0; i < r.q; i++, t += 0.68) {
    out.push({ at: t, tone: "high", group: "q", n: i + 1 });
    out.push({ at: t + 0.2, tone: "low", group: "q", n: i + 1 });
  }
  if (r.q && r.m) t += 0.5;
  for (let i = 0; i < r.m; i++, t += 0.4) out.push({ at: t, tone: "high", group: "m", n: i + 1 });
  return out;
}

/** One hammer on one gong: a click, then a bright ring that dies away. */
export function gong(ctx: BaseAudioContext, out: AudioNode, t: number, tone: Tone, noise?: AudioBuffer) {
  const f = tone === "low" ? LOW_HZ : HIGH_HZ;
  const partials: [number, number, number][] = [
    [1, 1, tone === "low" ? 2.6 : 2.1],
    [2.76, 0.42, 1.3],
    [5.4, 0.2, 0.55],
    [8.93, 0.08, 0.25],
  ];
  for (const [ratio, amp, decay] of partials) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = f * ratio;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(amp, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0005, t + decay);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + decay + 0.05);
  }
  if (noise) {
    const s = ctx.createBufferSource();
    const bp = ctx.createBiquadFilter();
    const g = ctx.createGain();
    s.buffer = noise;
    bp.type = "bandpass";
    bp.frequency.value = 3200;
    bp.Q.value = 1.2;
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    s.connect(bp).connect(g).connect(out);
    s.start(t);
    s.stop(t + 0.03);
  }
}

export function noiseBuffer(ctx: BaseAudioContext) {
  const b = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.03), ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}

/* ---------------- one repeater for the whole archive ---------------- */

export type RepeaterState = {
  playing: boolean;
  owner: string | null;
  reading: Reading | null;
  done: { h: number; q: number; m: number };
  group: Group | null;
};

let state: RepeaterState = { playing: false, owner: null, reading: null, done: { h: 0, q: 0, m: 0 }, group: null };
const subs = new Set<() => void>();
const emit = (s: Partial<RepeaterState>) => {
  state = { ...state, ...s };
  subs.forEach((f) => f());
};
export const subscribe = (f: () => void) => {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
};
export const getState = () => state;
export const getServerState = () => state;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timers: number[] = [];
let shaking: HTMLElement | null = null;

export function stop() {
  timers.forEach((t) => window.clearTimeout(t));
  timers = [];
  if (master) {
    try {
      master.gain.cancelScheduledValues(0);
      master.gain.setTargetAtTime(0, ctx!.currentTime, 0.03);
    } catch {
      /* already gone */
    }
    const m = master;
    window.setTimeout(() => m.disconnect(), 200);
    master = null;
  }
  shaking?.classList.remove("is-struck");
  shaking = null;
  emit({ playing: false, owner: null, group: null });
}

/** Press the slide: strike the time it is now. Pressing again while it strikes stops it. */
export function strike(watch?: HTMLElement | null, owner: string | null = null) {
  if (state.playing) {
    stop();
    return;
  }
  const reading = readingOf(new Date());
  const strikes = plan(reading);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let t0 = 0;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx ?? new AC();
    void ctx.resume();
    master = ctx.createGain();
    master.gain.value = 0.16;
    master.connect(ctx.destination);
    const nz = noiseBuffer(ctx);
    t0 = ctx.currentTime + 0.05;
    for (const s of strikes) gong(ctx, master, t0 + s.at, s.tone, nz);
  } catch {
    /* no sound here: the reading and the movement still show the time */
  }
  shaking = watch ?? null;
  emit({ playing: true, owner, reading, done: { h: 0, q: 0, m: 0 }, group: strikes[0]?.group ?? null });
  const done = { h: 0, q: 0, m: 0 };
  for (const s of strikes) {
    timers.push(
      window.setTimeout(() => {
        if (s.group === "q" && s.tone === "low") return; // a ding-dong counts once
        done[s.group] = s.n;
        emit({ done: { ...done }, group: s.group });
        if (shaking && !reduced) {
          shaking.classList.remove("is-struck");
          void shaking.offsetWidth;
          shaking.classList.add("is-struck");
        }
      }, (s.at + 0.05) * 1000),
    );
  }
  const end = (strikes.length ? strikes[strikes.length - 1].at : 0) + 1.6;
  timers.push(window.setTimeout(() => stop(), end * 1000));
}
