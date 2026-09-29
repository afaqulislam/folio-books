import type { Book } from "@/app/lib/types";

export const GENRES = [
  "Fiction",
  "Dystopian",
  "Romance",
  "Adventure",
  "Fantasy",
  "Classic",
] as const;

export const ALL_GENRES = "All";

export function filterBooks(books: Book[], query: string, genre: string) {
  const q = query.trim().toLowerCase();

  return books.filter((book) => {
    const matchesGenre =
      genre === ALL_GENRES || book.genre.toLowerCase() === genre.toLowerCase();
    if (!matchesGenre) return false;
    if (!q) return true;
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.description.toLowerCase().includes(q) ||
      book.genre.toLowerCase().includes(q)
    );
  });
}

export function averageRating(books: Book[]) {
  const rated = books.filter(
    (book): book is Book & { rating: number } => typeof book.rating === "number"
  );
  if (rated.length === 0) return null;
  return rated.reduce((sum, book) => sum + book.rating, 0) / rated.length;
}
