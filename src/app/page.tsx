import Link from 'next/link';
import { ArrowUpRight, Terminal as TerminalIcon } from 'lucide-react';
import { Hero } from '@/components/hero/Hero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { SkillGroup } from '@/components/skills/SkillGroup';
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { ContactSection } from '@/components/contact/ContactSection';
import { Terminal } from '@/components/Terminal';
import { projects } from '@/data/projects';
import { skillGroups } from '@/data/skills';
import { experience } from '@/data/experience';
import { profile } from '@/data/profile';
import { getAllPosts } from '@/lib/mdx';
import { EngineeringStory } from '@/components/home/EngineeringStory';

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <EngineeringStory />

      <section className="section-wash border-b border-border py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 font-mono text-sm text-accent">
                <span className="text-muted">{'// '}</span>
                currently working on
              </p>
              <p className="text-balance text-xl leading-snug text-foreground sm:text-2xl">
                {profile.currentlyWorking}
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <TerminalIcon size={15} />
                Try the terminal — type <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono">help</code>
              </p>
            </div>
            <Terminal />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="selected-work" title="Selected Projects" className="mb-0" />
            <Link href="/projects" className="flex items-center gap-1.5 text-sm text-accent">
              View all projects
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <ProjectGrid projects={featuredProjects} />
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="skills" title="Technical Skills" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.slice(0, 3).map((group) => (
              <SkillGroup key={group.id} group={group} />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/skills" className="flex items-center gap-1.5 text-sm text-accent">
              See full skills breakdown
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="experience" title="Experience" />
          <ExperienceTimeline items={experience} />
        </Container>
      </section>

      {latestPosts.length > 0 && (
        <section className="section-wash border-b border-border py-16 sm:py-20">
          <Container>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="writing" title="Latest Blog Posts" className="mb-0" />
              <Link href="/blog" className="flex items-center gap-1.5 text-sm text-accent">
                Read the blog
                <ArrowUpRight size={14} />
              </Link>
            </div>
            <BlogGrid posts={latestPosts} />
          </Container>
        </section>
      )}

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="contact" title="Get in touch" />
          <ContactSection />
          <div className="mt-8">
            <Button href="/contact" variant="secondary">
              Full contact page
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
