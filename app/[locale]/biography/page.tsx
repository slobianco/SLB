import type { Metadata } from 'next';
import Image from 'next/image';
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
  return getPageMetadata(locale, 'biography', '/biography', '/images/biography/portrait.jpg');
}

export default async function BiographyPage({ params }: BiographyPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Biography' });
  const bio = getBio(locale);

  const facts = [
    [translations('origin'), translations('originValue')],
    [translations('genre'), translations('genreValue')],
    [translations('format'), translations('formatValue')],
  ];

  return (
    <main id="main-content">
      <PageIntro
        eyebrow={translations('eyebrow')}
        title={translations('title')}
        intro={translations('intro')}
      />
      <section className={styles.storySection}>
        <Container className={styles.storyGrid}>
          <div className={styles.portrait}>
            <Image
              src={bio.portraitImage}
              alt={translations('portraitAlt')}
              fill
              sizes="(max-width: 52rem) 100vw, 42vw"
              priority
            />
          </div>
          <article className={styles.story}>
            <h2>{bio.title}</h2>
            <Markdown content={bio.content} />
          </article>
          <aside className={styles.facts}>
            <h2>{translations('factsTitle')}</h2>
            <dl>
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>
      <section className={styles.gallerySection}>
        <Container>
          <h2>{translations('galleryTitle')}</h2>
          <div className={styles.gallery}>
            <div className={styles.galleryWide}>
              <Image
                src="/images/biography/studio.jpg"
                alt={translations('studioAlt')}
                fill
                sizes="66vw"
              />
            </div>
            <div>
              <Image
                src="/images/biography/guitar.jpg"
                alt={translations('guitarAlt')}
                fill
                sizes="33vw"
              />
            </div>
            <div>
              <Image
                src="/images/biography/live.jpg"
                alt={translations('liveAlt')}
                fill
                sizes="33vw"
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
