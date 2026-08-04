import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, localisePath, type Lang } from '../i18n/utils';

export type Section = 'articles' | 'statements' | 'news' | 'documents';
export type SectionEntry = CollectionEntry<Section>;
export type AnyEntry = SectionEntry | CollectionEntry<'authors'>;

/** Entry ids look like `en/my-post`; split them into language and slug. */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [first, ...rest] = id.split('/');
  if (rest.length === 0) return { lang: defaultLang, slug: first };
  return { lang: first as Lang, slug: rest.join('/') };
}

export function entryLang(entry: AnyEntry): Lang {
  return splitId(entry.id).lang;
}

export function entrySlug(entry: AnyEntry): string {
  return splitId(entry.id).slug;
}

/** Public URL of a piece of content, e.g. `/tr/articles/gazze-direnisi`. */
export function entryUrl(section: Section, entry: SectionEntry): string {
  const { lang, slug } = splitId(entry.id);
  return localisePath(`${section}/${slug}`, lang);
}

export function authorUrl(id: string): string {
  const { lang, slug } = splitId(id);
  return localisePath(`authors/${slug}`, lang);
}

/** Drafts are visible while developing so they can be previewed from the CMS. */
const isVisible = (entry: { data: { draft?: boolean } }) =>
  import.meta.env.DEV || !entry.data.draft;

const byDateDesc = (a: SectionEntry, b: SectionEntry) =>
  b.data.date.valueOf() - a.data.date.valueOf();

/** All published entries of a section in one language, newest first. */
export async function getSection(section: Section, lang: Lang): Promise<SectionEntry[]> {
  const entries = await getCollection(section, (entry) => isVisible(entry));
  return entries.filter((entry) => entryLang(entry) === lang).sort(byDateDesc);
}

/** Documents are an ordered set of texts, not a feed. */
export async function getDocuments(lang: Lang) {
  const docs = await getSection('documents', lang);
  return docs.sort(
    (a, b) =>
      (a.data as { order: number }).order - (b.data as { order: number }).order ||
      byDateDesc(a, b),
  );
}

export async function getAuthors(lang: Lang) {
  const authors = await getCollection('authors', (entry) => isVisible(entry));
  return authors
    .filter((author) => entryLang(author) === lang)
    .sort((a, b) => a.data.name.localeCompare(b.data.name, lang));
}

/**
 * Looks up an author by slug, falling back to the English profile so a byline
 * still renders when a contributor has only been translated once.
 */
export async function findAuthor(slug: string | undefined, lang: Lang) {
  if (!slug) return undefined;
  const authors = await getCollection('authors', (entry) => isVisible(entry));
  return (
    authors.find((a) => a.id === `${lang}/${slug}`) ??
    authors.find((a) => a.id === `${defaultLang}/${slug}`) ??
    authors.find((a) => entrySlug(a) === slug)
  );
}

/** Newest content across every section — used for the homepage lead. */
export async function getFeed(lang: Lang, sections: Section[] = ['statements', 'articles', 'news']) {
  const groups = await Promise.all(
    sections.map(async (section) =>
      (await getSection(section, lang)).map((entry) => ({ section, entry })),
    ),
  );
  return groups.flat().sort((a, b) => byDateDesc(a.entry, b.entry));
}

/** Other entries in the same section, preferring ones that share a tag. */
export async function getRelated(section: Section, current: SectionEntry, lang: Lang, limit = 3) {
  const siblings = (await getSection(section, lang)).filter((e) => e.id !== current.id);
  const tags = new Set(current.data.tags);
  const scored = siblings.map((entry) => ({
    entry,
    score: entry.data.tags.filter((tag) => tags.has(tag)).length,
  }));
  return scored
    .sort((a, b) => b.score - a.score || byDateDesc(a.entry, b.entry))
    .slice(0, limit)
    .map((s) => s.entry);
}

/** Reading time in minutes, rounded up, from the raw markdown body. */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
