import { ShoppingBag } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageIntro } from '@/components/layout/PageIntro';
import { MerchGrid } from '@/components/merch/MerchGrid';
import { Container } from '@/components/ui/Container';
import { getMerch } from '@/lib/data';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type MerchPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MerchPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'merch', '/merch', '/images/merch/vinyl.jpg');
}

export default async function MerchPage({ params }: MerchPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Merch' });

  return (
    <main id="main-content">
      <PageIntro
        eyebrow={translations('eyebrow')}
        title={translations('title')}
        intro={translations('intro')}
      />
      <section className={styles.merchSection}>
        <Container>
          <div className={styles.notice}>
            <ShoppingBag aria-hidden="true" />
            <div>
              <h2>{translations('shopNotice')}</h2>
              <p>{translations('shopNoticeBody')}</p>
            </div>
          </div>
          <MerchGrid items={getMerch(locale)} locale={locale} />
        </Container>
      </section>
    </main>
  );
}
