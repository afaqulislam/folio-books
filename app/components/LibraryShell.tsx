"use client";
import { useMemo, useState } from "react";
import SiteHeader from "@/app/components/SiteHeader";
import Hero from "@/app/components/Hero";
import MyShelf from "@/app/sections/MyShelf";
import EditorsPicks from "@/app/sections/EditorsPicks";
import Newsletter from "@/app/components/Newsletter";
import SiteFooter from "@/app/components/SiteFooter";
import { useBooks } from "@/app/lib/useBooks";
import { ALL_GENRES, GENRES, averageRating, filterBooks } from "@/app/lib/books";
import { CLASSIC_BOOKS } from "@/app/lib/classics";

function scrollToClassics() {
  const target = document.getElementById("classics");
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}

export default function LibraryShell() {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState(ALL_GENRES);

  const shelf = useBooks();
  const picks = useBooks(CLASSIC_BOOKS);

  const visibleShelf = useMemo(
    () => filterBooks(shelf.books, query, activeGenre),
    [shelf.books, query, activeGenre]
  );

  const visiblePicks = useMemo(
    () => filterBooks(picks.books, query, activeGenre),
    [picks.books, query, activeGenre]
  );

  const isFiltered = Boolean(query.trim()) || activeGenre !== ALL_GENRES;

  const handleSelectGenre = (genre: string) => {
    setActiveGenre(genre);
    setQuery("");
    scrollToClassics();
  };

  const handleSelectBook = (title: string) => {
    setActiveGenre(ALL_GENRES);
    setQuery(title);
    scrollToClassics();
  };

  const stats = useMemo(() => {
    const total = shelf.books.length + picks.books.length;
    const avg = averageRating(picks.books);
    return [
      { value: String(total), label: "Books in the library" },
      { value: avg ? avg.toFixed(1) : "—", label: "Average rating" },
      { value: String(GENRES.length), label: "Genres to browse" },
    ];
  }, [shelf.books.length, picks.books]);

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <SiteHeader query={query} onQueryChange={setQuery} />

      <main className="flex-1">
        <Hero query={query} onQueryChange={setQuery} stats={stats} />

        <MyShelf
          books={visibleShelf}
          totalCount={shelf.books.length}
          isFiltered={isFiltered}
          activeGenre={activeGenre}
          onGenreChange={setActiveGenre}
          editingId={shelf.editingId}
          confirmingDeleteId={shelf.confirmingDeleteId}
          onAdd={shelf.addBook}
          onToggleEdit={shelf.toggleEditing}
          onEdit={shelf.edit}
          onRequestDelete={shelf.requestDelete}
          onCancelDelete={shelf.cancelDelete}
          onConfirmDelete={shelf.deleteBook}
        />

        <EditorsPicks
          books={visiblePicks}
          totalCount={picks.books.length}
          isFiltered={isFiltered}
          editingId={picks.editingId}
          confirmingDeleteId={picks.confirmingDeleteId}
          onToggleEdit={picks.toggleEditing}
          onEdit={picks.edit}
          onRequestDelete={picks.requestDelete}
          onCancelDelete={picks.cancelDelete}
          onConfirmDelete={picks.deleteBook}
        />

        <Newsletter />
      </main>

      <SiteFooter
        activeGenre={activeGenre}
        onSelectGenre={handleSelectGenre}
        onSelectBook={handleSelectBook}
      />
    </div>
  );
}
