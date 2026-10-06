import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TrackList } from '@/components/album/TrackList';
import { ClockMotif } from '@/components/home/ClockMotif';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { album, getSongs } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type AlbumPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'album', '/album', album.coverImage);
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Album' });
  const songs = getSongs(locale);
  const releaseDate = formatDate(album.releaseDate, locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main id="main-content" className={styles.albumPage}>
      <section className={styles.albumHero}>
        <ClockMotif className={styles.heroClock} />
        <Container className={styles.albumHeroGrid}>
          <div className={styles.cover}>
            <Image
              src={album.coverImage}
              alt={translations('coverAlt')}
              width={1200}
              height={1200}
              sizes="(max-width: 50rem) 100vw, 42vw"
              priority
            />
          </div>
          <div className={styles.albumIntro}>
            <p className={styles.eyebrow}>{translations('eyebrow')}</p>
            <h1>{album.title}</h1>
            <p className={styles.albumArtist}>{album.artist}</p>
            <p className={styles.albumDescription}>{translations('intro')}</p>
            <div className={styles.albumFacts}>
              <div>
                <span>{translations('releaseLabel')}</span>
                <time dateTime={album.releaseDate}>{releaseDate}</time>
              </div>
              <div>
                <span>{translations('tracksLabel')}</span>
                <strong>{songs.length}</strong>
              </div>
            </div>
            <Button href={`/album/${songs[0].slug}`}>
              {translations('beginCta')} <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>
      <section className={styles.albumSection}>
        <Container>
          <div className={styles.tracklistHeader}>
            <p className={styles.eyebrow}>01—11 / {translations('sequenceLabel')}</p>
            <div>
              <h2>{translations('tracklist')}</h2>
              <p>{translations('tracklistIntro')}</p>
            </div>
          </div>
          <TrackList songs={songs} />
        </Container>
      </section>
      <section className={styles.backCoverSection}>
        <Container className={styles.backCoverGrid}>
          <div className={styles.backCoverCopy}>
            <p className={styles.eyebrow}>12 / {translations('backCoverHeading')}</p>
            <h2>{translations('backCoverTitle')}</h2>
            <p>{translations('backCoverIntro')}</p>
          </div>
          <div className={styles.backCover}>
            <Image
              src={album.backCoverImage}
              alt={translations('backCoverAlt')}
              width={1200}
              height={1200}
              sizes="(max-width: 56rem) 100vw, 58vw"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
