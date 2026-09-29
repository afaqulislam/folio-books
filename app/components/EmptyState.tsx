interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line-strong bg-surface/50 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-tint text-2xl" aria-hidden="true">
        📚
      </span>
      <p className="text-lg font-bold text-ink">{title}</p>
      <p className="max-w-sm text-sm text-muted">{message}</p>
    </div>
  );
}
