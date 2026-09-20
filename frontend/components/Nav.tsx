import Link from "next/link";

export default function Nav() {
  return (
    <nav className="site-nav">
      <Link className="mark" href="/" translate="no">
        Eric Xu
      </Link>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/#about">About</Link>
        </li>
        <li>
          <Link href="/gallery">Gallery</Link>
        </li>
        <li>
          <Link href="/watches">Watches</Link>
        </li>
      </ul>
    </nav>
  );
}
