import type { Metadata } from 'next';
import { PageLayout } from '@/components/ui/PageLayout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline';
import { experience } from '@/data/experience';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Experience',
  description: `Work experience for ${profile.fullName} — integration engineering, backend, and frontend internship history.`,
};

export default function ExperiencePage() {
  return (
    <PageLayout className="max-w-4xl">
      <SectionHeading
        eyebrow="experience"
        title="Where I've worked"
        description="A timeline of roles, from a frontend internship through to integration engineering on core banking systems."
      />
      <ExperienceTimeline items={experience} />
    </PageLayout>
  );
}
