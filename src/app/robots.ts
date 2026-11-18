import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === 'preview';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    ...(!isPreview && { sitemap: `${site.url}/sitemap.xml` }),
  };
}
