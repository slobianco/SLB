'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import styles from './layout.module.css';

const navItems = [
  { href: '/', label: 'home' },
  { href: '/biography', label: 'biography' },
  { href: '/album', label: 'album' },
  { href: '/tour', label: 'tour' },
  { href: '/merch', label: 'merch' },
  { href: '/news', label: 'news' },
  { href: '/contact', label: 'contact' },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const translations = useTranslations('Navigation');

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  return (
    <>
      <a className={styles.skipLink} href="#main-content">
        {translations('skip')}
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link className={styles.wordmark} href="/" aria-label="Cielo Rojo">
            <span>Cielo</span> Rojo
          </Link>

          <nav className={styles.desktopNav} aria-label={translations('primaryLabel')}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {translations(item.label)}
              </Link>
            ))}
          </nav>

          <div className={styles.headerControls}>
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className={`${styles.iconButton} ${styles.menuButton}`}
              type="button"
              aria-label={menuOpen ? translations('closeMenu') : translations('openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}
        aria-label={translations('primaryLabel')}
        aria-hidden={!menuOpen}
      >
        <div>
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {translations(item.label)}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
