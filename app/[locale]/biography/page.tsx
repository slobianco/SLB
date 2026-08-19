import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Markdown } from '@/components/content/Markdown';
import { PageIntro } from '@/components/layout/PageIntro';
import { Container } from '@/components/ui/Container';
import { getBio } from '@/lib/data';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type BiographyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: BiographyPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'biography', '/biography');
}

export default async function BiographyPage({ params }: BiographyPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Biography' });
  const bio = getBio(locale);

  return (
    <main id="main-content">
      <PageIntro
        eyebrow={translations('eyebrow')}
        title={translations('title')}
        intro={translations('intro')}
      />
      <section className={styles.storySection}>
        <Container narrow>
          <article className={styles.story}>
            <h2>{bio.title}</h2>
            <Markdown content={bio.content} />
          </article>
        </Container>
      </section>
    </main>
  );
}
