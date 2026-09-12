import { slugify } from './utils';

export type Heading = {
  depth: 2 | 3;
  text: string;
  slug: string;
};

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n');
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.*)/.exec(line.trim());
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/[#*`]/g, '').trim();
    headings.push({ depth, text, slug: slugify(text) });
  }

  return headings;
}
