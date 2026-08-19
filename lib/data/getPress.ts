import type { Locale } from '../../i18n/routing';
import {
  contentFileExists,
  isSafeSlug,
  listContentDirectories,
  readMdxFile,
  readOptionalString,
  requireString,
} from './files';
import type { PressItem, PressItemType } from './types';

const pressItemTypes: PressItemType[] = ['interview', 'review', 'feature', 'announcement'];

function readPressItem(locale: Locale, slug: string): PressItem {
  const { frontmatter, content } = readMdxFile('press', slug, `${locale}.mdx`);
  const context = `content/press/${slug}/${locale}.mdx`;
  const type = requireString(frontmatter, 'type', context);

  if (!pressItemTypes.includes(type as PressItemType)) {
    throw new Error(`${context}.type is invalid`);
  }

  return {
    id: requireString(frontmatter, 'id', context),
    slug,
    type: type as PressItemType,
    title: requireString(frontmatter, 'title', context),
    summary: requireString(frontmatter, 'summary', context),
    date: requireString(frontmatter, 'date', context),
    publication: readOptionalString(frontmatter, 'publication'),
    image: readOptionalString(frontmatter, 'image'),
    content,
    externalUrl: readOptionalString(frontmatter, 'externalUrl'),
  };
}

export function getPressItems(locale: Locale): PressItem[] {
  return listContentDirectories('press')
    .map((slug) => readPressItem(locale, slug))
    .sort((first, second) => second.date.localeCompare(first.date));
}

export function getPressItem(locale: Locale, slug: string): PressItem | null {
  if (!isSafeSlug(slug) || !contentFileExists('press', slug, `${locale}.mdx`)) {
    return null;
  }

  return readPressItem(locale, slug);
}
