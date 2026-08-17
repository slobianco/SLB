import { Radio } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Song } from '@/lib/data';
import styles from './album.module.css';

function getEmbedUrl(song: Song) {
  if (song.streamingLinks.spotify.includes('open.spotify.com/')) {
    return song.streamingLinks.spotify.replace('open.spotify.com/', 'open.spotify.com/embed/');
  }

  if (song.streamingLinks.youtube) {
    try {
      const url = new URL(song.streamingLinks.youtube);
      const videoId = url.hostname.includes('youtu.be')
        ? url.pathname.slice(1)
        : url.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
      return null;
    }
  }

  return null;
}

export function PlayerEmbed({ song }: { song: Song }) {
  const translations = useTranslations('Album');
  const embedUrl = getEmbedUrl(song);

  if (embedUrl) {
    return (
      <div className={styles.playerFrame}>
        <iframe
          src={embedUrl}
          title={`${translations('playerTitle')}: ${song.title}`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={styles.playerEmpty}>
      <Radio aria-hidden="true" />
      <div>
        <h2>{translations('playerTitle')}</h2>
        <p>{translations('playerUnavailable')}</p>
      </div>
    </div>
  );
}
