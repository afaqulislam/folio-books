"use client";

interface HeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  stats: { label: string; value: string }[];
}

export default function Hero({ query, onQueryChange, stats }: HeroProps) {
  return (
    <section id="discover" className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-accent-soft/10 blur-3xl"
      />

      <div className="container-page relative py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Curated digital library
          </p>

          <h1 className="display-xl mt-6 text-ink">
            Every great library
            <br />
            starts with a{" "}
            <span className="relative whitespace-nowrap text-accent">
              single book
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/40"
              >
                <path
                  d="M2 8c40-6 80-8 196-4"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Browse timeless classics, build your own shelf, and keep every note
            in one beautifully simple place. No account, no clutter.
          </p>

          <div className="mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Search the library</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Try &quot;Orwell&quot; or &quot;dystopian&quot;"
                className="field-input !py-3.5 !pl-12 text-base shadow-lg shadow-accent/5"
              />
            </label>
            <a href="#shelf" className="btn-accent !py-3.5">
              Browse library
            </a>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="m-0">
                  <span className="block font-display text-2xl font-bold text-ink sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
