import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { PressItem } from '@/lib/data';
import { formatDate } from '@/lib/format';
import styles from './press.module.css';

export function PressCard({
  item,
  locale,
  featured = false,
}: {
  item: PressItem;
  locale: Locale;
  featured?: boolean;
}) {
  const press = useTranslations('Press');

  return (
    <Card className={`${styles.card} ${featured ? styles.featured : ''}`}>
      {item.image ? (
        <Link className={styles.imageWrap} href={`/press/${item.slug}`} aria-label={item.title}>
          <Image
            src={item.image}
            alt=""
            fill
            sizes={featured ? '100vw' : '(max-width: 48rem) 100vw, 33vw'}
          />
        </Link>
      ) : null}
      <div className={styles.body}>
        <div className={styles.meta}>
          <Badge>{press(`type.${item.type}`)}</Badge>
          <span className={styles.metaDivider} aria-hidden="true">
            ·
          </span>
          <time dateTime={item.date}>
            {formatDate(item.date, locale, { month: 'long', year: 'numeric' })}
          </time>
        </div>
        <h2>
          <Link href={`/press/${item.slug}`}>{item.title}</Link>
        </h2>
        <p>{item.summary}</p>
        <Link className={styles.readMore} href={`/press/${item.slug}`}>
          {press('readInterview')} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
