import type { Metadata } from 'next';
import { Barlow_Condensed, IBM_Plex_Sans } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import '@/styles/tokens.css';
import '@/styles/theme-dark.css';
import '@/styles/theme-light.css';
import '../globals.css';

const bodyFont = IBM_Plex_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const displayFont = Barlow_Condensed({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const themeScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem('cielo-rojo-theme');
      var systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      document.documentElement.dataset.theme = storedTheme || systemTheme;
    } catch (_) {
      document.documentElement.dataset.theme = 'dark';
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Cielo Rojo',
    template: '%s | Cielo Rojo',
  },
  description: 'The official home of Cielo Rojo.',
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${bodyFont.variable} ${displayFont.variable}`}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="site-shell">
              <Header />
              {children}
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
