"use client";

import { useState } from "react";
import { categoryLabel, timeline, type Category } from "@/content/experiences";
import { publicOnly } from "@/content/types";
import { ArchiveTag, T } from "./T";
import Link from "next/link";
import { momentHref } from "@/content/pages";

const FILTERS: Category[] = ["entrepreneurship", "projects", "education", "debate", "growth", "future"];

export default function Timeline() {
  const [active, setActive] = useState<Category | "all">("all");
  const entries = publicOnly(timeline);
  const visible = active === "all" ? entries : entries.filter((e) => e.categories.includes(active));

  return (
    <div className="timeline-wrap">
      <div className="filters" role="group" aria-label="Filter by category / 按类别筛选">
        <button type="button" aria-pressed={active === "all"} onClick={() => setActive("all")}>
          <T v={{ en: "All", zh: "全部" }} /> <span className="count">{entries.length}</span>
        </button>
        {FILTERS.map((c) => {
          const n = entries.filter((e) => e.categories.includes(c)).length;
          if (!n) return null;
          return (
            <button key={c} type="button" aria-pressed={active === c} onClick={() => setActive(c)}>
              <T v={categoryLabel[c]} /> <span className="count">{n}</span>
            </button>
          );
        })}
      </div>

      <ol className="timeline">
        {visible.map((e) => (
          <li key={e.id} id={e.id} className="tl-item">
            <div className="tl-when">
              <span className="tl-period">
                <T v={e.period} />
              </span>
            </div>
            <div className="tl-body">
              <ArchiveTag id={e.id} updated={e.updated} />
              <h3 className="h-card">
                <Link href={momentHref(e.id)} className="plain-link">
                  <T v={e.title} />
                </Link>
              </h3>
              <ul className="dash-list">
                {e.points.map((p) => (
                  <li key={p.en}>
                    <T v={p} />
                  </li>
                ))}
              </ul>
              <p className="tags">
                {e.categories.map((c) => (
                  <span key={c} className="tag">
                    <T v={categoryLabel[c]} />
                  </span>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
