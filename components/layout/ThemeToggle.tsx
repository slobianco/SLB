'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/lib/theme/ThemeProvider';
import styles from './layout.module.css';

export function ThemeToggle() {
  const translations = useTranslations('Theme');
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? translations('toLight') : translations('toDark');

  return (
    <button
      className={styles.iconButton}
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
