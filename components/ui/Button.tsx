import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import styles from './primitives.module.css';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'small';
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick' | 'type'>;

export function Button({
  children,
  className = '',
  href,
  external = false,
  variant = 'primary',
  size = 'default',
  ...buttonProps
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

  if (href && external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
