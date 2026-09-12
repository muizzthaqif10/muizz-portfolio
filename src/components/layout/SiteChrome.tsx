'use client';

import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { CommandPalette } from '@/components/CommandPalette';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];

    function handleKey(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }

      buffer = [...buffer, e.key].slice(-KONAMI.length);
      if (buffer.join(',') === KONAMI.join(',')) {
        setEasterEgg(true);
        buffer = [];
        window.setTimeout(() => setEasterEgg(false), 3200);
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      {easterEgg && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div className="rounded-lg border border-accent/40 bg-surface px-4 py-2.5 font-mono text-sm text-accent shadow-xl">
            konami accepted — you found it 🎮
          </div>
        </div>
      )}
      {children}
    </>
  );
}
