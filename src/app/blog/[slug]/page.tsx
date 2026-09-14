import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft } from 'lucide-react';
import { PageLayout } from '@/components/ui/PageLayout';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { mdxComponents } from '@/components/blog/mdx-components';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/mdx';
import { extractHeadings } from '@/lib/toc';
import { formatDate } from '@/lib/utils';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post);

  return (
    <PageLayout>
      <Link href="/blog" className="mb-10 flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} />
        Back to blog
      </Link>

      <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
        <article className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="break-words text-3xl font-semibold text-foreground sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags?.map((tag) => (
              <span key={tag} className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>

          <div className="prose-post mt-10">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight],
                },
              }}
            />
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-border pt-10">
              <p className="mb-5 font-mono text-sm text-accent">
                <span className="text-muted">{'// '}</span>
                related posts
              </p>
              <BlogGrid posts={related} />
            </div>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
