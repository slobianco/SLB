'use client';

import { useLocale, useTranslations } from 'next-intl';
import { startTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import styles from './layout.module.css';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const translations = useTranslations('Language');

  function changeLocale(nextLocale: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className={styles.languageSwitcher} aria-label={translations('label')} role="group">
      <button
        type="button"
        aria-label={translations('english')}
        aria-pressed={locale === 'en'}
        onClick={() => changeLocale('en')}
      >
        EN
      </button>
      <button
        type="button"
        aria-label={translations('spanish')}
        aria-pressed={locale === 'es'}
        onClick={() => changeLocale('es')}
      >
        ES
      </button>
    </div>
  );
}
