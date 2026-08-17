import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '../i18n/routing';

export type MetadataPage =
  'home' | 'biography' | 'album' | 'tour' | 'merch' | 'news' | 'contact' | 'designSystem';

export async function getPageMetadata(
  locale: Locale,
  page: MetadataPage,
  pathname: string,
  image = '/images/album/cielo-rojo-cover.jpg',
): Promise<Metadata> {
  const translations = await getTranslations({ locale, namespace: 'Metadata' });
  const title = translations(`${page}.title`);
  const description = translations(`${page}.description`);
  const localizedPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        en: pathname === '/' ? '/en' : `/en${pathname}`,
        es: pathname === '/' ? '/es' : `/es${pathname}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      url: localizedPath,
      siteName: 'Cielo Rojo',
      images: [{ url: image, width: 1200, height: 1200, alt: 'Cielo Rojo' }],
    },
  };
}
