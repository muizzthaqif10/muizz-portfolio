import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { profile } from '@/data/profile';
import { journeyTimeline } from '@/data/experience';
import { learningRoadmap } from '@/data/activities';
import { LearningRoadmap } from '@/components/LearningRoadmap';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${profile.fullName} — background, interests and what I'm currently learning.`,
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading eyebrow="about" title="About Me" />

      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}

          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="mb-4 font-mono text-sm text-accent">
              <span className="text-muted">{'// '}</span>
              currently exploring
            </h3>
            <ul className="space-y-3">
              {profile.currentlyLearning.map((item) => (
                <li key={item.name} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span className="text-sm text-muted">{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="mb-6 font-mono text-sm text-muted">
            <span className="text-accent">{'// '}</span>
            journey
          </h3>
          <div className="space-y-8">
            {journeyTimeline.map((milestone, i) => (
              <div key={milestone.id} className="relative pl-8">
                <span className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" aria-hidden />
                {i < journeyTimeline.length - 1 && (
                  <span className="absolute bottom-[-2rem] left-[4.5px] top-4 w-px bg-border" aria-hidden />
                )}
                <Badge tone="accent" className="mb-2">
                  {milestone.year}
                </Badge>
                <h4 className="text-sm font-semibold text-foreground">{milestone.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{milestone.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-border bg-surface p-6">
            <h3 className="mb-1 font-mono text-sm text-accent">
              <span className="text-muted">{'// '}</span>
              education
            </h3>
            <p className="mt-3 font-medium text-foreground">{profile.education.degree}</p>
            <p className="text-sm text-muted">{profile.education.institution}</p>
            <p className="text-sm text-muted">{profile.education.detail}</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="mb-6 font-mono text-sm text-accent">
          <span className="text-muted">{'// '}</span>
          learning journey
        </h3>
        <LearningRoadmap items={learningRoadmap} />
      </div>
    </Container>
  );
}
