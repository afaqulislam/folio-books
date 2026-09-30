<p align="center">
  <img src="docs/banner.png" alt="Folio — a curated digital library" width="100%">
</p>

<p align="center">
  <a href="https://folio-books-aui.vercel.app">
    <img src="https://img.shields.io/badge/Live-1c1917?style=flat-square&labelColor=b45309&color=1c1917&logo=vercel&logoColor=ffffff" alt="Live demo">
  </a>
  <a href="https://github.com/afaqulislam/folio-books">
    <img src="https://img.shields.io/badge/GitHub-1c1917?style=flat-square&labelColor=d97706&color=1c1917&logo=github&logoColor=ffffff" alt="Source code">
  </a>
  <img src="https://img.shields.io/badge/Next.js-15.5.26-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 15.5.26">
  <img src="https://img.shields.io/badge/React-19.3.0-20232a?style=flat-square&logo=react&logoColor=61dafb" alt="React 19.3.0">
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript strict mode">
  <img src="https://img.shields.io/badge/Tailwind-3.4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=38bdf8" alt="Tailwind CSS 3.4">
  <img src="https://img.shields.io/badge/License-MIT-1c1917?style=flat-square&labelColor=1c1917&color=d97706" alt="MIT License">
</p>

---

# Folio

**A curated digital library that runs entirely in the browser.**

Eleven hand-picked classics, plus your own. Add a title with a cover image, edit any field
on the card, search and filter instantly. No backend, no database, no account — and
nothing ever leaves the browser.

**[Live site](https://folio-books-aui.vercel.app)** ·
**[Source](https://github.com/afaqulislam/folio-books)** ·
**[Report an issue](https://github.com/afaqulislam/folio-books/issues)**

---

## What it does

| | |
|---|---|
| 📖 **Curated shelf** | Eleven classics with author, year, genre, and star rating — from *Meditations* to *The Hobbit*. |
| ➕ **Add your own** | Title, author, genre, description, and a cover image, validated field by field. |
| ✏️ **Inline editing** | Hit **Edit** and rewrite the title, author, or description directly on the card. |
| 🗑️ **Two-step delete** | Destructive actions require an explicit confirm, so nothing disappears by accident. |
| 🔍 **Live search** | Title, author, description, and genre — one query, shared by every search box. |
| 🏷️ **Genre filters** | Six genres as chips, with an active state and a one-click clear. |
| 🦶 **A footer that works** | Footer genres set the shared filter and footer titles set the shared query. No link farms. |
| 🎨 **One accent system** | A single amber accent driven by CSS custom properties, with a complete dark mode. |
| 🕶️ **Dark mode** | Follows the OS — including native form controls and scrollbars. |
| 📱 **Responsive** | Mobile nav drawer and fluid grids from 1 to 4 columns. |
| ♿ **Accessible** | Labelled inputs, `aria-invalid` + `aria-describedby` wiring, visible focus rings, live-region feedback. |
| 📦 **Zero dependencies** | 3 runtime packages. No UI kit, no state library, no icon package. |

---

## Tech stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 15.5.26** | App Router, Turbopack, file-based metadata, fully static output |
| UI | **React 19.3.0** | Stable release; concurrent rendering, and `memo` keeps the grids cheap on every keystroke |
| Language | **TypeScript 5.9.3** | `strict`, no `any`, no unchecked indexing |
| Styling | **Tailwind CSS 3.4.15** | A custom token layer maps one accent across both themes |
| Fonts | **`next/font`** | Inter + Playfair Display self-hosted — zero requests to Google |
| Quality | **ESLint 9 + `tsc --noEmit`** | Flat config (`eslint.config.mjs`) with `next/core-web-vitals` and `next/typescript`, both exposed as scripts |

Runtime dependencies: `next`, `react`, `react-dom`. That is the whole list.

---

## Architecture

### One stateful container

Everything that mutates lives in `LibraryShell`. Both search boxes, both genre chip rows,
and the footer's genre links drive the *same* two values, so the UI can never disagree
with itself.

```
  SiteHeader search ┐
                   │
  Hero search ─────┼──>  LibraryShell
                   │       query + activeGenre
  Footer genres ───┤              │
  Footer titles ───┘              ├──> filterBooks() ──> MyShelf       (useBooks #1)
                                   │                              │
                                   ├──> filterBooks() ──> EditorsPicks  (useBooks #2)
                                   │                                  │
                                   └──> stats: books, avg rating, genres
```

### One hook, two shelves

`useBooks` encapsulates add, edit, toggle-edit, and a two-step delete. It runs twice with
no changes between them — once empty for your shelf, once seeded with the eleven classics.
Every callback is wrapped in `useCallback`, so the memoised `BookCard`s are not
re-rendered by unrelated state changes.

### Server / client boundaries are explicit

`layout.tsx` and `not-found.tsx` are Server Components. `robots.ts` and `sitemap.ts` are
`force-static` route handlers. Everything interactive opens with `"use client"`. Shared
data sits in `app/lib/` so either side can import it.

### Structure

```
app/
├── icon.svg                # Favicon (amber F mark)
├── apple-icon.png          # iOS home-screen icon, 180×180
├── opengraph-image.png     # Social share card, 1200×630
├── globals.css             # Design tokens + 17 component classes
├── layout.tsx              # Fonts, and all site metadata
├── not-found.tsx           # Styled 404
├── page.tsx                # Renders <LibraryShell />
├── robots.ts               # /robots.txt
├── sitemap.ts              # /sitemap.xml
├── components/
│   ├── LibraryShell.tsx    # The single stateful container
│   ├── SiteHeader.tsx      # Sticky nav, search, mobile drawer
│   ├── Hero.tsx            # Headline, search, live stats
│   ├── SiteFooter.tsx      # Columns; genre + title links really filter
│   ├── BookCard.tsx        # memo() cover, rating, inline edit, delete
│   ├── BookForm.tsx        # Validated add-book form
│   ├── GenreFilter.tsx     # Genre chips
│   ├── EmptyState.tsx      # Empty and no-results states
│   ├── Newsletter.tsx      # Email capture with validation
│   └── CopyrightLine.tsx   # Live copyright year
├── lib/
│   ├── books.ts            # Genres, filterBooks(), averageRating()
│   ├── classics.ts         # The curated seed data (11 books)
│   ├── site.ts             # SITE_URL + REPO_URL
│   ├── types.ts            # Shared Book type
│   └── useBooks.ts         # CRUD + edit/delete state
└── sections/
    ├── MyShelf.tsx         # Your shelf
    └── EditorsPicks.tsx    # Curated collection

public/covers/              # 11 original SVG covers
docs/banner.png             # README banner
```

---

## Engineering notes

The details that actually mattered while building it.

**Custom properties need the `<alpha-value>` placeholder.** Every colour is declared
once as raw RGB channels, then registered as a Tailwind token:

```css
:root          { --accent-rgb: 180 83 9; }   /* amber-700 */
@media (prefers-color-scheme: dark) {
  :root        { --accent-rgb: 217 119 6; } /* amber-600 */
}
```

```ts
// tailwind.config.ts — 13 tokens, two themes, one source
accent: "rgb(var(--accent-rgb) / <alpha-value>)"
```

`<alpha-value>` is the part people miss: it is what lets Tailwind apply an opacity
modifier to a custom property. Without it `bg-accent/10`, `shadow-accent/25`, and
`ring-accent/15` all fail silently.

**Reusable classes live in `@layer components`.** `.btn-accent`, `.card-book`,
`.field-input`, `.chip` and friends keep the JSX readable and the spacing consistent.

**`sizes` has to match the real grid.** A 4-column layout reporting `33vw` makes the
browser fetch images roughly twice as large as it needs to. Each grid passes its own
breakpoints.

**Data URLs and SVGs bypass the optimiser.** Since `dangerouslyAllowSVG` stays off,
`BookCard` sets `unoptimized` when the source is a `data:` URL or ends in `.svg`.

**Book covers are read with `FileReader` into a data URL**, so a preview appears with no
network round-trip. `BookForm` revokes its object-URL preview on cleanup to avoid leaking
memory.

**The footer is wired to the same state as the sections.** Clicking *Dystopian* sets the
shared genre and scrolls to the collection; clicking a popular title sets the shared
query. The active genre is marked with `aria-current`, so the footer and the section's own
chips never disagree.

**Scroll respects `prefers-reduced-motion`.** Smooth by default, instant when the user
has asked for less movement.

**Versions are pinned, and the overrides earn their keep.** `next` and `eslint-config-next`
are held at the same patch (`15.5.26`) on purpose: that is the official 15.x security
backport line, and letting the two drift apart is what reopens the hole that once failed a
deploy. The single `overrides` entry pulls `@typescript-eslint/*` up to `8.71.0`, because the
range `eslint-config-next` accepts resolves to `8.14.0`, whose `no-unused-expressions` rule
throws on ESLint 9.39. Conversely `next` pins its own `postcss` to an exact version, so that
one is deliberately left alone — overriding it is a build-time hang, not a fix.

**Bugs found and fixed during a full audit**, kept here because they are the kind of thing
that ships silently:

- 19 source files carried a UTF-8 **BOM** and 5 had **mojibake** (`â€”` instead of `—`),
  introduced by PowerShell re-saving. Now byte-verified clean.
- The collection subtitle used the *immutable* seed count, so deleting a book left the
  headline claiming the original total. Now derived from live state.
- `EditorsPicks` had **no empty state** — delete all eleven and the section rendered
  blank. It now distinguishes "no matches" from "you removed everything".
- 14 footer links resolved to 3 destinations. Replaced with links that do distinct work.
- An empty-string edit could rewrite a book field; `useBooks.edit` now trims and skips
  no-op writes.

---

## Design system

One accent, two themes, no hard-coded colours in components.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--accent-rgb` | `180 83 9` | `217 119 6` | Primary actions, active state |
| `--canvas-rgb` | `251 248 243` | `16 14 12` | Page background |
| `--surface-rgb` | `255 255 255` | `27 24 21` | Cards and inputs |
| `--ink-rgb` | `28 25 23` | `247 243 236` | Primary text |
| `--line-strong-rgb` | `214 206 193` | `68 60 51` | Borders |

Dark mode is driven entirely by `prefers-color-scheme`, with `color-scheme` declared in
the viewport export so native inputs, scrollbars, and form controls follow along.

---

## Accessibility

Treated as a requirement rather than a final pass:

- Every input has a real `<label>`; errors are wired with `aria-invalid` and
  `aria-describedby` and announced through `role="status"` / `role="alert"`.
- Inline-editable fields are exposed as `role="textbox"` with visible focus rings.
- Star ratings render as `role="img"` with a text equivalent, and the numeric value is
  duplicated accessibly rather than read star-by-star.
- `focus-visible` outlines are never removed, globally.
- Destructive controls are keyboard reachable and require confirmation.
- Landmarks and `nav` labels are distinct per region, and decorative SVG is `aria-hidden`.
- Smooth scrolling is disabled under `prefers-reduced-motion`.

---

## Getting started

Requires **Node.js 20.11+** (pinned in `engines`). The floor is set by the flat ESLint
config, which reads `import.meta.dirname` — available from Node 20.11 onward.

```bash
git clone https://github.com/afaqulislam/folio-books.git
cd folio-books

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server with Turbopack and fast refresh |
| `npm run build` | Optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint 9 via the ESLint CLI, reading `eslint.config.mjs` |
| `npm run typecheck` | `tsc --noEmit` |

> **Note:** `next build` and `next dev` both write to `.next/`. Stop the dev server
> before building, or it will need a restart.

---

## Deployment

The app is fully static — nine prerendered routes, about 115 kB of first-load JS on `/`.

**Vercel**

```bash
npx vercel
```

**Any Node host**

```bash
npm run build
npm run start
```

Both URLs live in `app/lib/site.ts` and are already set to the live values, so there is
nothing to configure before deploying.

---

## Known limitations

Stated plainly, because a demo that hides these teaches the wrong thing:

- **State is in-memory.** A refresh clears your shelf. The curated collection always
  reloads from `app/lib/classics.ts`.
- **No backend.** The newsletter validates and confirms, but nothing is sent anywhere.
- **Covers are base64 in React state**, which grows memory on large images. A real product
  would upload to object storage and persist to a database.

These are scope decisions, not defects — but they are the first things to change if you
fork this into production.

---

## Credits

Built by **[Afaq Ul Islam](https://github.com/afaqulislam)**

The eleven covers in `public/covers/` are original SVGs drawn for this project. No
third-party artwork is included or implied.

---

## License

[MIT](LICENSE) © 2026 Afaq Ul Islam
