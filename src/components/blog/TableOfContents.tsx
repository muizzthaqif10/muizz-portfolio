import type { Heading } from '@/lib/toc';

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-border bg-surface p-5">
      <p className="mb-3 font-mono text-xs text-muted">On this page</p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.slug} className={heading.depth === 3 ? 'pl-4' : ''}>
            <a href={`#${heading.slug}`} className="text-muted hover:text-accent">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
