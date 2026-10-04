"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  { href: "/#about", label: "About", match: () => false },
  { href: "/gallery", label: "Gallery", match: (path: string) => path.startsWith("/gallery") },
  { href: "/watches", label: "Watches", match: (path: string) => path.startsWith("/watches") },
];

export default function Nav() {
  const pathname = usePathname();

  function goAbout(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;
    event.preventDefault();
    const target = document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "/#about");
    }
  }

  return (
    <nav className="site-nav" aria-label="Main">
      <Link className="mark" href="/" translate="no">
        Eric Xu
      </Link>
      <ul>
        {links.map((link) => {
          const isActive = link.match(pathname);
          const isAbout = link.label === "About";
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={isAbout ? goAbout : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
