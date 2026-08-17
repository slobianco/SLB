import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '../../i18n/routing';

const contentRoot = path.join(process.cwd(), 'content');

export function readMdxFile(...segments: string[]) {
  const source = readFileSync(path.join(contentRoot, ...segments), 'utf8');
  const parsed = matter(source);

  return {
    frontmatter: parsed.data as Record<string, unknown>,
    content: parsed.content.trim(),
  };
}

export function readJsonFile(...segments: string[]): unknown {
  return JSON.parse(readFileSync(path.join(contentRoot, ...segments), 'utf8')) as unknown;
}

export function contentFileExists(...segments: string[]) {
  return existsSync(path.join(contentRoot, ...segments));
}

export function listContentDirectories(...segments: string[]) {
  return readdirSync(path.join(contentRoot, ...segments), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function requireRecord(value: unknown, context: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${context} must be an object`);
  }

  return value as Record<string, unknown>;
}

export function requireString(record: Record<string, unknown>, key: string, context: string) {
  const value = record[key];

  if (typeof value !== 'string') {
    throw new Error(`${context}.${key} must be a string`);
  }

  return value;
}

export function requireNumber(record: Record<string, unknown>, key: string, context: string) {
  const value = record[key];

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${context}.${key} must be a number`);
  }

  return value;
}

export function requireLocalizedString(value: unknown, locale: Locale, context: string) {
  const localized = requireRecord(value, context);
  return requireString(localized, locale, context);
}

export function isSafeSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}
