'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/nav';
import { profile } from '@/data/profile';
import { ThemeToggle } from '@/components/ThemeToggle';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-transparent transition-all duration-200',
        scrolled
          ? 'border-border bg-background/80 py-2.5 backdrop-blur-md'
          : 'bg-background py-4',
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-mono text-sm font-medium text-foreground">
          {profile.initials}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  active ? 'text-foreground' : 'text-muted hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
            aria-label="Open command palette"
          >
            <TerminalIcon size={13} />
            <span>&#8984;K</span>
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-foreground"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-foreground"
          >
            <LinkedinIcon size={18} />
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-border bg-background px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-sm',
                    pathname === link.href
                      ? 'bg-surface-raised text-foreground'
                      : 'text-muted hover:bg-surface-raised hover:text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-5 border-t border-border pt-4 text-muted">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
