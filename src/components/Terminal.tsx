'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';

type Line = { command?: string; output: string[] };

const COMMANDS: Record<string, string[]> = {
  whoami: ['muizzuddin'],
  role: ['software-engineer'],
  focus: ['backend / integration / cloud'],
  'currently-learning': ['java, spring boot, kubernetes, docker, go'],
  help: [
    'available commands:',
    '  whoami',
    '  role',
    '  focus',
    '  currently-learning',
    '  clear',
    '  help',
  ],
};

const INITIAL: Line[] = [
  { output: ["type 'help' to see available commands"] },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(INITIAL);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function runCommand(e: FormEvent) {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    if (cmd === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    let output: string[];
    if (cmd === 'sudo hire muizz') {
      output = ['Nice try 😄'];
    } else if (COMMANDS[cmd]) {
      output = COMMANDS[cmd];
    } else {
      output = [`command not found: ${cmd} — type 'help'`];
    }

    setLines((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-raised">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/60" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/60" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-signal/60" aria-hidden />
        <span className="ml-3 font-mono text-xs text-muted">muizz@portfolio:~</span>
      </div>

      <div ref={scrollRef} className="h-56 overflow-y-auto px-4 py-3 font-mono text-sm">
        {lines.map((line, i) => (
          <div key={i} className="mb-2">
            {line.command && (
              <p className="text-foreground">
                <span className="text-accent">$ </span>
                {line.command}
              </p>
            )}
            {line.output.map((o, j) => (
              <p key={j} className="text-muted">
                {o}
              </p>
            ))}
          </div>
        ))}

        <form onSubmit={runCommand} className="flex items-center gap-2">
          <span className="text-accent">$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent text-foreground outline-none"
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
