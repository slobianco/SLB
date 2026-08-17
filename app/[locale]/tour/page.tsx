import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageIntro } from '@/components/layout/PageIntro';
import { TourList } from '@/components/tour/TourList';
import { Container } from '@/components/ui/Container';
import { getTourDates } from '@/lib/data';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type TourPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'tour', '/tour', '/images/hero-stage.jpg');
}

export default async function TourPage({ params }: TourPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Tour' });

  return (
    <main id="main-content">
      <PageIntro
        eyebrow={translations('eyebrow')}
        title={translations('title')}
        intro={translations('intro')}
      />
      <section className={styles.datesSection}>
        <Container>
          <TourList dates={getTourDates()} />
        </Container>
      </section>
    </main>
  );
}
