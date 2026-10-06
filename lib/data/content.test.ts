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
    expect(songs.map((song) => song.title)).toEqual([
      'Silent Memory',
      'Review Yourself',
      'Your Ghost In Me',
      'London Darkened Roads',
      'Cielo Rojo',
      'The Quest',
      'This Is Not Me',
      'Raining in Sydney',
      'There Is No Time',
      'La Desolación',
      'Ansiedad',
    ]);
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

  it('loads the press interview', () => {
    const items = getPressItems('en');
    expect(items).toHaveLength(1);
    expect(getPressItem('en', 'santiago-lo-bianco-interview')?.type).toBe('interview');
    expect(getPressItem('en', 'not-a-real-slug')).toBeNull();
  });

  it('has no tour dates until real dates are approved', () => {
    expect(getTourDates()).toHaveLength(0);
  });

  it('has no merchandise until real products are approved', () => {
    expect(getMerch('en')).toHaveLength(0);
  });

  it('has no social links until approved', () => {
    expect(getSocialLinks()).toHaveLength(6);
    expect(getSocialLinks().every((link) => link.url === '')).toBe(true);
  });
});
