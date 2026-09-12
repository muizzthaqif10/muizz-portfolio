import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { profile } from '@/data/profile';
import { navLinks, secondaryNavLinks } from '@/lib/nav';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-mono text-sm text-foreground">{profile.fullName}</p>
            <p className="mt-2 text-sm text-muted">{profile.title}</p>
            <p className="text-sm text-muted">{profile.location}</p>
            <div className="mt-4 flex items-center gap-4 text-muted">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground">
                <GithubIcon size={17} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
                <LinkedinIcon size={17} />
              </a>
              <a href={profile.social.email} aria-label="Email" className="hover:text-foreground">
                <Mail size={17} />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs text-muted">navigation</p>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs text-muted">more</p>
            <ul className="space-y-2">
              {[...navLinks.slice(5), ...secondaryNavLinks].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.fullName}
          </p>
          <p>Built with Next.js</p>
        </div>
      </Container>
    </footer>
  );
}
