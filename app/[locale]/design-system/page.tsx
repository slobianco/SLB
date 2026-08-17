import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type DesignSystemPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: DesignSystemPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'designSystem', '/design-system');
}

export default async function DesignSystemPage({ params }: DesignSystemPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'DesignSystem' });

  return (
    <main id="main-content">
      <Section>
        <Container>
          <p className={styles.eyebrow}>{translations('eyebrow')}</p>
          <h1>{translations('title')}</h1>
          <p className={styles.intro}>{translations('intro')}</p>
        </Container>
      </Section>
      <Section tone="raised">
        <Container>
          <div className={styles.grid}>
            <div>
              <h2>{translations('colors')}</h2>
              <div className={styles.swatches}>
                <span className={styles.accent}>Accent</span>
                <span className={styles.surface}>Surface</span>
                <span className={styles.steel}>Steel</span>
              </div>
            </div>
            <div>
              <h2>{translations('type')}</h2>
              <p className={styles.display}>{translations('displaySample')}</p>
              <p>{translations('bodySample')}</p>
            </div>
            <div>
              <h2>{translations('controls')}</h2>
              <div className={styles.controls}>
                <Button href="/album">{translations('primary')}</Button>
                <Button href="/tour" variant="secondary">
                  {translations('secondary')}
                </Button>
              </div>
            </div>
            <div>
              <h2>{translations('surfaces')}</h2>
              <Card className={styles.cardSample}>
                <Badge>Prototype</Badge>
                <h3>Cenizas y estrellas</h3>
                <p>{translations('bodySample')}</p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
