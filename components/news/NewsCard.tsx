import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { NewsPost } from '@/lib/data';
import { formatDate } from '@/lib/format';
import styles from './news.module.css';

export function NewsCard({
  post,
  locale,
  featured = false,
}: {
  post: NewsPost;
  locale: Locale;
  featured?: boolean;
}) {
  const common = useTranslations('Common');

  return (
    <Card className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <Link className={styles.imageWrap} href={`/news/${post.slug}`} aria-label={post.title}>
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes={featured ? '100vw' : '(max-width: 48rem) 100vw, 33vw'}
        />
      </Link>
      <div className={styles.body}>
        <div className={styles.meta}>
          <Badge>{post.category}</Badge>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
        </div>
        <h2>
          <Link href={`/news/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{post.excerpt}</p>
        <Link className={styles.readMore} href={`/news/${post.slug}`}>
          {common('readMore')} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
