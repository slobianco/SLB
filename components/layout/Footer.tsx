import { Camera, Disc3, Play, Radio, Users, Video, type LucideIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/i18n/routing';
import { album, getSocialLinks, type SocialLink } from '@/lib/data';
import { formatDate } from '@/lib/format';
import styles from './layout.module.css';

const footerLinks = [
  { href: '/album', key: 'album' },
  { href: '/press/santiago-lo-bianco-interview', key: 'interview' },
  { href: '/contact', key: 'contact' },
] as const;

const socialIcons: Record<SocialLink['platform'], LucideIcon> = {
  instagram: Camera,
  youtube: Play,
  spotify: Disc3,
  bandcamp: Radio,
  tiktok: Video,
  facebook: Users,
};

export function Footer() {
  const footer = useTranslations('Footer');
  const navigation = useTranslations('Navigation');
  const locale = useLocale() as Locale;
  const socialLinks = getSocialLinks().filter((link) => link.url);
  const releaseDate = formatDate(album.releaseDate, locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Link className={styles.wordmark} href="/">
              <span>Cielo</span> Rojo
            </Link>
            <p>{footer('tagline')}</p>
          </div>
          <div>
            <h2>{footer('explore')}</h2>
            <nav className={styles.footerNav}>
              {footerLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  {navigation(item.key)}
                </Link>
              ))}
            </nav>
          </div>
          {socialLinks.length > 0 ? (
            <div>
              <h2>{footer('follow')}</h2>
              <div className={styles.socialLinks}>
                {socialLinks.map(({ platform, url }) => {
                  const Icon = socialIcons[platform];
                  const label = platform.charAt(0).toUpperCase() + platform.slice(1);

                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      title={label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        <div className={styles.footerBottom}>
          <p>
            © {new Date().getFullYear()} Cielo Rojo. {footer('rights')}
          </p>
          <p>
            {footer('release')} <time dateTime={album.releaseDate}>{releaseDate}</time>
          </p>
        </div>
      </Container>
    </footer>
  );
}
