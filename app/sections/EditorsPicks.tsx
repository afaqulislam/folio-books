"use client";
import BookCard from "@/app/components/BookCard";
import EmptyState from "@/app/components/EmptyState";
import type { Book } from "@/app/lib/types";

interface EditorsPicksProps {
  books: Book[];
  totalCount: number;
  isFiltered: boolean;
  editingId: number | null;
  confirmingDeleteId: number | null;
  onToggleEdit: (id: number) => void;
  onEdit: (id: number, field: keyof Book, value: string) => void;
  onRequestDelete: (id: number) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (id: number) => void;
}

export default function EditorsPicks({
  books,
  totalCount,
  isFiltered,
  editingId,
  confirmingDeleteId,
  onToggleEdit,
  onEdit,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: EditorsPicksProps) {
  const subtitle = isFiltered
    ? `Showing ${books.length} of ${totalCount} classics`
    : `${totalCount} books that have outlived their century. Read one, then hand the next person a favourite.`;

  return (
    <section
      id="classics"
      className="scroll-mt-20 border-y border-line bg-canvas-alt/50 py-20"
    >
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Hand-picked</p>
            <h2 className="section-title mt-4">Editor&apos;s picks</h2>
            <p className="section-sub">{subtitle}</p>
          </div>
          <a href="#shelf" className="btn-outline shrink-0">
            Go to my shelf
          </a>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {books.length === 0 ? (
            isFiltered ? (
              <EmptyState
                title="No classics match"
                message="No title in this collection matches your search or genre filter."
              />
            ) : (
              <EmptyState
                title="You removed every classic"
                message="Reload the page to bring the collection back — these books are not editable storage."
              />
            )
          ) : (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                isEditing={editingId === book.id}
                isConfirmingDelete={confirmingDeleteId === book.id}
                onToggleEdit={() => onToggleEdit(book.id)}
                onEdit={(field, value) => onEdit(book.id, field, value)}
                onRequestDelete={() => onRequestDelete(book.id)}
                onCancelDelete={onCancelDelete}
                onConfirmDelete={() => onConfirmDelete(book.id)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
