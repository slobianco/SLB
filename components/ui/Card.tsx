import type { ReactNode } from 'react';
import styles from './primitives.module.css';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return <article className={`${styles.card} ${className}`.trim()}>{children}</article>;
}
