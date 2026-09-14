import type { Metadata } from 'next';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { Footer } from '@/components/layout/Footer';
import { seo, profile } from '@/data/profile';

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: {
    default: seo.title,
    template: `%s | ${profile.fullName}`,
  },
  description: seo.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    siteName: seo.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
          >
            Skip to content
          </a>
          <SiteChrome>
            <main id="main-content">{children}</main>
            <Footer />
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
