import type { InterestCard } from '@/data/skills';

export function SkillCard({ card }: { card: InterestCard }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
      <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
    </div>
  );
}
