import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TrackList } from '@/components/album/TrackList';
import { Markdown } from '@/components/content/Markdown';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getPressItem, getPressItems, getSongs } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type PressItemPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPressItems(locale).map((item) => ({ locale, slug: item.slug })),
  );
}

export async function generateMetadata({ params }: PressItemPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  const { slug } = await params;
  const item = getPressItem(locale, slug);

  if (!item) notFound();

  const baseMetadata = await getPageMetadata(locale, 'press', `/press/${slug}`, item.image);
  return {
    ...baseMetadata,
    title: item.title,
    description: item.summary,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: item.date,
    },
  };
}

export default async function PressItemPage({ params }: PressItemPageProps) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const item = getPressItem(locale, slug);

  if (!item) notFound();

  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Press' });
  const songs = getSongs(locale);

  return (
    <main id="main-content">
      <article>
        <header className={styles.articleHeader}>
          <Container narrow>
            <Link className={styles.backLink} href="/press">
              <ChevronLeft aria-hidden="true" /> {translations('backToPress')}
            </Link>
            <div className={styles.meta}>
              <Badge>{translations(`type.${item.type}`)}</Badge>
              <span className={styles.metaDivider} aria-hidden="true">
                ·
              </span>
              <time dateTime={item.date}>
                {formatDate(item.date, locale, { month: 'long', year: 'numeric' })}
              </time>
            </div>
            <h1>{item.title}</h1>
            <p>{item.summary}</p>
            {item.isPrototype ? (
              <p className={styles.disclaimer}>{translations('disclaimer')}</p>
            ) : null}
          </Container>
        </header>
        {item.image ? (
          <Container className={styles.cover}>
            <Image
              src={item.image}
              alt=""
              fill
              priority
              sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 80rem) calc(100vw - 4rem), 76rem"
            />
          </Container>
        ) : null}
        <section className={styles.articleBody}>
          <Container narrow>
            <Markdown content={item.content} className={styles.interviewBody} />
          </Container>
        </section>
        <section className={styles.albumSection}>
          <Container narrow>
            <h2>{translations('aboutAlbum')}</h2>
            <TrackList songs={songs} />
          </Container>
        </section>
      </article>
    </main>
  );
}
