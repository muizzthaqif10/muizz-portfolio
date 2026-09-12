import type { Metadata } from 'next';
import { Download, Mail, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { experience } from '@/data/experience';
import { skillGroups } from '@/data/skills';
import { projects } from '@/data/projects';
import { activities } from '@/data/activities';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Résumé for ${profile.fullName} — ${profile.title}.`,
};

export default function ResumePage() {
  const nonPlaceholderProjects = projects.filter((p) => !p.isPlaceholder);
  const nonPlaceholderActivities = activities.filter((a) => !a.isPlaceholder);

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <div className="no-print mb-10 flex items-center justify-between">
        <p className="font-mono text-sm text-muted">Printable résumé — ⌘/Ctrl+P also works.</p>
        <Button href={profile.resumeUrl}>
          <Download size={15} />
          Download PDF
        </Button>
      </div>

      <div className="print-surface rounded-xl border border-border bg-surface p-8 sm:p-10">
        <header className="border-b border-border pb-6">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{profile.fullName}</h1>
          <p className="mt-1 text-muted">{profile.title} — {profile.tagline}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} />
              {profile.email}
            </span>
            <span className="flex items-center gap-1.5">
              <LinkedinIcon size={14} />
              LinkedIn
            </span>
            <span className="flex items-center gap-1.5">
              <GithubIcon size={14} />
              GitHub
            </span>
          </div>
        </header>

        <section className="border-b border-border py-6">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-foreground">{profile.summary}</p>
        </section>

        <section className="border-b border-border py-6">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wide text-accent">Experience</h2>
          <div className="space-y-6">
            {experience.map((item) => (
              <div key={item.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.role} — {item.company}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {item.start} – {item.end}
                  </span>
                </div>
                <p className="text-xs text-muted">{item.location}</p>
                <ul className="mt-2 space-y-1.5">
                  {item.highlights.slice(0, 4).map((point) => (
                    <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-6">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">Education</h2>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-sm font-semibold text-foreground">{profile.education.degree}</h3>
          </div>
          <p className="text-sm text-muted">
            {profile.education.institution} · {profile.education.detail}
          </p>
        </section>

        <section className="border-b border-border py-6">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">Technical Skills</h2>
          <div className="space-y-2">
            {skillGroups.map((group) => (
              <p key={group.id} className="text-sm leading-relaxed">
                <span className="font-medium text-foreground">{group.title}: </span>
                <span className="text-muted">{group.skills.map((s) => s.name).join(', ')}</span>
              </p>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-6">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">Projects</h2>
          <div className="space-y-3">
            {nonPlaceholderProjects.map((project) => (
              <div key={project.slug}>
                <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
                <p className="text-sm leading-relaxed text-muted">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-6">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">Activities</h2>
          <ul className="space-y-1.5">
            {nonPlaceholderActivities.map((activity) => (
              <li key={activity.id} className="text-sm text-muted">
                <span className="font-medium text-foreground">{activity.title}</span> — {activity.date}
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-6">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-wide text-accent">Current Focus</h2>
          <p className="text-sm text-muted">
            Deepening backend fundamentals in Go and Kubernetes, with emphasis on distributed systems,
            system design, and production-ready deployment patterns.
          </p>
        </section>
      </div>
    </Container>
  );
}
