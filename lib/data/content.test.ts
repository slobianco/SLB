import { describe, expect, it } from 'vitest';
import { getBio } from './getBio';
import { getMerch } from './getMerch';
import { getNews, getNewsPost } from './getNews';
import { getSocialLinks } from './getSocialLinks';
import { getSong, getSongs } from './getSongs';
import { getTourDates } from './getTourDates';

describe('file content accessors', () => {
  it.each(['en', 'es'] as const)('loads the complete %s album in track order', (locale) => {
    const songs = getSongs(locale);

    expect(songs).toHaveLength(10);
    expect(songs.map((song) => song.trackNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(songs.every((song) => song.content.length > 0)).toBe(true);
  });

  it('loads a known song and rejects unsafe or unknown slugs', () => {
    expect(getSong('en', 'cielo-rojo')?.title).toBe('Cielo Rojo');
    expect(getSong('en', '../bio/en')).toBeNull();
    expect(getSong('en', 'not-a-track')).toBeNull();
  });

  it('loads localized biography content', () => {
    expect(getBio('en').title).not.toBe(getBio('es').title);
    expect(getBio('en').content).toContain('placeholder');
  });

  it('loads news newest first and resolves a detail post', () => {
    const news = getNews('en');

    expect(news).toHaveLength(3);
    expect(news[0].publishedAt >= news[1].publishedAt).toBe(true);
    expect(getNewsPost('es', 'behind-the-music')?.content).toContain('habitación');
    expect(getNewsPost('en', '../../package')).toBeNull();
  });

  it('loads and validates tour dates', () => {
    const dates = getTourDates();

    expect(dates).toHaveLength(8);
    expect(dates.some((date) => date.status === 'past')).toBe(true);
    expect(dates.some((date) => date.status === 'on-sale')).toBe(true);
  });

  it('localizes merch and loads social links', () => {
    expect(getMerch('en')).toHaveLength(8);
    expect(getMerch('en')[0].name).not.toBe(getMerch('es')[0].name);
    expect(getSocialLinks()).toHaveLength(6);
  });
});
