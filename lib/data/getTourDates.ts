import { readJsonFile, requireRecord, requireString } from './files';
import type { TourDate, TourStatus } from './types';

const tourStatuses: TourStatus[] = ['on-sale', 'coming-soon', 'sold-out', 'past'];

export function getTourDates(): TourDate[] {
  const value = readJsonFile('tour-dates.json');

  if (!Array.isArray(value)) {
    throw new Error('content/tour-dates.json must contain an array');
  }

  return value
    .map((item, index) => {
      const context = `content/tour-dates.json[${index}]`;
      const record = requireRecord(item, context);
      const status = requireString(record, 'status', context);

      if (!tourStatuses.includes(status as TourStatus)) {
        throw new Error(`${context}.status is invalid`);
      }

      return {
        id: requireString(record, 'id', context),
        date: requireString(record, 'date', context),
        city: requireString(record, 'city', context),
        country: requireString(record, 'country', context),
        venue: requireString(record, 'venue', context),
        ticketUrl: requireString(record, 'ticketUrl', context),
        status: status as TourStatus,
      };
    })
    .sort((first, second) => first.date.localeCompare(second.date));
}
