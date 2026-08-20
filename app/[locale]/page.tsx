import { ArrowRight, CalendarDays, Disc3 } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ClockMotif } from '@/components/home/ClockMotif';
import { HeroCarousel, type HeroSlide } from '@/components/home/HeroCarousel';
import { NewsCard } from '@/components/news/NewsCard';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
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
  return getPageMetadata(locale, 'home', '/', '/images/hero-stage.png');
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Home' });
  const common = await getTranslations({ locale, namespace: 'Common' });
  const songs = getSongs(locale);
  const news = getNews(locale).slice(0, 2);
  const nextDate = getTourDates().find((date) => date.status !== 'past');
  const featuredSong = songs.find((song) => song.slug === 'silent-memory') ?? songs[0];

  return (
    <main id="main-content">
      <HeroCarousel
        slides={
          [
            {
              image: '/images/hero-stage.png',
              alt: translations('heroAlt'),
              eyebrow: translations('eyebrow'),
              title: translations('title'),
              intro: translations('intro'),
              ctas: [
                {
                  href: '/album',
                  label: translations('primaryCta'),
                  icon: <Disc3 aria-hidden="true" />,
                },
                {
                  href: '/tour',
                  label: translations('secondaryCta'),
                  icon: <CalendarDays aria-hidden="true" />,
                  variant: 'secondary',
                },
              ],
            },
            {
              image: '/images/press/santiago-lo-bianco-interview.jpg',
              alt: translations('hero2Alt'),
              eyebrow: translations('hero2Eyebrow'),
              title: translations('hero2Title'),
              intro: translations('hero2Intro'),
              ctas: [
                {
                  href: '/press/santiago-lo-bianco-interview',
                  label: translations('hero2Cta'),
                  icon: <ArrowRight aria-hidden="true" />,
                },
              ],
            },
          ] satisfies HeroSlide[]
        }
        previousLabel={translations('heroPrevious')}
        nextLabel={translations('heroNext')}
        slideLabels={[
          translations('heroGoToSlide', { number: 1 }),
          translations('heroGoToSlide', { number: 2 }),
        ]}
      />

      <ScrollReveal>
        <section className={styles.featuredSection}>
          <Container className={styles.featuredGrid}>
            <div className={styles.coverWrap}>
              <Image
                src={featuredSong.image ?? '/images/album/cielo-rojo-cover.png'}
                alt={featuredSong.image ? featuredSong.title : translations('coverAlt')}
                width={1200}
                height={1200}
                sizes="(max-width: 48rem) 100vw, 45vw"
              />
            </div>
            <div className={styles.featuredCopy}>
              <p className={styles.eyebrow}>{translations('featuredEyebrow')}</p>
              <h2>{featuredSong.title}</h2>
              <p>{featuredSong.echo}</p>
              <div className={styles.trackMeta}>
                <span>{String(featuredSong.trackNumber).padStart(2, '0')}</span>
                <strong>{featuredSong.title}</strong>
                {featuredSong.duration ? <span>{featuredSong.duration}</span> : null}
              </div>
              <Button href={`/album/${featuredSong.slug}`}>
                {common('listen')}
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </Container>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.spotlightSection}>
          <Container narrow className={styles.spotlightInner}>
            <p className={styles.eyebrow}>{translations('spotlightEyebrow')}</p>
            <blockquote className={styles.spotlightQuote}>
              <p>{translations('spotlightQuote')}</p>
              <cite>{translations('spotlightAttribution')}</cite>
            </blockquote>
            <Button href="/press/santiago-lo-bianco-interview" variant="ghost">
              {translations('spotlightCta')} <ArrowRight aria-hidden="true" />
            </Button>
          </Container>
        </section>
      </ScrollReveal>

      {news.length > 0 ? (
        <ScrollReveal>
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
        </ScrollReveal>
      ) : null}

      {nextDate ? (
        <ScrollReveal>
          <section className={styles.tourCallout}>
            <ClockMotif className={styles.tourMotif} />
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
        </ScrollReveal>
      ) : null}
    </main>
  );
}
