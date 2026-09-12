import type { SkillGroup as SkillGroupType } from '@/data/skills';
import { Badge } from '@/components/ui/Badge';

const levelTone = {
  Learning: 'amber',
  'Working Knowledge': 'muted',
  Experienced: 'accent',
} as const;

export function SkillGroup({ group }: { group: SkillGroupType }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h3 className="mb-4 font-mono text-sm text-muted">
        <span className="text-accent">{'// '}</span>
        {group.title}
      </h3>
      <ul className="space-y-2.5">
        {group.skills.map((skill) => (
          <li key={skill.name} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-foreground">{skill.name}</span>
            <Badge tone={levelTone[skill.level]} className="shrink-0">
              {skill.level}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
