import type { Metadata } from 'next';
import { PageLayout } from '@/components/ui/PageLayout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillGroup } from '@/components/skills/SkillGroup';
import { SkillCard } from '@/components/skills/SkillCard';
import { skillGroups, interests } from '@/data/skills';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Skills',
  description: `Technical skills for ${profile.fullName}, organized by category.`,
};

export default function SkillsPage() {
  return (
    <PageLayout>
      <SectionHeading
        eyebrow="skills"
        title="Technical Skills"
        description="Grouped by category, with an honest sense of depth — not everything here is expert-level, and that's fine."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <SkillGroup key={group.id} group={group} />
        ))}
      </div>

      <div className="mt-20">
        <SectionHeading eyebrow="interests" title="What I'm interested in" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((card) => (
            <SkillCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
