'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project, ProjectCategory, ProjectType } from '@/data/projects';
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

  const projectGroups: { type: ProjectType; title: string; description: string }[] = [
    {
      type: 'Company',
      title: 'Company Projects',
      description: 'Enterprise and internship work delivered with company teams and stakeholders.',
    },
    {
      type: 'Personal/Freelance',
      title: 'Personal & Freelance Projects',
      description: 'Independent work, freelance delivery and experiments built to deepen practical engineering skills.',
    },
  ];

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

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted">
          No projects match this filter yet.
        </p>
      ) : (
        <div className="space-y-14">
          {projectGroups.map((group) => {
            const groupProjects = filtered.filter((project) => project.type === group.type);

            if (groupProjects.length === 0) return null;

            return (
              <section key={group.type} aria-labelledby={`${group.type.toLowerCase()}-projects-heading`}>
                <div className="mb-5 border-l-2 border-accent pl-4">
                  <h2
                    id={`${group.type.toLowerCase()}-projects-heading`}
                    className="text-xl font-semibold text-foreground"
                  >
                    {group.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{group.description}</p>
                </div>
                <ProjectGrid projects={groupProjects} />
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
