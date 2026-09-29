"use client";
import { useEffect, useState } from "react";

interface SiteHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
}

const NAV_LINKS = [
  { href: "#discover", label: "Discover" },
  { href: "#shelf", label: "My Shelf" },
  { href: "#classics", label: "Classics" },
  { href: "#newsletter", label: "Newsletter" },
];

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
      />
    </svg>
  );
}

export default function SiteHeader({ query, onQueryChange }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-2 sm:gap-3">
        <a
          href="#top"
          onClick={close}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-lg font-black text-white shadow-md shadow-accent/30">
            F
          </span>
          <span className="font-display text-xl font-bold leading-none tracking-tight text-ink">
            Folio
          </span>
        </a>

        <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft transition hover:bg-accent-tint hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <label className="relative hidden lg:block">
            <span className="sr-only">Search books</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search titles or authors"
              className="field-input !w-64 !py-2 !pl-9"
            />
          </label>

          <a href="#add-book" className="btn-accent hidden sm:inline-flex">
            Add book
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={isOpen ? "mobile-nav" : undefined}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="btn-outline !px-2.5 !py-2 md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-5 w-5"
            >
              {isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-canvas md:hidden"
        >
          <div className="container-page space-y-4 py-4">
            <label className="relative block">
              <span className="sr-only">Search books</span>
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search titles or authors"
                className="field-input !py-2.5 !pl-9"
              />
            </label>

            <nav className="flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-ink-soft transition hover:bg-accent-tint hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#add-book"
              onClick={close}
              className="btn-accent w-full"
            >
              Add book
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
