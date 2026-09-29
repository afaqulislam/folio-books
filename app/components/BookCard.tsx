import Image from "next/image";
import { memo } from "react";
import type { Book } from "@/app/lib/types";

interface BookCardProps {
  book: Book;
  sizes: string;
  isEditing: boolean;
  isConfirmingDelete: boolean;
  onToggleEdit: () => void;
  onEdit: (field: keyof Book, value: string) => void;
  onRequestDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);

  return (
    <span
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
      className="inline-flex items-center gap-1"
    >
      <span className="flex" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${
              i < filled ? "text-accent" : "text-line-strong"
            }`}
            fill="currentColor"
          >
            <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.12l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
          </svg>
        ))}
      </span>
      <span aria-hidden="true" className="text-xs font-semibold tabular-nums text-ink-soft">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

function BookCard({
  book,
  sizes,
  isEditing,
  isConfirmingDelete,
  onToggleEdit,
  onEdit,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: BookCardProps) {
  return (
    <article
      className={`card-book group ${
        isEditing ? "ring-2 ring-accent ring-offset-2 ring-offset-canvas" : ""
      }`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas-alt">
        <Image
          src={book.imageUrl}
          alt={`Cover of ${book.title}`}
          fill
          sizes={sizes}
          className="object-cover transition duration-700 group-hover:scale-[1.06]"
          unoptimized={
            book.imageUrl.startsWith("data:") ||
            book.imageUrl.toLowerCase().endsWith(".svg")
          }
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
          {book.genre}
        </span>
        {isEditing && (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
            Editing
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div>
          <h3
            role={isEditing ? "textbox" : undefined}
            aria-label={isEditing ? "Book title" : undefined}
            aria-multiline={isEditing ? false : undefined}
            className={`text-lg font-bold leading-snug text-ink ${
              isEditing ? "editable -mx-1 px-1" : ""
            }`}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onEdit("title", e.currentTarget.textContent ?? "")}
          >
            {book.title}
          </h3>

          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <span className="shrink-0">by</span>
            <span
              role={isEditing ? "textbox" : undefined}
              aria-label={isEditing ? "Author" : undefined}
              className={`min-w-0 font-semibold text-ink-soft ${
                isEditing ? "editable -mx-1 flex-1 px-1" : "truncate"
              }`}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => onEdit("author", e.currentTarget.textContent ?? "")}
            >
              {book.author}
            </span>
            {book.year && !isEditing && (
              <span className="shrink-0 text-xs tabular-nums">
                &middot; {book.year}
              </span>
            )}
          </p>
        </div>

        {typeof book.rating === "number" && !isEditing && (
          <Stars rating={book.rating} />
        )}

        <p
          role={isEditing ? "textbox" : undefined}
          aria-label={isEditing ? "Description" : undefined}
          aria-multiline={isEditing ? true : undefined}
          className={`text-sm leading-relaxed text-ink-soft ${
            isEditing ? "editable -mx-1 px-1" : "line-clamp-3"
          }`}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => onEdit("description", e.currentTarget.textContent ?? "")}
        >
          {book.description}
        </p>

        <div className="mt-auto flex gap-2 pt-3">
          {isConfirmingDelete ? (
            <>
              <button
                type="button"
                onClick={onConfirmDelete}
                className="btn-accent flex-1"
                aria-label={`Confirm deleting ${book.title}`}
              >
                Confirm
              </button>
              <button type="button" onClick={onCancelDelete} className="btn-outline">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onToggleEdit}
                aria-pressed={isEditing}
                className={isEditing ? "btn-soft flex-1" : "btn-outline flex-1"}
              >
                {isEditing ? "Done" : "Edit"}
              </button>
              <button
                type="button"
                onClick={onRequestDelete}
                className="btn-quiet"
                aria-label={`Delete ${book.title}`}
              >
                Remove
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(BookCard);
