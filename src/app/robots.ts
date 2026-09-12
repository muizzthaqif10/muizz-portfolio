import type { MetadataRoute } from 'next';
import { seo } from '@/data/profile';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${seo.url}/sitemap.xml`,
  };
}
