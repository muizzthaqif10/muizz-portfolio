import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-sm text-accent">
          <span className="text-muted">{'// '}</span>
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-muted">{description}</p>}
    </div>
  );
}
