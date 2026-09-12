import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogExplorer } from '@/components/blog/BlogExplorer';
import { getAllPosts, getAllTags } from '@/lib/mdx';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Writing from ${profile.fullName} on backend engineering, integration and infrastructure.`,
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const [featured, ...rest] = posts;

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="writing"
        title="Blog"
        description="Notes on backend engineering, integration debugging, and things I'm learning along the way."
      />

      {featured && (
        <div className="mb-10">
          <p className="mb-3 font-mono text-xs text-muted">Featured</p>
          <BlogCard post={featured} featured />
        </div>
      )}

      <BlogExplorer posts={rest} tags={tags} />
    </Container>
  );
}
