"use client";

export default function CopyrightLine() {
  const year = new Date().getFullYear();

  return (
    <p className="text-sm text-muted">
      © <span suppressHydrationWarning>{year}</span> Folio Books. Built by{" "}
      <span className="font-bold text-ink">Afaq Ul Islam</span>
    </p>
  );
}
