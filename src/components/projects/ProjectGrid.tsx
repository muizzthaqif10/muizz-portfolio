import type { Project } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted">
        No projects match this filter yet.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
