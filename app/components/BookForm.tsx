"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GENRES } from "@/app/lib/books";
import type { Book } from "@/app/lib/types";

const MAX_IMAGE_SIZE_MB = 5;

interface BookFormProps {
  onAdd: (book: Book) => void;
}

type Errors = Partial<Record<"title" | "author" | "description" | "image", string>>;

export default function BookForm({ onAdd }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState<string>(GENRES[0]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview]
  );

  const validate = (): Errors => {
    const next: Errors = {};
    if (!title.trim()) next.title = "Title is required.";
    if (!author.trim()) next.author = "Author is required.";
    if (!description.trim()) next.description = "Description is required.";
    if (!image) next.image = "A cover image is required.";
    else if (image.size > MAX_IMAGE_SIZE_MB * 1024 * 1024)
      next.image = `Image must be under ${MAX_IMAGE_SIZE_MB}MB.`;
    return next;
  };

  const reset = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !image) return;

    setIsSaving(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      onAdd({
        id: Date.now(),
        title: title.trim(),
        author: author.trim(),
        description: description.trim(),
        genre,
        imageUrl: reader.result as string,
      });
      reset();
      setIsSaving(false);
    };
    reader.onerror = () => {
      setErrors({ image: "Could not read that image." });
      setIsSaving(false);
    };
    reader.readAsDataURL(image);
  };

  const handleImageChange = (file: File | null) => {
    setErrors((prev: Errors) => ({ ...prev, image: undefined }));
    setImage(file);
    if (!file) {
      setPreview(null);
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setPreview(null);
      setImage(null);
      setErrors({ image: `Image must be under ${MAX_IMAGE_SIZE_MB}MB.` });
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="overflow-hidden rounded-3xl border border-line bg-surface shadow-xl shadow-accent/5"
    >
      <div className="flex items-center gap-3 border-b border-line bg-accent-tint px-6 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-lg font-bold text-white shadow-md shadow-accent/30">
          +
        </span>
        <div>
          <h3 className="text-lg font-bold text-ink">Add to your shelf</h3>
          <p className="text-xs font-medium text-accent">
            Title, author, and a cover — that&apos;s all we need.
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="book-title" className="field-label">
            Title
          </label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The Great Gatsby"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "book-title-error" : undefined}
            className="field-input"
          />
          {errors.title && (
            <p id="book-title-error" className="field-error">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="book-author" className="field-label">
            Author
          </label>
          <input
            id="book-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. F. Scott Fitzgerald"
            aria-invalid={Boolean(errors.author)}
            aria-describedby={errors.author ? "book-author-error" : undefined}
            className="field-input"
          />
          {errors.author && (
            <p id="book-author-error" className="field-error">
              {errors.author}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="book-genre" className="field-label">
            Genre
          </label>
          <select
            id="book-genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="field-input cursor-pointer"
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="book-image"
            className={`field-label flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-2.5 text-sm transition hover:border-accent hover:bg-accent-tint/40 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/15 ${
              errors.image
                ? "border-red-400 bg-red-50/60"
                : "border-line-strong text-muted"
            }`}
          >
            {preview ? (
              <Image
                src={preview}
                alt=""
                width={28}
                height={28}
                unoptimized
                className="h-7 w-7 shrink-0 rounded object-cover"
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            )}
            <span className="truncate">
              {image ? image.name : "Choose a cover image"}
            </span>
            <input
              id="book-image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
              className="sr-only"
            />
          </label>
          {errors.image && (
            <p className="field-error" role="alert">
              {errors.image}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="book-description" className="field-label">
            Description
          </label>
          <textarea
            id="book-description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this book about?"
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "book-description-error" : undefined}
            className="field-input resize-y"
          />
          {errors.description && (
            <p id="book-description-error" className="field-error">
              {errors.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-line bg-canvas-alt/60 px-6 py-4">
        <button type="submit" disabled={isSaving} className="btn-accent flex-1">
          {isSaving ? "Adding…" : "Add book"}
        </button>
        <button type="button" onClick={reset} className="btn-outline">
          Clear
        </button>
      </div>
    </form>
  );
}
