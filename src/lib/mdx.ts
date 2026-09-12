import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  draft?: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

function getMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));
}

export function getAllPosts(): PostMeta[] {
  const files = getMdxFiles();

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;

    return {
      ...frontmatter,
      slug,
      readingTime: readingTime(content).text,
    };
  });

  return posts
    .filter((post) => !post.draft || process.env.NODE_ENV === 'development')
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    slug,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getRelatedPosts(current: PostMeta, limit = 2): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== current.slug)
    .filter((post) => post.tags?.some((tag) => current.tags?.includes(tag)))
    .slice(0, limit);
}
