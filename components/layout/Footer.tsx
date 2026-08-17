import { Camera, Disc3, Play, Radio, Users, Video, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { getSocialLinks, type SocialLink } from '@/lib/data';
import styles from './layout.module.css';

const footerLinks = [
  { href: '/biography', key: 'biography' },
  { href: '/album', key: 'album' },
  { href: '/tour', key: 'tour' },
  { href: '/merch', key: 'merch' },
  { href: '/news', key: 'news' },
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
  const socialLinks = getSocialLinks();

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
        </div>
        <div className={styles.footerBottom}>
          <p>
            © {new Date().getFullYear()} Cielo Rojo. {footer('rights')}
          </p>
          <p>{footer('prototype')}</p>
        </div>
      </Container>
    </footer>
  );
}
