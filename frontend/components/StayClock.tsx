"use client";

import { useEffect, useState } from "react";
import { T } from "./T";

/** “you have been here for 00:03:12” — counts the time spent on this page. */
export default function StayClock() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const t = window.setInterval(() => setS(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => window.clearInterval(t);
  }, []);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return (
    <p className="stay-clock" aria-live="off">
      <T v={{ en: "you have been here for", zh: "你已经在这里停留了" }} /> <span className="stay-time">{`${hh}:${mm}:${ss}`}</span>
      <span className="stay-cursor" aria-hidden="true">
        _
      </span>
    </p>
  );
}
