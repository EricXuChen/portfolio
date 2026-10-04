import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="page-shell">
        <header className="page-intro">
          <p className="kicker">404</p>
          <h1>Page not found</h1>
          <p className="section-desc">
            That URL is not part of this portfolio. Head home, or open the gallery and watches
            pages from the menu.
          </p>
          <div className="cta-row" style={{ justifyContent: "flex-start", marginTop: "1.5rem" }}>
            <Link className="btn btn-primary" href="/">
              Home
            </Link>
            <Link className="btn btn-ghost" href="/gallery">
              Gallery
            </Link>
          </div>
        </header>
      </div>
    </main>
  );
}
