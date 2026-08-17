import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TrackList } from '@/components/album/TrackList';
import { PageIntro } from '@/components/layout/PageIntro';
import { Badge } from '@/components/ui/Badge';
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
              src="/images/album/cielo-rojo-cover.jpg"
              alt={translations('coverAlt')}
              width={1200}
              height={1200}
              sizes="(max-width: 50rem) 100vw, 40vw"
              priority
            />
          </div>
          <div className={styles.albumDetails}>
            <div className={styles.badges}>
              <Badge>{translations('concept')}</Badge>
              <Badge>{translations('release')}</Badge>
              <Badge>{translations('year')}</Badge>
            </div>
            <h2>{translations('tracklist')}</h2>
            <TrackList songs={songs} />
          </div>
        </Container>
      </section>
    </main>
  );
}
