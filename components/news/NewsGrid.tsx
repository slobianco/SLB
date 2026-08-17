import type { Locale } from '@/i18n/routing';
import type { NewsPost } from '@/lib/data';
import { NewsCard } from './NewsCard';
import styles from './news.module.css';

export function NewsGrid({ posts, locale }: { posts: NewsPost[]; locale: Locale }) {
  return (
    <div className={styles.grid}>
      {posts.map((post, index) => (
        <NewsCard key={post.slug} post={post} locale={locale} featured={index === 0} />
      ))}
    </div>
  );
}
