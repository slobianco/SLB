'use client';

import { MapPin, Ticket } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/i18n/routing';
import type { TourDate, TourStatus } from '@/lib/data';
import { formatDate } from '@/lib/format';
import styles from './tour.module.css';

type Filter = 'all' | 'upcoming' | 'past';

const statusKeys: Record<TourStatus, 'onSale' | 'comingSoon' | 'soldOut' | 'past'> = {
  'on-sale': 'onSale',
  'coming-soon': 'comingSoon',
  'sold-out': 'soldOut',
  past: 'past',
};

export function TourList({ dates }: { dates: TourDate[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const locale = useLocale() as Locale;
  const tour = useTranslations('Tour');
  const common = useTranslations('Common');
  const visibleDates = dates.filter((date) => {
    if (filter === 'past') return date.status === 'past';
    if (filter === 'upcoming') return date.status !== 'past';
    return true;
  });

  return (
    <div>
      <div className={styles.filters} role="group" aria-label={tour('filterLabel')}>
        {(['all', 'upcoming', 'past'] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {tour(value)}
          </button>
        ))}
      </div>

      <div className={styles.dateList} aria-live="polite">
        {visibleDates.length === 0 ? <p className={styles.empty}>{tour('empty')}</p> : null}
        {visibleDates.map((date) => (
          <article className={styles.dateRow} key={date.id}>
            <time dateTime={date.date} className={styles.dateBlock}>
              <span>{formatDate(date.date, locale, { month: 'short' })}</span>
              <strong>{formatDate(date.date, locale, { day: '2-digit' })}</strong>
              <small>{formatDate(date.date, locale, { year: 'numeric' })}</small>
            </time>
            <div className={styles.location}>
              <h2>{date.city}</h2>
              <p>
                <MapPin aria-hidden="true" />
                {date.venue}, {date.country}
              </p>
            </div>
            <span className={`${styles.status} ${styles[date.status.replace('-', '')]}`}>
              {common(statusKeys[date.status])}
            </span>
            {date.ticketUrl ? (
              <Button href={date.ticketUrl} external size="small">
                <Ticket aria-hidden="true" />
                {common('tickets')}
              </Button>
            ) : (
              <Button disabled size="small">
                {common(date.status === 'past' ? 'past' : 'comingSoon')}
              </Button>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
