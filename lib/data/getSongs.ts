import type { Locale } from '../../i18n/routing';
import {
  contentFileExists,
  isSafeSlug,
  listContentDirectories,
  readMdxFile,
  readOptionalString,
  requireNumber,
  requireRecord,
  requireString,
} from './files';
import type { Song } from './types';

function readSong(locale: Locale, slug: string): Song {
  const { frontmatter, content } = readMdxFile('lyrics', slug, `${locale}.mdx`);
  const context = `content/lyrics/${slug}/${locale}.mdx`;
  const streamingLinks = requireRecord(frontmatter.streamingLinks, `${context}.streamingLinks`);

  return {
    slug,
    title: requireString(frontmatter, 'title', context),
    trackNumber: requireNumber(frontmatter, 'trackNumber', context),
    duration: readOptionalString(frontmatter, 'duration'),
    echo: readOptionalString(frontmatter, 'echo'),
    image: readOptionalString(frontmatter, 'image'),
    streamingLinks: {
      spotify: requireString(streamingLinks, 'spotify', `${context}.streamingLinks`),
      bandcamp: requireString(streamingLinks, 'bandcamp', `${context}.streamingLinks`),
      youtube: requireString(streamingLinks, 'youtube', `${context}.streamingLinks`),
    },
    content,
  };
}

export function getSongs(locale: Locale): Song[] {
  return listContentDirectories('lyrics')
    .map((slug) => readSong(locale, slug))
    .sort((first, second) => first.trackNumber - second.trackNumber);
}

export function getSong(locale: Locale, slug: string): Song | null {
  if (!isSafeSlug(slug) || !contentFileExists('lyrics', slug, `${locale}.mdx`)) {
    return null;
  }

  return readSong(locale, slug);
}
