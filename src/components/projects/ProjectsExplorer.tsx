'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project, ProjectCategory } from '@/data/projects';
import { ProjectGrid } from './ProjectGrid';

const filterCategories: ('All' | ProjectCategory)[] = [
  'All',
  'Backend',
  'Frontend',
  'Full Stack',
  'Cloud',
  'Integration',
];

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<(typeof filterCategories)[number]>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = category === 'All' || project.categories.includes(category);
      const matchesQuery =
        query.trim() === '' ||
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.stack.some((tech) => tech.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [projects, category, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm transition-colors',
                category === cat
                  ? 'border-accent/50 bg-accent/10 text-accent'
                  : 'border-border text-muted hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            aria-label="Search projects"
            className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:border-accent"
          />
        </div>
      </div>

      <ProjectGrid projects={filtered} />
    </div>
  );
}
