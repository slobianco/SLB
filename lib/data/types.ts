import type { Locale } from '../../i18n/routing';

export type StreamingLinks = {
  spotify: string;
  bandcamp: string;
  youtube: string;
};

export type Song = {
  slug: string;
  title: string;
  trackNumber: number;
  duration: string;
  theme: string;
  streamingLinks: StreamingLinks;
  content: string;
};

export type TourStatus = 'on-sale' | 'coming-soon' | 'sold-out' | 'past';

export type TourDate = {
  id: string;
  date: string;
  city: string;
  country: string;
  venue: string;
  ticketUrl: string;
  status: TourStatus;
};

export type MerchCategory = 'apparel' | 'music' | 'accessories' | 'art';

export type MerchItem = {
  id: string;
  name: string;
  variant: string;
  priceUsd: number;
  image: string;
  purchaseUrl: string;
  category: MerchCategory;
};

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage: string;
  category: string;
  content: string;
};

export type BioContent = {
  title: string;
  updatedAt: string;
  portraitImage: string;
  content: string;
};

export type SocialPlatform =
  'instagram' | 'youtube' | 'spotify' | 'bandcamp' | 'tiktok' | 'facebook';

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type LocalizedText = Record<Locale, string>;
