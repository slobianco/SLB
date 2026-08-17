import type { Locale } from '../../i18n/routing';
import { readMdxFile, requireString } from './files';
import type { BioContent } from './types';

export function getBio(locale: Locale): BioContent {
  const { frontmatter, content } = readMdxFile('bio', `${locale}.mdx`);
  const context = `content/bio/${locale}.mdx`;

  return {
    title: requireString(frontmatter, 'title', context),
    updatedAt: requireString(frontmatter, 'updatedAt', context),
    portraitImage: requireString(frontmatter, 'portraitImage', context),
    content,
  };
}
