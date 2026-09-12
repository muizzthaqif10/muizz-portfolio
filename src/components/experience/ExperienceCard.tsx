'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TechBadge } from '@/components/ui/TechBadge';
import type { ExperienceItem } from '@/data/experience';

export function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pb-10 pl-8 last:pb-0">
      <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" aria-hidden />
      <span className="absolute bottom-0 left-[4.5px] top-4 w-px bg-border last:hidden" aria-hidden />

      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-semibold text-foreground">{item.role}</h3>
        <span className="font-mono text-xs text-muted">
          {item.start} — {item.end}
        </span>
      </div>
      <p className="text-sm text-muted">
        {item.company} · {item.location}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{item.summary}</p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-3 flex items-center gap-1.5 text-sm font-medium text-accent"
        aria-expanded={open}
      >
        {open ? 'Hide details' : 'Show details'}
        <ChevronDown size={15} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          <ul className="space-y-2.5">
            {item.highlights.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
