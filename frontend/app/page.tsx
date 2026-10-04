import { ArtworkVisual } from "@/components/ArtworkVisual";
import { SectionIntro } from "@/components/SectionIntro";
import { api } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  try {
    const [profile, artworks, watches] = await Promise.all([
      api.profile(),
      api.artworks(),
      api.watches(),
    ]);
    const sections = profile.sections ?? {};

    return (
      <main>
        <a className="skip-link" href="#about">
          Skip to content
        </a>

        <section className="hero-splash">
          <div className="hero-splash__bg" aria-hidden="true" />
          <div className="hero-splash__veil" aria-hidden="true" />
          <div className="hero-splash__content">
            <h1 className="brand" translate="no">
              {profile.name}
            </h1>
            <p className="headline">Art, watches, and ideas in motion</p>
            <p className="lede">{profile.intro}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/gallery">
                View gallery
              </Link>
              <Link className="btn btn-ghost" href="/watches">
                Watch collection
              </Link>
            </div>
          </div>
        </section>

        <div className="studio-shell" id="about">
          <section className="split">
            <div className="panel tint">
              <p className="kicker">At a glance</p>
              <h2>Catalogue</h2>
              {sections.catalogue ? <p className="section-desc">{sections.catalogue}</p> : null}
              <dl className="facts">
                {profile.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="panel about">
              <p className="kicker">Profile</p>
              <h2>About me</h2>
              {sections.about ? <p className="section-desc">{sections.about}</p> : null}
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {profile.education ? (
            <section className="info-band">
              <p className="kicker">Education</p>
              <h2>{profile.education.school}</h2>
              <p className="programme-line">{profile.education.programme}</p>
              {profile.education.description || sections.education ? (
                <p className="section-desc">
                  {profile.education.description ?? sections.education}
                </p>
              ) : null}
            </section>
          ) : null}

          {profile.activities?.length ? (
            <>
              <SectionIntro
                kicker="Outside class"
                title="Activities & interests"
                description={sections.activities}
              />
              <div className="activity-grid">
                {profile.activities.map((item) => (
                  <article className="activity-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </>
          ) : null}

          {profile.skills?.length ? (
            <section className="skills-band">
              <p className="kicker">Skills</p>
              <h2 className="skills-title">What I practice</h2>
              {sections.skills ? <p className="section-desc">{sections.skills}</p> : null}
              <ul className="skill-list">
                {profile.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <SectionIntro
            kicker="Studio"
            title="Selected work"
            description={sections.selected_work}
            action={
              <Link href="/gallery">
                <span>Full gallery →</span>
              </Link>
            }
          />
          <div className="grid-art">
            {artworks.map((work) => (
              <Link className="art-card" href={`/gallery/${work.id}`} key={work.id}>
                <ArtworkVisual work={work} />
                <div className="art-meta">
                  <h3>{work.title}</h3>
                  <p className="meta-line">
                    {work.year} · {work.medium}
                  </p>
                  <p className="card-blurb">{work.note}</p>
                </div>
              </Link>
            ))}
          </div>

          <SectionIntro
            kicker="Horology"
            title="On the wrist"
            description={sections.watches}
            action={
              <Link href="/watches">
                <span>Full collection →</span>
              </Link>
            }
          />
          <div className="watch-list">
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
    return (
      <p className="error">
        The Python API is not running yet. Start the site with start-local.ps1 (or start-local.sh) so
        the gallery can load.
      </p>
    );
  }
}
