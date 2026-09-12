import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer';
import { GithubReposSection } from '@/components/projects/GithubReposSection';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Project showcase for ${profile.fullName} — integration case studies, learning projects and internship work.`,
};

export default function ProjectsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="projects"
        title="Projects"
        description="A mix of real work case studies (generalized for confidentiality) and personal learning projects."
      />
      <ProjectsExplorer projects={projects} />
      <GithubReposSection />
    </Container>
  );
}
