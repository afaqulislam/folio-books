"use client";
import { ALL_GENRES, GENRES } from "@/app/lib/books";

interface GenreFilterProps {
  active: string;
  onChange: (genre: string) => void;
}

export default function GenreFilter({ active, onChange }: GenreFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter books by genre"
    >
      {[ALL_GENRES, ...GENRES].map((genre) => {
        const isActive = active === genre;
        return (
          <button
            key={genre}
            type="button"
            onClick={() => onChange(genre)}
            aria-pressed={isActive}
            className={`chip ${isActive ? "chip-active" : ""}`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
