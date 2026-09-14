import type { Metadata } from 'next';
import { PageLayout } from '@/components/ui/PageLayout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ActivityTimeline } from '@/components/activities/ActivityTimeline';
import { activities } from '@/data/activities';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Activities',
  description: `Activities, learning milestones and achievements for ${profile.fullName}.`,
};

export default function ActivitiesPage() {
  return (
    <PageLayout>
      <SectionHeading
        eyebrow="activities"
        title="Activities & Achievements"
        description="Education, internships, and the technical learning I'm doing outside of work."
      />
      <ActivityTimeline activities={activities} />
    </PageLayout>
  );
}
