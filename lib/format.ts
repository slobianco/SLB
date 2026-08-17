import type { Locale } from '../i18n/routing';

export function formatDate(date: string, locale: Locale, options?: Intl.DateTimeFormatOptions) {
  const formatOptions = options ?? {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    ...formatOptions,
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}

export function formatPrice(priceUsd: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(priceUsd);
}
