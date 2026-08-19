import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TrackList } from '@/components/album/TrackList';
import { PageIntro } from '@/components/layout/PageIntro';
import { Container } from '@/components/ui/Container';
import { getSongs } from '@/lib/data';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type AlbumPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'album', '/album');
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Album' });
  const songs = getSongs(locale);

  return (
    <main id="main-content">
      <PageIntro
        eyebrow={translations('eyebrow')}
        title={translations('title')}
        intro={translations('intro')}
      />
      <section className={styles.albumSection}>
        <Container className={styles.albumGrid}>
          <div className={styles.cover}>
            <Image
              src="/images/album/cielo-rojo-cover.png"
              alt={translations('coverAlt')}
              width={1200}
              height={1200}
              sizes="(max-width: 50rem) 100vw, 40vw"
              priority
            />
          </div>
          <div className={styles.albumDetails}>
            <h2>{translations('tracklist')}</h2>
            <TrackList songs={songs} />
          </div>
        </Container>
      </section>
      <section className={styles.backCoverSection}>
        <Container>
          <h2>{translations('backCoverHeading')}</h2>
          <div className={styles.backCover}>
            <Image
              src="/images/album/cielo-rojo-back-cover.png"
              alt={translations('backCoverAlt')}
              width={1200}
              height={1200}
              sizes="(max-width: 40rem) 100vw, 28rem"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
