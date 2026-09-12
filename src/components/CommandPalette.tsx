'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Home, User, Briefcase, FolderGit2, Wrench, Newspaper, FileText, Mail, SunMoon, Trophy } from 'lucide-react';
import { profile } from '@/data/profile';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';

type Command = {
  id: string;
  label: string;
  group: string;
  icon: React.ComponentType<{ size?: number }>;
  action: () => void;
};

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const commands: Command[] = useMemo(
    () => [
      { id: 'home', label: 'Go Home', group: 'Navigate', icon: Home, action: () => router.push('/') },
      { id: 'about', label: 'About', group: 'Navigate', icon: User, action: () => router.push('/about') },
      { id: 'experience', label: 'Experience', group: 'Navigate', icon: Briefcase, action: () => router.push('/experience') },
      { id: 'projects', label: 'Projects', group: 'Navigate', icon: FolderGit2, action: () => router.push('/projects') },
      { id: 'skills', label: 'Skills', group: 'Navigate', icon: Wrench, action: () => router.push('/skills') },
      { id: 'blog', label: 'Blog', group: 'Navigate', icon: Newspaper, action: () => router.push('/blog') },
      { id: 'activities', label: 'Activities', group: 'Navigate', icon: Trophy, action: () => router.push('/activities') },
      { id: 'resume', label: 'Resume', group: 'Navigate', icon: FileText, action: () => router.push('/resume') },
      { id: 'contact', label: 'Contact', group: 'Navigate', icon: Mail, action: () => router.push('/contact') },
      {
        id: 'github',
        label: 'Open GitHub',
        group: 'Links',
        icon: GithubIcon,
        action: () => window.open(profile.github, '_blank', 'noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        group: 'Links',
        icon: LinkedinIcon,
        action: () => window.open(profile.linkedin, '_blank', 'noreferrer'),
      },
      {
        id: 'theme',
        label: 'Toggle Theme',
        group: 'Actions',
        icon: SunMoon,
        action: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
      },
    ],
    [router, setTheme, resolvedTheme],
  );

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleClose = useCallback(() => {
    setQuery('');
    setActiveIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filtered[activeIndex]) {
        filtered[activeIndex].action();
        handleClose();
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, filtered, activeIndex, handleClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border px-4">
          <span className="mr-2 font-mono text-muted">$</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Type a command…"
            className="w-full bg-transparent py-3.5 font-mono text-sm text-foreground outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-xs text-muted">esc</kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted">No matching commands.</li>
          )}
          {filtered.map((cmd, index) => {
            const Icon = cmd.icon;
            return (
              <li key={cmd.id}>
                <button
                  type="button"
                  onClick={() => {
                    cmd.action();
                    handleClose();
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    index === activeIndex
                      ? 'bg-surface-raised text-foreground'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  <Icon size={15} />
                  {cmd.label}
                  <span className="ml-auto font-mono text-xs text-muted">{cmd.group}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
