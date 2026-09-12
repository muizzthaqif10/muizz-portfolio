'use client';

import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { profile } from '@/data/profile';
import { Button } from '@/components/ui/Button';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';

export function ContactSection({ withForm = false }: { withForm?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the email is still visible on the page.
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h3 className="text-xl font-semibold text-foreground">Let&apos;s build something useful.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The fastest way to reach me is email. I&apos;m happy to talk about integration
          engineering, backend work, or anything on this site.
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={copyEmail}
            className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-accent/50"
          >
            <span className="flex items-center gap-2.5 text-sm text-foreground">
              <Mail size={16} className="text-muted" />
              {profile.email}
            </span>
            {copied ? (
              <Check size={15} className="text-signal" />
            ) : (
              <Copy size={15} className="text-muted" />
            )}
          </button>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground transition-colors hover:border-accent/50"
          >
            <LinkedinIcon size={16} className="text-muted" />
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground transition-colors hover:border-accent/50"
          >
            <GithubIcon size={16} className="text-muted" />
            GitHub
          </a>
        </div>
      </div>

      {withForm && (
        <form
          className="space-y-4 rounded-xl border border-border bg-surface p-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="hidden font-mono text-xs text-muted">
            This form isn&apos;t wired to a backend yet — connect it to Resend, Formspree, or a
            Vercel Function via <code>NEXT_PUBLIC_CONTACT_FORM_ENDPOINT</code>.
          </p>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-foreground">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus-visible:border-accent"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus-visible:border-accent"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full resize-none rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus-visible:border-accent"
            />
          </div>
          <Button type="submit" className="w-full">
            Send message
          </Button>
        </form>
      )}
    </div>
  );
}
