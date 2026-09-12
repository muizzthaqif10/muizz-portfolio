import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
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
    <Container className="max-w-4xl py-16 sm:py-20">
      <SectionHeading
        eyebrow="experience"
        title="Where I've worked"
        description="A timeline of roles, from a frontend internship through to integration engineering on core banking systems."
      />
      <ExperienceTimeline items={experience} />
    </Container>
  );
}
