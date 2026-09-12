import type { ExperienceItem } from '@/data/experience';
import { ExperienceCard } from './ExperienceCard';

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <ExperienceCard key={item.id} item={item} />
      ))}
    </div>
  );
}
