import { ArrowUpRight, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { FlowVisual } from './FlowVisual';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
        aria-hidden
      />

      <Container className="relative py-20 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent">
              <span className="text-muted">{'// '}</span>
              hi, I&apos;m {profile.shortName}
            </p>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.06] text-foreground sm:text-6xl">
              Software engineer building integrations, APIs &amp; cloud systems.
            </h1>
            <p className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-muted">
              I work on software that connects applications, services and banking
              platforms to each other — the middleware, mappings and infrastructure
              most people never see.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/projects">
                View Projects
                <ArrowUpRight size={16} aria-hidden />
              </Button>
              <Button href={profile.resumeUrl} download="Muizzuddin_Thaqif_Resume_V4.pdf" variant="secondary">
                Download Resume
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-5 text-muted">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-foreground"
              >
                <GithubIcon size={19} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-foreground"
              >
                <LinkedinIcon size={19} />
              </a>
              <a
                href={profile.social.email}
                aria-label="Email"
                className="transition-colors hover:text-foreground"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          <FlowVisual />
        </div>
      </Container>
    </section>
  );
}
