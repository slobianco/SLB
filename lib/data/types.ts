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
  duration?: string;
  /** A short reflective line or question left with the listener after the song. */
  echo?: string;
  /** Optional track-specific artwork; falls back to the main album cover when absent. */
  image?: string;
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
  /**
   * True for fictional/demo tour dates used to prototype this section before real dates are
   * announced. Explicitly authorised as placeholder content — see docs/CONTENT-GUIDE.md. Never
   * treat isPrototype dates as confirmed real-world Cielo Rojo events.
   */
  isPrototype?: boolean;
};

export type MerchCategory = 'apparel' | 'music' | 'accessories' | 'art';

export type MerchItem = {
  id: string;
  name: string;
  variant?: string;
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

export type PressItemType = 'interview' | 'review' | 'feature' | 'announcement';

export type PressItem = {
  id: string;
  slug: string;
  type: PressItemType;
  title: string;
  summary: string;
  date: string;
  publication?: string;
  /** Optional hero image; omit rather than inventing stock photography when none is supplied. */
  image?: string;
  content: string;
  /** True for fictional/demo editorial content — see docs/CONTENT-GUIDE.md. Never treat as real coverage. */
  isPrototype?: boolean;
  externalUrl?: string;
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
