import { Container } from '@/components/ui/Container';
import styles from './pageIntro.module.css';

type PageIntroProps = {
  eyebrow: string;
  title: string;
  intro: string;
};

export function PageIntro({ eyebrow, title, intro }: PageIntroProps) {
  return (
    <div className={styles.pageIntro}>
      <Container>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.intro}>{intro}</p>
      </Container>
    </div>
  );
}
