import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { TechBadge } from '@/components/ui/TechBadge';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { projects } from '@/data/projects';
import { GithubIcon } from '@/components/icons/BrandIcons';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
  };
}

const statusTone: Record<string, 'signal' | 'amber' | 'accent' | 'muted'> = {
  Live: 'signal',
  'In Progress': 'amber',
  'Case Study': 'accent',
  Archived: 'muted',
  Planned: 'muted',
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const sections: { title: string; content?: string }[] = [
    { title: 'Problem', content: project.problem },
    { title: 'Solution', content: project.solution },
    { title: 'Implementation', content: project.implementation },
    { title: 'Challenges', content: project.challenges },
    { title: 'What I Learned', content: project.learnings },
    { title: 'Future Improvements', content: project.futureImprovements },
  ];

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <Link href="/projects" className="mb-8 flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} />
        Back to projects
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone={statusTone[project.status]}>{project.status}</Badge>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>

      <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{project.name}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{project.description}</p>

      {project.longDescription && (
        <p className="mt-4 text-sm leading-relaxed text-muted">{project.longDescription}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border-strong px-4 py-2 text-sm text-foreground hover:bg-surface-raised"
          >
            <GithubIcon size={15} />
            GitHub
          </a>
        ) : (
          !project.isPlaceholder && (
            <span className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted">
              <Lock size={14} />
              Private / confidential
            </span>
          )
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm text-accent-foreground hover:opacity-90"
          >
            Live Demo
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      {project.relatedRepos && project.relatedRepos.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 font-mono text-sm text-accent">
            <span className="text-muted">{'// '}</span>
            related repositories
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.relatedRepos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-border-strong px-4 py-2 text-sm text-foreground hover:bg-surface-raised"
              >
                <GithubIcon size={15} />
                {repo.name}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      )}

      {project.architecture && project.architecture.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 font-mono text-sm text-accent">
            <span className="text-muted">{'// '}</span>
            architecture
          </h2>
          <ArchitectureDiagram nodes={project.architecture} />
        </div>
      )}

      <div className="mt-4 space-y-10">
        {sections
          .filter((section) => section.content)
          .map((section) => (
            <div key={section.title} className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-foreground">{section.title}</h2>
              <p className="leading-relaxed text-muted">{section.content}</p>
            </div>
          ))}
      </div>
    </Container>
  );
}
