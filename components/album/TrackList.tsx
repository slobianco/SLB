import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Song } from '@/lib/data';
import styles from './album.module.css';

export function TrackList({ songs }: { songs: Song[] }) {
  const translations = useTranslations('Album');

  return (
    <ol className={styles.trackList}>
      {songs.map((song) => (
        <li key={song.slug}>
          <Link
            href={`/album/${song.slug}`}
            aria-label={translations('openLyrics', { title: song.title })}
          >
            <span className={styles.trackNumber}>{String(song.trackNumber).padStart(2, '0')}</span>
            <span className={styles.trackIdentity}>
              <strong>{song.title}</strong>
              <small>{song.theme}</small>
            </span>
            <span className={styles.duration}>{song.duration}</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ol>
  );
}
