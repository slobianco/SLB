import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageIntro } from '@/components/layout/PageIntro';
import { PressCard } from '@/components/press/PressCard';
import { Container } from '@/components/ui/Container';
import { getPressItems } from '@/lib/data';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type PressPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PressPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'press', '/press');
}

export default async function PressPage({ params }: PressPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Press' });
  const items = getPressItems(locale);

  return (
    <main id="main-content">
      <PageIntro
        eyebrow={translations('eyebrow')}
        title={translations('title')}
        intro={translations('intro')}
      />
      <section className={styles.pressSection}>
        <Container>
          {items.length > 0 ? (
            <>
              <p className={styles.featuredEyebrow}>{translations('featuredLabel')}</p>
              <div className={styles.grid}>
                {items.map((item, index) => (
                  <PressCard key={item.slug} item={item} locale={locale} featured={index === 0} />
                ))}
              </div>
            </>
          ) : (
            <p>{translations('empty')}</p>
          )}
        </Container>
      </section>
    </main>
  );
}
