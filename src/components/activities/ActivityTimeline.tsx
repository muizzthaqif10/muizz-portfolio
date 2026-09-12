import type { Activity } from '@/data/activities';
import { ActivityCard } from './ActivityCard';

export function ActivityTimeline({ activities }: { activities: Activity[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
