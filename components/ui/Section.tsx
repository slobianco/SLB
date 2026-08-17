import type { ReactNode } from 'react';
import styles from './primitives.module.css';

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: 'default' | 'raised' | 'contrast';
};

export function Section({ children, className = '', id, tone = 'default' }: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${styles[tone]} ${className}`.trim()}>
      {children}
    </section>
  );
}
