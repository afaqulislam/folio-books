"use client";
import BookForm from "@/app/components/BookForm";
import BookCard from "@/app/components/BookCard";
import EmptyState from "@/app/components/EmptyState";
import GenreFilter from "@/app/components/GenreFilter";
import { ALL_GENRES } from "@/app/lib/books";
import type { Book } from "@/app/lib/types";

interface MyShelfProps {
  books: Book[];
  totalCount: number;
  isFiltered: boolean;
  activeGenre: string;
  onGenreChange: (genre: string) => void;
  editingId: number | null;
  confirmingDeleteId: number | null;
  onAdd: (book: Book) => void;
  onToggleEdit: (id: number) => void;
  onEdit: (id: number, field: keyof Book, value: string) => void;
  onRequestDelete: (id: number) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (id: number) => void;
}

export default function MyShelf({
  books,
  totalCount,
  isFiltered,
  activeGenre,
  onGenreChange,
  editingId,
  confirmingDeleteId,
  onAdd,
  onToggleEdit,
  onEdit,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: MyShelfProps) {
  const subtitle = isFiltered
    ? `Showing ${books.length} of ${totalCount} ${
        totalCount === 1 ? "title" : "titles"
      }`
    : totalCount === 0
      ? "Nothing here yet — add your first title below."
      : `${totalCount} ${totalCount === 1 ? "title" : "titles"} on your shelf`;

  return (
    <section id="shelf" className="container-page scroll-mt-20 py-20">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Your library</p>
          <h2 className="section-title mt-4">My shelf</h2>
          <p className="section-sub">{subtitle}</p>
        </div>
        <div className="lg:max-w-lg lg:flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
              Browse by genre
            </h3>
            {activeGenre !== ALL_GENRES && (
              <button
                type="button"
                onClick={() => onGenreChange(ALL_GENRES)}
                className="text-xs font-semibold text-accent hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
          <GenreFilter active={activeGenre} onChange={onGenreChange} />
        </div>
      </div>

      <div id="add-book" className="mb-12 scroll-mt-24">
        <BookForm onAdd={onAdd} />
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {books.length === 0 ? (
          isFiltered ? (
            <EmptyState
              title="No books match"
              message="Try a different search term, or clear the genre filter to see your full shelf."
            />
          ) : (
            <EmptyState
              title="Your shelf is empty"
              message="Add your first book using the form above — title, author, and a cover is all it takes."
            />
          )
        ) : (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
    </section>
  );
}
