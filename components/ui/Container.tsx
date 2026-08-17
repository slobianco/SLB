import type { ReactNode } from 'react';
import styles from './primitives.module.css';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Container({ children, className = '', narrow = false }: ContainerProps) {
  return (
    <div className={`${styles.container} ${narrow ? styles.narrow : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}
