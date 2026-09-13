import { ArrowDown, ArrowRight, Boxes, Cloud, Share2 } from 'lucide-react';

export function ArchitectureDiagram({ nodes }: { nodes: string[] }) {
  const source = nodes[0] ?? 'Source systems';
  const integrationLayer = nodes[1] ?? 'Integration layer';
  const destinations = nodes.slice(2);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface p-4 sm:p-6">
      <div className="mb-4 grid grid-cols-3 gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted sm:text-xs">
        <span>Source systems</span>
        <span className="text-center">Integration layer</span>
        <span className="text-right">Connected applications</span>
      </div>

      <div className="grid items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)_auto_minmax(0,1fr)] sm:items-center">
        <div className="flex min-h-28 items-center justify-center rounded-lg border border-border-strong bg-surface-raised p-4 text-center sm:min-h-36">
          <div>
            <Boxes className="mx-auto mb-3 text-accent" size={22} aria-hidden />
            <span className="font-mono text-sm font-medium text-foreground">{source}</span>
          </div>
        </div>

        <div className="flex justify-center text-accent sm:block">
          <ArrowRight className="hidden sm:block" size={18} aria-hidden />
          <ArrowDown className="sm:hidden" size={18} aria-hidden />
        </div>

        <div className="flex min-h-36 items-center justify-center rounded-lg border-2 border-accent bg-accent/10 p-4 text-center">
          <div>
            <Cloud className="mx-auto mb-3 text-accent" size={24} aria-hidden />
            <span className="font-mono text-sm font-semibold text-foreground">{integrationLayer}</span>
            <p className="mt-2 text-xs leading-relaxed text-muted">Routing, transformation and delivery</p>
          </div>
        </div>

        <div className="flex justify-center text-accent sm:block">
          <ArrowRight className="hidden sm:block" size={18} aria-hidden />
          <ArrowDown className="sm:hidden" size={18} aria-hidden />
        </div>

        <div className="grid gap-2">
          {(destinations.length > 0 ? destinations : ['External applications']).map((destination) => (
            <div
              key={destination}
              className="flex min-h-16 items-center justify-center rounded-lg border border-border-strong bg-surface-raised px-3 py-3 text-center"
            >
              <div>
                <Share2 className="mx-auto mb-1.5 text-muted" size={17} aria-hidden />
                <span className="font-mono text-xs text-foreground">{destination}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
