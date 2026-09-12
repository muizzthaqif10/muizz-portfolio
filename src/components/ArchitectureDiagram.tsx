import { ArrowDown } from 'lucide-react';

export function ArchitectureDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-col items-stretch gap-0">
        {nodes.map((node, index) => (
          <div key={node} className="flex flex-col items-center">
            <div className="w-full rounded-lg border border-border-strong bg-surface-raised px-4 py-3.5 text-center">
              <span className="font-mono text-sm text-foreground">{node}</span>
            </div>
            {index < nodes.length - 1 && (
              <div className="flex flex-col items-center py-2 text-accent">
                <ArrowDown size={16} aria-hidden />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
