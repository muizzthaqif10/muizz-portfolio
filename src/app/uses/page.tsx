import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Uses',
  description: `Tools, editors and setup ${profile.shortName} uses day to day.`,
};

const usesGroups = [
  {
    title: 'Editor & Terminal',
    items: ['VS Code', 'Eclipse', 'Windows Terminal'],
  },
  {
    title: 'Development',
    items: ['Git', 'GitLab', 'Postman', 'DBeaver', 'Docker', 'Minikube'],
  },
  {
    title: 'Languages & Frameworks',
    items: ['Java', 'Spring Boot', 'TypeScript', 'Go (learning)'],
  },
];

export default function UsesPage() {
  return (
    <Container className="max-w-2xl py-16 sm:py-20">
      <SectionHeading
        eyebrow="uses"
        title="Uses"
        description="The tools and setup behind most of my day-to-day work. A living list — update this page as your stack changes."
      />
      <div className="space-y-8">
        {usesGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 font-mono text-sm text-accent">
              <span className="text-muted">{'// '}</span>
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
