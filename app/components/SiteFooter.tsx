"use client";

import { ALL_GENRES, GENRES } from "@/app/lib/books";
import { CLASSIC_BOOKS } from "@/app/lib/classics";
import { REPO_URL, SITE_URL } from "@/app/lib/site";
import CopyrightLine from "@/app/components/CopyrightLine";

const POPULAR_BOOKS = CLASSIC_BOOKS.slice(0, 6);

const COLLECTIONS = [
  { label: "Discover", href: "#discover" },
  { label: "Editor's picks", href: "#classics" },
  { label: "My shelf", href: "#shelf" },
  { label: "Add a book", href: "#add-book" },
  { label: "Newsletter", href: "#newsletter" },
];

const PROJECT_LINKS = [
  { label: "Source code", href: REPO_URL },
  { label: "Live site", href: SITE_URL },
  { label: "Report an issue", href: `${REPO_URL}/issues` },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-ink">
      {children}
    </h3>
  );
}

function LinkList({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");
        return (
          <li key={link.label}>
            <a
              href={link.href}
              {...(isExternal
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="text-sm text-muted transition hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

const ACTION_BASE =
  "text-left text-sm text-muted transition hover:text-accent";

export default function SiteFooter({
  activeGenre,
  onSelectGenre,
  onSelectBook,
}: {
  activeGenre: string;
  onSelectGenre: (genre: string) => void;
  onSelectBook: (title: string) => void;
}) {
  return (
    <footer className="mt-auto border-t border-line bg-canvas-alt/60">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent font-display text-xl font-black text-white shadow-md shadow-accent/30">
              F
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-ink">
              Folio
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            A curated digital library. Browse timeless classics, build your own
            shelf, and edit any title inline — all running entirely in your
            browser.
          </p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:opacity-80"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.28.74-1.57-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
            </svg>
            View source on GitHub
          </a>
        </div>

        <nav aria-label="Collections" className="lg:col-span-2">
          <ColumnHeading>Collections</ColumnHeading>
          <LinkList links={COLLECTIONS} />
        </nav>

        <nav aria-label="Filter by genre" className="lg:col-span-2">
          <ColumnHeading>Browse by genre</ColumnHeading>
          <ul className="mt-4 space-y-2.5">
            {[ALL_GENRES, ...GENRES].map((genre) => (
              <li key={genre}>
                <button
                  type="button"
                  onClick={() => onSelectGenre(genre)}
                  aria-current={activeGenre === genre ? "true" : undefined}
                  className={`${ACTION_BASE} ${
                    activeGenre === genre
                      ? "font-semibold text-accent"
                      : ""
                  }`}
                >
                  {genre === ALL_GENRES ? "All books" : genre}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular titles" className="lg:col-span-2">
          <ColumnHeading>Popular titles</ColumnHeading>
          <ul className="mt-4 space-y-2.5">
            {POPULAR_BOOKS.map((book) => (
              <li key={book.id}>
                <button
                  type="button"
                  onClick={() => onSelectBook(book.title)}
                  className={ACTION_BASE}
                >
                  {book.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Project" className="lg:col-span-2">
          <ColumnHeading>Project</ColumnHeading>
          <LinkList links={PROJECT_LINKS} />
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <CopyrightLine />
          <p className="text-xs text-muted">
            Nothing is uploaded or stored — every change lives in your browser
            and clears on refresh.
          </p>
        </div>
      </div>
    </footer>
  );
}
