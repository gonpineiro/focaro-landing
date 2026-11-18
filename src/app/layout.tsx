import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/lib/content';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
    googleBot: {
      index: process.env.VERCEL_ENV !== 'preview',
      follow: process.env.VERCEL_ENV !== 'preview',
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [{ url: '/opengraph-image', alt: 'Focaro Digital: desarrollo web, sistemas y automatización' }],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/marca/logo-estructurado.svg`,
      description: site.description,
      sameAs: [site.instagram],
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: 'es-AR',
      publisher: { '@id': `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR">
      <body suppressHydrationWarning>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  );
}
