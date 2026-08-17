import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PlayerEmbed } from '@/components/album/PlayerEmbed';
import { Markdown } from '@/components/content/Markdown';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getSong, getSongs } from '@/lib/data';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type TrackPageProps = {
  params: Promise<{ locale: string; track: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getSongs(locale).map((song) => ({ locale, track: song.slug })),
  );
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  const { track } = await params;
  const song = getSong(locale, track);

  if (!song) notFound();

  const baseMetadata = await getPageMetadata(locale, 'album', `/album/${track}`);
  const translations = await getTranslations({ locale, namespace: 'Album' });
  return {
    ...baseMetadata,
    title: translations('lyricsMetadataTitle', { title: song.title }),
    description: translations('lyricsMetadataDescription', { title: song.title }),
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const locale = await getLocale(params);
  const { track } = await params;
  const song = getSong(locale, track);

  if (!song) notFound();

  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Album' });

  return (
    <main id="main-content">
      <header className={styles.trackHeader}>
        <Container>
          <Link className={styles.backLink} href="/album">
            <ChevronLeft aria-hidden="true" /> {translations('backToAlbum')}
          </Link>
          <div className={styles.headerMeta}>
            <span>CR / {String(song.trackNumber).padStart(2, '0')}</span>
            <Badge>{song.theme}</Badge>
          </div>
          <h1>{song.title}</h1>
          <p>{song.duration}</p>
        </Container>
      </header>
      <section className={styles.trackBody}>
        <Container className={styles.trackGrid}>
          <article>
            <h2>{translations('lyricsHeading')}</h2>
            <Markdown content={song.content} className={styles.lyrics} />
          </article>
          <aside>
            <PlayerEmbed song={song} />
          </aside>
        </Container>
      </section>
    </main>
  );
}
