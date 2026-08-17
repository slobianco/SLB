import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { Locale } from '@/i18n/routing';
import type { MerchItem } from '@/lib/data';
import { formatPrice } from '@/lib/format';
import styles from './merch.module.css';

export function MerchGrid({ items, locale }: { items: MerchItem[]; locale: Locale }) {
  const common = useTranslations('Common');

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <Card key={item.id} className={styles.item}>
          <div className={styles.imageWrap}>
            <Image src={item.image} alt={item.name} fill sizes="(max-width: 48rem) 100vw, 33vw" />
          </div>
          <div className={styles.itemBody}>
            <Badge>{item.category}</Badge>
            <h2>{item.name}</h2>
            <p>{item.variant}</p>
            <div className={styles.itemFooter}>
              <strong>{formatPrice(item.priceUsd, locale)}</strong>
              {item.purchaseUrl ? (
                <Button href={item.purchaseUrl} external size="small">
                  {common('buy')}
                </Button>
              ) : (
                <Button disabled size="small" variant="secondary">
                  {common('comingSoon')}
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
