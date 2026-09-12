import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

function headingText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(headingText).join('');
  return '';
}

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => {
    const text = headingText(children);
    return <h2 id={slugify(text)}>{children}</h2>;
  },
  h3: ({ children }) => {
    const text = headingText(children);
    return <h3 id={slugify(text)}>{children}</h3>;
  },
  a: ({ href, children }) => {
    if (href?.startsWith('/')) {
      return <Link href={href}>{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  },
};
