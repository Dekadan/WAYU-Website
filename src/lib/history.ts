import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, formatDate, type Lang } from '../i18n/utils';
import { entryLang, entrySlug } from './content';

export type HistoryEntry = CollectionEntry<'history'>;

/** Every event in one language, oldest first: the timeline reads forward. */
export async function getHistory(lang: Lang): Promise<HistoryEntry[]> {
  const entries = await getCollection('history', (e) => import.meta.env.DEV || !e.data.draft);
  const own = entries.filter((e) => entryLang(e as never) === lang);
  const translated = new Set(own.map((e) => entrySlug(e as never)));
  const fallback =
    lang === defaultLang
      ? []
      : entries.filter((e) => entryLang(e as never) === defaultLang && !translated.has(entrySlug(e as never)));
  return [...own, ...fallback].sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}

export const historySlug = (entry: HistoryEntry) => entrySlug(entry as never);

export const historyLang = (entry: HistoryEntry) => entryLang(entry as never);

export const historyWhen = (entry: HistoryEntry, lang: Lang) =>
  entry.data.dateLabel ?? formatDate(entry.data.date, historyLang(entry) === lang ? lang : defaultLang);

/** The cover picture of an event: its own image, else the first gallery photo. */
export function historyImage(entry: HistoryEntry) {
  const { image, imageAlt, gallery } = entry.data;
  if (image) return { src: image, alt: imageAlt ?? '' };
  const first = gallery[0];
  return first ? { src: first.src, alt: first.alt } : undefined;
}
