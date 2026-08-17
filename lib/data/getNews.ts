import type { Locale } from '../../i18n/routing';
import {
  contentFileExists,
  isSafeSlug,
  listContentDirectories,
  readMdxFile,
  requireString,
} from './files';
import type { NewsPost } from './types';

function readNewsPost(locale: Locale, slug: string): NewsPost {
  const { frontmatter, content } = readMdxFile('news', slug, `${locale}.mdx`);
  const context = `content/news/${slug}/${locale}.mdx`;

  return {
    slug,
    title: requireString(frontmatter, 'title', context),
    excerpt: requireString(frontmatter, 'excerpt', context),
    publishedAt: requireString(frontmatter, 'publishedAt', context),
    coverImage: requireString(frontmatter, 'coverImage', context),
    category: requireString(frontmatter, 'category', context),
    content,
  };
}

export function getNews(locale: Locale): NewsPost[] {
  return listContentDirectories('news')
    .map((slug) => readNewsPost(locale, slug))
    .sort((first, second) => second.publishedAt.localeCompare(first.publishedAt));
}

export function getNewsPost(locale: Locale, slug: string): NewsPost | null {
  if (!isSafeSlug(slug) || !contentFileExists('news', slug, `${locale}.mdx`)) {
    return null;
  }

  return readNewsPost(locale, slug);
}
