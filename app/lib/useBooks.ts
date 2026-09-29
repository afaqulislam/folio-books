"use client";
import { useCallback, useState } from "react";
import type { Book } from "@/app/lib/types";

export function useBooks(initialBooks: Book[] = []) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(
    null
  );

  const addBook = useCallback((book: Book) => {
    setBooks((prev) => [...prev, book]);
  }, []);

  const toggleEditing = useCallback((id: number) => {
    setConfirmingDeleteId(null);
    setEditingId((current) => (current === id ? null : id));
  }, []);

  const edit = useCallback(
    (id: number, field: keyof Book, value: string) => {
      const next = value.trim();
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id && book[field] !== next
            ? { ...book, [field]: next }
            : book
        )
      );
    },
    []
  );

  const deleteBook = useCallback((id: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
    setEditingId((current) => (current === id ? null : current));
    setConfirmingDeleteId((current) => (current === id ? null : current));
  }, []);

  const requestDelete = useCallback((id: number) => {
    setConfirmingDeleteId(id);
  }, []);

  const cancelDelete = useCallback(() => {
    setConfirmingDeleteId(null);
  }, []);

  return {
    books,
    editingId,
    confirmingDeleteId,
    addBook,
    toggleEditing,
    edit,
    deleteBook,
    requestDelete,
    cancelDelete,
  };
}
