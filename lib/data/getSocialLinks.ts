import { readJsonFile, requireRecord, requireString } from './files';
import type { SocialLink, SocialPlatform } from './types';

const platforms: SocialPlatform[] = [
  'instagram',
  'youtube',
  'spotify',
  'bandcamp',
  'tiktok',
  'facebook',
];

export function getSocialLinks(): SocialLink[] {
  const record = requireRecord(readJsonFile('social-links.json'), 'content/social-links.json');

  return platforms.map((platform) => ({
    platform,
    url: requireString(record, platform, 'content/social-links.json'),
  }));
}
