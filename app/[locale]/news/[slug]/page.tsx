import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Markdown } from '@/components/content/Markdown';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getNews, getNewsPost } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type NewsPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getNews(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  const { slug } = await params;
  const post = getNewsPost(locale, slug);

  if (!post) notFound();

  const baseMetadata = await getPageMetadata(locale, 'news', `/news/${slug}`, post.coverImage);
  return {
    ...baseMetadata,
    title: post.title,
    description: post.excerpt,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const post = getNewsPost(locale, slug);

  if (!post) notFound();

  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'News' });

  return (
    <main id="main-content">
      <article>
        <header className={styles.articleHeader}>
          <Container narrow>
            <Link className={styles.backLink} href="/news">
              <ChevronLeft aria-hidden="true" /> {translations('backToNews')}
            </Link>
            <div className={styles.meta}>
              <Badge>{post.category}</Badge>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
            </div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
          </Container>
        </header>
        <Container className={styles.cover}>
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 80rem) calc(100vw - 4rem), 76rem"
          />
        </Container>
        <section className={styles.articleBody}>
          <Container narrow>
            <Markdown content={post.content} />
          </Container>
        </section>
      </article>
    </main>
  );
}
