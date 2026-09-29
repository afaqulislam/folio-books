import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-20 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="display-xl mt-6 text-ink">Page not found</h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
        That page has been moved, renamed, or never made it onto the shelf.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-accent">
          Back to the library
        </Link>
        <Link href="/#classics" className="btn-outline">
          Browse classics
        </Link>
      </div>
    </main>
  );
}
