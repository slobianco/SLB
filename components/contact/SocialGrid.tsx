import { Camera, Disc3, Play, Radio, Users, Video, type LucideIcon } from 'lucide-react';
import type { SocialLink } from '@/lib/data';
import styles from './contact.module.css';

const icons: Record<SocialLink['platform'], LucideIcon> = {
  instagram: Camera,
  youtube: Play,
  spotify: Disc3,
  bandcamp: Radio,
  tiktok: Video,
  facebook: Users,
};

export function SocialGrid({ links }: { links: SocialLink[] }) {
  return (
    <div className={styles.socialGrid}>
      {links.map(({ platform, url }) => {
        const Icon = icons[platform];
        return (
          <a key={platform} href={url} target="_blank" rel="noreferrer">
            <Icon aria-hidden="true" />
            <span>{platform}</span>
          </a>
        );
      })}
    </div>
  );
}
