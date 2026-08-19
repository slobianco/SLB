import { describe, expect, it } from 'vitest';
import { getBio } from './getBio';
import { getMerch } from './getMerch';
import { getNews, getNewsPost } from './getNews';
import { getPressItem, getPressItems } from './getPress';
import { getSocialLinks } from './getSocialLinks';
import { getSong, getSongs } from './getSongs';
import { getTourDates } from './getTourDates';

describe('file content accessors', () => {
  it.each(['en', 'es'] as const)('loads the complete %s album in track order', (locale) => {
    const songs = getSongs(locale);

    expect(songs).toHaveLength(11);
    expect(songs.map((song) => song.trackNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(songs.every((song) => song.content.length > 0)).toBe(true);
  });

  it('never translates track titles between locales', () => {
    const enTitles = getSongs('en').map((song) => song.title);
    const esTitles = getSongs('es').map((song) => song.title);

    expect(esTitles).toEqual(enTitles);
  });

  it('loads a known song and rejects unsafe or unknown slugs', () => {
    expect(getSong('en', 'cielo-rojo')?.title).toBe('Cielo Rojo');
    expect(getSong('en', '../bio/en')).toBeNull();
    expect(getSong('en', 'not-a-track')).toBeNull();
  });

  it('loads localized biography content', () => {
    expect(getBio('en').title).not.toBe(getBio('es').title);
    expect(getBio('en').content).toContain('TODO');
  });

  it('has no news posts until real content is approved', () => {
    expect(getNews('en')).toHaveLength(0);
    expect(getNewsPost('en', 'any-slug')).toBeNull();
    expect(getNewsPost('en', '../../package')).toBeNull();
  });

  it('loads the prototype press interview and flags it as non-real coverage', () => {
    const items = getPressItems('en');
    expect(items).toHaveLength(1);
    expect(items[0].isPrototype).toBe(true);
    expect(getPressItem('en', 'santiago-lo-bianco-interview')?.type).toBe('interview');
    expect(getPressItem('en', 'not-a-real-slug')).toBeNull();
  });

  it('loads the prototype tour dates in chronological order', () => {
    const dates = getTourDates();
    expect(dates).toHaveLength(15);
    expect(dates.every((date) => date.isPrototype === true)).toBe(true);
    expect(dates.every((date) => date.ticketUrl === '')).toBe(true);
    expect(dates[0].date).toBe('2027-01-23');
    expect(dates[dates.length - 1].date).toBe('2027-09-18');
  });

  it('loads the real merch catalog', () => {
    expect(getMerch('en')).toHaveLength(8);
    expect(getMerch('en').every((item) => item.image.startsWith('/images/merch/'))).toBe(true);
  });

  it('has no social links until approved', () => {
    expect(getSocialLinks()).toHaveLength(6);
    expect(getSocialLinks().every((link) => link.url === '')).toBe(true);
  });
});
