import { api } from "@/lib/api";

export default async function WatchesPage() {
  try {
    const watches = await api.watches();

    return (
      <main>
        <div className="page-shell">
          <header className="page-intro">
            <p className="kicker">Horology</p>
            <h1>Watches</h1>
            <p>
              Pieces I actually wear and learn from. Not a vault — a small collection with a reason
              for each one.
            </p>
          </header>
          <div className="watch-list" style={{ paddingTop: "1.2rem" }}>
            {watches.map((watch, index) => (
              <article className="watch-row" key={watch.id}>
                <div className="idx">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{watch.name}</h3>
                  <p className="meta-line">Acquired {watch.year_acquired}</p>
                </div>
                <p className="meta-line">
                  {watch.movement}
                  <br />
                  {watch.origin}
                </p>
                <p>{watch.note}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    );
  } catch {
    return <p className="error">Could not load the watch collection from the API.</p>;
  }
}
