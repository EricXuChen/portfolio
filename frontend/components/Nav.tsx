"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, navMore } from "@/content/site";
import { T } from "./T";

type Lang = "en" | "zh";

function readLang(): Lang {
  if (typeof document === "undefined") return "en";
  return document.documentElement.getAttribute("data-lang") === "zh" ? "zh" : "en";
}

export default function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    setLang(readLang());
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* A gold hairline under the header fills as the page is read. */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      header.current?.style.setProperty("--progress", progress.toFixed(4));
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  function switchLang(next: Lang) {
    document.documentElement.setAttribute("data-lang", next);
    document.documentElement.setAttribute("lang", next === "zh" ? "zh-Hans" : "en");
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* storage unavailable — the switch still works for this visit */
    }
    setLang(next);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const left = nav.slice(0, 2);
  const right = nav.slice(2);

  const renderLinks = (items: typeof nav) =>
    items.map((item) => {
      const active = isActive(item.href);
      return (
        <li key={item.href}>
          <Link href={item.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
            <T v={item.label} />
          </Link>
        </li>
      );
    });

  return (
    <header ref={header} className={`site-header${open ? " is-open" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <nav className="site-nav site-nav-left" aria-label="Main">
          <ul>{renderLinks(left)}</ul>
        </nav>

        <Link className="mark" href="/" aria-label={`${site.mark} — home`}>
          {site.mark}
        </Link>

        <div className="site-nav-right">
          <nav className="site-nav" aria-label="Main, continued">
            <ul>{renderLinks(right)}</ul>
          </nav>
          <div className="lang-switch" role="group" aria-label="Language / 语言">
            <button type="button" onClick={() => switchLang("en")} aria-pressed={lang === "en"}>
              EN
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={() => switchLang("zh")} aria-pressed={lang === "zh"}>
              中文
            </button>
          </div>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-lines" aria-hidden="true" />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile">
        <ul>
          {[...nav, ...navMore].map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <span className="nav-num">{item.num}</span>
                <T v={item.label} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
