export function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted">
      {label}
    </span>
  );
}
