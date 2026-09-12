import { Check, Loader2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RoadmapItem } from '@/data/activities';

const statusStyles = {
  Completed: { icon: Check, className: 'border-signal/50 text-signal bg-signal/10' },
  Learning: { icon: Loader2, className: 'border-amber/50 text-amber bg-amber/10' },
  Next: { icon: Circle, className: 'border-border text-muted' },
} as const;

export function LearningRoadmap({ items }: { items: RoadmapItem[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-4">
      {items.map((item, index) => {
        const { icon: Icon, className } = statusStyles[item.status];
        return (
          <li key={item.id} className="flex items-center gap-2">
            <span
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm',
                className,
              )}
            >
              <Icon size={13} />
              {item.name}
            </span>
            {index < items.length - 1 && (
              <span className="text-muted" aria-hidden>
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
