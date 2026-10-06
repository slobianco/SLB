import { ArrowDown, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ClockMotif } from '@/components/home/ClockMotif';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { album, getSongs } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './home.module.css';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'home', '/', album.coverImage);
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Home' });
  const songs = getSongs(locale);
  const firstSong = songs[0];
  const releaseDate = formatDate(album.releaseDate, locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main id="main-content" className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <Image
          src={album.coverImage}
          alt={translations('coverAlt')}
          fill
          priority
          sizes="100vw"
          className={styles.heroArtwork}
        />
        <div className={styles.heroVeil} />
        <Container className={styles.heroInner}>
          <div className={styles.heroMeta} aria-hidden="true">
            <span>SLB / CR</span>
            <span>01—11</span>
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{translations('artist')}</p>
            <h1 id="home-title">
              <span>Cielo</span>
              <span>Rojo</span>
            </h1>
            <div className={styles.heroDetails}>
              <p>{translations('intro')}</p>
              <div className={styles.releaseMeta}>
                <span>{translations('releaseLabel')}</span>
                <time dateTime={album.releaseDate}>{releaseDate}</time>
              </div>
              <div className={styles.heroActions}>
                <Button href={`/album/${firstSong.slug}`}>
                  {translations('beginCta')} <ArrowRight aria-hidden="true" />
                </Button>
                <Button href="/album" variant="secondary">
                  {translations('tracklistCta')}
                </Button>
              </div>
            </div>
          </div>
          <a className={styles.scrollCue} href="#journey">
            {translations('scrollCta')} <ArrowDown aria-hidden="true" />
          </a>
        </Container>
      </section>

      <section className={styles.prologue}>
        <ClockMotif className={styles.prologueClock} />
        <Container className={styles.prologueGrid}>
          <p className={styles.chapterLabel}>00 / {translations('journeyEyebrow')}</p>
          <div>
            <h2>{translations('journeyTitle')}</h2>
            <p>{translations('journeyIntro')}</p>
          </div>
        </Container>
      </section>

      <section id="journey" className={styles.journey}>
        <Container>
          <header className={styles.journeyHeader}>
            <p className={styles.chapterLabel}>01—11 / {translations('tracksEyebrow')}</p>
            <h2>{translations('tracksTitle')}</h2>
          </header>
          <ol className={styles.trackJourney}>
            {songs.map((song) => (
              <li key={song.slug}>
                <Link
                  href={`/album/${song.slug}`}
                  aria-label={translations('openTrack', { title: song.title })}
                >
                  <span className={styles.trackNumber}>
                    {String(song.trackNumber).padStart(2, '0')}
                  </span>
                  <span className={styles.trackIdentity}>
                    <strong>{song.title}</strong>
                    {song.echo ? <span>{song.echo}</span> : null}
                  </span>
                  <span className={styles.trackTick} aria-hidden="true" />
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={styles.firstEcho} aria-labelledby="first-echo-title">
        <Image
          src={firstSong.image ?? album.coverImage}
          alt=""
          fill
          sizes="100vw"
          className={styles.echoArtwork}
        />
        <div className={styles.echoVeil} />
        <Container className={styles.echoInner}>
          <p className={styles.chapterLabel}>01 / {translations('featuredEyebrow')}</p>
          <h2 id="first-echo-title">{firstSong.title}</h2>
          {firstSong.echo ? <blockquote>{firstSong.echo}</blockquote> : null}
          <Button href={`/album/${firstSong.slug}`} variant="secondary">
            {translations('featuredCta')} <ArrowRight aria-hidden="true" />
          </Button>
        </Container>
      </section>

      <section className={styles.release}>
        <ClockMotif className={styles.releaseClock} />
        <Container className={styles.releaseInner}>
          <p className={styles.chapterLabel}>12 / {translations('releaseEyebrow')}</p>
          <h2>{translations('releaseTitle')}</h2>
          <time dateTime={album.releaseDate}>{releaseDate}</time>
          <p>{translations('releaseBody')}</p>
          <Button href="/album" variant="secondary">
            {translations('albumCta')} <ArrowRight aria-hidden="true" />
          </Button>
        </Container>
      </section>
    </main>
  );
}
