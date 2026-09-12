import { Badge } from '@/components/ui/Badge';
import type { Activity } from '@/data/activities';

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <Badge tone="muted">{activity.category}</Badge>
        <span className="font-mono text-xs text-muted">{activity.date}</span>
      </div>
      <h3 className="text-sm font-semibold text-foreground">{activity.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{activity.description}</p>
      {activity.link && (
        <a href={activity.link} className="mt-3 inline-block text-sm text-accent hover:underline">
          Learn more
        </a>
      )}
    </div>
  );
}
