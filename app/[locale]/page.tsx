import { ArrowRight, CalendarDays, Disc3 } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NewsCard } from '@/components/news/NewsCard';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getNews, getSongs, getTourDates } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './home.module.css';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'home', '/', '/images/hero-stage.jpg');
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Home' });
  const common = await getTranslations({ locale, namespace: 'Common' });
  const songs = getSongs(locale);
  const news = getNews(locale).slice(0, 2);
  const nextDate = getTourDates().find((date) => date.status !== 'past');
  const featuredSong = songs.find((song) => song.slug === 'cielo-rojo') ?? songs[0];

  return (
    <main id="main-content">
      <section className={styles.hero}>
        <Image
          src="/images/hero-stage.jpg"
          alt={translations('heroAlt')}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <Container className={styles.heroContent}>
          <p className={styles.eyebrow}>{translations('eyebrow')}</p>
          <h1>{translations('title')}</h1>
          <p className={styles.heroIntro}>{translations('intro')}</p>
          <div className={styles.heroActions}>
            <Button href="/album">
              <Disc3 aria-hidden="true" />
              {translations('primaryCta')}
            </Button>
            <Button href="/tour" variant="secondary">
              <CalendarDays aria-hidden="true" />
              {translations('secondaryCta')}
            </Button>
          </div>
        </Container>
        <span className={styles.heroIndex} aria-hidden="true">
          CR / 01
        </span>
      </section>

      <section className={styles.featuredSection}>
        <Container className={styles.featuredGrid}>
          <div className={styles.coverWrap}>
            <Image
              src="/images/album/cielo-rojo-cover.jpg"
              alt={translations('coverAlt')}
              width={1200}
              height={1200}
              sizes="(max-width: 48rem) 100vw, 45vw"
            />
          </div>
          <div className={styles.featuredCopy}>
            <p className={styles.eyebrow}>{translations('featuredEyebrow')}</p>
            <h2>{translations('featuredTitle')}</h2>
            <p>{translations('featuredBody')}</p>
            <div className={styles.trackMeta}>
              <span>{String(featuredSong.trackNumber).padStart(2, '0')}</span>
              <strong>{featuredSong.title}</strong>
              <span>{featuredSong.duration}</span>
            </div>
            <Button href={`/album/${featuredSong.slug}`}>
              {common('listen')}
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      <section className={styles.newsSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>{translations('newsEyebrow')}</p>
              <h2>{translations('newsTitle')}</h2>
            </div>
            <Button href="/news" variant="ghost">
              {common('viewAll')} <ArrowRight aria-hidden="true" />
            </Button>
          </div>
          <div className={styles.newsGrid}>
            {news.map((post) => (
              <NewsCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      {nextDate ? (
        <section className={styles.tourCallout}>
          <Container className={styles.tourInner}>
            <div>
              <p className={styles.eyebrow}>{translations('tourEyebrow')}</p>
              <h2>{translations('tourTitle')}</h2>
            </div>
            <div className={styles.nextDate}>
              <time dateTime={nextDate.date}>{formatDate(nextDate.date, locale)}</time>
              <strong>{nextDate.city}</strong>
              <span>{nextDate.venue}</span>
            </div>
            <Button href="/tour" variant="secondary">
              {common('details')} <ArrowRight aria-hidden="true" />
            </Button>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
