import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { TechBadge } from '@/components/ui/TechBadge';
import type { Project } from '@/data/projects';
import { GithubIcon } from '@/components/icons/BrandIcons';

const statusTone: Record<Project['status'], 'signal' | 'amber' | 'accent' | 'muted'> = {
  Live: 'signal',
  'In Progress': 'amber',
  'Case Study': 'accent',
  Archived: 'muted',
  Planned: 'muted',
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="surface-lift group relative flex flex-col rounded-xl border border-border bg-surface/80 p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <Badge tone={statusTone[project.status]}>{project.status}</Badge>
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="text-muted transition-colors hover:text-foreground"
          >
            <GithubIcon size={16} />
          </a>
        ) : (
          !project.isPlaceholder && (
            <span className="flex items-center gap-1 text-xs text-muted" title="Private / confidential work">
              <Lock size={13} />
            </span>
          )
        )}
      </div>

      <h3 className="text-base font-semibold text-foreground">
        <Link href={`/projects/${project.slug}`} className="hover:text-accent">
          <span className="absolute inset-0" aria-hidden />
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-border py-3 text-xs">
        <div>
          <dt className="font-mono uppercase tracking-wide text-muted">Type</dt>
          <dd className="mt-1 text-foreground">{project.type}</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide text-muted">Timeline</dt>
          <dd className="mt-1 text-foreground">{project.year}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
        View case study
        <ArrowUpRight size={14} />
      </div>
    </div>
  );
}
