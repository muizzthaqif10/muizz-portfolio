'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration-safe mount flag; runs once, no cascading updates
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
    >
      {mounted && resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
