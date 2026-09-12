import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'accent' | 'amber' | 'signal' | 'muted';
};

const tones = {
  default: 'border-border text-foreground',
  accent: 'border-accent/40 text-accent',
  amber: 'border-amber/40 text-amber',
  signal: 'border-signal/40 text-signal',
  muted: 'border-border text-muted',
};

export function Badge({ children, className, tone = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
