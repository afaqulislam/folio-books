"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(valid ? "done" : "error");
    if (valid) setEmail("");
  };

  return (
    <section id="newsletter" className="container-page scroll-mt-20 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-14 text-center shadow-2xl shadow-accent/25 sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-black/10 blur-2xl"
        />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            One email a week. One great book.
          </h2>
          <p className="mt-4 text-accent-tint">
            Reading picks, staff favourites, and new arrivals. Straight to your
            inbox, never more than once.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="you@example.com"
              aria-invalid={status === "error"}
              className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/60 focus:border-white focus:ring-4 focus:ring-white/25"
            />
            <button type="submit" className="btn shrink-0 bg-white py-3 text-accent hover:bg-accent-tint">
              Subscribe
            </button>
          </form>

          {status === "done" && (
            <p role="status" className="mt-4 text-sm font-semibold text-white">
              You&apos;re on the list. See you Sunday.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="mt-4 text-sm font-semibold text-white">
              Please enter a valid email address.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
