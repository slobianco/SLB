import type { Locale } from '../../i18n/routing';
import {
  readJsonFile,
  requireLocalizedString,
  requireNumber,
  requireRecord,
  requireString,
} from './files';
import type { MerchCategory, MerchItem } from './types';

const merchCategories: MerchCategory[] = ['apparel', 'music', 'accessories', 'art'];

export function getMerch(locale: Locale): MerchItem[] {
  const value = readJsonFile('merch.json');

  if (!Array.isArray(value)) {
    throw new Error('content/merch.json must contain an array');
  }

  return value.map((item, index) => {
    const context = `content/merch.json[${index}]`;
    const record = requireRecord(item, context);
    const category = requireString(record, 'category', context);

    if (!merchCategories.includes(category as MerchCategory)) {
      throw new Error(`${context}.category is invalid`);
    }

    return {
      id: requireString(record, 'id', context),
      name: requireLocalizedString(record.name, locale, `${context}.name`),
      variant: requireLocalizedString(record.variant, locale, `${context}.variant`),
      priceUsd: requireNumber(record, 'priceUsd', context),
      image: requireString(record, 'image', context),
      purchaseUrl: requireString(record, 'purchaseUrl', context),
      category: category as MerchCategory,
    };
  });
}
