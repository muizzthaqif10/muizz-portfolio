import type { PostMeta } from '@/lib/mdx';
import { BlogCard } from './BlogCard';

export function BlogGrid({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted">
        No posts match this search yet.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
