'use client';

import { useReducedMotion, motion } from 'framer-motion';

const nodes = [
  { id: 'client', label: 'client', x: 40, y: 40 },
  { id: 'gateway', label: 'api-gateway', x: 220, y: 40 },
  { id: 'service', label: 'service', x: 220, y: 150 },
  { id: 'db', label: 'database', x: 40, y: 150 },
];

const path = 'M 40 40 H 220 V 150 H 40';

export function FlowVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="surface-lift rounded-2xl border border-border bg-surface-raised/80 p-5 backdrop-blur-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">request-flow.trace</span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          live
        </span>
      </div>

      <svg viewBox="0 0 260 190" className="w-full" role="img" aria-label="Diagram of a request travelling from client to API gateway to service to database and back">
        <path d={path} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />

        {!reduceMotion && (
          <motion.circle
            r="3.5"
            fill="var(--accent)"
            animate={{
              cx: [40, 220, 220, 40, 40],
              cy: [40, 40, 150, 150, 40],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', times: [0, 0.33, 0.5, 0.83, 1] }}
          />
        )}

        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x - 34}, ${node.y - 14})`}>
            <rect
              width="68"
              height="28"
              rx="6"
              fill="var(--surface)"
              stroke="var(--border-strong)"
              strokeWidth="1"
            />
            <text
              x="34"
              y="18"
              textAnchor="middle"
              className="font-mono"
              fontSize="8.5"
              fill="var(--foreground)"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-4 space-y-1 border-t border-border pt-4 font-mono text-xs text-muted">
        <p>
          <span className="text-signal">200</span> POST /api/v1/transaction · 42ms
        </p>
        <p>
          <span className="text-signal">200</span> GET /api/v1/mapping/status · 11ms
        </p>
      </div>
    </div>
  );
}
