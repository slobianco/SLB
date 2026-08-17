import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageIntro } from '@/components/layout/PageIntro';
import { NewsGrid } from '@/components/news/NewsGrid';
import { Container } from '@/components/ui/Container';
import { getNews } from '@/lib/data';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'news', '/news', '/images/news/album-arrives.jpg');
}

export default async function NewsPage({ params }: NewsPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'News' });

  return (
    <main id="main-content">
      <PageIntro
        eyebrow={translations('eyebrow')}
        title={translations('title')}
        intro={translations('intro')}
      />
      <section className={styles.newsSection}>
        <Container>
          <NewsGrid posts={getNews(locale)} locale={locale} />
        </Container>
      </section>
    </main>
  );
}
