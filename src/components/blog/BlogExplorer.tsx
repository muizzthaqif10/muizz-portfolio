'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PostMeta } from '@/lib/mdx';
import { BlogGrid } from './BlogGrid';

export function BlogExplorer({ posts, tags }: { posts: PostMeta[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = !activeTag || post.tags?.includes(activeTag);
      const matchesQuery =
        query.trim() === '' ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase());
      return matchesTag && matchesQuery;
    });
  }, [posts, activeTag, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              'rounded-md border px-3 py-1.5 text-sm transition-colors',
              !activeTag ? 'border-accent/50 bg-accent/10 text-accent' : 'border-border text-muted hover:text-foreground',
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm transition-colors',
                activeTag === tag
                  ? 'border-accent/50 bg-accent/10 text-accent'
                  : 'border-border text-muted hover:text-foreground',
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search blog posts"
            className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:border-accent"
          />
        </div>
      </div>

      <BlogGrid posts={filtered} />
    </div>
  );
}
